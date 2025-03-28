import { Metadata } from "next";
import ClientPage from "./clientPage";

export const metadata: Metadata = {
  title: "Home",
  description: "Halaman utama pesn anaonim",
};
export default async function HomePage() {
  return <ClientPage />;
}
