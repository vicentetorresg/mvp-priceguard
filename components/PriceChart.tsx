"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { priceHistory } from "@/lib/mockData";

const fmt = (v: number) => `$${(v / 1000).toFixed(0)}K`;

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; dataKey: string }[]; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div style={{ fontSize: 12, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 12px" }}>
      <p style={{ fontWeight: 600, marginBottom: 4, color: "#0f172a" }}>{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.dataKey === "minPrice" ? "#94a3b8" : "#3b82f6", margin: "2px 0" }}>
          {p.dataKey === "minPrice" ? "Precio mínimo" : "Más bajo en MeLi"}: ${p.value.toLocaleString("es-CL")}
        </p>
      ))}
    </div>
  );
};

export default function PriceChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-900">Evolución de Precios</h3>
          <p className="text-xs text-slate-400 mt-0.5">Samsung Galaxy A15 128GB · últimos 14 días</p>
        </div>
        <span className="text-xs bg-red-50 text-red-500 font-medium px-2 py-1 rounded-full">
          −11.7% vs precio mínimo
        </span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={priceHistory} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={45} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => value === "minPrice" ? "Precio mínimo" : "Precio más bajo en MeLi"}
            iconType="circle"
            wrapperStyle={{ fontSize: 12 }}
          />
          <ReferenceLine y={299990} stroke="#ef4444" strokeDasharray="4 4" />
          <Line type="monotone" dataKey="minPrice" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          <Line type="monotone" dataKey="lowestMarket" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: "#3b82f6" }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
