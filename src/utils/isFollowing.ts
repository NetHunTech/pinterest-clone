import { supabase } from "@/lib/supabase/client";

export default async function isFollowing(followingId: string) {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return false;

  const followerId = userData.user.id;

  const { data: existing } = await supabase
    .from("followers")
    .select("*")
    .eq("follower_id", followerId)
    .eq("following_id", followingId)
    .maybeSingle();

  if (existing) {
    return true;
  } else {
    return false
  }
}