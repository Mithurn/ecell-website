import { supabase } from '../lib/supabase';

const BUCKET_NAME = 'member-photos';
const TABLE_NAME = 'member_photos';

// Upload member photo to Supabase Storage
export const uploadMemberPhoto = async (email, file) => {
    try {
        const timestamp = Date.now();
        const sanitizedEmail = email.replace(/[^a-zA-Z0-9]/g, '_');
        const extension = file.name.split('.').pop();
        const filePath = `${sanitizedEmail}/${timestamp}.${extension}`;

        // Upload file
        const { error: uploadError } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, file, { cacheControl: '3600', upsert: true });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);

        const photoUrl = urlData.publicUrl;

        // Save to database (upsert - update if exists, insert if not)
        const { error: dbError } = await supabase
            .from(TABLE_NAME)
            .upsert({
                email: email.toLowerCase().trim(),
                photo_url: photoUrl,
                updated_at: new Date().toISOString()
            }, { onConflict: 'email' });

        if (dbError) throw dbError;

        return { success: true, url: photoUrl };
    } catch (error) {
        console.error('Photo upload error:', error);
        return { success: false, error: error.message };
    }
};

// Get photo URL for a member by email
export const getMemberPhoto = async (email) => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('photo_url')
            .eq('email', email.toLowerCase().trim())
            .single();

        if (error || !data) return null;
        return data.photo_url;
    } catch {
        return null;
    }
};

// Get all member photos as a map (email -> photo_url)
export const getAllMemberPhotos = async () => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('email, photo_url');

        if (error) return {};

        return data.reduce((acc, item) => {
            acc[item.email.toLowerCase()] = item.photo_url;
            return acc;
        }, {});
    } catch {
        return {};
    }
};

export default { uploadMemberPhoto, getMemberPhoto, getAllMemberPhotos };
