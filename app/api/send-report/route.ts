import { Resend } from "resend";
import { NextResponse } from "next/server";


const TO = ["vicho.torresg@gmail.com", "jmvaldes321@gmail.com"];

const products = [
  { name: "Samsung Galaxy A15 128GB", brand: "Samsung", minPrice: 299990, lowestDetected: 264990, totalListings: 18, violationsCount: 4, status: "critical" },
  { name: 'LG Smart TV 55" 4K UHD', brand: "LG", minPrice: 449990, lowestDetected: 439990, totalListings: 11, violationsCount: 1, status: "warning" },
  { name: "Sony WH-1000XM5 Auriculares", brand: "Sony", minPrice: 189990, lowestDetected: 189990, totalListings: 7, violationsCount: 0, status: "ok" },
  { name: "Xiaomi Redmi Note 13 256GB", brand: "Xiaomi", minPrice: 219990, lowestDetected: 199990, totalListings: 23, violationsCount: 6, status: "critical" },
  { name: "Philips Airfryer XL HD9270", brand: "Philips", minPrice: 89990, lowestDetected: 89990, totalListings: 5, violationsCount: 0, status: "ok" },
  { name: "Asus ROG Strix G16 RTX 4060", brand: "Asus", minPrice: 1299990, lowestDetected: 1249990, totalListings: 9, violationsCount: 2, status: "warning" },
  { name: "Samsung Galaxy S24 256GB", brand: "Samsung", minPrice: 699990, lowestDetected: 699990, totalListings: 14, violationsCount: 0, status: "ok" },
  { name: "LG Lavadora AI DD 12kg", brand: "LG", minPrice: 549990, lowestDetected: 519990, totalListings: 8, violationsCount: 2, status: "warning" },
];

const alerts = [
  { productName: "Samsung Galaxy A15 128GB", seller: "TechZone_Chile", price: 264990, minPrice: 299990, sentAt: "Hoy 10:05 AM" },
  { productName: "Xiaomi Redmi Note 13 256GB", seller: "MovilStore_CL", price: 199990, minPrice: 219990, sentAt: "Hoy 10:05 AM" },
  { productName: "Samsung Galaxy A15 128GB", seller: "MegaStore CL", price: 279990, minPrice: 299990, sentAt: "Hoy 09:45 AM" },
  { productName: "LG Lavadora AI DD 12kg", seller: "HomeAppliances CL", price: 519990, minPrice: 549990, sentAt: "Hoy 09:30 AM" },
];

const fmt = (n: number) => `$${n.toLocaleString("es-CL")}`;
const pct = (p: number, min: number) => `${(((p - min) / min) * 100).toFixed(1)}%`;

const statusColor: Record<string, string> = {
  critical: "#ef4444",
  warning: "#f59e0b",
  ok: "#22c55e",
};

const statusLabel: Record<string, string> = {
  critical: "Infracción",
  warning: "Alerta",
  ok: "En regla",
};

function buildHtml(date: string): string {
  const critical = products.filter(p => p.status === "critical");
  const warning = products.filter(p => p.status === "warning");
  const ok = products.filter(p => p.status === "ok");
  const totalViolations = products.reduce((s, p) => s + p.violationsCount, 0);
  const totalListings = products.reduce((s, p) => s + p.totalListings, 0);

  const alertRows = alerts.map(a => {
    const drop = fmt(a.minPrice - a.price);
    const dropPct = pct(a.price, a.minPrice);
    return `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#1e293b;text-align:left;">${a.productName}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#ef4444;font-weight:600;text-align:left;">${a.seller}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;font-weight:700;color:#ef4444;text-align:right;">${fmt(a.price)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#64748b;text-align:right;">${fmt(a.minPrice)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;font-weight:700;color:#ef4444;text-align:right;">${drop} (${dropPct})</td>
      </tr>`;
  }).join("");

  const productRows = products.map(p => {
    const diff = p.lowestDetected < p.minPrice
      ? `<span style="color:#ef4444;font-size:11px;"> (${pct(p.lowestDetected, p.minPrice)})</span>`
      : "";
    const statusDot = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${statusColor[p.status]};margin-right:5px;"></span>`;
    return `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#1e293b;text-align:left;">${p.name}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#64748b;text-align:right;">${fmt(p.minPrice)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;font-weight:700;color:${p.lowestDetected < p.minPrice ? "#ef4444" : "#22c55e"};text-align:right;">${fmt(p.lowestDetected)}${diff}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#64748b;text-align:center;">${p.totalListings}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;text-align:center;">${statusDot}<span style="font-size:12px;font-weight:600;color:${statusColor[p.status]};">${statusLabel[p.status]}</span></td>
      </tr>`;
  }).join("");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Reporte PriceGuard</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0f172a;border-radius:16px 16px 0 0;padding:28px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background:#FFE600;border-radius:10px;width:40px;height:40px;text-align:center;vertical-align:middle;">
                        <span style="font-size:20px;">🛡️</span>
                      </td>
                      <td style="padding-left:12px;">
                        <div style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.3px;">PriceGuard</div>
                        <div style="color:#94a3b8;font-size:11px;margin-top:2px;">Monitor de Precios Mínimos · Mercado Libre</div>
                      </td>
                    </tr>
                  </table>
                </td>
                <td align="right">
                  <div style="color:#64748b;font-size:11px;">Reporte diario</div>
                  <div style="color:#94a3b8;font-size:11px;margin-top:2px;">${date}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Alert banner -->
        <tr>
          <td style="background:#fef2f2;border-left:4px solid #ef4444;padding:16px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:14px;color:#dc2626;font-weight:700;">⚠️ ${critical.length > 0 ? `${critical.length} producto${critical.length > 1 ? "s" : ""} con infracciones críticas hoy` : "Sin infracciones críticas hoy"}</td>
                <td align="right" style="font-size:12px;color:#ef4444;">${totalViolations} infracciones totales</td>
              </tr>
              <tr>
                <td colspan="2" style="font-size:12px;color:#6b7280;padding-top:4px;text-align:justify;">
                  Se detectaron <strong>${alerts.length} alertas</strong> en las últimas 24 horas sobre <strong>${totalListings} publicaciones activas</strong> de ${products.length} productos monitoreados.
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Stats -->
        <tr>
          <td style="background:#ffffff;padding:24px 32px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="25%" style="text-align:center;padding:0 6px;">
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 8px;">
                    <div style="font-size:28px;font-weight:800;color:#1e293b;">${products.length}</div>
                    <div style="font-size:11px;color:#94a3b8;margin-top:3px;">Productos</div>
                  </div>
                </td>
                <td width="25%" style="text-align:center;padding:0 6px;">
                  <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:12px;padding:16px 8px;">
                    <div style="font-size:28px;font-weight:800;color:#ef4444;">${totalViolations}</div>
                    <div style="font-size:11px;color:#f87171;margin-top:3px;">Infracciones</div>
                  </div>
                </td>
                <td width="25%" style="text-align:center;padding:0 6px;">
                  <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:16px 8px;">
                    <div style="font-size:28px;font-weight:800;color:#f59e0b;">${warning.length}</div>
                    <div style="font-size:11px;color:#f59e0b;margin-top:3px;">En alerta</div>
                  </div>
                </td>
                <td width="25%" style="text-align:center;padding:0 6px;">
                  <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 8px;">
                    <div style="font-size:28px;font-weight:800;color:#22c55e;">${ok.length}</div>
                    <div style="font-size:11px;color:#22c55e;margin-top:3px;">En regla</div>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Alertas del día -->
        <tr>
          <td style="background:#ffffff;padding:24px 32px 0;">
            <div style="font-size:15px;font-weight:700;color:#0f172a;margin-bottom:4px;">🚨 Alertas detectadas hoy</div>
            <div style="font-size:12px;color:#94a3b8;margin-bottom:16px;text-align:justify;">Vendedores que publicaron por debajo del precio mínimo autorizado.</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
              <thead>
                <tr style="background:#f8fafc;">
                  <th style="padding:10px 14px;font-size:11px;color:#64748b;font-weight:600;text-align:left;border-bottom:1px solid #e2e8f0;">PRODUCTO</th>
                  <th style="padding:10px 14px;font-size:11px;color:#64748b;font-weight:600;text-align:left;border-bottom:1px solid #e2e8f0;">VENDEDOR</th>
                  <th style="padding:10px 14px;font-size:11px;color:#64748b;font-weight:600;text-align:right;border-bottom:1px solid #e2e8f0;">PRECIO DETECTADO</th>
                  <th style="padding:10px 14px;font-size:11px;color:#64748b;font-weight:600;text-align:right;border-bottom:1px solid #e2e8f0;">PRECIO MÍNIMO</th>
                  <th style="padding:10px 14px;font-size:11px;color:#64748b;font-weight:600;text-align:right;border-bottom:1px solid #e2e8f0;">DIFERENCIA</th>
                </tr>
              </thead>
              <tbody>${alertRows}</tbody>
            </table>
          </td>
        </tr>

        <!-- Insight destacado -->
        <tr>
          <td style="background:#ffffff;padding:20px 32px 0;">
            <div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);border-radius:12px;padding:18px 20px;">
              <div style="font-size:12px;color:#FFE600;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">💡 Insight del día</div>
              <div style="font-size:13px;color:#e2e8f0;line-height:1.6;text-align:justify;">
                <strong style="color:#ffffff;">Xiaomi Redmi Note 13</strong> es el producto con mayor riesgo hoy:
                <strong style="color:#fbbf24;">6 vendedores</strong> publicaron por debajo del mínimo, con una brecha de hasta
                <strong style="color:#ef4444;">$20.000 (−9,1%)</strong>. El comportamiento muestra una tendencia bajista de 14 días
                consecutivos. Se recomienda contactar a los distribuidores afectados.
              </div>
            </div>
          </td>
        </tr>

        <!-- Tabla productos -->
        <tr>
          <td style="background:#ffffff;padding:24px 32px 0;">
            <div style="font-size:15px;font-weight:700;color:#0f172a;margin-bottom:4px;">📦 Estado de todos los productos</div>
            <div style="font-size:12px;color:#94a3b8;margin-bottom:16px;">Resumen del precio más bajo detectado frente al precio mínimo de cada SKU.</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
              <thead>
                <tr style="background:#f8fafc;">
                  <th style="padding:10px 14px;font-size:11px;color:#64748b;font-weight:600;text-align:left;border-bottom:1px solid #e2e8f0;">PRODUCTO</th>
                  <th style="padding:10px 14px;font-size:11px;color:#64748b;font-weight:600;text-align:right;border-bottom:1px solid #e2e8f0;">MÍNIMO</th>
                  <th style="padding:10px 14px;font-size:11px;color:#64748b;font-weight:600;text-align:right;border-bottom:1px solid #e2e8f0;">MÁS BAJO MELI</th>
                  <th style="padding:10px 14px;font-size:11px;color:#64748b;font-weight:600;text-align:center;border-bottom:1px solid #e2e8f0;">PUB.</th>
                  <th style="padding:10px 14px;font-size:11px;color:#64748b;font-weight:600;text-align:center;border-bottom:1px solid #e2e8f0;">ESTADO</th>
                </tr>
              </thead>
              <tbody>${productRows}</tbody>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#ffffff;padding:24px 32px;border-radius:0 0 16px 16px;">
            <div style="border-top:1px solid #f1f5f9;padding-top:20px;text-align:center;">
              <div style="font-size:12px;color:#94a3b8;line-height:1.6;">
                Este reporte fue generado automáticamente por <strong style="color:#64748b;">PriceGuard</strong>.<br>
                Próxima revisión: en 2 horas · ${totalListings} publicaciones monitoreadas.
              </div>
              <div style="margin-top:12px;">
                <span style="display:inline-block;background:#0f172a;color:#FFE600;font-size:11px;font-weight:700;padding:6px 14px;border-radius:20px;letter-spacing:0.5px;">🛡️ PRICEGUARD</span>
              </div>
            </div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}

export async function POST() {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const now = new Date();
    const dateStr = now.toLocaleDateString("es-CL", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    const html = buildHtml(dateStr);

    const { data, error } = await resend.emails.send({
      from: "PriceGuard Alertas <notificaciones@proppi.cl>",
      to: TO,
      subject: `🛡️ Reporte PriceGuard — ${dateStr} · 13 infracciones activas`,
      html,
    });

    if (error) {
      return NextResponse.json({ ok: false, error }, { status: 400 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
