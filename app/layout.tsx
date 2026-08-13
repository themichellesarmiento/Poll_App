import type { Metadata } from "next";
import { Hanken_Grotesk } from 'next/font/google'
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: '--font-hanken-grotesk',
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marvel Polls",
  description: "Which marvel characters are the best?",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${hankenGrotesk.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col">
        <main className="mx-auto">
        {children}
        </main>
        </body>
    </html>
  );
}
