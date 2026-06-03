import { supabase } from "@/lib/supabase/client";
import isFollowing from "./isFollowing";

export default async function followUser(followingId: string) {
  const { data: userData } = await supabase.auth.getUser();
  const isFollowed = await isFollowing(followingId)

  if (!userData.user) return false;

  const followerId = userData.user.id;

  if (isFollowed) {
    await supabase
      .from("followers")
      .delete()
      .eq("follower_id", followerId)
      .eq("following_id", followingId);

    return false;
  }

  const { error } = await supabase.from("followers").insert({
    follower_id: followerId,
    following_id: followingId,
  });

  if (error) {
    console.log(error);
    return false;
  }

  return true;
}