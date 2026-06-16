import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Sign In | LuxeEstate",
  description: "Sign in to LuxeEstate to access exclusive properties worldwide.",
};

export default function LoginPage() {
  return <LoginClient />;
}
