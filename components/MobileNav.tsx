"use client";
import { LayoutDashboard, Package, Bell, BarChart2, Settings } from "lucide-react";
import type { View } from "@/app/page";
import { alerts } from "@/lib/mockData";

const navItems: { icon: React.ElementType; label: string; view: View; badge?: number }[] = [
  { icon: LayoutDashboard, label: "Inicio", view: "Dashboard" },
  { icon: Package, label: "Productos", view: "Productos" },
  { icon: Bell, label: "Alertas", view: "Alertas", badge: alerts.filter(a => !a.read).length },
  { icon: BarChart2, label: "Historial", view: "Historial" },
  { icon: Settings, label: "Config", view: "Configuracion" },
];

export default function MobileNav({ activeView, onNav }: { activeView: View; onNav: (v: View) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 flex md:hidden safe-bottom">
      {navItems.map(({ icon: Icon, label, view, badge }) => {
        const active = activeView === view;
        return (
          <button
            key={view}
            onClick={() => onNav(view)}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors relative ${
              active ? "text-slate-900" : "text-slate-400"
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.8} />
              {badge != null && badge > 0 && (
                <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-medium ${active ? "text-slate-900" : "text-slate-400"}`}>
              {label}
            </span>
            {active && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#FFE600] rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
