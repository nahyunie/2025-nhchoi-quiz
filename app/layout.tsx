import type { Metadata } from "next";
import './globals.css'

export const metadata: Metadata = {
  title: "나를 맞춰라",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
