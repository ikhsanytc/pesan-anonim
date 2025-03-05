import { getUser } from "@/utils/supabase/server";
import ClientPage from "./clientPage";
import { redirect } from "next/navigation";

const Register = async () => {
  const user = await getUser();
  if (user) {
    redirect("/home");
  }
  return <ClientPage />;
};

export default Register;
