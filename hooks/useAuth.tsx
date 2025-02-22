"use client";

import { getProfile, getUser } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type ProfileType = {
  id: string;
  username: string;
  email: string;
  age: string;
  month: string;
  year: string;
  avatar_url: string;
};

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const user = await getUser();
      setUser(user);
      const profile = await getProfile();
      setProfile(profile);
      setIsLoading(false);
    })();
  }, []);
  return { user, isLoading, profile };
}
