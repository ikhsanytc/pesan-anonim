"use client";
import ContainerHome from "@/components/Home/Container";
import Utama from "@/components/Home/Utama";
import { getUser } from "@/utils/supabase/server";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";

const ClientPage: FC = () => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (!user) {
        router.push("/register");
      }
    })();
  }, []);
  return (
    <ContainerHome>
      <Utama />
    </ContainerHome>
  );
};

export default ClientPage;
