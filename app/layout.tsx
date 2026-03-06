import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PriceGuard – Monitor de Precios Mínimos",
  description: "Detecta y alerta cuando un vendedor publica por debajo del precio mínimo de tu marca en Mercado Libre.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
