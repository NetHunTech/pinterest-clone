import { supabase } from "@/lib/supabase/client";

export default async function getHomeFeed() {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return [];

  const { data, error } = await supabase
    .from("pins")
    .select("*")
    .neq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("HOME FEED ERROR:", error);
    return [];
  }

  return data;
}