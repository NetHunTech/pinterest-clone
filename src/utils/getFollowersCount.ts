import { supabase } from "@/lib/supabase/client";

export default async function getFollowersCount(
  userId: string
): Promise<number> {

  const { count, error } = await supabase
    .from('followers')
    .select("*", { count: "exact", head: true })
    .eq(
      'follower_id',
      userId,
    )

  if (error) {
    console.log(error);
    return 0;
  }

  return count ?? 0

}