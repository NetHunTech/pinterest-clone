"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";

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
    const getUserData = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.user.id)
        .maybeSingle();

      if (error) {
        console.log("PROFILE ERROR:", error);
        setLoading(false);
        return;
      }

      setProfile(data);
      setLoading(false);
    };

    getUserData();
  }, []);

  // 🔥 SAFE AVATAR LOGIC (IMPORTANT FIX)
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      
      {/* AVATAR */}
      <Image
        src={avatar}
        width={120}
        height={120}
        alt="avatar"
        className="rounded-full"
      />

      {/* USERNAME */}
      <h1 className="text-2xl font-bold">
        {profile.username}
      </h1>

      {/* BIO */}
      <p className="text-gray-500">
        {profile.bio || "No bio yet"}
      </p>

      {/* CREATED AT */}
      <span className="text-sm text-gray-400">
        Joined: {new Date(profile.created_at).toLocaleDateString()}
      </span>
    </div>
  );
}