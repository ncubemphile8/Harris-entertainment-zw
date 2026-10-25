import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harris Entertainment | Experience the Moment",
  description:
    "Discover upcoming concerts, festivals and unforgettable experiences with Harris Entertainment Zimbabwe.",
  applicationName: "Harris Entertainment",
  openGraph: {
    title: "Harris Entertainment",
    description: "The moments. The music. The memories.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}