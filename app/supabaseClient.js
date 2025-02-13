// utils/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cywgnlcavopxoboywfgi.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5d2dubGNhdm9weG9ib3l3ZmdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyNjU2MzEsImV4cCI6MjA1NDg0MTYzMX0.ZB5MrIn9fRmrnPMraaWs7hZ8xNkxntRAvrQOSGpvLVs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
