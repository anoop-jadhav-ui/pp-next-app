import StoreProvider from "@/contexts/StoreProvider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ThemeRegistry from "./ThemeRegistry";
import "./globals.css";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pair Assist",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <StoreProvider>
          <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
