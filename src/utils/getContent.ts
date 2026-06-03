import { supabase } from "@/lib/supabase/client";

export default async function getContent(
  type: "pins" | "saved_pins",
  userId: string
) {

  if (type === "pins") {
    const { data, error } = await supabase
      .from("pins")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.log("PINS ERROR:", error);
      return null;
    }

    return data;
  }

  const { data, error } = await supabase
    .from("saved_pins")
    .select(`
      *,
      pins (*)
    `)
    .eq("user_id", userId);
  

  if (error) {
    console.log("SAVED PINS ERROR:", error);
    return null;
  }

  return data.map((item) => item.pins);
}