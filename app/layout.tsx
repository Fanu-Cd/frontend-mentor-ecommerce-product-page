import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import MantineProvider from "./contexts/mantine-provider";
import { ProductProvider } from "./contexts/product-context";
export const metadata: Metadata = {
  title: "sneakers",
  description: "sneakers - Ecommerce Product Page",
  icons: {
    icon: "../favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MantineProvider>
          <ProductProvider>{children}</ProductProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
