(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const defaults = {
    lines: "Alostoura Official\nFront-end Developer\nAndroid Application Developer\nOpen Source Creator",
    fontFamily: "Cairo", fontSize: 24, fontWeight: "700", color: "#00D4FF",
    background: "#000000", transparent: true, width: 440, height: 90,
    typingDuration: 2500, pauseDuration: 900, align: "middle", effect: "typewriter"
  };
  const translations = {
    en: {
      featuresNav:"Features",startCreating:"Start creating",heroEyebrow:"OPEN-SOURCE SVG GENERATOR",heroTitle:"Give your GitHub profile a voice.",heroText:"Create animated typing SVG banners in seconds. Customize your text, typography, colors, timing, and dimensions — then export clean SVG, Markdown, or HTML.",createBanner:"Create your banner",howItWorks:"How it works",freeForever:"Free and open source",noBackend:"Runs in your browser",bilingual:"Arabic + English",livePreview:"LIVE SVG PREVIEW",studioEyebrow:"THE CREATOR STUDIO",generatorTitle:"Build your typing SVG",generatorIntro:"Fine-tune every detail and see the result instantly.",content:"Content",linesLabel:"Text lines (one phrase per line)",linesHint:"Each line appears in sequence. Up to 10 lines.",font:"Font family",fontSize:"Font size",appearance:"Appearance",textColor:"Text color",background:"Background",width:"Width",height:"Height",animation:"Animation",typingDuration:"Typing duration",pauseDuration:"Pause between lines",fontWeight:"Font weight",alignment:"Alignment",reset:"Reset",updatePreview:"Update preview",outputEyebrow:"YOUR RESULT",preview:"Preview",live:"LIVE",svgVector:"Scalable vector graphic",copy:"Copy",downloadSvg:"Download SVG",downloadMarkdown:"Download Markdown",staticHostingNote:"GitHub Pages is static hosting. Download the generated SVG and commit it to your repository to use a stable image URL.",whyEyebrow:"MADE FOR BUILDERS",featuresTitle:"Everything you need. Nothing you don't.",featureOneTitle:"Instant preview",featureOneText:"See your animation update as you customize the settings.",featureTwoTitle:"Multiple exports",featureTwoText:"Copy Markdown or HTML, or download a standalone SVG file.",featureThreeTitle:"Bilingual-ready",featureThreeText:"Switch the interface between Arabic and English. SVG text supports Unicode.",featureFourTitle:"Privacy first",featureFourText:"All generation happens locally in your browser. No account or API key.",simpleEyebrow:"THREE SIMPLE STEPS",howTitle:"From idea to README",stepOneTitle:"Write your lines",stepOneText:"Add the phrases you want to rotate through.",stepTwoTitle:"Customize the look",stepTwoText:"Choose colors, typography, size, and animation timing.",stepThreeTitle:"Export and publish",stepThreeText:"Download the SVG and add it to your GitHub repository.",footerText:"Built for the open-source community.",copied:"Copied to clipboard",downloaded:"File downloaded",tooMany:"Please use 10 lines or fewer.",templateLabel:"Visual template",effectLabel:"Animation effect"
    },
    ar: {
      featuresNav:"المميزات",startCreating:"ابدأ التصميم",heroEyebrow:"مولد SVG مفتوح المصدر",heroTitle:"امنح ملفك الشخصي على GitHub هوية متحركة",heroText:"أنشئ لافتات SVG متحركة للكتابة خلال ثوان. خصص النص والخطوط والألوان والتوقيت والأبعاد ثم صدّر SVG أو Markdown أو HTML.",createBanner:"أنشئ لافتتك",howItWorks:"كيف يعمل",freeForever:"مجاني ومفتوح المصدر",noBackend:"يعمل داخل المتصفح",bilingual:"العربية والإنجليزية",livePreview:"معاينة SVG مباشرة",studioEyebrow:"استوديو الإنشاء",generatorTitle:"أنشئ ملف SVG متحرك",generatorIntro:"تحكم في التفاصيل وشاهد النتيجة فوريا.",content:"المحتوى",linesLabel:"النصوص — كل عبارة في سطر",linesHint:"تظهر العبارات بالتتابع بحد أقصى 10 أسطر.",font:"نوع الخط",fontSize:"حجم الخط",appearance:"المظهر",textColor:"لون النص",background:"الخلفية",width:"العرض",height:"الارتفاع",animation:"الحركة",typingDuration:"مدة ظهور النص",pauseDuration:"التوقف بين العبارات",fontWeight:"سُمك الخط",alignment:"المحاذاة",reset:"إعادة ضبط",updatePreview:"تحديث المعاينة",outputEyebrow:"النتيجة",preview:"المعاينة",live:"مباشر",svgVector:"رسومات متجهية قابلة للتحجيم",copy:"نسخ",downloadSvg:"تحميل SVG",downloadMarkdown:"تحميل Markdown",staticHostingNote:"GitHub Pages استضافة ثابتة. حمّل ملف SVG الناتج وارفعه إلى مستودعك للحصول على رابط صورة ثابت.",whyEyebrow:"صمم للمطورين",featuresTitle:"كل ما تحتاجه لإنشاء لافتتك",featureOneTitle:"معاينة فورية",featureOneText:"شاهد تحديث الحركة أثناء تعديل الإعدادات.",featureTwoTitle:"صيغ تصدير متعددة",featureTwoText:"انسخ Markdown أو HTML أو حمّل ملف SVG مستقل.",featureThreeTitle:"دعم لغتين",featureThreeText:"بدّل واجهة المشروع بين العربية والإنجليزية مع دعم Unicode داخل SVG.",featureFourTitle:"الخصوصية أولا",featureFourText:"تتم عملية الإنشاء محليا في المتصفح دون حساب أو مفتاح API.",simpleEyebrow:"ثلاث خطوات بسيطة",howTitle:"من الفكرة إلى README",stepOneTitle:"اكتب العبارات",stepOneText:"أضف العبارات التي تريد عرضها بالتتابع.",stepTwoTitle:"خصص التصميم",stepTwoText:"اختر الألوان والخطوط والأبعاد وسرعة الحركة.",stepThreeTitle:"صدّر وانشر",stepThreeText:"حمّل SVG وأضفه إلى مستودع GitHub الخاص بك.",footerText:"",copied:"تم نسخ النص",downloaded:"تم تحميل الملف",tooMany:"يرجى استخدام 10 أسطر أو أقل.",templateLabel:"القوالب البصرية",effectLabel:"تأثير الحركة"
    }
  };
  const effectLabels = {
    en:{"typewriter":"Typewriter","fade":"Fade","slide-left":"Slide Left","slide-right":"Slide Right","slide-up":"Slide Up","slide-down":"Slide Down","bounce":"Bounce","zoom":"Zoom","rotate":"Rotate","blur":"Blur","glow":"Glow","flip":"Flip","elastic":"Elastic","pulse":"Pulse"},
    ar:{"typewriter":"كتابة حرفا حرفا","fade":"ظهور تدريجي","slide-left":"انزلاق لليسار","slide-right":"انزلاق لليمين","slide-up":"انزلاق لأعلى","slide-down":"انزلاق لأسفل","bounce":"ارتداد","zoom":"تكبير","rotate":"دوران","blur":"ضبابي","glow":"توهج","flip":"قلب","elastic":"مرن","pulse":"نبض"}
  };
  let lang = "en", activeTab = "markdown", latestSvg = "";
  const fields = ["lines","fontFamily","fontSize","fontWeight","textColor","backgroundColor","transparentBg","widthInput","heightInput","typingSpeed","pauseDuration","align","effectSelect"];

  const STORAGE_KEY = "alostoura-typing-svg:v2";
  const presets = [
    {name:"ALOSTOURA Cyan",color:"#00D4FF",background:"#000000",transparent:true,fontFamily:"Cairo",fontSize:24,fontWeight:"700",width:440,height:90,effect:"typewriter"},
    {name:"GitHub Green",color:"#39D353",background:"#000000",transparent:true,fontFamily:"Arial",fontSize:22,fontWeight:"700",width:440,height:80,effect:"fade"},
    {name:"Violet Pulse",color:"#A78BFA",background:"#0B1020",transparent:false,fontFamily:"Verdana",fontSize:22,fontWeight:"700",width:500,height:90,effect:"pulse"},
    {name:"Minimal White",color:"#F4F7FB",background:"#000000",transparent:true,fontFamily:"Arial",fontSize:22,fontWeight:"600",width:440,height:80,effect:"slide-left"},
    {name:"Sunset Orange",color:"#FF9B54",background:"#17101B",transparent:false,fontFamily:"Arial",fontSize:25,fontWeight:"700",width:520,height:100,effect:"glow"},
    {name:"Royal Gold",color:"#FFD166",background:"#101010",transparent:false,fontFamily:"Georgia",fontSize:25,fontWeight:"700",width:500,height:90,effect:"zoom"},
    {name:"Electric Blue",color:"#4EA1FF",background:"#071426",transparent:false,fontFamily:"Verdana",fontSize:24,fontWeight:"700",width:520,height:90,effect:"slide-up"},
    {name:"Rose Neon",color:"#FF6B9A",background:"#160B18",transparent:false,fontFamily:"Cairo",fontSize:24,fontWeight:"700",width:500,height:90,effect:"blur"},
    {name:"Terminal Matrix",color:"#39FF88",background:"#020B05",transparent:false,fontFamily:"monospace",fontSize:22,fontWeight:"700",width:480,height:85,effect:"typewriter"},
    {name:"Arctic Silver",color:"#DCEBFA",background:"#101923",transparent:false,fontFamily:"Arial",fontSize:23,fontWeight:"700",width:500,height:90,effect:"flip"},
    {name:"Crimson Impact",color:"#FF4D5A",background:"#18090D",transparent:false,fontFamily:"Arial",fontSize:26,fontWeight:"700",width:520,height:100,effect:"bounce"},
    {name:"Ocean Teal",color:"#35E0C1",background:"#071B20",transparent:false,fontFamily:"Cairo",fontSize:24,fontWeight:"700",width:500,height:90,effect:"elastic"}
  ];
  function saveState() {
    try {
      const state={version:2,language:lang,config:readConfig()};
      localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    } catch (_) { /* Private browsing or storage limits: generation still works. */ }
  }
  function restoreState() {
    try {
      const raw=localStorage.getItem(STORAGE_KEY);
      if(!raw)return;
      const saved=JSON.parse(raw);
      if(!saved||saved.version!==2||!saved.config)return;
      const c=saved.config;
      $("linesInput").value=String(c.lines||defaults.lines).slice(0,5000);
      $("fontFamily").value=c.fontFamily||defaults.fontFamily;
      $("fontSize").value=c.fontSize||defaults.fontSize;
      $("fontWeight").value=c.fontWeight||defaults.fontWeight;
      $("textColor").value=/^#[0-9a-f]{6}$/i.test(c.color)?c.color:defaults.color;
      $("backgroundColor").value=/^#[0-9a-f]{6}$/i.test(c.background)?c.background:defaults.background;
      $("transparentBg").checked=!!c.transparent;
      $("widthInput").value=c.width||defaults.width;$("heightInput").value=c.height||defaults.height;
      $("typingSpeed").value=c.typingDuration||defaults.typingDuration;
      $("pauseDuration").value=c.pauseDuration??defaults.pauseDuration;
      $("align").value=c.align||defaults.align;
      $("effectSelect").value=window.AlostouraSvgEngine.EFFECTS.includes(c.effect)?c.effect:"typewriter";
      if(saved.language==="ar")lang="ar";
    } catch (_) {}
  }
  function loadPresets() {
    const select=$("presetSelect");
    presets.forEach((p,i)=>{const option=document.createElement("option");option.value=String(i);option.textContent=p.name;select.appendChild(option);});
  }
  function applyPreset(index) {
    const p=presets[Number(index)];if(!p)return;
    $("textColor").value=p.color;$("backgroundColor").value=p.background;$("transparentBg").checked=p.transparent;
    $("fontFamily").value=p.fontFamily;$("fontSize").value=p.fontSize;$("fontWeight").value=p.fontWeight;
    $("widthInput").value=p.width;$("heightInput").value=p.height;$("effectSelect").value=p.effect;
    update();
  }
  function readConfig() {
    const lines = $("linesInput").value.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
    if (lines.length > 10) { showToast(translations[lang].tooMany); }
    return {
      lines: lines.slice(0,10).join("\n"), fontFamily:$("fontFamily").value,
      fontSize:$("fontSize").value, fontWeight:$("fontWeight").value,
      color:$("textColor").value, background:$("backgroundColor").value,
      transparent:$("transparentBg").checked, width:$("widthInput").value,
      height:$("heightInput").value, typingDuration:$("typingSpeed").value,
      pauseDuration:$("pauseDuration").value, align:$("align").value, effect:$("effectSelect").value
    };
  }
  function dataUri(svg) { return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); }
  function update() {
    const config = readConfig();
    latestSvg = window.AlostouraSvgEngine.generate(config);
    const src = dataUri(latestSvg);
    $("mainPreview").src = src;
    $("heroPreview").src = src;
    $("dimensionLabel").textContent = `${config.width} × ${config.height} px`;
    $("textColorValue").textContent = config.color.toUpperCase();
    $("backgroundColorValue").textContent = config.transparent ? "transparent" : config.background.toUpperCase();
    updateCode();
    saveState();
  }
  function markdownCode() {
    return `![ALOSTOURA Typing SVG](./assets/ALOSTOURA-Typing.svg)`;
  }
  function htmlCode() {
    return `<img src="./assets/ALOSTOURA-Typing.svg" alt="ALOSTOURA animated typing SVG" width="${readConfig().width}" height="${readConfig().height}">`;
  }
  function updateCode() {
    $("codeOutput").textContent = activeTab === "svg" ? latestSvg : activeTab === "html" ? htmlCode() : markdownCode();
  }
  function download(name, content, type) {
    const blob = new Blob([content], {type});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download=name; document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    showToast(translations[lang].downloaded);
  }
  function showToast(message) {
    const toast=$("toast"); toast.textContent=message; toast.classList.add("show");
    clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>toast.classList.remove("show"),1900);
  }
  function setLanguage(next) {
    lang=next; document.documentElement.lang=lang; document.documentElement.dir=lang==="ar"?"rtl":"ltr";
    document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(translations[lang][key])el.textContent=translations[lang][key];});
    $("languageToggle").textContent=lang==="ar"?"English":"العربية";
    document.querySelectorAll("#effectSelect option").forEach(option=>{option.textContent=effectLabels[lang][option.value]||option.textContent;});
    $("presetSelect").options[0].textContent=lang==="ar"?"تصميم مخصص":"Custom design";
    update();
  }
  fields.forEach(id=>{const el=$(id);if(el){el.addEventListener("input",update);el.addEventListener("change",update);}});
  document.querySelectorAll(".tab").forEach(tab=>tab.addEventListener("click",()=>{
    document.querySelectorAll(".tab").forEach(t=>{t.classList.toggle("active",t===tab);t.setAttribute("aria-selected",String(t===tab));});
    activeTab=tab.dataset.tab;updateCode();
  }));
  $("generateButton").addEventListener("click",update);
  $("resetButton").addEventListener("click",()=>{
    $("linesInput").value=defaults.lines;$("fontFamily").value=defaults.fontFamily;$("fontSize").value=defaults.fontSize;
    $("fontWeight").value=defaults.fontWeight;$("textColor").value=defaults.color;$("backgroundColor").value=defaults.background;
    $("transparentBg").checked=defaults.transparent;$("widthInput").value=defaults.width;$("heightInput").value=defaults.height;
    $("typingSpeed").value=defaults.typingDuration;$("pauseDuration").value=defaults.pauseDuration;$("align").value=defaults.align;$("effectSelect").value=defaults.effect;$("presetSelect").value="";update();
  });
  $("languageToggle").addEventListener("click",()=>setLanguage(lang==="en"?"ar":"en"));
  $("copyButton").addEventListener("click",async()=>{
    try { await navigator.clipboard.writeText(activeTab==="svg"?latestSvg:activeTab==="html"?htmlCode():markdownCode());showToast(translations[lang].copied); }
    catch(e){const range=document.createRange();range.selectNodeContents($("codeOutput"));const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);showToast("Select and copy the highlighted text");}
  });
  $("downloadButton").addEventListener("click",()=>download("ALOSTOURA-Typing.svg",latestSvg,"image/svg+xml;charset=utf-8"));
  $("downloadMarkdownButton").addEventListener("click",()=>download("README-typing-example.md",`# Example\n\n${markdownCode()}\n`,"text/markdown;charset=utf-8"));
  $("presetSelect").addEventListener("change",e=>{if(e.target.value!=="")applyPreset(e.target.value);});
  loadPresets();
  restoreState();
  setLanguage(lang);
  update();
})();