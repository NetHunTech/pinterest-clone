import { supabase } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import getUserData from "@/utils/getUserData";
import SearchInput from "../ui/SearchInput";
import Link from 'next/link';
import Image from "next/image";

export type Profile = {
  id: string;
  username: string;
  avatar_url: string;
  bio: string | null;
  created_at: string;
};

export default function Navbar() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser()

      if (!authData.user) return;

      const profileData = await getUserData(authData.user.id);
      setProfile(profileData);
    };

    fetchUser();
  }, []);

  if (!profile) {
    return <nav>Loading...</nav>;
  }

  return (
    <nav className="h-16 sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm flex items-center justify-between px-6">
      
      {/* LOGO + MENU */}
      <ul className="flex items-center gap-8 font-medium">
        <li><Link className="font-black text-xl" href="/">PinColne</Link></li>
        <li><Link className="text-gray-700 hover:text-black cursor-pointer" href="/">Home</Link></li>
        <li><Link className="text-gray-700 hover:text-black cursor-pointer" href="/explore">Explore</Link></li>
        <li><Link className="text-gray-700 hover:text-black cursor-pointer" href="/create">Create</Link></li>
      </ul>

      {/* SEARCH */}
      <SearchInput />

      {/* PROFILE */}
      <Link href={profile?.id ? `/profile/${profile.id}` : "/"}>      
        <Image
          src={profile?.avatar_url}
          width={40}
          height={40}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
      </Link>

    </nav>
  );
}