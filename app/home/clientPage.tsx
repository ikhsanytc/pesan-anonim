"use client";
import ContainerHome from "@/components/Home/Container";
import Utama from "@/components/Home/Utama";
import React, { FC } from "react";

const ClientPage: FC = () => {
  return (
    <ContainerHome>
      <Utama />
    </ContainerHome>
  );
};

export default ClientPage;
