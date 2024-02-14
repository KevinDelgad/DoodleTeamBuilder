import { Fredoka } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({ weight: "700", subsets: ["latin"] });

export const metadata = {
  title: "Doodle Team",
  description: "Create your Doodle Team!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fredoka.className} h-full`}>{children}</body>
    </html>
  );
}
