import { supabase } from '../lib/supabase';

const TABLE_NAME = 'recruitments';
const STORAGE_BUCKET = 'resumes';

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@srmist\.edu\.in$/i;
    return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const isValidRegistrationNumber = (regNo) => {
    const regNoRegex = /^RA[0-9]{13}$/i;
    return regNoRegex.test(regNo.replace(/\s/g, ''));
};

export const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name.trim());
};

export const validateApplication = (data) => {
    const errors = [];

    if (!data.fullName?.trim()) {
        errors.push('📝 Please enter your full name');
    } else if (!isValidName(data.fullName)) {
        errors.push('📝 Name should contain only letters and spaces');
    }

    if (!data.email?.trim()) {
        errors.push('📧 Please enter your email address');
    } else if (!isValidEmail(data.email)) {
        errors.push('📧 Please use your SRM email');
    }

    if (!data.phone?.trim()) {
        errors.push('📱 Please enter your phone number');
    } else if (!isValidPhone(data.phone)) {
        errors.push('📱 Phone number must be exactly 10 digits');
    }

    if (!data.registrationNumber?.trim()) {
        errors.push('🆔 Please enter your registration number');
    } else if (!isValidRegistrationNumber(data.registrationNumber)) {
        errors.push('🆔 Registration number must start with RA (e.g., RA2311003012103)');
    }

    if (!data.college?.trim()) {
        errors.push('🏫 Please enter your college/university name');
    }
    if (!data.year?.trim()) {
        errors.push('📅 Please select your year of study');
    }
    if (!data.domain?.trim()) {
        errors.push('💼 Please select your preferred domain');
    }

    return { valid: errors.length === 0, errors };
};

export const uploadResume = async (file, registrationNumber) => {
    try {
        if (!file) return { success: true, url: null };

        const timestamp = Date.now();
        const sanitizedRegNo = registrationNumber.replace(/[^a-zA-Z0-9]/g, '_');
        const filePath = `${sanitizedRegNo}/${timestamp}-${file.name}`;

        const { error } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(filePath, file, { cacheControl: '3600', upsert: false });

        if (error) return { success: false, error: error.message };

        const { data: urlData } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(filePath);

        return { success: true, url: urlData.publicUrl };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const submitApplication = async (applicationData) => {
    try {
        const validation = validateApplication(applicationData);
        if (!validation.valid) {
            return { success: false, error: validation.errors.join(', ') };
        }

        const { data: existingUser } = await supabase
            .from(TABLE_NAME)
            .select('email')
            .eq('email', applicationData.email.trim().toLowerCase())
            .maybeSingle();

        if (existingUser) {
            return { success: false, error: 'This email has already been used. Each email can only register once.' };
        }

        let resumeUrl = null;
        if (applicationData.resume) {
            const uploadResult = await uploadResume(applicationData.resume, applicationData.registrationNumber);
            if (!uploadResult.success) {
                return { success: false, error: `Resume upload failed: ${uploadResult.error}` };
            }
            resumeUrl = uploadResult.url;
        }

        const dbData = {
            full_name: applicationData.fullName.trim(),
            email: applicationData.email.trim().toLowerCase(),
            phone: applicationData.phone.trim(),
            registration_number: applicationData.registrationNumber.trim().toUpperCase(),
            college: applicationData.college.trim(),
            year: applicationData.year,
            domain: applicationData.domain,
            resume_url: resumeUrl,
            idea_title: applicationData.ideaTitle?.trim() || null,
            idea_description: applicationData.ideaDescription?.trim() || null,
            team_members: applicationData.teamMembers?.trim() || null,
        };

        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert([dbData])
            .select();

        if (error) return { success: false, error: error.message };

        return { success: true, data: data[0] };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export default {
    submitApplication,
    uploadResume,
    validateApplication,
    isValidEmail,
    isValidPhone,
    isValidRegistrationNumber,
    isValidName
};
