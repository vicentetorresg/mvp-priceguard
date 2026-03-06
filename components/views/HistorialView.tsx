"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { priceHistoryByProduct, products, alerts } from "@/lib/mockData";
import { AlertTriangle, TrendingDown, TrendingUp, ShieldCheck } from "lucide-react";

const fmt = (v: number) => `$${(v / 1000).toFixed(0)}K`;

const brandEmoji: Record<string, string> = {
  Samsung: "📱", LG: "📺", Sony: "🎧", Xiaomi: "📲", Philips: "🍳", Asus: "💻",
};

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; dataKey: string }[]; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-lg">
      <p className="font-semibold text-slate-800 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className={p.dataKey === "minPrice" ? "text-slate-400" : "text-blue-600"}>
          {p.dataKey === "minPrice" ? "Mínimo" : "Más bajo"}: ${p.value.toLocaleString("es-CL")}
        </p>
      ))}
    </div>
  );
};

export default function HistorialView() {
  const [selectedId, setSelectedId] = useState("1");
  const product = products.find(p => p.id === selectedId)!;
  const data = priceHistoryByProduct[selectedId] ?? [];
  const productAlerts = alerts.filter(a => a.productId === selectedId);
  const first = data[0];
  const last = data[data.length - 1];
  const trend = last && first ? last.lowestMarket - first.lowestMarket : 0;

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-3 md:py-4 sticky top-0 z-10">
        <div className="flex items-center gap-2 md:gap-0">
          <div className="w-7 h-7 rounded-lg bg-[#FFE600] flex items-center justify-center md:hidden">
            <ShieldCheck className="w-4 h-4 text-[#0f172a]" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold text-slate-900">Historial de Precios</h1>
            <p className="hidden md:block text-xs text-slate-400 mt-0.5">Evolución del precio de mercado por producto</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto space-y-4 md:space-y-6">
        {/* Product selector — grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {products.map(p => (
            <button key={p.id} onClick={() => setSelectedId(p.id)}
              className={`rounded-xl border p-2 md:p-3 text-left transition-all active:scale-[0.97] ${
                selectedId === p.id ? "border-slate-900 bg-slate-900 shadow-md" : "border-slate-200 bg-white hover:border-slate-400"
              }`}>
              <div className="text-lg md:text-xl mb-0.5 md:mb-1">{brandEmoji[p.brand] ?? "📦"}</div>
              <p className={`text-[10px] font-semibold leading-tight ${selectedId === p.id ? "text-white" : "text-slate-700"}`}>{p.brand}</p>
              <div className={`mt-1 w-2 h-2 rounded-full ${p.status === "critical" ? "bg-red-500" : p.status === "warning" ? "bg-amber-400" : "bg-green-400"}`} />
            </button>
          ))}
        </div>

        {/* Product summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5">
          <div className="flex flex-wrap items-start md:items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-900 text-sm md:text-base">{product.name}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{product.totalListings} publicaciones · EAN: {product.ean}</p>
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <div className="text-right">
                <p className="text-[10px] text-slate-400">Precio mínimo</p>
                <p className="font-bold text-slate-900 text-sm">${product.minPrice.toLocaleString("es-CL")}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400">Más bajo actual</p>
                <p className={`font-bold text-sm ${product.lowestDetected < product.minPrice ? "text-red-500" : "text-green-600"}`}>
                  ${product.lowestDetected.toLocaleString("es-CL")}
                </p>
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg ${
                trend < 0 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
              }`}>
                {trend < 0 ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                ${Math.abs(trend).toLocaleString("es-CL")}
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5">
          <h3 className="font-semibold text-slate-900 text-sm md:text-base mb-1">Evolución últimos 14 días</h3>
          <p className="text-xs text-slate-400 mb-4">Línea roja = precio mínimo autorizado</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmt} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={45} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={product.minPrice} stroke="#ef4444" strokeDasharray="4 4" strokeWidth={1.5} />
              <Line type="monotone" dataKey="minPrice" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="lowestMarket" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: "#3b82f6", stroke: "white", strokeWidth: 2 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Timeline alertas */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-4 md:px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 text-sm md:text-base">Historial de alertas</h3>
          </div>
          {productAlerts.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-sm">Sin alertas para este producto</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {productAlerts.map(alert => {
                const drop = (((alert.price - alert.minPrice) / alert.minPrice) * 100).toFixed(1);
                return (
                  <div key={alert.id} className="px-4 md:px-5 py-3.5 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm text-slate-800">
                        <span className="font-semibold text-red-600">{alert.seller}</span>
                        {" · "}
                        <span className="font-bold">${alert.price.toLocaleString("es-CL")}</span>
                        <span className="text-red-400"> ({drop}% bajo)</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">{alert.sentAt}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${alert.read ? "bg-slate-100 text-slate-400" : "bg-red-50 text-red-600"}`}>
                      {alert.read ? "Leída" : "Nueva"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
