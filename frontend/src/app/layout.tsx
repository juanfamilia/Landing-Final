import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Siete CX - Customer Experience Platform",
  description: "Transform your customer experience with Siete CX",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}