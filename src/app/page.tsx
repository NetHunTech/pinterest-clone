"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

import Navbar from "@/components/layout/Navbar";
import PinCard from "@/components/pins/PinCard";
import PinGrid from "@/components/pins/PinsGrid";

export default function Page() {
  const [pins, setPins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPins() {
      const { data, error } = await supabase
        .from("pins")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setPins(data || []);
      setLoading(false);
    }

    loadPins();
  }, []);

  return (
    <>
      <Navbar />

      <PinGrid>
        {loading ? (
          <p>Loading...</p>
        ) : (
          pins.map((pin) => (
            <PinCard
              key={pin.id}
              img={pin.image_url}
              title={pin.title}
            />
          ))
        )}
      </PinGrid>
    </>
  );
}