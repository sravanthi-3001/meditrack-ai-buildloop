// MediTrack AI - Supabase Configuration

const SUPABASE_URL = "https://ikdizjhavzbtrsssgite.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_H7uYHuvRF3b-9r-V-Ck_Dg_0U_Xb0p3";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

window.supabaseClient = supabaseClient;

console.log("Supabase client initialized");
