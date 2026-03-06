"use client";
import { Package, AlertTriangle, Bell, CheckCircle } from "lucide-react";
import { products, alerts } from "@/lib/mockData";

export default function StatsCards() {
  const totalProducts = products.length;
  const totalViolations = products.reduce((s, p) => s + p.violationsCount, 0);
  const alertsToday = alerts.filter(a => a.sentAt.includes("Hoy")).length;
  const okProducts = products.filter(p => p.status === "ok").length;

  const cards = [
    {
      label: "Productos monitoreados",
      value: totalProducts,
      icon: Package,
      color: "bg-blue-50 text-blue-600",
      trend: "+2 este mes",
      trendUp: true,
    },
    {
      label: "Infracciones activas",
      value: totalViolations,
      icon: AlertTriangle,
      color: "bg-red-50 text-red-500",
      trend: "+3 desde ayer",
      trendUp: false,
    },
    {
      label: "Alertas enviadas hoy",
      value: alertsToday,
      icon: Bell,
      color: "bg-amber-50 text-amber-500",
      trend: "2 email · 0 WhatsApp",
      trendUp: null,
    },
    {
      label: "Productos en regla",
      value: okProducts,
      icon: CheckCircle,
      color: "bg-green-50 text-green-500",
      trend: `${Math.round((okProducts / totalProducts) * 100)}% del total`,
      trendUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map(card => (
        <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500 font-medium">{card.label}</span>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.color}`}>
              <card.icon className="w-4 h-4" strokeWidth={2} />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">{card.value}</p>
            <p className={`text-xs mt-1 font-medium ${
              card.trendUp === true ? "text-green-500" :
              card.trendUp === false ? "text-red-500" : "text-slate-400"
            }`}>
              {card.trend}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
