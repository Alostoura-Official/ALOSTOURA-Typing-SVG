/* ALOSTOURA Typing SVG Engine — MIT License */
(function (global) {
  "use strict";

  const MAX_LINES = 10;

  const escapeXml = (value) => String(value).replace(/[<>&'"]/g, (ch) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;"
  }[ch]));

  const safeNumber = (value, fallback, min, max) => {
    const n = Number(value);
    return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
  };

  function normalize(config = {}) {
    const lines = String(config.lines ?? "ALOSTOURA Official")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, MAX_LINES);

    return {
      lines: lines.length ? lines : ["ALOSTOURA Official"],
      width: safeNumber(config.width, 440, 120, 1600),
      height: safeNumber(config.height, 90, 30, 500),
      fontSize: safeNumber(config.fontSize, 24, 10, 72),
      fontWeight: String(config.fontWeight || "700").replace(/[^\d]/g, "") || "700",
      fontFamily: String(config.fontFamily || "Cairo").replace(/[^a-zA-Z0-9 ,_-]/g, ""),
      color: /^#[0-9a-f]{6}$/i.test(config.color) ? config.color : "#00D4FF",
      background: config.transparent
        ? "none"
        : (/^#[0-9a-f]{6}$/i.test(config.background) ? config.background : "#000000"),
      typingDuration: safeNumber(config.typingDuration, 2500, 500, 15000),
      pauseDuration: safeNumber(config.pauseDuration, 900, 0, 10000),
      align: ["start", "middle", "end"].includes(config.align) ? config.align : "middle"
    };
  }

  function generate(config = {}) {
    const c = normalize(config);
    const lineDuration = c.typingDuration + c.pauseDuration;
    const totalDuration = lineDuration * c.lines.length;
    const baseline = c.height / 2;
    const fontFamily = escapeXml(c.fontFamily);
    const anchor = c.align === "start" ? "start" : c.align === "end" ? "end" : "middle";
    const textX = c.align === "start" ? 8 : c.align === "end" ? c.width - 8 : c.width / 2;

    const parts = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${c.width} ${c.height}" width="${c.width}" height="${c.height}" role="img" aria-label="${escapeXml(c.lines.join(" — "))}">`,
      `<title>${escapeXml(c.lines.join(" | "))}</title>`,
      `<rect width="100%" height="100%" fill="${c.background}"/>`,
      `<defs>`
    ];

    c.lines.forEach((line, index) => {
      // A conservative text-width estimate is used to create a reveal mask.
      // The textLength attribute keeps the text inside the selected SVG width.
      const estimatedWidth = Math.min(c.width - 16, Math.max(c.fontSize, Array.from(line).length * c.fontSize * 0.62));
      const startX = c.align === "start"
        ? 8
        : c.align === "end"
          ? c.width - 8 - estimatedWidth
          : (c.width - estimatedWidth) / 2;

      parts.push(
        `<clipPath id="typing-clip-${index}">` +
        `<rect x="${startX}" y="0" width="0" height="${c.height}">` +
        `<animate attributeName="width" dur="${totalDuration}ms" repeatCount="indefinite" ` +
        `values="0;0;${estimatedWidth};${estimatedWidth};0" ` +
        `keyTimes="0;${(index * lineDuration / totalDuration).toFixed(5)};${((index * lineDuration + c.typingDuration) / totalDuration).toFixed(5)};${((index + 1) * lineDuration / totalDuration).toFixed(5)};1"/>` +
        `</rect></clipPath>`
      );
    });

    parts.push(`</defs>`);

    c.lines.forEach((line, index) => {
      const estimatedWidth = Math.min(c.width - 16, Math.max(c.fontSize, Array.from(line).length * c.fontSize * 0.62));
      const startX = c.align === "start"
        ? 8
        : c.align === "end"
          ? c.width - 8 - estimatedWidth
          : (c.width - estimatedWidth) / 2;
      const start = index * lineDuration / totalDuration;
      const typed = (index * lineDuration + c.typingDuration) / totalDuration;
      const end = (index + 1) * lineDuration / totalDuration;

      parts.push(
        `<text clip-path="url(#typing-clip-${index})" x="${startX}" y="${baseline}" ` +
        `font-family="${fontFamily}, Arial, sans-serif" font-size="${c.fontSize}" ` +
        `font-weight="${c.fontWeight}" fill="${c.color}" dominant-baseline="middle" ` +
        `text-anchor="start" textLength="${estimatedWidth}" lengthAdjust="spacingAndGlyphs">` +
        `<tspan>${escapeXml(line)}</tspan>` +
        `<animate attributeName="opacity" dur="${totalDuration}ms" repeatCount="indefinite" ` +
        `values="0;0;1;1;0;0" ` +
        `keyTimes="0;${start.toFixed(5)};${Math.min(1, start + 0.0001).toFixed(5)};${typed.toFixed(5)};${end.toFixed(5)};1"/>` +
        `</text>`
      );
    });

    parts.push(`<metadata>Generated with ALOSTOURA Typing SVG. One line is displayed at a time. Cycle: ${totalDuration}ms.</metadata>`);
    parts.push(`</svg>`);
    return parts.join("\n");
  }

  global.AlostouraSvgEngine = Object.freeze({ generate, normalize, escapeXml });
})(window);
