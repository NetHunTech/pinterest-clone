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
import followUser from "@/utils/followUser";
import isFollowing from "@/utils/isFollowing";
import getUserData from "@/utils/getUserData";
import getFollowersCount from "@/utils/getFollowersCount";
import getFollowingCount from "@/utils/getFollowingCount";
import getPinsCount from "@/utils/getPinsCount";


type Profile = {
  id: string;
  username: string;
  avatar_url: string;
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
  const [follow, setFollow] = useState<boolean | null>(null);
  const [numbers, setNumbers] = useState({
    user_pins: 0,
    user_followers: 0,
    user_following: 0
  })

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;

      const { data: userData } = await supabase.auth.getUser();

      if (userData.user) {
        setIsOwnProfile(userData.user.id === id);
      }

      const profileData = await getUserData(id as string);
      setProfile(profileData);
    };

    fetchProfile();
  }, [id]);

  useEffect(() => {
    const checkFollowState = async () => {
      if (!profile) return;

      const result = await isFollowing(profile.id);
      setFollow(result);
    };

    const fetchPins = async () => {
      if (!profile) return

      const pins = await getContent("pins", profile.id);
      setContent(pins ?? []);
    };

    const fetchNumbers = async () => {
      if (!profile) return;

      const [pins, followers, following] = await Promise.all([
        getPinsCount(profile.id),
        getFollowersCount(profile.id),
        getFollowingCount(profile.id),
      ]);

      setNumbers({
        user_pins: pins,
        user_followers: following,
        user_following: followers,
      });
    };

    fetchPins();
    checkFollowState();
    fetchNumbers();
  }, [profile]);

  const handleFollow = async () => {
    if (!profile) return;

    await followUser(profile.id);

    const updated = await isFollowing(profile.id);
    setFollow(updated);
  };

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
        <div className="absolute top-0 left-10 flex items-center gap-5">
          <Image
            src={profile.avatar_url}
            width={150}
            height={150}
            alt="avatar"
            className="rounded-full object-cover"
          />

          <div className="flex flex-col items-start justify-center gap-2">
            <h1 className="text-2xl font-bold">{profile.username}</h1>

            <p className="text-gray-500">
              {profile.bio || "No bio"}
            </p>

            <span className="text-sm text-gray-400">
              Joined: {new Date(profile.created_at).toLocaleDateString()}
            </span>

            <div className="flex gap-8">
              <div className="flex flex-col items-center">
                <span className="font-semibold">{numbers.user_pins}</span>
                <p className="text-sm">Pins</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold">{numbers.user_followers}</span>
                <p className="text-sm">Followers</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold">{numbers.user_following}</span>
                <p className="text-sm">Following</p>
              </div>
            </div>
          </div>
        </div>

        {isOwnProfile ? (
          <div className="absolute top-0 right-10">
            <Button variant="secondary">Edit Profile</Button>
          </div>
        ) : (
          <div className="absolute top-0 right-10">
            <Button variant="secondary" onClick={handleFollow}>
              {follow === null ? "Loading..." : follow ? "Following" : "Follow"}
            </Button>
          </div>
        )}
      </header>

      <div className="max-w-6xl my-10 mx-auto pb-2 flex flex-col items-center">
        <div className="flex justify-between items-center gap-30">
          <button
            className={
              activeTab === "created"
                ? "font-semibold border-b-2 border-red-800 pb-2"
                : "cursor-pointer pb-2"
            }
            onClick={async () => {
              setActiveTab("created");
              const pins = await getContent("pins", profile.id);
              setContent(pins ?? []);
            }}
          >
            Pins
          </button>

          {isOwnProfile && (
            <button
              className={
                activeTab === "saved"
                  ? "font-semibold border-b-2 border-red-800 pb-2"
                  : "cursor-pointer pb-2"
              }
              onClick={async () => {
                setActiveTab("saved");
                const pins = await getContent("saved_pins", profile.id);
                setContent(pins ?? []);
              }}
            >
              Saved
            </button>
          )}

          <button
            className={
              activeTab === "about"
                ? "font-semibold border-b-2 border-red-800 pb-2"
                : "cursor-pointer pb-2"
            }
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
        </div>

        <div className="w-300 border-b border-gray-300" />
      </div>

      <main className="max-w-6xl mx-auto flex justify-center items-center">
        <PinGrid>
          {content.map((pin) => (
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