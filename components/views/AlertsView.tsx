"use client";
import { useState } from "react";
import { Mail, MessageCircle, AlertTriangle, CheckCheck, ExternalLink, ShieldCheck } from "lucide-react";
import { alerts as initialAlerts } from "@/lib/mockData";
import type { Alert } from "@/lib/mockData";

type Filter = "todas" | "no-leidas" | "leidas";

export default function AlertsView() {
  const [alertList, setAlertList] = useState<Alert[]>(initialAlerts);
  const [filter, setFilter] = useState<Filter>("todas");
  const [productFilter, setProductFilter] = useState("todos");

  const markRead = (id: string) => setAlertList(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  const markAllRead = () => setAlertList(prev => prev.map(a => ({ ...a, read: true })));

  const productNames = Array.from(new Set(alertList.map(a => a.productName)));
  const unreadCount = alertList.filter(a => !a.read).length;

  const filtered = alertList.filter(a => {
    if (filter === "no-leidas" && a.read) return false;
    if (filter === "leidas" && !a.read) return false;
    if (productFilter !== "todos" && a.productName !== productFilter) return false;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 md:gap-0">
          <div className="w-7 h-7 rounded-lg bg-[#FFE600] flex items-center justify-center md:hidden">
            <ShieldCheck className="w-4 h-4 text-[#0f172a]" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold text-slate-900">Alertas</h1>
            <p className="hidden md:block text-xs text-slate-400 mt-0.5">
              {unreadCount > 0 ? `${unreadCount} sin leer` : "Todas leídas"}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="flex items-center gap-1.5 text-xs md:text-sm text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 md:px-3 py-1.5 md:py-2 hover:bg-slate-50 transition-colors">
            <CheckCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Marcar todas leídas</span>
            <span className="sm:hidden">Leer todas</span>
          </button>
        )}
      </header>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mb-5">
          <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden">
            {(["todas", "no-leidas", "leidas"] as Filter[]).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`flex-1 px-3 py-2 text-xs md:text-sm font-medium transition-colors ${
                  filter === f ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"
                }`}>
                {f === "no-leidas" ? <>No leídas{unreadCount > 0 && <span className="ml-1 bg-red-500 text-white text-[9px] px-1 py-0.5 rounded-full">{unreadCount}</span>}</> : f === "leidas" ? "Leídas" : "Todas"}
              </button>
            ))}
          </div>
          <select value={productFilter} onChange={e => setProductFilter(e.target.value)}
            className="text-xs md:text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-600 outline-none focus:border-slate-400">
            <option value="todos">Todos los productos</option>
            {productNames.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <AlertTriangle className="w-8 h-8 mx-auto mb-3 opacity-40" />
            <p className="font-medium text-sm">Sin alertas en esta vista</p>
          </div>
        ) : (
          <div className="space-y-2 md:space-y-3">
            {filtered.map(alert => {
              const dropPct = (((alert.price - alert.minPrice) / alert.minPrice) * 100).toFixed(1);
              const dropAbs = (alert.minPrice - alert.price).toLocaleString("es-CL");
              return (
                <div key={alert.id} className={`bg-white rounded-xl border transition-all ${!alert.read ? "border-red-200 shadow-sm shadow-red-50" : "border-slate-200"}`}>
                  <div className="p-4 md:p-5 flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!alert.read ? "bg-red-500" : "bg-slate-300"}`} />
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${!alert.read ? "bg-red-50" : "bg-slate-50"}`}>
                      <AlertTriangle className={`w-4 h-4 ${!alert.read ? "text-red-500" : "text-slate-400"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 text-sm truncate">{alert.productName}</p>
                          <p className="text-xs md:text-sm text-slate-600 mt-0.5">
                            <span className="font-semibold text-red-600">{alert.seller}</span>
                            {" · "}
                            <span className="font-bold text-slate-900">${alert.price.toLocaleString("es-CL")}</span>
                            <span className="text-red-500"> (−${dropAbs}, {dropPct}%)</span>
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <div className={`flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                            alert.channel === "email" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                          }`}>
                            {alert.channel === "email" ? <Mail className="w-2.5 h-2.5" /> : <MessageCircle className="w-2.5 h-2.5" />}
                            {alert.channel === "email" ? "Email" : "WA"}
                          </div>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{alert.sentAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2.5">
                        <a href="#" onClick={e => e.preventDefault()}
                          className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors">
                          <ExternalLink className="w-3 h-3" /> Ver en MeLi
                        </a>
                        {!alert.read && (
                          <button onClick={() => markRead(alert.id)}
                            className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg hover:bg-slate-200 transition-colors">
                            Marcar leída
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
