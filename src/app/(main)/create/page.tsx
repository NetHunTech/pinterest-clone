"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();
  
  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);

    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
  }

  async function handleCreatePin() {
    if (!selectedImage || !title) {
      alert("Please add a title and image.");
      return;
    }
    
    try {
      // 1. get user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Not logged in");
        return;
      }

      // 2. upload image to storage
      const cleanFileName = selectedImage.name
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9.-]/g, "");

      const fileName = `${user.id}-${Date.now()}-${cleanFileName}`;

      const { data: uploadData, error: uploadError } =
        await supabase.storage
          .from("pins")
          .upload(fileName, selectedImage);

      if (uploadError) throw uploadError;

      // 3. get public URL
      const { data: publicUrlData } = supabase.storage
        .from("pins")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      // 4. insert into DB
      const { error: insertError } = await supabase.from("pins").insert({
        title,
        image_url: imageUrl,
        user_id: user.id,
      });

      if (insertError) throw insertError;

      // 5. redirect
      router.push("/");

    } catch (err: any) {
      console.error(err.message);
      alert(err?.message || "Upload failed");
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
        
        <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          
          {/* LEFT SIDE */}
          <section className="bg-gray-50 border-r p-10 flex items-center justify-center">
            
            {!previewUrl ? (
              <label className="w-full h-[500px] border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition">
                
                <div className="text-6xl mb-4">📌</div>

                <h2 className="text-xl font-semibold">
                  Choose an image
                </h2>

                <p className="text-gray-500 mt-2 text-sm">
                  Drag & drop coming soon
                </p>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  />
              </label>
            ) : (
              <div className="relative w-full">
                
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-h-[700px] object-cover rounded-3xl"
                  />

                <div className="absolute top-4 right-4">
                  <Button
                    onClick={() => {
                      setSelectedImage(null);
                      setPreviewUrl(null);
                    }}
                    >
                    Remove
                  </Button>
                </div>
              </div>
            )}
          </section>

          {/* RIGHT SIDE */}
          <section className="p-10 flex flex-col justify-center">
            
            <div className="mb-10">
              <h1 className="text-4xl font-black mb-3">
                Create Pin
              </h1>

              <p className="text-gray-500">
                Share your inspiration with the world.
              </p>
            </div>

            {/* TITLE */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">
                Title
              </label>

              <input
                type="text"
                placeholder="Add a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              variant="auth"
              onClick={handleCreatePin}
              >
              Create Pin
            </Button>
          </section>
        </div>
      </main>
    </>
  );
}