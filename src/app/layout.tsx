import type { Metadata } from "next";
import { Inter, Chakra_Petch } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra",
});

export const metadata: Metadata = {
  title: "Taskify Games",
  description: "Turn free time into rewards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${chakraPetch.variable} antialiased bg-black text-white font-sans overflow-x-hidden min-h-screen`}>
        {children}
      </body>
    </html>
  );
}