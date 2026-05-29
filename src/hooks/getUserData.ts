"use client";

import { supabase } from "@/lib/supabase/client";

export type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
};

export default async function getUserData(): Promise<Profile | null> {
  const { data: userData, error: userError } =
    await supabase.auth.getUser();

  if (userError || !userData.user) {
    console.log("AUTH ERROR:", userError);
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .maybeSingle();

  if (error) {
    console.log("PROFILE ERROR:", error);
    return null;
  }

  if (!data) return null;

  return data as Profile;
}