import { useState } from "react";
import Button from "../ui/Button";
import toggleSavePin from "@/utils/toggleSavePin";

type Props = {
  id: string;
  img: string;
  title?: string;
};

export default function PinCard({ id, img, title }: Props) {
  const [saved, setSaved] = useState(false);

  // CHECK IF SAVED
  const handleSave = async () => {
    const result = await toggleSavePin(id);
    setSaved(result);
  };

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
          onClick={handleSave} 
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