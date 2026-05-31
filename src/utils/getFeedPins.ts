import { supabase } from "@/lib/supabase/client";

export default async function getFeedPins() {
  const { data, error } = await supabase
    .from("pins")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("FEED ERROR:", error);
    return [];
  }

  return data;
}