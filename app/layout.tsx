import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SoftSell | Sell Unused Software Licenses",
  description:
    "Easily sell unused software licenses and get paid fast. Trusted by top organizations.",
  keywords: [
    "Sell software license",
    "Unused licenses",
    "Software resell platform",
    "SoftSell",
    "License marketplace",
  ],
  robots: "index, follow",
  openGraph: {
    title: "SoftSell | Sell Unused Software Licenses",
    description:
      "Easily sell unused software licenses and get paid fast. Trusted by top organizations.",
    url: "https://www.softsell.com",
    siteName: "SoftSell",
    images: [
      {
        url: "/og-image.png", // replace with your actual image path
        width: 1200,
        height: 630,
        alt: "SoftSell Hero Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoftSell | Sell Unused Software Licenses",
    description:
      "Easily sell unused software licenses and get paid fast. Trusted by top organizations.",
    site: "@softsell", // replace with your handle
    creator: "@softsell",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
