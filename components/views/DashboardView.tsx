"use client";
import { useState } from "react";
import { Bell, Search, RefreshCw, ShieldCheck, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import StatsCards from "@/components/StatsCards";
import ProductsTable from "@/components/ProductsTable";
import AlertsPanel from "@/components/AlertsPanel";
import PriceChart from "@/components/PriceChart";
import type { View } from "@/app/page";

type SendState = "idle" | "loading" | "ok" | "error";

export default function DashboardView({ onNav }: { onNav: (v: View) => void }) {
  const [showBanner, setShowBanner] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [sendState, setSendState] = useState<SendState>("idle");

  const sendReport = async () => {
    setSendState("loading");
    try {
      const res = await fetch("/api/send-report", { method: "POST" });
      const data = await res.json();
      setSendState(data.ok ? "ok" : "error");
    } catch {
      setSendState("error");
    }
    setTimeout(() => setSendState("idle"), 4000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Topbar */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between sticky top-0 z-10">
        {/* Mobile: logo + title */}
        <div className="flex items-center gap-2 md:gap-0">
          <div className="w-7 h-7 rounded-lg bg-[#FFE600] flex items-center justify-center md:hidden">
            <ShieldCheck className="w-4 h-4 text-[#0f172a]" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold text-slate-900">Dashboard</h1>
            <p className="hidden md:block text-xs text-slate-400 mt-0.5">Última actualización: Hoy 10:00 AM · Próxima en 2h</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search — desktop */}
          <div className="hidden md:block relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar producto o EAN..."
              className="text-sm bg-slate-100 rounded-lg pl-9 pr-4 py-2 w-56 outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white border border-transparent focus:border-blue-200 transition-all"
            />
          </div>
          {/* Search icon — mobile */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center"
          >
            <Search className="w-4 h-4 text-slate-500" />
          </button>

          <button className="hidden md:flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            Revisar ahora
          </button>
          <button
            onClick={sendReport}
            disabled={sendState === "loading"}
            className={`hidden md:flex items-center gap-2 text-sm font-semibold rounded-lg px-3 py-2 transition-all ${
              sendState === "ok" ? "bg-green-500 text-white" :
              sendState === "error" ? "bg-red-500 text-white" :
              "bg-[#FFE600] text-slate-900 hover:bg-yellow-400"
            }`}
          >
            {sendState === "loading" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> :
             sendState === "ok" ? <CheckCircle className="w-3.5 h-3.5" /> :
             sendState === "error" ? <AlertCircle className="w-3.5 h-3.5" /> :
             <Send className="w-3.5 h-3.5" />}
            {sendState === "ok" ? "¡Enviado!" : sendState === "error" ? "Error" : "Enviar reporte"}
          </button>
          <button
            onClick={() => onNav("Alertas")}
            className="relative w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <Bell className="w-4 h-4 text-slate-500" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">4</span>
          </button>
        </div>
      </header>

      {/* Mobile search expand */}
      {showSearch && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2">
          <input
            type="text"
            placeholder="Buscar producto o EAN..."
            autoFocus
            className="w-full text-sm bg-slate-100 rounded-lg px-4 py-2 outline-none"
          />
        </div>
      )}

      {/* Content */}
      <main className="flex-1 p-4 md:p-8 space-y-4 md:space-y-6 overflow-y-auto">
        {/* Banner infracción */}
        {showBanner && (
          <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-xl p-3 md:p-4 flex items-start md:items-center justify-between text-white gap-3">
            <div className="flex items-start md:items-center gap-3">
              <div className="w-8 h-8 md:w-9 md:h-9 bg-white/20 rounded-lg flex items-center justify-center text-base md:text-lg shrink-0">⚠️</div>
              <div>
                <p className="font-semibold text-sm">Infracción crítica detectada</p>
                <p className="text-xs text-red-100 mt-0.5">
                  <strong>TechZone_Chile</strong> publica Galaxy A15 a <strong>$264.990</strong> — 11,7% bajo el mínimo
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => onNav("Alertas")}
                className="text-xs bg-white text-red-600 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                Ver
              </button>
              <button onClick={() => setShowBanner(false)} className="text-white/60 hover:text-white text-xs px-1">✕</button>
            </div>
          </div>
        )}

        {/* Reporte mobile */}
        <div className="md:hidden">
          <button
            onClick={sendReport}
            disabled={sendState === "loading"}
            className={`w-full flex items-center justify-center gap-2 text-sm font-semibold rounded-xl py-3 transition-all active:scale-[0.98] ${
              sendState === "ok" ? "bg-green-500 text-white" :
              sendState === "error" ? "bg-red-500 text-white" :
              "bg-[#FFE600] text-slate-900"
            }`}
          >
            {sendState === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> :
             sendState === "ok" ? <CheckCircle className="w-4 h-4" /> :
             sendState === "error" ? <AlertCircle className="w-4 h-4" /> :
             <Send className="w-4 h-4" />}
            {sendState === "ok" ? "Reporte enviado" : sendState === "error" ? "Error al enviar" : "Enviar reporte diario por email"}
          </button>
        </div>

        {/* Stats */}
        <StatsCards onNav={onNav} />

        {/* Chart + Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-2">
            <PriceChart />
          </div>
          <div>
            <AlertsPanel onNav={onNav} />
          </div>
        </div>

        {/* Table */}
        <ProductsTable />
      </main>
    </div>
  );
}
