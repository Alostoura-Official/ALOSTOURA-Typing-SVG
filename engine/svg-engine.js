/* ALOSTOURA Typing SVG Engine — MIT License */
(function (global) {
  "use strict";
  const MAX_LINES = 10;
  const EFFECTS = Object.freeze([
    "typewriter","fade","slide-left","slide-right","slide-up","slide-down",
    "bounce","zoom","rotate","blur","glow","flip","elastic","pulse"
  ]);
  const escapeXml = value => String(value).replace(/[<>&'"]/g, ch => ({
    "<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"
  }[ch]));
  const safeNumber = (value, fallback, min, max) => {
    const n=Number(value); return Number.isFinite(n)?Math.min(max,Math.max(min,n)):fallback;
  };
  function normalize(config={}) {
    const lines=String(config.lines??"Alostoura Official").split(/\r?\n/).map(x=>x.trim()).filter(Boolean).slice(0,MAX_LINES);
    return {
      lines:lines.length?lines:["Alostoura Official"],
      width:safeNumber(config.width,440,120,1600),height:safeNumber(config.height,90,30,500),
      fontSize:safeNumber(config.fontSize,24,10,72),
      fontWeight:/^(400|600|700|800|900)$/.test(String(config.fontWeight))?String(config.fontWeight):"700",
      fontFamily:String(config.fontFamily||"Cairo").replace(/[^a-zA-Z0-9 ,_-]/g,"").slice(0,80),
      color:/^#[0-9a-f]{6}$/i.test(config.color)?config.color:"#00D4FF",
      background:config.transparent?"none":(/^#[0-9a-f]{6}$/i.test(config.background)?config.background:"#000000"),
      transparent:!!config.transparent,
      typingDuration:safeNumber(config.typingDuration,2500,500,15000),
      pauseDuration:safeNumber(config.pauseDuration,900,0,10000),
      align:["start","middle","end"].includes(config.align)?config.align:"middle",
      effect:EFFECTS.includes(config.effect)?config.effect:"typewriter"
    };
  }
  function generate(config={}) {
    const c=normalize(config), cycle=(c.typingDuration+c.pauseDuration)*c.lines.length;
    const lineTime=c.typingDuration+c.pauseDuration, baseline=c.height/2;
    const anchor=c.align==="start"?"start":c.align==="end"?"end":"middle";
    const textX=c.align==="start"?8:c.align==="end"?c.width-8:c.width/2;
    const parts=[
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${c.width} ${c.height}" width="${c.width}" height="${c.height}" role="img" aria-label="${escapeXml(c.lines.join(" — "))}">`,
      `<title>${escapeXml(c.lines.join(" | "))}</title>`,
      c.background==="none"?"":`<rect width="100%" height="100%" fill="${c.background}"/>`,
      `<defs><filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><filter id="blur-in" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceGraphic" stdDeviation="0"/></filter></defs>`
    ];
    c.lines.forEach((line,i)=>{
      const estimated=Math.min(c.width-16,Math.max(c.fontSize,Array.from(line).length*c.fontSize*.62));
      const x=c.align==="start"?8:c.align==="end"?c.width-8-estimated:(c.width-estimated)/2;
      const start=i*lineTime/cycle;
      const enter=Math.min(0.99990,start+Math.min(.12,Math.max(.0001,c.typingDuration/cycle*.25)));
      const hold=Math.max(enter+0.00001,Math.min(0.99994,(i*lineTime+c.typingDuration)/cycle));
      const end=Math.max(hold+0.00001,Math.min(0.99998,(i+1)*lineTime/cycle));
      const keys=[0,Math.max(0.00001,start),enter,hold,end,1];
      const kt=keys.map(v=>v.toFixed(5)).join(";");
      const reveal=c.effect==="typewriter";
      parts.push(`<clipPath id="clip-${i}"><rect x="${x.toFixed(2)}" y="0" width="${reveal?0:estimated.toFixed(2)}" height="${c.height}">${reveal?`<animate attributeName="width" dur="${cycle}ms" repeatCount="indefinite" values="0;0;${estimated.toFixed(2)};${estimated.toFixed(2)};0;0" keyTimes="${kt}"/>`:""}</rect></clipPath>`);
      const from=({
        "slide-left":`translate(-${c.width},0)`,"slide-right":`translate(${c.width},0)`,
        "slide-up":`translate(0,${c.height})`,"slide-down":`translate(0,-${c.height})`,
        "bounce":`translate(0,${-c.height/2})`,"zoom":"scale(.15)",
        "rotate":"rotate(-25)","flip":"rotateY(90deg)","elastic":"scale(.55)",
        "pulse":"scale(.82)","blur":"translate(0,0)"
      })[c.effect]||"translate(0,0)";
      const to=({
        "slide-left":"translate(0,0)","slide-right":"translate(0,0)","slide-up":"translate(0,0)",
        "slide-down":"translate(0,0)","bounce":"translate(0,0)","zoom":"scale(1)",
        "rotate":"rotate(0)","flip":"rotateY(0deg)","elastic":"scale(1)","pulse":"scale(1)",
        "blur":"translate(0,0)"
      })[c.effect]||"translate(0,0)";
      const transformType=c.effect==="zoom"||c.effect==="elastic"||c.effect==="pulse"||c.effect==="flip"?"scale":
        c.effect==="rotate"||c.effect==="flip"?"rotate": "translate";
      let transformValues, transformTypeReal=transformType;
      if(transformType==="translate"){
        let a=[0,0],b=[0,0];
        if(c.effect==="slide-left")a=[-c.width,0];
        if(c.effect==="slide-right")a=[c.width,0];
        if(c.effect==="slide-up")a=[0,c.height];
        if(c.effect==="slide-down")a=[0,-c.height];
        if(c.effect==="bounce")a=[0,-c.height/2];
        transformValues=`${a.join(" ")};${a.join(" ")};${b.join(" ")};${b.join(" ")};${a.join(" ")};${a.join(" ")}`;
      } else if(transformType==="scale"){
        const v=c.effect==="zoom"?.15:c.effect==="elastic"?.55:c.effect==="flip"?.05:.82;
        transformValues=c.effect==="flip"?"0.05 1;0.05 1;1 1;1 1;0.05 1;0.05 1":`${v};${v};1;1;${v};${v}`;
      } else {
        const v=c.effect==="flip"?90: -25;
        transformValues=`${v};${v};0;0;${v};${v}`;
      }
      let opacityValues="0;0;1;1;0;0";
      if(c.effect==="pulse") opacityValues="0;0;1;0.82;0;0";
      if(c.effect==="blur") parts.push(`<defs><filter id="blur-${i}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceGraphic" stdDeviation="5"><animate attributeName="stdDeviation" dur="${cycle}ms" repeatCount="indefinite" values="5;5;0;0;5;5" keyTimes="${kt}"/></feGaussianBlur></filter></defs>`);
      const filter=c.effect==="glow"?' filter="url(#soft-glow)"':c.effect==="blur"?` filter="url(#blur-${i})"`:"";
      const blurAnim="";
      parts.push(`<g clip-path="url(#clip-${i})"${filter}><text x="${x.toFixed(2)}" y="${baseline}" font-family="${escapeXml(c.fontFamily)}, Arial, sans-serif" font-size="${c.fontSize}" font-weight="${c.fontWeight}" fill="${c.color}" dominant-baseline="middle" text-anchor="start" textLength="${estimated.toFixed(2)}" lengthAdjust="spacingAndGlyphs">${escapeXml(line)}</text><animate attributeName="opacity" dur="${cycle}ms" repeatCount="indefinite" values="${opacityValues}" keyTimes="${kt}"/>${c.effect==="fade"?"":`<animateTransform attributeName="transform" type="${transformTypeReal}" dur="${cycle}ms" repeatCount="indefinite" values="${transformValues}" keyTimes="${kt}" additive="replace"/>`}${blurAnim}</g>`);
    });
    parts.push(`<metadata>Generated with ALOSTOURA Typing SVG. Effect: ${c.effect}. Lines: ${c.lines.length}. Cycle: ${cycle}ms.</metadata></svg>`);
    return parts.filter(Boolean).join("\n");
  }
  global.AlostouraSvgEngine=Object.freeze({generate,normalize,escapeXml,EFFECTS});
})(window);