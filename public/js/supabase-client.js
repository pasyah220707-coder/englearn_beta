// --- KONFIGURASI SUPABASE ---
// GANTI string di bawah ini dengan URL dan ANON KEY dari dashboard Supabase Anda
// (Settings -> API)

const SUPABASE_URL = 'https://mzikdubjrlciqsxhaozt.supabase.co'; // Contoh: https://xyzabc.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16aWtkdWJqcmxjaXFzeGhhb3p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDI1NzIsImV4cCI6MjA4NjM3ODU3Mn0.TOlt8n64l5JZqE-iENcan3tlH0Kq7n1k7AZi8LUHZPM'; // Contoh: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Cek apakah library Supabase sudah dimuat
if (typeof window.supabase !== 'undefined') {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.error('Library Supabase belum dimuat. Pastikan script CDN ada di HTML.');
}
