<div align="center">

<img src="assets/icons/favicon.svg" width="76" alt="ALOSTOURA Typing SVG logo">

# ALOSTOURA Typing SVG

**Animated SVG Typing Generator for GitHub Profiles and README files**

[![License: MIT](https://img.shields.io/badge/License-MIT-00D4FF.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-ready-3278FF.svg)](https://pages.github.com/)
[![No Dependencies](https://img.shields.io/badge/Dependencies-none-39D353.svg)](#)

English | [العربية](#النسخة-العربية)

</div>

Create animated typing SVG banners with a bilingual interface, instant preview, customizable typography, colors, dimensions, and animation timing. Export SVG, Markdown, or HTML directly from your browser.

## Live demo

After enabling GitHub Pages, open:

`https://alostoura-official.github.io/ALOSTOURA-Typing-SVG/`

## Features

- English and Arabic interface with RTL support
- Up to 10 animated text lines
- Live SVG preview
- Font family, size, weight, and alignment controls
- Text and background color controls, including transparent background
- Width, height, typing duration, and pause duration controls
- Export standalone SVG, Markdown snippet, and HTML snippet
- Runs locally in the browser — no backend, account, API key, or build step
- Responsive interface for desktop and mobile
- No external JavaScript dependencies

## Quick start

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Enter your phrases and customize the design.
4. Download the generated SVG.
5. Add the SVG file to your repository, for example at `assets/ALOSTOURA-Typing.svg`.
6. Embed it in your README:

```markdown
<p align="center">
  <img src="assets/ALOSTOURA-Typing.svg" alt="Animated typing banner">
</p>
```

For a profile README, use a raw GitHub URL or a relative path if the SVG is in the same repository.

## GitHub Pages deployment

1. Push the project files to a GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select your default branch and `/ (root)`.
5. Save and wait for deployment.
6. Visit the Pages URL shown by GitHub.

No build command is required.

## Important hosting note

GitHub Pages is static hosting. This project generates SVG files in the visitor's browser and lets them download the result. It does **not** provide a server endpoint that dynamically returns a different SVG for arbitrary URL query parameters. For a stable public image URL, download the generated SVG and commit it to a repository. A future dynamic API can be added using a serverless platform, but it is intentionally not required by this version.

## Project structure

```text
ALOSTOURA-Typing-SVG/
├── index.html
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── assets/
│   ├── css/style.css
│   ├── js/app.js
│   ├── icons/favicon.svg
│   └── fonts/
├── engine/
│   └── svg-engine.js
├── templates/
│   └── presets.json
└── examples/
    └── ALOSTOURA-Typing.svg
```

## Browser support

Use a current version of Chrome, Edge, Firefox, or Safari. SVG SMIL animation is supported by modern major browsers. Clipboard copy requires a secure context (HTTPS or localhost); if unavailable, select and copy the displayed code manually.

## Accessibility and security

- Generated SVG text is XML-escaped before insertion.
- Numeric settings are bounded to prevent unreasonable output dimensions and timings.
- The app does not transmit user-entered text or settings.
- Preview uses a locally generated SVG data URL.

## License

Released under the [MIT License](LICENSE).

## Author

**Alostoura-Official**  
GitHub: https://github.com/Alostoura-Official

---

## النسخة العربية

أنشئ لافتات SVG متحركة لملفات GitHub README والملف الشخصي، مع واجهة عربية وإنجليزية ومعاينة فورية وتخصيص الخطوط والألوان والأبعاد وسرعة الحركة.

### المميزات

- واجهة عربية وإنجليزية مع دعم اتجاه RTL.
- إضافة حتى 10 عبارات متتابعة.
- معاينة مباشرة للـ SVG.
- تخصيص نوع الخط وحجمه وسمكه ومحاذاته.
- تخصيص لون النص والخلفية مع دعم الخلفية الشفافة.
- التحكم في العرض والارتفاع ومدة الكتابة والتوقف.
- تصدير SVG وMarkdown وHTML.
- يعمل محليا داخل المتصفح دون خادم أو مفتاح API.
- متوافق مع الشاشات المختلفة ولا يحتاج إلى مكتبات خارجية.

### طريقة الاستخدام

1. ارفع ملفات المشروع إلى مستودع GitHub.
2. افتح `index.html` أو فعّل GitHub Pages.
3. اكتب العبارات وعدّل التصميم.
4. حمّل ملف SVG الناتج.
5. ارفع الملف إلى مستودعك داخل مجلد مثل `assets`.
6. أضف الصورة إلى README باستخدام:

```html
<p align="center">
  <img src="assets/ALOSTOURA-Typing.svg" alt="ALOSTOURA Typing SVG">
</p>
```

<div align="center">

  <a href="https://alostoura-official.github.io/ALOSTOURA-Typing-SVG/" target="_blank" rel="noopener noreferrer">
    <img
      src="https://api.microlink.io/?url=https%3A%2F%2Falostoura-official.github.io%2FALOSTOURA-Typing-SVG%2F& screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=8000"
      width="600"
      alt="ALOSTOURA Typing SVG Live Preview"
    />
  </a>

  <p>
    <a href="https://alostoura-official.github.io/ALOSTOURA-Typing-SVG/" target="_blank" rel="noopener noreferrer">
      <img
        src="https://img.shields.io/badge/🎓_Watch_Live-0e75b6?style=for-the-badge"
        alt="Watch Live"
      />
    </a>
  </p>

</div>


### ملاحظة الاستضافة

GitHub Pages استضافة ثابتة، لذلك يتم إنشاء SVG داخل متصفح المستخدم وتنزيله. لا يوفر هذا الإصدار رابط API ديناميكيا يتغير حسب معاملات URL. للحصول على رابط ثابت للصورة، ارفع ملف SVG الناتج إلى مستودع GitHub.

### الترخيص

المشروع منشور بموجب MIT License.
