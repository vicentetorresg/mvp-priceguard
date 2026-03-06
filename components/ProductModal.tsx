"use client";
import { X, ExternalLink, Star, Award } from "lucide-react";
import type { Product } from "@/lib/mockData";
import { listings } from "@/lib/mockData";

const reputationColor: Record<string, string> = {
  platinum: "text-cyan-600 bg-cyan-50",
  gold: "text-amber-600 bg-amber-50",
  silver: "text-slate-500 bg-slate-100",
  bronze: "text-orange-600 bg-orange-50",
};

const reputationLabel: Record<string, string> = {
  platinum: "Platinum",
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
};

export default function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const productListings = listings.filter(l => l.productId === product.id);
  const gap = product.minPrice - product.lowestDetected;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
              {product.brand === "Samsung" ? "📱" : product.brand === "LG" ? "📺" : product.brand === "Sony" ? "🎧" : product.brand === "Xiaomi" ? "📲" : product.brand === "Philips" ? "🍳" : "💻"}
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-lg leading-tight">{product.name}</h2>
              <p className="text-xs text-slate-400 mt-0.5">EAN: {product.ean} · {product.brand}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 p-6 border-b border-slate-100">
          <div className="text-center">
            <p className="text-xs text-slate-400 font-medium">Precio mínimo</p>
            <p className="text-xl font-bold text-slate-900 mt-1">${product.minPrice.toLocaleString("es-CL")}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 font-medium">Más bajo detectado</p>
            <p className="text-xl font-bold text-red-500 mt-1">${product.lowestDetected.toLocaleString("es-CL")}</p>
            {gap > 0 && (
              <p className="text-xs text-red-400 font-medium">${gap.toLocaleString("es-CL")} bajo el mínimo</p>
            )}
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 font-medium">Publicaciones / Infracciones</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {product.totalListings}
              <span className="text-red-500"> / {product.violationsCount}</span>
            </p>
          </div>
        </div>

        {/* Listings */}
        <div className="p-6">
          <h3 className="font-semibold text-slate-900 mb-3 text-sm">Vendedores detectados</h3>
          {productListings.length === 0 ? (
            <p className="text-sm text-slate-400">Sin datos para este producto.</p>
          ) : (
            <div className="space-y-2">
              {productListings.map(listing => (
                <div
                  key={listing.id}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 border ${
                    listing.isViolation
                      ? "bg-red-50 border-red-200"
                      : "bg-green-50 border-green-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {listing.isViolation ? (
                      <div className="w-2 h-2 rounded-full bg-red-500 pulse-dot" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{listing.seller}</p>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${reputationColor[listing.reputation]}`}>
                        {reputationLabel[listing.reputation]}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`text-base font-bold ${listing.isViolation ? "text-red-600" : "text-green-600"}`}>
                        ${listing.price.toLocaleString("es-CL")}
                      </p>
                      {listing.isViolation && (
                        <p className="text-xs text-red-400">
                          −${(product.minPrice - listing.price).toLocaleString("es-CL")}
                        </p>
                      )}
                    </div>
                    <a href={listing.link} className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {productListings.length < product.totalListings && (
            <p className="text-xs text-slate-400 mt-3 text-center">
              + {product.totalListings - productListings.length} publicaciones más sin infracciones
            </p>
          )}
        </div>

        {/* Last check */}
        <div className="px-6 pb-6">
          <p className="text-xs text-slate-400 text-center">Última revisión: {product.lastChecked} · Próxima en 2 horas</p>
        </div>
      </div>
    </div>
  );
}
