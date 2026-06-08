import { supabase } from "@/lib/supabase/client";
import { Profile } from "@/types/types";

export default async function useAllUsers(): Promise<Profile[] | null> {
  const { data: userData, error: userError } =
    await supabase.auth.getUser();

  if (userError || !userData.user) {
    console.log("AUTH ERROR:", userError);
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .neq(
      'id',
      userData.user.id,
    )

  if (error) {
    console.log("PROFILE ERROR:", error);
    return null;
  }

  if (!data) return null;

  return data;
}