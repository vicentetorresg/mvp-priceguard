"use client";
import { useState } from "react";
import { Search, ChevronRight, AlertTriangle, CheckCircle, AlertCircle, Plus, ShieldCheck } from "lucide-react";
import { products } from "@/lib/mockData";
import type { Product } from "@/lib/mockData";
import ProductModal from "@/components/ProductModal";

type StatusFilter = "todos" | "critical" | "warning" | "ok";

const brandEmoji: Record<string, string> = {
  Samsung: "📱", LG: "📺", Sony: "🎧", Xiaomi: "📲", Philips: "🍳", Asus: "💻",
};

const StatusBadge = ({ status }: { status: Product["status"] }) => {
  if (status === "ok") return (
    <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
      <CheckCircle className="w-3 h-3" /> En regla
    </span>
  );
  if (status === "warning") return (
    <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
      <AlertCircle className="w-3 h-3" /> Alerta
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
      <AlertTriangle className="w-3 h-3" /> Infracción
    </span>
  );
};

export default function ProductsView() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");

  const brands = Array.from(new Set(products.map(p => p.brand)));
  const filtered = products.filter(p => {
    const q = search.toLowerCase();
    if (q && !p.name.toLowerCase().includes(q) && !p.ean.includes(q)) return false;
    if (brandFilter !== "todos" && p.brand !== brandFilter) return false;
    if (statusFilter !== "todos" && p.status !== statusFilter) return false;
    return true;
  });

  return (
    <>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 md:gap-0">
            <div className="w-7 h-7 rounded-lg bg-[#FFE600] flex items-center justify-center md:hidden">
              <ShieldCheck className="w-4 h-4 text-[#0f172a]" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-bold text-slate-900">Productos</h1>
              <p className="hidden md:block text-xs text-slate-400 mt-0.5">{products.length} monitoreados</p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-xs md:text-sm font-semibold bg-[#FFE600] text-slate-900 rounded-lg px-3 py-2 hover:bg-yellow-400 transition-colors">
            <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Agregar</span>
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Buscar por nombre o EAN..."
                className="w-full text-sm bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 outline-none focus:border-slate-400" />
            </div>
            <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)}
              className="text-xs md:text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-600 outline-none focus:border-slate-400">
              <option value="todos">Todas las marcas</option>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden">
              {(["todos", "critical", "warning", "ok"] as StatusFilter[]).map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`flex-1 px-2 md:px-3 py-2 text-xs font-medium transition-colors ${
                    statusFilter === s ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"
                  }`}>
                  {s === "todos" ? "Todos" : s === "critical" ? "Crítico" : s === "warning" ? "Alerta" : "OK"}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile: cards */}
          <div className="md:hidden space-y-2">
            {filtered.length === 0 ? (
              <p className="text-center py-10 text-slate-400 text-sm">Sin resultados</p>
            ) : filtered.map(p => {
              const diff = p.lowestDetected < p.minPrice
                ? (((p.lowestDetected - p.minPrice) / p.minPrice) * 100).toFixed(1)
                : null;
              return (
                <div key={p.id} onClick={() => setSelected(p)}
                  className="bg-white rounded-xl border border-slate-200 px-4 py-3.5 flex items-center gap-3 cursor-pointer active:bg-slate-50">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                    {brandEmoji[p.brand] ?? "📦"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{p.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">EAN: {p.ean}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-xs font-bold ${p.lowestDetected < p.minPrice ? "text-red-500" : "text-green-600"}`}>
                        ${p.lowestDetected.toLocaleString("es-CL")}
                      </span>
                      {diff && <span className="text-xs text-red-400">({diff}%)</span>}
                      <span className="text-xs text-slate-400">· mín ${p.minPrice.toLocaleString("es-CL")}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <StatusBadge status={p.status} />
                    <span className="text-[10px] text-slate-400">{p.totalListings} pub.</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                </div>
              );
            })}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-xs text-slate-500 font-medium">
                  <th className="text-left px-5 py-3">Producto</th>
                  <th className="text-right px-4 py-3">Precio mínimo</th>
                  <th className="text-right px-4 py-3">Más bajo detectado</th>
                  <th className="text-center px-4 py-3">Publicaciones</th>
                  <th className="text-center px-4 py-3">Infracciones</th>
                  <th className="text-center px-4 py-3">Estado</th>
                  <th className="text-xs px-4 py-3 text-slate-400">Última revisión</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-12 text-slate-400 text-sm">No hay productos que coincidan</td></tr>
                ) : filtered.map(p => {
                  const diff = p.lowestDetected < p.minPrice
                    ? (((p.lowestDetected - p.minPrice) / p.minPrice) * 100).toFixed(1)
                    : null;
                  return (
                    <tr key={p.id} onClick={() => setSelected(p)} className="hover:bg-slate-50/70 transition-colors cursor-pointer">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-lg shrink-0">{brandEmoji[p.brand] ?? "📦"}</div>
                          <div>
                            <p className="text-sm font-medium text-slate-900 leading-tight">{p.name}</p>
                            <p className="text-xs text-slate-400 mt-0.5">EAN: {p.ean} · {p.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-right"><span className="text-sm font-semibold text-slate-700">${p.minPrice.toLocaleString("es-CL")}</span></td>
                      <td className="px-4 py-3.5 text-right">
                        <span className={`text-sm font-bold ${p.lowestDetected < p.minPrice ? "text-red-500" : "text-green-600"}`}>${p.lowestDetected.toLocaleString("es-CL")}</span>
                        {diff && <p className="text-xs text-red-400 font-medium">{diff}%</p>}
                      </td>
                      <td className="px-4 py-3.5 text-center text-sm text-slate-600">{p.totalListings}</td>
                      <td className="px-4 py-3.5 text-center">
                        {p.violationsCount > 0 ? <span className="text-sm font-bold text-red-500">{p.violationsCount}</span> : <span className="text-sm text-slate-400">—</span>}
                      </td>
                      <td className="px-4 py-3.5 text-center"><StatusBadge status={p.status} /></td>
                      <td className="px-4 py-3.5 text-xs text-slate-400">{p.lastChecked}</td>
                      <td className="px-4 py-3.5"><ChevronRight className="w-4 h-4 text-slate-300" /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
