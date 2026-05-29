"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-100">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl border">
        
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome back
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Log in to explore inspiration
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="auth">Log in</Button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-500">
          No account?{" "}
          <a href="/register" className="text-pink-500 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}