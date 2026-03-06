"use client";
import { useState } from "react";
import { LayoutDashboard, Package, Bell, BarChart2, Settings, ShieldCheck, ChevronRight } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Package, label: "Productos", active: false },
  { icon: Bell, label: "Alertas", active: false, badge: 2 },
  { icon: BarChart2, label: "Historial", active: false },
  { icon: Settings, label: "Configuración", active: false },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="w-60 min-h-screen bg-[#0f172a] flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFE600] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#0f172a]" strokeWidth={2.5} />
          </div>
          <div>
            <span className="font-bold text-white text-base leading-tight block">PriceGuard</span>
            <span className="text-[10px] text-slate-400 leading-tight block">Mercado Libre Monitor</span>
          </div>
        </div>
      </div>

      {/* Brand pill */}
      <div className="px-4 py-3 border-b border-white/10">
        <div className="bg-white/5 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FFE600] text-[#0f172a] text-xs font-bold flex items-center justify-center">S</div>
            <span className="text-sm text-white font-medium">Samsung Chile</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ icon: Icon, label, badge }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              active === label
                ? "bg-[#FFE600] text-[#0f172a]"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon className="w-4 h-4" strokeWidth={2} />
            <span className="flex-1 text-left">{label}</span>
            {badge && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                active === label ? "bg-[#0f172a] text-[#FFE600]" : "bg-red-500 text-white"
              }`}>
                {badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">VT</div>
          <div className="flex-1">
            <p className="text-xs font-medium text-white">Vicente Torres</p>
            <p className="text-[10px] text-slate-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
