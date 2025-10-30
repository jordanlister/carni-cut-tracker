import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carni-Cut Protocol | 188 → 165 lbs Weight Loss Tracker",
  description: "6-week high-protein, low-carb weight loss protocol. Track your progress, meals, workouts, and achieve your weight loss goals.",
  icons: {
    icon: '/carnicut-fav.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
