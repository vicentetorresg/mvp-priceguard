"use client";
import { useState } from "react";
import { ChevronRight, AlertTriangle, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { products, listings } from "@/lib/mockData";
import type { Product } from "@/lib/mockData";
import ProductModal from "./ProductModal";

const StatusBadge = ({ status }: { status: Product["status"] }) => {
  if (status === "ok") return (
    <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
      <CheckCircle className="w-3 h-3" /> En regla
    </span>
  );
  if (status === "warning") return (
    <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
      <AlertCircle className="w-3 h-3" /> Alerta
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
      <AlertTriangle className="w-3 h-3" /> Infracción
    </span>
  );
};

export default function ProductsTable() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Productos monitoreados</h3>
          <button className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
            + Agregar producto
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-xs text-slate-500 font-medium">
              <th className="text-left px-5 py-3">Producto</th>
              <th className="text-right px-4 py-3">Precio mínimo</th>
              <th className="text-right px-4 py-3">Más bajo detectado</th>
              <th className="text-center px-4 py-3">Publicaciones</th>
              <th className="text-center px-4 py-3">Infracciones</th>
              <th className="text-center px-4 py-3">Estado</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map(p => {
              const diff = p.lowestDetected < p.minPrice
                ? (((p.lowestDetected - p.minPrice) / p.minPrice) * 100).toFixed(1)
                : null;
              return (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors cursor-pointer" onClick={() => setSelected(p)}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-lg shrink-0">
                        {p.brand === "Samsung" ? "📱" : p.brand === "LG" ? "📺" : p.brand === "Sony" ? "🎧" : p.brand === "Xiaomi" ? "📲" : p.brand === "Philips" ? "🍳" : "💻"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 leading-tight">{p.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">EAN: {p.ean}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-sm font-semibold text-slate-700">${p.minPrice.toLocaleString("es-CL")}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div>
                      <span className={`text-sm font-bold ${p.lowestDetected < p.minPrice ? "text-red-500" : "text-green-600"}`}>
                        ${p.lowestDetected.toLocaleString("es-CL")}
                      </span>
                      {diff && (
                        <p className="text-xs text-red-400 font-medium">{diff}%</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="text-sm text-slate-600">{p.totalListings}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    {p.violationsCount > 0 ? (
                      <span className="text-sm font-bold text-red-500">{p.violationsCount}</span>
                    ) : (
                      <span className="text-sm text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
