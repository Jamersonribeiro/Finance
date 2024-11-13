import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";

const Subscription = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("login");
  }

  return <Navbar />;
};

export default Subscription;
