import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  NoMarkerSVG,
  RedSVG,
  YellowSVG,
  GreenSVG,
  DefaultRedSVG,
  DefaultYellowSVG,
  DefaultGreenSVG,
  DependentShuntSVG,
  AutomaticSVG,
  CallingOnSVG,
  GateSVG,
  PermissiveSVG,
  RepeaterSVG,
  DependentShuntCallingOnMiniatureSvg,
  BlockInstrumentSVG,
} from "../svgs/aspectSvgs";

const getSvgString = (Component, props = {}) => {
  if (!Component) return "";
  try {
    return ReactDOMServer.renderToStaticMarkup(<Component {...props} />);
  } catch {
    return "";
  }
};

// strip outer <svg> so we can scale by known viewBox width/height safely
const stripOuterSvg = (svgStr = "") =>
  svgStr.replace(/^\s*<svg[^>]*>/i, "").replace(/<\/svg>\s*$/i, "");

// Size config:
// - Set height to keep aspect ratio based on viewBox.
// - Set width to scale by width.
// - Set both width and height for non-uniform scaling.
// - V_ALIGN controls vertical placement of items within the row.
const SIZES = {
  ASPECT: { height: 24 }, //24
  MARKER: { height: 30 }, // 30
  SHUNT: { height: 18 }, // 18
  MINIATURE: { height: 30 }, // 30
  GAP: 0,
  V_ALIGN: "top", // "baseline" | "middle" | "top"
  // route indicator tuning (global defaults)
  ROUTE: {
    length: 20, //20
    originShift: 12, //12
    stroke: "black",
    strokeWidth: 0.5, //0.5
    dashArray: "null", //null
  },
  // global fallback vertical shift for reversed signals (px)
  // negative -> move up, positive -> move down
  REVERSE_SHIFT: 15,
};

const RAW = {
  aspectSquare: { w: 1000, h: 1000 }, // Red/Yellow/Green/DefaultRed/DefaultGreen
  aspectDY: { w: 1000, h: 1000 }, // DefaultYellow (diamond)
  marker: { w: 568, h: 343 }, // CallingOn/Automatic/Gate/Permissive/Repeater
  shunt: { w: 624, h: 500 }, // DependentShuntSVG
  miniature: { w: 1420, h: 378 }, // DependentShuntCallingOnMiniatureSvg
  blockInstrument: { w: 673, h: 349 }, // BlockInstrumentSVG (if used as marker)
};

// Resolve final width/height and scale factors from raw viewBox and targets
const resolveDims = (rawW, rawH, targetWidth, targetHeight) => {
  const rW = rawW || 1;
  const rH = rawH || 1;
  const tW = targetWidth;
  const tH = targetHeight;
  if (tW && tH) return { w: tW, h: tH, sX: tW / rW, sY: tH / rH }; // non-uniform scaling
  if (tH) {
    const s = tH / rH; // uniform by height
    return { w: rW * s, h: tH, sX: s, sY: s };
  }
  const W = tW || 20; // fallback width if neither provided
  const s = W / rW; // uniform by width
  return { w: W, h: rH * s, sX: s, sY: s };
};

const pickMarkerComponent = (name) => {
  if (name === "calling on") return { Comp: CallingOnSVG, raw: RAW.marker };
  if (name === "permissive") return { Comp: PermissiveSVG, raw: RAW.marker };
  if (name === "automatic" || name === "semi-automatic")
    return { Comp: AutomaticSVG, raw: RAW.marker };
  if (name === "gate") return { Comp: GateSVG, raw: RAW.marker };
  if (name === "repeater") return { Comp: RepeaterSVG, raw: RAW.marker };
  if (name === "block instrument")
    return { Comp: BlockInstrumentSVG, raw: RAW.blockInstrument };
  return { Comp: null, raw: RAW.marker };
};

// Helper: route -> angle map. Accepts single-letter keys ('a') and descriptive keys ("route 1/a")
const ROUTE_ANGLE_MAP = {
  a: 315,
  b: 270,
  c: 225,
  d: 45,
  e: 90,
  f: 135,
  "route 1/a": 315,
  "route 2/b": 270,
  "route 3/c": 225,
  "route 4/d": 45,
  "route 5/e": 90,
  "route 6/f": 135,
};

const degreesToRadians = (deg) => (deg * Math.PI) / 180;

/**
 * Normalize signal.routes into an array of lowercase route keys.
 * Supports:
 * - Array of strings: ['a','c'] or ['Route 1/a']
 * - Object map: { a: true, b: false }
 * - Comma-separated string: 'a,c'
 */
const normalizeSelectedRoutes = (rawRoutes) => {
  if (!rawRoutes) return [];
  if (Array.isArray(rawRoutes)) {
    return rawRoutes
      .map((r) => (r ? String(r).trim().toLowerCase() : ""))
      .filter(Boolean);
  }
  if (typeof rawRoutes === "object") {
    // map of booleans
    return Object.keys(rawRoutes)
      .filter((k) => rawRoutes[k])
      .map((k) => String(k).trim().toLowerCase());
  }
  if (typeof rawRoutes === "string") {
    return rawRoutes
      .split(",")
      .map((r) => (r ? String(r).trim().toLowerCase() : ""))
      .filter(Boolean);
  }
  return [];
};

export function buildSignalSvg(signal, trackLineYCoords = [], opts = {}) {
  if (
    !signal ||
    !Array.isArray(trackLineYCoords) ||
    trackLineYCoords.length === 0
  )
    return "";

  const { VIEWBOX_PADDING_X = 0, INTERNAL_SVG_TRACK_WIDTH = 1000 } = opts;
  const globalScale =
    typeof opts.signalScale === "number" ? opts.signalScale : 1.5;

  const sanitizeLine = (v = "") => {
    const s = String(v || "")
      .trim()
      .toLowerCase();
    if (s === "downmain") return "downMain";
    if (s === "upmain") return "upMain";
    return "downMain";
  };

  const desiredLine = sanitizeLine(signal.selectedLine);
  const targetLine =
    trackLineYCoords.find((l) => l.direction === desiredLine) ||
    trackLineYCoords[0];
  if (!targetLine) return "";

  const absKm = parseFloat(signal.signalAbs);
  if (Number.isNaN(absKm)) return "";

  // map ABS to X
  const getX = (km) => {
    const minKm = targetLine.absMappingMin || 0;
    const phys = targetLine.physicalLengthMeters || 0;
    if (!phys) return VIEWBOX_PADDING_X;
    const meters = (km - minKm) * 1000;
    return VIEWBOX_PADDING_X + (meters / phys) * INTERNAL_SVG_TRACK_WIDTH;
  };
  const signalVisualX = getX(absKm);

  // --- Placement: place signal on endpoint lines depending on selectedDirection ---
  // If the signal `selectedDirection` is "reverse", we place the composed group on targetLine.y2.
  // If "normal" (anything else), we place on targetLine.y1.
  // This makes position independent of track draw direction; rotation will be applied around that point.
  const isSignalReverse =
    String(signal.selectedDirection || "")
      .trim()
      .toLowerCase() === "reverse";

  // Compute placement anchor and top-of-row positioning:
  // - `anchorY` is the track endpoint (y1 or y2) we want the signal to align with.
  // - `baseY` is the top Y coordinate for the composed row so items stack below/above correctly.
  const anchorY = isSignalReverse
    ? Math.round(targetLine.y2)
    : Math.round(targetLine.y1);
  // Anchor is known; compute base/top of row and label positions once `rowHeight` is resolved.
  let baseY;
  let labelY;
  let verticalShift;

  // Ordered array: marker → shunt (Yes) → miniature (special-case) → aspects
  // items: { type, targetWidth?, targetHeight?, rawW, rawH, Comp }
  const items = [];

  const hasMarker =
    !!signal.marker && String(signal.marker).trim().toLowerCase() !== "none";
  const markerName = hasMarker
    ? String(signal.marker).trim().toLowerCase()
    : "";
  // true when user explicitly selected "none"
  const markerExplicitNone =
    String(signal.marker || "")
      .trim()
      .toLowerCase() === "none";
  const hasShunt =
    String(signal.dependentShunt || "")
      .trim()
      .toLowerCase() === "yes" || signal.dependentShunt === true;
  const miniatureRequested =
    String(signal.miniatureYellow || "")
      .trim()
      .toLowerCase() === "yes" || signal.miniatureYellow === true;
  const isCallingOn = markerName === "calling on";

  // Special-case: only miniature + aspects
  if (isCallingOn && hasShunt && miniatureRequested) {
    items.push({
      type: "miniature",
      targetWidth: SIZES.MINIATURE.width,
      targetHeight: SIZES.MINIATURE.height,
      rawW: RAW.miniature.w,
      rawH: RAW.miniature.h,
      Comp: DependentShuntCallingOnMiniatureSvg,
    });
  } else {
    // marker first
    if (hasMarker) {
      const { Comp, raw } = pickMarkerComponent(markerName);
      if (Comp) {
        items.push({
          type: "marker",
          targetWidth: SIZES.MARKER.width,
          targetHeight: SIZES.MARKER.height,
          rawW: raw.w,
          rawH: raw.h,
          Comp,
        });
      }
    } else if (markerExplicitNone) {
      // user explicitly selected "none" — add placeholder marker so spacing/order matches
      items.push({
        type: "marker",
        targetWidth: SIZES.MARKER.width,
        targetHeight: SIZES.MARKER.height,
        rawW: 170,
        rawH: 334,
        Comp: NoMarkerSVG,
      });
    }
    // shunt next (only if yes)
    if (hasShunt) {
      items.push({
        type: "shunt",
        targetWidth: SIZES.SHUNT.width,
        targetHeight: SIZES.SHUNT.height,
        rawW: RAW.shunt.w,
        rawH: RAW.shunt.h,
        Comp: DependentShuntSVG,
      });
    }
    // miniature (only if requested and shunt present, and not the special-case)
    if (!isCallingOn && miniatureRequested && hasShunt) {
      items.push({
        type: "miniature",
        targetWidth: SIZES.MINIATURE.width,
        targetHeight: SIZES.MINIATURE.height,
        rawW: RAW.miniature.w,
        rawH: RAW.miniature.h,
        Comp: DependentShuntCallingOnMiniatureSvg,
      });
    }
  }

  // aspects in chosen order with default replacements
  const aspects = Array.isArray(signal.aspects) ? signal.aspects : [];
  const defaultAspectRaw = String(signal.defaultAspect || "").trim();
  const defaultNorm = defaultAspectRaw.toLowerCase().replace(/[\s-_]+/g, "");
  let defaultApplied = false; // when default = single "yellow", apply only once

  for (let i = 0; i < aspects.length; i++) {
    const rawColor = String(aspects[i] || "Red").trim();
    const colorNorm = rawColor.toLowerCase();

    // Decide whether this occurrence should use the "default" (special) SVG
    let useDefault = false;
    if (defaultNorm === "doubleyellow" && colorNorm === "yellow") {
      // double-yellow: every yellow becomes default
      useDefault = true;
    } else if (
      defaultNorm === "yellow" &&
      colorNorm === "yellow" &&
      !defaultApplied
    ) {
      // single yellow default: only the first yellow occurrence becomes default
      useDefault = true;
      defaultApplied = true;
    } else if (
      defaultNorm &&
      defaultNorm === colorNorm &&
      defaultNorm !== "yellow"
    ) {
      // other default colors (e.g., "red" or "green"): treat occurrences as default
      // exclude "yellow" here so single-yellow logic above controls yellow behavior
      useDefault = true;
    }

    // pick component explicitly (avoid ambiguous behavior in pickAspectComponent)
    let Comp;
    if (colorNorm === "red") {
      Comp = useDefault ? DefaultRedSVG : RedSVG;
    } else if (colorNorm === "green") {
      Comp = useDefault ? DefaultGreenSVG : GreenSVG;
    } else if (colorNorm === "yellow") {
      Comp = useDefault ? DefaultYellowSVG : YellowSVG;
    } else {
      // fallback to red if unknown
      Comp = useDefault ? DefaultRedSVG : RedSVG;
    }

    items.push({
      type: "aspect",
      targetWidth: SIZES.ASPECT.width,
      targetHeight: SIZES.ASPECT.height,
      rawW: RAW.aspectSquare.w,
      rawH: RAW.aspectSquare.h,
      Comp,
    });
  }

  if (items.length === 0) return "";

  // Resolve sizes and scales; also compute row height for vertical alignment
  const sized = items.map((it) => {
    const dims = resolveDims(it.rawW, it.rawH, it.targetWidth, it.targetHeight);
    return { ...it, ...dims };
  });
  const rowHeight = sized.reduce((m, it) => Math.max(m, it.h || 0), 0);

  // Now that rowHeight is known compute vertical shifts and top-of-row base Y.
  verticalShift = isSignalReverse
    ? typeof signal.reverseVerticalShift === "number"
      ? signal.reverseVerticalShift
      : typeof SIZES.REVERSE_SHIFT === "number"
        ? SIZES.REVERSE_SHIFT
        : 0
    : typeof signal.verticalShift === "number"
      ? signal.verticalShift
      : 0;

  // base top Y: place composed row so that for normal signals it sits above `anchorY`,
  // and for reverse it starts at `anchorY` (below the track line), matching other components.
  baseY = isSignalReverse ? anchorY : anchorY - rowHeight;

  // default label placement relative to composed row
  labelY = isSignalReverse ? baseY + rowHeight + 14 : baseY - 8;

  // apply shift (positive moves down, negative moves up)
  baseY += verticalShift;
  labelY += verticalShift;

  // compute total width and starting x
  const totalWidth =
    sized.reduce((s, it) => s + (it.w || 0), 0) +
    Math.max(0, sized.length - 1) * SIZES.GAP;
  const startX = Math.round(signalVisualX - totalWidth / 2);

  // render as a single group: scale each item and position with translate
  let composedInner = "";
  let cursorX = startX;
  for (const it of sized) {
    if (!it.Comp) continue;
    const svg = getSvgString(it.Comp); // render original (keeps its own viewBox)
    if (!svg) continue;
    const inner = stripOuterSvg(svg);
    // vertical alignment within the row
    let yOffset = 0;
    if (SIZES.V_ALIGN === "baseline") yOffset = rowHeight - (it.h || 0);
    else if (SIZES.V_ALIGN === "middle")
      yOffset = (rowHeight - (it.h || 0)) / 2;
    // place and scale using top-of-row `baseY`
    composedInner += `<g transform="translate(${cursorX.toFixed(2)}, ${(
      baseY + yOffset
    ).toFixed(2)}) scale(${(it.sX || 1).toFixed(6)}, ${(it.sY || 1).toFixed(
      6,
    )})">${inner}</g>`;
    cursorX += (it.w || 0) + SIZES.GAP;
  }

  // --- Render radiating route lines ---
  // Accept many shapes for `signal.routes` (array, map, string)
  const rawSelectedRoutes = signal.routes;
  const normalizedRoutes = normalizeSelectedRoutes(rawSelectedRoutes);

  if (normalizedRoutes.length > 0) {
    const originX = cursorX; // position just after the last composed item
    // per-signal override: signal.routeOriginShift (number, px)
    const originShift =
      typeof signal.routeOriginShift === "number"
        ? signal.routeOriginShift
        : SIZES.ROUTE.originShift || 0;
    // route origin should originate at the track anchor line (y1/y2).
    const originYBase = isSignalReverse
      ? baseY + originShift
      : baseY + rowHeight + originShift;

    // per-signal override: signal.routeLength (number, px)
    const length =
      typeof signal.routeLength === "number"
        ? signal.routeLength
        : SIZES.ROUTE.length || 80;

    const stroke =
      typeof signal.routeStroke === "string"
        ? signal.routeStroke
        : SIZES.ROUTE.stroke || "red";
    const strokeWidth =
      typeof signal.routeStrokeWidth === "number"
        ? signal.routeStrokeWidth
        : SIZES.ROUTE.strokeWidth || 2;
    const dashArray =
      typeof signal.routeDashArray === "string"
        ? signal.routeDashArray
        : SIZES.ROUTE.dashArray || "5,5";

    for (let i = 0; i < normalizedRoutes.length; i++) {
      const raw = normalizedRoutes[i]; // already lowercased & trimmed
      const key = raw.length === 1 ? raw : raw.indexOf("/") > -1 ? raw : raw;

      const angleDeg =
        ROUTE_ANGLE_MAP[key] !== undefined
          ? ROUTE_ANGLE_MAP[key]
          : ROUTE_ANGLE_MAP[raw];
      if (angleDeg === undefined) {
        // skip unknown routes silently
        continue;
      }
      const rad = degreesToRadians(angleDeg);
      const endX = originX + length * Math.cos(rad);
      const endY = originYBase + length * Math.sin(rad);
      composedInner += `<g class="route-line" data-route="${raw}"><line x1="${originX.toFixed(
        2,
      )}" y1="${originYBase.toFixed(2)}" x2="${endX.toFixed(
        2,
      )}" y2="${endY.toFixed(
        2,
      )}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-dasharray="${dashArray}" /></g>`;
    }
  }

  const label = `<text x="${Math.round(
    signalVisualX,
  )}" y="${labelY}" font-family="Arial" font-size="14" fill="#333" text-anchor="middle">${
    signal.signalName
      ? String(signal.signalName).replace(/&/g, "&amp;")
      : `Signal ${signal.id}`
  }${signal.signalAbs ? ` (${signal.signalAbs}km)` : ""}</text>`;

  // Wrap the whole composed group in a global scale so signals appear larger.
  // Scale around the track anchor (signalVisualX, anchorY) so the signal stays aligned.
  const cx = Number(signalVisualX.toFixed(2));
  const cy = Number(anchorY.toFixed(2));

  if (isSignalReverse) {
    // Rotate -180 degrees around the anchor, and apply scale about same point
    return `<g class="signal-composed" data-signal-id="${signal.id}" transform="translate(${cx}, ${cy}) scale(${globalScale}) rotate(-180) translate(${-cx}, ${-cy})">${composedInner}${label}</g>`;
  }

  return `<g class="signal-composed" data-signal-id="${signal.id}" transform="translate(${cx}, ${cy}) scale(${globalScale}) translate(${-cx}, ${-cy})">${composedInner}${label}</g>`;
}

export default buildSignalSvg;
