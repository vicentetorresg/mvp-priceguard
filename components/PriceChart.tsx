"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { priceHistoryByProduct, products } from "@/lib/mockData";

const fmt = (v: number) => `$${(v / 1000).toFixed(0)}K`;

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

export default function PriceChart() {
  const [selectedId, setSelectedId] = useState("1");
  const product = products.find(p => p.id === selectedId)!;
  const data = priceHistoryByProduct[selectedId] ?? [];
  const lastPoint = data[data.length - 1];
  const isViolation = lastPoint && lastPoint.lowestMarket < lastPoint.minPrice;
  const diffPct = lastPoint
    ? (((lastPoint.lowestMarket - lastPoint.minPrice) / lastPoint.minPrice) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5">
      <div className="flex items-start justify-between mb-3 md:mb-4 gap-2">
        <div>
          <h3 className="font-semibold text-slate-900 text-sm md:text-base">Evolución de Precios</h3>
          <p className="text-xs text-slate-400 mt-0.5 hidden md:block">Selecciona un producto</p>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
          isViolation ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"
        }`}>
          {isViolation ? `${diffPct}%` : "En regla"}
        </span>
      </div>

      {/* Product selector — scrollable horizontal */}
      <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1 scrollbar-hide">
        {products.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all border whitespace-nowrap shrink-0 ${
              selectedId === p.id
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
            }`}
          >
            {p.brand} {p.name.split(" ").slice(2, 4).join(" ")}
          </button>
        ))}
      </div>

      <div className="text-xs text-slate-500 mb-2 font-medium truncate">{product.name}</div>

      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={fmt} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={40} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={product.minPrice} stroke="#ef4444" strokeDasharray="4 4" strokeWidth={1.5} />
          <Line type="monotone" dataKey="minPrice" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          <Line type="monotone" dataKey="lowestMarket" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: "#3b82f6" }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <div className="w-3 border-t-2 border-dashed border-slate-300"></div>
          <span className="text-[10px] text-slate-400">Precio mínimo</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-blue-500"></div>
          <span className="text-[10px] text-slate-400">Más bajo MeLi</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 border-t-2 border-dashed border-red-400"></div>
          <span className="text-[10px] text-slate-400">Límite infracción</span>
        </div>
      </div>
    </div>
  );
}
