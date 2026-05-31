import { supabase } from "@/lib/supabase/client";

export default async function toggleSavePin(pinId: string) {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return false;

  const userId = userData.user.id;

  // check if already saved
  const { data: existing } = await supabase
    .from("saved_pins")
    .select("*")
    .eq("user_id", userId)
    .eq("pin_id", pinId)
    .maybeSingle();

  if (existing) {
    // UNSAVE
    await supabase
      .from("saved_pins")
      .delete()
      .eq("user_id", userId)
      .eq("pin_id", pinId);

    return false;
  }

  // SAVE
  const { error } = await supabase.from("saved_pins").insert({
    user_id: userId,
    pin_id: pinId,
  });

  if (error) {
    console.log(error);
    return false;
  }

  return true;
}