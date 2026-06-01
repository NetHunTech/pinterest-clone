import { supabase } from "@/lib/supabase/client";

export default async function isPinSaved(pinId: string) {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return false;

  const userId = userData.user.id;

  const { data: existing } = await supabase
    .from("saved_pins")
    .select("*")
    .eq("user_id", userId)
    .eq("pin_id", pinId)
    .maybeSingle();

  if (existing) {
    return true;
  } else {
    return false
  }
}