"use client";
import { useState } from "react";
import { Mail, MessageCircle, Clock, User, Shield, Plus, Edit2, Check, X, LogOut, ShieldCheck } from "lucide-react";
import { products } from "@/lib/mockData";

type Tab = "productos" | "notificaciones" | "equipo";

const brandEmoji: Record<string, string> = {
  Samsung: "📱", LG: "📺", Sony: "🎧", Xiaomi: "📲", Philips: "🍳", Asus: "💻",
};

const teamMembers = [
  { name: "Vicente Torres", email: "vicente@marca.cl", role: "Admin", initials: "VT", color: "from-blue-400 to-purple-500" },
  { name: "Carla Muñoz", email: "carla@marca.cl", role: "Viewer", initials: "CM", color: "from-pink-400 to-rose-500" },
  { name: "Rodrigo Silva", email: "rodrigo@marca.cl", role: "Viewer", initials: "RS", color: "from-green-400 to-emerald-500" },
];

export default function ConfigView({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("productos");
  const [minPrices, setMinPrices] = useState<Record<string, number>>(
    Object.fromEntries(products.map(p => [p.id, p.minPrice]))
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [frequency, setFrequency] = useState("2h");

  const startEdit = (id: string) => { setEditingId(id); setEditValue(String(minPrices[id])); };
  const saveEdit = (id: string) => {
    const val = parseInt(editValue.replace(/\D/g, ""));
    if (!isNaN(val) && val > 0) setMinPrices(prev => ({ ...prev, [id]: val }));
    setEditingId(null);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 md:gap-0">
          <div className="w-7 h-7 rounded-lg bg-[#FFE600] flex items-center justify-center md:hidden">
            <ShieldCheck className="w-4 h-4 text-[#0f172a]" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold text-slate-900">Configuración</h1>
            <p className="hidden md:block text-xs text-slate-400 mt-0.5">Precios mínimos, notificaciones y equipo</p>
          </div>
        </div>
        {/* Logout en mobile */}
        <button onClick={onLogout} className="md:hidden flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
          <LogOut className="w-3.5 h-3.5" /> Salir
        </button>
      </header>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Tabs — scrollable on mobile */}
        <div className="flex border-b border-slate-200 mb-6 overflow-x-auto scrollbar-hide">
          {([
            { id: "productos", label: "Precios mínimos", icon: Shield },
            { id: "notificaciones", label: "Notificaciones", icon: Mail },
            { id: "equipo", label: "Equipo", icon: User },
          ] as { id: Tab; label: string; icon: React.ElementType }[]).map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 md:px-5 py-3 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === id ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}>
              <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab: Productos */}
        {tab === "productos" && (
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs md:text-sm text-slate-500 mb-4">Define el precio mínimo de venta para cada producto.</p>
            {products.map(p => (
              <div key={p.id} className="bg-white rounded-xl border border-slate-200 px-4 md:px-5 py-3.5 md:py-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-slate-100 flex items-center justify-center text-base md:text-lg shrink-0">
                    {brandEmoji[p.brand] ?? "📦"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm font-medium text-slate-900 truncate">{p.name}</p>
                    <p className="text-[10px] text-slate-400 hidden sm:block">EAN: {p.ean}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {editingId === p.id ? (
                    <>
                      <span className="text-sm text-slate-400">$</span>
                      <input type="text" value={editValue} onChange={e => setEditValue(e.target.value)}
                        className="w-24 md:w-28 text-sm border border-slate-300 rounded-lg px-2 py-1 text-right font-bold outline-none focus:border-blue-400"
                        onKeyDown={e => { if (e.key === "Enter") saveEdit(p.id); if (e.key === "Escape") setEditingId(null); }}
                        autoFocus />
                      <button onClick={() => saveEdit(p.id)} className="w-7 h-7 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="w-7 h-7 bg-slate-200 text-slate-600 rounded-lg flex items-center justify-center">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-sm md:text-base font-bold text-slate-900">${minPrices[p.id].toLocaleString("es-CL")}</span>
                      <button onClick={() => startEdit(p.id)} className="w-7 h-7 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Notificaciones */}
        {tab === "notificaciones" && (
          <div className="space-y-4 max-w-xl">
            {/* Email */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm md:text-base">Email</p>
                    <p className="text-xs text-slate-400">Alertas inmediatas por correo</p>
                  </div>
                </div>
                <button onClick={() => setEmailEnabled(!emailEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${emailEnabled ? "bg-slate-900" : "bg-slate-200"}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${emailEnabled ? "left-6" : "left-1"}`} />
                </button>
              </div>
              {emailEnabled && (
                <div className="space-y-2">
                  <div className="bg-slate-50 rounded-lg px-3 py-2.5 flex items-center justify-between">
                    <span className="text-sm text-slate-700">vicente@marca.cl</span>
                    <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">Admin</span>
                  </div>
                  <div className="bg-slate-50 rounded-lg px-3 py-2.5 flex items-center justify-between">
                    <span className="text-sm text-slate-700">carla@marca.cl</span>
                    <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">CC</span>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs text-blue-600 font-medium mt-1">
                    <Plus className="w-3.5 h-3.5" /> Agregar destinatario
                  </button>
                </div>
              )}
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm md:text-base">WhatsApp</p>
                    <p className="text-xs text-slate-400">Notificaciones por WhatsApp</p>
                  </div>
                </div>
                <button onClick={() => setWhatsappEnabled(!whatsappEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${whatsappEnabled ? "bg-slate-900" : "bg-slate-200"}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${whatsappEnabled ? "left-6" : "left-1"}`} />
                </button>
              </div>
              {whatsappEnabled && (
                <div className="bg-slate-50 rounded-lg px-3 py-2.5 mt-4">
                  <span className="text-sm text-slate-700">+56 9 1234 5678</span>
                </div>
              )}
            </div>

            {/* Frecuencia */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm md:text-base">Frecuencia de monitoreo</p>
                  <p className="text-xs text-slate-400">Cada cuánto revisamos los precios</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["1h", "2h", "4h", "12h", "24h"].map(f => (
                  <button key={f} onClick={() => setFrequency(f)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      frequency === f ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                    }`}>
                    {f}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-3">
                ~{Math.round(24 / parseInt(frequency))} revisiones diarias por producto.
              </p>
            </div>
          </div>
        )}

        {/* Tab: Equipo */}
        {tab === "equipo" && (
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs md:text-sm text-slate-500">Gestiona quién tiene acceso.</p>
              <button className="flex items-center gap-1.5 text-xs md:text-sm font-semibold bg-[#FFE600] text-slate-900 rounded-lg px-3 py-2 hover:bg-yellow-400 transition-colors">
                <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" /> Invitar
              </button>
            </div>
            {teamMembers.map(m => (
              <div key={m.email} className="bg-white rounded-xl border border-slate-200 px-4 md:px-5 py-3.5 md:py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-xs font-bold text-white`}>
                    {m.initials}
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-medium text-slate-900">{m.name}</p>
                    <p className="text-[10px] text-slate-400 hidden sm:block">{m.email}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${m.role === "Admin" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {m.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
