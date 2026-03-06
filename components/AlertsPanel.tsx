"use client";
import { Mail, MessageCircle, AlertTriangle } from "lucide-react";
import { alerts } from "@/lib/mockData";

export default function AlertsPanel() {
  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Alertas recientes</h3>
        <span className="text-xs bg-red-500 text-white font-bold px-2 py-0.5 rounded-full">
          {alerts.filter(a => !a.read).length} nuevas
        </span>
      </div>
      <div className="divide-y divide-slate-100">
        {alerts.map(alert => {
          const drop = (((alert.price - alert.minPrice) / alert.minPrice) * 100).toFixed(1);
          return (
            <div key={alert.id} className={`px-5 py-3.5 flex items-start gap-3 ${!alert.read ? "bg-red-50/40" : ""}`}>
              {!alert.read && (
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0 pulse-dot" />
              )}
              {alert.read && <div className="w-2 shrink-0" />}
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 leading-tight truncate">{alert.productName}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  <span className="font-semibold text-red-500">{alert.seller}</span>
                  {" publicó a "}
                  <span className="font-bold text-slate-700">${alert.price.toLocaleString("es-CL")}</span>
                  <span className="text-red-400"> ({drop}% bajo)</span>
                </p>
                <div className="flex items-center gap-2 mt-1.5">
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
        <button className="text-xs text-blue-600 font-medium hover:underline">Ver historial completo →</button>
      </div>
    </div>
  );
}
