"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import getUserData from "@/hooks/getUserData";

type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const userData = await getUserData();
      setProfile(userData);
      setLoading(false);
    };

    fetchProfile();

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
      </aside>

      {/* RIGHT CONTENT */}
      <main className="p-10">

        <h2 className="text-3xl font-bold mb-6">
          Your Content
        </h2>

        <div className="grid grid-cols-3 gap-6">

          <div className="h-64 rounded-2xl bg-gray-200" />
          <div className="h-64 rounded-2xl bg-gray-200" />
          <div className="h-64 rounded-2xl bg-gray-200" />
          <div className="h-64 rounded-2xl bg-gray-200" />
          <div className="h-64 rounded-2xl bg-gray-200" />
          <div className="h-64 rounded-2xl bg-gray-200" />

        </div>
      </main>

      <aside className="border-l border-gray-300 p-8 flex flex-col items-center gap-4 sticky top-16 h-[calc(100vh-64px)]">
        <h1>Profiles</h1>
      </aside>

    </div>
  </>
);
}