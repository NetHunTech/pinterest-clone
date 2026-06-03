import { supabase } from "@/lib/supabase/client";

export default async function getPinsCount(
  userId: string
): Promise<number> {

  const { count, error } = await supabase
    .from('pins')
    .select("*", { count: "exact", head: true })
    .eq(
      'user_id',
      userId,
    )

  if (error) {
    console.log(error);
    return 0;
  }

  return count ?? 0

}