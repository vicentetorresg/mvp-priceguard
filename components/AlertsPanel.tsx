"use client";
import { useState } from "react";
import { Mail, MessageCircle, AlertTriangle } from "lucide-react";
import { alerts as initialAlerts } from "@/lib/mockData";
import type { View } from "@/app/page";

export default function AlertsPanel({ onNav }: { onNav?: (v: View) => void }) {
  const [alertList, setAlertList] = useState(initialAlerts);

  const markRead = (id: string) => {
    setAlertList(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const unread = alertList.filter(a => !a.read).length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 flex flex-col">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Alertas recientes</h3>
        {unread > 0 && (
          <span className="text-xs bg-red-500 text-white font-bold px-2 py-0.5 rounded-full">
            {unread} nuevas
          </span>
        )}
      </div>
      <div className="divide-y divide-slate-100 flex-1">
        {alertList.slice(0, 5).map(alert => {
          const drop = (((alert.price - alert.minPrice) / alert.minPrice) * 100).toFixed(1);
          return (
            <div
              key={alert.id}
              onClick={() => markRead(alert.id)}
              className={`px-4 py-3 flex items-start gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${!alert.read ? "bg-red-50/40" : ""}`}
            >
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!alert.read ? "bg-red-500" : "bg-slate-200"}`} />
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 leading-tight truncate">{alert.productName}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  <span className="font-semibold text-red-500">{alert.seller}</span>
                  {" · "}
                  <span className="font-bold text-slate-700">${alert.price.toLocaleString("es-CL")}</span>
                  <span className="text-red-400"> ({drop}%)</span>
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-slate-400">{alert.sentAt}</span>
                  <span className={`flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    alert.channel === "email" ? "bg-blue-50 text-blue-500" : "bg-green-50 text-green-500"
                  }`}>
                    {alert.channel === "email" ? <Mail className="w-2.5 h-2.5" /> : <MessageCircle className="w-2.5 h-2.5" />}
                    {alert.channel === "email" ? "Email" : "WhatsApp"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-5 py-3 border-t border-slate-100">
        <button
          onClick={() => onNav?.("Alertas")}
          className="text-xs text-blue-600 font-medium hover:underline"
        >
          Ver todas las alertas →
        </button>
      </div>
    </div>
  );
}
