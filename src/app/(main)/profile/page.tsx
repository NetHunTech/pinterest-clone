"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import getUserData from "@/utils/getUserData";
import getAllUsers from "@/utils/getAllUsers";
import Navbar from "@/components/layout/Navbar";
import PinCard from "@/components/pins/PinCard";
import PinGrid from "@/components/pins/PinsGrid";
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
  image_url: string;
  title: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [otherUsers, setOtherUsers] = useState<Profile[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainContent, setMainContent] = useState<Pin[] | null>(null)
  const [name, setName] = useState()
  
  const renderMainContent = mainContent?.map((content) => {
    return (
      <PinCard 
        key={content.id}               
        id={content.id}
        img={content.image_url}
        title={content.title}
      />
    )
  })

  const renderAllUser = otherUsers?.map((user) => {
    const avatar =
    typeof user?.avatar_url === "string" &&
    user.avatar_url.startsWith("/")
      ? user.avatar_url
      : typeof user?.avatar_url === "string" &&
        user.avatar_url.startsWith("http")
      ? user.avatar_url
      : "/default-avatar.jpg";

    return (
      <div key={user.id} className="flex flex-col items-center">
        <Image
          src={avatar}
          width={120}
          height={120}
          alt="avatar"
          className="rounded-full object-cover"
        />

        <h1 className="text-2xl font-bold">
          {user.username}
        </h1>

        <span className="text-sm text-gray-400">
          Joined:{" "}
          {new Date(user.created_at).toLocaleDateString()}
        </span>
      </div>
    )
  })

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      setProfile(userData);
      const otherUserData = await getAllUsers()
      setOtherUsers(otherUserData)
      const mainContent = await getContent("pins")
      setMainContent(mainContent)
      setLoading(false);
    };

    fetchData();

  }, []);

  // SAFE AVATAR LOGIC (IMPORTANT FIX)
  const avatar =
    typeof profile?.avatar_url === "string" &&
    profile.avatar_url.startsWith("/")
      ? profile.avatar_url
      : typeof profile?.avatar_url === "string" &&
        profile.avatar_url.startsWith("http")
      ? profile.avatar_url
      : "/default-avatar.jpg";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        No profile found
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen grid grid-cols-[320px_1fr_320px]">

        {/* LEFT SIDEBAR */}
        <aside className="border-r border-gray-300 p-8 flex flex-col items-center gap-4 sticky top-16 h-[calc(100vh-64px)]">
          <div className="flex flex-col items-center">
            {/* AVATAR */}
            <Image
              src={avatar}
              width={120}
              height={120}
              alt="avatar"
              className="rounded-full object-cover"
              />

            {/* USERNAME */}
            <h1 className="text-2xl font-bold">
              {profile.username}
            </h1>

            {/* BIO */}
            <p className="text-gray-500 text-center">
              {profile.bio || "No bio yet"}
            </p>

            {/* CREATED AT */}
            <span className="text-sm text-gray-400">
              Joined:{" "}
              {new Date(profile.created_at).toLocaleDateString()}
            </span>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <h2>Settings</h2>
            <Button
              variant="auth"
              onClick={async () => {
                const data = await getContent("pins");
                setMainContent(data);
              }}
            >
              Your Pins
            </Button>

            <Button
              variant="auth"
              onClick={async () => {
                const data = await getContent("saved_pins");
                setMainContent(data);
              }}
            >
              Saved Pins
            </Button>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="p-10">

          <h2 className="text-3xl font-bold mb-6">
            {profile.username}'s Content
          </h2>

          <PinGrid>
            {renderMainContent}
          </PinGrid>
        </main>

        <aside className="border-l border-gray-300 p-8 flex flex-col items-center gap-4 sticky top-16 h-[calc(100vh-64px)]">
          <h1>Profiles</h1>
          <div className="flex flex-col items-center gap-4">
            {renderAllUser}
          </div>
        </aside>

      </div>
    </>
  );
}