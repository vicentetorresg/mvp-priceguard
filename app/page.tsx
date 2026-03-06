"use client";
import { useState, useEffect } from "react";
import LoginPage from "@/components/LoginPage";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import DashboardView from "@/components/views/DashboardView";
import ProductsView from "@/components/views/ProductsView";
import AlertsView from "@/components/views/AlertsView";
import HistorialView from "@/components/views/HistorialView";
import ConfigView from "@/components/views/ConfigView";

export type View = "Dashboard" | "Productos" | "Alertas" | "Historial" | "Configuracion";

export default function Home() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [activeView, setActiveView] = useState<View>("Dashboard");

  useEffect(() => {
    setAuthed(localStorage.getItem("pg_auth") === "1");
    setReady(true);
  }, []);

  const logout = () => {
    localStorage.removeItem("pg_auth");
    setAuthed(false);
  };

  if (!ready) return null;
  if (!authed) return <LoginPage onLogin={() => setAuthed(true)} />;

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      {/* Sidebar — solo desktop */}
      <Sidebar activeView={activeView} onNav={setActiveView} onLogout={logout} />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {activeView === "Dashboard" && <DashboardView onNav={setActiveView} />}
        {activeView === "Productos" && <ProductsView />}
        {activeView === "Alertas" && <AlertsView />}
        {activeView === "Historial" && <HistorialView />}
        {activeView === "Configuracion" && <ConfigView onLogout={logout} />}
      </div>

      {/* Bottom nav — solo mobile */}
      <MobileNav activeView={activeView} onNav={setActiveView} />
    </div>
  );
}
