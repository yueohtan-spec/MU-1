// --- MU: TEXT IDLE RPG ENGINE V11 ---
// Updates:
// 1. Removed Guild feature
// 2. Added Comprehensive Overview Stats Modal
// 3. Rebalanced Defense vs Damage Mitigation (percentage + flat mitigation)
// 4. Fixed Enhance CP bug (stable base CP, accurate CP change logging)
// 5. Added Inventory Tab with Priority for Higher Rarity Gear
// 6. Added HP & MP Potions with Quick-bar and Auto-Potion
// 7. Added Class Skills Tab with Skill Progression

class SoundController {
  constructor() { this.ctx = null; }
  init() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    } catch(e) {}
  }
  playGateOpen() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.linearRampToValueAtTime(35, now + 1.0);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 1.0);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.0);
    } catch(e) {}
  }
  playKeng() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(2093, now);
      osc.frequency.exponentialRampToValueAtTime(1046, now + 0.6);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    } catch(e) {}
  }
  playSlash() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.12);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch(e) {}
  }
  playMagic() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(550, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.25);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch(e) {}
  }
  playPotion() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(800, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch(e) {}
  }
  playAnvil() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch(e) {}
  }
  vibrate(ms = 80) {
    try {
      if (navigator.vibrate) navigator.vibrate(ms);
    } catch(e) {}
  }
}

const audio = new SoundController();

// --- 2D CHIBI GRAPHICS & BATTLE ARENA ENGINE ---
const CHIBI_HEROES = {
  dk: `<svg viewBox="0 0 100 120" class="chibi-svg">
    <path d="M25 45 Q5 25 15 65 Q30 55 35 60" fill="#e74c3c" stroke="#c0392b" stroke-width="1.5"/>
    <path d="M75 45 Q95 25 85 65 Q70 55 65 60" fill="#e74c3c" stroke="#c0392b" stroke-width="1.5"/>
    <ellipse cx="50" cy="80" rx="18" ry="22" fill="#2c3e50" stroke="#ffd700" stroke-width="2"/>
    <rect x="42" y="70" width="16" height="18" rx="4" fill="#34495e" stroke="#e67e22" stroke-width="1.5"/>
    <path d="M40 75 Q32 105 30 110 L70 110 Q68 105 60 75 Z" fill="#962d22"/>
    <rect x="38" y="96" width="9" height="15" rx="3" fill="#1a252f" stroke="#7f8c8d" stroke-width="1"/>
    <rect x="53" y="96" width="9" height="15" rx="3" fill="#1a252f" stroke="#7f8c8d" stroke-width="1"/>
    <circle cx="50" cy="42" r="22" fill="#f5cd79" stroke="#2c3e50" stroke-width="1"/>
    <ellipse cx="43" cy="44" rx="4" ry="5.5" fill="#2c3e50"/>
    <circle cx="41.5" cy="42" r="1.8" fill="#ffffff"/>
    <circle cx="44.5" cy="46" r="0.8" fill="#ffffff"/>
    <ellipse cx="57" cy="44" rx="4" ry="5.5" fill="#2c3e50"/>
    <circle cx="55.5" cy="42" r="1.8" fill="#ffffff"/>
    <circle cx="58.5" cy="46" r="0.8" fill="#ffffff"/>
    <ellipse cx="37" cy="49" rx="3" ry="1.5" fill="#ff7675" opacity="0.7"/>
    <ellipse cx="63" cy="49" rx="3" ry="1.5" fill="#ff7675" opacity="0.7"/>
    <path d="M47 50 Q50 53 53 50" fill="none" stroke="#2c3e50" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M30 38 Q50 18 70 38 Q65 24 50 20 Q35 24 30 38 Z" fill="#7f8c8d" stroke="#ffd700" stroke-width="2"/>
    <path d="M32 28 Q18 12 24 32 Q27 30 32 28 Z" fill="#ffd700" stroke="#d35400" stroke-width="1"/>
    <path d="M68 28 Q82 12 76 32 Q73 30 68 28 Z" fill="#ffd700" stroke="#d35400" stroke-width="1"/>
    <polygon points="50,15 46,24 54,24" fill="#e74c3c"/>
    <g class="weapon-swing">
      <rect x="70" y="55" width="6" height="12" rx="2" fill="#d35400"/>
      <path d="M71 18 L75 18 L76 55 L70 55 Z" fill="#ecf0f1" stroke="#3498db" stroke-width="1.5"/>
      <polygon points="70,18 73,8 76,18" fill="#ffd700"/>
      <line x1="73" y1="18" x2="73" y2="52" stroke="#e74c3c" stroke-width="1"/>
    </g>
  </svg>`,
  fe: `<svg viewBox="0 0 100 120" class="chibi-svg">
    <path d="M22 50 Q0 20 20 70 Q30 55 35 60" fill="#a8e6cf" opacity="0.8" stroke="#1dd1a1" stroke-width="1.5"/>
    <path d="M78 50 Q100 20 80 70 Q70 55 65 60" fill="#a8e6cf" opacity="0.8" stroke="#1dd1a1" stroke-width="1.5"/>
    <path d="M42 68 Q50 65 58 68 L64 96 L36 96 Z" fill="#2ecc71" stroke="#27ae60" stroke-width="1.5"/>
    <circle cx="50" cy="74" r="3" fill="#ffd700"/>
    <rect x="42" y="96" width="6" height="15" rx="3" fill="#ffeaa7"/>
    <rect x="52" y="96" width="6" height="15" rx="3" fill="#ffeaa7"/>
    <rect x="40" y="107" width="9" height="5" rx="2" fill="#27ae60"/>
    <rect x="51" y="107" width="9" height="5" rx="2" fill="#27ae60"/>
    <circle cx="50" cy="42" r="21" fill="#ffeaa7"/>
    <path d="M28 35 Q10 40 16 75 Q24 60 30 48 Z" fill="#f1c40f" stroke="#f39c12" stroke-width="1"/>
    <path d="M72 35 Q90 40 84 75 Q76 60 70 48 Z" fill="#f1c40f" stroke="#f39c12" stroke-width="1"/>
    <path d="M30 38 Q50 18 70 38 Q65 26 50 24 Q35 26 30 38 Z" fill="#f1c40f"/>
    <polygon points="29,40 18,36 30,46" fill="#ffeaa7" stroke="#fab1a0" stroke-width="1"/>
    <polygon points="71,40 82,36 70,46" fill="#ffeaa7" stroke="#fab1a0" stroke-width="1"/>
    <ellipse cx="43" cy="44" rx="4.5" ry="6" fill="#0984e3"/>
    <circle cx="41.5" cy="42" r="2" fill="#ffffff"/>
    <circle cx="44.5" cy="46" r="1" fill="#ffffff"/>
    <ellipse cx="57" cy="44" rx="4.5" ry="6" fill="#0984e3"/>
    <circle cx="55.5" cy="42" r="2" fill="#ffffff"/>
    <circle cx="58.5" cy="46" r="1" fill="#ffffff"/>
    <ellipse cx="37" cy="49" rx="3" ry="1.5" fill="#ff7675" opacity="0.7"/>
    <ellipse cx="63" cy="49" rx="3" ry="1.5" fill="#ff7675" opacity="0.7"/>
    <path d="M47 50 Q50 53 53 50" fill="none" stroke="#2c3e50" stroke-width="1.5" stroke-linecap="round"/>
    <g class="weapon-swing">
      <path d="M70 30 Q88 55 70 80" fill="none" stroke="#00cec9" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="70" y1="30" x2="70" y2="80" stroke="#dfe6e9" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="62" y1="55" x2="80" y2="55" stroke="#ffeaa7" stroke-width="2"/>
      <polygon points="80,52 86,55 80,58" fill="#ffd700"/>
    </g>
  </svg>`,
  dw: `<svg viewBox="0 0 100 120" class="chibi-svg">
    <path d="M30 65 Q18 95 20 112 L80 112 Q82 95 70 65 Z" fill="#2c2c54" stroke="#474787" stroke-width="1.5"/>
    <path d="M40 70 L50 90 L60 70 Z" fill="#40407a"/>
    <rect x="42" y="100" width="6" height="12" rx="2" fill="#1b1464"/>
    <rect x="52" y="100" width="6" height="12" rx="2" fill="#1b1464"/>
    <circle cx="50" cy="44" r="21" fill="#f5cd79"/>
    <path d="M28 42 Q25 65 30 72 Q36 60 33 46 Z" fill="#dcdde1"/>
    <path d="M72 42 Q75 65 70 72 Q64 60 67 46 Z" fill="#dcdde1"/>
    <path d="M30 40 Q50 25 70 40 Q62 30 50 28 Q38 30 30 40 Z" fill="#dcdde1"/>
    <polygon points="50,10 32,32 68,32" fill="#474787" stroke="#706fd3" stroke-width="1.5"/>
    <ellipse cx="50" cy="32" rx="20" ry="5" fill="#2c2c54" stroke="#ffd700" stroke-width="1.5"/>
    <circle cx="50" cy="30" r="3" fill="#00d2d3"/>
    <ellipse cx="43" cy="45" rx="4" ry="5.5" fill="#341f97"/>
    <circle cx="42" cy="43" r="1.8" fill="#00d2d3"/>
    <ellipse cx="57" cy="45" rx="4" ry="5.5" fill="#341f97"/>
    <circle cx="56" cy="43" r="1.8" fill="#00d2d3"/>
    <ellipse cx="37" cy="50" rx="2.5" ry="1.2" fill="#ff7675" opacity="0.6"/>
    <ellipse cx="63" cy="50" rx="2.5" ry="1.2" fill="#ff7675" opacity="0.6"/>
    <path d="M47 52 Q50 54 53 52" fill="none" stroke="#2c3e50" stroke-width="1.2" stroke-linecap="round"/>
    <g class="weapon-swing">
      <line x1="72" y1="25" x2="72" y2="105" stroke="#706fd3" stroke-width="3" stroke-linecap="round"/>
      <circle cx="72" cy="22" r="9" fill="none" stroke="#ffd700" stroke-width="2"/>
      <circle cx="72" cy="22" r="5" fill="#00cec9"/>
      <circle cx="72" cy="22" r="2" fill="#ffffff"/>
    </g>
  </svg>`
};

const CHIBI_MONSTERS = {
  spider: `<svg viewBox="0 0 100 120" class="chibi-svg">
    <path d="M35 70 Q10 50 15 90" fill="none" stroke="#2c3e50" stroke-width="3" stroke-linecap="round"/>
    <path d="M30 75 Q5 70 8 105" fill="none" stroke="#2c3e50" stroke-width="3" stroke-linecap="round"/>
    <path d="M65 70 Q90 50 85 90" fill="none" stroke="#2c3e50" stroke-width="3" stroke-linecap="round"/>
    <path d="M70 75 Q95 70 92 105" fill="none" stroke="#2c3e50" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="50" cy="72" rx="24" ry="20" fill="#2c3e50" stroke="#e74c3c" stroke-width="2"/>
    <circle cx="50" cy="68" r="6" fill="#e74c3c"/>
    <circle cx="50" cy="45" r="18" fill="#34495e" stroke="#c0392b" stroke-width="2"/>
    <circle cx="43" cy="43" r="5" fill="#e74c3c"/>
    <circle cx="41.5" cy="41.5" r="2" fill="#ffffff"/>
    <circle cx="57" cy="43" r="5" fill="#e74c3c"/>
    <circle cx="55.5" cy="41.5" r="2" fill="#ffffff"/>
    <polygon points="44,54 42,62 47,56" fill="#ecf0f1"/>
    <polygon points="56,54 58,62 53,56" fill="#ecf0f1"/>
  </svg>`,
  golem: `<svg viewBox="0 0 100 120" class="chibi-svg">
    <ellipse cx="50" cy="80" rx="26" ry="24" fill="#7f8c8d" stroke="#34495e" stroke-width="2"/>
    <rect x="36" y="98" width="12" height="15" rx="4" fill="#34495e"/>
    <rect x="52" y="98" width="12" height="15" rx="4" fill="#34495e"/>
    <circle cx="50" cy="44" r="22" fill="#95a5a6" stroke="#2c3e50" stroke-width="2"/>
    <path d="M38 28 L50 16 L62 28 Z" fill="#3498db" stroke="#2980b9" stroke-width="1.5"/>
    <circle cx="43" cy="44" r="5" fill="#00d2d3"/>
    <circle cx="43" cy="44" r="2" fill="#ffffff"/>
    <circle cx="57" cy="44" r="5" fill="#00d2d3"/>
    <circle cx="57" cy="44" r="2" fill="#ffffff"/>
    <line x1="42" y1="55" x2="58" y2="55" stroke="#2c3e50" stroke-width="2"/>
  </svg>`,
  sea: `<svg viewBox="0 0 100 120" class="chibi-svg">
    <path d="M22 65 Q5 80 18 100 Q30 90 32 80" fill="#00cec9" stroke="#0984e3" stroke-width="1.5"/>
    <path d="M78 65 Q95 80 82 100 Q70 90 68 80" fill="#00cec9" stroke="#0984e3" stroke-width="1.5"/>
    <ellipse cx="50" cy="78" rx="20" ry="24" fill="#0984e3" stroke="#74b9ff" stroke-width="2"/>
    <circle cx="50" cy="42" r="20" fill="#00cec9" stroke="#0984e3" stroke-width="2"/>
    <polygon points="50,15 45,26 55,26" fill="#ffd700"/>
    <ellipse cx="43" cy="42" rx="4" ry="5" fill="#2d3436"/>
    <circle cx="42" cy="40" r="1.5" fill="#ffffff"/>
    <ellipse cx="57" cy="42" rx="4" ry="5" fill="#2d3436"/>
    <circle cx="56" cy="40" r="1.5" fill="#ffffff"/>
    <path d="M47 50 Q50 54 53 50" fill="none" stroke="#2d3436" stroke-width="1.5"/>
  </svg>`,
  demon: `<svg viewBox="0 0 100 120" class="chibi-svg">
    <path d="M25 50 Q0 30 15 75 Q28 65 32 70" fill="#881337" stroke="#4c0519" stroke-width="1.5"/>
    <path d="M75 50 Q100 30 85 75 Q72 65 68 70" fill="#881337" stroke="#4c0519" stroke-width="1.5"/>
    <ellipse cx="50" cy="80" rx="22" ry="22" fill="#be123c" stroke="#4c0519" stroke-width="2"/>
    <circle cx="50" cy="44" r="22" fill="#e11d48" stroke="#881337" stroke-width="2"/>
    <path d="M34 30 Q18 10 26 32 Z" fill="#ffd700" stroke="#d97706" stroke-width="1.5"/>
    <path d="M66 30 Q82 10 74 32 Z" fill="#ffd700" stroke="#d97706" stroke-width="1.5"/>
    <ellipse cx="43" cy="44" rx="5" ry="6" fill="#facc15"/>
    <ellipse cx="43.5" cy="44" rx="2" ry="5" fill="#1e1b4b"/>
    <circle cx="42" cy="41" r="1.5" fill="#ffffff"/>
    <ellipse cx="57" cy="44" rx="5" ry="6" fill="#facc15"/>
    <ellipse cx="56.5" cy="44" rx="2" ry="5" fill="#1e1b4b"/>
    <circle cx="55" cy="41" r="1.5" fill="#ffffff"/>
    <polygon points="45,54 43,62 48,56" fill="#ecf0f1"/>
    <polygon points="55,54 57,62 52,56" fill="#ecf0f1"/>
  </svg>`,
  dragon: `<svg viewBox="0 0 100 120" class="chibi-svg">
    <path d="M30 55 Q5 30 18 75 Q32 65 35 70" fill="#c0392b" stroke="#7f1d1d" stroke-width="1.5"/>
    <path d="M70 55 Q95 30 82 75 Q68 65 65 70" fill="#c0392b" stroke="#7f1d1d" stroke-width="1.5"/>
    <path d="M60 90 Q85 105 75 115" fill="none" stroke="#b71540" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="50" cy="76" rx="20" ry="22" fill="#e55039" stroke="#ffd700" stroke-width="2"/>
    <path d="M42 68 Q50 64 58 68 L56 94 Q50 97 44 94 Z" fill="#f8c291"/>
    <ellipse cx="38" cy="100" rx="6" ry="4" fill="#b71540"/>
    <ellipse cx="62" cy="100" rx="6" ry="4" fill="#b71540"/>
    <ellipse cx="50" cy="42" rx="22" ry="19" fill="#e55039" stroke="#b71540" stroke-width="1.5"/>
    <path d="M34 28 Q20 12 28 32 Z" fill="#ffd700" stroke="#e67e22" stroke-width="1"/>
    <path d="M66 28 Q80 12 72 32 Z" fill="#ffd700" stroke="#e67e22" stroke-width="1"/>
    <ellipse cx="42" cy="41" rx="5" ry="6" fill="#f6b93b"/>
    <ellipse cx="43" cy="41" rx="2" ry="5" fill="#2c3e50"/>
    <circle cx="41" cy="38" r="1.5" fill="#ffffff"/>
    <ellipse cx="58" cy="41" rx="5" ry="6" fill="#f6b93b"/>
    <ellipse cx="57" cy="41" rx="2" ry="5" fill="#2c3e50"/>
    <circle cx="56" cy="38" r="1.5" fill="#ffffff"/>
    <ellipse cx="50" cy="50" rx="6" ry="3.5" fill="#b71540"/>
    <circle cx="48" cy="50" r="1" fill="#7f1d1d"/>
    <circle cx="52" cy="50" r="1" fill="#7f1d1d"/>
  </svg>`
};

function updateArenaBackground(mapId) {
  const bg = document.getElementById("arenaBg");
  if (!bg) return;
  const bgThemes = {
    1: "linear-gradient(180deg, #101c2e 0%, #0d2818 70%, #041208 100%)",
    2: "linear-gradient(180deg, #092019 0%, #165b33 70%, #082613 100%)",
    3: "linear-gradient(180deg, #182c47 0%, #3a7bd5 65%, #c8d6e5 100%)",
    4: "linear-gradient(180deg, #18121e 0%, #2f1b41 70%, #12091a 100%)",
    5: "linear-gradient(180deg, #062b3d 0%, #0083b0 70%, #00b4db 100%)",
    6: "linear-gradient(180deg, #2b0909 0%, #871414 70%, #1f0404 100%)",
    7: "linear-gradient(180deg, #3d2606 0%, #b8860b 70%, #e67e22 100%)",
    8: "linear-gradient(180deg, #190926 0%, #5f27cd 70%, #341f97 100%)",
    9: "linear-gradient(180deg, #0c2461 0%, #1e3799 65%, #f6b93b 100%)",
    10: "linear-gradient(180deg, #130f40 0%, #30336b 70%, #535c68 100%)"
  };
  bg.style.background = bgThemes[mapId] || bgThemes[1];
}

function updateChibiArena(currentMap, mobName, mobCategory) {
  // 1. Hero Chibi
  const heroBadge = document.getElementById("chibiHeroBadge");
  const heroSprite = document.getElementById("heroSpriteEl");
  if (heroBadge) heroBadge.innerText = `Lv.${state.level} ${state.username}`;
  if (heroSprite && !heroSprite.hasChildNodes()) {
    heroSprite.innerHTML = CHIBI_HEROES[state.charClass || "dk"] || CHIBI_HEROES.dk;
  }

  // 2. Arena Background
  updateArenaBackground(currentMap.id);

  // 3. Monster Chibi
  const mobActor = document.getElementById("chibiMonsterActor");
  const mobNameEl = document.getElementById("chibiMobName");
  const mobSprite = document.getElementById("monsterSpriteEl");

  let archetype = "spider";
  if (currentMap.tier <= 2) archetype = "spider";
  else if (currentMap.tier <= 4) archetype = "golem";
  else if (currentMap.tier === 5) archetype = "sea";
  else if (currentMap.tier <= 8) archetype = "demon";
  else archetype = "dragon";

  if (mobCategory === "boss") archetype = "dragon";

  if (mobSprite) {
    mobSprite.innerHTML = CHIBI_MONSTERS[archetype] || CHIBI_MONSTERS.spider;
  }

  if (mobActor) {
    mobActor.classList.toggle("is-boss", mobCategory === "boss");
    mobActor.classList.toggle("is-elite", mobCategory === "elite");
  }

  if (mobNameEl) {
    if (mobCategory === "boss") mobNameEl.innerText = `👑 ${mobName}`;
    else if (mobCategory === "elite") mobNameEl.innerText = `★ ${mobName}`;
    else mobNameEl.innerText = mobName;
  }
}

function animateHeroAction(actionType = "attack") {
  const heroSprite = document.getElementById("heroSpriteEl");
  if (!heroSprite) return;
  heroSprite.classList.remove("anim-attack", "anim-cast");
  void heroSprite.offsetWidth;
  heroSprite.classList.add(actionType === "cast" ? "anim-cast" : "anim-attack");
  setTimeout(() => {
    heroSprite.classList.remove("anim-attack", "anim-cast");
  }, 350);
}

function animateMonsterReaction(isDeath = false) {
  const mobSprite = document.getElementById("monsterSpriteEl");
  if (!mobSprite) return;
  mobSprite.classList.remove("anim-hit", "anim-die");
  void mobSprite.offsetWidth;
  if (isDeath) {
    mobSprite.classList.add("anim-die");
    setTimeout(() => {
      mobSprite.classList.remove("anim-die");
    }, 450);
  } else {
    mobSprite.classList.add("anim-hit");
    setTimeout(() => {
      mobSprite.classList.remove("anim-hit");
    }, 300);
  }
}

function playSlashFx(type = "slash") {
  const fxLayer = document.getElementById("arenaFxLayer");
  if (!fxLayer) return;

  const fx = document.createElement("div");
  fx.className = `combat-slash-fx fx-${type}`;
  fx.style.left = "75%";
  fx.style.top = "50%";

  fxLayer.appendChild(fx);
  setTimeout(() => { if (fx.parentNode) fx.remove(); }, 350);
}

function spawnFloatingDamage(amount, type, isCrit) {
  const fxLayer = document.getElementById("arenaFxLayer");
  if (!fxLayer) return;

  const el = document.createElement("div");
  let prefix = isCrit ? "💥 CRIT! -" : (type === "mag" ? "🔮 -" : "⚔️ -");
  let cls = isCrit ? "float-crit" : (type === "mag" ? "float-mag" : "float-phy");

  el.className = `floating-number ${cls}`;
  el.innerText = `${prefix}${amount.toLocaleString()}`;

  const randomX = (Math.random() - 0.5) * 35;
  const randomY = (Math.random() - 0.5) * 25;
  el.style.left = `calc(75% + ${randomX}px)`;
  el.style.top = `calc(40% + ${randomY}px)`;

  fxLayer.appendChild(el);
  setTimeout(() => { if (el.parentNode) el.remove(); }, 850);
}

function spawnHeroFloatingEffect(text, cls = "float-hit") {
  const fxLayer = document.getElementById("arenaFxLayer");
  if (!fxLayer) return;

  const el = document.createElement("div");
  el.className = `floating-number ${cls}`;
  el.innerText = text;

  const randomX = (Math.random() - 0.5) * 20;
  el.style.left = `calc(25% + ${randomX}px)`;
  el.style.top = "40%";

  fxLayer.appendChild(el);
  setTimeout(() => { if (el.parentNode) el.remove(); }, 850);
}

function spawnFloatingLoot(icon, text, color = "#ffd700") {
  const fxLayer = document.getElementById("arenaFxLayer");
  if (!fxLayer) return;

  const el = document.createElement("div");
  el.className = "floating-loot";
  el.innerHTML = `<span style="font-size:12px; margin-right:3px;">${icon}</span><span style="color:${color};">${text}</span>`;

  const randomX = (Math.random() - 0.5) * 45;
  el.style.left = `calc(65% + ${randomX}px)`;
  el.style.top = "52%";

  fxLayer.appendChild(el);
  setTimeout(() => { if (el.parentNode) el.remove(); }, 900);
}

function toggleFullLog() {
  const overlay = document.getElementById("fullLogOverlay");
  if (!overlay) return;
  overlay.style.display = overlay.style.display === "none" ? "flex" : "none";
}


// 10 MU MAPS
const MAPS = [
  { id: 1, name: "Lorencia", reqLv: 1, reqRs: 0, tier: 1, mobDmg: [15, 30], mobs: ["Nhện Độc", "Rồng Con", "Trâu Rừng", "Người Xương"], boss: "Chúa Tể Rồng Đen" },
  { id: 2, name: "Noria", reqLv: 50, reqRs: 0, tier: 2, mobDmg: [60, 120], mobs: ["Bọ Khổng Lồ", "Ma Cây Agon", "Thợ Săn Rừng", "Yêu Tinh Đá"], boss: "Quái Thú Rừng Xanh" },
  { id: 3, name: "Devias", reqLv: 100, reqRs: 0, tier: 3, mobDmg: [180, 320], mobs: ["Người Tuyết", "Sát Thủ Băng", "Quái Vật Lạnh Giá", "Phù Thủy Tuyết"], boss: "Băng Vương Kundun" },
  { id: 4, name: "Dungeon", reqLv: 150, reqRs: 0, tier: 4, mobDmg: [450, 750], mobs: ["Ấu Trùng Địa Ngục", "Xương Cầm Rìu", "Bóng Ma Hắc Ám", "Mã Xà Độc"], boss: "Bóng Ma Ngục Tối" },
  { id: 5, name: "Atlans", reqLv: 200, reqRs: 0, tier: 5, mobDmg: [900, 1500], mobs: ["Quái Vật Biển Baha", "Người Cá Tinh Nghịch", "Thằn Lằn Biển", "Bóng Ma Biển"], boss: "Hải Vương Hydra" },
  { id: 6, name: "Lost Tower", reqLv: 250, reqRs: 0, tier: 6, mobDmg: [1800, 2800], mobs: ["Quỷ Sa Tăng", "Hắc Ma Tinh", "Kỵ Sĩ Hắc Ám", "Độc Nhãn Ma"], boss: "Ma Vương Balgass" },
  { id: 7, name: "Tarkan", reqLv: 300, reqRs: 0, tier: 7, mobDmg: [3200, 5000], mobs: ["Bọ Cạp Cát", "Sắt Thiết Ma", "Thiết Tích Thằn Lằn", "Độc Xà Sa Mạc"], boss: "Hoàng Kim Tarkan" },
  { id: 8, name: "Aida", reqLv: 350, reqRs: 0, tier: 8, mobDmg: [5500, 8500], mobs: ["Cổ Thụ Tà Ác", "Quỷ Rừng Xanh", "Thụ Yêu Cuồng Bạo", "Cung Thủ Rừng Rậm"], boss: "Hell Maine Hắc Ám" },
  { id: 9, name: "Icarus", reqLv: 380, reqRs: 1, tier: 9, mobDmg: [9000, 14000], mobs: ["Chiến Binh Bầu Trời", "Rồng Đỏ Bay", "Thiên Binh Sa Ngã", "Phượng Hoàng Lửa"], boss: "Phượng Hoàng Bóng Đêm" },
  { id: 10, name: "Kanturu", reqLv: 400, reqRs: 2, tier: 10, mobDmg: [15000, 24000], mobs: ["Người Máy Huỷ Diệt", "Quái Nhân Đột Biến", "Chiến Binh Sinh Hóa", "Kỵ Sĩ Tận Thế"], boss: "Chúa Tể Ác Mộng Nightmare" }
];

const TIERS = [
  { tier: 1, name: "Da/Rồng" },
  { tier: 2, name: "Đồng/Kim Ngân" },
  { tier: 3, name: "Thiềm Thừ" },
  { tier: 4, name: "Bạch Kim" },
  { tier: 5, name: "Long Vương" },
  { tier: 6, name: "Hắc Long" },
  { tier: 7, name: "Phượng Hoàng" },
  { tier: 8, name: "Thần Long" },
  { tier: 9, name: "Huyết Thần" },
  { tier: 10, name: "Bóng Đêm" }
];

const RARITIES = [
  { name: "Trắng", color: "#e0e0e0", class: "r-white", optCount: 0 },
  { name: "Lục", color: "#2ecc71", class: "r-green", optCount: 1 },
  { name: "Lam", color: "#3498db", class: "r-blue", optCount: 2 },
  { name: "Cam", color: "#e67e22", class: "r-orange", optCount: 3 },
  { name: "Vàng", color: "#f1c40f", class: "r-yellow", optCount: 4 },
  { name: "Tím", color: "#9b59b6", class: "r-purple", optCount: 5 },
  { name: "Đỏ Siêu Cấp", color: "#e74c3c", class: "r-red", optCount: 7 }
];

const OPTION_POOL = [
  "Tăng Sát Thương Hoàn Hảo +10%",
  "Tăng Sát Thương Bạo Kích +15%",
  "Gia Tăng Sức Đánh Tối Đa +50",
  "Tăng Tốc Độ Tấn Công +10",
  "Tăng Lượng Zen Rơi +30%",
  "Khả Năng Hồi Máu Khi Tiêu Diệt +50",
  "Giảm Sát Thương Nhận Vào +4%"
];

const SVG_ICONS = {
  mainWeapon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="slot-icon-svg"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l2 2 4-4-2-2"/><path d="M19 5l-4 4"/></svg>`,
  offWeapon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="slot-icon-svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  helm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="slot-icon-svg"><path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8v4H4v-4z"/><path d="M9 16v4h6v-4"/></svg>`,
  armor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="slot-icon-svg"><path d="M4 4h4l4 3 4-3h4v6l-2 3v7H6v-7L4 10V4z"/></svg>`,
  gloves: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="slot-icon-svg"><path d="M7 3v7a2 2 0 0 0 4 0V5a2 2 0 0 1 4 0v5a2 2 0 0 0 4 0V7a2 2 0 0 1 4 0v11a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2z"/></svg>`,
  boots: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="slot-icon-svg"><path d="M6 3h8v10l4 4v4H4v-4l2-2V3z"/></svg>`,
  pendant1: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="slot-icon-svg"><path d="M6 3c3 4 9 4 12 0"/><circle cx="12" cy="15" r="4"/></svg>`,
  pendant2: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="slot-icon-svg"><path d="M6 3c3 4 9 4 12 0"/><polygon points="12,11 15,17 9,17"/></svg>`,
  ring1: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="slot-icon-svg"><circle cx="12" cy="14" r="6"/><polygon points="10,4 14,4 16,8 8,8"/></svg>`,
  ring2: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="slot-icon-svg"><circle cx="12" cy="14" r="6"/><path d="M12 2l2.5 5h-5z"/></svg>`,
  wings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="slot-icon-svg"><path d="M2 9c4-6 10-6 10 2-4-2-7-1-10-2z"/><path d="M22 9c-4-6-10-6-10 2 4-2 7-1 10-2z"/><path d="M4 14c4-3 8-3 8 3-3-2-5-2-8-3z"/><path d="M20 14c-4-3-8-3-8 3 3-2 5-2 8-3z"/></svg>`
};


const ITEM_ARTWORKS = {
  sword: `<svg viewBox="0 0 48 48" class="item-art-svg">
    <defs>
      <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="30%" stop-color="#f5cd79"/>
        <stop offset="70%" stop-color="#e67e22"/>
        <stop offset="100%" stop-color="#c0392b"/>
      </linearGradient>
      <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffd700"/>
        <stop offset="100%" stop-color="#d35400"/>
      </linearGradient>
    </defs>
    <rect x="22" y="34" width="4" height="10" rx="1.5" fill="#2d3436"/>
    <circle cx="24" cy="45" r="2.5" fill="url(#goldTrim)"/>
    <path d="M14 33 Q24 36 34 33 L32 29 Q24 31 16 29 Z" fill="url(#goldTrim)"/>
    <circle cx="24" cy="31" r="2" fill="#e74c3c"/>
    <path d="M21 29 L21 8 L24 2 L27 8 L27 29 Z" fill="url(#bladeGrad)" stroke="#d35400" stroke-width="0.8"/>
    <line x1="24" y1="9" x2="24" y2="27" stroke="#ffd700" stroke-width="1"/>
    <polygon points="22,12 24,5 23,12" fill="#ffffff" opacity="0.85"/>
  </svg>`,

  staff: `<svg viewBox="0 0 48 48" class="item-art-svg">
    <defs>
      <linearGradient id="staffOrb" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="40%" stop-color="#00d2d3"/>
        <stop offset="100%" stop-color="#341f97"/>
      </linearGradient>
    </defs>
    <line x1="24" y1="18" x2="24" y2="46" stroke="#706fd3" stroke-width="3" stroke-linecap="round"/>
    <circle cx="24" cy="45" r="2" fill="#ffd700"/>
    <path d="M16 16 Q18 4 24 10 Q30 4 32 16 Q24 12 16 16 Z" fill="#ffd700" stroke="#d35400" stroke-width="0.8"/>
    <circle cx="24" cy="11" r="7" fill="url(#staffOrb)" filter="drop-shadow(0 0 4px #00d2d3)"/>
    <circle cx="22.5" cy="9.5" r="2" fill="#ffffff"/>
  </svg>`,

  bow: `<svg viewBox="0 0 48 48" class="item-art-svg">
    <path d="M14 8 Q38 24 14 40" fill="none" stroke="#00cec9" stroke-width="3" stroke-linecap="round" filter="drop-shadow(0 0 3px #00d2d3)"/>
    <path d="M14 8 Q32 24 14 40" fill="none" stroke="#ffd700" stroke-width="1.2"/>
    <line x1="14" y1="8" x2="14" y2="40" stroke="#ffffff" stroke-width="1" stroke-dasharray="2,2" opacity="0.8"/>
    <line x1="10" y1="24" x2="32" y2="24" stroke="#ffd700" stroke-width="1.8"/>
    <polygon points="32,21 38,24 32,27" fill="#e74c3c"/>
  </svg>`,

  shield: `<svg viewBox="0 0 48 48" class="item-art-svg">
    <defs>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e74c3c"/>
        <stop offset="50%" stop-color="#c0392b"/>
        <stop offset="100%" stop-color="#2c3e50"/>
      </linearGradient>
    </defs>
    <path d="M24 4 L40 9 C40 26 33 39 24 44 C15 39 8 26 8 9 Z" fill="url(#shieldGrad)" stroke="#ffd700" stroke-width="2"/>
    <path d="M24 8 L36 12 C36 24 30 35 24 39 C18 35 12 24 12 12 Z" fill="#2c3e50" opacity="0.85"/>
    <polygon points="24,14 28,22 24,20 20,22" fill="#ffd700"/>
    <circle cx="24" cy="26" r="4" fill="#f1c40f" stroke="#d35400" stroke-width="1"/>
    <circle cx="24" cy="26" r="2" fill="#e74c3c"/>
  </svg>`,

  helm: `<svg viewBox="0 0 48 48" class="item-art-svg">
    <path d="M12 20 Q4 6 12 2 Q13 12 16 18 Z" fill="#ffd700" stroke="#d35400" stroke-width="1"/>
    <path d="M36 20 Q44 6 36 2 Q35 12 32 18 Z" fill="#ffd700" stroke="#d35400" stroke-width="1"/>
    <path d="M14 20 Q24 6 34 20 L36 34 Q24 42 12 34 Z" fill="#34495e" stroke="#ffd700" stroke-width="1.8"/>
    <path d="M17 25 Q24 22 31 25 L32 28 Q24 25 16 28 Z" fill="#00d2d3" filter="drop-shadow(0 0 2px #00cec9)"/>
    <polygon points="24,4 21,14 27,14" fill="#e74c3c"/>
  </svg>`,

  armor: `<svg viewBox="0 0 48 48" class="item-art-svg">
    <polygon points="8,14 16,8 18,18 6,20" fill="#f1c40f" stroke="#d35400" stroke-width="1"/>
    <polygon points="40,14 32,8 30,18 42,20" fill="#f1c40f" stroke="#d35400" stroke-width="1"/>
    <path d="M16 10 L32 10 L36 24 L32 40 L16 40 L12 24 Z" fill="#2c3e50" stroke="#ffd700" stroke-width="1.8"/>
    <polygon points="24,18 29,24 24,30 19,24" fill="#00cec9" stroke="#ffffff" stroke-width="0.8"/>
    <path d="M18 34 Q24 38 30 34" fill="none" stroke="#f1c40f" stroke-width="1.5"/>
  </svg>`,

  gloves: `<svg viewBox="0 0 48 48" class="item-art-svg">
    <rect x="14" y="24" width="20" height="18" rx="4" fill="#2c3e50" stroke="#ffd700" stroke-width="1.5"/>
    <rect x="16" y="14" width="4" height="12" rx="2" fill="#34495e" stroke="#7f8c8d"/>
    <rect x="22" y="10" width="4" height="16" rx="2" fill="#34495e" stroke="#7f8c8d"/>
    <rect x="28" y="14" width="4" height="12" rx="2" fill="#34495e" stroke="#7f8c8d"/>
    <circle cx="24" cy="33" r="3" fill="#e74c3c" stroke="#ffd700" stroke-width="1"/>
  </svg>`,

  boots: `<svg viewBox="0 0 48 48" class="item-art-svg">
    <path d="M14 10 L28 10 L28 30 L36 34 L36 40 L12 40 L12 28 Z" fill="#2c3e50" stroke="#ffd700" stroke-width="1.8"/>
    <path d="M26 12 Q34 6 30 18 Z" fill="#ffd700"/>
    <line x1="14" y1="26" x2="28" y2="26" stroke="#e67e22" stroke-width="1.5"/>
  </svg>`,

  wings: `<svg viewBox="0 0 48 48" class="item-art-svg">
    <path d="M24 26 Q10 4 2 16 Q2 32 14 36 Q20 32 24 26 Z" fill="#e74c3c" stroke="#ffd700" stroke-width="1.5" filter="drop-shadow(0 0 4px #c0392b)"/>
    <path d="M24 26 Q38 4 46 16 Q46 32 34 36 Q28 32 24 26 Z" fill="#e74c3c" stroke="#ffd700" stroke-width="1.5" filter="drop-shadow(0 0 4px #c0392b)"/>
    <circle cx="24" cy="26" r="3.5" fill="#ffd700"/>
    <circle cx="24" cy="26" r="1.5" fill="#ffffff"/>
  </svg>`,

  pendant: `<svg viewBox="0 0 48 48" class="item-art-svg">
    <path d="M12 8 Q24 22 36 8" fill="none" stroke="#ffd700" stroke-width="2"/>
    <polygon points="24,20 30,30 24,40 18,30" fill="#e74c3c" stroke="#ffd700" stroke-width="1.5" filter="drop-shadow(0 0 3px #ff4757)"/>
    <circle cx="24" cy="29" r="2.5" fill="#ffffff" opacity="0.8"/>
  </svg>`,

  ring: `<svg viewBox="0 0 48 48" class="item-art-svg">
    <ellipse cx="24" cy="28" rx="14" ry="11" fill="none" stroke="#ffd700" stroke-width="3" filter="drop-shadow(0 0 2px #d35400)"/>
    <polygon points="24,12 28,18 24,22 20,18" fill="#3498db" stroke="#ffffff" stroke-width="1"/>
    <circle cx="24" cy="17" r="2" fill="#ffffff" opacity="0.9"/>
  </svg>`
};

function getItemIllustration(item, slotKey) {
  if (!item) return "";
  let key = slotKey;
  if (slotKey === "mainWeapon") {
    if (state.charClass === "dw") key = "staff";
    else if (state.charClass === "fe") key = "bow";
    else key = "sword";
  } else if (slotKey === "offWeapon") {
    if (state.charClass === "fe") key = "bow";
    else key = "shield";
  } else if (slotKey === "pendant1" || slotKey === "pendant2") {
    key = "pendant";
  } else if (slotKey === "ring1" || slotKey === "ring2") {
    key = "ring";
  }

  return ITEM_ARTWORKS[key] || ITEM_ARTWORKS.sword;
}

const SLOT_TYPES = [
  { key: "mainWeapon", name: "Vũ Khí Chính" },
  { key: "offWeapon", name: "Vũ Khí Phụ / Khiên" },
  { key: "helm", name: "Mũ Giáp" },
  { key: "armor", name: "Áo Giáp" },
  { key: "gloves", name: "Găng Tay" },
  { key: "boots", name: "Giày" },
  { key: "pendant1", name: "Dây Chuyền 1" },
  { key: "pendant2", name: "Dây Chuyền 2" },
  { key: "ring1", name: "Nhẫn 1" },
  { key: "ring2", name: "Nhẫn 2" },
  { key: "wings", name: "Cánh (Wings)" }
];

const LEGEND_RANKS = [
  { name: "SoulMaster_Pro", charClass: "dw", cpMult: 4.8, rs: 16, lv: 400, bossKills: 1420 },
  { name: "DragonKnight_VN", charClass: "dk", cpMult: 4.2, rs: 14, lv: 395, bossKills: 1180 },
  { name: "Elf_NuVuong", charClass: "fe", cpMult: 3.8, rs: 12, lv: 380, bossKills: 960 },
  { name: "VoSongChiTon", charClass: "dk", cpMult: 3.3, rs: 10, lv: 370, bossKills: 820 },
  { name: "HuyenThoaiMU", charClass: "dw", cpMult: 2.8, rs: 8, lv: 350, bossKills: 670 },
  { name: "TieuMyNhan", charClass: "fe", cpMult: 2.4, rs: 6, lv: 330, bossKills: 530 },
  { name: "SatThuBongDem", charClass: "dk", cpMult: 1.9, rs: 5, lv: 310, bossKills: 410 },
  { name: "BangTamDao", charClass: "dw", cpMult: 1.5, rs: 3, lv: 280, bossKills: 300 },
  { name: "BachPhatXuyenTam", charClass: "fe", cpMult: 1.2, rs: 2, lv: 240, bossKills: 210 },
  { name: "TanBinhLorencia", charClass: "dk", cpMult: 0.7, rs: 0, lv: 110, bossKills: 45 }
];

// CLASS SKILLS CONFIG
function getClassSkills(charClass = "dk") {
  if (charClass === "fe") {
    return [
      { id: "triple_shot", name: "Triple Shot", icon: "🏹", level: 1, maxLevel: 10, desc: "Bắn ba mũi tên bạo kích cùng lúc về phía mục tiêu.", baseMult: 1.5, costZen: 10000, costPts: 1 },
      { id: "ice_arrow", name: "Ice Arrow", icon: "❄️", level: 1, maxLevel: 10, desc: "Băng tiễn đóng băng quái vật, giảm 50% sức đánh.", baseMult: 1.7, costZen: 25000, costPts: 2 },
      { id: "penetration", name: "Penetration", icon: "🎯", level: 0, maxLevel: 10, desc: "Mũi tên xé gió xuyên thấu phòng thủ quái vật.", baseMult: 2.2, costZen: 50000, costPts: 3 },
      { id: "infinity_arrow", name: "Infinity Arrow", icon: "🕊️", level: 1, maxLevel: 10, desc: "Thần tiễn tăng né tránh và bạo kích vô hạn.", baseMult: 1.0, costZen: 20000, costPts: 2 }
    ];
  } else if (charClass === "dw") {
    return [
      { id: "evil_spirit", name: "Evil Spirit", icon: "🔮", level: 1, maxLevel: 10, desc: "Triệu hồi linh hồn tà ác quét sạch toàn bộ quái vật.", baseMult: 1.6, costZen: 10000, costPts: 1 },
      { id: "ice_storm", name: "Ice Storm", icon: "❄️", level: 1, maxLevel: 10, desc: "Bão tuyết đông giá đóng băng toàn bộ mục tiêu.", baseMult: 1.9, costZen: 25000, costPts: 2 },
      { id: "hellfire", name: "Hellfire", icon: "☄️", level: 0, maxLevel: 10, desc: "Cột lửa hỏa ngục thiêu đốt mục tiêu liên tục.", baseMult: 2.4, costZen: 50000, costPts: 3 },
      { id: "mana_shield", name: "Mana Shield", icon: "🛡️", level: 1, maxLevel: 10, desc: "Khiên linh hồn dùng năng lượng hấp thụ sát thương.", baseMult: 1.0, costZen: 20000, costPts: 2 }
    ];
  } else {
    return [
      { id: "twisting_slash", name: "Twisting Slash", icon: "⚔️", level: 1, maxLevel: 10, desc: "Xoay kiếm cuồng phong, sát thương vật lý lan tỏa.", baseMult: 1.4, costZen: 10000, costPts: 1 },
      { id: "death_stab", name: "Death Stab", icon: "🗡️", level: 1, maxLevel: 10, desc: "Đâm gió xuyên tâm bùng nổ, làm giảm giáp quái vật.", baseMult: 1.8, costZen: 25000, costPts: 2 },
      { id: "rageful_blow", name: "Rageful Blow", icon: "💥", level: 0, maxLevel: 10, desc: "Nộ kích chấn động mặt đất, sát thương chí mạng.", baseMult: 2.3, costZen: 50000, costPts: 3 },
      { id: "greater_fortitude", name: "Greater Fortitude", icon: "🛡️", level: 1, maxLevel: 10, desc: "Gồng máu thần thánh, tăng máu tối đa và hồi phục.", baseMult: 1.0, costZen: 20000, costPts: 2 }
    ];
  }
}

// USER & GAME STATE
function getRequiredExpForLevel(lvl) {
  return Math.floor(lvl * lvl * 15 + lvl * 80 + 100);
}

function getDefaultState(username = "Hero_Lorencia", charClass = "dk") {
  let stats = { str: 25, agi: 20, vit: 25, ene: 15 };
  let gender = "male";
  if (charClass === "fe") {
    stats = { str: 20, agi: 35, vit: 20, ene: 15 };
    gender = "female";
  } else if (charClass === "dw") {
    stats = { str: 15, agi: 20, vit: 20, ene: 35 };
    gender = "male";
  }

  return {
    username,
    charClass,
    gender,
    level: 1,
    exp: 0,
    nextExp: 195,
    rs: 0,
    srs: 0,
    freePoints: 0,
    skillPoints: 5,
    skills: getClassSkills(charClass),
    autoStats: true,
    currentMapId: 1,
    stats,
    zen: 15000,
    bless: 2,
    chaos: 0,
    life: 0,
    potions: { hp: 50, mp: 50 },
    autoPotion: { hpEnabled: true, hpThreshold: 40 },
    currentHp: 500,
    currentMp: 200,
    equipped: {
      mainWeapon: null, offWeapon: null, helm: null, armor: null,
      gloves: null, boots: null, pendant1: null, pendant2: null,
      ring1: null, ring2: null, wings: null
    },
    inventory: [], // 30 Slots Max
    selectedSlotKey: "mainWeapon",
    selectedInventoryIndex: null,
    lastSaveTime: Date.now(),
    mobsKilled: 0,
    bossKilled: 0,
    buffs: {},
    enemyDebuffs: {}
  };
}

let state = getDefaultState();
let currentRankCategory = "cp";
let combatInterval = null;

// ACCOUNT MANAGEMENT
function getAccounts() {
  try {
    const raw = localStorage.getItem("mu_rpg_accounts");
    return raw ? JSON.parse(raw) : {};
  } catch(e) {
    return {};
  }
}
function saveAccounts(accounts) {
  try {
    localStorage.setItem("mu_rpg_accounts", JSON.stringify(accounts));
  } catch(e) {}
}
function getCurrentUser() {
  try {
    return localStorage.getItem("mu_rpg_current_user") || "";
  } catch(e) {
    return "";
  }
}
function setCurrentUser(username) {
  try {
    localStorage.setItem("mu_rpg_current_user", username);
  } catch(e) {}
}

function switchGateTab(tab) {
  const btnLogin = document.getElementById("btnTabLogin");
  const btnRegister = document.getElementById("btnTabRegister");
  const formLogin = document.getElementById("formLogin");
  const formRegister = document.getElementById("formRegister");
  const loginMsg = document.getElementById("loginMsg");
  const regMsg = document.getElementById("regMsg");
  if (loginMsg) loginMsg.innerText = "";
  if (regMsg) regMsg.innerText = "";

  if (tab === "login") {
    if (btnLogin) btnLogin.classList.add("active");
    if (btnRegister) btnRegister.classList.remove("active");
    if (formLogin) formLogin.style.display = "flex";
    if (formRegister) formRegister.style.display = "none";
  } else {
    if (btnRegister) btnRegister.classList.add("active");
    if (btnLogin) btnLogin.classList.remove("active");
    if (formRegister) formRegister.style.display = "flex";
    if (formLogin) formLogin.style.display = "none";
  }
}

function submitLogin() {
  const userEl = document.getElementById("loginUser");
  const passEl = document.getElementById("loginPass");
  const msgEl = document.getElementById("loginMsg");
  const u = userEl ? userEl.value.trim() : "";
  const p = passEl ? passEl.value.trim() : "";

  if (!u) {
    if (msgEl) msgEl.innerText = "Vui lòng nhập tên tài khoản!";
    return;
  }
  const accounts = getAccounts();
  const acc = accounts[u];
  if (!acc) {
    if (msgEl) msgEl.innerText = "Tài khoản chưa tồn tại. Hãy bấm tab ĐĂNG KÝ!";
    return;
  }
  if (acc.password && acc.password !== p) {
    if (msgEl) msgEl.innerText = "Sai mật khẩu! Vui lòng thử lại.";
    return;
  }

  // Load account state
  state = Object.assign(getDefaultState(acc.username, acc.charClass), acc.state);
  if (!state.skills || state.skills.length === 0) state.skills = getClassSkills(state.charClass);
  if (!state.inventory) state.inventory = [];
  if (!state.potions) state.potions = { hp: 50, mp: 50 };
  if (!state.autoPotion) state.autoPotion = { hpEnabled: true, hpThreshold: 40 };

  setCurrentUser(u);
  if (state.exp > state.nextExp) {
      state.exp = Math.floor(state.nextExp * 0.15);
    }
    state.nextExp = getRequiredExpForLevel(state.level);
    initGameSession();
}

function submitRegister() {
  const userEl = document.getElementById("regUser");
  const passEl = document.getElementById("regPass");
  const classEl = document.getElementById("regClass");
  const msgEl = document.getElementById("regMsg");

  const u = userEl ? userEl.value.trim() : "";
  const p = passEl ? passEl.value.trim() : "";
  const c = classEl ? classEl.value : "dk";

  if (!u || u.length < 3) {
    if (msgEl) msgEl.innerText = "Tên tài khoản phải từ 3 ký tự trở lên!";
    return;
  }
  if (!p || p.length < 4) {
    if (msgEl) msgEl.innerText = "Mật khẩu phải từ 4 ký tự trở lên!";
    return;
  }

  const accounts = getAccounts();
  if (accounts[u]) {
    if (msgEl) msgEl.innerText = "Tài khoản này đã tồn tại!";
    return;
  }

  const newState = getDefaultState(u, c);
  // Give starter gear
  newState.equipped.mainWeapon = generateItemForClass(1, 0, c);
  newState.equipped.helm = generateItem(1, 0);
  newState.equipped.armor = generateItem(1, 0);
  newState.equipped.gloves = generateItem(1, 0);
  newState.equipped.boots = generateItem(1, 0);

  accounts[u] = {
    username: u,
    password: p,
    charClass: c,
    createdAt: Date.now(),
    state: newState
  };
  saveAccounts(accounts);
  setCurrentUser(u);
  state = newState;

  initGameSession();
}

function logoutAccount() {
  saveGameState();
  if (combatInterval) {
    clearInterval(combatInterval);
    combatInterval = null;
  }
  setCurrentUser("");
  const gate = document.getElementById("loginGate");
  if (gate) gate.style.display = "flex";
  switchGateTab("login");
  addLog("[HỆ THỐNG] Đã đăng xuất khỏi tài khoản an toàn!", "log-norm");
}

function initGameSession() {
  const gate = document.getElementById("loginGate");
  if (gate) gate.style.display = "none";

  try {
    audio.playGateOpen();
    audio.vibrate(120);
  } catch(e) {}

  checkOfflineProgress();
  startCombatLoop();

  const className = state.charClass === "fe" ? "Fairy Elf" : (state.charClass === "dw" ? "Dark Wizard" : "Dark Knight");
  addLog(`★ CHÀO MỪNG HIỆP SĨ [${state.username}] (${className}) BƯỚC VÀO LỤC ĐỊA MU! ★`, "log-boss");
  addLog("Chiến đấu tự động & Thu hoạch tài nguyên đã kích hoạt!", "log-crit");

  updateUI();
  saveGameState();
}

// RENAME MODAL
function openRenameModal() {
  const m = document.getElementById("renameModal");
  const inp = document.getElementById("renameInput");
  const err = document.getElementById("renameErr");
  if (inp) inp.value = state.username;
  if (err) err.innerText = "";
  if (m) m.style.display = "flex";
}
function closeRenameModal() {
  const m = document.getElementById("renameModal");
  if (m) m.style.display = "none";
}
function submitRename() {
  const inp = document.getElementById("renameInput");
  const err = document.getElementById("renameErr");
  const newName = inp ? inp.value.trim() : "";
  if (!newName || newName.length < 2 || newName.length > 16) {
    if (err) err.innerText = "Tên nhân vật phải từ 2 đến 16 ký tự!";
    return;
  }

  const oldName = state.username;
  state.username = newName;
  closeRenameModal();
  addLog(`★ [ĐỔI TÊN] Hiệp sĩ [${oldName}] đã đổi danh xưng thành [${newName}] thành công! ★`, "log-crit");
  audio.playKeng();
  updateUI();
  saveGameState();
}

// BẢNG CHỈ SỐ TỔNG HỢP MODAL
function openOverviewStatsModal() {
  const m = document.getElementById("overviewStatsModal");
  const body = document.getElementById("overviewStatsBody");
  if (!m || !body) return;

  const stats = calculateStats();
  const className = state.charClass === "fe" ? "Fairy Elf" : (state.charClass === "dw" ? "Dark Wizard" : "Dark Knight");

  body.innerHTML = `
    <!-- Nhóm 1: Cơ bản -->
    <div style="background:#0c0f16; border:1px solid #232a3d; border-radius:5px; padding:6px;">
      <div style="font-weight:bold; color:var(--gold); margin-bottom:4px;">1. THÔNG TIN & THUỘC TÍNH CƠ BẢN</div>
      <div>• Nhân Vật: <b>${state.username}</b> [${className}] (Lv.${state.level} - RS: ${state.rs})</div>
      <div>• Tổng Lực Chiến: <b style="color:var(--gold); font-size:12px;">${stats.cp.toLocaleString()} CP</b></div>
      <div>• Điểm Tiềm Năng Chưa Cộng: <b style="color:#00ffcc;">${state.freePoints.toLocaleString()}</b></div>
      <div>• Sức Mạnh (STR): <b>${state.stats.str}</b> | Nhanh Nhẹn (AGI): <b>${state.stats.agi}</b></div>
      <div>• Thể Lực (VIT): <b>${state.stats.vit}</b> | Năng Lượng (ENE): <b>${state.stats.ene}</b></div>
    </div>

    <!-- Nhóm 2: Tấn công -->
    <div style="background:#0c0f16; border:1px solid #232a3d; border-radius:5px; padding:6px;">
      <div style="font-weight:bold; color:var(--phy-dmg); margin-bottom:4px;">2. SÁT THƯƠNG & CÔNG KÍCH</div>
      <div>• Sát Thương Vật Lý: <b style="color:var(--phy-dmg);">${stats.minPhy.toLocaleString()} ~ ${stats.maxPhy.toLocaleString()}</b></div>
      <div>• Sát Thương Pháp Thuật: <b style="color:var(--mag-dmg);">${stats.minMag.toLocaleString()} ~ ${stats.maxMag.toLocaleString()}</b></div>
      <div>• Tỷ Lệ Bạo Kích (Crit Chance): <b style="color:var(--crit);">${stats.critRate}%</b> (ST Bạo kích x1.8)</div>
      <div>• Phá Giáp Mục Tiêu: <b>+${Math.min(40, Math.floor(state.stats.str / 150))}%</b></div>
    </div>

    <!-- Nhóm 3: Phòng thủ & Sinh tồn -->
    <div style="background:#0c0f16; border:1px solid #232a3d; border-radius:5px; padding:6px;">
      <div style="font-weight:bold; color:#74b9ff; margin-bottom:4px;">3. PHÒNG THỦ & SINH TỒN</div>
      <div>• Phòng Thủ Thân Thể: <b style="color:#74b9ff;">${stats.totalDef.toLocaleString()}</b></div>
      <div>• Máu Tối Đa (Max HP): <b style="color:#ff7675;">${stats.maxHp.toLocaleString()}</b></div>
      <div>• Hồi Phục Máu Tự Nhiên: <b style="color:#ff7675;">+${stats.hpRegen.toLocaleString()} HP / nhịp</b></div>
      <div>• Năng Lượng Tối Đa (Max MP): <b style="color:#3498db;">${stats.maxMp.toLocaleString()}</b></div>
      <div>• Hồi Phục MP Tự Nhiên: <b style="color:#3498db;">+${stats.mpRegen.toLocaleString()} MP / nhịp</b></div>
      <div>• Tỷ Lệ Né Tránh Đòn: <b style="color:#55efc4;">${stats.dodgeRate}%</b></div>
      <div>• Miễn Giảm Sát Thương (VIT): <b style="color:#55efc4;">${stats.dmgReduction}%</b></div>
    </div>

    <!-- Nhóm 4: Tiến trình & Thành tựu -->
    <div style="background:#0c0f16; border:1px solid #232a3d; border-radius:5px; padding:6px;">
      <div style="font-weight:bold; color:#00ffcc; margin-bottom:4px;">4. TIẾN TRÌNH & THÀNH TỰU</div>
      <div>• Tổng Số Quái Đã Hạ: <b>${state.mobsKilled.toLocaleString()}</b> con</div>
      <div>• Tổng Số Boss Đã Diệt: <b>${(state.bossKilled || 0).toLocaleString()}</b> Boss</div>
      <div>• Số Lần Chuyển Sinh (RS): <b>${state.rs}</b> (Siêu RS: ${state.srs})</div>
      <div>• Điểm Kỹ Năng Đang Có: <b style="color:var(--gold);">${(state.skillPoints || 0)}</b> điểm</div>
      <div>• Sức Chứa Túi Đồ: <b>${(state.inventory || []).length} / 30</b> ô</div>
      <div>• Dự Trữ Dược Phẩm: <b>${state.potions.hp}</b> Bình HP | <b>${state.potions.mp}</b> Bình MP</div>
    </div>
  `;

  m.style.display = "flex";
}

function closeOverviewStatsModal() {
  const m = document.getElementById("overviewStatsModal");
  if (m) m.style.display = "none";
}

// POTION SYSTEM
function usePotion(type) {
  const stats = calculateStats();
  if (type === "hp") {
    if (state.potions.hp <= 0) {
      addLog("Đã hết Bình Máu! Hãy bấm Mua để tiếp tế!", "log-damage-taken");
      return;
    }
    state.potions.hp--;
    const healHp = Math.floor(stats.maxHp * 0.35) + 300;
    state.currentHp = Math.min(stats.maxHp, state.currentHp + healHp);
    audio.playPotion();
    addLog(`🧪 [DƯỢC PHẨM] Sử dụng Bình Máu! Hồi phục ngay +${healHp.toLocaleString()} HP!`, "log-buff");
  } else if (type === "mp") {
    if (state.potions.mp <= 0) {
      addLog("Đã hết Bình Mana! Hãy bấm Mua để tiếp tế!", "log-damage-taken");
      return;
    }
    state.potions.mp--;
    const healMp = Math.floor(stats.maxMp * 0.50) + 200;
    state.currentMp = Math.min(stats.maxMp, state.currentMp + healMp);
    audio.playPotion();
    addLog(`🧪 [DƯỢC PHẨM] Sử dụng Bình Mana! Hồi phục ngay +${healMp.toLocaleString()} MP!`, "log-buff");
  }
  updateUI();
  saveGameState();
}

function checkAutoPotion(stats) {
  if (!state.autoPotion || !state.autoPotion.hpEnabled) return;
  const thresholdHp = stats.maxHp * (state.autoPotion.hpThreshold / 100);
  if (state.currentHp < thresholdHp && state.potions.hp > 0) {
    state.potions.hp--;
    const healHp = Math.floor(stats.maxHp * 0.35) + 300;
    state.currentHp = Math.min(stats.maxHp, state.currentHp + healHp);
    audio.playPotion();
    addLog(`🧪 [TỰ ĐỘNG BÌNH MÁU] Máu dưới 40%! Tự uống Bình Máu, hồi +${healHp.toLocaleString()} HP!`, "log-buff");
  }
}

function toggleAutoPotion() {
  const chk = document.getElementById("chkAutoHpPotion");
  if (chk) {
    if (!state.autoPotion) state.autoPotion = { hpEnabled: true, hpThreshold: 40 };
    state.autoPotion.hpEnabled = chk.checked;
  }
  saveGameState();
}

function openPotionShopModal() {
  const m = document.getElementById("potionShopModal");
  if (m) m.style.display = "flex";
}
function closePotionShopModal() {
  const m = document.getElementById("potionShopModal");
  if (m) m.style.display = "none";
}
function buyPotion(type, count, cost) {
  if (state.zen < cost) {
    addLog(`Không đủ ${cost.toLocaleString()} Zen để mua dược phẩm!`, "log-damage-taken");
    return;
  }
  state.zen -= cost;
  if (!state.potions) state.potions = { hp: 50, mp: 50 };
  state.potions[type] += count;
  audio.playKeng();
  addLog(`🏪 [TIỆM DƯỢC] Đã mua +${count} Bình ${type.toUpperCase()} thành công!`, "log-zen");
  updateUI();
  saveGameState();
}

// ITEM & INVENTORY UTILITIES
function getItemCP(item) {
  if (!item) return 0;
  return Math.floor((item.atk * 1.8) + (item.def * 1.5) + (item.hp * 0.4) + (item.plus * 60) + (item.options.length * 80));
}

function getItemSellPrice(item) {
  if (!item) return 0;
  const baseValue = (item.tier * 200) + (item.rarity * 400) + (item.plus * 500);
  return Math.max(50, Math.floor(baseValue * 0.30));
}

function generateItemForClass(targetTier = null, forceRarity = null, charClass = null) {
  const c = charClass || state.charClass || "dk";
  return generateItem(targetTier, forceRarity, c);
}

function generateItem(targetTier = null, forceRarity = null, preferredClass = null) {
  const tierIndex = targetTier !== null ? targetTier - 1 : Math.min(9, state.currentMapId - 1);
  const tierData = TIERS[tierIndex] || TIERS[0];
  const slotDef = SLOT_TYPES[Math.floor(Math.random() * SLOT_TYPES.length)];
  
  let rarityObj = RARITIES[0];
  if (forceRarity !== null && RARITIES[forceRarity]) {
    rarityObj = RARITIES[forceRarity];
  } else {
    const roll = Math.random() * 100;
    if (roll < 45) rarityObj = RARITIES[0];
    else if (roll < 72) rarityObj = RARITIES[1];
    else if (roll < 88) rarityObj = RARITIES[2];
    else if (roll < 95) rarityObj = RARITIES[3];
    else if (roll < 98.2) rarityObj = RARITIES[4];
    else if (roll < 99.6) rarityObj = RARITIES[5];
    else rarityObj = RARITIES[6];
  }

  const pClass = preferredClass || state.charClass || "dk";
  let baseName = "";
  if (slotDef.key === "mainWeapon") {
    if (pClass === "dw") baseName = `Gậy ${tierData.name}`;
    else if (pClass === "fe" || state.gender === "female") baseName = `Nỏ ${tierData.name}`;
    else baseName = `Kiếm ${tierData.name}`;
  } else if (slotDef.key === "offWeapon") {
    if (pClass === "dw") baseName = `Khiên Ma Thuật ${tierData.name}`;
    else if (pClass === "fe") baseName = `Túi Tên ${tierData.name}`;
    else baseName = `Khiên ${tierData.name}`;
  } else {
    baseName = `${slotDef.name} ${tierData.name}`;
  }

  const baseMult = (tierIndex + 1) * (1 + rarityObj.optCount * 0.25);
  const isWeapon = ["mainWeapon", "wings", "pendant1", "pendant2"].includes(slotDef.key);
  const isArmor = ["helm", "armor", "gloves", "boots", "offWeapon"].includes(slotDef.key);

  const rawAtk = isWeapon ? Math.floor((Math.random() * 25 + 20) * baseMult) : Math.floor((Math.random() * 6 + 3) * baseMult);
  const rawDef = isArmor ? Math.floor((Math.random() * 18 + 15) * baseMult) : Math.floor((Math.random() * 4 + 2) * baseMult);
  const rawHp = Math.floor((Math.random() * 80 + 50) * baseMult);

  const shuffled = [...OPTION_POOL].sort(() => 0.5 - Math.random());
  const options = shuffled.slice(0, rarityObj.optCount);

  return {
    id: Math.random().toString(36).substring(2, 9),
    name: baseName,
    slotKey: slotDef.key,
    tier: tierIndex + 1,
    rarity: RARITIES.indexOf(rarityObj),
    plus: 0,
    atk: rawAtk,
    def: rawDef,
    hp: rawHp,
    options
  };
}

// INVENTORY & ITEM DROP ENGINE (PRIORITIZING HIGHER RARITY)
function handleDroppedItem(droppedItem) {
  if (!state.inventory) state.inventory = [];
  const slotKey = droppedItem.slotKey;
  const currentItem = state.equipped[slotKey];
  const newCP = getItemCP(droppedItem);
  const oldCP = getItemCP(currentItem);

  // 1. If higher CP, auto equip!
  if (!currentItem || newCP > oldCP) {
    state.equipped[slotKey] = droppedItem;
    let oldItemMsg = "";
    if (currentItem) {
      // If old unequipped item is rare (>= 3: Cam, Vàng, Tím, Đỏ), save into inventory if space
      if (currentItem.rarity >= 3 && state.inventory.length < 30) {
        state.inventory.push(currentItem);
        oldItemMsg = ` Đồ cũ [${currentItem.name}] phẩm cấp cao được giữ trong Túi Đồ!`;
      } else {
        const oldZen = getItemSellPrice(currentItem);
        state.zen += oldZen;
        oldItemMsg = ` Đồ cũ tự động bán thu về +${oldZen.toLocaleString()} Zen!`;
      }
    }
    addLog(`[NÂNG CẤP] Trang bị [${droppedItem.name}] (CP: ${newCP.toLocaleString()}) mạnh hơn -> Tự động mặc vào!${oldItemMsg}`, "log-equip");
    if (droppedItem.rarity >= 3) {
      audio.playKeng();
      audio.vibrate(120);
    }
  } else {
    // 2. newCP <= oldCP: Check user priority: "vật phẩm lc thấp hơn nhưng phẩm cấp cao hơn ưu tiên giữ lại"
    const currentRarity = currentItem ? currentItem.rarity : 0;
    const isHigherRarity = droppedItem.rarity > currentRarity;
    const isRareTier = droppedItem.rarity >= 3; // Cam, Vàng, Tím, Đỏ

    if ((isHigherRarity || isRareTier) && state.inventory.length < 30) {
      state.inventory.push(droppedItem);
      addLog(`🎁 [TÚI ĐỒ] Nhặt [${droppedItem.name}] (Phẩm chất ${RARITIES[droppedItem.rarity].name} quý hiếm) -> Đã cất vào Túi Đồ để dành cường hóa!`, "log-crit");
      audio.playKeng();
    } else {
      const sellZen = getItemSellPrice(droppedItem);
      state.zen += sellZen;
      addLog(`[RƠI ĐỒ] Nhặt [${droppedItem.name}] -> Tự động bán thu về +${sellZen.toLocaleString()} Zen!`, "log-zen");
    }
  }
}

function equipSelectedItem() {
  if (state.selectedInventoryIndex === null) return;
  if (!state.inventory || !state.inventory[state.selectedInventoryIndex]) return;

  const itemToEquip = state.inventory[state.selectedInventoryIndex];
  const slotKey = itemToEquip.slotKey;
  const oldEquipped = state.equipped[slotKey];

  state.equipped[slotKey] = itemToEquip;
  if (oldEquipped) {
    state.inventory[state.selectedInventoryIndex] = oldEquipped;
    addLog(`[MẶC ĐỒ] Đã thay [${itemToEquip.name}] vào người! [${oldEquipped.name}] chuyển vào Túi Đồ.`, "log-equip");
  } else {
    state.inventory.splice(state.selectedInventoryIndex, 1);
    state.selectedInventoryIndex = null;
    addLog(`[MẶC ĐỒ] Đã mặc [${itemToEquip.name}] vào người!`, "log-equip");
  }

  audio.playKeng();
  updateUI();
  saveGameState();
}

function sellSelectedItem() {
  if (state.selectedInventoryIndex === null) return;
  if (!state.inventory || !state.inventory[state.selectedInventoryIndex]) return;

  const itemToSell = state.inventory[state.selectedInventoryIndex];
  const price = getItemSellPrice(itemToSell);
  state.zen += price;
  state.inventory.splice(state.selectedInventoryIndex, 1);
  state.selectedInventoryIndex = null;

  audio.playKeng();
  addLog(`[BÁN ĐỒ] Đã bán [${itemToSell.name}] thu về +${price.toLocaleString()} Zen!`, "log-zen");
  updateUI();
  saveGameState();
}

function sellGarbageItems() {
  if (!state.inventory || state.inventory.length === 0) return;
  let totalZen = 0;
  let count = 0;

  state.inventory = state.inventory.filter(item => {
    if (item.rarity <= 1 && item.plus === 0) { // White and Green
      totalZen += getItemSellPrice(item);
      count++;
      return false;
    }
    return true;
  });

  if (count > 0) {
    state.zen += totalZen;
    addLog(`🧹 [DỌN TÚI] Đã thanh lý ${count} món đồ Trắng & Lục thu về +${totalZen.toLocaleString()} Zen!`, "log-zen");
    audio.playKeng();
    state.selectedInventoryIndex = null;
    updateUI();
    saveGameState();
  } else {
    addLog("Không có trang bị rác (Trắng / Lục) nào trong túi!", "log-norm");
  }
}

// COMPREHENSIVE STATS CALCULATION
// Base stats are strictly calculated without temporary fluctuating combat buffs to prevent CP bugs
function calculateStats() {
  const baseStr = Math.min(10000, state.stats.str);
  const baseAgi = Math.min(10000, state.stats.agi);
  const baseVit = Math.min(10000, state.stats.vit);
  const baseEne = Math.min(10000, state.stats.ene);

  let rawPhy = baseStr * 3.2 + baseAgi * 0.5;
  let rawMag = baseEne * 3.8 + baseStr * 0.3;
  let rawDef = baseAgi * 2.0 + baseStr * 0.4;
  let maxHp = baseVit * 28 + 400;
  let maxMp = baseEne * 18 + 200;

  let gearAtk = 0;
  let gearDef = 0;
  let gearHp = 0;

  let setTierCounts = {};
  for (const slotKey in state.equipped) {
    const item = state.equipped[slotKey];
    if (item) {
      const mult = 1 + item.plus * 0.12;
      gearAtk += item.atk * mult;
      gearDef += item.def * mult;
      gearHp += item.hp * mult;

      if (["helm", "armor", "gloves", "boots"].includes(slotKey)) {
        setTierCounts[item.tier] = (setTierCounts[item.tier] || 0) + 1;
      }
    }
  }

  // Distribute gear attack by class
  if (state.charClass === "dw") {
    rawMag += gearAtk * 0.85;
    rawPhy += gearAtk * 0.25;
  } else if (state.charClass === "fe") {
    rawPhy += gearAtk * 0.65;
    rawMag += gearAtk * 0.45;
  } else {
    rawPhy += gearAtk * 0.85;
    rawMag += gearAtk * 0.20;
  }

  rawDef += gearDef;
  maxHp += gearHp;

  // Set 4-Piece Bonus
  let activeSetTier = null;
  for (const t in setTierCounts) {
    if (setTierCounts[t] === 4) {
      activeSetTier = t;
      rawDef *= 1.20;
      maxHp *= 1.20;
      break;
    }
  }

  // Super Rebirth Multiplier
  const srsMult = 1 + state.srs * 0.5;
  rawPhy *= srsMult;
  rawMag *= srsMult;
  rawDef *= srsMult;
  maxHp *= srsMult;

  // Skill Level CP Bonus
  let skillBonusCP = 0;
  if (state.skills) {
    state.skills.forEach(sk => {
      skillBonusCP += sk.level * 120;
    });
  }

  // Min / Max Damage Range
  const minPhy = Math.max(10, Math.floor(rawPhy * 0.85));
  const maxPhy = Math.max(20, Math.floor(rawPhy * 1.15));
  const minMag = Math.max(10, Math.floor(rawMag * 0.85));
  const maxMag = Math.max(20, Math.floor(rawMag * 1.15));

  // Dodge, Crit, Regen, Reduction
  const dodgeRate = Math.min(50, Math.floor(5 + (baseAgi / 10000) * 40));
  const critRate = Math.min(75, Math.floor(10 + (baseAgi / 10000) * 50));
  const dmgReduction = Math.min(45, Math.floor((baseVit / 10000) * 35));
  const hpRegen = Math.floor(baseVit * 1.0 + 15);
  const mpRegen = Math.floor(baseEne * 0.8 + 10);

  // STABLE BASE COMBAT POWER (Not inflated by temporary combat buffs)
  const cp = Math.floor(rawPhy * 1.5 + rawMag * 1.5 + rawDef * 1.4 + maxHp * 0.35 + (critRate + dodgeRate) * 25 + skillBonusCP);

  return {
    minPhy, maxPhy,
    minMag, maxMag,
    totalDef: Math.floor(rawDef),
    maxHp: Math.floor(maxHp),
    maxMp: Math.floor(maxMp),
    hpRegen, mpRegen,
    dodgeRate, critRate, dmgReduction,
    cp, activeSetTier
  };
}

// COMBAT TICK ENGINE (0.5s/tick)
function startCombatLoop() {
  if (combatInterval) clearInterval(combatInterval);
  combatInterval = setInterval(() => { runCombatTick(); }, 500);
}

function runCombatTick() {
  const currentMap = MAPS.find(m => m.id === state.currentMapId) || MAPS[0];
  const stats = calculateStats();

  // Natural Regeneration
  const currentHpRegen = stats.hpRegen * (state.buffs && state.buffs.fortitude > 0 ? 1.5 : 1.0);
  state.currentHp = Math.min(stats.maxHp, state.currentHp + currentHpRegen);
  state.currentMp = Math.min(stats.maxMp, state.currentMp + stats.mpRegen);

  // Tick Down Buffs
  if (state.buffs) {
    for (const b in state.buffs) {
      state.buffs[b] = Math.max(0, state.buffs[b] - 0.5);
      if (state.buffs[b] <= 0) delete state.buffs[b];
    }
  } else {
    state.buffs = {};
  }

  // Tick Down Enemy Debuffs
  if (state.enemyDebuffs) {
    for (const d in state.enemyDebuffs) {
      state.enemyDebuffs[d] = Math.max(0, state.enemyDebuffs[d] - 0.5);
      if (state.enemyDebuffs[d] <= 0) delete state.enemyDebuffs[d];
    }
  } else {
    state.enemyDebuffs = {};
  }

  state.mobsKilled++;

  // Monster Tier Roll
  let mobCategory = "normal";
  let mobMult = 1;
  let mobColorClass = "log-norm";

  const rollMob = Math.random() * 100;
  if (state.mobsKilled % 10 === 0 || rollMob < 2.0) {
    mobCategory = "boss";
    mobMult = 5;
    mobColorClass = "log-boss";
  } else if (rollMob < 20.0) {
    mobCategory = "elite";
    mobMult = 2;
    mobColorClass = "log-elite";
  }

  // Monster Name
  let mobName = "";
  if (mobCategory === "boss") {
    mobName = `[BOSS THỦ LĨNH] ${currentMap.boss}`;
  } else if (mobCategory === "elite") {
    const rName = currentMap.mobs[Math.floor(Math.random() * currentMap.mobs.length)];
    mobName = `[TINH ANH] ${rName} Đột Biến`;
  } else {
    mobName = currentMap.mobs[Math.floor(Math.random() * currentMap.mobs.length)];
  }

  // Update Chibi Arena Visuals
  updateChibiArena(currentMap, mobName, mobCategory);

  // Random Buff Trigger by Stats
  if (state.stats.vit >= 30 && (!state.buffs.fortitude || state.buffs.fortitude <= 0) && (Math.random() < 0.08 || state.currentHp < stats.maxHp * 0.5)) {
    state.buffs.fortitude = 12;
    state.currentHp = Math.min(stats.maxHp, state.currentHp + Math.floor(stats.maxHp * 0.15));
    addLog("🛡️ [BUFF] Kích hoạt Gồng Máu (Greater Fortitude) +25% HP & Hồi Phục!", "log-buff");
  }
  if (state.stats.str >= 30 && (!state.buffs.berserk || state.buffs.berserk <= 0) && Math.random() < 0.08) {
    state.buffs.berserk = 10;
    addLog("⚔️ [BUFF] Kích hoạt Cuồng Nộ (Berserk Strike) +35% ST Vật Lý!", "log-buff");
  }
  if (state.stats.agi >= 30 && (!state.buffs.speed || state.buffs.speed <= 0) && Math.random() < 0.08) {
    state.buffs.speed = 10;
    addLog("⚡ [BUFF] Kích hoạt Thần Hành (Agility Rush) +20% Bạo Kích, +15% Né!", "log-buff");
  }
  if (state.stats.ene >= 30 && (!state.buffs.manaShield || state.buffs.manaShield <= 0) && Math.random() < 0.08) {
    state.buffs.manaShield = 12;
    addLog("🔮 [BUFF] Kích hoạt Khiên Năng Lượng (Mana Shield) hấp thụ 40% ST!", "log-buff");
  }

  // 1. OUTGOING ATTACK
  const critChance = stats.critRate + (state.buffs.speed > 0 ? 20 : 0);
  const isCrit = Math.random() * 100 < critChance;
  const critMult = isCrit ? 1.8 : 1.0;

  let rolledPhy = Math.floor(Math.random() * (stats.maxPhy - stats.minPhy + 1) + stats.minPhy);
  let rolledMag = Math.floor(Math.random() * (stats.maxMag - stats.minMag + 1) + stats.minMag);

  if (state.buffs.berserk > 0) rolledPhy = Math.floor(rolledPhy * 1.35);
  if (state.buffs.manaShield > 0) rolledMag = Math.floor(rolledMag * 1.30);
  if (state.enemyDebuffs.armorBreak > 0) {
    rolledPhy = Math.floor(rolledPhy * 1.35);
    rolledMag = Math.floor(rolledMag * 1.20);
  }

  const finalPhy = Math.floor(rolledPhy * critMult);
  const finalMag = Math.floor(rolledMag * critMult);

  // Trigger Chibi Attack FX & Floating Damage
  const totalHeroDmg = finalPhy + finalMag;
  animateHeroAction(state.charClass === "dw" ? "cast" : "attack");
  playSlashFx(isCrit ? "crit" : (state.charClass === "dw" ? "magic" : "slash"));
  animateMonsterReaction(false);
  spawnFloatingDamage(totalHeroDmg, state.charClass === "dw" ? "mag" : (isCrit ? "crit" : "phy"), isCrit);

  // Log Attack by Class
  if (state.charClass === "dw") {
    audio.playMagic();
    const spell = isCrit ? "BÃO TUYẾT HOÀNG KIM" : "EVIL SPIRIT";
    addLog(`🔮 [PHÁP THUẬT] ${spell} gây ${finalMag.toLocaleString()} ST Phép (+${finalPhy.toLocaleString()} ST Vật lý) lên ${mobName}!`, isCrit ? "log-crit" : "log-mag");
  } else if (state.charClass === "fe") {
    audio.playSlash();
    const shot = isCrit ? "TRIPLE SHOT BẠO KÍCH" : "BĂNG TIỄN";
    addLog(`🏹 [CUNG THỦ] ${shot} gây ${finalPhy.toLocaleString()} ST Vật lý (+${finalMag.toLocaleString()} ST Phép) lên ${mobName}!`, isCrit ? "log-crit" : "log-phy");
  } else {
    audio.playSlash();
    const slash = isCrit ? "TWISTING SLASH" : "CHÉM THƯỜNG";
    addLog(`⚔️ [VẬT LÝ] ${slash} gây ${finalPhy.toLocaleString()} ST Vật lý (+${finalMag.toLocaleString()} ST Phép) lên ${mobName}!`, isCrit ? "log-crit" : "log-phy");
  }

  // Proc Debuffs on Enemy
  if (state.stats.str >= 30 && Math.random() < 0.14 && (!state.enemyDebuffs.armorBreak || state.enemyDebuffs.armorBreak <= 0)) {
    state.enemyDebuffs.armorBreak = 8;
    addLog(`🗡️ [DEBUFF] ${mobName} bị Phá Giáp! Nhận thêm 35% sát thương!`, "log-debuff");
  }
  if (state.stats.ene >= 30 && Math.random() < 0.14 && (!state.enemyDebuffs.freeze || state.enemyDebuffs.freeze <= 0)) {
    state.enemyDebuffs.freeze = 6;
    addLog(`❄️ [DEBUFF] ${mobName} bị Đóng Băng! Giảm 50% sức đánh & tốc độ!`, "log-debuff");
  } else if (state.stats.ene >= 30 && Math.random() < 0.12 && (!state.enemyDebuffs.burn || state.enemyDebuffs.burn <= 0)) {
    state.enemyDebuffs.burn = 6;
    addLog(`🔥 [DEBUFF] ${mobName} bị Thiêu Đốt địa ngục!`, "log-debuff");
  }
  if (state.stats.agi >= 30 && Math.random() < 0.12 && (!state.enemyDebuffs.poison || state.enemyDebuffs.poison <= 0)) {
    state.enemyDebuffs.poison = 6;
    addLog(`☠️ [DEBUFF] ${mobName} trúng Độc Tố, suy yếu 30% sát thương!`, "log-debuff");
  }

  // Burn tick damage
  if (state.enemyDebuffs.burn > 0) {
    const burnDmg = Math.floor(stats.maxMag * 0.4);
    addLog(`🔥 [THIÊU ĐỐT] Lửa địa ngục thiêu đốt ${mobName} mất thêm -${burnDmg.toLocaleString()} HP!`, "log-debuff");
  }

  // 2. INCOMING ATTACK WITH REBALANCED DEFENSE MITIGATION
  const dodgeChance = stats.dodgeRate + (state.buffs.speed > 0 ? 15 : 0);
  const didDodge = Math.random() * 100 < dodgeChance;
  if (didDodge) {
    spawnHeroFloatingEffect("💨 MISS!", "float-miss");
    addLog(`💨 [NÉ TRÁNH] Bạn đã né hoàn toàn đòn phản kích của ${mobName}! (MISS)`, "log-crit");
  } else {
    let rawMobDmg = Math.floor(Math.random() * (currentMap.mobDmg[1] - currentMap.mobDmg[0]) + currentMap.mobDmg[0]) * mobMult;
    
    // Apply Enemy Debuff Reductions
    if (state.enemyDebuffs.freeze > 0) rawMobDmg = Math.floor(rawMobDmg * 0.5);
    if (state.enemyDebuffs.poison > 0) rawMobDmg = Math.floor(rawMobDmg * 0.7);

    // Defense percentage mitigation + flat armor reduction
    const defBaseline = currentMap.tier * 200 + 120;
    const defMitigation = Math.min(0.85, stats.totalDef / (stats.totalDef + defBaseline));
    let damageAfterDef = rawMobDmg * (1 - defMitigation);
    damageAfterDef = Math.max(1, damageAfterDef - Math.floor(stats.totalDef * 0.15));

    // Apply Damage Reduction % from VIT / Mana Shield
    const effectiveDmgReduction = stats.dmgReduction + (state.buffs.manaShield > 0 ? 25 : 0);
    let takenDmg = Math.max(1, Math.floor(damageAfterDef * (1 - effectiveDmgReduction / 100)));

    // Mana Shield Absorption
    if (state.buffs.manaShield > 0 && state.currentMp > 20) {
      const absorbed = Math.floor(takenDmg * 0.40);
      state.currentMp = Math.max(0, state.currentMp - absorbed);
      takenDmg -= absorbed;
    }

    takenDmg = Math.max(1, takenDmg);
    state.currentHp -= takenDmg;
    spawnHeroFloatingEffect(`-${takenDmg.toLocaleString()} HP`, "float-hit");
    addLog(`🛡 [BỊ ĐÁNH] ${mobName} phản kích, bạn nhận -${takenDmg.toLocaleString()} HP! (Giáp giảm ${Math.round(defMitigation * 100)}%)`, "log-damage-taken");

    // Auto-Potion Check
    checkAutoPotion(stats);

    if (state.currentHp <= 0) {
      addLog(`💀 [TỬ VONG] Bạn đã bị ${mobName} hạ gục! Đang hồi sinh tại Lorencia...`, "log-boss");
      state.currentHp = Math.floor(stats.maxHp * 0.6);
      state.currentMapId = 1;
      updateUI();
      return;
    }
  }

  // Track Boss Kills
  if (mobCategory === "boss") {
    state.bossKilled = (state.bossKilled || 0) + 1;
  }

  // 3. BOOSTED ZEN DROP
  const earnedZen = Math.floor((Math.random() * 350 + 250) * currentMap.tier * mobMult * (1 + state.rs * 0.25));
  state.zen += earnedZen;
  spawnFloatingLoot("🪙", `+${earnedZen.toLocaleString()} Zen`, "#ffec8b");
  addLog(`🪙 [NHẶT ZEN] +${earnedZen.toLocaleString()} Zen!`, "log-zen");

  // 4. Standard Balanced EXP Gain
  const earnedExp = Math.floor((Math.random() * 15 + 20) * currentMap.tier * mobMult);
  state.exp += earnedExp;

  // 5. Jewel & Potion Drops
  const rollJewel = Math.random() * 100;
  const jewelBoost = mobCategory === "boss" ? 10 : (mobCategory === "elite" ? 3 : 1);

  if (rollJewel < 3.0 * jewelBoost) {
    state.bless++;
    spawnFloatingLoot("💎", "Jewel of Bless!", "#bf55ec");
    addLog(`💎 *KENG!* Nhặt được 1x Jewel of Bless từ ${mobName}!`, "log-bless");
    audio.playKeng();
    audio.vibrate(60);
  } else if (rollJewel < (3.0 + 1.2) * jewelBoost) {
    state.chaos++;
    spawnFloatingLoot("🔥", "Jewel of Chaos!", "#e74c3c");
    addLog(`🔥 *KENG!* Nhặt được 1x Jewel of Chaos từ ${mobName}!`, "log-chaos");
    audio.playKeng();
  } else if (rollJewel < (3.0 + 1.2 + 0.8) * jewelBoost) {
    state.life++;
    spawnFloatingLoot("🌿", "Jewel of Life!", "#2ecc71");
    addLog(`🌿 *KENG!* Nhặt được 1x Jewel of Life từ ${mobName}!`, "log-life");
    audio.playKeng();
  }

  // Potion drop chance (15%)
  if (Math.random() < 0.15) {
    if (Math.random() < 0.5) {
      state.potions.hp++;
      addLog(`🧪 Nhặt được 1x Bình Máu từ ${mobName}!`, "log-buff");
    } else {
      state.potions.mp++;
      addLog(`🧪 Nhặt được 1x Bình Mana từ ${mobName}!`, "log-buff");
    }
  }

  // 6. REDUCED GEAR DROP (Boss: 15%, Elite: 3%, Normal: 0.5%)
  const gearDropChance = mobCategory === "boss" ? 0.15 : (mobCategory === "elite" ? 0.03 : 0.005);
  if (Math.random() < gearDropChance) {
    const forceR = mobCategory === "boss" ? Math.min(6, 3 + Math.floor(Math.random() * 4)) : (mobCategory === "elite" ? Math.min(3, 2 + Math.floor(Math.random() * 2)) : null);
    const droppedItem = generateItem(currentMap.tier, forceR);
    spawnFloatingLoot("🎁", `[${droppedItem.name}]`, RARITIES[droppedItem.rarity].color);
    handleDroppedItem(droppedItem);
  }

  // 7. Level Up Check
  if (state.exp >= state.nextExp) {
    while (state.exp >= state.nextExp) {
      state.exp -= state.nextExp;
      state.level++;
      state.nextExp = getRequiredExpForLevel(state.level);
      state.freePoints += 5;
      if (state.level % 5 === 0) {
        state.skillPoints = (state.skillPoints || 0) + 1;
      }
    }
    addLog(`★ LEVEL UP! Đạt Cấp ${state.level}! Nhận +5 Điểm Tiềm Năng! ★`, "log-crit");
    
    if (state.autoStats) {
      autoDistributeClass();
    }
  }

  updateUI();
  saveGameState();
}

function addLog(msg, cssClass = "log-norm") {
  const box = document.getElementById("logBox");
  if (box) {
    const time = new Date().toTimeString().split(" ")[0];
    const div = document.createElement("div");
    div.className = `log-entry ${cssClass}`;
    div.innerHTML = `<span class="log-time">[${time}]</span> ${msg}`;
    box.appendChild(div);
    if (box.children.length > 50) box.removeChild(box.firstChild);
    box.scrollTop = box.scrollHeight;
  }
  const ticker = document.getElementById("arenaTickerText");
  if (ticker) {
    ticker.innerHTML = msg;
  }
}

// UI RENDERING
function updateUI() {
  const stats = calculateStats();
  
  // 1. Level, Name, RS
  const heroLvEl = document.getElementById("heroLv");
  if (heroLvEl) heroLvEl.innerText = `Lv.${state.level}`;

  const heroNameEl = document.getElementById("heroName");
  if (heroNameEl) {
    const classTag = state.charClass === "fe" ? "FE Nữ" : (state.charClass === "dw" ? "DW Phép" : "DK Nam");
    heroNameEl.innerText = `${state.username} [${classTag}]`;
  }

  const heroRsEl = document.getElementById("heroRs");
  if (heroRsEl) heroRsEl.innerText = `(RS: ${state.rs}${state.srs > 0 ? " | S-RS: " + state.srs : ""})`;

  // 2. Total CP
  const valTotalCP = document.getElementById("valTotalCP");
  if (valTotalCP) valTotalCP.innerText = `${stats.cp.toLocaleString()} CP`;

  // 3. Physical & Magic Damage Sub-bar
  const subbarPhyDmg = document.getElementById("subbarPhyDmg");
  if (subbarPhyDmg) subbarPhyDmg.innerText = `⚔ Vật Lý: ${stats.minPhy.toLocaleString()} ~ ${stats.maxPhy.toLocaleString()}`;
  const subbarMagDmg = document.getElementById("subbarMagDmg");
  if (subbarMagDmg) subbarMagDmg.innerText = `🔮 Pháp Thuật: ${stats.minMag.toLocaleString()} ~ ${stats.maxMag.toLocaleString()}`;

  // 4. Map Badge
  const curMap = MAPS.find(m => m.id === state.currentMapId) || MAPS[0];
  const mapBadge = document.getElementById("currentMapBadge");
  if (mapBadge) mapBadge.innerText = `Map ${curMap.id}: ${curMap.name}`;

  // 5. Currencies
  const valZen = document.getElementById("valZen");
  if (valZen) valZen.innerText = `🪙 Zen: ${state.zen.toLocaleString()}`;
  const valBless = document.getElementById("valBless");
  if (valBless) valBless.innerText = `💎 B: ${state.bless}`;
  const valChaos = document.getElementById("valChaos");
  if (valChaos) valChaos.innerText = `🔥 C: ${state.chaos}`;
  const valLife = document.getElementById("valLife");
  if (valLife) valLife.innerText = `🌿 L: ${state.life}`;

  // 6. HP & MP Bars
  state.currentHp = Math.max(0, Math.min(stats.maxHp, state.currentHp));
  state.currentMp = Math.max(0, Math.min(stats.maxMp, state.currentMp));
  const hpPercent = Math.max(0, Math.min(100, (state.currentHp / stats.maxHp) * 100));
  const mpPercent = Math.max(0, Math.min(100, (state.currentMp / stats.maxMp) * 100));

  const barHpFill = document.getElementById("barHpFill");
  if (barHpFill) barHpFill.style.width = `${hpPercent}%`;
  const txtHpBar = document.getElementById("txtHpBar");
  if (txtHpBar) txtHpBar.innerText = `❤️ HP: ${state.currentHp.toLocaleString()} / ${stats.maxHp.toLocaleString()} (${hpPercent.toFixed(0)}%)`;

  const barMpFill = document.getElementById("barMpFill");
  if (barMpFill) barMpFill.style.width = `${mpPercent}%`;
  const txtMpBar = document.getElementById("txtMpBar");
  if (txtMpBar) txtMpBar.innerText = `💙 MP: ${state.currentMp.toLocaleString()} / ${stats.maxMp.toLocaleString()} (${mpPercent.toFixed(0)}%)`;

  // 7. Potions Bar
  if (!state.potions) state.potions = { hp: 50, mp: 50 };
  const txtCountHpPotion = document.getElementById("txtCountHpPotion");
  if (txtCountHpPotion) txtCountHpPotion.innerText = state.potions.hp;
  const txtCountMpPotion = document.getElementById("txtCountMpPotion");
  if (txtCountMpPotion) txtCountMpPotion.innerText = state.potions.mp;
  const chkAutoHp = document.getElementById("chkAutoHpPotion");
  if (chkAutoHp) chkAutoHp.checked = !!(state.autoPotion && state.autoPotion.hpEnabled);

  // 8. EXP Bar
  const expPercent = Math.max(0, Math.min(100, (state.exp / state.nextExp) * 100));
  const barExpFill = document.getElementById("barExpFill");
  if (barExpFill) barExpFill.style.width = `${expPercent}%`;
  const txtExpBar = document.getElementById("txtExpBar");
  if (txtExpBar) txtExpBar.innerText = `EXP: ${state.exp.toLocaleString()} / ${state.nextExp.toLocaleString()} (${expPercent.toFixed(1)}%)`;

  // 9. Buff / Debuff Chips
  renderStatusEffects();

  // 10. Combat Stats Grid (Tab Stats)
  renderCombatStatsGrid(stats);

  // 11. Paperdoll Slots
  SLOT_TYPES.forEach(s => {
    const el = document.getElementById(`slot-${s.key}`);
    if (!el) return;
    const item = state.equipped[s.key];
    const isSelected = state.selectedSlotKey === s.key && state.selectedInventoryIndex === null;
    const svgIcon = SVG_ICONS[s.key] || "";

    if (item && RARITIES[item.rarity]) {
      const r = RARITIES[item.rarity];
      el.className = `slot-card ${r.class} ${isSelected ? "selected" : ""}`;
      el.innerHTML = `
        <div class="slot-icon-box" style="color:${r.color}; border:1px solid ${r.color};">${svgIcon}</div>
        <div class="slot-info">
          <div class="slot-label">${s.name}</div>
          <div class="slot-name" style="color:${r.color};">${item.name}</div>
          <div class="slot-opt">${item.options.length > 0 ? "★ " + item.options[0] : (item.atk ? "Công: +" + item.atk : "Thủ: +" + item.def)}</div>
        </div>
        ${item.plus > 0 ? `<div class="slot-plus-tag">+${item.plus}</div>` : ""}
      `;
    } else {
      el.className = `slot-card ${isSelected ? "selected" : ""}`;
      el.innerHTML = `
        <div class="slot-icon-box" style="color:#576574;">${svgIcon}</div>
        <div class="slot-info">
          <div class="slot-label">${s.name}</div>
          <div class="slot-name" style="color:#576574;">Chưa Trang Bị</div>
        </div>
      `;
    }
  });

  // Set Bonus Badge
  const setBadge = document.getElementById("setBonusBadge");
  if (setBadge) {
    if (stats.activeSetTier) {
      setBadge.style.display = "block";
      setBadge.innerText = `★ KÍCH HOẠT SET 4 MÓN BẬC ${stats.activeSetTier}: +20% HP & THỦ ★`;
    } else {
      setBadge.style.display = "none";
    }
  }

  // Render Subviews
  renderDetailPanel();
  renderInventory();
  renderSkillsView();
  renderMaps();
  renderStatsView();
  renderRebirthView();
  renderForgeView();
  renderLeaderboard();
}

function renderStatusEffects() {
  const container = document.getElementById("statusEffectsBar");
  if (!container) return;

  const chips = [];
  if (state.buffs) {
    if (state.buffs.fortitude > 0) chips.push(`<span class="status-chip buff-fortitude">🛡️ Gồng Máu (${Math.ceil(state.buffs.fortitude)}s)</span>`);
    if (state.buffs.berserk > 0) chips.push(`<span class="status-chip buff-berserk">⚔️ Cuồng Nộ (${Math.ceil(state.buffs.berserk)}s)</span>`);
    if (state.buffs.speed > 0) chips.push(`<span class="status-chip buff-speed">⚡ Tăng Tốc (${Math.ceil(state.buffs.speed)}s)</span>`);
    if (state.buffs.manaShield > 0) chips.push(`<span class="status-chip buff-shield">🔮 Khiên MP (${Math.ceil(state.buffs.manaShield)}s)</span>`);
  }
  if (state.enemyDebuffs) {
    if (state.enemyDebuffs.freeze > 0) chips.push(`<span class="status-chip debuff-freeze">❄️ Quái Đóng Băng (${Math.ceil(state.enemyDebuffs.freeze)}s)</span>`);
    if (state.enemyDebuffs.burn > 0) chips.push(`<span class="status-chip debuff-burn">🔥 Quái Thiêu Đốt (${Math.ceil(state.enemyDebuffs.burn)}s)</span>`);
    if (state.enemyDebuffs.armorBreak > 0) chips.push(`<span class="status-chip debuff-armor">🗡️ Quái Phá Giáp (${Math.ceil(state.enemyDebuffs.armorBreak)}s)</span>`);
    if (state.enemyDebuffs.poison > 0) chips.push(`<span class="status-chip debuff-poison">☠️ Quái Trúng Độc (${Math.ceil(state.enemyDebuffs.poison)}s)</span>`);
  }

  if (chips.length === 0) {
    container.innerHTML = `<span style="font-size:9px; color:#576574;">Hiệu ứng: Bình Thường</span>`;
  } else {
    container.innerHTML = chips.join("");
  }
}

function renderCombatStatsGrid(stats) {
  const statPhyDmgVal = document.getElementById("statPhyDmgVal");
  if (statPhyDmgVal) statPhyDmgVal.innerText = `${stats.minPhy.toLocaleString()} ~ ${stats.maxPhy.toLocaleString()}`;

  const statMagDmgVal = document.getElementById("statMagDmgVal");
  if (statMagDmgVal) statMagDmgVal.innerText = `${stats.minMag.toLocaleString()} ~ ${stats.maxMag.toLocaleString()}`;

  const statDefVal = document.getElementById("statDefVal");
  if (statDefVal) statDefVal.innerText = `${stats.totalDef.toLocaleString()}`;

  const statDodgeVal = document.getElementById("statDodgeVal");
  if (statDodgeVal) statDodgeVal.innerText = `${stats.dodgeRate}%`;

  const statCritVal = document.getElementById("statCritVal");
  if (statCritVal) statCritVal.innerText = `${stats.critRate}%`;

  const statRegenVal = document.getElementById("statRegenVal");
  if (statRegenVal) statRegenVal.innerText = `+${stats.hpRegen.toLocaleString()} HP`;
}

// INVENTORY RENDERING
function renderInventory() {
  const invGrid = document.getElementById("inventoryGrid");
  const capText = document.getElementById("invCapacityText");
  if (!invGrid) return;

  if (!state.inventory) state.inventory = [];
  if (capText) capText.innerText = `${state.inventory.length} / 30`;

  let html = "";
  for (let i = 0; i < 30; i++) {
    const item = state.inventory[i];
    const isSelected = state.selectedInventoryIndex === i;

    if (item && RARITIES[item.rarity]) {
      const r = RARITIES[item.rarity];
      const itemArt = getItemIllustration(item, item.slotKey);
      html += `
        <div class="inv-cell ${r.class} ${isSelected ? "selected" : ""}" onclick="selectInventoryItem(${i})" style="border-color:${r.color}; box-shadow:0 0 6px ${r.color}44;">
          <div style="width:28px; height:28px; display:flex; justify-content:center; align-items:center;">${itemArt}</div>
          <div style="color:${r.color}; font-size:7.5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%; font-weight:bold;">${item.name}</div>
          ${item.plus > 0 ? `<div class="inv-cell-tag">+${item.plus}</div>` : ""}
        </div>
      `;
    } else {
      html += `
        <div class="inv-cell" style="opacity:0.3; border-style:dashed;" onclick="selectInventoryItem(${i})">
          <div style="color:#576574; font-size:9px;">${i + 1}</div>
        </div>
      `;
    }
  }
  invGrid.innerHTML = html;
}

function selectInventoryItem(index) {
  if (!state.inventory || !state.inventory[index]) {
    state.selectedInventoryIndex = null;
    updateUI();
    return;
  }
  state.selectedInventoryIndex = index;
  updateUI();
}

// SKILLS RENDERING
function renderSkillsView() {
  const container = document.getElementById("skillsListContainer");
  const ptsEl = document.getElementById("txtSkillPoints");
  if (!container) return;

  if (!state.skills || state.skills.length === 0) state.skills = getClassSkills(state.charClass);
  if (ptsEl) ptsEl.innerText = state.skillPoints || 0;

  let html = "";
  state.skills.forEach(sk => {
    const isMax = sk.level >= sk.maxLevel;
    const canUpgrade = !isMax && (state.skillPoints || 0) >= sk.costPts && state.zen >= sk.costZen;
    html += `
      <div class="skill-card">
        <div style="display:flex; align-items:center; gap:8px;">
          <div class="skill-icon-box">${sk.icon}</div>
          <div>
            <div style="font-size:11px; font-weight:bold; color:var(--gold);">${sk.name} <span style="font-size:9.5px; color:#74b9ff;">[Cấp ${sk.level}/${sk.maxLevel}]</span></div>
            <div style="font-size:9px; color:#8fa0b8; margin-top:2px;">${sk.desc}</div>
            <div style="font-size:9px; color:#00ffcc; margin-top:1px;">Hệ số: <b>x${(sk.baseMult + sk.level * 0.15).toFixed(2)}</b> sát thương</div>
          </div>
        </div>
        <div style="text-align:right;">
          <button class="btn btn-sm ${isMax ? "" : (canUpgrade ? "btn-success" : "btn-primary")}" 
            ${!canUpgrade || isMax ? "disabled" : ""} 
            onclick="upgradeSkill('${sk.id}')">
            ${isMax ? "Tối Đa" : `Nâng (${sk.costPts}đ / ${sk.costZen.toLocaleString()}z)`}
          </button>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function upgradeSkill(skillId) {
  const sk = (state.skills || []).find(s => s.id === skillId);
  if (!sk || sk.level >= sk.maxLevel) return;

  if ((state.skillPoints || 0) < sk.costPts || state.zen < sk.costZen) {
    addLog("Chưa đủ Điểm Kỹ Năng hoặc Zen để nâng cấp chiêu thức!", "log-damage-taken");
    return;
  }

  state.skillPoints -= sk.costPts;
  state.zen -= sk.costZen;
  sk.level++;

  audio.playMagic();
  audio.vibrate(100);
  addLog(`★ NÂNG CẤP THÀNH CÔNG! Kỹ năng [${sk.name}] đã đạt Cấp ${sk.level}! Tăng thêm lực chiến vĩnh viễn! ★`, "log-crit");

  updateUI();
  saveGameState();
}

// LEADERBOARD RENDERING
function switchRankCategory(cat) {
  currentRankCategory = cat;
  const btnCP = document.getElementById("btnRankCP");
  const btnRS = document.getElementById("btnRankRS");
  const btnBoss = document.getElementById("btnRankBoss");

  if (btnCP) btnCP.classList.toggle("active", cat === "cp");
  if (btnRS) btnRS.classList.toggle("active", cat === "rs");
  if (btnBoss) btnBoss.classList.toggle("active", cat === "boss");

  renderLeaderboard();
}

function renderLeaderboard() {
  const listContainer = document.getElementById("leaderboardListContainer");
  const myRankText = document.getElementById("myRankText");
  const myRankScoreLabel = document.getElementById("myRankScoreLabel");
  const myRankScoreVal = document.getElementById("myRankScoreVal");
  if (!listContainer) return;

  const myStats = calculateStats();
  const playerEntry = {
    name: state.username,
    charClass: state.charClass || "dk",
    cp: myStats.cp,
    rs: state.rs,
    lv: state.level,
    bossKills: state.bossKilled || 0,
    isPlayer: true
  };

  const list = LEGEND_RANKS.map(l => ({
    name: l.name,
    charClass: l.charClass,
    cp: Math.max(500, Math.floor(l.cpMult * 8500)),
    rs: l.rs,
    lv: l.lv,
    bossKills: l.bossKills,
    isPlayer: false
  }));

  list.push(playerEntry);

  if (currentRankCategory === "cp") {
    list.sort((a, b) => b.cp - a.cp);
    if (myRankScoreLabel) myRankScoreLabel.innerText = "Lực Chiến CP:";
    if (myRankScoreVal) myRankScoreVal.innerText = `${playerEntry.cp.toLocaleString()} CP`;
  } else if (currentRankCategory === "rs") {
    list.sort((a, b) => (b.rs * 1000 + b.lv) - (a.rs * 1000 + a.lv));
    if (myRankScoreLabel) myRankScoreLabel.innerText = "Chuyển Sinh & Cấp:";
    if (myRankScoreVal) myRankScoreVal.innerText = `RS ${playerEntry.rs} - Lv.${playerEntry.lv}`;
  } else {
    list.sort((a, b) => b.bossKills - a.bossKills);
    if (myRankScoreLabel) myRankScoreLabel.innerText = "Trùm Đã Diệt:";
    if (myRankScoreVal) myRankScoreVal.innerText = `${playerEntry.bossKills.toLocaleString()} Boss`;
  }

  const myIndex = list.findIndex(item => item.isPlayer);
  if (myRankText) myRankText.innerText = `Hạng #${myIndex + 1}`;

  let html = "";
  list.slice(0, 15).forEach((item, idx) => {
    const rankNum = idx + 1;
    let rankBadge = `${rankNum}`;
    let rankClass = "rank-num";
    if (rankNum === 1) { rankBadge = "🥇 1"; rankClass += " rank-1"; }
    else if (rankNum === 2) { rankBadge = "🥈 2"; rankClass += " rank-2"; }
    else if (rankNum === 3) { rankBadge = "🥉 3"; rankClass += " rank-3"; }

    let classTitle = item.charClass === "fe" ? "Fairy Elf" : (item.charClass === "dw" ? "Dark Wizard" : "Dark Knight");
    let scoreDisplay = "";
    if (currentRankCategory === "cp") {
      scoreDisplay = `<b style="color:var(--gold);">${item.cp.toLocaleString()}</b> CP`;
    } else if (currentRankCategory === "rs") {
      scoreDisplay = `<b style="color:#00ffcc;">RS ${item.rs}</b> (Lv.${item.lv})`;
    } else {
      scoreDisplay = `<b style="color:#ff7675;">${item.bossKills.toLocaleString()}</b> Boss`;
    }

    html += `
      <div class="rank-row ${item.isPlayer ? "is-me" : ""}">
        <div style="display:flex; align-items:center; gap:6px;">
          <div class="${rankClass}">${rankBadge}</div>
          <div>
            <div style="font-weight:bold; color:${item.isPlayer ? "var(--gold)" : "#fff"}">${item.name} ${item.isPlayer ? "(Bạn)" : ""}</div>
            <div style="font-size:8.5px; color:#8fa0b8;">${classTitle}</div>
          </div>
        </div>
        <div style="text-align:right; font-size:9.5px;">
          ${scoreDisplay}
        </div>
      </div>
    `;
  });

  listContainer.innerHTML = html;
}

// TABS SWITCHING (8 TABS)
function switchTab(tabId) {
  const tabs = ["gear", "inventory", "skill", "map", "stats", "leaderboard", "rebirth", "forge"];
  tabs.forEach(t => {
    const content = document.getElementById(`tab-${t}`);
    if (content) content.classList.toggle("active", t === tabId);
  });
  const btns = document.querySelectorAll(".tabs .tab-btn");
  btns.forEach((btn, idx) => {
    btn.classList.toggle("active", tabs[idx] === tabId);
  });
}

function selectSlot(slotKey) {
  state.selectedSlotKey = slotKey;
  state.selectedInventoryIndex = null;
  updateUI();
}

function renderDetailPanel() {
  const dTitle = document.getElementById("dTitle");
  const dStats = document.getElementById("dStats");
  const dOptions = document.getElementById("dOptions");
  const dActions = document.getElementById("dActions");
  const btnEquip = document.getElementById("btnEquipInventory");
  const btnSell = document.getElementById("btnSellInventory");

  let item = null;
  let isFromInventory = false;

  if (state.selectedInventoryIndex !== null && state.inventory && state.inventory[state.selectedInventoryIndex]) {
    item = state.inventory[state.selectedInventoryIndex];
    isFromInventory = true;
  } else {
    item = state.equipped[state.selectedSlotKey];
  }

  const showcase = document.getElementById("dItemShowcase");
  if (!item) {
    if (dTitle) dTitle.innerText = "Chưa chọn trang bị";
    if (dStats) dStats.innerText = "Chạm vào ô trang bị hoặc túi đồ để xem chi tiết.";
    if (dOptions) dOptions.innerHTML = "";
    if (dActions) dActions.style.display = "none";
    if (showcase) showcase.style.display = "none";
    return;
  }
  if (showcase && RARITIES[item.rarity]) {
    showcase.style.display = "flex";
    showcase.style.borderColor = RARITIES[item.rarity].color;
    showcase.innerHTML = getItemIllustration(item, item.slotKey);
  }

  const r = RARITIES[item.rarity];
  const originTag = isFromInventory ? "[Túi Đồ] " : "[Đang Mặc] ";
  if (dTitle) dTitle.innerHTML = `<span style="color:${r.color}; font-weight:bold;">${originTag}${item.name} +${item.plus}</span> (CP: ${getItemCP(item).toLocaleString()})`;
  if (dStats) dStats.innerText = `Bậc ${item.tier} • Phẩm: ${r.name} | Sát thương: +${item.atk} | Phòng thủ: +${item.def} | Máu: +${item.hp}`;
  
  if (dOptions) {
    if (item.options.length > 0) {
      dOptions.innerHTML = item.options.map(o => `<div style="color:#00ffcc;">★ ${o}</div>`).join("");
    } else {
      dOptions.innerHTML = `<div style="color:#8fa0b8;">Chưa có dòng Hoàn Hảo (Dùng Jewel of Life ở Lò Rèn để tẩy).</div>`;
    }
  }

  if (dActions) dActions.style.display = "flex";
  if (btnEquip) btnEquip.style.display = isFromInventory ? "inline-block" : "none";
  if (btnSell) btnSell.style.display = isFromInventory ? "inline-block" : "none";
}

function renderMaps() {
  const container = document.getElementById("mapListContainer");
  if (!container) return;
  let html = "";
  MAPS.forEach(m => {
    const isActive = m.id === state.currentMapId;
    const canEnter = state.level >= m.reqLv && state.rs >= m.reqRs;
    html += `
      <div class="map-card ${isActive ? "active-map" : ""}">
        <div>
          <div class="map-title">${m.name} [Tier ${m.tier}]</div>
          <div class="map-req">Yêu cầu: Lv.${m.reqLv}, RS ${m.reqRs} | Trùm: <b style="color:#ff7675">${m.boss}</b></div>
        </div>
        <button class="btn btn-sm ${isActive ? "btn-success" : (canEnter ? "btn-primary" : "btn-danger")}" 
          ${!canEnter ? "disabled" : ""} 
          onclick="selectMap(${m.id})">
          ${isActive ? "Đang Treo" : (canEnter ? "Đến Ngay" : "Chưa Đạt")}
        </button>
      </div>
    `;
  });
  container.innerHTML = html;
}

function selectMap(mapId) {
  state.currentMapId = mapId;
  const m = MAPS.find(x => x.id === mapId);
  if (m) {
    addLog(`🚩 Di chuyển đến vùng đất [${m.name}]! Quái vật cấp ${m.tier} xuất hiện!`, "log-boss");
  }
  updateUI();
  saveGameState();
}

function renderStatsView() {
  const freePointsEl = document.getElementById("statFreePoints");
  if (freePointsEl) freePointsEl.innerText = state.freePoints.toLocaleString();

  const strEl = document.getElementById("txtSTR");
  if (strEl) strEl.innerText = state.stats.str.toLocaleString();
  const agiEl = document.getElementById("txtAGI");
  if (agiEl) agiEl.innerText = state.stats.agi.toLocaleString();
  const vitEl = document.getElementById("txtVIT");
  if (vitEl) vitEl.innerText = state.stats.vit.toLocaleString();
  const eneEl = document.getElementById("txtENE");
  if (eneEl) eneEl.innerText = state.stats.ene.toLocaleString();

  const chk = document.getElementById("chkAutoStats");
  if (chk) chk.checked = !!state.autoStats;
}

function addStat(key, amount) {
  if (state.freePoints < amount) amount = state.freePoints;
  if (amount <= 0) return;
  state.stats[key] = (state.stats[key] || 0) + amount;
  state.freePoints -= amount;
  updateUI();
  saveGameState();
}

function autoDistributeClass() {
  if (state.freePoints <= 0) return;
  const pts = state.freePoints;

  if (state.charClass === "dw") {
    const pEne = Math.floor(pts * 0.6);
    const pAgi = Math.floor(pts * 0.2);
    const pVit = pts - pEne - pAgi;
    state.stats.ene += pEne;
    state.stats.agi += pAgi;
    state.stats.vit += pVit;
  } else if (state.charClass === "fe") {
    const pAgi = Math.floor(pts * 0.55);
    const pStr = Math.floor(pts * 0.25);
    const pVit = pts - pAgi - pStr;
    state.stats.agi += pAgi;
    state.stats.str += pStr;
    state.stats.vit += pVit;
  } else {
    const pStr = Math.floor(pts * 0.5);
    const pVit = Math.floor(pts * 0.35);
    const pAgi = pts - pStr - pVit;
    state.stats.str += pStr;
    state.stats.vit += pVit;
    state.stats.agi += pAgi;
  }

  state.freePoints = 0;
  addLog(`★ Tự động phân phối tiềm năng theo chuẩn Hệ Phái [${state.charClass.toUpperCase()}] thành công!`, "log-crit");
  updateUI();
  saveGameState();
}

function autoDistributeEven() {
  if (state.freePoints <= 0) return;
  const share = Math.floor(state.freePoints / 4);
  state.stats.str += share;
  state.stats.agi += share;
  state.stats.vit += share;
  state.stats.ene += share;
  state.freePoints -= share * 4;
  updateUI();
  saveGameState();
}

function toggleAutoStats() {
  const chk = document.getElementById("chkAutoStats");
  if (chk) state.autoStats = chk.checked;
  saveGameState();
}

function toggleGender() {
  state.gender = state.gender === "male" ? "female" : "male";
  addLog(`Đã chuyển đổi hình dạng nhân vật thành [${state.gender === "male" ? "Nam" : "Nữ"}]!`, "log-crit");
  updateUI();
  saveGameState();
}

// REBIRTH SYSTEM
function renderRebirthView() {
  const chkLevel = document.getElementById("chkLevel");
  const chkZen = document.getElementById("chkZen");
  const chkJowels = document.getElementById("chkJowels");
  const btn = document.getElementById("btnDoRebirth");
  const rsInfo = document.getElementById("rsInfoText");

  const reqLv = Math.min(400, 300 + state.rs * 20);
  const reqZen = (state.rs + 1) * 2000000;
  const reqBless = Math.min(10, state.rs + 1);
  const reqChaos = Math.min(5, Math.floor(state.rs / 2));

  const okLv = state.level >= reqLv;
  const okZen = state.zen >= reqZen;
  const okJewels = state.bless >= reqBless && state.chaos >= reqChaos;

  if (chkLevel) chkLevel.innerHTML = `Đạt Cấp Độ ${reqLv}: <b class="${okLv ? "check-pass" : "check-fail"}">${state.level} / ${reqLv} ${okLv ? "✓" : "✗"}</b>`;
  if (chkZen) chkZen.innerHTML = `Chi Phí ${reqZen.toLocaleString()} Zen: <b class="${okZen ? "check-pass" : "check-fail"}">${state.zen.toLocaleString()} / ${reqZen.toLocaleString()} ${okZen ? "✓" : "✗"}</b>`;
  if (chkJowels) chkJowels.innerHTML = `Tế Lễ (${reqBless} Bless, ${reqChaos} Chaos): <b class="${okJewels ? "check-pass" : "check-fail"}">B: ${state.bless}/${reqBless} | C: ${state.chaos}/${reqChaos} ${okJewels ? "✓" : "✗"}</b>`;

  if (rsInfo) {
    rsInfo.innerHTML = `
      • Sau chuyển sinh: Cấp độ trở về <b>Lv.1</b>.<br>
      • Nhận vĩnh viễn: <b style="color:var(--gold)">+${(state.rs + 1) * 500} Điểm Tiềm Năng</b> & <b>+5 Điểm Kỹ Năng</b>!<br>
      • Giữ nguyên toàn bộ trang bị, túi đồ và ngọc hiện có.<br>
      • Mở khóa bản đồ cấp cao hơn!
    `;
  }

  if (btn) btn.disabled = !(okLv && okZen && okJewels);
}

function performRebirth() {
  const reqLv = Math.min(400, 300 + state.rs * 20);
  const reqZen = (state.rs + 1) * 2000000;
  const reqBless = Math.min(10, state.rs + 1);
  const reqChaos = Math.min(5, Math.floor(state.rs / 2));

  if (state.level < reqLv || state.zen < reqZen || state.bless < reqBless || state.chaos < reqChaos) {
    addLog("Chưa đủ điều kiện chuyển sinh!", "log-boss");
    return;
  }

  state.zen -= reqZen;
  state.bless -= reqBless;
  state.chaos -= reqChaos;
  state.rs++;
  state.level = 1;
  state.exp = 0;
  state.nextExp = getRequiredExpForLevel(1);
  state.freePoints += state.rs * 500;
  state.skillPoints = (state.skillPoints || 0) + 5;

  audio.playKeng();
  audio.vibrate(200);
  addLog(`★ CHÚC MỪNG! CHUYỂN SINH LẦN THỨ ${state.rs} THÀNH CÔNG! NHẬN THÊM TIỀM NĂNG & ĐIỂM SKILL! ★`, "log-crit");
  
  updateUI();
  saveGameState();
}

// FORGE GOBLIN WITH ACCURATE CP CHANGE LOGGING
function renderForgeView() {
  let item = null;
  if (state.selectedInventoryIndex !== null && state.inventory && state.inventory[state.selectedInventoryIndex]) {
    item = state.inventory[state.selectedInventoryIndex];
  } else {
    item = state.equipped[state.selectedSlotKey];
  }

  const txt = document.getElementById("forgeTargetText");
  const btnEnhance = document.getElementById("btnForgeEnhance");
  const btnReforge = document.getElementById("btnForgeReforge");

  if (!item) {
    if (txt) txt.innerText = "Hãy chạm vào một món trang bị trong 11 ô hoặc Túi Đồ để thao tác.";
    if (btnEnhance) btnEnhance.disabled = true;
    if (btnReforge) btnReforge.disabled = true;
    return;
  }

  const nextPlus = item.plus + 1;
  const needBless = nextPlus <= 6 ? 1 : (nextPlus <= 9 ? 2 : 3);
  const needChaos = nextPlus >= 10 ? 1 : 0;

  if (txt) {
    txt.innerHTML = `
      Mục tiêu: <b style="color:var(--gold)">${item.name} +${item.plus}</b><br>
      • Cường hóa lên +${nextPlus}: Tốn <b>${needBless} Bless</b> ${needChaos > 0 ? "+ <b>1 Chaos</b>" : ""}<br>
      • Tẩy luyện dòng Hoàn Hảo: Tốn <b>1 Jewel of Life</b> (Hiện có: ${state.life})
    `;
  }
  if (btnEnhance) btnEnhance.disabled = item.plus >= 15 || state.bless < needBless || (needChaos > 0 && state.chaos < needChaos);
  if (btnReforge) btnReforge.disabled = state.life < 1;
}

function forgeEnhance() {
  let targetItem = null;
  if (state.selectedInventoryIndex !== null && state.inventory && state.inventory[state.selectedInventoryIndex]) {
    targetItem = state.inventory[state.selectedInventoryIndex];
  } else {
    targetItem = state.equipped[state.selectedSlotKey];
  }

  if (!targetItem || targetItem.plus >= 15) return;

  const nextPlus = targetItem.plus + 1;
  const needBless = nextPlus <= 6 ? 1 : (nextPlus <= 9 ? 2 : 3);
  const needChaos = nextPlus >= 10 ? 1 : 0;

  if (state.bless < needBless || (needChaos > 0 && state.chaos < needChaos)) {
    addLog("Không đủ ngọc để cường hóa!", "log-damage-taken");
    return;
  }

  state.bless -= needBless;
  if (needChaos > 0) state.chaos -= needChaos;

  const successRate = nextPlus <= 6 ? 1.0 : (nextPlus <= 9 ? 0.70 : 0.45);
  audio.playAnvil();

  const oldItemCP = getItemCP(targetItem);
  const oldStats = calculateStats();

  if (Math.random() <= successRate) {
    targetItem.plus++;
    const newItemCP = getItemCP(targetItem);
    const newStats = calculateStats();
    const cpDiff = newStats.cp - oldStats.cp;

    addLog(`★ CƯỜNG HÓA THÀNH CÔNG! [${targetItem.name}] đã lên cấp +${targetItem.plus}! (Lực chiến tăng: +${cpDiff > 0 ? cpDiff.toLocaleString() : (newItemCP - oldItemCP).toLocaleString()} CP) ★`, "log-crit");
    audio.playKeng();
    audio.vibrate(100);
  } else {
    const oldPlus = targetItem.plus;
    if (nextPlus > 9) {
      targetItem.plus = 0;
    } else if (nextPlus > 6) {
      targetItem.plus = Math.max(0, targetItem.plus - 1);
    }

    const newItemCP = getItemCP(targetItem);
    const newStats = calculateStats();
    const cpLoss = oldStats.cp - newStats.cp;

    if (targetItem.plus < oldPlus) {
      addLog(`💀 [THẤT BẠI] Yêu tinh Goblin làm hỏng trang bị! [${targetItem.name}] tụt từ +${oldPlus} xuống +${targetItem.plus} (Lực chiến giảm: -${cpLoss > 0 ? cpLoss.toLocaleString() : (oldItemCP - newItemCP).toLocaleString()} CP)!`, "log-damage-taken");
    } else {
      addLog(`[THẤT BẠI] Cường hóa thất bại! May mắn trang bị giữ nguyên cấp +${targetItem.plus} (Lực chiến không đổi)!`, "log-damage-taken");
    }
  }

  updateUI();
  saveGameState();
}

function forgeReforge() {
  let targetItem = null;
  if (state.selectedInventoryIndex !== null && state.inventory && state.inventory[state.selectedInventoryIndex]) {
    targetItem = state.inventory[state.selectedInventoryIndex];
  } else {
    targetItem = state.equipped[state.selectedSlotKey];
  }

  if (!targetItem || state.life < 1) return;

  state.life--;
  const shuffled = [...OPTION_POOL].sort(() => 0.5 - Math.random());
  const newCount = Math.max(1, Math.min(5, Math.floor(Math.random() * 3) + 2));
  targetItem.options = shuffled.slice(0, newCount);

  audio.playKeng();
  addLog(`★ TẨY LUYỆN THÀNH CÔNG! [${targetItem.name}] đã nhận ${newCount} dòng Hoàn Hảo mới! ★`, "log-crit");

  updateUI();
  saveGameState();
}

function quickForgeEnhance() {
  switchTab("forge");
  forgeEnhance();
}
function quickForgeReforge() {
  switchTab("forge");
  forgeReforge();
}

// OFFLINE HARVEST
function checkOfflineProgress() {
  const savedUser = getCurrentUser();
  const accounts = getAccounts();
  if (savedUser && accounts[savedUser] && accounts[savedUser].state) {
    const s = accounts[savedUser].state;
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - (s.lastSaveTime || now)) / 1000);
    const maxOfflineSeconds = 24 * 3600;
    const actualSeconds = Math.min(elapsedSeconds, maxOfflineSeconds);

    if (actualSeconds > 60) {
      const currentTier = state.currentMapId || 1;
      const mobsKilledOffline = Math.floor(actualSeconds / 0.5);
      const gainedZen = mobsKilledOffline * 200 * currentTier;
      const gainedExp = mobsKilledOffline * 25 * currentTier;
      const gainedBless = Math.floor(mobsKilledOffline * 0.002);
      const gainedChaos = Math.floor(mobsKilledOffline * 0.0008);
      const gainedLife = Math.floor(mobsKilledOffline * 0.0005);

      state.zen += gainedZen;
      state.exp += gainedExp;
      state.bless += gainedBless;
      state.chaos += gainedChaos;
      state.life += gainedLife;

      const hours = (actualSeconds / 3600).toFixed(1);
      const repEl = document.getElementById("offlineReportText");
      if (repEl) {
        repEl.innerHTML = `
          Thời gian offline: <b>${hours} giờ</b> (${mobsKilledOffline.toLocaleString()} quái dọn dẹp)<br><br>
          • Vàng nhặt được: <b style="color:var(--zen)">+${gainedZen.toLocaleString()} Zen</b><br>
          • Kinh nghiệm: <b style="color:#00ffcc">+${gainedExp.toLocaleString()} EXP</b><br>
          • Ngọc Ước Nguyện: <b style="color:var(--bless)">+${gainedBless} Jewel of Bless</b><br>
          • Ngọc Hỗn Nguyên: <b style="color:var(--chaos)">+${gainedChaos} Jewel of Chaos</b><br>
          • Ngọc Sinh Mệnh: <b style="color:var(--life)">+${gainedLife} Jewel of Life</b>
        `;
      }
      const modal = document.getElementById("offlineModal");
      if (modal) modal.style.display = "flex";
      audio.playKeng();
    }
  }
}

function closeOfflineModal() {
  const modal = document.getElementById("offlineModal");
  if (modal) modal.style.display = "none";
}

function saveGameState() {
  state.lastSaveTime = Date.now();
  const curUser = getCurrentUser();
  if (curUser) {
    const accounts = getAccounts();
    if (accounts[curUser]) {
      accounts[curUser].state = state;
      saveAccounts(accounts);
    }
  }
  try {
    localStorage.setItem("mu_text_rpg_save", JSON.stringify(state));
  } catch(e) {}
}

// WINDOW ONLOAD
window.onload = () => {
  const curUser = getCurrentUser();
  const accounts = getAccounts();

  if (curUser && accounts[curUser]) {
    state = Object.assign(getDefaultState(curUser, accounts[curUser].charClass), accounts[curUser].state);
    if (!state.skills || state.skills.length === 0) state.skills = getClassSkills(state.charClass);
    if (!state.inventory) state.inventory = [];
    if (!state.potions) state.potions = { hp: 50, mp: 50 };
    if (!state.autoPotion) state.autoPotion = { hpEnabled: true, hpThreshold: 40 };

    initGameSession();
  } else {
    const gate = document.getElementById("loginGate");
    if (gate) gate.style.display = "flex";
    switchGateTab("login");
  }
};
