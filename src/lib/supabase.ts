import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://nzqjbdsmmlyaovgakdes.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA1MTE1YWUwLTJiM2QtNDhlZi05Y2YxLWU2NmYyNTIxYjZhZCJ9.eyJwcm9qZWN0SWQiOiJuenFqYmRzbW1seWFvdmdha2RlcyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY0NjAzODIzLCJleHAiOjIwNzk5NjM4MjMsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.0KYqdZXdg-YgkZOgJF-leYT3GPfWbolrvOb3mk19XVw';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };