"use client";
import { X, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/mockData";
import { listings } from "@/lib/mockData";

const brandEmoji: Record<string, string> = {
  Samsung: "📱", LG: "📺", Sony: "🎧", Xiaomi: "📲", Philips: "🍳", Asus: "💻",
};

const reputationColor: Record<string, string> = {
  platinum: "text-cyan-600 bg-cyan-50",
  gold: "text-amber-600 bg-amber-50",
  silver: "text-slate-500 bg-slate-100",
  bronze: "text-orange-600 bg-orange-50",
};

const reputationLabel: Record<string, string> = {
  platinum: "Platinum", gold: "Gold", silver: "Silver", bronze: "Bronze",
};

export default function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const productListings = listings.filter(l => l.productId === product.id);
  const gap = product.minPrice - product.lowestDetected;
  const violations = productListings.filter(l => l.isViolation);
  const compliant = productListings.filter(l => !l.isViolation);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      {/* Mobile: sheet from bottom. Desktop: centered modal */}
      <div className="relative bg-white w-full md:max-w-2xl md:rounded-2xl rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Drag handle on mobile */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4 md:p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl md:text-2xl">
              {brandEmoji[product.brand] ?? "📦"}
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base md:text-lg leading-tight">{product.name}</h2>
              <p className="text-xs text-slate-400 mt-0.5">EAN: {product.ean} · {product.brand}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 p-4 md:p-6 border-b border-slate-100">
          <div className="text-center">
            <p className="text-[10px] md:text-xs text-slate-400 font-medium">Precio mínimo</p>
            <p className="text-base md:text-xl font-bold text-slate-900 mt-1">${product.minPrice.toLocaleString("es-CL")}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] md:text-xs text-slate-400 font-medium">Más bajo detectado</p>
            <p className={`text-base md:text-xl font-bold mt-1 ${gap > 0 ? "text-red-500" : "text-green-600"}`}>
              ${product.lowestDetected.toLocaleString("es-CL")}
            </p>
            {gap > 0 && <p className="text-[10px] text-red-400 font-medium">−${gap.toLocaleString("es-CL")}</p>}
          </div>
          <div className="text-center">
            <p className="text-[10px] md:text-xs text-slate-400 font-medium">Pub. / Infracc.</p>
            <p className="text-base md:text-xl font-bold text-slate-900 mt-1">
              {product.totalListings}<span className="text-red-500"> / {product.violationsCount}</span>
            </p>
          </div>
        </div>

        {/* Listings */}
        <div className="p-4 md:p-6 space-y-4">
          {violations.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-900 text-sm mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Infracciones ({violations.length})
              </h3>
              <div className="space-y-2">
                {violations.map(listing => (
                  <div key={listing.id} className="flex items-center justify-between rounded-xl px-3 md:px-4 py-2.5 md:py-3 border bg-red-50 border-red-200">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{listing.seller}</p>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${reputationColor[listing.reputation]}`}>
                          {reputationLabel[listing.reputation]}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <p className="text-sm md:text-base font-bold text-red-600">${listing.price.toLocaleString("es-CL")}</p>
                        <p className="text-xs text-red-400">−${(product.minPrice - listing.price).toLocaleString("es-CL")}</p>
                      </div>
                      <a href={listing.link} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {compliant.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-900 text-sm mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                En regla ({compliant.length})
              </h3>
              <div className="space-y-2">
                {compliant.map(listing => (
                  <div key={listing.id} className="flex items-center justify-between rounded-xl px-3 md:px-4 py-2.5 md:py-3 border bg-green-50 border-green-200">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{listing.seller}</p>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${reputationColor[listing.reputation]}`}>
                          {reputationLabel[listing.reputation]}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <p className="text-sm md:text-base font-bold text-green-600">${listing.price.toLocaleString("es-CL")}</p>
                      <a href={listing.link} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {productListings.length < product.totalListings && (
            <p className="text-xs text-slate-400 text-center border-t border-slate-100 pt-3">
              + {product.totalListings - productListings.length} publicaciones más en regla no mostradas
            </p>
          )}
        </div>

        <div className="px-5 pb-5 md:px-6 md:pb-6">
          <p className="text-xs text-slate-400 text-center">Última revisión: {product.lastChecked} · Próxima en 2 horas</p>
        </div>
      </div>
    </div>
  );
}
