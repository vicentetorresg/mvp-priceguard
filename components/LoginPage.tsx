"use client";
import { useState } from "react";
import { ShieldCheck, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (user === "jmvaldes" && pass === "jose1234") {
        localStorage.setItem("pg_auth", "1");
        onLogin();
      } else {
        setError("Usuario o contraseña incorrectos");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#FFE600]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#FFE600] flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/20">
            <ShieldCheck className="w-8 h-8 text-[#0f172a]" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-white">PriceGuard</h1>
          <p className="text-slate-400 text-sm mt-1">Monitor de Precios Mínimos · Mercado Libre</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-lg font-semibold text-white mb-1">Iniciar sesión</h2>
          <p className="text-sm text-slate-400 mb-6">Ingresa tus credenciales de acceso</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">Usuario</label>
              <input
                type="text"
                value={user}
                onChange={e => { setUser(e.target.value); setError(""); }}
                placeholder="tu_usuario"
                autoCapitalize="none"
                autoCorrect="off"
                className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm outline-none transition-all ${
                  error ? "border-red-500/60 focus:border-red-400" : "border-white/10 focus:border-[#FFE600]/60 focus:bg-white/15"
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={pass}
                  onChange={e => { setPass(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className={`w-full bg-white/10 border rounded-xl px-4 py-3 pr-11 text-white placeholder-slate-500 text-sm outline-none transition-all ${
                    error ? "border-red-500/60 focus:border-red-400" : "border-white/10 focus:border-[#FFE600]/60 focus:bg-white/15"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !user || !pass}
              className="w-full bg-[#FFE600] text-[#0f172a] font-bold rounded-xl py-3 text-sm transition-all hover:bg-yellow-400 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-[#0f172a]/30 border-t-[#0f172a] rounded-full animate-spin" />
              ) : "Ingresar"}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          PriceGuard © 2025 · Acceso restringido
        </p>
      </div>
    </div>
  );
}
