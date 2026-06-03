import { supabase } from "@/lib/supabase/client";

export type Profile = {
  id: string;
  username: string;
  avatar_url: string;
  bio: string | null;
  created_at: string;
};

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

  return data as Profile;
}