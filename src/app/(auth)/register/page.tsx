"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;

  if (!user) {
    alert("No user returned");
    return;
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      username: email.split("@")[0],
    });

  if (profileError) {
    console.error(profileError);
    alert(profileError.message);
    return;
  }

    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-pink-100">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl border">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Join the inspiration world
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-purple-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />          

          <input
            type="password"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-purple-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="auth">Sign up</Button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-purple-500 font-medium">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}