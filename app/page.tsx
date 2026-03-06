"use client";
import Sidebar from "@/components/Sidebar";
import StatsCards from "@/components/StatsCards";
import ProductsTable from "@/components/ProductsTable";
import AlertsPanel from "@/components/AlertsPanel";
import PriceChart from "@/components/PriceChart";
import { Bell, Search, RefreshCw } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Dashboard</h1>
            <p className="text-xs text-slate-400 mt-0.5">Última actualización: Hoy 10:00 AM · Próxima en 2h</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar producto o EAN..."
                className="text-sm bg-slate-100 rounded-lg pl-9 pr-4 py-2 w-56 outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white border border-transparent focus:border-blue-200 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
              Revisar ahora
            </button>
            <button className="relative w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
              <Bell className="w-4 h-4 text-slate-500" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 space-y-6">
          {/* Banner de infracción destacada */}
          <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-xl p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center text-lg">⚠️</div>
              <div>
                <p className="font-semibold text-sm">Infracción crítica detectada</p>
                <p className="text-xs text-red-100 mt-0.5">
                  <strong>TechZone_Chile</strong> publica Samsung Galaxy A15 a <strong>$264.990</strong> —
                  11.7% bajo tu precio mínimo de <strong>$299.990</strong>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Alerta enviada ✓</span>
              <button className="text-xs bg-white text-red-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                Ver evidencia
              </button>
            </div>
          </div>

          {/* Stats */}
          <StatsCards />

          {/* Chart + Alerts */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <PriceChart />
            </div>
            <div>
              <AlertsPanel />
            </div>
          </div>

          {/* Table */}
          <ProductsTable />

          {/* Demo notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
            <span className="text-lg">🚧</span>
            <div>
              <p className="text-sm font-semibold text-amber-800">Maqueta de demostración</p>
              <p className="text-xs text-amber-600 mt-0.5">
                Todos los datos son de ejemplo. La versión real conectará con la API de Mercado Libre para monitoreo en tiempo real.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
