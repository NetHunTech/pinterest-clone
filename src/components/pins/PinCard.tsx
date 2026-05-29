"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Button from "../ui/Button";

type Props = {
  id: string;
  img: string;
  title?: string;
};

export default function PinCard({ id, img, title }: Props) {
  const [saved, setSaved] = useState(false);

  // CHECK IF SAVED
  useEffect(() => {
    async function checkSaved() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) return;

      const { data } = await supabase
        .from("saved_pins")
        .select("*")
        .eq("pin_id", id)
        .eq("user_id", userData.user.id)
        .maybeSingle();

      if (data) setSaved(true);
    }

    checkSaved();
  }, [id]);

  // TOGGLE SAVE
  async function toggleSave() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      alert("Login required");
      return;
    }

    if (saved) {
      const { error } = await supabase
        .from("saved_pins")
        .delete()
        .eq("pin_id", id)
        .eq("user_id", userData.user.id);

      if (!error) setSaved(false);
    } else {
      const { error } = await supabase.from("saved_pins").insert({
        pin_id: id,
        user_id: userData.user.id,
      });

      if (!error) setSaved(true);
    }
  }

  return (
    <div className="relative break-inside-avoid group overflow-hidden rounded-xl bg-white shadow-sm">
      
      {/* IMAGE */}
      <img
        className="w-full object-cover group-hover:scale-105 transition duration-300"
        src={img}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition">

        {/* SAVE BUTTON */}
        <Button 
          onClick={toggleSave} 
          variant={saved ? "saved" : "save"}
        >
          {saved ? "Saved" : "Save"}
        </Button>

        {/* TEXT */}
        <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition">
          <h1 className="font-bold text-sm">{title}</h1>
          <h2 className="text-xs opacity-80">Author</h2>
        </div>

      </div>
    </div>
  );
}