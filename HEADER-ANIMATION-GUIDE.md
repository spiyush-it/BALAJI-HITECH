# 🎬 **Balaji Hitech Header Animation Breakdown**

**"Balaji Hitech Pvt. Ltd." + Robot/Plant animation sources:**

## 1. **HTML** (`index.html` / `career.html`)
```
<a class="brand brand-title visible" href="index.html" style="opacity: 1 !important; transform: none !important;">Balaji Hitech Pvt. Ltd.</a>
<div class="robot-scene" aria-hidden="true">
  <div class="robot">...</div>
  <div class="plant-container">...</div>
</div>
```

## 2. **CSS** (`styles.css` - lines 100-450)
```
.brand-title { opacity: 0; transform: translateY(28px); }
.brand-title span { opacity: 0; transform: translateY(10px); animation: brandFade 0.45s forwards; }

.robot-scene { position: absolute; animation: robotMove 3.8s ease-out forwards; }
.robot .eye { animation: eyeBlink 3.8s linear infinite; }
.robot .arm { animation: armReach 3.8s ease-out forwards; }
.plant-container .seed { animation: seedDrop 2.4s ease forwards; }
.stem { animation: stemGrow 1.1s 2.8s ease forwards; }
.leaf { animation: leafGrow 0.85s 3.5s ease forwards; }
```

## 3. **JavaScript** (`scripts.js` - lines 1-45)
```
const brandTitle = document.querySelector(".brand-title");
brandTitle.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
brandTitle.querySelectorAll('span').forEach(span => span.style.transitionDelay = `${idx * 0.165}s`);
brandTitle.classList.add('in');
```

## 4. **REQUIRED FILES** ✅
```
✅ styles.css  (robot animations + brand word-by-word fade)
✅ scripts.js  (logo text split + stagger animation)
✅ Inter font (Google Fonts)
```

## 5. **FULL COPY-PASTE** (SITE-HEADER-COPYPASTE.md)
**Already applied to career.html!** Run `start career.html` to see animations.

**Summary**: Logo text = `styles.css` + `scripts.js` | Robot/plant = `styles.css` keyframes

