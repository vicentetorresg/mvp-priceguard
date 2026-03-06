"use client";
import { Package, AlertTriangle, Bell, CheckCircle } from "lucide-react";
import { products, alerts } from "@/lib/mockData";
import type { View } from "@/app/page";

export default function StatsCards({ onNav }: { onNav?: (v: View) => void }) {
  const totalProducts = products.length;
  const totalViolations = products.reduce((s, p) => s + p.violationsCount, 0);
  const alertsToday = alerts.filter(a => a.sentAt.includes("Hoy")).length;
  const okProducts = products.filter(p => p.status === "ok").length;

  const cards = [
    { label: "Productos", value: totalProducts, icon: Package, color: "bg-blue-50 text-blue-600", trend: "+2 este mes", trendUp: true, view: "Productos" as View },
    { label: "Infracciones activas", value: totalViolations, icon: AlertTriangle, color: "bg-red-50 text-red-500", trend: "+3 desde ayer", trendUp: false, view: "Alertas" as View },
    { label: "Alertas hoy", value: alertsToday, icon: Bell, color: "bg-amber-50 text-amber-500", trend: "3 email · 1 WhatsApp", trendUp: null, view: "Alertas" as View },
    { label: "En regla", value: okProducts, icon: CheckCircle, color: "bg-green-50 text-green-500", trend: `${Math.round((okProducts / totalProducts) * 100)}% del total`, trendUp: true, view: "Productos" as View },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {cards.map(card => (
        <button
          key={card.label}
          onClick={() => onNav?.(card.view)}
          className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 flex flex-col gap-2 md:gap-3 text-left hover:shadow-md hover:border-slate-300 transition-all group active:scale-[0.98]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium leading-tight">{card.label}</span>
            <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center shrink-0 ${card.color}`}>
              <card.icon className="w-4 h-4" strokeWidth={2} />
            </div>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-slate-900">{card.value}</p>
            <p className={`text-xs mt-0.5 font-medium ${
              card.trendUp === true ? "text-green-500" :
              card.trendUp === false ? "text-red-500" : "text-slate-400"
            }`}>
              {card.trend}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
