"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import PinGrid from "@/components/pins/PinsGrid";
import PinCard from "@/components/pins/PinCard";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import getContent from "@/utils/getContent";

type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
};

type Pin = {
  id: string;
  title: string;
  image_url: string;
  user_id: string;
  created_at: string;
};

export default function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("created");
  const [content, setContent] = useState<Pin[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) return;

      setIsOwnProfile(userData.user.id === id);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        return;
      }

      setProfile(data);

      const pins = await getContent("pins");
      setContent(pins ?? []);
    };

    fetchProfile();
  }, [id]);

  const avatar =
    typeof profile?.avatar_url === "string" &&
    profile.avatar_url.startsWith("/")
      ? profile.avatar_url
      : typeof profile?.avatar_url === "string" &&
        profile.avatar_url.startsWith("http")
      ? profile.avatar_url
      : "/default-avatar.jpg";

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <header className="relative max-w-6xl h-40 mx-auto mt-8 py-12 flex justify-center">
        <div className="absolute top-0 left-10 flex items-center justify-space gap-5">
          <Image
            src={avatar}
            width={150}
            height={150}
            alt="avatar"
            className="rounded-full object-cover"
          />

          <div className="flex flex-col items-start justify-center gap-2">
            <h1 className="text-2xl font-bold">
              {profile.username}
            </h1>

            <p className="text-gray-500">
              {profile.bio || "No bio"}
            </p>

            <span className="text-sm text-gray-400">
              Joined: {new Date(profile.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        {isOwnProfile && (
          <div className="absolute top-0 right-10">
            <Button variant="secondary">
              Edit Profile
            </Button>
          </div>
        )}
      </header>

      <div className="max-w-6xl my-10 mx-auto pb-2 flex flex-col justify-around items-center ">
        <div className="flex justify-between items-center gap-30">
          <button 
              className={activeTab === "created" ? "font-semibold border-b-2 border-red-800 pb-2" : "cursor-pointer pb-2"} 
              onClick={ async () => {
                setActiveTab("created")

                const pins = await getContent("pins");
                setContent(pins ?? []);
              }}
            >
            Pins
          </button>
          { isOwnProfile &&  
            <button 
                className={activeTab === "saved" ? "font-semibold border-b-2 border-red-800 pb-2" : "cursor-pointer pb-2"} 
                onClick={ async () => {
                  setActiveTab("saved")

                  const pins = await getContent("saved_pins");
                  setContent(pins ?? []);
                }}
              >
              Saved
            </button>
          }
          <button 
            className={activeTab === "about" ? "font-semibold border-b-2 border-red-800 pb-2" : "cursor-pointer pb-2"} 
            onClick={() => {
              setActiveTab("about")
            }}
          >
            About
          </button>
        </div>
        <div className="w-300 border-b-1 border-gray-300"></div>
      </div>

      <main className="max-w-6xl mx-auto flex justify-center items-center">
        <PinGrid>
          {content.map((pin: Pin) => (
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