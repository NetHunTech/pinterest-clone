import { supabase } from "@/lib/supabase/client";
import { Profile } from "@/types/types";

export default async function getUserData(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.log(error);
    return null;
  } 

  if (!data) return null;

  return data;
}