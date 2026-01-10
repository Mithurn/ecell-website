import { getAllMemberPhotos } from './memberPhotoService';

const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const SHEET_NAME = 'Form Responses 1';

// Fetch team members from Google Sheets + Supabase photos
export const fetchTeamMembers = async () => {
    try {
        // Fetch photos from Supabase (uploaded by members)
        const memberPhotos = await getAllMemberPhotos();

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_NAME)}?key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        const rows = data.values;

        if (!rows || rows.length < 2) {
            return [];
        }

        // Skip header row, map remaining rows
        const members = rows.slice(1).map((row, index) => {
            const name = row[1] || '';
            const email = (row[6] || '').toLowerCase().trim();

            // Priority: Supabase photo > Fallback avatar
            const supabasePhoto = memberPhotos[email];
            const fallbackPhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=22c55e&color=000&bold=true`;

            let position = row[8] || 'Member';

            // Data Normalization Fixes
            if (name.toLowerCase() === 'aadi sharma') {
                position = 'Member';
            } else if (position === 'Lead, Member') {
                position = 'Member';
            }

            return {
                id: index + 1,
                name,
                photo: supabasePhoto || fallbackPhoto,
                fallbackPhoto,
                github: row[3] || '',
                linkedin: row[4] || '',
                instagram: row[5] || '',
                email,
                domain: row[7] || '',
                position,
            };
        }).filter(member => member.name);

        return members;
    } catch (error) {
        console.error('Error fetching team members:', error);
        return [];
    }
};

// Get members by domain
export const getTeamByDomain = async (domain) => {
    const members = await fetchTeamMembers();
    if (!domain) return members;
    return members.filter(m => m.domain.toLowerCase() === domain.toLowerCase());
};

// Get members by position (Lead, Member, etc.)
export const getTeamByPosition = async (position) => {
    const members = await fetchTeamMembers();
    return members.filter(m => m.position.toLowerCase().includes(position.toLowerCase()));
};

// Get all unique domains
export const getDomains = async () => {
    const members = await fetchTeamMembers();
    return [...new Set(members.map(m => m.domain).filter(Boolean))];
};

export default {
    fetchTeamMembers,
    getTeamByDomain,
    getTeamByPosition,
    getDomains
};
