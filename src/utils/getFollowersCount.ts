import { supabase } from "@/lib/supabase/client";

export default async function getFollowersCount(
  userId: string
) {

  const { data, error } = await supabase
    .from('followers')
    .select('count()')
    .eq(
      'follower_id',
      userId,
    )

  if (error) {
    console.log(error);
    return 0;
  }

  return data

}