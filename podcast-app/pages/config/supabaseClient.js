import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mnbxmadbpxwyrvhgonuc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uYnhtYWRicHh3eXJ2aGdvbnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgzMjQ1ODgsImV4cCI6MjAxMzkwMDU4OH0.lhgB1l4xCyt25GDBm-3G5poGV0VGiODOP2_3bvThlpQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
