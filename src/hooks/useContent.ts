"use client";

import { supabase } from "@/lib/supabase/client";

export default async function getContent() {
  const { data: userData, error: userError } =
    await supabase.auth.getUser();

  if (userError || !userData.user) {
    console.log("AUTH ERROR:", userError);
    return null;
  }

  const { data, error } = await supabase
    .from("pins")
    .select(`
      *,
      profiles (*)
    `)
    .eq("user_id", userData.user.id);

  if (error) {
    console.log("CONTENT ERROR:", error);
    return null;
  }

  return data;
}