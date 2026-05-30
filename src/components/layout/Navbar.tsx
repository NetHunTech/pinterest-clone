import useUserData from "@/hooks/useUserData";
import SearchInput from "../ui/SearchInput";
import Link from 'next/link';
import Image from "next/image";
import { useState, useEffect } from "react";

export type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
};

export default function Navbar() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await useUserData();
      setProfile(data);
    };

    fetchUser();
  }, []);

  const avatar =
    typeof profile?.avatar_url === "string" &&
    profile.avatar_url.startsWith("/")
      ? profile.avatar_url
      : typeof profile?.avatar_url === "string" &&
        profile.avatar_url.startsWith("http")
      ? profile.avatar_url
      : "/default-avatar.jpg";
      
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
      <Link className="w-10 h-10 rounded-full bg-pink-400" href="/profile">      
      <Image
        src={avatar}
        width={120}
        height={120}
        alt="avatar"
        className="rounded-full"
      />
      </Link>

    </nav>
  );
}