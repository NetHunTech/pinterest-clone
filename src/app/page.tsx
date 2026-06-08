"use client";

import { useEffect, useState } from "react";
import { Pin } from "@/types/types";
import Navbar from "@/components/layout/Navbar";
import PinGrid from "@/components/pins/PinsGrid";
import PinCard from "@/components/pins/PinCard";
import getFeedPins from "@/utils/getHomeFeed";

export default function HomePage() {
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPins = async () => {
      const data = await getFeedPins();
      setPins(data);
      setLoading(false);
    };

    loadPins();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading feed...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="p-6">
        <PinGrid>
          {pins.map((pin) => (
            <PinCard
              key={pin.id}
              id={pin.id}
              img={pin.image_url}
              title={pin.title}
            />
          ))}
        </PinGrid>
      </main>
    </>
  );
}