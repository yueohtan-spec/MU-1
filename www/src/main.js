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
  constructor() {
    this.ctx = null;
    try {
      this.muted = localStorage.getItem("mu_sound_muted") === "true";
    } catch(e) {
      this.muted = false;
    }
  }
  toggleMute() {
    this.muted = !this.muted;
    try {
      localStorage.setItem("mu_sound_muted", this.muted ? "true" : "false");
    } catch(e) {}
    this.updateIcon();
    return this.muted;
  }
  updateIcon() {
    const btn = document.getElementById("btnSoundToggle");
    if (btn) {
      btn.innerText = this.muted ? "🔇" : "🔊";
      btn.title = this.muted ? "Âm thanh: Đang Tắt (Bấm để Bật)" : "Âm thanh: Đang Bật (Bấm để Tắt)";
    }
  }
  init() {
    if (this.muted) return;
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
    if (this.muted) return;
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
    if (this.muted) return;
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
    if (this.muted) return;
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
    if (this.muted) return;
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
    if (this.muted) return;
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
    if (this.muted) return;
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
    if (this.muted) return;
    try {
      if (navigator.vibrate) navigator.vibrate(ms);
    } catch(e) {}
  }
}

const audio = new SoundController();

function toggleSound() {
  audio.toggleMute();
}

// --- 2D CHIBI GRAPHICS & BATTLE ARENA ENGINE ---
const CHIBI_HEROES = {
  dk: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180" class="chibi-svg hero-dk-svg">
  <defs>
    <!-- Metallic Red Armor Shaders (Volumetric Dragon Plate) -->
    <linearGradient id="dkCrimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff6b6b"/>
      <stop offset="25%" stop-color="#ee5253"/>
      <stop offset="60%" stop-color="#b71540"/>
      <stop offset="85%" stop-color="#670d23"/>
      <stop offset="100%" stop-color="#2c050e"/>
    </linearGradient>
    <linearGradient id="dkHighlightPlate" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff9f9f"/>
      <stop offset="35%" stop-color="#ff4757"/>
      <stop offset="80%" stop-color="#962d22"/>
      <stop offset="100%" stop-color="#4d130c"/>
    </linearGradient>
    <!-- 24K Polished Gold Trim with Specular Bevels -->
    <linearGradient id="dkGoldBevel" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#fff275"/>
      <stop offset="50%" stop-color="#f1c40f"/>
      <stop offset="75%" stop-color="#d35400"/>
      <stop offset="100%" stop-color="#784212"/>
    </linearGradient>
    <!-- Dark Obsidian Steel Under-armor (Chainmail & Joints) -->
    <linearGradient id="dkUnderSteel" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1e272e"/>
      <stop offset="40%" stop-color="#485460"/>
      <stop offset="70%" stop-color="#2f3640"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <!-- Dragon Flame Blade Energy -->
    <linearGradient id="dkBladeCore" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#feca57"/>
      <stop offset="55%" stop-color="#ff4757"/>
      <stop offset="85%" stop-color="#b71540"/>
      <stop offset="100%" stop-color="#57091d"/>
    </linearGradient>
    <!-- Wings of Dragon Membranes -->
    <radialGradient id="dkWingMembrane" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ff9f43"/>
      <stop offset="35%" stop-color="#ee5253"/>
      <stop offset="70%" stop-color="#881337"/>
      <stop offset="100%" stop-color="#230308"/>
    </radialGradient>
    <!-- Bloom Glow Filter for Energy Runes & Weapon -->
    <filter id="bloomFire" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feColorMatrix in="blur" type="matrix" values="
        1 0 0 0 0
        0 0.5 0 0 0
        0 0 0.2 0 0
        0 0 0 1.6 0" result="fireTint"/>
      <feComposite in="SourceGraphic" in2="fireTint" operator="over"/>
    </filter>
  </defs>

  <!-- 1. WINGS OF DRAGON (Cánh Rồng Đỏ Cấp 3 - Sải cánh 150px) -->
  <g class="hero-wings-layer wing-flap-anim">
    <!-- Left Wing Struts & 3 Layered Primary Blades -->
    <g class="dk-left-wing">
      <!-- Main Upper Bone Strut -->
      <path d="M 60 70 C 40 25, 14 20, 4 42 C -2 60, 16 66, 32 70" fill="none" stroke="url(#dkGoldBevel)" stroke-width="3" stroke-linecap="round"/>
      <polygon points="4,42 -4,34 8,44" fill="url(#dkGoldBevel)"/>
      <polygon points="20,28 14,20 24,30" fill="url(#dkGoldBevel)"/>
      <!-- Primary Wing Blade 1 (Upper Outer) -->
      <path d="M 60 72 C 38 28, 12 24, 6 44 C 4 60, 20 64, 38 68 Z" fill="url(#dkWingMembrane)" stroke="url(#dkCrimsonGrad)" stroke-width="1.5"/>
      <!-- Primary Wing Blade 2 (Middle) -->
      <path d="M 56 76 C 30 50, 4 60, 2 82 C 2 98, 22 92, 38 84 Z" fill="url(#dkWingMembrane)" stroke="url(#dkCrimsonGrad)" stroke-width="1.5"/>
      <!-- Primary Wing Blade 3 (Lower Inner) -->
      <path d="M 52 82 C 32 75, 12 90, 18 112 C 24 116, 40 106, 48 90 Z" fill="url(#dkWingMembrane)" stroke="url(#dkCrimsonGrad)" stroke-width="1.5"/>
      <!-- Energy Veins in Wings -->
      <path d="M 32 50 Q 14 62 8 80" fill="none" stroke="#feca57" stroke-width="1.2" opacity="0.85"/>
      <path d="M 40 65 Q 22 80 18 100" fill="none" stroke="#feca57" stroke-width="1.2" opacity="0.85"/>
    </g>

    <!-- Right Wing Struts & 3 Layered Primary Blades -->
    <g class="dk-right-wing">
      <path d="M 100 70 C 120 25, 146 20, 156 42 C 162 60, 144 66, 128 70" fill="none" stroke="url(#dkGoldBevel)" stroke-width="3" stroke-linecap="round"/>
      <polygon points="156,42 164,34 152,44" fill="url(#dkGoldBevel)"/>
      <polygon points="140,28 146,20 136,30" fill="url(#dkGoldBevel)"/>
      <path d="M 100 72 C 122 28, 148 24, 154 44 C 156 60, 140 64, 122 68 Z" fill="url(#dkWingMembrane)" stroke="url(#dkCrimsonGrad)" stroke-width="1.5"/>
      <path d="M 104 76 C 130 50, 156 60, 158 82 C 158 98, 138 92, 122 84 Z" fill="url(#dkWingMembrane)" stroke="url(#dkCrimsonGrad)" stroke-width="1.5"/>
      <path d="M 108 82 C 128 75, 148 90, 142 112 C 136 116, 120 106, 112 90 Z" fill="url(#dkWingMembrane)" stroke="url(#dkCrimsonGrad)" stroke-width="1.5"/>
      <path d="M 128 50 Q 146 62 152 80" fill="none" stroke="#feca57" stroke-width="1.2" opacity="0.85"/>
      <path d="M 120 65 Q 138 80 142 100" fill="none" stroke="#feca57" stroke-width="1.2" opacity="0.85"/>
    </g>
  </g>

  <!-- 2. BILLOWING HELLFIRE CAPE (Áo Choàng Hỏa Long Phấp Phới) -->
  <path d="M 60 76 C 52 110, 44 140, 42 160 L 118 160 C 116 140, 108 110, 100 76 Z" fill="#4d080b" stroke="#250305" stroke-width="1.2"/>
  <path d="M 50 115 Q 44 160 42 160 L 60 160 Q 64 125 58 115 Z" fill="#2d0507"/>
  <path d="M 110 115 Q 116 160 118 160 L 100 160 Q 96 125 102 115 Z" fill="#2d0507"/>

  <!-- 3. VOLUMETRIC ARMORED LEGS (Đôi Chân Giáp Chiến Binh Cường Tráng, Thế Tấn Vững Chãi) -->
  <!-- Left Leg (Thigh, Poleyn Spikes, Sculpted Greave, Sabaton) -->
  <g class="dk-leg-left">
    <!-- Thigh Cuisses -->
    <path d="M 60 108 L 48 132 L 64 135 L 72 112 Z" fill="url(#dkCrimsonGrad)" stroke="url(#dkGoldBevel)" stroke-width="1.5"/>
    <!-- Overlapping Knee Poleyn with Dragon Horn Spike -->
    <path d="M 44 130 L 52 126 L 64 128 L 60 140 L 46 138 Z" fill="url(#dkGoldBevel)" stroke="#784212" stroke-width="1"/>
    <polygon points="44,130 36,124 46,134" fill="url(#dkGoldBevel)"/>
    <circle cx="53" cy="132" r="2.2" fill="#ff4757"/>
    <!-- Articulated Greave (Ống đồng cơ bắp có sống gân kim loại sắc nhọn) -->
    <path d="M 48 138 C 40 148, 40 162, 46 172 L 62 172 C 68 162, 66 148, 60 138 Z" fill="url(#dkHighlightPlate)" stroke="url(#dkGoldBevel)" stroke-width="1.5"/>
    <!-- Greave Central Ridge Line -->
    <line x1="54" y1="138" x2="54" y2="170" stroke="url(#dkGoldBevel)" stroke-width="1.8"/>
    <!-- Sabaton (Giày sắt móng vuốt rồng cắm đất 2.5D) -->
    <path d="M 40 170 C 34 175, 32 178, 46 180 L 64 180 C 66 175, 64 170, 62 170 Z" fill="#1e272e" stroke="url(#dkGoldBevel)" stroke-width="1.5"/>
    <polygon points="34,178 30,180 38,180" fill="url(#dkGoldBevel)"/>
  </g>

  <!-- Right Leg (Thigh, Poleyn Spikes, Sculpted Greave, Sabaton) -->
  <g class="dk-leg-right">
    <path d="M 100 108 L 112 132 L 96 135 L 88 112 Z" fill="url(#dkCrimsonGrad)" stroke="url(#dkGoldBevel)" stroke-width="1.5"/>
    <path d="M 116 130 L 108 126 L 96 128 L 100 140 L 114 138 Z" fill="url(#dkGoldBevel)" stroke="#784212" stroke-width="1"/>
    <polygon points="116,130 124,124 114,134" fill="url(#dkGoldBevel)"/>
    <circle cx="107" cy="132" r="2.2" fill="#ff4757"/>
    <path d="M 112 138 C 120 148, 120 162, 114 172 L 98 172 C 92 162, 94 148, 100 138 Z" fill="url(#dkHighlightPlate)" stroke="url(#dkGoldBevel)" stroke-width="1.5"/>
    <line x1="106" y1="138" x2="106" y2="170" stroke="url(#dkGoldBevel)" stroke-width="1.8"/>
    <path d="M 120 170 C 126 175, 128 178, 114 180 L 96 180 C 94 175, 96 170, 98 170 Z" fill="#1e272e" stroke="url(#dkGoldBevel)" stroke-width="1.5"/>
    <polygon points="126,178 130,180 122,180" fill="url(#dkGoldBevel)"/>
  </g>

  <!-- 4. ARMORED FAULDS & BELT (Giáp hộ hông & Khóa đai rồng vàng) -->
  <path d="M 58 98 L 102 98 L 98 116 L 80 122 L 62 116 Z" fill="url(#dkCrimsonGrad)" stroke="url(#dkGoldBevel)" stroke-width="1.8"/>
  <!-- Golden Belt Band -->
  <rect x="58" y="96" width="44" height="6" rx="2" fill="url(#dkGoldBevel)" stroke="#784212" stroke-width="0.8"/>
  <!-- Dragon Belt Buckle with Glowing Gem -->
  <polygon points="80,94 88,102 80,110 72,102" fill="url(#dkGoldBevel)" stroke="#784212" stroke-width="1.2"/>
  <circle cx="80" cy="102" r="3" fill="#ff4757" filter="url(#bloomFire)"/>

  <!-- 5. VOLUMETRIC TORSO & DRAGON BREASTPLATE (Giáp Ngực Khối Cơ Bắp Vạm Vỡ) -->
  <!-- Under-armor chainmail base -->
  <path d="M 54 62 L 106 62 L 100 100 L 60 100 Z" fill="url(#dkUnderSteel)" stroke="#0c1014" stroke-width="1"/>
  <!-- Sculpted Pectoral Plates (Ngực áo giáp đỏ rực rỡ uốn khối nổi 3D) -->
  <path d="M 58 64 L 78 66 L 77 86 L 60 84 Z" fill="url(#dkHighlightPlate)" stroke="url(#dkGoldBevel)" stroke-width="1.2"/>
  <path d="M 102 64 L 82 66 L 83 86 L 100 84 Z" fill="url(#dkHighlightPlate)" stroke="url(#dkGoldBevel)" stroke-width="1.2"/>
  <!-- Sternum Armor Inlay -->
  <polygon points="80,64 83,86 80,92 77,86" fill="url(#dkGoldBevel)"/>
  <!-- 4-Tier Abdominal Articulated Plates -->
  <path d="M 64 88 L 96 88 L 94 92 L 66 92 Z" fill="url(#dkCrimsonGrad)" stroke="url(#dkGoldBevel)" stroke-width="0.8"/>
  <path d="M 65 93 L 95 93 L 93 97 L 67 97 Z" fill="url(#dkCrimsonGrad)" stroke="url(#dkGoldBevel)" stroke-width="0.8"/>
  <!-- Dragon Core Heart Stone -->
  <polygon points="80,72 86,79 80,86 74,79" fill="#ff4757" filter="url(#bloomFire)"/>
  <circle cx="80" cy="79" r="2.2" fill="#ffffff"/>

  <!-- 6. MULTI-TIER DRAGON PAULDRONS (Giáp Hộ Vai Nhiều Tầng Gai Rồng Bề Thế) -->
  <!-- Left Shoulder (3 Tiered Spiked Plates) -->
  <g class="dk-shoulder-left">
    <path d="M 58 60 C 38 52, 28 66, 36 78 C 48 82, 56 74, 58 60 Z" fill="url(#dkCrimsonGrad)" stroke="url(#dkGoldBevel)" stroke-width="1.8"/>
    <path d="M 42 50 C 26 40, 18 52, 28 64 Z" fill="url(#dkGoldBevel)" stroke="#784212" stroke-width="1.2"/>
    <polygon points="26,46 14,36 28,52" fill="url(#dkGoldBevel)"/>
    <polygon points="38,40 30,30 42,46" fill="url(#dkHighlightPlate)"/>
  </g>
  <!-- Right Shoulder (3 Tiered Spiked Plates) -->
  <g class="dk-shoulder-right">
    <path d="M 102 60 C 122 52, 132 66, 124 78 C 112 82, 104 74, 102 60 Z" fill="url(#dkCrimsonGrad)" stroke="url(#dkGoldBevel)" stroke-width="1.8"/>
    <path d="M 118 50 C 134 40, 142 52, 132 64 Z" fill="url(#dkGoldBevel)" stroke="#784212" stroke-width="1.2"/>
    <polygon points="134,46 146,36 132,52" fill="url(#dkGoldBevel)"/>
    <polygon points="122,40 130,30 118,46" fill="url(#dkHighlightPlate)"/>
  </g>

  <!-- 7. GORGET, NECK & DRAGON KNIGHT HELMET (Mũ Giáp Rồng Chiến Binh Oai Phong) -->
  <!-- Gorget (Giáp cổ sắt) -->
  <path d="M 70 52 L 90 52 L 86 64 L 74 64 Z" fill="#1e272e" stroke="url(#dkGoldBevel)" stroke-width="1"/>
  <!-- Helmet Dome Shell -->
  <path d="M 62 30 C 62 8, 98 8, 98 30 C 98 52, 90 58, 80 58 C 70 58, 62 52, 62 30 Z" fill="url(#dkCrimsonGrad)" stroke="url(#dkGoldBevel)" stroke-width="2"/>
  <!-- Massive Sweeping Dragon Horns (Cặp sừng rồng cong vút viền vàng) -->
  <path d="M 64 24 C 44 4, 32 14, 50 28 Z" fill="url(#dkGoldBevel)" stroke="#784212" stroke-width="1.5"/>
  <path d="M 96 24 C 116 4, 128 14, 110 28 Z" fill="url(#dkGoldBevel)" stroke="#784212" stroke-width="1.5"/>
  <!-- Forehead Dragon Crown & Crest Spikes -->
  <polygon points="80,6 72,20 88,20" fill="url(#dkGoldBevel)"/>
  <polygon points="80,12 75,24 85,24" fill="#ff4757"/>
  <!-- Visor Slit & Piercing Crimson Eyes (Kính ngắm hầm hố, mắt rực lửa ma thuật) -->
  <path d="M 66 34 L 94 34 L 90 43 L 70 43 Z" fill="#080b0e" stroke="url(#dkGoldBevel)" stroke-width="1.2"/>
  <ellipse cx="73" cy="38" rx="4.5" ry="2.2" fill="#ff4757" filter="url(#bloomFire)"/>
  <circle cx="73" cy="38" r="1.5" fill="#ffffff"/>
  <ellipse cx="87" cy="38" rx="4.5" ry="2.2" fill="#ff4757" filter="url(#bloomFire)"/>
  <circle cx="87" cy="38" r="1.5" fill="#ffffff"/>
  <!-- Chin & Cheek Plating -->
  <polygon points="70,43 90,43 80,55" fill="url(#dkHighlightPlate)" stroke="url(#dkGoldBevel)" stroke-width="1"/>

  <!-- 8. WEAPON & DYNAMIC ARMS: DRAGON SLAYER GREATSWORD (Hỏa Long Đao Khổng Lồ Rực Lửa) -->
  <g class="hero-weapon-layer weapon-swing">
    <!-- Armored Right Arm & Spiked Gauntlet -->
    <path d="M 108 72 L 126 84 L 118 96 L 102 84 Z" fill="url(#dkCrimsonGrad)" stroke="url(#dkGoldBevel)" stroke-width="1.5"/>
    <circle cx="122" cy="88" r="6" fill="url(#dkGoldBevel)"/>
    <polygon points="126,84 134,80 126,92" fill="url(#dkGoldBevel)"/>
    <!-- Two-handed Sword Grip & Pommel -->
    <line x1="122" y1="86" x2="128" y2="114" stroke="#d35400" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="129" cy="116" r="4.2" fill="url(#dkGoldBevel)"/>
    <!-- Winged Dragon Crossguard -->
    <path d="M 108 84 C 116 74, 134 74, 142 84 L 125 89 Z" fill="url(#dkGoldBevel)" stroke="#784212" stroke-width="1.5"/>
    <circle cx="125" cy="83" r="3" fill="#ff4757" filter="url(#bloomFire)"/>
    <!-- Massive Dragon Slayer Blade (Lưỡi kiếm bản lớn bén nhọn vươn cao rực lửa) -->
    <path d="M 122 80 L 130 80 L 146 16 L 140 2 L 118 16 Z" fill="url(#dkBladeCore)" stroke="url(#dkGoldBevel)" stroke-width="1.8" filter="url(#bloomFire)"/>
    <!-- Serrated Back Spikes on Sword -->
    <polygon points="144,28 152,32 143,40" fill="url(#dkGoldBevel)"/>
    <polygon points="141,46 149,50 140,58" fill="url(#dkGoldBevel)"/>
    <polygon points="138,64 145,68 137,74" fill="url(#dkGoldBevel)"/>
    <!-- Central Fire Energy Channel Line -->
    <line x1="131" y1="10" x2="126" y2="76" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="131" y1="18" x2="128" y2="70" stroke="#feca57" stroke-width="4" opacity="0.75"/>
  </g>
</svg>`,
  fe: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180" class="chibi-svg hero-fe-svg">
  <defs>
    <linearGradient id="feEmeraldLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7efff5"/>
      <stop offset="30%" stop-color="#2ecc71"/>
      <stop offset="80%" stop-color="#10ac84"/>
      <stop offset="100%" stop-color="#0b5345"/>
    </linearGradient>
    <linearGradient id="feEmeraldDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1abc9c"/>
      <stop offset="60%" stop-color="#16a085"/>
      <stop offset="100%" stop-color="#0e6251"/>
    </linearGradient>
    <linearGradient id="feGoldBevel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#fff9d2"/>
      <stop offset="60%" stop-color="#f1c40f"/>
      <stop offset="85%" stop-color="#d35400"/>
      <stop offset="100%" stop-color="#784212"/>
    </linearGradient>
    <linearGradient id="feSilkyHair" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffde8"/>
      <stop offset="35%" stop-color="#feca57"/>
      <stop offset="75%" stop-color="#f39c12"/>
      <stop offset="100%" stop-color="#b7791f"/>
    </linearGradient>
    <linearGradient id="feWingCrystal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#7efff5"/>
      <stop offset="65%" stop-color="#18dcff"/>
      <stop offset="90%" stop-color="#7d5fff"/>
      <stop offset="100%" stop-color="#2c2c54"/>
    </linearGradient>
    <filter id="bloomSpirit" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- 1. WINGS OF SPIRIT (Cánh Tinh Linh Pha Lê 4 Cánh Lấp Lánh) -->
  <g class="hero-wings-layer wing-fairy-anim">
    <!-- Top Left Wing -->
    <path d="M 62 65 C 36 20, 8 22, 4 52 C 2 76, 26 82, 48 76 Z" fill="url(#feWingCrystal)" opacity="0.9" stroke="#7efff5" stroke-width="1.5"/>
    <circle cx="20" cy="44" r="3" fill="#ffffff" filter="url(#bloomSpirit)"/>
    <circle cx="34" cy="58" r="2" fill="#ffffff"/>
    <path d="M 44 48 Q 22 55 12 70" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.8"/>
    <!-- Bottom Left Wing -->
    <path d="M 58 76 C 28 84, 12 104, 26 122 C 38 126, 52 106, 58 88 Z" fill="url(#feWingCrystal)" opacity="0.8" stroke="#18dcff" stroke-width="1.2"/>
    <!-- Top Right Wing -->
    <path d="M 98 65 C 124 20, 152 22, 156 52 C 158 76, 134 82, 112 76 Z" fill="url(#feWingCrystal)" opacity="0.9" stroke="#7efff5" stroke-width="1.5"/>
    <circle cx="140" cy="44" r="3" fill="#ffffff" filter="url(#bloomSpirit)"/>
    <circle cx="126" cy="58" r="2" fill="#ffffff"/>
    <path d="M 116 48 Q 138 55 148 70" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.8"/>
    <!-- Bottom Right Wing -->
    <path d="M 102 76 C 132 84, 148 104, 134 122 C 122 126, 108 106, 102 88 Z" fill="url(#feWingCrystal)" opacity="0.8" stroke="#18dcff" stroke-width="1.2"/>
  </g>

  <!-- 2. SILKY BLONDE HAIR BACK (Mái Tóc Vàng Bay Bổng) -->
  <g class="fe-hair-back">
    <path d="M 54 48 C 32 64, 26 98, 36 128 C 46 108, 50 82, 56 60 Z" fill="url(#feSilkyHair)"/>
    <path d="M 106 48 C 128 64, 134 98, 124 128 C 114 108, 110 82, 104 60 Z" fill="url(#feSilkyHair)"/>
  </g>

  <!-- 3. VOLUMETRIC SCULPTED LEGS (Đôi Chân Cung Thủ Thon Dài, Giáp Bắp Chân Xanh Ngọc) -->
  <!-- Left Leg -->
  <g class="fe-leg-left">
    <path d="M 64 110 L 54 135 L 66 138 L 74 112 Z" fill="#ffeaa7"/>
    <!-- Knee Guard with Gold Leaf Motif -->
    <polygon points="52,132 60,127 70,129 64,142 50,139" fill="url(#feGoldBevel)" stroke="#784212" stroke-width="0.8"/>
    <circle cx="58" cy="134" r="2" fill="#1abc9c"/>
    <!-- Sculpted Emerald Greave -->
    <path d="M 54 139 C 48 148, 48 162, 54 172 L 66 172 C 70 162, 68 148, 64 139 Z" fill="url(#feEmeraldLight)" stroke="url(#feGoldBevel)" stroke-width="1.5"/>
    <line x1="60" y1="139" x2="60" y2="170" stroke="url(#feGoldBevel)" stroke-width="1.5"/>
    <!-- Sabaton Boot -->
    <path d="M 46 170 C 40 175, 40 178, 54 180 L 68 180 C 68 175, 66 170, 64 170 Z" fill="url(#feEmeraldDark)" stroke="url(#feGoldBevel)" stroke-width="1.2"/>
  </g>
  <!-- Right Leg -->
  <g class="fe-leg-right">
    <path d="M 96 110 L 106 135 L 94 138 L 86 112 Z" fill="#ffeaa7"/>
    <polygon points="108,132 100,127 90,129 96,142 110,139" fill="url(#feGoldBevel)" stroke="#784212" stroke-width="0.8"/>
    <circle cx="102" cy="134" r="2" fill="#1abc9c"/>
    <path d="M 106 139 C 112 148, 112 162, 106 172 L 94 172 C 90 162, 92 148, 96 139 Z" fill="url(#feEmeraldLight)" stroke="url(#feGoldBevel)" stroke-width="1.5"/>
    <line x1="100" y1="139" x2="100" y2="170" stroke="url(#feGoldBevel)" stroke-width="1.5"/>
    <path d="M 114 170 C 120 175, 120 178, 106 180 L 92 180 C 92 175, 94 170, 96 170 Z" fill="url(#feEmeraldDark)" stroke="url(#feGoldBevel)" stroke-width="1.2"/>
  </g>

  <!-- 4. EMERALD SKIRT & BELT (Váy Giáp Nữ Thần Cung Thủ) -->
  <path d="M 62 100 L 98 100 L 102 118 L 80 124 L 58 118 Z" fill="url(#feEmeraldDark)" stroke="url(#feGoldBevel)" stroke-width="1.5"/>
  <rect x="62" y="98" width="36" height="5" rx="2" fill="url(#feGoldBevel)" stroke="#784212" stroke-width="0.8"/>
  <circle cx="80" cy="100" r="3" fill="#7efff5" filter="url(#bloomSpirit)"/>

  <!-- 5. VOLUMETRIC CORSET ARMOR (Giáp Ngực Giai Nhân Tinh Linh) -->
  <path d="M 60 68 L 100 68 L 96 102 L 64 102 Z" fill="url(#feEmeraldLight)" stroke="url(#feGoldBevel)" stroke-width="1.5"/>
  <!-- Pectoral Contour Curves -->
  <path d="M 66 70 L 80 72 L 78 88 L 66 86 Z" fill="url(#feEmeraldDark)"/>
  <path d="M 94 70 L 80 72 L 82 88 L 94 86 Z" fill="url(#feEmeraldDark)"/>
  <circle cx="80" cy="80" r="3.2" fill="#7efff5" filter="url(#bloomSpirit)"/>

  <!-- 6. SHOULDERS -->
  <ellipse cx="56" cy="68" rx="8" ry="6" fill="url(#feGoldBevel)"/>
  <ellipse cx="104" cy="68" rx="8" ry="6" fill="url(#feGoldBevel)"/>

  <!-- 7. ELF HEAD, EARS & TIARA CROWN -->
  <rect x="74" y="52" width="12" height="14" fill="#ffeaa7"/>
  <polygon points="54,42 34,35 52,49" fill="#ffeaa7" stroke="#fab1a0" stroke-width="0.8"/>
  <polygon points="106,42 126,35 108,49" fill="#ffeaa7" stroke="#fab1a0" stroke-width="0.8"/>
  <ellipse cx="80" cy="40" rx="18" ry="19" fill="#ffeaa7"/>
  <!-- Silky Front Hair & Bangs -->
  <path d="M 60 36 C 70 16, 90 16, 100 36 C 94 24, 78 22, 60 36 Z" fill="url(#feSilkyHair)"/>
  <!-- Tiara with Cyan Gem -->
  <path d="M 58 32 Q 80 25 102 32" fill="none" stroke="url(#feGoldBevel)" stroke-width="2.2"/>
  <circle cx="80" cy="27" r="3.5" fill="#18dcff" filter="url(#bloomSpirit)"/>
  <!-- Anime Elf Eyes -->
  <ellipse cx="71" cy="40" rx="4" ry="5.5" fill="#0984e3"/>
  <circle cx="69.5" cy="38" r="1.8" fill="#ffffff"/>
  <ellipse cx="89" cy="40" rx="4" ry="5.5" fill="#0984e3"/>
  <circle cx="87.5" cy="38" r="1.8" fill="#ffffff"/>
  <ellipse cx="64" cy="47" rx="3" ry="1.5" fill="#ff7675" opacity="0.65"/>
  <ellipse cx="96" cy="47" rx="3" ry="1.5" fill="#ff7675" opacity="0.65"/>
  <path d="M 76 48 Q 80 51 84 48" fill="none" stroke="#e17055" stroke-width="1.2" stroke-linecap="round"/>

  <!-- 8. WEAPON: CELESTIAL CHAOS BOW (Đại Cung Nữ Thần Khổng Lồ Sải Dài) -->
  <g class="hero-weapon-layer weapon-swing">
    <path d="M 106 72 L 128 68 L 132 78 L 110 82 Z" fill="url(#feEmeraldLight)" stroke="url(#feGoldBevel)" stroke-width="1.2"/>
    <!-- Massive Curved Bow Limbs with Golden Angel Feathers -->
    <path d="M 104 10 C 146 44, 152 114, 110 160" fill="none" stroke="url(#feGoldBevel)" stroke-width="4" stroke-linecap="round"/>
    <path d="M 110 16 C 144 46, 148 110, 114 154" fill="none" stroke="#7efff5" stroke-width="2.2" filter="url(#bloomSpirit)"/>
    <!-- Bow Wing Feathers on Tips -->
    <polygon points="104,10 94,4 102,16" fill="url(#feGoldBevel)"/>
    <polygon points="110,160 100,166 108,154" fill="url(#feGoldBevel)"/>
    <!-- String of Light -->
    <line x1="104" y1="12" x2="110" y2="158" stroke="#ffffff" stroke-width="1.5" opacity="0.95"/>
    <!-- Glowing Arrow of Light -->
    <line x1="82" y1="84" x2="148" y2="84" stroke="#fff9d2" stroke-width="3.5" filter="url(#bloomSpirit)"/>
    <polygon points="148,79 160,84 148,89" fill="#7efff5"/>
    <polygon points="88,80 80,84 88,88" fill="url(#feGoldBevel)"/>
  </g>
</svg>`,
  dw: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180" class="chibi-svg hero-dw-svg">
  <defs>
    <linearGradient id="dwRobesDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#341f97"/>
      <stop offset="40%" stop-color="#1b1464"/>
      <stop offset="85%" stop-color="#0b082c"/>
      <stop offset="100%" stop-color="#040311"/>
    </linearGradient>
    <linearGradient id="dwRobesViolet" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9980FA"/>
      <stop offset="45%" stop-color="#5758BB"/>
      <stop offset="85%" stop-color="#2c2c54"/>
      <stop offset="100%" stop-color="#131326"/>
    </linearGradient>
    <linearGradient id="dwGoldBevel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#fff275"/>
      <stop offset="60%" stop-color="#ffd32a"/>
      <stop offset="85%" stop-color="#f39c12"/>
      <stop offset="100%" stop-color="#784212"/>
    </linearGradient>
    <linearGradient id="dwSoulFlames" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7efff5"/>
      <stop offset="35%" stop-color="#00d2d3"/>
      <stop offset="70%" stop-color="#5f27cd"/>
      <stop offset="100%" stop-color="#1b1464"/>
    </linearGradient>
    <filter id="bloomCyan" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- 1. WINGS OF SOUL (Cánh Linh Hồn Ma Pháp Lửa Xanh Tím Sải Rộng) -->
  <g class="hero-wings-layer wing-soul-anim">
    <!-- Left Spectral Wing -->
    <path d="M 60 70 C 32 22, 4 28, 6 64 C 10 92, 36 86, 54 80 C 24 90, 18 118, 40 122 C 52 124, 60 104, 62 92 Z" fill="url(#dwSoulFlames)" opacity="0.9" stroke="#00d2d3" stroke-width="1.5"/>
    <path d="M 18 60 C 8 72, 6 95, 22 102" fill="none" stroke="#54a0ff" stroke-width="2"/>
    <!-- Right Spectral Wing -->
    <path d="M 100 70 C 128 22, 156 28, 154 64 C 150 92, 124 86, 106 80 C 136 90, 142 118, 120 122 C 108 124, 100 104, 98 92 Z" fill="url(#dwSoulFlames)" opacity="0.9" stroke="#00d2d3" stroke-width="1.5"/>
    <path d="M 142 60 C 152 72, 154 95, 138 102" fill="none" stroke="#54a0ff" stroke-width="2"/>
  </g>

  <!-- 2. GRAND SOUL FLOWING ROBES (Áo Choàng Ma Pháp Tối Thượng Dài Chấm Đất) -->
  <path d="M 50 74 C 34 112, 30 148, 32 170 L 128 170 C 130 148, 126 112, 110 74 Z" fill="url(#dwRobesDark)" stroke="url(#dwGoldBevel)" stroke-width="1.8"/>
  <!-- Stole with Ancient Magic Glyphs -->
  <path d="M 64 74 L 74 138 L 80 142 L 86 138 L 96 74 Z" fill="url(#dwRobesViolet)" stroke="url(#dwGoldBevel)" stroke-width="1.2"/>
  <circle cx="80" cy="88" r="4" fill="#00d2d3" filter="url(#bloomCyan)"/>
  <circle cx="80" cy="110" r="3.5" fill="#00d2d3" filter="url(#bloomCyan)"/>
  <circle cx="80" cy="128" r="3" fill="#00d2d3" filter="url(#bloomCyan)"/>

  <!-- 3. Armored Wizard Boots -->
  <path d="M 58 164 L 50 174 L 66 174 L 70 164 Z" fill="#080b0e" stroke="url(#dwGoldBevel)" stroke-width="1.2"/>
  <path d="M 102 164 L 110 174 L 94 174 L 90 164 Z" fill="#080b0e" stroke="url(#dwGoldBevel)" stroke-width="1.2"/>

  <!-- 4. TORSO PLATING & MANTLE -->
  <path d="M 54 62 L 106 62 L 100 94 L 60 94 Z" fill="url(#dwRobesViolet)" stroke="url(#dwGoldBevel)" stroke-width="1.5"/>
  <polygon points="54,60 36,48 52,74" fill="url(#dwGoldBevel)"/>
  <polygon points="106,60 124,48 108,74" fill="url(#dwGoldBevel)"/>

  <!-- 5. ARCHMAGE HOOD (Mũ Trùm Bóng Tối, Mắt Sấm Sét Lôi Điện Xanh Rực Sáng) -->
  <circle cx="80" cy="42" r="19" fill="#1b1464"/>
  <!-- Pointed Grand Soul Cowl -->
  <polygon points="80,4 52,34 108,34" fill="url(#dwRobesDark)" stroke="url(#dwGoldBevel)" stroke-width="2"/>
  <ellipse cx="80" cy="34" rx="28" ry="7.5" fill="url(#dwRobesViolet)" stroke="url(#dwGoldBevel)" stroke-width="1.8"/>
  <circle cx="80" cy="27" r="4" fill="#00d2d3" filter="url(#bloomCyan)"/>
  <!-- Shadow Face with Glowing Electric Cyan Eyes -->
  <ellipse cx="80" cy="42" rx="17" ry="12" fill="#05050d"/>
  <ellipse cx="71" cy="42" rx="5" ry="3.2" fill="#00d2d3" filter="url(#bloomCyan)"/>
  <circle cx="71" cy="42" r="1.8" fill="#ffffff"/>
  <ellipse cx="89" cy="42" rx="5" ry="3.2" fill="#00d2d3" filter="url(#bloomCyan)"/>
  <circle cx="89" cy="42" r="1.8" fill="#ffffff"/>

  <!-- 6. WEAPON: KUNDUN ARCHANGEL STAFF (Gậy Kundun Ngút Trời, Ngọc Ma Thuật Xoay Tròn) -->
  <g class="hero-weapon-layer weapon-swing">
    <line x1="124" y1="16" x2="124" y2="168" stroke="url(#dwGoldBevel)" stroke-width="4.5" stroke-linecap="round"/>
    <!-- Winged Archangel Crest on Staff Top -->
    <path d="M 110 18 C 110 4, 138 4, 138 18 C 132 30, 116 30, 110 18 Z" fill="none" stroke="url(#dwGoldBevel)" stroke-width="3"/>
    <polygon points="124,2 119,11 129,11" fill="url(#dwGoldBevel)"/>
    <!-- Spinning Arcane Core Orb with Magic Rings -->
    <g class="dw-arcane-orb">
      <circle cx="124" cy="16" r="9.5" fill="#00d2d3" filter="url(#bloomCyan)"/>
      <circle cx="124" cy="16" r="4.5" fill="#ffffff"/>
      <ellipse cx="124" cy="16" rx="15" ry="5.5" fill="none" stroke="#54a0ff" stroke-width="1.8" transform="rotate(-25 124 16)"/>
    </g>
  </g>
</svg>`
};

const CHIBI_MONSTERS = {
  spider: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180" class="chibi-svg mob-spider-svg">
  <defs>
    <radialGradient id="spiderSac" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#2ed573"/>
      <stop offset="40%" stop-color="#10ac84"/>
      <stop offset="75%" stop-color="#1b1464"/>
      <stop offset="100%" stop-color="#050310"/>
    </radialGradient>
    <linearGradient id="spiderChitin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#574b90"/>
      <stop offset="50%" stop-color="#303952"/>
      <stop offset="100%" stop-color="#11141c"/>
    </linearGradient>
    <filter id="bloomVenom" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- 8 Massive Articulated Chitinous Legs with Barbed Hooks -->
  <g class="spider-legs-group">
    <!-- Left Legs -->
    <path d="M 60 92 C 28 55, 12 78, 10 130 L 4 138" fill="none" stroke="#2c1a3a" stroke-width="5" stroke-linecap="round"/>
    <polygon points="10,130 4,138 14,135" fill="#2ed573"/>
    <path d="M 55 100 C 20 90, 4 115, 6 152 L 2 160" fill="none" stroke="#2c1a3a" stroke-width="5" stroke-linecap="round"/>
    <path d="M 58 110 C 26 118, 10 144, 14 168 L 10 176" fill="none" stroke="#2c1a3a" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M 62 118 C 36 135, 22 160, 30 178" fill="none" stroke="#2c1a3a" stroke-width="4" stroke-linecap="round"/>

    <!-- Right Legs -->
    <path d="M 100 92 C 132 55, 148 78, 150 130 L 156 138" fill="none" stroke="#2c1a3a" stroke-width="5" stroke-linecap="round"/>
    <polygon points="150,130 156,138 146,135" fill="#2ed573"/>
    <path d="M 105 100 C 140 90, 156 115, 154 152 L 158 160" fill="none" stroke="#2c1a3a" stroke-width="5" stroke-linecap="round"/>
    <path d="M 102 110 C 134 118, 150 144, 146 168 L 150 176" fill="none" stroke="#2c1a3a" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M 98 118 C 124 135, 138 160, 130 178" fill="none" stroke="#2c1a3a" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- Giant Venom Abdomen (Bụng Nhện Độc Phát Sáng Khổng Lồ) -->
  <ellipse cx="80" cy="116" rx="44" ry="40" fill="url(#spiderSac)" stroke="#2ed573" stroke-width="2.5"/>
  <!-- Demon Skull Rune on Back -->
  <ellipse cx="80" cy="105" rx="16" ry="14" fill="#2ed573" opacity="0.92" filter="url(#bloomVenom)"/>
  <circle cx="73" cy="101" r="3.5" fill="#000000"/>
  <circle cx="87" cy="101" r="3.5" fill="#000000"/>
  <polygon points="75,110 85,110 80,118" fill="#000000"/>
  <ellipse cx="80" cy="142" rx="22" ry="8" fill="#00d2d3" opacity="0.7" filter="url(#bloomVenom)"/>

  <!-- Segmented Armored Head & Mandibles -->
  <ellipse cx="80" cy="65" rx="30" ry="28" fill="url(#spiderChitin)" stroke="#ff4757" stroke-width="2.5"/>
  <path d="M 60 55 L 80 46 L 100 55 L 90 76 L 70 76 Z" fill="#1b1464" stroke="#2ed573" stroke-width="1.2"/>

  <!-- 6 Ruby Cluster Eyes -->
  <circle cx="66" cy="62" r="7" fill="#ff4757" filter="url(#bloomVenom)"/>
  <circle cx="64" cy="60" r="2.5" fill="#ffffff"/>
  <circle cx="94" cy="62" r="7" fill="#ff4757" filter="url(#bloomVenom)"/>
  <circle cx="92" cy="60" r="2.5" fill="#ffffff"/>
  <circle cx="76" cy="54" r="4.2" fill="#ff6b81"/>
  <circle cx="84" cy="54" r="4.2" fill="#ff6b81"/>
  <circle cx="60" cy="70" r="3.2" fill="#ff4757"/>
  <circle cx="100" cy="70" r="3.2" fill="#ff4757"/>

  <!-- Poison Dripping Mandibles -->
  <polygon points="71,80 64,104 76,88" fill="#f1f2f6" stroke="#2ed573" stroke-width="1.5"/>
  <circle cx="64" cy="106" r="3" fill="#2ed573" filter="url(#bloomVenom)"/>
  <polygon points="89,80 96,104 84,88" fill="#f1f2f6" stroke="#2ed573" stroke-width="1.5"/>
  <circle cx="96" cy="106" r="3" fill="#2ed573" filter="url(#bloomVenom)"/>
</svg>`,
  golem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180" class="chibi-svg mob-golem-svg">
  <defs>
    <linearGradient id="golemStone" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b2bec3"/>
      <stop offset="40%" stop-color="#636e72"/>
      <stop offset="85%" stop-color="#2d3436"/>
      <stop offset="100%" stop-color="#1e272e"/>
    </linearGradient>
    <linearGradient id="golemCore" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#7efff5"/>
      <stop offset="70%" stop-color="#00d2d3"/>
      <stop offset="100%" stop-color="#0984e3"/>
    </linearGradient>
    <filter id="bloomCore" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Heavy Basalt Pillar Legs -->
  <g class="golem-legs">
    <polygon points="50,132 40,174 66,174 72,132" fill="url(#golemStone)" stroke="#0c1014" stroke-width="2.5"/>
    <polygon points="110,132 120,174 94,174 88,132" fill="url(#golemStone)" stroke="#0c1014" stroke-width="2.5"/>
  </g>

  <!-- Crushing Granite Fists -->
  <g class="golem-fists">
    <circle cx="26" cy="126" r="22" fill="url(#golemStone)" stroke="#00d2d3" stroke-width="2.5"/>
    <polygon points="12,112 20,102 28,112" fill="#00d2d3"/>
    <polygon points="28,110 36,100 44,110" fill="#00d2d3"/>
    <circle cx="134" cy="126" r="22" fill="url(#golemStone)" stroke="#00d2d3" stroke-width="2.5"/>
    <polygon points="148,112 140,102 132,112" fill="#00d2d3"/>
    <polygon points="132,110 124,100 116,110" fill="#00d2d3"/>
  </g>

  <!-- Massive Tectonic Chest with Molten/Cryo Fissures -->
  <polygon points="46,65 114,65 104,138 56,138" fill="url(#golemStone)" stroke="#0c1014" stroke-width="3"/>
  <!-- Glowing Cryo Core -->
  <polygon points="80,82 94,100 80,118 66,100" fill="url(#golemCore)" stroke="#ffffff" stroke-width="1.8" filter="url(#bloomCore)"/>
  <path d="M 66 100 L 50 108 L 44 105" fill="none" stroke="#00d2d3" stroke-width="2.5" filter="url(#bloomCore)"/>
  <path d="M 94 100 L 110 108 L 116 105" fill="none" stroke="#00d2d3" stroke-width="2.5" filter="url(#bloomCore)"/>
  <path d="M 80 118 L 80 134" fill="none" stroke="#00d2d3" stroke-width="2.5" filter="url(#bloomCore)"/>

  <!-- Spiked Basalt Shoulders -->
  <polygon points="42,65 22,44 50,54" fill="url(#golemStone)" stroke="#0c1014" stroke-width="2.2"/>
  <polygon points="118,65 138,44 110,54" fill="url(#golemStone)" stroke="#0c1014" stroke-width="2.2"/>

  <!-- Titan Head Block & Monolithic Glowing Eyes -->
  <polygon points="58,26 102,26 94,62 66,62" fill="url(#golemStone)" stroke="#0c1014" stroke-width="2.5"/>
  <polygon points="80,10 68,26 92,26" fill="#00d2d3" stroke="#ffffff" stroke-width="1.5" filter="url(#bloomCore)"/>
  <!-- Monolithic Horizontal Eyes -->
  <rect x="64" y="36" width="12" height="7" rx="2" fill="#00d2d3" filter="url(#bloomCore)"/>
  <circle cx="70" cy="39.5" r="1.8" fill="#ffffff"/>
  <rect x="84" y="36" width="12" height="7" rx="2" fill="#00d2d3" filter="url(#bloomCore)"/>
  <circle cx="90" cy="39.5" r="1.8" fill="#ffffff"/>
  <line x1="66" y1="52" x2="94" y2="52" stroke="#0c1014" stroke-width="3.5"/>
</svg>`,
  sea: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180" class="chibi-svg mob-sea-svg">
  <defs>
    <linearGradient id="seaScales" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00cec9"/>
      <stop offset="40%" stop-color="#0984e3"/>
      <stop offset="85%" stop-color="#1b1464"/>
      <stop offset="100%" stop-color="#05081c"/>
    </linearGradient>
    <linearGradient id="seaGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#7efff5"/>
      <stop offset="100%" stop-color="#18dcff"/>
    </linearGradient>
    <filter id="bloomAqua" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Giant Translucent Fin Frills -->
  <g class="sea-fins-anim">
    <path d="M 50 90 C 16 106, 8 142, 28 160 C 44 145, 50 125, 54 108 Z" fill="url(#seaGlow)" opacity="0.88" stroke="#00cec9" stroke-width="2.2"/>
    <path d="M 110 90 C 144 106, 152 142, 132 160 C 116 145, 110 125, 106 108 Z" fill="url(#seaGlow)" opacity="0.88" stroke="#00cec9" stroke-width="2.2"/>
    <path d="M 80 8 C 68 28, 76 50, 80 62 C 84 50, 92 28, 80 8 Z" fill="#ffeaa7" stroke="#fdcb6e" stroke-width="2.5"/>
  </g>

  <!-- Serpentine Body -->
  <ellipse cx="80" cy="122" rx="36" ry="42" fill="url(#seaScales)" stroke="#74b9ff" stroke-width="3"/>
  <path d="M 66 104 C 66 150, 94 150, 94 104 Z" fill="#ffeaa7" opacity="0.92"/>
  <line x1="68" y1="116" x2="92" y2="116" stroke="#fdcb6e" stroke-width="2"/>
  <line x1="68" y1="128" x2="92" y2="128" stroke="#fdcb6e" stroke-width="2"/>
  <line x1="70" y1="140" x2="90" y2="140" stroke="#fdcb6e" stroke-width="2"/>

  <!-- Leviathan Head & Horns -->
  <circle cx="80" cy="62" r="32" fill="url(#seaScales)" stroke="#00cec9" stroke-width="3"/>
  <polygon points="50,58 26,46 44,70" fill="url(#seaGlow)" stroke="#0984e3" stroke-width="1.8"/>
  <polygon points="110,58 134,46 116,70" fill="url(#seaGlow)" stroke="#0984e3" stroke-width="1.8"/>
  <polygon points="80,24 72,40 88,40" fill="#f1c40f" stroke="#e67e22" stroke-width="1.8"/>

  <!-- Oceanic Pearl Eyes -->
  <ellipse cx="66" cy="58" rx="7" ry="9" fill="#2d3436"/>
  <circle cx="66" cy="58" r="5" fill="#ffeaa7" filter="url(#bloomAqua)"/>
  <circle cx="64.5" cy="55.5" r="1.8" fill="#ffffff"/>
  <ellipse cx="94" cy="58" rx="7" ry="9" fill="#2d3436"/>
  <circle cx="94" cy="58" r="5" fill="#ffeaa7" filter="url(#bloomAqua)"/>
  <circle cx="92.5" cy="55.5" r="1.8" fill="#ffffff"/>

  <!-- Shark Fangs -->
  <path d="M 66 76 Q 80 84 94 76" fill="none" stroke="#2c3e50" stroke-width="3"/>
  <polygon points="70,76 74,84 78,76" fill="#ffffff"/>
  <polygon points="82,76 86,84 90,76" fill="#ffffff"/>
</svg>`,
  demon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180" class="chibi-svg mob-demon-svg">
  <defs>
    <linearGradient id="demonPlate" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b71540"/>
      <stop offset="40%" stop-color="#4c0519"/>
      <stop offset="85%" stop-color="#1e0207"/>
      <stop offset="100%" stop-color="#080002"/>
    </linearGradient>
    <linearGradient id="demonLava" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#feca57"/>
      <stop offset="65%" stop-color="#ff4757"/>
      <stop offset="100%" stop-color="#780619"/>
    </linearGradient>
    <filter id="bloomInferno" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Jagged Bat Demon Wings -->
  <g class="demon-wings-anim">
    <path d="M 58 72 C 22 32, 2 68, 10 106 C 26 100, 44 94, 58 90 Z" fill="#4c0519" stroke="#e11d48" stroke-width="2.2"/>
    <path d="M 10 106 L 0 118 L 20 110 L 14 130 L 32 116" fill="none" stroke="#e11d48" stroke-width="2.2"/>
    <path d="M 102 72 C 138 32, 158 68, 150 106 C 134 100, 116 94, 102 90 Z" fill="#4c0519" stroke="#e11d48" stroke-width="2.2"/>
    <path d="M 150 106 L 160 118 L 140 110 L 146 130 L 128 116" fill="none" stroke="#e11d48" stroke-width="2.2"/>
  </g>

  <!-- Obsidian Greaves -->
  <polygon points="60,132 48,174 72,174 76,132" fill="#0c0003" stroke="#ff4757" stroke-width="2"/>
  <polygon points="100,132 112,174 88,174 84,132" fill="#0c0003" stroke="#ff4757" stroke-width="2"/>

  <!-- Spiked Demon Torso -->
  <polygon points="52,65 108,65 100,138 60,138" fill="url(#demonPlate)" stroke="#ff4757" stroke-width="2.8"/>
  <polygon points="80,76 92,96 80,116 68,96" fill="#e11d48" stroke="#ffeaa7" stroke-width="1.8" filter="url(#bloomInferno)"/>

  <!-- Demon Skull Head & Giant Baphomet Horns -->
  <circle cx="80" cy="52" r="28" fill="url(#demonPlate)" stroke="#e11d48" stroke-width="2.8"/>
  <!-- Baphomet Horns -->
  <path d="M 60 38 C 32 6, 22 24, 40 46 Z" fill="#ffeaa7" stroke="#d97706" stroke-width="2.5"/>
  <path d="M 100 38 C 128 6, 138 24, 120 46 Z" fill="#ffeaa7" stroke="#d97706" stroke-width="2.5"/>

  <!-- Sulphur Flame Eyes -->
  <ellipse cx="68" cy="52" rx="7" ry="8.5" fill="#facc15" filter="url(#bloomInferno)"/>
  <ellipse cx="69" cy="52" rx="3" ry="6.5" fill="#1e1b4b"/>
  <circle cx="67" cy="49" r="2" fill="#ffffff"/>
  <ellipse cx="92" cy="52" rx="7" ry="8.5" fill="#facc15" filter="url(#bloomInferno)"/>
  <ellipse cx="91" cy="52" rx="3" ry="6.5" fill="#1e1b4b"/>
  <circle cx="90" cy="49" r="2" fill="#ffffff"/>

  <!-- Flaming Soul Blade -->
  <g class="demon-weapon">
    <line x1="128" y1="34" x2="128" y2="155" stroke="url(#demonLava)" stroke-width="5" stroke-linecap="round" filter="url(#bloomInferno)"/>
    <polygon points="128,22 120,38 136,38" fill="url(#demonLava)"/>
  </g>
</svg>`,
  treant: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180" class="chibi-svg mob-treant-svg">
  <defs>
    <linearGradient id="woodBark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6ab04c"/>
      <stop offset="35%" stop-color="#4b6584"/>
      <stop offset="75%" stop-color="#303952"/>
      <stop offset="100%" stop-color="#1e272e"/>
    </linearGradient>
    <filter id="sporeGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <!-- Root Feet -->
  <polygon points="50,135 34,175 66,175 72,135" fill="url(#woodBark)" stroke="#2ed573" stroke-width="2"/>
  <polygon points="110,135 126,175 94,175 88,135" fill="url(#woodBark)" stroke="#2ed573" stroke-width="2"/>
  <!-- Massive Bark Torso with Spores -->
  <polygon points="46,65 114,65 104,140 56,140" fill="url(#woodBark)" stroke="#2ed573" stroke-width="2.5"/>
  <circle cx="80" cy="100" r="14" fill="#2ed573" opacity="0.8" filter="url(#sporeGlow)"/>
  <!-- Spiked Branch Fists -->
  <circle cx="26" cy="120" r="20" fill="url(#woodBark)" stroke="#2ed573" stroke-width="2"/>
  <polygon points="12,106 18,96 26,106" fill="#2ed573"/>
  <circle cx="134" cy="120" r="20" fill="url(#woodBark)" stroke="#2ed573" stroke-width="2"/>
  <polygon points="148,106 142,96 134,106" fill="#2ed573"/>
  <!-- Crown of Thorns & Glowing Amber Eyes -->
  <polygon points="58,26 102,26 94,62 66,62" fill="url(#woodBark)" stroke="#2ed573" stroke-width="2"/>
  <polygon points="80,8 72,26 88,26" fill="#6ab04c"/>
  <circle cx="68" cy="40" r="4.5" fill="#ffd32a" filter="url(#sporeGlow)"/>
  <circle cx="92" cy="40" r="4.5" fill="#ffd32a" filter="url(#sporeGlow)"/>
</svg>`,
  void: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180" class="chibi-svg mob-void-svg">
  <defs>
    <linearGradient id="voidCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e056fd"/>
      <stop offset="50%" stop-color="#686de0"/>
      <stop offset="100%" stop-color="#130f40"/>
    </linearGradient>
    <filter id="voidBloom" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <!-- 6 Void Blades Wings -->
  <g class="demon-wings-anim">
    <path d="M 58 70 C 18 20, -4 52, 4 96 C 18 90, 38 84, 58 80 Z" fill="#130f40" stroke="#e056fd" stroke-width="2"/>
    <path d="M 102 70 C 142 20, 164 52, 156 96 C 142 90, 122 84, 102 80 Z" fill="#130f40" stroke="#e056fd" stroke-width="2"/>
  </g>
  <!-- Void Robes -->
  <path d="M 50 74 C 34 115, 28 150, 30 172 L 130 172 C 132 150, 126 115, 110 74 Z" fill="#09061d" stroke="#e056fd" stroke-width="2"/>
  <circle cx="80" cy="110" r="15" fill="url(#voidCoreGrad)" filter="url(#voidBloom)"/>
  <!-- Void Skull & Eye Vortex -->
  <circle cx="80" cy="50" r="26" fill="#09061d" stroke="#e056fd" stroke-width="2.5"/>
  <ellipse cx="68" cy="48" rx="6" ry="8" fill="#e056fd" filter="url(#voidBloom)"/>
  <circle cx="68" cy="48" r="2" fill="#ffffff"/>
  <ellipse cx="92" cy="48" rx="6" ry="8" fill="#e056fd" filter="url(#voidBloom)"/>
  <circle cx="92" cy="48" r="2" fill="#ffffff"/>
  <!-- Colossal Void Scythe (Lưỡi Hái Hư Không) -->
  <g class="demon-weapon">
    <line x1="128" y1="18" x2="128" y2="165" stroke="#e056fd" stroke-width="4.5" stroke-linecap="round" filter="url(#voidBloom)"/>
    <path d="M 128 20 C 128 4, 156 8, 158 32 C 145 32, 134 26, 128 20 Z" fill="#e056fd" filter="url(#voidBloom)"/>
  </g>
</svg>`,
  dragon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180" class="chibi-svg mob-dragon-svg">
  <defs>
    <linearGradient id="dragonScales" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff9f43"/>
      <stop offset="35%" stop-color="#ee5253"/>
      <stop offset="80%" stop-color="#881337"/>
      <stop offset="100%" stop-color="#230308"/>
    </linearGradient>
    <linearGradient id="dragonGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#feca57"/>
      <stop offset="85%" stop-color="#ff9f43"/>
      <stop offset="100%" stop-color="#b7791f"/>
    </linearGradient>
    <filter id="bloomDragon" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Massive Draconic Wings (Sải Cánh Rồng Khổng Lồ 155px) -->
  <g class="dragon-wings-anim">
    <path d="M 56 72 C 18 24, -8 48, 4 98 C 20 92, 38 86, 56 82 Z" fill="url(#dragonScales)" stroke="url(#dragonGold)" stroke-width="2.2"/>
    <path d="M 4 98 L -6 112 L 16 102 L 8 124 L 30 108" fill="none" stroke="url(#dragonGold)" stroke-width="2.2"/>
    <path d="M 104 72 C 142 24, 168 48, 156 98 C 140 92, 122 86, 104 82 Z" fill="url(#dragonScales)" stroke="url(#dragonGold)" stroke-width="2.2"/>
    <path d="M 156 98 L 166 112 L 144 102 L 152 124 L 130 108" fill="none" stroke="url(#dragonGold)" stroke-width="2.2"/>
  </g>

  <!-- Long Spiked Dragon Tail -->
  <path d="M 94 140 C 135 160, 132 176, 116 179 C 110 171, 100 160, 86 148" fill="none" stroke="#ee5253" stroke-width="5.5" stroke-linecap="round"/>
  <polygon points="116,179 128,175 119,166" fill="url(#dragonGold)"/>

  <!-- Armored Dragon Torso & Talons -->
  <ellipse cx="80" cy="120" rx="38" ry="40" fill="url(#dragonScales)" stroke="url(#dragonGold)" stroke-width="3"/>
  <path d="M 66 104 C 66 150, 94 150, 94 104 Z" fill="url(#dragonGold)" opacity="0.95"/>
  <line x1="68" y1="114" x2="92" y2="114" stroke="#ee5253" stroke-width="2.2"/>
  <line x1="66" y1="126" x2="94" y2="126" stroke="#ee5253" stroke-width="2.2"/>
  <line x1="70" y1="138" x2="90" y2="138" stroke="#ee5253" stroke-width="2.2"/>
  <!-- Razor Talons -->
  <ellipse cx="60" cy="168" rx="12" ry="8" fill="#ee5253" stroke="url(#dragonGold)" stroke-width="1.8"/>
  <ellipse cx="100" cy="168" rx="12" ry="8" fill="#ee5253" stroke="url(#dragonGold)" stroke-width="1.8"/>

  <!-- Colossal Dragon Head & Golden Horns -->
  <ellipse cx="80" cy="58" rx="34" ry="30" fill="url(#dragonScales)" stroke="url(#dragonGold)" stroke-width="3"/>
  <path d="M 55 38 C 30 10, 36 28, 44 46 Z" fill="url(#dragonGold)" stroke="#d35400" stroke-width="2.5"/>
  <path d="M 105 38 C 130 10, 124 28, 116 46 Z" fill="url(#dragonGold)" stroke="#d35400" stroke-width="2.5"/>
  <polygon points="80,22 73,38 87,38" fill="url(#dragonGold)"/>

  <!-- Blazing Molten Eyes -->
  <ellipse cx="66" cy="54" rx="7.5" ry="9" fill="#feca57" filter="url(#bloomDragon)"/>
  <ellipse cx="67" cy="54" rx="3" ry="7" fill="#1e272e"/>
  <circle cx="64" cy="50" r="2.2" fill="#ffffff"/>
  <ellipse cx="94" cy="54" rx="7.5" ry="9" fill="#feca57" filter="url(#bloomDragon)"/>
  <ellipse cx="93" cy="54" rx="3" ry="7" fill="#1e272e"/>
  <circle cx="91" cy="50" r="2.2" fill="#ffffff"/>

  <!-- Fiery Breathing Nostrils -->
  <ellipse cx="80" cy="70" rx="12" ry="6.5" fill="#ee5253"/>
  <circle cx="75" cy="70" r="2.2" fill="#ff9f43" filter="url(#bloomDragon)"/>
  <circle cx="85" cy="70" r="2.2" fill="#ff9f43" filter="url(#bloomDragon)"/>
</svg>`
};

function updateArenaAtmosphere(mapId) {
  const layer = document.getElementById("arenaWeatherLayer");
  if (!layer) return;
  let particleType = "motes";
  if (mapId === 3) particleType = "snow"; // Devias snow
  else if (mapId === 5) particleType = "bubbles"; // Atlans bubbles
  else if (mapId === 6 || mapId === 7) particleType = "embers"; // Lost Tower / Tarkan embers
  else if (mapId >= 9) particleType = "stars"; // Icarus / Kanturu stars

  if (layer.getAttribute("data-weather") !== particleType) {
    layer.setAttribute("data-weather", particleType);
    layer.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      const p = document.createElement("div");
      p.className = `weather-particle particle-${particleType}`;
      p.style.left = `${(Math.random() * 92 + 4).toFixed(1)}%`;
      p.style.animationDelay = `${(Math.random() * 3.5).toFixed(1)}s`;
      p.style.animationDuration = `${(2.2 + Math.random() * 2.8).toFixed(1)}s`;
      layer.appendChild(p);
    }
  }
}

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
  updateArenaAtmosphere(mapId);
}

// 7 MONSTER RANKS: Quái thường, Tinh anh, Ám kim, Hoàng kim, Lĩnh chủ, Truyền thuyết, Thần thoại
const MONSTER_RANKS = [
  {
    key: "normal",
    name: "Quái Thường",
    prefix: "[Thường]",
    color: "#c8d6e5",
    colorClass: "log-norm",
    hpMult: 1.0,
    dmgMult: 1.0,
    zenChance: 0.35,
    zenMult: 1.0,
    gearChance: 0.25, // 25.0% (cứ ~4 quái rơi 1 món đồ)
    jewelBoost: 1,
    minRarity: null,
    auraClass: "rank-normal",
    scale: 1.0,
    icon: "",
    hpGradient: "linear-gradient(90deg, #e74c3c, #f39c12)"
  },
  {
    key: "elite",
    name: "Tinh Anh",
    prefix: "[Tinh Anh]",
    color: "#2ecc71",
    colorClass: "log-elite",
    hpMult: 2.5,
    dmgMult: 1.8,
    zenChance: 0.60,
    zenMult: 1.8,
    gearChance: 1.0, // 100%
    jewelBoost: 2,
    minRarity: null,
    auraClass: "rank-elite",
    scale: 1.08,
    icon: "★",
    hpGradient: "linear-gradient(90deg, #27ae60, #2ecc71)"
  },
  {
    key: "dark_gold",
    name: "Ám Kim",
    prefix: "[Ám Kim]",
    color: "#9b59b6",
    colorClass: "log-chaos",
    hpMult: 5.0,
    dmgMult: 2.8,
    zenChance: 0.80,
    zenMult: 3.0,
    gearChance: 1.0, // 100%
    jewelBoost: 4,
    minRarity: null,
    auraClass: "rank-dark-gold",
    scale: 1.15,
    icon: "⚔️",
    hpGradient: "linear-gradient(90deg, #8e44ad, #9b59b6)"
  },
  {
    key: "golden",
    name: "Hoàng Kim",
    prefix: "[Hoàng Kim]",
    color: "#f1c40f",
    colorClass: "log-crit",
    hpMult: 9.0,
    dmgMult: 4.2,
    zenChance: 1.0,
    zenMult: 5.0,
    gearChance: 0.50, // 50%
    jewelBoost: 8,
    minRarity: null,
    auraClass: "rank-golden",
    scale: 1.22,
    icon: "✨",
    hpGradient: "linear-gradient(90deg, #d35400, #f1c40f)"
  },
  {
    key: "overlord",
    name: "Lĩnh Chủ",
    prefix: "[Lĩnh Chủ]",
    color: "#e67e22",
    colorClass: "log-boss",
    hpMult: 18.0,
    dmgMult: 6.5,
    zenChance: 1.0,
    zenMult: 8.0,
    gearChance: 0.75, // 75%
    jewelBoost: 12,
    minRarity: null,
    auraClass: "rank-overlord",
    scale: 1.30,
    icon: "🥈",
    hpGradient: "linear-gradient(90deg, #c0392b, #e67e22)"
  },
  {
    key: "legendary",
    name: "Truyền Thuyết",
    prefix: "[Truyền Thuyết]",
    color: "#ff4757",
    colorClass: "log-boss",
    hpMult: 35.0,
    dmgMult: 10.0,
    zenChance: 1.0,
    zenMult: 12.0,
    gearChance: 1.0, // 100%
    jewelBoost: 20,
    minRarity: null,
    auraClass: "rank-legendary",
    scale: 1.42,
    icon: "👑",
    hpGradient: "linear-gradient(90deg, #b71540, #ff4757)"
  },
  {
    key: "mythical",
    name: "Thần Thoại",
    prefix: "[THẦN THOẠI]",
    color: "#e056fd",
    colorClass: "log-crit",
    hpMult: 70.0,
    dmgMult: 18.0,
    zenChance: 1.0,
    zenMult: 25.0,
    gearChance: 1.0, // 100% Chắc chắn rơi đồ
    jewelBoost: 35,
    minRarity: null,
    auraClass: "rank-mythical",
    scale: 1.52,
    icon: "👑✨",
    hpGradient: "linear-gradient(90deg, #8e44ad, #e056fd, #00d2d3)"
  }
];

function rollMonsterRank(mobsKilled) {
  if ((mobsKilled + 1) % 60 === 0) return MONSTER_RANKS[6]; // Mythical
  if ((mobsKilled + 1) % 30 === 0) return MONSTER_RANKS[5]; // Legendary
  if ((mobsKilled + 1) % 15 === 0) return MONSTER_RANKS[4]; // Overlord
  if ((mobsKilled + 1) % 8 === 0) return MONSTER_RANKS[3];  // Golden

  const roll = Math.random() * 100;
  if (roll < 0.6) return MONSTER_RANKS[6]; // 0.6% Mythical
  if (roll < 2.0) return MONSTER_RANKS[5]; // 1.4% Legendary
  if (roll < 5.0) return MONSTER_RANKS[4]; // 3.0% Overlord
  if (roll < 10.0) return MONSTER_RANKS[3]; // 5.0% Golden
  if (roll < 20.0) return MONSTER_RANKS[2]; // 10.0% Dark Gold
  if (roll < 38.0) return MONSTER_RANKS[1]; // 18.0% Elite
  return MONSTER_RANKS[0]; // 62.0% Normal
}

function renderHeroSprite(force = false) {
  const heroSprite = document.getElementById("heroSpriteEl");
  if (!heroSprite) return;
  const currentClass = state.charClass || "dk";
  if (force || heroSprite.getAttribute("data-class") !== currentClass || !heroSprite.hasChildNodes()) {
    heroSprite.setAttribute("data-class", currentClass);
    heroSprite.innerHTML = CHIBI_HEROES[currentClass] || CHIBI_HEROES.dk;
  }

  // Hero Tier Aura Level
  const heroActor = document.getElementById("chibiHeroActor");
  if (heroActor) {
    let auraClass = "hero-base";
    if (state.rebirthCount >= 3) auraClass = "hero-aura-mythic";
    else if (state.rebirthCount >= 1) auraClass = "hero-aura-godly";
    else if (state.level >= 100) auraClass = "hero-aura-gold";
    else if (state.level >= 50) auraClass = "hero-aura-radiant";
    heroActor.className = `chibi-actor hero-actor ${auraClass}`;
  }
}

function updateChibiArena(currentMap, mobName, rank) {
  // 1. Hero Chibi & Aura in Maple Frame
  const heroBadge = document.getElementById("chibiHeroBadge");
  if (heroBadge) heroBadge.innerHTML = `<span class="maple-leaf-icon">🍁</span> Lv.${state.level} ${state.username}`;
  
  const avatarIcon = document.getElementById("heroAvatarIcon");
  if (avatarIcon) avatarIcon.innerText = state.charClass === "fe" ? "🏹" : (state.charClass === "dw" ? "🧙" : "⚔️");
  
  renderHeroSprite();

  // 2. Arena Background & Atmosphere Particles
  updateArenaBackground(currentMap.id);

  // 3. Monster Chibi in Maple Frame
  const mobActor = document.getElementById("chibiMonsterActor");
  const mobNameEl = document.getElementById("chibiMobName");
  const mobHpFillEl = document.getElementById("chibiMobHpFill");
  const mobHpTextEl = document.getElementById("chibiMobHpText");
  const mobSprite = document.getElementById("monsterSpriteEl");

  const rObj = typeof rank === "object" ? rank : (MONSTER_RANKS.find(r => r.key === rank) || MONSTER_RANKS[0]);

  let archetype = "spider";
  if (rObj.key === "mythical") archetype = currentMap.tier >= 6 ? "void" : "dragon";
  else if (rObj.key === "legendary") archetype = currentMap.tier >= 7 ? "dragon" : "demon";
  else if (rObj.key === "overlord") archetype = currentMap.tier >= 5 ? "demon" : "golem";
  else if (rObj.key === "golden") archetype = "dragon";
  else {
    if (currentMap.tier === 1) archetype = "spider";
    else if (currentMap.tier === 2) archetype = "treant";
    else if (currentMap.tier === 3) archetype = "golem";
    else if (currentMap.tier === 4) archetype = "demon";
    else if (currentMap.tier === 5) archetype = "sea";
    else if (currentMap.tier === 6) archetype = "demon";
    else if (currentMap.tier === 7) archetype = "demon";
    else if (currentMap.tier === 8) archetype = "treant";
    else if (currentMap.tier === 9) archetype = "dragon";
    else archetype = "void";
  }

  if (mobSprite && typeof CHIBI_MONSTERS !== "undefined") {
    mobSprite.innerHTML = CHIBI_MONSTERS[archetype] || CHIBI_MONSTERS.spider;
  }

  if (mobActor) {
    mobActor.className = `chibi-actor monster-actor ${rObj.auraClass}`;
  }

  if (mobNameEl) {
    mobNameEl.innerHTML = `<span class="mob-type-icon">${rObj.icon || "👾"}</span> ${mobName}`;
    mobNameEl.style.color = rObj.color || "#ffd32a";
  }

  const curHp = state.currentMob ? Math.max(0, state.currentMob.currentHp) : 1;
  const maxHp = state.currentMob ? state.currentMob.maxHp : 1;
  const pct = Math.max(0, Math.min(100, (curHp / maxHp) * 100));

  if (mobHpFillEl) {
    mobHpFillEl.style.width = `${pct}%`;
  }
  if (mobHpTextEl) {
    mobHpTextEl.innerText = `HP: ${Math.ceil(curHp).toLocaleString()} / ${maxHp.toLocaleString()} (${pct.toFixed(0)}%)`;
  }

  // 4. Iconic MapleStory M Boss Frame
  const bossBanner = document.getElementById("mapleBossBanner");
  const bossNameText = document.getElementById("mapleBossNameText");
  const bossHpFill = document.getElementById("mapleBossHpFill");
  const bossHpNum = document.getElementById("mapleBossHpNum");
  const isBossRank = ["overlord", "legendary", "mythical", "boss", "golden"].includes(rObj.key);

  if (bossBanner) {
    if (isBossRank) {
      bossBanner.style.display = "flex";
      if (bossNameText) bossNameText.innerText = `${rObj.icon ? rObj.icon + " " : ""}${mobName}`;
      if (bossHpFill) bossHpFill.style.width = `${pct}%`;
      if (bossHpNum) bossHpNum.innerText = `${Math.ceil(curHp).toLocaleString()} / ${maxHp.toLocaleString()} (${pct.toFixed(0)}%)`;
    } else {
      bossBanner.style.display = "none";
    }
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

function playSlashFx(type = "fire", isCrit = false) {
  const fxLayer = document.getElementById("arenaFxLayer");
  const arena = document.getElementById("battleArena");
  if (!fxLayer) return;

  if (isCrit && arena) {
    arena.classList.remove("screen-shake");
    void arena.offsetWidth;
    arena.classList.add("screen-shake");
    setTimeout(() => { arena.classList.remove("screen-shake"); }, 260);
  }

  const fx = document.createElement("div");
  let fxClass = `combat-slash-fx fx-${type}`;
  if (isCrit) fxClass += " fx-crit-burst";
  fx.className = fxClass;
  fx.style.left = "75%";
  fx.style.top = "48%";

  fxLayer.appendChild(fx);
  setTimeout(() => { if (fx.parentNode) fx.remove(); }, 380);
}

function spawnMonsterDeathBurst() {
  const fxLayer = document.getElementById("arenaFxLayer");
  if (!fxLayer) return;
  const burst = document.createElement("div");
  burst.className = "mob-death-burst";
  burst.style.left = "75%";
  burst.style.top = "50%";
  fxLayer.appendChild(burst);
  setTimeout(() => { if (burst.parentNode) burst.remove(); }, 500);
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

function spawnFloatingSkillBanner(text) {
  const fxLayer = document.getElementById("arenaFxLayer");
  if (!fxLayer) return;
  const el = document.createElement("div");
  el.className = "floating-skill-banner";
  el.innerText = text;
  el.style.left = "24%";
  el.style.top = "30%";
  fxLayer.appendChild(el);
  setTimeout(() => { if (el.parentNode) el.remove(); }, 800);
}

function toggleAutoMap() {
  const chk = document.getElementById("chkAutoMap");
  if (chk) state.autoAdvanceMap = chk.checked;
  saveGameState();
}

function checkAutoAdvanceMap() {
  if (!state.autoAdvanceMap) return;
  const nextMap = MAPS.find(m => m.id === state.currentMapId + 1);
  if (nextMap && state.level >= nextMap.reqLv && (state.rs || 0) >= nextMap.reqRs) {
    selectMap(nextMap.id);
    addLog(`🚩 [TỰ ĐỘNG TIẾN MAP] Đủ điều kiện! Bạn đã tự động tiến vào vùng đất mới [${nextMap.name}]!`, "log-crit");
  }
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
  { tier: 1, name: "Khởi Nguyên (Genesis)" },
  { tier: 2, name: "Phong Lôi (Stormbringer)" },
  { tier: 3, name: "Băng Hàn (Frostguard)" },
  { tier: 4, name: "Ngục Tối (Nether Dark)" },
  { tier: 5, name: "Hải Long (Leviathan)" },
  { tier: 6, name: "Hỏa Ngục (Hellfire)" },
  { tier: 7, name: "Sa Mạc (Sandstorm)" },
  { tier: 8, name: "Rừng Thiêng (Mythic Wood)" },
  { tier: 9, name: "Thiên Giới (Phoenix Sky)" },
  { tier: 10, name: "Tối Thượng (Archangel God)" }
];

const RARITIES = [
  { name: "Trắng", color: "#e0e0e0", class: "r-white", optCount: 0 },
  { name: "Lục", color: "#2ecc71", class: "r-green", optCount: 1 },
  { name: "Lam", color: "#3498db", class: "r-blue", optCount: 2 },
  { name: "Cam", color: "#e67e22", class: "r-orange", optCount: 3 },
  { name: "Vàng", color: "#f1c40f", class: "r-yellow", optCount: 4 },
  { name: "Tím", color: "#9b59b6", class: "r-purple", optCount: 5 },
  { name: "Đỏ Siêu Cấp", color: "#e74c3c", class: "r-red", optCount: 6 },
  { name: "Hồng Kim Thần Thoại", color: "#ff007f", class: "r-pink", optCount: 7 },
  { name: "Hỗn Mang Đa Sắc", color: "#00ffff", class: "r-rainbow", optCount: 8 },
  { name: "Chí Tôn Vô Cực", color: "#ffd700", class: "r-god", optCount: 10 }
];

const OPTION_POOL = [
  "★ Tăng Sát Thương Hoàn Hảo +12%",
  "★ Tăng Sát Thương Bạo Kích +18%",
  "★ Hút Máu Khi Đánh: +8% ST chuyển hóa HP",
  "★ Bỏ Qua Phòng Thủ (Ignore Def) 5%",
  "★ Tỷ Lệ Đòn Đánh Kép (Double Dmg) +12%",
  "★ Phản Hồi Sát Thương (Reflect) +10%",
  "★ Tăng Tốc Độ Tấn Công +15",
  "★ Tăng May Mắn Rơi Đồ Quý & Ngọc +25%",
  "★ Tăng Lượng Zen Rơi +35%",
  "★ Giảm Sát Thương Nhận Vào +6%"
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

function getItemAuraClass(plus) {
  if (!plus) return "";
  if (plus >= 13) return "aura-plus-13";
  if (plus >= 11) return "aura-plus-11";
  if (plus >= 9) return "aura-plus-9";
  if (plus >= 7) return "aura-plus-7";
  return "";
}

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
  { key: "helm", name: "Mũ Giáp", icon: "🪖" },
  { key: "armor", name: "Áo Giáp", icon: "🥋" },
  { key: "gloves", name: "Găng Tay", icon: "🥊" },
  { key: "boots", name: "Giày", icon: "👢" },
  { key: "mainWeapon", name: "Vũ Khí Chính", icon: "⚔️" },
  { key: "offWeapon", name: "Khiên / VK Phụ", icon: "🛡️" },
  { key: "wings", name: "Cánh Thần", icon: "🪽" },
  { key: "pet", name: "Thú Cưng / Cưỡi", icon: "🐺" },
  { key: "pendant", name: "Dây Chuyền", icon: "📿" },
  { key: "ring1", name: "Nhẫn Trái", icon: "💍" },
  { key: "ring2", name: "Nhẫn Phải", icon: "💍" }
];

const DROPPABLE_SLOTS = [
  { key: "helm", name: "Mũ Giáp" },
  { key: "armor", name: "Áo Giáp" },
  { key: "gloves", name: "Găng Tay" },
  { key: "boots", name: "Giày" },
  { key: "mainWeapon", name: "Vũ Khí Chính" },
  { key: "offWeapon", name: "Khiên / VK Phụ" },
  { key: "pendant", name: "Dây Chuyền" },
  { key: "ring1", name: "Nhẫn Trái" },
  { key: "ring2", name: "Nhẫn Phải" }
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
function getRequiredExpForLevel(level) {
  const lv = Math.max(1, Math.min(400, level));
  if (lv >= 400) return 999999999;
  return Math.floor(180 + Math.pow(lv, 1.85) * 45 + lv * 25);
}

function getClassSkills(charClass = "dk") {
  if (charClass === "fe") {
    return [
      { id: "triple_shot", name: "Triple Shot", icon: "🏹", level: 1, maxLevel: 50, desc: "Bắn ba mũi tên bạo kích cùng lúc về phía mục tiêu.", baseMult: 1.5, costZen: 10000, costPts: 1 },
      { id: "ice_arrow", name: "Ice Arrow", icon: "❄️", level: 1, maxLevel: 50, desc: "Băng tiễn đóng băng quái vật, giảm 50% sức đánh.", baseMult: 1.7, costZen: 25000, costPts: 2 },
      { id: "penetration", name: "Penetration", icon: "🎯", level: 0, maxLevel: 50, desc: "Mũi tên xé gió xuyên thấu phòng thủ quái vật.", baseMult: 2.2, costZen: 50000, costPts: 3 },
      { id: "infinity_arrow", name: "Infinity Arrow", icon: "🕊️", level: 1, maxLevel: 50, desc: "Thần tiễn tăng né tránh và bạo kích vô hạn.", baseMult: 1.0, costZen: 20000, costPts: 2 }
    ];
  } else if (charClass === "dw") {
    return [
      { id: "evil_spirit", name: "Evil Spirit", icon: "🔮", level: 1, maxLevel: 50, desc: "Triệu hồi linh hồn tà ác quét sạch toàn bộ quái vật.", baseMult: 1.6, costZen: 10000, costPts: 1 },
      { id: "ice_storm", name: "Ice Storm", icon: "❄️", level: 1, maxLevel: 50, desc: "Bão tuyết đông giá đóng băng toàn bộ mục tiêu.", baseMult: 1.9, costZen: 25000, costPts: 2 },
      { id: "hellfire", name: "Hellfire", icon: "☄️", level: 0, maxLevel: 50, desc: "Cột lửa hỏa ngục thiêu đốt mục tiêu liên tục.", baseMult: 2.4, costZen: 50000, costPts: 3 },
      { id: "mana_shield", name: "Mana Shield", icon: "🛡️", level: 1, maxLevel: 50, desc: "Lớp khiên ma thuật bảo hộ, tăng phòng thủ tuyệt đối.", baseMult: 1.0, costZen: 20000, costPts: 2 }
    ];
  } else {
    // dk (Dark Knight)
    return [
      { id: "twisting_slash", name: "Twisting Slash", icon: "⚔️", level: 1, maxLevel: 50, desc: "Xoay kiếm cuồng phong bão táp quét sạch mục tiêu xung quanh.", baseMult: 1.5, costZen: 10000, costPts: 1 },
      { id: "rageful_blow", name: "Rageful Blow", icon: "💥", level: 1, maxLevel: 50, desc: "Dộng kiếm long trời lở đất gây choáng và sát thương lớn.", baseMult: 1.8, costZen: 25000, costPts: 2 },
      { id: "death_stab", name: "Death Stab", icon: "🗡️", level: 0, maxLevel: 50, desc: "Đâm kiếm tử thần xuyên phá toàn bộ phòng ngự.", baseMult: 2.3, costZen: 50000, costPts: 3 },
      { id: "fortitude", name: "Greater Fortitude", icon: "🛡️", level: 1, maxLevel: 50, desc: "Gồng máu thần thánh tăng lượng máu tối đa và sức chống chịu.", baseMult: 1.0, costZen: 20000, costPts: 2 }
    ];
  }
}

function getDefaultState(username = "Hero_Lorencia", charClass = "dk") {
  if (!["dk", "fe", "dw"].includes(charClass)) charClass = "dk";
  let stats = { str: 30, agi: 20, vit: 30, ene: 15 };
  let gender = "male";
  if (charClass === "fe") {
    stats = { str: 20, agi: 38, vit: 20, ene: 17 };
    gender = "female";
  } else if (charClass === "dw") {
    stats = { str: 15, agi: 20, vit: 20, ene: 40 };
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
    autoRS: true,
    towerFloor: 1,
    autoTower: false,
    shopTab: "jewels",
    currentActiveTab: "battle",
    feather: 0,
    flame: 0,
    beastSoul: 0,
    fenrirHorn: 0,
    kirinFragment: 0,
    currentHp: 500,
    currentMp: 200,
    equipped: {
      mainWeapon: null, offWeapon: null, helm: null, armor: null,
      gloves: null, boots: null, wings: null, pet: null,
      pendant: null, ring1: null, ring2: null
    },
    inventory: [],
    selectedSlotKey: "mainWeapon",
    selectedUpgradeKey: "mainWeapon",
    currentUpgradeSubtab: "enhance",
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
  let cClass = acc.charClass;
  if (!["dk", "fe", "dw"].includes(cClass)) cClass = "dk";
  state = Object.assign(getDefaultState(acc.username, cClass), acc.state);
  if (!["dk", "fe", "dw"].includes(state.charClass)) state.charClass = cClass;
  if (!state.skills || state.skills.length === 0 || !state.skills.some(s => s.id)) state.skills = getClassSkills(state.charClass);
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
  audio.updateIcon();
  const gate = document.getElementById("loginGate");
  if (gate) gate.style.display = "none";

  try {
    audio.playGateOpen();
    audio.vibrate(120);
  } catch(e) {}

  if (state.autoStats === undefined || state.autoStats === null) {
    state.autoStats = true;
  }
  if (state.autoStats !== false && state.freePoints > 0) {
    autoDistributeClass();
  }

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
  initQuestsState();
  if (state.quests && state.quests.daily && state.quests.daily.usePotions) {
    state.quests.daily.usePotions.cur++;
  }
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
  const optCount = (item.options && Array.isArray(item.options)) ? item.options.length : 0;
  const atk = item.atk || 0;
  const def = item.def || 0;
  const hp = item.hp || 0;
  const plus = item.plus || 0;
  const fusion = item.fusionCount || 0;
  return Math.floor((atk * 1.8) + (def * 1.5) + (hp * 0.4) + (plus * 60) + (optCount * 80) + (fusion * 100));
}

function getItemSellPrice(item) {
  if (!item) return 0;
  const tier = item.tier || 1;
  const rarity = item.rarity || 0;
  const plus = item.plus || 0;
  const baseValue = (tier * 200) + (rarity * 400) + (plus * 500);
  return Math.max(50, Math.floor(baseValue * 0.30));
}

function generateItemForClass(targetTier = null, forceRarity = null, charClass = null) {
  const c = charClass || state.charClass || "dk";
  return generateItem(targetTier, forceRarity, c);
}

function generateItem(targetTier = null, forceRarity = null, preferredClass = null, rankKey = "normal") {
  let tierIndex = targetTier !== null ? targetTier - 1 : Math.min(9, state.currentMapId - 1);

  // Giảm tỷ lệ rơi đồ Tier cao (Tier 3+) khi đánh quái thường
  if (tierIndex >= 2 && rankKey === "normal") {
    if (Math.random() < 0.65) {
      tierIndex = Math.floor(Math.random() * 2); // Rớt Tier 1 hoặc 2
    }
  }

  const tierData = TIERS[tierIndex] || TIERS[0];
  const slotDef = DROPPABLE_SLOTS[Math.floor(Math.random() * DROPPABLE_SLOTS.length)];
  
  let rarityObj = RARITIES[0];
  if (forceRarity !== null && RARITIES[forceRarity]) {
    rarityObj = RARITIES[forceRarity];
  } else {
    // CHỈ GIẢM TỶ LỆ RỚT ĐỒ HIẾM TỪ BẬC 3 TRỞ LÊN (Cam, Vàng, Tím, Đỏ)
    const r = Math.random() * 100;
    let rIdx = 0;
    if (rankKey === "mythical") {
      if (r < 25) rIdx = 4; // Vàng (25%)
      else if (r < 75) rIdx = 5; // Tím (50%)
      else rIdx = 6; // Đỏ Siêu Cấp (25%)
    } else if (rankKey === "legendary") {
      if (r < 5) rIdx = 2; // Lam
      else if (r < 38) rIdx = 3; // Cam
      else if (r < 80) rIdx = 4; // Vàng
      else if (r < 95) rIdx = 5; // Tím
      else rIdx = 6; // Đỏ
    } else if (rankKey === "overlord") {
      if (r < 25) rIdx = 2; // Lam
      else if (r < 72) rIdx = 3; // Cam
      else if (r < 92) rIdx = 4; // Vàng
      else if (r < 98.5) rIdx = 5; // Tím
      else rIdx = 6; // Đỏ
    } else if (rankKey === "golden") {
      if (r < 60) rIdx = 2; // Lam
      else if (r < 88) rIdx = 3; // Cam
      else if (r < 97) rIdx = 4; // Vàng
      else if (r < 99.6) rIdx = 5; // Tím
      else rIdx = 6; // Đỏ
    } else if (rankKey === "dark_gold") {
      if (r < 35) rIdx = 1; // Lục
      else if (r < 85) rIdx = 2; // Lam
      else if (r < 96.5) rIdx = 3; // Cam
      else if (r < 99.4) rIdx = 4; // Vàng
      else rIdx = 5; // Tím
    } else if (rankKey === "elite") {
      if (r < 40) rIdx = 0; // Trắng (40%)
      else if (r < 82) rIdx = 1; // Lục (42%)
      else if (r < 97.5) rIdx = 2; // Lam (15.5%)
      else if (r < 99.6) rIdx = 3; // Cam (2.1%)
      else rIdx = 4; // Vàng (0.4%)
    } else {
      // Quái Thường: Đồ phổ thông (Trắng, Lục, Lam) chiếm 99.2%, đồ hiếm bậc 3+ chỉ chiếm 0.8%
      if (r < 70) rIdx = 0; // Trắng (70%)
      else if (r < 92) rIdx = 1; // Lục (22%)
      else if (r < 99.2) rIdx = 2; // Lam (7.2%)
      else if (r < 99.9) rIdx = 3; // Cam (0.7%)
      else rIdx = 4; // Vàng (0.1%)
    }
    rarityObj = RARITIES[rIdx] || RARITIES[0];
  }

  const pClass = preferredClass || state.charClass || "dk";
  let baseName = "";
  if (slotDef.key === "mainWeapon") {
    if (pClass === "dw") baseName = `Gậy ${tierData.name}`;
    else if (pClass === "fe") baseName = `Cung Thần ${tierData.name}`;
    else baseName = `Đại Đao ${tierData.name}`;
  } else if (slotDef.key === "offWeapon") {
    if (pClass === "dw") baseName = `Khiên Ma Pháp ${tierData.name}`;
    else if (pClass === "fe") baseName = `Túi Tên Thánh ${tierData.name}`;
    else baseName = `Khiên Thần ${tierData.name}`;
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


const WING_SPECIFIC_OPTIONS = [
  "★ Tăng Sát Thương Hoàn Hảo +35%",
  "★ Bỏ Qua Phòng Ngự (Ignore Def) 5%",
  "★ Hồi Phục Sinh Lực Thần Thánh +5%",
  "★ Tốc Độ Bay & Đánh +20",
  "★ Đòn Đánh Kép (Double Dmg) +15%",
  "★ Giảm Sát Thương Nhận Vào +12%"
];

const PET_SPECIFIC_OPTIONS = [
  "★ Tăng Sát Thương Toàn Diện +25%",
  "★ Hút Sinh Lực Đối Phương +10%",
  "★ Phản Hồi Sát Thương Cực Đại +15%",
  "★ Bạo Kích Chí Mạng +20%",
  "★ Giảm Sát Thương Nhận Vào +20%",
  "★ Tăng Lượng Zen & May Mắn Nhặt Ngọc +30%"
];

function generateWingItem(tier = null, forceRarity = null, isFodder = false) {
  const t = tier || (state.equipped && state.equipped.wings ? state.equipped.wings.tier : 5);
  const tierIndex = Math.max(0, Math.min(9, t - 1));
  const rIdx = forceRarity !== null ? forceRarity : (Math.random() < 0.25 ? 5 : (Math.random() < 0.55 ? 4 : 3));
  const rarityObj = RARITIES[rIdx] || RARITIES[3];

  const wingNames = [
    "Cánh Hỗn Nguyên",
    "Cánh Tinh Thể",
    "Cánh Rồng Lửa",
    "Cánh Bão Tố",
    "Cánh Vô Tận",
    "Cánh Ảo Ảnh",
    "Cánh Thần Ma"
  ];
  const namePrefix = isFodder ? "Phôi " : "";
  const baseName = namePrefix + wingNames[Math.min(wingNames.length - 1, Math.floor(tierIndex / 1.5))];
  const baseMult = (tierIndex + 1) * 1.6;

  const rawAtk = Math.floor((Math.random() * 300 + 1200) * (baseMult / 5));
  const rawDef = Math.floor((Math.random() * 200 + 900) * (baseMult / 5));
  const rawHp = Math.floor((Math.random() * 3000 + 10000) * (baseMult / 5));

  const pool = [...WING_SPECIFIC_OPTIONS, ...OPTION_POOL];
  const shuffled = pool.sort(() => 0.5 - Math.random());
  const options = shuffled.slice(0, Math.min(3, rarityObj.optCount));

  return {
    id: Math.random().toString(36).substring(2, 9),
    name: baseName,
    slotKey: "wings",
    tier: tierIndex + 1,
    rarity: rIdx,
    plus: 0,
    atk: rawAtk,
    def: rawDef,
    hp: rawHp,
    options,
    fusionCount: 0,
    isFodder
  };
}

function generatePetItem(tier = null, forceRarity = null, isFodder = false) {
  const t = tier || (state.equipped && state.equipped.pet ? state.equipped.pet.tier : 4);
  const tierIndex = Math.max(0, Math.min(9, t - 1));
  const rIdx = forceRarity !== null ? forceRarity : (Math.random() < 0.25 ? 5 : (Math.random() < 0.55 ? 4 : 3));
  const rarityObj = RARITIES[rIdx] || RARITIES[3];

  const petPool = [
    { name: "Tiểu Ác Ma", petKey: "satan" },
    { name: "Thiên Thần Hộ Mệnh", petKey: "angel" },
    { name: "Chiến Lang Fenrir", petKey: "fenrir" },
    { name: "Thần Thú Kỳ Lân", petKey: "kirin" }
  ];
  const picked = petPool[Math.floor(Math.random() * petPool.length)];
  const namePrefix = isFodder ? "Phôi " : "";
  const baseMult = (tierIndex + 1) * 1.5;

  const rawAtk = Math.floor((Math.random() * 250 + 950) * (baseMult / 4));
  const rawDef = Math.floor((Math.random() * 180 + 750) * (baseMult / 4));
  const rawHp = Math.floor((Math.random() * 2500 + 8500) * (baseMult / 4));

  const pool = [...PET_SPECIFIC_OPTIONS, ...OPTION_POOL];
  const shuffled = pool.sort(() => 0.5 - Math.random());
  const options = shuffled.slice(0, Math.min(3, rarityObj.optCount));

  return {
    id: Math.random().toString(36).substring(2, 9),
    name: namePrefix + picked.name,
    slotKey: "pet",
    petKey: picked.petKey,
    tier: tierIndex + 1,
    rarity: rIdx,
    plus: 0,
    atk: rawAtk,
    def: rawDef,
    hp: rawHp,
    options,
    fusionCount: 0,
    isFodder
  };
}

// INVENTORY & ITEM DROP ENGINE (PRIORITIZING HIGHER RARITY)

// ==================== CƠ CHẾ DUNG HỢP x100 ĐỘT PHÁ NÂNG PHẨM CẤP ====================
function checkItemRarityUpgrade(targetItem, oldFusionCount, newFusionCount) {
  if (!targetItem) return;
  const oldMilestones = Math.floor((oldFusionCount || 0) / 100);
  const newMilestones = Math.floor((newFusionCount || 0) / 100);

  if (newMilestones > oldMilestones) {
    const times = newMilestones - oldMilestones;
    for (let i = 0; i < times; i++) {
      if (targetItem.rarity < RARITIES.length - 1) {
        targetItem.rarity++;
      }
      // Tăng đột phá +25% chỉ số cơ bản trang bị
      targetItem.atk = Math.floor((targetItem.atk || 0) * 1.25);
      targetItem.def = Math.floor((targetItem.def || 0) * 1.25);
      targetItem.hp = Math.floor((targetItem.hp || 0) * 1.25);

      // Thêm 1 dòng hoàn hảo mới nếu chưa đầy
      if (!targetItem.options) targetItem.options = [];
      const pool = targetItem.slotKey === "wings" ? [...WING_SPECIFIC_OPTIONS, ...OPTION_POOL] :
                   (targetItem.slotKey === "pet" ? [...PET_SPECIFIC_OPTIONS, ...OPTION_POOL] : OPTION_POOL);
      const availableOpts = pool.filter(opt => !targetItem.options.includes(opt));
      const maxOpts = (RARITIES[targetItem.rarity] && RARITIES[targetItem.rarity].optCount) || 6;
      if (availableOpts.length > 0 && targetItem.options.length < maxOpts) {
        const newOpt = availableOpts[Math.floor(Math.random() * availableOpts.length)];
        targetItem.options.push(newOpt);
      }
    }

    const newRarityObj = RARITIES[targetItem.rarity] || RARITIES[RARITIES.length - 1];
    audio.playGateOpen();
    audio.playKeng();
    audio.vibrate(300);
    spawnHeroFloatingEffect(`🌟 ĐỘT PHÁ [${newRarityObj.name}]!`, "float-crit");
    addLog(`🌟 [ĐỘT PHÁ PHẨM CẤP x${newFusionCount}] [${targetItem.name}] đã đạt mốc Dung Hợp x${newFusionCount}, TỰ ĐỘNG NÂNG LÊN PHẨM CẤP [${newRarityObj.name}] (+25% Công, Thủ, HP & Kích hoạt Dòng Hoàn Hảo mới)! 🌟`, "log-crit");
  }
}

function handleDroppedItem(droppedItem) {
  if (!droppedItem) return;
  const slotKey = droppedItem.slotKey;
  const currentItem = state.equipped[slotKey];

  if (!currentItem) {
    droppedItem.fusionCount = 0;
    state.equipped[slotKey] = droppedItem;
    if (slotKey === "pet" && droppedItem.petKey) {
      state.activePet = droppedItem.petKey;
    }
    const labelType = slotKey === "wings" ? "CÁNH THẦN" : (slotKey === "pet" ? "LINH THÚ" : "TRANG BỊ MỚI");
    addLog(`✨ [${labelType}] Đã tự động trang bị [${droppedItem.name}] (CP: ${getItemCP(droppedItem).toLocaleString()})!`, "log-equip");
    audio.playKeng();
    updateUI();
    return;
  }

  const newCP = getItemCP(droppedItem);
  const oldCP = getItemCP(currentItem);

  if (droppedItem.isFodder || newCP <= oldCP) {
    // CP thấp hơn hoặc là Phôi Dung Hợp -> Dung hợp vào trang bị cũ!
    const absorbedAtk = Math.max(1, Math.floor((droppedItem.atk || 0) * 0.15));
    const absorbedDef = Math.max(1, Math.floor((droppedItem.def || 0) * 0.15));
    const absorbedHp = Math.max(5, Math.floor((droppedItem.hp || 0) * 0.15));

    const oldFusion = currentItem.fusionCount || 0;
    currentItem.atk = (currentItem.atk || 0) + absorbedAtk;
    currentItem.def = (currentItem.def || 0) + absorbedDef;
    currentItem.hp = (currentItem.hp || 0) + absorbedHp;
    currentItem.fusionCount = oldFusion + 1;

    // Tự động kiểm tra và nâng phẩm cấp khi đạt mốc x100 dung hợp
    checkItemRarityUpgrade(currentItem, oldFusion, currentItem.fusionCount);

    // Dung hợp dòng hoàn hảo nếu còn chỗ (tối đa 6 dòng)
    let newOptionsAdded = [];
    if (droppedItem.options && droppedItem.options.length > 0) {
      if (!currentItem.options) currentItem.options = [];
      droppedItem.options.forEach(opt => {
        if (!currentItem.options.includes(opt) && currentItem.options.length < 6) {
          currentItem.options.push(opt);
          newOptionsAdded.push(opt);
        }
      });
    }

    const postCP = getItemCP(currentItem);
    const cpGain = Math.max(1, postCP - oldCP);

    let logTag = "TRANG BỊ";
    let floatText = `🔮 DUNG HỢP! +${cpGain} CP`;
    if (slotKey === "wings") {
      logTag = "CÁNH THẦN";
      floatText = `🪽 DUNG HỢP CÁNH! +${cpGain} CP`;
    } else if (slotKey === "pet") {
      logTag = "LINH THÚ";
      floatText = `🐺 DUNG HỢP LINH THÚ! +${cpGain} CP`;
    }

    spawnHeroFloatingEffect(floatText, "float-crit");
    const optDesc = newOptionsAdded.length > 0 ? ` Thêm dòng: [${newOptionsAdded.join(", ")}]!` : "";
    addLog(`🔮 [DUNG HỢP ${logTag}] Dung hợp [${droppedItem.name}] vào [${currentItem.name}] (Cộng dồn x${currentItem.fusionCount})! +${absorbedAtk} Công, +${absorbedDef} Thủ, +${absorbedHp} HP${optDesc} (+${cpGain.toLocaleString()} CP)!`, "log-buff");
    audio.playAnvil();
  } else {
    // Trang bị cũ thấp hơn -> Mặc trang bị mới & Dung hợp tinh hoa trang bị cũ vào!
    droppedItem.plus = Math.max(droppedItem.plus || 0, currentItem.plus || 0);

    const absorbedAtk = Math.max(1, Math.floor((currentItem.atk || 0) * 0.15));
    const absorbedDef = Math.max(1, Math.floor((currentItem.def || 0) * 0.15));
    const absorbedHp = Math.max(5, Math.floor((currentItem.hp || 0) * 0.15));

    const oldFusion = droppedItem.fusionCount || 0;
    droppedItem.atk = (droppedItem.atk || 0) + absorbedAtk;
    droppedItem.def = (droppedItem.def || 0) + absorbedDef;
    droppedItem.hp = (droppedItem.hp || 0) + absorbedHp;
    droppedItem.fusionCount = (currentItem.fusionCount || 0) + oldFusion + 1;

    // Tự động kiểm tra và nâng phẩm cấp khi đạt mốc x100 dung hợp
    checkItemRarityUpgrade(droppedItem, oldFusion, droppedItem.fusionCount);

    // Kế thừa dòng hoàn hảo
    if (!droppedItem.options) droppedItem.options = [];
    if (currentItem.options && currentItem.options.length > 0) {
      currentItem.options.forEach(opt => {
        if (!droppedItem.options.includes(opt) && droppedItem.options.length < 6) {
          droppedItem.options.push(opt);
        }
      });
    }

    state.equipped[slotKey] = droppedItem;
    if (slotKey === "pet" && droppedItem.petKey) {
      state.activePet = droppedItem.petKey;
    }
    const finalCP = getItemCP(droppedItem);
    const cpGain = Math.max(1, finalCP - oldCP);

    let floatText = "✨ TIẾN HÓA & DUNG HỢP!";
    if (slotKey === "wings") floatText = "🪽 TIẾN HÓA CÁNH THẦN!";
    else if (slotKey === "pet") floatText = "🐺 TIẾN HÓA LINH THÚ!";

    spawnHeroFloatingEffect(floatText, "float-crit");
    addLog(`✨ [ĐỔI MỚI & DUNG HỢP] Đã mặc [${droppedItem.name} +${droppedItem.plus}] và dung hợp toàn bộ tinh hoa từ [${currentItem.name}] (Cộng dồn x${droppedItem.fusionCount}) (+${cpGain.toLocaleString()} CP)!`, "log-crit");
    audio.playKeng();
  }
  updateUI();
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

function sellAllInventory() {
  if (!state.inventory || state.inventory.length === 0) {
    addLog("Túi đồ hiện đang trống, không có trang bị để bán!", "log-norm");
    return;
  }

  const count = state.inventory.length;
  let totalZen = 0;
  for (let i = 0; i < state.inventory.length; i++) {
    totalZen += getItemSellPrice(state.inventory[i]);
  }

  const confirmed = confirm(`Bạn có chắc muốn BÁN TẤT CẢ ${count} món trang bị trong túi đồ để thu về +${totalZen.toLocaleString()} Zen không?`);
  if (!confirmed) return;

  state.zen += totalZen;
  state.inventory = [];
  state.selectedInventoryIndex = null;

  audio.playKeng();
  audio.vibrate(120);
  addLog(`💰 [BÁN TẤT CẢ] Đã bán toàn bộ ${count} trang bị trong túi đồ thu về +${totalZen.toLocaleString()} Zen!`, "log-zen");

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
  const baseStr = Number(state.stats && state.stats.str) || 0;
  const baseAgi = Number(state.stats && state.stats.agi) || 0;
  const baseVit = Number(state.stats && state.stats.vit) || 0;
  const baseEne = Number(state.stats && state.stats.ene) || 0;

  // Direct Level Stat Growth
  const lvlBonus = Math.max(0, (Number(state.level) || 1) - 1);
  const lvlHp = lvlBonus * 35;
  const lvlMp = lvlBonus * 18;
  const lvlPhy = lvlBonus * 5.0;
  const lvlMag = lvlBonus * 5.0;
  const lvlDef = lvlBonus * 3.0;

  let rawPhy = baseStr * 3.2 + baseAgi * 0.5 + lvlPhy;
  let rawMag = baseEne * 3.8 + baseStr * 0.3 + lvlMag;
  let rawDef = baseAgi * 2.0 + baseStr * 0.4 + lvlDef;
  let maxHp = baseVit * 28 + 400 + lvlHp;
  let maxMp = baseEne * 18 + 200 + lvlMp;

  let gearAtk = 0;
  let gearDef = 0;
  let gearHp = 0;

  let setTierCounts = {};
  if (state.equipped && typeof state.equipped === "object") {
    for (const slotKey in state.equipped) {
      const item = state.equipped[slotKey];
      if (item && typeof item === "object") {
        const plus = Number(item.plus) || 0;
        const atk = Number(item.atk) || 0;
        const def = Number(item.def) || 0;
        const hp = Number(item.hp) || 0;
        const mult = 1 + plus * 0.12;

        gearAtk += atk * mult;
        gearDef += def * mult;
        gearHp += hp * mult;

        if (["helm", "armor", "gloves", "boots"].includes(slotKey) && item.tier) {
          setTierCounts[item.tier] = (setTierCounts[item.tier] || 0) + 1;
        }
      }
    }
  }

  // Distribute gear attack by class (DK, DW, FE)
  if (state.charClass === "dw") {
    rawMag += gearAtk * 0.90;
    rawPhy += gearAtk * 0.20;
  } else if (state.charClass === "fe") {
    rawPhy += gearAtk * 0.75;
    rawMag += gearAtk * 0.35;
  } else {
    rawPhy += gearAtk * 0.85;
    rawMag += gearAtk * 0.20;
  }

  rawDef += gearDef;
  maxHp += gearHp;

  // Multi-tier Set Bonus (2, 4, 6, 8 pieces)
  let activeSetTier = null;
  for (const t in setTierCounts) {
    const count = setTierCounts[t];
    if (count >= 2) {
      activeSetTier = t;
      if (count >= 8) {
        rawPhy *= 1.35; rawMag *= 1.35; rawDef *= 1.35; maxHp *= 1.35;
      } else if (count >= 6) {
        rawPhy *= 1.25; rawMag *= 1.25; rawDef *= 1.25; maxHp *= 1.25;
      } else if (count >= 4) {
        rawPhy *= 1.15; rawMag *= 1.15; rawDef *= 1.20; maxHp *= 1.20;
      } else if (count >= 2) {
        rawPhy *= 1.08; rawMag *= 1.08; rawDef *= 1.10;
      }
      break;
    }
  }

  // Permanent Reset (RS) Stat Scaling
  const rsBonus = (Number(state.rs) || 0) * 150;
  rawPhy += rsBonus * 2.0;
  rawMag += rsBonus * 2.0;
  rawDef += rsBonus * 1.5;
  maxHp += rsBonus * 12;

  // Super Rebirth Multiplier
  const srsMult = 1 + (Number(state.srs) || 0) * 0.5;
  rawPhy *= srsMult;
  rawMag *= srsMult;
  rawDef *= srsMult;
  maxHp *= srsMult;

  // Skill Level Stat Scaling
  const totalSkillLevels = (state.skills || []).reduce((acc, s) => acc + (Number(s && s.level) || 0), 0);
  rawPhy += totalSkillLevels * 8;
  rawMag += totalSkillLevels * 8;
  rawDef += totalSkillLevels * 5;
  maxHp += totalSkillLevels * 40;

  // Active Pet & Wing Fusion Multipliers
  const petFusionCount = Number(state.equipped && state.equipped.pet && state.equipped.pet.fusionCount) || 0;
  const wingFusionCount = Number(state.equipped && state.equipped.wings && state.equipped.wings.fusionCount) || 0;
  const petBoost = 1 + petFusionCount * 0.03;

  if (state.activePet === "angel") {
    maxHp *= 1.20 * petBoost;
    rawDef *= 1.20 * petBoost;
  } else if (state.activePet === "satan") {
    rawPhy *= 1.25 * petBoost;
    rawMag *= 1.25 * petBoost;
  } else if (state.activePet === "fenrir") {
    rawPhy *= 1.20 * petBoost;
    rawMag *= 1.20 * petBoost;
    rawDef *= 1.15 * petBoost;
  } else if (state.activePet === "fairy") {
    rawPhy *= 1.12 * petBoost;
    rawMag *= 1.12 * petBoost;
  } else if (state.activePet === "phoenix") {
    rawMag *= 1.30 * petBoost;
    rawPhy *= 1.15 * petBoost;
  } else if (state.activePet === "drake") {
    rawPhy *= 1.25 * petBoost;
    rawMag *= 1.25 * petBoost;
  } else if (state.activePet === "kirin") {
    rawPhy *= 1.40 * petBoost;
    rawMag *= 1.40 * petBoost;
    rawDef *= 1.30 * petBoost;
    maxHp *= 1.30 * petBoost;
  }

  // Wing Fusion Global Stat Boost
  if (wingFusionCount > 0) {
    const wingBoost = 1 + wingFusionCount * 0.04;
    rawPhy *= wingBoost;
    rawMag *= wingBoost;
    rawDef *= wingBoost;
    maxHp *= wingBoost;
  }

  // Skill Level CP Bonus
  let skillBonusCP = 0;
  if (state.skills && Array.isArray(state.skills)) {
    state.skills.forEach(sk => {
      skillBonusCP += (Number(sk && sk.level) || 0) * 120;
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

  // STABLE BASE COMBAT POWER (Always valid positive integer)
  let cp = Math.floor(rawPhy * 1.5 + rawMag * 1.5 + rawDef * 1.4 + maxHp * 0.35 + (critRate + dodgeRate) * 25 + skillBonusCP + lvlBonus * 40);
  if (!isFinite(cp) || isNaN(cp) || cp <= 0) {
    cp = 100;
  }

  return {
    minPhy: isFinite(minPhy) ? minPhy : 10,
    maxPhy: isFinite(maxPhy) ? maxPhy : 20,
    minMag: isFinite(minMag) ? minMag : 10,
    maxMag: isFinite(maxMag) ? maxMag : 20,
    totalDef: isFinite(rawDef) ? Math.floor(rawDef) : 10,
    maxHp: isFinite(maxHp) ? Math.floor(maxHp) : 500,
    maxMp: isFinite(maxMp) ? Math.floor(maxMp) : 200,
    hpRegen,
    mpRegen,
    dodgeRate,
    critRate,
    dmgReduction,
    cp,
    activeSetTier
  };
}

function startCombatLoop() {
  if (combatInterval) clearInterval(combatInterval);
  combatInterval = setInterval(() => { runCombatTick(); }, 500);
}

function runCombatTick() {
  const currentMap = MAPS.find(m => m.id === state.currentMapId) || MAPS[0];
  const stats = calculateStats();

  // Multi-Events Active Ticks
  if (state.bloodCastle && state.bloodCastle.inEvent) {
    state.bloodCastle.timeLeft -= 0.5;
    state.bloodCastle.kills++;
    const timerTxt = document.getElementById("txtBcTimer");
    const killsTxt = document.getElementById("txtBcKills");
    if (timerTxt) timerTxt.innerText = `⏱️ ${Math.ceil(state.bloodCastle.timeLeft)}s`;
    if (killsTxt) killsTxt.innerText = state.bloodCastle.kills;
    if (state.bloodCastle.kills >= 30) { finishBloodCastle(true); return; }
    if (state.bloodCastle.timeLeft <= 0) { finishBloodCastle(false); return; }
  }

  if (state.events) {
    const ds = state.events.devilSquare;
    if (ds && ds.inEvent) {
      ds.timeLeft -= 0.5;
      ds.kills++;
      const timerTxt = document.getElementById("txtBcTimer");
      const killsTxt = document.getElementById("txtBcKills");
      if (timerTxt) timerTxt.innerText = `⏱️ ${Math.ceil(ds.timeLeft)}s`;
      if (killsTxt) killsTxt.innerText = ds.kills;
      if (ds.kills >= 40) { finishDevilSquare(true); return; }
      if (ds.timeLeft <= 0) { finishDevilSquare(false); return; }
    }

    const cc = state.events.chaosCastle;
    if (cc && cc.inEvent) {
      cc.timeLeft -= 0.5;
      cc.kills++;
      const timerTxt = document.getElementById("txtBcTimer");
      const killsTxt = document.getElementById("txtBcKills");
      if (timerTxt) timerTxt.innerText = `⏱️ ${Math.ceil(cc.timeLeft)}s`;
      if (killsTxt) killsTxt.innerText = cc.kills;
      if (cc.kills >= 25) { finishChaosCastle(true); return; }
      if (cc.timeLeft <= 0) { finishChaosCastle(false); return; }
    }

    const gd = state.events.goldenDragon;
    if (gd && gd.inEvent) {
      gd.timeLeft -= 0.5;
      const dmg = Math.floor(stats.cp * 0.8 + Math.random() * 5000);
      gd.bossHp = Math.max(0, gd.bossHp - dmg);
      const timerTxt = document.getElementById("txtBcTimer");
      const killsTxt = document.getElementById("txtBcKills");
      if (timerTxt) timerTxt.innerText = `⏱️ ${Math.ceil(gd.timeLeft)}s`;
      if (killsTxt) killsTxt.innerText = `${Math.floor((gd.bossHp / gd.maxHp) * 100)}%`;
      if (gd.bossHp <= 0) { finishGoldenDragon(true); return; }
      if (gd.timeLeft <= 0) { finishGoldenDragon(false); return; }
    }

    const wb = state.events.worldBoss;
    if (wb && wb.inEvent) {
      wb.timeLeft -= 0.5;
      const dmg = Math.floor(stats.cp * 0.6 + Math.random() * 8000);
      wb.bossHp = Math.max(0, wb.bossHp - dmg);
      const timerTxt = document.getElementById("txtBcTimer");
      const killsTxt = document.getElementById("txtBcKills");
      if (timerTxt) timerTxt.innerText = `⏱️ ${Math.ceil(wb.timeLeft)}s`;
      if (killsTxt) killsTxt.innerText = `${Math.floor((wb.bossHp / wb.maxHp) * 100)}%`;
      if (wb.bossHp <= 0) { finishWorldBoss(true); return; }
      if (wb.timeLeft <= 0) { finishWorldBoss(false); return; }
    }
  }

  // Track Daily Quests Mobs
  initQuestsState();
  if (state.quests && state.quests.daily && state.quests.daily.killMobs) {
    state.quests.daily.killMobs.cur++;
  }

    // Auto Tower Climb Check
  if (state.autoTower && Math.random() < 0.08) {
    const tFloor = state.towerFloor || 1;
    const tBoss = getTowerBossData(tFloor);
    if (stats.cp >= tBoss.reqCp * 0.90) {
      challengeTowerBoss(true);
    }
  }

// Natural Regeneration
  let petHpRegen = state.activePet === "angel" ? 120 : 0;
  const currentHpRegen = (stats.hpRegen + petHpRegen) * (state.buffs && state.buffs.fortitude > 0 ? 1.5 : 1.0);
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

  // 7 Monster Ranks Persistence & 10x HP System
  if (!state.currentMob || state.currentMob.tier !== currentMap.tier) {
    const rank = rollMonsterRank(state.mobsKilled);
    let rawMobName = "";

    if (rank.key === "mythical") {
      rawMobName = `${currentMap.boss} Thức Tỉnh`;
    } else if (rank.key === "legendary") {
      rawMobName = `${currentMap.boss}`;
    } else if (rank.key === "overlord") {
      rawMobName = `Thống Soái ${currentMap.boss}`;
    } else if (rank.key === "golden") {
      const rName = currentMap.mobs[Math.floor(Math.random() * currentMap.mobs.length)];
      rawMobName = `${rName} Hoàng Kim`;
    } else if (rank.key === "dark_gold") {
      const rName = currentMap.mobs[Math.floor(Math.random() * currentMap.mobs.length)];
      rawMobName = `${rName} Ám Kim`;
    } else if (rank.key === "elite") {
      const rName = currentMap.mobs[Math.floor(Math.random() * currentMap.mobs.length)];
      rawMobName = `${rName} Đột Biến`;
    } else {
      rawMobName = currentMap.mobs[Math.floor(Math.random() * currentMap.mobs.length)];
    }

    const fullMobName = `${rank.prefix} ${rawMobName}`;
    const maxMobHp = Math.floor((currentMap.tier * 220 + 120) * rank.hpMult);

    state.currentMob = {
      name: fullMobName,
      rawName: rawMobName,
      rank: rank,
      category: rank.key,
      mult: rank.dmgMult,
      maxHp: maxMobHp,
      currentHp: maxMobHp,
      tier: currentMap.tier
    };

    if (rank.key === "mythical" || rank.key === "legendary") {
      audio.playGateOpen();
      audio.playKeng();
      addLog(`⚡⚡ [CẢNH BÁO] QUÁI VẬT ${rank.name.toUpperCase()} [${fullMobName}] ĐÃ XUẤT HIỆN! ⚡⚡`, "log-boss");
    }
  }

  const mobName = state.currentMob.name;
  const mobRank = state.currentMob.rank;
  const mobCategory = mobRank.key;
  const mobMult = mobRank.dmgMult;
  const mobColorClass = mobRank.colorClass;

  // Update Chibi Arena Visuals with Rank
  updateChibiArena(currentMap, mobName, mobRank);

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

  // Active Skill Trigger (38% chance when MP >= 15)
  let activeSkill = null;
  const availableSkills = (state.skills || []).filter(sk => sk.level > 0 && sk.baseMult > 1.0);
  if (availableSkills.length > 0 && Math.random() < 0.38 && state.currentMp >= 15) {
    activeSkill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
    state.currentMp = Math.max(0, state.currentMp - 15);
  }

  let skillMult = 1.0;
  if (activeSkill) {
    skillMult = activeSkill.baseMult + (activeSkill.level - 1) * 0.15;
  }

  let rolledPhy = Math.floor(Math.random() * (stats.maxPhy - stats.minPhy + 1) + stats.minPhy);
  let rolledMag = Math.floor(Math.random() * (stats.maxMag - stats.minMag + 1) + stats.minMag);

  if (activeSkill) {
    if (state.charClass === "dw") rolledMag = Math.floor(rolledMag * skillMult);
    else rolledPhy = Math.floor(rolledPhy * skillMult);
  }

  if (state.buffs.berserk > 0) rolledPhy = Math.floor(rolledPhy * 1.35);
  if (state.buffs.manaShield > 0) rolledMag = Math.floor(rolledMag * 1.30);
  if (state.enemyDebuffs.armorBreak > 0) {
    rolledPhy = Math.floor(rolledPhy * 1.35);
    rolledMag = Math.floor(rolledMag * 1.20);
  }

  const finalPhy = Math.floor(rolledPhy * critMult);
  const finalMag = Math.floor(rolledMag * critMult);

  // Trigger Chibi Attack FX, Deal Damage to Monster, Update HP Bar
  const totalHeroDmg = finalPhy + finalMag;
  state.currentMob.currentHp -= totalHeroDmg;

  const curMobHp = Math.max(0, state.currentMob.currentHp);
  const maxMobHp = state.currentMob.maxHp;
  const mobHpPct = Math.max(0, Math.min(100, (curMobHp / maxMobHp) * 100));
  const mobHpFillEl = document.getElementById("chibiMobHpFill");
  const mobHpTextEl = document.getElementById("chibiMobHpText");
  if (mobHpFillEl) mobHpFillEl.style.width = `${mobHpPct}%`;
  if (mobHpTextEl) mobHpTextEl.innerText = `HP: ${Math.ceil(curMobHp).toLocaleString()} / ${maxMobHp.toLocaleString()} (${mobHpPct.toFixed(0)}%)`;

  const bossHpFill = document.getElementById("mapleBossHpFill");
  const bossHpNum = document.getElementById("mapleBossHpNum");
  if (bossHpFill) bossHpFill.style.width = `${mobHpPct}%`;
  if (bossHpNum) bossHpNum.innerText = `${Math.ceil(curMobHp).toLocaleString()} / ${maxMobHp.toLocaleString()} (${mobHpPct.toFixed(0)}%)`;

  if (activeSkill) {
    animateHeroAction("cast");
    const skillFxType = state.charClass === "dw" ? "magic" : (state.charClass === "fe" ? "arrow" : "fire");
    playSlashFx(skillFxType, isCrit);
    if (state.charClass === "dw") audio.playMagic(); else audio.playSlash();
    addLog(`✨ [TUYỆT KỸ] ${activeSkill.icon} ${activeSkill.name.toUpperCase()} (Cấp ${activeSkill.level}) bùng nổ gây ${totalHeroDmg.toLocaleString()} ST lên ${mobName}!`, "log-crit");
    spawnFloatingSkillBanner(`${activeSkill.icon} ${activeSkill.name}`);
  } else {
    animateHeroAction(state.charClass === "dw" ? "cast" : "attack");
    const heroSlashType = state.charClass === "dw" ? "magic" : (state.charClass === "fe" ? "arrow" : "fire");
    playSlashFx(heroSlashType, isCrit);
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
  }
  animateMonsterReaction(false);
  spawnFloatingDamage(totalHeroDmg, state.charClass === "dw" ? "mag" : (isCrit ? "crit" : "phy"), isCrit);

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
    // Cap damage per hit to max 18% of Max HP (bỏ chết ngay lập tức)
    const maxAllowedDmg = Math.floor(stats.maxHp * 0.18);
    takenDmg = Math.min(takenDmg, maxAllowedDmg);
    takenDmg = Math.max(1, takenDmg);
    state.currentHp -= takenDmg;
    spawnHeroFloatingEffect(`-${takenDmg.toLocaleString()} HP`, "float-hit");
    addLog(`🛡 [BỊ ĐÁNH] ${mobName} phản kích, bạn nhận -${takenDmg.toLocaleString()} HP! (Giáp giảm ${Math.round(defMitigation * 100)}%)`, "log-damage-taken");

    // Auto-Potion Check
    checkAutoPotion(stats);

    // Immortal Ward: Hero never dies instantly or gets kicked to Lorencia
    if (state.currentHp <= 0) {
      state.currentHp = Math.floor(stats.maxHp * 0.5);
      spawnHeroFloatingEffect("🛡️ HỘ MỆNH BẤT TỬ!", "float-crit");
      addLog(`🛡️ [BẢO HỘ THÁNH] Sinh lực nguy kịch! Khiên thần hộ mệnh kích hoạt, hồi sinh 50% HP và tiếp tục chiến đấu!`, "log-buff");
      audio.playMagic();
      updateUI();
    }
  }

  if (state.currentMob.currentHp <= 0) {
    animateMonsterReaction(true);
    spawnMonsterDeathBurst();
    state.mobsKilled++;

    // Track Boss & Overlord Kills
    const isBossTier = ["overlord", "legendary", "mythical"].includes(mobCategory);
    if (isBossTier) {
      state.bossKilled = (state.bossKilled || 0) + 1;
      if (state.quests && state.quests.daily && state.quests.daily.killBosses) {
        state.quests.daily.killBosses.cur++;
      }
    }

    if (mobCategory === "mythical") {
      addLog(`🏆 [THẦN THOẠI DIỆT ĐẾ] Bạn đã đả bại quái vật [${mobName}] tối thượng!`, "log-crit");
      audio.playKeng();
      audio.vibrate(200);
    }

    // 1. Zen Drop according to 7 Ranks
    if (Math.random() < mobRank.zenChance) {
      const earnedZen = Math.floor((Math.random() * 200 + 150) * currentMap.tier * mobRank.zenMult * (1 + state.rs * 0.20));
      state.zen += earnedZen;
      spawnFloatingLoot("🪙", `+${earnedZen.toLocaleString()} Zen`, "#ffec8b");
      addLog(`🪙 [NHẶT ZEN] +${earnedZen.toLocaleString()} Zen!`, "log-zen");
    }

    // 2. Standard Balanced EXP Gain
    const earnedExp = Math.floor((Math.random() * 20 + 35) * currentMap.tier * mobRank.hpMult * 50); // EXP x50 BÙNG NỔ
    state.exp += earnedExp;

    // 3. Jewel & Potion Drops scaled by Rank
    const rollJewel = Math.random() * 100;
    const jewelBoost = mobRank.jewelBoost;

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

    // Potion drop chance
    if (Math.random() < 0.15) {
      if (Math.random() < 0.5) {
        state.potions.hp++;
        addLog(`🧪 Nhặt được 1x Bình Máu từ ${mobName}!`, "log-buff");
      } else {
        state.potions.mp++;
        addLog(`🧪 Nhặt được 1x Bình Mana từ ${mobName}!`, "log-buff");
      }
    }

    // 4. GEAR DROP: Trang bị vũ khí, giáp, nhẫn, dây chuyền
    if (Math.random() < mobRank.gearChance) {
      const droppedItem = generateItem(currentMap.tier, mobRank.minRarity, null, mobRank.key);
      spawnFloatingLoot("🎁", `[${droppedItem.name}]`, RARITIES[droppedItem.rarity].color);
      handleDroppedItem(droppedItem);
    }

    // 4c. RƠI CÁNH THẦN & LINH THÚ TỰ ĐỘNG DUNG HỢP TỪ BOSS VÀ TINH ANH
    if (mobRank.key === "boss" || mobRank.key === "golden" || (mobRank.key === "elite" && Math.random() < 0.15)) {
      if (Math.random() < 0.35) {
        const droppedWing = generateWingItem(currentMap.tier, mobRank.minRarity);
        spawnFloatingLoot("🪽", `[${droppedWing.name}]`, RARITIES[droppedWing.rarity].color);
        handleDroppedItem(droppedWing);
      } else if (Math.random() < 0.35) {
        const droppedPet = generatePetItem(currentMap.tier, mobRank.minRarity);
        spawnFloatingLoot("🐺", `[${droppedPet.name}]`, RARITIES[droppedPet.rarity].color);
        handleDroppedItem(droppedPet);
      }
    }

    // 4b. CRAFT MATERIALS DROP: RỚT THÊM NHIỀU LÔNG VŨ ĐỂ ÉP CÁNH
    const rollMat = Math.random() * 100;
    // Lông Vũ Chaos: Rơi từ Map 1 với tỷ lệ cực cao (25% quái thường, 60% Tinh Anh, 100% Boss)
    const featherRate = mobRank.key === "normal" ? 25.0 : (mobRank.key === "elite" ? 60.0 : 100.0);
    if (rollMat < featherRate) {
      const dropCount = (mobRank.key === "boss" || mobRank.key === "golden") ? Math.floor(Math.random() * 2) + 2 : 1;
      state.feather = (state.feather || 0) + dropCount;
      spawnFloatingLoot("🪶", `+${dropCount} Lông Vũ!`, "#7efff5");
      addLog(`🪶 Nhặt được ${dropCount}x Lông Vũ Chaos từ ${mobName}! (Nguyên liệu ép cánh)`, "log-buff");
    }
    if (rollMat < 20.0) {
      state.beastSoul = (state.beastSoul || 0) + 1;
      spawnFloatingLoot("🐾", "+1 Hồn Thú!", "#fdcb6e");
      addLog(`🐾 Nhặt được 1x Hồn Thú từ ${mobName}!`, "log-buff");
    }
    if (currentMap.tier >= 4 && rollMat < 8.0) {
      state.fenrirHorn = (state.fenrirHorn || 0) + 1;
      spawnFloatingLoot("🐺", "+1 Cốt Sừng Sói!", "#ff7675");
      addLog(`🐺 Nhặt được 1x Cốt Sừng Sói Tinh từ ${mobName}!`, "log-crit");
    }
    if (currentMap.tier >= 6 && rollMat < 6.0) {
      state.flame = (state.flame || 0) + 1;
      spawnFloatingLoot("🔥", "+1 Ngọn Lửa Condor!", "#ff9f43");
      addLog(`🔥 Nhặt được 1x Ngọn Lửa Condor từ ${mobName}!`, "log-crit");
    }
    if (isBossTier && Math.random() < 0.35) {
      state.kirinFragment = (state.kirinFragment || 0) + 1;
      spawnFloatingLoot("🦄", "+1 Mảnh Kỳ Lân!", "#f1c40f");
      addLog(`🦄 Nhặt được 1x Mảnh Kỳ Lân Hoàng Kim từ ${mobName}!`, "log-crit");
    }

    // 5. Level Up Check: CẤP ĐỘ GIỚI HẠN LÀ 400
    if (state.exp >= state.nextExp && state.level < 400) {
      let leveledUp = false;
      while (state.exp >= state.nextExp && state.level < 400) {
        state.exp -= state.nextExp;
        state.level++;
        state.nextExp = getRequiredExpForLevel(state.level);
        state.freePoints = (state.freePoints || 0) + 5;
        if (state.level % 5 === 0) {
          state.skillPoints = (state.skillPoints || 0) + 1;
        }
        leveledUp = true;
      }
      if (state.level >= 400) {
        state.level = 400;
        state.exp = state.nextExp;
      }
      if (leveledUp) {
        audio.playKeng();
        audio.vibrate(150);
        addLog(`★ LEVEL UP! Bạn đã đạt Cấp ${state.level}! Chỉ số cơ bản & Lực chiến đã tăng mạnh! ★`, "log-crit");
        if (state.autoStats !== false) {
          autoDistributeClass();
        }
        checkAutoAdvanceMap();
      }
    }
    if (state.level >= 400) {
      state.level = 400;
      state.exp = state.nextExp;
      if (state.autoRS) {
        checkAndPerformAutoRS();
      }
    }

    // Spawn new monster next tick
    state.currentMob = null;
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
  renderHeroSprite();
  
  // 1. Level, Name, RS
  const bxhMini = document.getElementById("bxhMiniText");
  if (bxhMini && typeof LEGEND_RANKS !== "undefined" && LEGEND_RANKS[0]) {
    bxhMini.innerText = `Top 1: ${LEGEND_RANKS[0].name} (${LEGEND_RANKS[0].rs} RS)`;
  }
  const autoRsBtn = document.getElementById("btnAutoRSToggle");
  if (autoRsBtn) {
    autoRsBtn.innerHTML = state.autoRS ? "🔄 Auto RS: <b style=\"color:#2ecc71;\">BẬT</b>" : "🔄 Auto RS: <b style=\"color:#e74c3c;\">TẮT</b>";
  }
  const chkAutoRsEl = document.getElementById("chkAutoRS");
  if (chkAutoRsEl) chkAutoRsEl.checked = !!state.autoRS;
  const chkAutoStatsEl = document.getElementById("chkAutoStats");
  if (chkAutoStatsEl) chkAutoStatsEl.checked = !!state.autoStats;

  const towerBadge = document.getElementById("txtTowerFloorBadge");
  if (towerBadge) towerBadge.innerText = `T.${state.towerFloor || 1}`;

  const eventTowerTxt = document.getElementById("eventTowerFloorTxt");
  if (eventTowerTxt) eventTowerTxt.innerText = `${state.towerFloor || 1}`;

  const shopZen = document.getElementById("shopZenDisplay");
  if (shopZen) shopZen.innerText = (state.zen || 0).toLocaleString();

  const heroLvEl = document.getElementById("heroLv");
  if (heroLvEl) heroLvEl.innerText = `Lv.${state.level}`;

  const avatarIcon = document.getElementById("heroAvatarIcon");
  if (avatarIcon) avatarIcon.innerText = state.charClass === "fe" ? "🏹" : (state.charClass === "dw" ? "🧙" : "⚔️");

  const petEl = document.getElementById("chibiPetEl");
  if (petEl) {
    initPetsState();
    petEl.innerHTML = PET_SVGS[state.activePet || "angel"] || "";
  }
  updateQuestNotificationDot();

  const heroNameEl = document.getElementById("heroName");
  if (heroNameEl) {
    const classTag = state.charClass === "fe" ? "FE Nữ" : (state.charClass === "dw" ? "DW Phép" : "DK Nam");
    heroNameEl.innerText = `${state.username} [${classTag}]`;
  }

  const heroRsEl = document.getElementById("heroRs");
  if (heroRsEl) heroRsEl.innerText = `(RS: ${state.rs}${state.srs > 0 ? " | S-RS: " + state.srs : ""})`;

  // 2. TOTAL CP (Guaranteed error-free format)
  const safeCP = Math.max(10, Math.floor(stats.cp || 0));
  const valTotalCP = document.getElementById("valTotalCP");
  if (valTotalCP) valTotalCP.innerText = `${safeCP.toLocaleString()} CP`;

  // 3. Physical & Magic Damage Sub-bar
  const subbarPhyDmg = document.getElementById("subbarPhyDmg");
  if (subbarPhyDmg) subbarPhyDmg.innerText = `⚔ Vật Lý: ${stats.minPhy.toLocaleString()} ~ ${stats.maxPhy.toLocaleString()}`;
  const subbarMagDmg = document.getElementById("subbarMagDmg");
  if (subbarMagDmg) subbarMagDmg.innerText = `🔮 Pháp Thuật: ${stats.minMag.toLocaleString()} ~ ${stats.maxMag.toLocaleString()}`;

  // 4. Map Badges
  const mapBadge = document.getElementById("currentMapBadge");
  const curMap = MAPS.find(m => m.id === state.currentMapId) || MAPS[0];
  if (mapBadge) mapBadge.innerText = `Map ${curMap.id}: ${curMap.name}`;

  // 5. HP & MP Bars
  const barHp = document.getElementById("barHpFill");
  const txtHp = document.getElementById("txtHpBar");
  if (barHp && txtHp) {
    const curHp = Math.min(stats.maxHp, Math.max(0, state.currentHp || stats.maxHp));
    const pct = Math.max(0, Math.min(100, Math.floor((curHp / stats.maxHp) * 100)));
    barHp.style.width = `${pct}%`;
    txtHp.innerText = `❤️ HP: ${curHp.toLocaleString()} / ${stats.maxHp.toLocaleString()}`;
  }

  const barMp = document.getElementById("barMpFill");
  const txtMp = document.getElementById("txtMpBar");
  if (barMp && txtMp) {
    const curMp = Math.min(stats.maxMp, Math.max(0, state.currentMp || stats.maxMp));
    const pct = Math.max(0, Math.min(100, Math.floor((curMp / stats.maxMp) * 100)));
    barMp.style.width = `${pct}%`;
    txtMp.innerText = `💙 MP: ${curMp.toLocaleString()} / ${stats.maxMp.toLocaleString()}`;
  }

  // 6. EXP Bar
  const barExp = document.getElementById("barExpFill");
  const txtExp = document.getElementById("txtExpBar");
  if (barExp && txtExp) {
    const expCur = state.exp || 0;
    const expNeed = state.nextExp || 100;
    const pct = Math.max(0, Math.min(100, Math.floor((expCur / expNeed) * 100)));
    barExp.style.width = `${pct}%`;
    txtExp.innerText = `EXP: ${expCur.toLocaleString()} / ${expNeed.toLocaleString()} (${pct}%)`;
  }

  // 7. Potion Counts
  const hpPotTxt = document.getElementById("txtCountHpPotion");
  const mpPotTxt = document.getElementById("txtCountMpPotion");
  if (hpPotTxt) hpPotTxt.innerText = state.potions.hp;
  if (mpPotTxt) mpPotTxt.innerText = state.potions.mp;

  // 8. TÍCH HỢP CHỈ SỐ PHỤ TRỰC TIẾP TRÊN MÀN HÌNH CHIẾN ĐẤU
  const bPhy = document.getElementById("battleStatPhyDmg");
  if (bPhy) bPhy.innerText = `${stats.minPhy.toLocaleString()} ~ ${stats.maxPhy.toLocaleString()}`;
  const bMag = document.getElementById("battleStatMagDmg");
  if (bMag) bMag.innerText = `${stats.minMag.toLocaleString()} ~ ${stats.maxMag.toLocaleString()}`;
  const bDef = document.getElementById("battleStatDef");
  if (bDef) bDef.innerText = `${stats.totalDef.toLocaleString()}`;
  const bDodge = document.getElementById("battleStatDodge");
  if (bDodge) bDodge.innerText = `${stats.dodgeRate}%`;
  const bCrit = document.getElementById("battleStatCrit");
  if (bCrit) bCrit.innerText = `${stats.critRate}%`;
  const bRed = document.getElementById("battleStatDmgRed");
  if (bRed) bRed.innerText = `${stats.dmgReduction}%`;
  const bHpReg = document.getElementById("battleStatHpRegen");
  if (bHpReg) bHpReg.innerText = `+${stats.hpRegen.toLocaleString()}/s`;
  const bMpReg = document.getElementById("battleStatMpRegen");
  if (bMpReg) bMpReg.innerText = `+${stats.mpRegen.toLocaleString()}/s`;

  const bStr = document.getElementById("bValStr");
  if (bStr) bStr.innerText = state.stats.str;
  const bAgi = document.getElementById("bValAgi");
  if (bAgi) bAgi.innerText = state.stats.agi;
  const bVit = document.getElementById("bValVit");
  if (bVit) bVit.innerText = state.stats.vit;
  const bEne = document.getElementById("bValEne");
  if (bEne) bEne.innerText = state.stats.ene;
  const bIgn = document.getElementById("bValIgnoreDef");
  if (bIgn) bIgn.innerText = `+${Math.min(40, Math.floor(state.stats.str / 150))}%`;
  const bDbl = document.getElementById("bValDoubleDmg");
  if (bDbl) bDbl.innerText = `+${Math.min(30, Math.floor(state.stats.agi / 200))}%`;

  const bFree = document.getElementById("valFreePointsBattle");
  if (bFree) bFree.innerText = (state.freePoints || 0).toLocaleString();

  // 9. Update Events Attempts in Events Tab
  const bcTabAtt = document.getElementById("txtBcAttemptsTab");
  if (bcTabAtt) bcTabAtt.innerText = `${state.bloodCastle ? state.bloodCastle.attempts : 3}/3`;
  const dsTabAtt = document.getElementById("txtDsAttemptsTab");
  if (dsTabAtt) dsTabAtt.innerText = `${state.events && state.events.devilSquare ? state.events.devilSquare.attempts : 3}/3`;
  const ccTabAtt = document.getElementById("txtCcAttemptsTab");
  if (ccTabAtt) ccTabAtt.innerText = `${state.events && state.events.chaosCastle ? state.events.chaosCastle.attempts : 3}/3`;
  const gdTabAtt = document.getElementById("txtGdAttemptsTab");
  if (gdTabAtt) gdTabAtt.innerText = `${state.events && state.events.goldenDragon ? state.events.goldenDragon.attempts : 3}/3`;
  const wbTabAtt = document.getElementById("txtWbAttemptsTab");
  if (wbTabAtt) wbTabAtt.innerText = `${state.events && state.events.worldBoss ? state.events.worldBoss.attempts : 3}/3`;


  // Paperdoll Avatar Slots
  SLOT_TYPES.forEach(s => {
    const el = document.getElementById(`slot-${s.key}`);
    if (!el) return;
    const item = state.equipped[s.key];
    const isSelected = state.selectedSlotKey === s.key && state.selectedInventoryIndex === null;
    const itemArt = item ? getItemIllustration(item, s.key) : (SVG_ICONS[s.key] || "");
    const aura = item ? getItemAuraClass(item.plus) : "";

    if (item && RARITIES[item.rarity]) {
      const r = RARITIES[item.rarity];
      el.className = `slot-card ${r.class} ${isSelected ? "selected" : ""} ${aura}`;
      el.style.borderColor = r.color;
      el.style.boxShadow = `0 0 8px ${r.color}66`;
      el.innerHTML = `
        <div class="slot-art-box">${itemArt}</div>
        <div class="slot-label">${s.name} ${item.fusionCount > 0 ? `<span style="color:#a29bfe; font-size:7.5px;">x${item.fusionCount}</span>` : ""}</div>
        <div class="slot-name" style="color:${r.color};">${item.name}</div>
        ${item.plus > 0 ? `<div class="slot-plus-badge">+${item.plus}</div>` : ""}
        ${item.fusionCount > 0 ? `<div class="slot-fusion-badge">x${item.fusionCount}</div>` : ""}
      `;
    } else {
      el.className = `slot-card empty-slot ${isSelected ? "selected" : ""}`;
      el.style.borderColor = "#242c3d";
      el.style.boxShadow = "none";
      el.innerHTML = `
        <div class="slot-art-box">${itemArt}</div>
        <div class="slot-label">${s.name}</div>
        <div class="slot-empty-text">Trống</div>
      `;
    }
  });

  // 10. Update Equipped Slots Grid in Gear tab
    renderSkillsView();
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
function openSkillsModal() {
  const m = document.getElementById("skillsModal");
  if (m) {
    m.style.display = "flex";
    renderSkillsView();
  }
}

function closeSkillsModal() {
  const m = document.getElementById("skillsModal");
  if (m) m.style.display = "none";
}

function renderSkillsView() {
  const container = document.getElementById("skillsListContainer");
  const statsContainer = document.getElementById("skillsListStatsContainer");
  const ptsModal = document.getElementById("txtSkillPointsModal");
  const ptsStats = document.getElementById("txtSkillPointsStats");
  const ptsQuick = document.getElementById("txtQuickSkillPts");
  const quickIconsRow = document.getElementById("quickSkillsIconsRow");

  const skillPts = state.skillPoints || 0;
  if (ptsModal) ptsModal.innerText = `${skillPts}đ`;
  if (ptsStats) ptsStats.innerText = `${skillPts}đ`;
  if (ptsQuick) ptsQuick.innerText = `${skillPts}đ`;

  if (!state.skills || state.skills.length === 0) {
    state.skills = getClassSkills(state.charClass);
  }

  // Render quick icons row in battle screen
  if (quickIconsRow) {
    let qHtml = "";
    state.skills.forEach(sk => {
      qHtml += `<div class="quick-skill-badge" title="${sk.name} (Cấp ${sk.level})">${sk.icon} <b>Lv.${sk.level}</b></div>`;
    });
    quickIconsRow.innerHTML = qHtml;
  }

  // Render skill cards for modals and stats tab
  let html = "";
  state.skills.forEach(sk => {
    const maxLv = sk.maxLevel || 50;
    const isMax = sk.level >= maxLv;
    const costPts = sk.costPts || 1;
    const costZen = sk.costZen || 10000;
    const canUp1 = !isMax && skillPts >= costPts && state.zen >= costZen;
    const canUp5 = !isMax && skillPts >= costPts * 5 && state.zen >= costZen * 5;
    const mult = (sk.baseMult + sk.level * 0.15).toFixed(2);

    html += `
      <div style="background:#131826; border:1px solid #29354d; border-radius:6px; padding:6px 8px; display:flex; justify-content:space-between; align-items:center; gap:6px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="font-size:22px; width:34px; height:34px; display:flex; align-items:center; justify-content:center; background:#1e273b; border-radius:6px; border:1px solid #3b4d70;">${sk.icon}</div>
          <div>
            <div style="font-size:11px; font-weight:bold; color:var(--gold);">${sk.name} <span style="font-size:9.5px; color:#74b9ff;">[Cấp ${sk.level}/${maxLv}]</span></div>
            <div style="font-size:8.5px; color:#8fa0b8; margin-top:1px;">${sk.desc}</div>
            <div style="font-size:9px; color:#00ffcc; margin-top:2px;">Sát thương: <b>x${mult}</b> • Tiêu hao: ${costPts}đ & ${costZen.toLocaleString()}z</div>
          </div>
        </div>
        <div style="display:flex; gap:3px;">
          <button class="btn btn-sm ${canUp1 ? "btn-success" : ""}" ${canUp1 ? "" : "disabled"} style="padding:4px 6px; font-weight:bold;" onclick="upgradeSkill('${sk.id}', 1)">+1</button>
          <button class="btn btn-sm ${canUp5 ? "btn-warn" : ""}" ${canUp5 ? "" : "disabled"} style="padding:4px 6px; font-weight:bold;" onclick="upgradeSkill('${sk.id}', 5)">+5</button>
          <button class="btn btn-sm ${canUp1 ? "btn-primary" : ""}" ${canUp1 ? "" : "disabled"} style="padding:4px 6px; font-weight:bold;" onclick="upgradeSkill('${sk.id}', 50)">MAX</button>
        </div>
      </div>
    `;
  });

  if (container) container.innerHTML = html;
  if (statsContainer) statsContainer.innerHTML = html;
}

function upgradeSkill(skillId, amount = 1) {
  const sk = (state.skills || []).find(s => s.id === skillId);
  if (!sk) return;
  const maxLv = sk.maxLevel || 50;
  if (sk.level >= maxLv) return;

  const costPts = sk.costPts || 1;
  const costZen = sk.costZen || 10000;

  let upgradedCount = 0;
  for (let i = 0; i < amount; i++) {
    if (sk.level >= maxLv) break;
    if ((state.skillPoints || 0) < costPts || state.zen < costZen) break;

    state.skillPoints -= costPts;
    state.zen -= costZen;
    sk.level++;
    upgradedCount++;
  }

  if (upgradedCount > 0) {
    audio.playMagic();
    audio.vibrate(80);
    addLog(`★ NÂNG CẤP KỸ NĂNG! [${sk.name}] đạt Cấp ${sk.level} (+${upgradedCount} cấp)! Sát thương & Lực chiến tăng vọt! ★`, "log-crit");
    renderSkillsView();
    updateUI();
    saveGameState();
  } else {
    addLog("Chưa đủ Điểm Kỹ Năng hoặc Zen để nâng cấp chiêu thức!", "log-boss");
  }
}

function autoDistributeSkillPoints() {
  if (!state.skills || state.skills.length === 0) return;
  if (!state.skillPoints || state.skillPoints <= 0) {
    addLog("Không có Điểm Kỹ Năng để phân phối!", "log-buff");
    return;
  }

  let totalUpgraded = 0;
  let safety = 200;
  while (state.skillPoints > 0 && safety > 0) {
    safety--;
    let canUp = false;
    for (const sk of state.skills) {
      const maxLv = sk.maxLevel || 50;
      const costPts = sk.costPts || 1;
      const costZen = sk.costZen || 10000;
      if (sk.level < maxLv && state.skillPoints >= costPts && state.zen >= costZen) {
        state.skillPoints -= costPts;
        state.zen -= costZen;
        sk.level++;
        totalUpgraded++;
        canUp = true;
      }
    }
    if (!canUp) break;
  }

  if (totalUpgraded > 0) {
    audio.playMagic();
    audio.vibrate(120);
    addLog(`★ TỰ ĐỘNG NÂNG CẤP: Đã tăng +${totalUpgraded} cấp độ kỹ năng đều cho toàn bộ chiêu thức! ★`, "log-crit");
    renderSkillsView();
    updateUI();
    saveGameState();
  } else {
    addLog("Không đủ Zen hoặc đã đạt cấp độ tối đa!", "log-buff");
  }
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


function openLeaderboardModal() {
  const m = document.getElementById("leaderboardModal");
  if (m) {
    m.style.display = "flex";
    renderLeaderboard();
  }
}

function closeLeaderboardModal() {
  const m = document.getElementById("leaderboardModal");
  if (m) m.style.display = "none";
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
        <div style="display:flex; align-items:center; gap:6px;">
          <div style="text-align:right; font-size:9.5px;">
            ${scoreDisplay}
          </div>
          ${!item.isPlayer ? `<button class="btn btn-sm btn-warn" onclick="challengePlayer(${idx})">⚔️ Đấu</button>` : ""}
        </div>
      </div>
    `;
  });

  listContainer.innerHTML = html;
}

// TABS SWITCHING (8 TABS)
function switchTab(tabId) {
  if (tabId === "map") tabId = "maps";
  if (tabId === "tower") tabId = "events";
  if (tabId === "stats" || tabId === "rebirth") tabId = "battle";
  if (tabId === "inventory" || tabId === "forge") tabId = "upgrade";
  if (tabId === "leaderboard") { openLeaderboardModal(); return; }

  const validTabs = ["battle", "maps", "events", "gear", "upgrade", "shop"];
  if (!validTabs.includes(tabId)) tabId = "battle";

  state.currentActiveTab = tabId;

  validTabs.forEach(s => {
    const screenEl = document.getElementById(`screen-${s}`);
    if (screenEl) screenEl.classList.toggle("active", s === tabId);
    const btn = document.getElementById(`tabBtn-${s}`);
    if (btn) btn.classList.toggle("active", s === tabId);
  });

  closeGearDetail();

  if (tabId === "battle") updateUI();
  if (tabId === "maps") renderMaps();
  if (tabId === "events") renderEventsView();
  if (tabId === "gear") updateUI();
  if (tabId === "upgrade") renderUpgradeView();
  if (tabId === "shop") renderShopView();
}

function selectSlot(slotKey) {
  state.selectedSlotKey = slotKey;
  state.selectedUpgradeKey = slotKey;
  const gearDetailBox = document.getElementById("gearDetailBox");
  if (gearDetailBox) gearDetailBox.style.display = "block";
  renderDetailPanel();
  updateUI();
}

function closeGearDetail() {
  const gearDetailBox = document.getElementById("gearDetailBox");
  if (gearDetailBox) gearDetailBox.style.display = "none";
}

function renderDetailPanel() {
  const dTitle = document.getElementById("dTitle");
  const dStats = document.getElementById("dStats");
  const dOptions = document.getElementById("dOptions");
  const dActions = document.getElementById("dActions");
  const showcase = document.getElementById("dItemShowcase");
  const gearDetailBox = document.getElementById("gearDetailBox");

  const item = state.equipped[state.selectedSlotKey || "mainWeapon"];

  if (!item) {
    if (dTitle) dTitle.innerText = "Chưa có trang bị";
    if (dStats) dStats.innerText = "Chạm vào ô trang bị trên mô hình người để xem chi tiết & dung hợp.";
    if (dOptions) dOptions.innerHTML = "";
    if (dActions) dActions.style.display = "none";
    if (showcase) showcase.style.display = "none";
    return;
  }

  if (gearDetailBox) gearDetailBox.style.display = "block";
  if (showcase && RARITIES[item.rarity]) {
    showcase.style.display = "flex";
    showcase.style.borderColor = RARITIES[item.rarity].color;
    showcase.innerHTML = getItemIllustration(item, item.slotKey);
  }

  const r = RARITIES[item.rarity] || RARITIES[0];
  const itemCP = getItemCP(item);

  if (dTitle) {
    dTitle.innerHTML = `<span style="color:${r.color}; font-weight:bold;">${item.name} +${item.plus}</span> (CP: ${itemCP.toLocaleString()})`;
  }
  if (dStats) {
    const fusionCount = Number(item.fusionCount) || 0;
    const fusionText = fusionCount > 0 ? ` • <b style="color:#a29bfe;">Dung Hợp x${fusionCount}</b>` : "";
    const nextMilestone = (Math.floor(fusionCount / 100) + 1) * 100;
    const remaining = nextMilestone - fusionCount;
    const milestoneInfo = ` • <span style="color:#f1c40f; font-size:8.5px;">(Tiến độ: ${fusionCount % 100}/100 - Còn ${remaining} lần dung hợp để nâng Phẩm Cấp [${RARITIES[Math.min(RARITIES.length - 1, item.rarity + 1)]?.name || 'Tối Thượng'}])</span>`;
    dStats.innerHTML = `[${r.name}] • Bậc ${item.tier} • Công: +${item.atk || 0} • Thủ: +${item.def || 0} • HP: +${item.hp || 0}${fusionText}${milestoneInfo}`;
  }
  if (dOptions) {
    if (item.options && item.options.length > 0) {
      dOptions.innerHTML = item.options.map(opt => `<span style="color:#55efc4;">★ ${opt}</span>`).join(" • ");
    } else {
      dOptions.innerHTML = "<span style='color:#8fa0b8;'>Đồ cơ bản chưa có dòng Hoàn Hảo</span>";
    }
  }
  if (dActions) {
    dActions.style.display = "flex";
  }
}

function renderMaps() {
  const container = document.getElementById("mapListContainer");
  if (!container) return;
  const chkAuto = document.getElementById("chkAutoMap");
  if (chkAuto) chkAuto.checked = !!state.autoAdvanceMap;

  let html = "";
  MAPS.forEach(m => {
    const isActive = m.id === state.currentMapId;
    const canEnter = state.level >= m.reqLv && (state.rs || 0) >= m.reqRs;
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
  const m = MAPS.find(x => x.id === mapId);
  if (!m) return;
  if (state.level < m.reqLv || (state.rs || 0) < m.reqRs) {
    addLog(`⛔ Chưa đủ điều kiện vào [${m.name}]! Yêu cầu: Lv.${m.reqLv} & Chuyển Sinh ${m.reqRs}!`, "log-damage-taken");
    audio.vibrate(80);
    return;
  }
  state.currentMapId = mapId;
  state.currentMob = null;
  addLog(`🚩 Di chuyển đến vùng đất [${m.name}]! Quái vật cấp ${m.tier} xuất hiện!`, "log-boss");
  audio.playGateOpen();
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
  if (!state.freePoints || state.freePoints <= 0) return;
  const pts = state.freePoints;

  if (state.charClass === "dw") {
    const pEne = Math.floor(pts * 0.6);
    const pAgi = Math.floor(pts * 0.2);
    const pVit = pts - pEne - pAgi;
    state.stats.ene = (state.stats.ene || 0) + pEne;
    state.stats.agi = (state.stats.agi || 0) + pAgi;
    state.stats.vit = (state.stats.vit || 0) + pVit;
  } else if (state.charClass === "fe") {
    const pAgi = Math.floor(pts * 0.55);
    const pStr = Math.floor(pts * 0.25);
    const pVit = pts - pAgi - pStr;
    state.stats.agi = (state.stats.agi || 0) + pAgi;
    state.stats.str = (state.stats.str || 0) + pStr;
    state.stats.vit = (state.stats.vit || 0) + pVit;
  } else {
    // dk
    const pStr = Math.floor(pts * 0.5);
    const pVit = Math.floor(pts * 0.35);
    const pAgi = pts - pStr - pVit;
    state.stats.str = (state.stats.str || 0) + pStr;
    state.stats.vit = (state.stats.vit || 0) + pVit;
    state.stats.agi = (state.stats.agi || 0) + pAgi;
  }

  state.freePoints = 0;
  addLog(`★ Tự động phân phối +${pts} điểm tiềm năng theo chuẩn Hệ Phái [${(state.charClass || "dk").toUpperCase()}] thành công!`, "log-crit");
  updateUI();
  saveGameState();
}

function autoDistributeEven() {
  if (!state.freePoints || state.freePoints <= 0) return;
  const share = Math.floor(state.freePoints / 4);
  if (share > 0) {
    state.stats.str = (state.stats.str || 0) + share;
    state.stats.agi = (state.stats.agi || 0) + share;
    state.stats.vit = (state.stats.vit || 0) + share;
    state.stats.ene = (state.stats.ene || 0) + share;
    state.freePoints -= share * 4;
  }
  updateUI();
  saveGameState();
}

function addStat(key, amount) {
  if (state.freePoints < amount) amount = state.freePoints;
  if (amount <= 0) return;
  state.stats[key] = (state.stats[key] || 0) + amount;
  state.freePoints -= amount;
  updateUI();
  saveGameState();
}

function toggleAutoStats() {
  const chk = document.getElementById("chkAutoStats");
  if (chk) {
    state.autoStats = chk.checked;
    if (state.autoStats && state.freePoints > 0) {
      autoDistributeClass();
    }
  }
  saveGameState();
}

function renderStatsView() {
  const freePointsEl = document.getElementById("statFreePoints");
  if (freePointsEl) freePointsEl.innerText = (state.freePoints || 0).toLocaleString();

  const strEl = document.getElementById("txtSTR");
  if (strEl) strEl.innerText = (state.stats.str || 0).toLocaleString();
  const agiEl = document.getElementById("txtAGI");
  if (agiEl) agiEl.innerText = (state.stats.agi || 0).toLocaleString();
  const vitEl = document.getElementById("txtVIT");
  if (vitEl) vitEl.innerText = (state.stats.vit || 0).toLocaleString();
  const eneEl = document.getElementById("txtENE");
  if (eneEl) eneEl.innerText = (state.stats.ene || 0).toLocaleString();

  const chk = document.getElementById("chkAutoStats");
  if (chk) chk.checked = state.autoStats !== false;
}

function toggleGender() {
  state.gender = state.gender === "male" ? "female" : "male";
  addLog(`Đã chuyển đổi hình dạng nhân vật thành [${state.gender === "male" ? "Nam" : "Nữ"}]!`, "log-crit");
  renderHeroSprite(true);
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

function performRebirth(isAuto = false) {
  const reqLv = Math.min(400, 300 + state.rs * 20);
  const reqZen = (state.rs + 1) * 2000000;
  const reqBless = Math.min(10, state.rs + 1);
  const reqChaos = Math.min(5, Math.floor(state.rs / 2));

  if (state.level < reqLv || state.zen < reqZen || state.bless < reqBless || state.chaos < reqChaos) {
    if (!isAuto) addLog("Chưa đủ điều kiện chuyển sinh! Cần đạt đủ Cấp, Zen và Ngọc tế lễ.", "log-boss");
    return false;
  }

  state.zen -= reqZen;
  state.bless -= reqBless;
  state.chaos -= reqChaos;
  state.rs++;
  state.level = 1;
  state.exp = 0;
  state.nextExp = getRequiredExpForLevel(1);

  // Bonus Points on RS
  const rsPoints = 500 + state.rs * 100;
  state.freePoints = (state.freePoints || 0) + rsPoints;
  state.skillPoints = (state.skillPoints || 0) + 5;

  if (state.autoStats !== false) {
    autoDistributeClass();
  }

  audio.playKeng();
  audio.vibrate(200);
  addLog(`★ CHÚC MỪNG! CHUYỂN SINH (RS) LẦN ${state.rs} THÀNH CÔNG! Nhận +${rsPoints} Điểm Tiềm Năng & +5 Điểm Kỹ Năng! ★`, "log-crit");
  updateUI();
  saveGameState();
  return true;
}

function checkAndPerformAutoRS() {
  if (state.level < 400) return;
  const reqZen = (state.rs + 1) * 2000000;
  const reqBless = Math.min(10, state.rs + 1);
  const reqChaos = Math.min(5, Math.floor(state.rs / 2));

  if (state.zen >= reqZen && state.bless >= reqBless && state.chaos >= reqChaos) {
    performRebirth(true);
  } else {
    if (Math.random() < 0.04) {
      addLog(`⏳ [AUTO RS] Đạt Lv.400! Đang tích lũy Zen (${state.zen.toLocaleString()}/${reqZen.toLocaleString()}) & Ngọc để tự động Chuyển Sinh...`, "log-buff");
    }
  }
}

function toggleAutoRS() {
  state.autoRS = !state.autoRS;
  const btn = document.getElementById("btnAutoRSToggle");
  if (btn) {
    btn.innerHTML = state.autoRS ? "🔄 Auto RS: <b style='color:#2ecc71;'>BẬT</b>" : "🔄 Auto RS: <b style='color:#e74c3c;'>TẮT</b>";
  }
  const chk = document.getElementById("chkAutoRS");
  if (chk) chk.checked = !!state.autoRS;
  addLog(`🔄 [AUTO RS] Chế độ Tự Động Chuyển Sinh (Auto RS) đã được ${state.autoRS ? "BẬT" : "TẮT"}!`, "log-buff");
  saveGameState();
}

// FORGE GOBLIN WITH ACCURATE CP CHANGE LOGGING

const CRAFT_RECIPES = [
  {
    id: "wings_c1",
    type: "wings",
    name: "Cánh Hỗn Nguyên Cấp 1 (Wings of Chaos)",
    desc: "Cánh thần sơ cấp giúp bay lượn, tăng +350 Sát thương, +200 Giáp & +1,500 HP.",
    stats: { atk: 350, def: 200, hp: 1500, plus: 0, tier: 5, rarity: 3, options: ["Tăng tốc đánh +15"] },
    cost: { feather: 2, chaos: 3, bless: 5, zen: 100000 }
  },
  {
    id: "wings_c2",
    type: "wings",
    name: "Cánh Tinh Thể Cấp 2 (Wings of Spirits/Dragon)",
    desc: "Cánh thần cấp 2 rực cháy, tăng +850 Sát thương, +550 Giáp, +4,000 HP & +25% Bạo Kích.",
    stats: { atk: 850, def: 550, hp: 4000, plus: 0, tier: 8, rarity: 4, options: ["Bạo kích +25%", "Bỏ qua phòng thủ 5%"] },
    cost: { feather: 5, chaos: 8, bless: 10, zen: 300000 }
  },
  {
    id: "wings_c3",
    type: "wings",
    name: "Cánh Bão Tố Cấp 3 (Wings of Storm / Illusion)",
    desc: "Cánh thần tối thượng cõi trời, tăng +2,200 Sát thương, +1,400 Giáp, +10,000 HP & +35% Sát Thương Hoàn Hảo.",
    stats: { atk: 2200, def: 1400, hp: 10000, plus: 0, tier: 10, rarity: 5, options: ["Sát thương hoàn hảo +35%", "Hồi máu 5%", "Đòn đánh kép 12%"] },
    cost: { flame: 2, chaos: 15, life: 15, zen: 1000000 }
  },
  {
    id: "pet_satan",
    type: "pet",
    name: "Tiểu Ác Ma (Satan Pet)",
    desc: "Linh thú hắc ám bay kèm hiệp sĩ, tăng +25% Sát thương đòn đánh và +10% Bạo kích.",
    stats: { atk: 250, def: 100, hp: 800, plus: 0, tier: 4, rarity: 3, petKey: "satan", options: ["+25% Sát thương tổng", "+10% Bạo kích"] },
    cost: { beastSoul: 5, chaos: 3, zen: 50000 }
  },
  {
    id: "pet_angel",
    type: "pet",
    name: "Thiên Thần Hộ Mệnh (Angel Pet)",
    desc: "Thiên sứ bảo hộ, giảm 20% sát thương nhận vào và hồi phục +250 HP mỗi nhịp.",
    stats: { atk: 100, def: 350, hp: 2000, plus: 0, tier: 4, rarity: 3, petKey: "angel", options: ["Giảm 20% sát thương", "Hồi +250 HP/s"] },
    cost: { beastSoul: 5, bless: 3, zen: 50000 }
  },
  {
    id: "mount_fenrir",
    type: "pet",
    name: "Chiến Lang Sói Tinh (Fenrir Mount)",
    desc: "Thú cưỡi thần chiến, tăng +600 Sát thương, +450 Giáp, +20% Tốc độ & Phản đòn 15%.",
    stats: { atk: 600, def: 450, hp: 3500, plus: 0, tier: 7, rarity: 4, petKey: "fenrir", options: ["Tăng 20% Sát thương", "Phản hồi 15% Sát thương"] },
    cost: { fenrirHorn: 1, beastSoul: 10, chaos: 10, zen: 200000 }
  },
  {
    id: "mount_kirin",
    type: "pet",
    name: "Thần Thú Kỳ Lân Hoàng Kim (Golden Kirin Mount)",
    desc: "Thần thú cưỡi tối thượng Lục địa MU, tăng +1,500 Sát thương, +1,200 Giáp, +40% Tất cả thuộc tính & x2 Rơi đồ hiếm.",
    stats: { atk: 1500, def: 1200, hp: 8000, plus: 0, tier: 10, rarity: 5, petKey: "kirin", options: ["+40% Tất cả thuộc tính", "Nhân đôi tỷ lệ rơi ngọc"] },
    cost: { kirinFragment: 1, beastSoul: 15, bless: 15, zen: 500000 }
  }
];

function switchUpgradeSubtab(subtab) {
  state.currentUpgradeSubtab = subtab;
  const subtabs = ["enhance", "fusion", "craft"];
  subtabs.forEach(t => {
    const btn = document.getElementById(`btnSubnav${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (btn) btn.classList.toggle("active", t === subtab);
    const view = document.getElementById(`subview${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (view) view.style.display = t === subtab ? "block" : "none";
  });
  renderUpgradeView();
}

function selectUpgradeSlot(slotKey) {
  state.selectedUpgradeKey = slotKey;
  state.selectedSlotKey = slotKey;
  renderUpgradeView();
  updateUI();
}


function fuseWings(levels = 1) {
  const wings = state.equipped && state.equipped.wings;
  if (!wings) {
    addLog("Bạn chưa trang bị Cánh Thần! Hãy sang tab Xưởng Chế Tạo để ghép Cánh trước khi dung hợp.", "log-boss");
    return;
  }

  const featherCost = 2;
  const chaosCost = 2;
  const lifeCost = 1;
  const zenCost = 150000;

  let fused = 0;
  for (let i = 0; i < levels; i++) {
    if ((state.feather || 0) < featherCost || (state.chaos || 0) < chaosCost || (state.life || 0) < lifeCost || (state.zen || 0) < zenCost) {
      break;
    }
    state.feather -= featherCost;
    state.chaos -= chaosCost;
    state.life -= lifeCost;
    state.zen -= zenCost;

    // Đúc Phôi Cánh Thần Thoại và Dung Hợp theo đúng cơ chế Dung Hợp Trang Bị
    const wingFodder = generateWingItem(wings.tier, wings.rarity, true);
    handleDroppedItem(wingFodder);
    fused++;
  }

  if (fused > 0) {
    renderUpgradeView();
    saveGameState();
  } else {
    addLog("Không đủ nguyên liệu để dung hợp Cánh Thần! Cần: 2 Lông Vũ, 2 Chaos, 1 Life & 150.000 Zen mỗi cấp.", "log-boss");
  }
}

function fusePet(levels = 1) {
  const pet = state.equipped && state.equipped.pet;
  if (!pet) {
    addLog("Bạn chưa trang bị Thú Cưng / Thú Cưỡi! Hãy sang tab Xưởng Chế Tạo để triệu hồi linh thú trước khi dung hợp.", "log-boss");
    return;
  }

  const soulCost = 3;
  const blessCost = 2;
  const chaosCost = 1;
  const zenCost = 120000;

  let fused = 0;
  for (let i = 0; i < levels; i++) {
    if ((state.beastSoul || 0) < soulCost || (state.bless || 0) < blessCost || (state.chaos || 0) < chaosCost || (state.zen || 0) < zenCost) {
      break;
    }
    state.beastSoul -= soulCost;
    state.bless -= blessCost;
    state.chaos -= chaosCost;
    state.zen -= zenCost;

    // Đúc Phôi Linh Thú Thần Thoại và Dung Hợp theo đúng cơ chế Dung Hợp Trang Bị
    const petFodder = generatePetItem(pet.tier, pet.rarity, true);
    handleDroppedItem(petFodder);
    fused++;
  }

  if (fused > 0) {
    renderUpgradeView();
    saveGameState();
  } else {
    addLog("Không đủ nguyên liệu để dung hợp Linh Thú! Cần: 3 Hồn Thú, 2 Bless, 1 Chaos & 120.000 Zen mỗi cấp.", "log-boss");
  }
}

function renderUpgradeView() {
  // 1. Update Material Counters
  const cFeather = document.getElementById("craftFeather");
  const cFlame = document.getElementById("craftFlame");
  const cBeastSoul = document.getElementById("craftBeastSoul");
  const cFenrirHorn = document.getElementById("craftFenrirHorn");
  const cKirin = document.getElementById("craftKirin");

  if (cFeather) cFeather.innerText = (state.feather || 0).toLocaleString();
  if (cFlame) cFlame.innerText = (state.flame || 0).toLocaleString();
  if (cBeastSoul) cBeastSoul.innerText = (state.beastSoul || 0).toLocaleString();
  if (cFenrirHorn) cFenrirHorn.innerText = (state.fenrirHorn || 0).toLocaleString();
  if (cKirin) cKirin.innerText = (state.kirinFragment || 0).toLocaleString();

  // 2. Render Slot Selector Pills in Enhance Subtab
  const pillsContainer = document.getElementById("upgradeSlotPills");
  if (pillsContainer) {
    let pillsHtml = "";
    SLOT_TYPES.forEach(s => {
      const item = state.equipped[s.key];
      const isActive = (state.selectedUpgradeKey || "mainWeapon") === s.key;
      const plusTag = item && item.plus > 0 ? ` +${item.plus}` : "";
      pillsHtml += `<button class="upgrade-slot-pill ${isActive ? "active" : ""}" onclick="selectUpgradeSlot('${s.key}')">${s.icon} ${s.name}${plusTag}</button>`;
    });
    pillsContainer.innerHTML = pillsHtml;
  }

  // 3. Render Forge Target Item Details
  const curKey = state.selectedUpgradeKey || "mainWeapon";
  const targetItem = state.equipped[curKey];
  const nameEl = document.getElementById("forgeItemName");
  const statsEl = document.getElementById("forgeItemStats");
  const optsEl = document.getElementById("forgeItemOpts");
  const iconEl = document.getElementById("forgeItemIcon");
  const forecastText = document.getElementById("forgeForecastText");
  const rateText = document.getElementById("forgeSuccessRateText");
  const costText = document.getElementById("forgeCostText");
  const btnEnhance = document.getElementById("btnForgeEnhance");

  if (!targetItem) {
    if (nameEl) nameEl.innerHTML = `<span style="color:#8fa0b8;">Ô [${SLOT_TYPES.find(s=>s.key===curKey)?.name || curKey}] chưa có trang bị!</span>`;
    if (statsEl) statsEl.innerText = "Hãy đánh quái để tự động nhặt hoặc chế tạo tại tab Xưởng Chế Tạo.";
    if (optsEl) optsEl.innerText = "";
    if (iconEl) iconEl.innerText = "❓";
    if (forecastText) forecastText.innerText = "Chưa có trang bị để nâng cấp.";
    if (rateText) rateText.innerText = "";
    if (costText) costText.innerText = "";
    if (btnEnhance) btnEnhance.disabled = true;
  } else {
    const r = RARITIES[targetItem.rarity] || RARITIES[0];
    if (nameEl) nameEl.innerHTML = `<span style="color:${r.color};">${targetItem.name} +${targetItem.plus}</span> (Tier ${targetItem.tier})`;
    if (statsEl) statsEl.innerText = `Công: +${targetItem.atk || 0} | Thủ: +${targetItem.def || 0} | HP: +${targetItem.hp || 0}`;
    if (optsEl) optsEl.innerText = targetItem.options && targetItem.options.length > 0 ? `★ ${targetItem.options.join(" • ")}` : "★ Đồ trắng chưa có dòng";
    if (iconEl) iconEl.innerHTML = getItemIllustration(targetItem, curKey);

    const nextPlus = targetItem.plus + 1;
    if (nextPlus > 15) {
      if (forecastText) forecastText.innerHTML = `<b style="color:var(--gold);">★ ĐÃ ĐẠT CẤP ĐỘ CƯỜNG HÓA TỐI ĐA (+15) ★</b>`;
      if (rateText) rateText.innerText = "";
      if (costText) costText.innerText = "";
      if (btnEnhance) btnEnhance.disabled = true;
    } else {
      const rate = nextPlus <= 6 ? 100 : (nextPlus <= 9 ? 85 : (nextPlus <= 12 ? 70 : 55));
      const reqBless = nextPlus <= 6 ? 1 : (nextPlus <= 9 ? 2 : 4);
      const reqChaos = nextPlus >= 10 ? Math.floor(nextPlus / 2) : 0;
      const reqZen = nextPlus * 40000;

      if (forecastText) forecastText.innerHTML = `Lên <b>+${nextPlus}</b>: Sát thương & Phòng thủ <b>+12%</b> • Kích hoạt Hào quang Thần thoại!`;
      if (rateText) rateText.innerHTML = `Tỷ lệ thành công: <b style="color:${rate >= 80 ? "#2ecc71" : "#f1c40f"};">${rate}%</b>`;
      if (costText) costText.innerHTML = `Chi phí: <b>${reqBless}x Bless</b>${reqChaos > 0 ? ` • <b>${reqChaos}x Chaos</b>` : ""} • <b>${reqZen.toLocaleString()} Zen</b>`;
      if (btnEnhance) {
        btnEnhance.disabled = false;
        btnEnhance.innerText = `CƯỜNG HÓA (+${nextPlus})`;
      }
    }
  }

  // 4. Render Craft Recipes in Subview 2
  const craftList = document.getElementById("craftRecipesList");
  if (craftList) {
    let recipesHtml = "";
    CRAFT_RECIPES.forEach(rcp => {
      let canCraft = true;
      let costBadges = [];

      if (rcp.cost.feather) {
        const ok = (state.feather || 0) >= rcp.cost.feather;
        if (!ok) canCraft = false;
        costBadges.push(`<span class="craft-cost-tag ${ok ? "cost-met" : "cost-unmet"}">🪶 ${state.feather || 0}/${rcp.cost.feather} Lông Vũ</span>`);
      }
      if (rcp.cost.flame) {
        const ok = (state.flame || 0) >= rcp.cost.flame;
        if (!ok) canCraft = false;
        costBadges.push(`<span class="craft-cost-tag ${ok ? "cost-met" : "cost-unmet"}">🔥 ${state.flame || 0}/${rcp.cost.flame} Lửa Condor</span>`);
      }
      if (rcp.cost.beastSoul) {
        const ok = (state.beastSoul || 0) >= rcp.cost.beastSoul;
        if (!ok) canCraft = false;
        costBadges.push(`<span class="craft-cost-tag ${ok ? "cost-met" : "cost-unmet"}">🐾 ${state.beastSoul || 0}/${rcp.cost.beastSoul} Hồn Thú</span>`);
      }
      if (rcp.cost.fenrirHorn) {
        const ok = (state.fenrirHorn || 0) >= rcp.cost.fenrirHorn;
        if (!ok) canCraft = false;
        costBadges.push(`<span class="craft-cost-tag ${ok ? "cost-met" : "cost-unmet"}">🐺 ${state.fenrirHorn || 0}/${rcp.cost.fenrirHorn} Sừng Sói</span>`);
      }
      if (rcp.cost.kirinFragment) {
        const ok = (state.kirinFragment || 0) >= rcp.cost.kirinFragment;
        if (!ok) canCraft = false;
        costBadges.push(`<span class="craft-cost-tag ${ok ? "cost-met" : "cost-unmet"}">🦄 ${state.kirinFragment || 0}/${rcp.cost.kirinFragment} Mảnh Kỳ Lân</span>`);
      }
      if (rcp.cost.bless) {
        const ok = (state.bless || 0) >= rcp.cost.bless;
        if (!ok) canCraft = false;
        costBadges.push(`<span class="craft-cost-tag ${ok ? "cost-met" : "cost-unmet"}">💎 ${state.bless || 0}/${rcp.cost.bless} Bless</span>`);
      }
      if (rcp.cost.chaos) {
        const ok = (state.chaos || 0) >= rcp.cost.chaos;
        if (!ok) canCraft = false;
        costBadges.push(`<span class="craft-cost-tag ${ok ? "cost-met" : "cost-unmet"}">🔥 ${state.chaos || 0}/${rcp.cost.chaos} Chaos</span>`);
      }
      if (rcp.cost.life) {
        const ok = (state.life || 0) >= rcp.cost.life;
        if (!ok) canCraft = false;
        costBadges.push(`<span class="craft-cost-tag ${ok ? "cost-met" : "cost-unmet"}">🌿 ${state.life || 0}/${rcp.cost.life} Life</span>`);
      }
      if (rcp.cost.zen) {
        const ok = (state.zen || 0) >= rcp.cost.zen;
        if (!ok) canCraft = false;
        costBadges.push(`<span class="craft-cost-tag ${ok ? "cost-met" : "cost-unmet"}">🪙 ${rcp.cost.zen.toLocaleString()} Zen</span>`);
      }

      recipesHtml += `
        <div class="craft-recipe-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <b style="color:var(--gold); font-size:11px;">${rcp.name}</b>
              <div style="font-size:8.5px; color:#8fa0b8; margin-top:2px;">${rcp.desc}</div>
            </div>
            <button class="btn btn-sm ${canCraft ? "btn-success" : ""}" style="padding:4px 8px; font-weight:bold;" ${canCraft ? "" : "disabled"} onclick="craftRecipe('${rcp.id}')">CHẾ TẠO</button>
          </div>
          <div class="craft-cost-tags">${costBadges.join("")}</div>
        </div>
      `;
    });
    craftList.innerHTML = recipesHtml;
  }
  // 5. Render Wing and Pet Fusion Subview (Matching Equipment Fusion Mechanism)
  const wingContainer = document.getElementById("wingFusionCardContainer");
  const petContainer = document.getElementById("petFusionCardContainer");

  if (wingContainer) {
    const wings = state.equipped && state.equipped.wings;
    if (!wings) {
      wingContainer.innerHTML = `
        <div class="fusion-empty-card" style="margin-bottom:6px;">
          <div style="font-size:24px; margin-bottom:4px;">🪽</div>
          <b style="color:var(--gold);">Chưa Trang Bị Cánh Thần!</b>
          <div style="color:#8fa0b8; margin-top:2px;">Hãy sang tab <b>Xưởng Chế Tạo</b> để ghép Cánh Cấp 1, Cánh Cấp 2 hoặc Cánh Cấp 3 rồi quay lại dung hợp!</div>
          <button class="btn btn-sm btn-primary" style="margin-top:6px;" onclick="switchUpgradeSubtab('craft')">Đến Xưởng Chế Tạo</button>
        </div>
      `;
    } else {
      const fCount = wings.fusionCount || 0;
      const r = RARITIES[wings.rarity] || RARITIES[0];
      const hasFeather = (state.feather || 0) >= 2;
      const hasChaos = (state.chaos || 0) >= 2;
      const hasLife = (state.life || 0) >= 1;
      const hasZen = (state.zen || 0) >= 150000;
      const canFuse1 = hasFeather && hasChaos && hasLife && hasZen;

      const opts = wings.options || [];
      const optsHtml = opts.length > 0
        ? opts.map(opt => `<span class="fusion-opt-badge opt-purple">✨ ${opt}</span>`).join(" ")
        : `<span style="color:#8fa0b8; font-style:italic;">Chưa có dòng hoàn hảo. Hãy dung hợp để mở khóa!</span>`;

      wingContainer.innerHTML = `
        <div class="fusion-card-box">
          <div class="fusion-card-header">
            <div>
              <b style="color:${r.color}; font-size:11.5px;">🪽 ${wings.name} +${wings.plus}</b>
              <span style="font-size:10px; color:#d0bcf1; font-weight:bold; margin-left:4px;">[Dung Hợp x${fCount}]</span>
            </div>
            <span style="font-size:9.5px; color:#f1c40f; font-weight:bold;">CP: ${getItemCP(wings).toLocaleString()}</span>
          </div>

          <div style="font-size:9px; color:#c8d6e5;">
            Chỉ số hiện tại: Công: <b style="color:#2ecc71;">+${wings.atk || 0}</b> • Thủ: <b style="color:#74b9ff;">+${wings.def || 0}</b> • HP: <b style="color:#ff7675;">+${wings.hp || 0}</b>
          </div>

          <div style="background:#0c101a; border:1px solid #232d42; border-radius:5px; padding:5px 6px;">
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:9px;">
              <b style="color:var(--gold);">DÒNG THUỘC TÍNH HOÀN HẢO (${opts.length}/6 Dòng):</b>
              <span style="color:${opts.length >= 6 ? '#2ecc71' : '#f39c12'}; font-weight:bold;">${opts.length >= 6 ? '★ FULL 6 DÒNG ★' : 'Dung hợp mở thêm dòng'}</span>
            </div>
            <div class="fusion-opts-container" style="margin-top:3px;">
              ${optsHtml}
            </div>
          </div>

          <div class="fusion-bonus-box">
            <b style="color:var(--gold);">CƠ CHẾ DUNG HỢP TRANG BỊ:</b><br>
            • Hấp thụ <b style="color:#2ecc71;">15% Công, Thủ, HP</b> từ Phôi Cánh Thần Thoại vào Cánh đang mặc.<br>
            • Kế thừa và mở khóa thêm <b style="color:#00ffff;">Dòng Hoàn Hảo mới</b>.<br>
            • Tăng vĩnh viễn: <b style="color:#f1c40f;">+4% Lực Chiến Toàn Diện</b> mỗi cấp Dung Hợp.<br>
            • <b style="color:#ff007f;">🌟 ĐỘT PHÁ PHẨM CẤP:</b> Đạt mốc <b style="color:#fff;">Dung Hợp x100</b> tự động nâng phẩm cấp (+25% Công, Thủ, HP)!
          </div>

          <div style="font-size:9px; color:#8fa0b8; margin-top:1px;">Chi phí đúc phôi & dung hợp mỗi cấp:</div>
          <div class="craft-cost-tags">
            <span class="craft-cost-tag ${hasFeather ? "cost-met" : "cost-unmet"}">🪶 ${state.feather || 0}/2 Lông Vũ</span>
            <span class="craft-cost-tag ${hasChaos ? "cost-met" : "cost-unmet"}">🔥 ${state.chaos || 0}/2 Chaos</span>
            <span class="craft-cost-tag ${hasLife ? "cost-met" : "cost-unmet"}">🌿 ${state.life || 0}/1 Life</span>
            <span class="craft-cost-tag ${hasZen ? "cost-met" : "cost-unmet"}">🪙 150k Zen</span>
          </div>

          <div style="display:flex; gap:6px; margin-top:4px;">
            <button class="btn btn-sm ${canFuse1 ? "btn-warn" : ""}" ${canFuse1 ? "" : "disabled"} style="flex:1; padding:7px; font-weight:bold;" onclick="fuseWings(1)">🔮 ĐÚC PHÔI & DUNG HỢP (+1)</button>
            <button class="btn btn-sm ${canFuse1 ? "btn-primary" : ""}" ${canFuse1 ? "" : "disabled"} style="flex:1; padding:7px; font-weight:bold;" onclick="fuseWings(5)">🔮 DUNG HỢP NHANH (+5)</button>
          </div>
        </div>
      `;
    }
  }

  if (petContainer) {
    const pet = state.equipped && state.equipped.pet;
    if (!pet) {
      petContainer.innerHTML = `
        <div class="fusion-empty-card">
          <div style="font-size:24px; margin-bottom:4px;">🐺</div>
          <b style="color:var(--gold);">Chưa Trang Bị Thú Cưng / Thú Cưỡi!</b>
          <div style="color:#8fa0b8; margin-top:2px;">Hãy sang tab <b>Xưởng Chế Tạo</b> để triệu hồi Satan, Thiên Thần, Sói Tinh Fenrir hoặc Kỳ Lân!</div>
          <button class="btn btn-sm btn-primary" style="margin-top:6px;" onclick="switchUpgradeSubtab('craft')">Đến Xưởng Chế Tạo</button>
        </div>
      `;
    } else {
      const fCount = pet.fusionCount || 0;
      const r = RARITIES[pet.rarity] || RARITIES[0];
      const hasSoul = (state.beastSoul || 0) >= 3;
      const hasBless = (state.bless || 0) >= 2;
      const hasChaos = (state.chaos || 0) >= 1;
      const hasZen = (state.zen || 0) >= 120000;
      const canFuse1 = hasSoul && hasBless && hasChaos && hasZen;

      const opts = pet.options || [];
      const optsHtml = opts.length > 0
        ? opts.map(opt => `<span class="fusion-opt-badge opt-gold">🐾 ${opt}</span>`).join(" ")
        : `<span style="color:#8fa0b8; font-style:italic;">Chưa có dòng hoàn hảo. Hãy dung hợp để mở khóa!</span>`;

      petContainer.innerHTML = `
        <div class="fusion-card-box">
          <div class="fusion-card-header">
            <div>
              <b style="color:${r.color}; font-size:11.5px;">🐺 ${pet.name} +${pet.plus}</b>
              <span style="font-size:10px; color:#ffd32a; font-weight:bold; margin-left:4px;">[Dung Hợp x${fCount}]</span>
            </div>
            <span style="font-size:9.5px; color:#f1c40f; font-weight:bold;">CP: ${getItemCP(pet).toLocaleString()}</span>
          </div>

          <div style="font-size:9px; color:#c8d6e5;">
            Chỉ số hiện tại: Công: <b style="color:#2ecc71;">+${pet.atk || 0}</b> • Thủ: <b style="color:#74b9ff;">+${pet.def || 0}</b> • HP: <b style="color:#ff7675;">+${pet.hp || 0}</b>
          </div>

          <div style="background:#0c101a; border:1px solid #232d42; border-radius:5px; padding:5px 6px;">
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:9px;">
              <b style="color:var(--gold);">DÒNG THUỘC TÍNH HOÀN HẢO (${opts.length}/6 Dòng):</b>
              <span style="color:${opts.length >= 6 ? '#2ecc71' : '#f39c12'}; font-weight:bold;">${opts.length >= 6 ? '★ FULL 6 DÒNG ★' : 'Dung hợp mở thêm dòng'}</span>
            </div>
            <div class="fusion-opts-container" style="margin-top:3px;">
              ${optsHtml}
            </div>
          </div>

          <div class="fusion-bonus-box">
            <b style="color:var(--gold);">CƠ CHẾ DUNG HỢP TRANG BỊ:</b><br>
            • Hấp thụ <b style="color:#2ecc71;">15% Công, Thủ, HP</b> từ Phôi Linh Thú Thần Thoại vào Thú đang mặc.<br>
            • Kế thừa và mở khóa thêm <b style="color:#00ffff;">Dòng Hoàn Hảo mới</b> (tối đa 6 dòng hoàn hảo).<br>
            • Cường hóa nội tại: <b style="color:#f1c40f;">+3% Hiệu Ứng Buff Tổng Lực Chiến & Kháng Thủ</b> mỗi cấp.
          </div>

          <div style="font-size:9px; color:#8fa0b8; margin-top:1px;">Chi phí đúc phôi & dung hợp mỗi cấp:</div>
          <div class="craft-cost-tags">
            <span class="craft-cost-tag ${hasSoul ? "cost-met" : "cost-unmet"}">🐾 ${state.beastSoul || 0}/3 Hồn Thú</span>
            <span class="craft-cost-tag ${hasBless ? "cost-met" : "cost-unmet"}">💎 ${state.bless || 0}/2 Bless</span>
            <span class="craft-cost-tag ${hasChaos ? "cost-met" : "cost-unmet"}">🔥 ${state.chaos || 0}/1 Chaos</span>
            <span class="craft-cost-tag ${hasZen ? "cost-met" : "cost-unmet"}">🪙 120k Zen</span>
          </div>

          <div style="display:flex; gap:6px; margin-top:4px;">
            <button class="btn btn-sm ${canFuse1 ? "btn-warn" : ""}" ${canFuse1 ? "" : "disabled"} style="flex:1; padding:7px; font-weight:bold;" onclick="fusePet(1)">🔮 ĐÚC PHÔI & DUNG HỢP (+1)</button>
            <button class="btn btn-sm ${canFuse1 ? "btn-primary" : ""}" ${canFuse1 ? "" : "disabled"} style="flex:1; padding:7px; font-weight:bold;" onclick="fusePet(5)">🔮 DUNG HỢP NHANH (+5)</button>
          </div>
        </div>
      `;
    }
  }

}

function craftRecipe(recipeId) {
  const rcp = CRAFT_RECIPES.find(r => r.id === recipeId);
  if (!rcp) return;

  // Verify costs
  if (rcp.cost.feather && (state.feather || 0) < rcp.cost.feather) { addLog("Chưa đủ Lông Vũ Chaos!", "log-boss"); return; }
  if (rcp.cost.flame && (state.flame || 0) < rcp.cost.flame) { addLog("Chưa đủ Ngọn Lửa Condor!", "log-boss"); return; }
  if (rcp.cost.beastSoul && (state.beastSoul || 0) < rcp.cost.beastSoul) { addLog("Chưa đủ Hồn Thú!", "log-boss"); return; }
  if (rcp.cost.fenrirHorn && (state.fenrirHorn || 0) < rcp.cost.fenrirHorn) { addLog("Chưa đủ Cốt Sừng Sói Tinh!", "log-boss"); return; }
  if (rcp.cost.kirinFragment && (state.kirinFragment || 0) < rcp.cost.kirinFragment) { addLog("Chưa đủ Mảnh Kỳ Lân!", "log-boss"); return; }
  if (rcp.cost.bless && (state.bless || 0) < rcp.cost.bless) { addLog("Chưa đủ Jewel of Bless!", "log-boss"); return; }
  if (rcp.cost.chaos && (state.chaos || 0) < rcp.cost.chaos) { addLog("Chưa đủ Jewel of Chaos!", "log-boss"); return; }
  if (rcp.cost.life && (state.life || 0) < rcp.cost.life) { addLog("Chưa đủ Jewel of Life!", "log-boss"); return; }
  if (rcp.cost.zen && (state.zen || 0) < rcp.cost.zen) { addLog("Chưa đủ Zen!", "log-boss"); return; }

  // Deduce costs
  if (rcp.cost.feather) state.feather -= rcp.cost.feather;
  if (rcp.cost.flame) state.flame -= rcp.cost.flame;
  if (rcp.cost.beastSoul) state.beastSoul -= rcp.cost.beastSoul;
  if (rcp.cost.fenrirHorn) state.fenrirHorn -= rcp.cost.fenrirHorn;
  if (rcp.cost.kirinFragment) state.kirinFragment -= rcp.cost.kirinFragment;
  if (rcp.cost.bless) state.bless -= rcp.cost.bless;
  if (rcp.cost.chaos) state.chaos -= rcp.cost.chaos;
  if (rcp.cost.life) state.life -= rcp.cost.life;
  if (rcp.cost.zen) state.zen -= rcp.cost.zen;

  // Create crafted item with full Equipment Fusion integration
  const newItem = {
    id: Math.random().toString(36).substring(2, 9),
    name: rcp.name.split(" (")[0],
    slotKey: rcp.type,
    tier: rcp.stats.tier,
    rarity: rcp.stats.rarity,
    plus: 0,
    atk: rcp.stats.atk,
    def: rcp.stats.def,
    hp: rcp.stats.hp,
    options: [...rcp.stats.options],
    petKey: rcp.stats.petKey,
    fusionCount: 0
  };

  audio.playGateOpen();
  audio.vibrate(200);
  spawnFloatingLoot("✨", `[${newItem.name}]`, RARITIES[newItem.rarity].color);
  addLog(`🧙 [CHAOS GOBLIN] CHẾ TẠO THÀNH CÔNG [${rcp.name}]! Đang tiến hành dung hợp tinh hoa...`, "log-crit");

  // Áp dụng cơ chế DUNG HỢP TRANG BỊ hoàn chỉnh cho Cánh & Thú Cưng
  handleDroppedItem(newItem);
  renderUpgradeView();
  saveGameState();
}

function renderForgeView() {
  if (!state.selectedSlotKey && state.selectedInventoryIndex === null) {
    state.selectedSlotKey = "mainWeapon";
  }

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
  const successRate = nextPlus <= 6 ? 100 : (nextPlus <= 9 ? 70 : 45);

  if (txt) {
    txt.innerHTML = `
      Mục tiêu: <b style="color:var(--gold)">${item.name} +${item.plus}</b><br>
      • Cường hóa lên +${nextPlus}: Tốn <b>${needBless} Bless</b> ${needChaos > 0 ? "+ <b>1 Chaos</b>" : ""} (Tỷ lệ: <b style="color:${successRate >= 70 ? "#2ecc71" : "#f1c40f"}">${successRate}%</b>)<br>
      • Tẩy luyện dòng Hoàn Hảo: Tốn <b>1 Jewel of Life</b> (Hiện có: ${state.life})
    `;
  }
  if (btnEnhance) btnEnhance.disabled = item.plus >= 15 || state.bless < needBless || (needChaos > 0 && state.chaos < needChaos);
  if (btnReforge) btnReforge.disabled = state.life < 1;
}

function forgeEnhance() {
  initQuestsState();
  if (state.quests && state.quests.daily && state.quests.daily.forgeOnce) {
    state.quests.daily.forgeOnce.cur++;
  }
  const curKey = state.selectedUpgradeKey || state.selectedSlotKey || "mainWeapon";
  let targetItem = state.equipped[curKey];

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
  const curKey = state.selectedUpgradeKey || state.selectedSlotKey || "mainWeapon";
  let targetItem = state.equipped[curKey];

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
      const gainedExp = mobsKilledOffline * 35 * currentTier * 50; // EXP x50
      const gainedBless = Math.floor(mobsKilledOffline * 0.002);
      const gainedChaos = Math.floor(mobsKilledOffline * 0.0008);
      const gainedLife = Math.floor(mobsKilledOffline * 0.0005);

      state.zen += gainedZen;
      state.exp += gainedExp;
      state.bless += gainedBless;
      state.chaos += gainedChaos;
      state.life += gainedLife;

      // Immediate Level Up Check for Offline EXP
      let offlineLevelsGained = 0;
      while (state.exp >= state.nextExp) {
        state.exp -= state.nextExp;
        state.level++;
        state.nextExp = getRequiredExpForLevel(state.level);
        state.freePoints = (state.freePoints || 0) + 5;
        if (state.level % 5 === 0) {
          state.skillPoints = (state.skillPoints || 0) + 1;
        }
        offlineLevelsGained++;
      }
      if (state.autoStats !== false && state.freePoints > 0) {
        autoDistributeClass();
      }

      const hours = (actualSeconds / 3600).toFixed(1);
      const repEl = document.getElementById("offlineReportText");
      if (repEl) {
        repEl.innerHTML = `
          Thời gian offline: <b>${hours} giờ</b> (${mobsKilledOffline.toLocaleString()} quái dọn dẹp)<br><br>
          ${offlineLevelsGained > 0 ? `• Cấp độ tăng thêm: <b style="color:var(--gold)">+${offlineLevelsGained} Cấp (Hiện tại Lv.${state.level})</b><br>` : ""}
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

// --- CỬA HÀNG LORENCIA & THÁP BOSS MA VƯƠNG ---
const SHOP_ITEMS = {
  jewels: [
    { id: "bless_1", name: "Jewel of Bless (1 Viên)", type: "bless", qty: 1, cost: 25000, icon: "💎", desc: "Ngọc Ước Nguyện dùng để cường hóa trang bị lên +6" },
    { id: "bless_10", name: "Túi Ngọc Bless (10 Viên)", type: "bless", qty: 10, cost: 230000, icon: "💎", desc: "Gói 10 viên ngọc Bless ưu đãi tiết kiệm 20k Zen" },
    { id: "soul_1", name: "Jewel of Soul (1 Viên)", type: "soul", qty: 1, cost: 35000, icon: "🔮", desc: "Ngọc Tâm Linh dùng để cường hóa trang bị lên +9" },
    { id: "chaos_1", name: "Jewel of Chaos (1 Viên)", type: "chaos", qty: 1, cost: 30000, icon: "🔥", desc: "Ngọc Hỗn Nguyên tối quan trọng để ép cánh và cường hóa +10~+15" },
    { id: "life_1", name: "Jewel of Life (1 Viên)", type: "life", qty: 1, cost: 50000, icon: "🌿", desc: "Ngọc Sinh Mệnh dùng để tẩy luyện các dòng thuộc tính Hoàn Hảo" }
  ],
  mats: [
    { id: "feather_1", name: "Lông Vũ Chaos (1 Chiếc)", type: "feather", qty: 1, cost: 40000, icon: "🪶", desc: "Nguyên liệu cốt lõi để ép Cánh Cấp 1, Cánh Cấp 2" },
    { id: "feather_5", name: "Gói Lông Vũ Chaos (5 Chiếc)", type: "feather", qty: 5, cost: 180000, icon: "🪶", desc: "5x Lông Vũ giúp bạn chế tạo ngay Cánh thần thoại" },
    { id: "beast_5", name: "Hồn Thú (5 Viên)", type: "beastSoul", qty: 5, cost: 60000, icon: "🐾", desc: "Nguyên liệu triệu hồi Thú cưng Satan, Thiên Thần và Thú cưỡi" },
    { id: "horn_1", name: "Cốt Sừng Sói Tinh (1 Chiếc)", type: "fenrirHorn", qty: 1, cost: 250000, icon: "🐺", desc: "Sừng Chiến Lang Fenrir dũng mãnh dùng để chế tạo Thú Cưỡi" },
    { id: "flame_1", name: "Ngọn Lửa Condor (1 Ngọn)", type: "flame", qty: 1, cost: 500000, icon: "🔥", desc: "Lửa thần phượng hoàng dùng để chế tạo Cánh Cấp 3 tối thượng" },
    { id: "kirin_1", name: "Mảnh Kỳ Lân Hoàng Kim (1 Mảnh)", type: "kirinFragment", qty: 1, cost: 800000, icon: "🦄", desc: "Thần vật dùng để triệu hồi Thần Thú Kỳ Lân Hoàng Kim" }
  ],
  potions: [
    { id: "hp_50", name: "50 Bình Máu HP", type: "potion_hp", qty: 50, cost: 15000, icon: "🧪", desc: "Hồi phục tức thì sinh lực trong trận chiến" },
    { id: "hp_200", name: "200 Bình Máu Lớn", type: "potion_hp", qty: 200, cost: 50000, icon: "🧪", desc: "Dự trữ máu thoải mái cho việc cày map thâu đêm" },
    { id: "mp_50", name: "50 Bình Mana MP", type: "potion_mp", qty: 50, cost: 15000, icon: "🧪", desc: "Hồi phục mana để liên tục tung tuyệt kỹ bão tuyết, chém xoay" },
    { id: "buff_speed", name: "Bùa Tăng Tốc Đánh (300s)", type: "buff_speed", qty: 1, cost: 60000, icon: "⚡", desc: "Tăng thêm +30% Tốc độ đánh trong 5 phút" },
    { id: "buff_crit", name: "Bùa Bạo Kích Thần Thánh (300s)", type: "buff_crit", qty: 1, cost: 60000, icon: "💥", desc: "Tăng thêm +25% Tỷ lệ bạo kích trong 5 phút" }
  ]
};

function openShopModal() {
  const m = document.getElementById("shopModal");
  if (m) {
    m.style.display = "flex";
    renderShopView();
  }
}

function closeShopModal() {
  const m = document.getElementById("shopModal");
  if (m) m.style.display = "none";
}

function switchShopTab(tab) {
  state.shopTab = tab;
  ["jewels", "mats", "potions", "gacha"].forEach(t => {
    const btn = document.getElementById(`btnShop${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (btn) btn.classList.toggle("active", t === tab);
  });
  renderShopView();
}

function renderShopView() {
  const curTab = state.shopTab || "jewels";
  const zenEl = document.getElementById("shopZenDisplay");
  if (zenEl) zenEl.innerText = (state.zen || 0).toLocaleString();

  const container = document.getElementById("shopItemsContainer");
  if (!container) return;

  if (curTab === "gacha") { renderGachaView(container); return; }
  const items = SHOP_ITEMS[curTab] || SHOP_ITEMS.jewels;
  let html = "";

  items.forEach(item => {
    const canAfford = state.zen >= item.cost;
    html += `
      <div class="shop-item-card">
        <div style="font-size:22px; width:34px; height:34px; display:flex; align-items:center; justify-content:center; background:#192030; border-radius:4px;">${item.icon}</div>
        <div style="flex:1;">
          <div style="font-size:11px; font-weight:bold; color:var(--gold);">${item.name}</div>
          <div style="font-size:8.5px; color:#8fa0b8; margin-top:1px;">${item.desc}</div>
          <div style="font-size:9.5px; color:#ffec8b; font-weight:bold; margin-top:2px;">🪙 ${item.cost.toLocaleString()} Zen</div>
        </div>
        <button class="btn btn-sm ${canAfford ? "btn-warn" : ""}" style="padding:5px 9px; font-weight:bold; white-space:nowrap;" ${canAfford ? "" : "disabled"} onclick="buyShopItem('${curTab}', '${item.id}')">MUA</button>
      </div>
    `;
  });

  container.innerHTML = html;
}

function buyShopItem(category, itemId) {
  const list = SHOP_ITEMS[category] || [];
  const item = list.find(i => i.id === itemId);
  if (!item) return;

  if (state.zen < item.cost) {
    addLog("Bạn không đủ Zen để mua món này!", "log-boss");
    return;
  }

  state.zen -= item.cost;

  if (item.type === "bless") state.bless = (state.bless || 0) + item.qty;
  else if (item.type === "soul") state.soul = (state.soul || 0) + item.qty;
  else if (item.type === "chaos") state.chaos = (state.chaos || 0) + item.qty;
  else if (item.type === "life") state.life = (state.life || 0) + item.qty;
  else if (item.type === "feather") state.feather = (state.feather || 0) + item.qty;
  else if (item.type === "beastSoul") state.beastSoul = (state.beastSoul || 0) + item.qty;
  else if (item.type === "fenrirHorn") state.fenrirHorn = (state.fenrirHorn || 0) + item.qty;
  else if (item.type === "flame") state.flame = (state.flame || 0) + item.qty;
  else if (item.type === "kirinFragment") state.kirinFragment = (state.kirinFragment || 0) + item.qty;
  else if (item.type === "potion_hp") {
    if (!state.potions) state.potions = { hp: 0, mp: 0 };
    state.potions.hp += item.qty;
  }
  else if (item.type === "potion_mp") {
    if (!state.potions) state.potions = { hp: 0, mp: 0 };
    state.potions.mp += item.qty;
  }
  else if (item.type === "buff_speed") {
    if (!state.buffs) state.buffs = {};
    state.buffs.speed = 300;
  }
  else if (item.type === "buff_crit") {
    if (!state.buffs) state.buffs = {};
    state.buffs.crit = 300;
  }

  audio.playKeng();
  addLog(`🛍️ [CỬA HÀNG] Mua thành công [${item.name}] (-${item.cost.toLocaleString()} Zen)!`, "log-zen");
  renderShopView();
  updateUI();
  saveGameState();
}

// ==================== GACHA LOTTERY SYSTEM ====================
function renderGachaView(container) {
  const isFreeAvailable = state.lastFreeGachaDate !== new Date().toDateString();
  const canAffordNorm1 = (state.zen || 0) >= 200000 || isFreeAvailable;
  const canAffordNorm10 = (state.zen || 0) >= 1800000;
  const canAffordMyth1 = (state.bless || 0) >= 3 && (state.chaos || 0) >= 3;
  const canAffordMyth10 = (state.bless || 0) >= 25 && (state.chaos || 0) >= 25;

  const pityNormal = state.gachaPity || 0;
  const pityMythic = state.mythicGachaPity || 0;

  let html = `
    <div class="gacha-view-wrapper" style="display:flex; flex-direction:column; gap:6px;">
      <!-- Header Currency Info Bar -->
      <div style="background:#111726; border:1px solid #2a3754; border-radius:6px; padding:6px 10px; display:flex; justify-content:space-between; align-items:center; font-size:10px;">
        <span style="color:var(--gold); font-weight:bold;">🎰 TÀI NGUYÊN RÚT THƯỞNG:</span>
        <div style="display:flex; gap:8px; font-size:9.5px; font-weight:bold;">
          <span style="color:#ffec8b;">🪙 ${(state.zen || 0).toLocaleString()}</span>
          <span style="color:#74b9ff;">💎 ${state.bless || 0} Bless</span>
          <span style="color:#e74c3c;">🔥 ${state.chaos || 0} Chaos</span>
        </div>
      </div>

      <!-- BANNER 1: HÒM BÁU HOÀNG KIM LORENCIA -->
      <div class="gacha-banner-card">
        <div class="gacha-banner-header">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:18px;">🎁</span>
            <div>
              <b style="color:var(--gold); font-size:11.5px;">HÒM BÁU HOÀNG KIM LORENCIA</b>
              <div style="font-size:8.5px; color:#8fa0b8;">Cơ hội nhận Cánh Cấp 1, Thú Cưng, Ngọc Quý & Trang Bị Bậc 6-8</div>
            </div>
          </div>
          ${isFreeAvailable ? `<span class="badge" style="background:#2ecc71; color:#fff; font-size:8px; padding:2px 5px; border-radius:3px; font-weight:bold;">1 LƯỢT MIỄN PHÍ</span>` : ''}
        </div>

        <div style="background:#0b0f19; border:1px dashed #34495e; border-radius:4px; padding:4px 6px; font-size:8.5px; color:#c8d6e5; display:flex; justify-content:space-between; align-items:center;">
          <span>Bảo hiểm Cực Phẩm: <b style="color:#f1c40f;">${pityNormal}/10 lượt</b></span>
          <span style="color:#a29bfe; font-size:8px;">(Đạt 10 lượt chắc chắn nhận đồ Tím/Đỏ hoặc Cánh/Thú)</span>
        </div>

        <div class="gacha-btn-group">
          ${isFreeAvailable ? `
            <button class="btn btn-sm btn-success" style="flex:1; padding:7px; font-weight:bold; font-size:10px;" onclick="drawGacha('normal', 1)">🎁 QUAY MIỄN PHÍ HÔM NAY</button>
          ` : `
            <button class="btn btn-sm ${canAffordNorm1 ? 'btn-warn' : ''}" ${canAffordNorm1 ? '' : 'disabled'} style="flex:1; padding:7px; font-weight:bold; font-size:10px;" onclick="drawGacha('normal', 1)">🎰 QUAY 1 LẦN (200k Zen)</button>
          `}
          <button class="btn btn-sm ${canAffordNorm10 ? 'btn-primary' : ''}" ${canAffordNorm10 ? '' : 'disabled'} style="flex:1; padding:7px; font-weight:bold; font-size:10px;" onclick="drawGacha('normal', 10)">🎰 QUAY x10 (1.800k Zen)</button>
        </div>
      </div>

      <!-- BANNER 2: ĐÀI TRIỆU HỒI THẦN MA CHÍ TÔN -->
      <div class="gacha-banner-card mythic">
        <div class="gacha-banner-header">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:18px;">👑</span>
            <div>
              <b style="color:#d0bcf1; font-size:11.5px;">ĐÀI TRIỆU HỒI THẦN MA CHÍ TÔN</b>
              <div style="font-size:8.5px; color:#a29bfe;">Cực Phẩm: Cánh Cấp 3, Cánh Cấp 2, Kỳ Lân, Fenrir & Đồ Bậc 10 Đỏ Siêu Cấp</div>
            </div>
          </div>
          <span class="badge" style="background:#8e44ad; color:#fff; font-size:8px; padding:2px 5px; border-radius:3px; font-weight:bold;">TỐI THƯỢNG</span>
        </div>

        <div style="background:#0e0b17; border:1px dashed #5b2c6f; border-radius:4px; padding:4px 6px; font-size:8.5px; color:#c8d6e5; display:flex; justify-content:space-between; align-items:center;">
          <span>Bảo hiểm Thần Thoại: <b style="color:#e056fd;">${pityMythic}/20 lượt</b></span>
          <span style="color:#f1c40f; font-size:8px;">(Đạt 20 lượt chắc chắn ra Cánh 3 / Kỳ Lân / Đồ Bậc 10)</span>
        </div>

        <div class="gacha-btn-group">
          <button class="btn btn-sm ${canAffordMyth1 ? 'btn-warn' : ''}" ${canAffordMyth1 ? '' : 'disabled'} style="flex:1; padding:7px; font-weight:bold; font-size:10px; background:linear-gradient(180deg, #8e44ad 0%, #5b2c6f 100%); border-color:#9b59b6;" onclick="drawGacha('mythic', 1)">👑 TRIỆU HỒI x1 (3💎+3🔥)</button>
          <button class="btn btn-sm ${canAffordMyth10 ? 'btn-primary' : ''}" ${canAffordMyth10 ? '' : 'disabled'} style="flex:1; padding:7px; font-weight:bold; font-size:10px; background:linear-gradient(180deg, #d35400 0%, #8e44ad 100%); border-color:#e67e22;" onclick="drawGacha('mythic', 10)">👑 TRIỆU HỒI x10 (25💎+25🔥)</button>
        </div>
      </div>

      <!-- Auto Fusion Mechanism Banner -->
      <div style="background:#090d16; border:1px solid #1f2a40; border-radius:5px; padding:6px 8px; font-size:8.5px; color:#8fa0b8; line-height:1.4;">
        <b style="color:#00ffcc;">🔮 CƠ CHẾ DUNG HỢP TỰ ĐỘNG KHI RÚT THƯỞNG:</b><br>
        Toàn bộ Trang Bị, Cánh Thần và Linh Thú rút được sẽ <b style="color:#fff;">TỰ ĐỘNG DUNG HỢP TRỰC TIẾP</b> vào nhân vật! Tự động hấp thụ 15% Công, Thủ, HP, kế thừa dòng Hoàn Hảo mới và tăng ngay Lực Chiến (CP)!
      </div>

      <!-- Drop Rates Summary Table -->
      <div style="background:#0c101a; border:1px solid #232d42; border-radius:5px; padding:5px 8px; font-size:8px; color:#8fa0b8; display:flex; justify-content:space-between;">
        <span>Tỷ lệ: <b style="color:#e74c3c;">Đỏ 3.5%</b> • <b style="color:#9b59b6;">Tím 12.5%</b> • <b style="color:#f1c40f;">Vàng 28%</b> • <b style="color:#3498db;">Ngọc & Nguyên Liệu 36%</b> • <b style="color:#95a5a6;">Khác 20%</b></span>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function rollGachaReward(bannerType, isPityTrigger) {
  if (bannerType === "normal") {
    if (isPityTrigger) {
      const pRoll = Math.random();
      if (pRoll < 0.3) {
        const wing = generateWingItem(5, 4);
        return { type: "item", item: wing, name: wing.name, desc: "Cánh Thần Cấp 1", icon: "🪽", rarity: 4, isEquip: true };
      } else if (pRoll < 0.6) {
        const pet = generatePetItem(4, 4);
        return { type: "item", item: pet, name: pet.name, desc: "Linh Thú Trợ Chiến", icon: "🐺", rarity: 4, isEquip: true };
      } else if (pRoll < 0.85) {
        const gear = generateItem(Math.floor(Math.random() * 3) + 6, 4, null, "boss");
        return { type: "item", item: gear, name: `${gear.name} (Bậc ${gear.tier})`, desc: "Trang bị Hoàng Kim", icon: "🛡️", rarity: 4, isEquip: true };
      } else {
        return { type: "jewel_bundle", name: "Túi Ngọc Quý (5x Bless & 5x Chaos)", qtyBless: 5, qtyChaos: 5, desc: "Gói ngọc cao cấp", icon: "💎", rarity: 4 };
      }
    }

    const roll = Math.random() * 100;
    if (roll < 3.0) {
      // 3% Wing or Pet
      if (Math.random() < 0.5) {
        const wing = generateWingItem(5, 4);
        return { type: "item", item: wing, name: wing.name, desc: "Cánh Thần Cấp 1", icon: "🪽", rarity: 4, isEquip: true };
      } else {
        const pet = generatePetItem(4, 4);
        return { type: "item", item: pet, name: pet.name, desc: "Linh Thú Trợ Chiến", icon: "🐺", rarity: 4, isEquip: true };
      }
    } else if (roll < 15.0) {
      // 12% Gear Bậc 6-8
      const gear = generateItem(Math.floor(Math.random() * 3) + 6, 3, null, "boss");
      return { type: "item", item: gear, name: `${gear.name} (Bậc ${gear.tier})`, desc: "Trang bị Hoàn Hảo", icon: "🛡️", rarity: 3, isEquip: true };
    } else if (roll < 40.0) {
      // 25% Jewels
      const jTypes = [
        { type: "bless", name: "Jewel of Bless x2", qty: 2, icon: "💎", rarity: 2 },
        { type: "soul", name: "Jewel of Soul x2", qty: 2, icon: "🔮", rarity: 2 },
        { type: "chaos", name: "Jewel of Chaos x2", qty: 2, icon: "🔥", rarity: 2 },
        { type: "life", name: "Jewel of Life x1", qty: 1, icon: "🌿", rarity: 3 }
      ];
      const picked = jTypes[Math.floor(Math.random() * jTypes.length)];
      return { ...picked, desc: "Ngọc Quý Lorencia" };
    } else if (roll < 65.0) {
      // 25% Mats
      if (Math.random() < 0.5) {
        return { type: "feather", name: "Lông Vũ Chaos x3", qty: 3, icon: "🪶", desc: "Nguyên liệu ép cánh", rarity: 2 };
      } else {
        return { type: "beastSoul", name: "Hồn Thú x3", qty: 3, icon: "🐾", desc: "Nguyên liệu ép thú", rarity: 2 };
      }
    } else if (roll < 85.0) {
      // 20% Zen
      const zenAmounts = [300000, 500000, 1000000];
      const zenQty = zenAmounts[Math.floor(Math.random() * zenAmounts.length)];
      return { type: "zen", name: `${zenQty.toLocaleString()} Zen`, qty: zenQty, icon: "🪙", desc: "Túi vàng may mắn", rarity: 1 };
    } else {
      // 15% Potions
      if (Math.random() < 0.5) {
        return { type: "hp_pot", name: "Bình Máu Lớn x25", qty: 25, icon: "🧪", desc: "Dược phẩm hồi sinh lực", rarity: 1 };
      } else {
        return { type: "mp_pot", name: "Bình Mana Lớn x25", qty: 25, icon: "🧪", desc: "Dược phẩm hồi ma pháp", rarity: 1 };
      }
    }
  } else {
    // MYTHIC BANNER
    if (isPityTrigger) {
      const pRoll = Math.random();
      if (pRoll < 0.35) {
        const wing3 = generateWingItem(10, 5);
        return { type: "item", item: wing3, name: wing3.name, desc: "Cánh Thần Tối Thượng Cấp 3", icon: "🪽", rarity: 6, isEquip: true };
      } else if (pRoll < 0.70) {
        const kirin = generatePetItem(10, 5);
        kirin.name = "Thần Thú Kỳ Lân Hoàng Kim";
        kirin.petKey = "kirin";
        return { type: "item", item: kirin, name: kirin.name, desc: "Thần Thú Cưỡi Tối Thượng", icon: "🐺", rarity: 6, isEquip: true };
      } else {
        const mythicGear = generateItem(10, 6, null, "boss");
        return { type: "item", item: mythicGear, name: `${mythicGear.name} (Bậc 10 Đỏ)`, desc: "Trang Bị Đỏ Thần Thoại", icon: "⚔️", rarity: 6, isEquip: true };
      }
    }

    const roll = Math.random() * 100;
    if (roll < 7.0) {
      // 7% Supreme Mythic Wings & Pets
      const sRoll = Math.random();
      if (sRoll < 0.25) {
        const wing3 = generateWingItem(10, 5);
        return { type: "item", item: wing3, name: wing3.name, desc: "Cánh Thần Tối Thượng Cấp 3", icon: "🪽", rarity: 6, isEquip: true };
      } else if (sRoll < 0.50) {
        const kirin = generatePetItem(10, 5);
        kirin.name = "Thần Thú Kỳ Lân Hoàng Kim";
        kirin.petKey = "kirin";
        return { type: "item", item: kirin, name: kirin.name, desc: "Thần Thú Cưỡi Tối Thượng", icon: "🐺", rarity: 6, isEquip: true };
      } else if (sRoll < 0.75) {
        const wing2 = generateWingItem(8, 4);
        return { type: "item", item: wing2, name: wing2.name, desc: "Cánh Tinh Thể Cấp 2", icon: "🪽", rarity: 5, isEquip: true };
      } else {
        const fenrir = generatePetItem(8, 4);
        fenrir.name = "Chiến Lang Sói Tinh Fenrir";
        fenrir.petKey = "fenrir";
        return { type: "item", item: fenrir, name: fenrir.name, desc: "Thú Cưỡi Chiến Lang", icon: "🐺", rarity: 5, isEquip: true };
      }
    } else if (roll < 26.0) {
      // 19% Mythic Gear Bậc 9-10
      const tier = Math.random() < 0.5 ? 9 : 10;
      const rar = Math.random() < 0.35 ? 6 : 5;
      const gear = generateItem(tier, rar, null, "boss");
      return { type: "item", item: gear, name: `${gear.name} (Bậc ${tier})`, desc: "Trang Bị Thần Thoại", icon: "⚔️", rarity: rar, isEquip: true };
    } else if (roll < 48.0) {
      // 22% Priceless Materials
      const mats = [
        { type: "flame", name: "Ngọn Lửa Condor x1", qty: 1, icon: "🔥", desc: "Bảo vật ép Cánh Cấp 3", rarity: 5 },
        { type: "fenrirHorn", name: "Cốt Sừng Sói Tinh x1", qty: 1, icon: "🐺", desc: "Bảo vật ép Sói Tinh Fenrir", rarity: 5 },
        { type: "kirinFragment", name: "Mảnh Kỳ Lân x1", qty: 1, icon: "✨", desc: "Mảnh ghép Thần Thú Kỳ Lân", rarity: 5 },
        { type: "feather", name: "Lông Vũ Chaos x6", qty: 6, icon: "🪶", desc: "Túi Lông Vũ cực đại", rarity: 3 }
      ];
      const picked = mats[Math.floor(Math.random() * mats.length)];
      return { ...picked };
    } else if (roll < 76.0) {
      // 28% Big Jewels
      const jewels = [
        { type: "bless", name: "Jewel of Bless x10", qty: 10, icon: "💎", rarity: 4 },
        { type: "soul", name: "Jewel of Soul x10", qty: 10, icon: "🔮", rarity: 4 },
        { type: "chaos", name: "Jewel of Chaos x10", qty: 10, icon: "🔥", rarity: 4 },
        { type: "life", name: "Jewel of Life x5", qty: 5, icon: "🌿", rarity: 4 }
      ];
      const picked = jewels[Math.floor(Math.random() * jewels.length)];
      return { ...picked, desc: "Rương ngọc đại phú quý" };
    } else {
      // 24% Big Zen
      const zenAmounts = [3000000, 5000000, 10000000];
      const zenQty = zenAmounts[Math.floor(Math.random() * zenAmounts.length)];
      return { type: "zen", name: `Hũ Vàng ${zenQty.toLocaleString()} Zen`, qty: zenQty, icon: "🪙", desc: "Bảo khố Lorencia", rarity: 3 };
    }
  }
}

function applyGachaReward(reward) {
  if (reward.type === "item") {
    // Tự động dung hợp trang bị / cánh / thú vào nhân vật!
    handleDroppedItem(reward.item);
  } else if (reward.type === "jewel_bundle") {
    state.bless = (state.bless || 0) + (reward.qtyBless || 0);
    state.chaos = (state.chaos || 0) + (reward.qtyChaos || 0);
  } else if (reward.type === "zen") {
    state.zen = (state.zen || 0) + reward.qty;
  } else if (reward.type === "bless") {
    state.bless = (state.bless || 0) + reward.qty;
  } else if (reward.type === "soul") {
    state.soul = (state.soul || 0) + reward.qty;
  } else if (reward.type === "chaos") {
    state.chaos = (state.chaos || 0) + reward.qty;
  } else if (reward.type === "life") {
    state.life = (state.life || 0) + reward.qty;
  } else if (reward.type === "feather") {
    state.feather = (state.feather || 0) + reward.qty;
  } else if (reward.type === "beastSoul") {
    state.beastSoul = (state.beastSoul || 0) + reward.qty;
  } else if (reward.type === "flame") {
    state.flame = (state.flame || 0) + reward.qty;
  } else if (reward.type === "fenrirHorn") {
    state.fenrirHorn = (state.fenrirHorn || 0) + reward.qty;
  } else if (reward.type === "kirinFragment") {
    state.kirinFragment = (state.kirinFragment || 0) + reward.qty;
  } else if (reward.type === "hp_pot") {
    state.potions.hp = (state.potions.hp || 0) + reward.qty;
  } else if (reward.type === "mp_pot") {
    state.potions.mp = (state.potions.mp || 0) + reward.qty;
  }

  if (reward.rarity >= 4) {
    addLog(`🎰 [RÚT THƯỞNG GACHA] May mắn trúng [${reward.name}]!`, "log-crit");
  }
}

function drawGacha(bannerType = "normal", count = 1) {
  const isFree = (bannerType === "normal" && count === 1 && state.lastFreeGachaDate !== new Date().toDateString());

  if (bannerType === "normal") {
    if (isFree) {
      state.lastFreeGachaDate = new Date().toDateString();
    } else {
      const costZen = count === 10 ? 1800000 : 200000;
      if ((state.zen || 0) < costZen) {
        addLog(`Không đủ Zen để quay Gacha! Cần ${costZen.toLocaleString()} Zen.`, "log-boss");
        return;
      }
      state.zen -= costZen;
    }
  } else if (bannerType === "mythic") {
    const costBless = count === 10 ? 25 : 3;
    const costChaos = count === 10 ? 25 : 3;
    if ((state.bless || 0) < costBless || (state.chaos || 0) < costChaos) {
      addLog(`Không đủ ngọc để Triệu Hồi Thần Ma! Cần ${costBless}x Bless & ${costChaos}x Chaos.`, "log-boss");
      return;
    }
    state.bless -= costBless;
    state.chaos -= costChaos;
  }

  const results = [];
  let highestRarity = 0;

  for (let i = 0; i < count; i++) {
    const isPityTrigger = (bannerType === "normal" && (state.gachaPity || 0) >= 9) ||
                          (bannerType === "mythic" && (state.mythicGachaPity || 0) >= 19) ||
                          (count === 10 && i === 9);

    const reward = rollGachaReward(bannerType, isPityTrigger);

    if (bannerType === "normal") {
      if (reward.rarity >= 4) state.gachaPity = 0;
      else state.gachaPity = (state.gachaPity || 0) + 1;
    } else if (bannerType === "mythic") {
      if (reward.rarity >= 5) state.mythicGachaPity = 0;
      else state.mythicGachaPity = (state.mythicGachaPity || 0) + 1;
    }

    if (reward.rarity > highestRarity) highestRarity = reward.rarity;

    applyGachaReward(reward);
    results.push(reward);
  }

  if (highestRarity >= 5) {
    audio.playGateOpen();
    audio.playKeng();
    audio.vibrate(300);
    spawnHeroFloatingEffect("🌟 SIÊU CỰC PHẨM GACHA!", "float-crit");
  } else if (highestRarity >= 4) {
    audio.playKeng();
    audio.vibrate(200);
    spawnHeroFloatingEffect("✨ CỰC PHẨM GACHA!", "float-crit");
  } else {
    audio.playMagic();
    audio.vibrate(100);
  }

  renderShopView();
  updateUI();
  saveGameState();

  showGachaResultModal(bannerType, count, results);
}

function showGachaResultModal(bannerType, count, results) {
  const m = document.getElementById("gachaResultModal");
  if (!m) return;

  const bannerEl = document.getElementById("gachaResultBanner");
  const gridEl = document.getElementById("gachaRewardGrid");
  const summaryEl = document.getElementById("gachaResultSummary");
  const btnAgain1 = document.getElementById("btnGachaAgain1");
  const btnAgain10 = document.getElementById("btnGachaAgain10");

  const titleBanner = bannerType === "normal" ? "🎁 HÒM BÁU HOÀNG KIM LORENCIA" : "👑 ĐÀI TRIỆU HỒI THẦN MA CHÍ TÔN";
  if (bannerEl) bannerEl.innerHTML = `<b style="color:var(--gold); font-size:11px;">${titleBanner}</b> (Đã rút ${count} lượt)`;

  if (gridEl) {
    let gridHtml = "";
    results.forEach(r => {
      let rClass = "";
      let rColor = "#bdc3c7";
      if (r.rarity >= 6) { rClass = "r-red"; rColor = "#e74c3c"; }
      else if (r.rarity === 5) { rClass = "r-purple"; rColor = "#9b59b6"; }
      else if (r.rarity === 4) { rClass = "r-gold"; rColor = "#f1c40f"; }
      else if (r.rarity === 3) { rClass = "r-orange"; rColor = "#e67e22"; }
      else if (r.rarity === 2) { rClass = "r-blue"; rColor = "#3498db"; }

      const fusionBadge = r.isEquip ? `<div style="font-size:7.5px; color:#00ffcc; font-weight:bold; margin-top:2px;">🔮 Đã Tự Động Dung Hợp</div>` : "";

      gridHtml += `
        <div class="gacha-reward-item ${rClass}">
          <div style="font-size:22px; width:34px; height:34px; display:flex; align-items:center; justify-content:center; background:#192030; border-radius:4px;">${r.icon}</div>
          <div style="flex:1; text-align:left; overflow:hidden;">
            <div style="font-size:10px; font-weight:bold; color:${rColor}; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${r.name}</div>
            <div style="font-size:8px; color:#8fa0b8;">${r.desc || `Số lượng: x${r.qty || 1}`}</div>
            ${fusionBadge}
          </div>
        </div>
      `;
    });
    gridEl.innerHTML = gridHtml;
  }

  if (summaryEl) {
    summaryEl.innerHTML = `✨ Các vật phẩm đã được chuyển trực tiếp vào túi đồ & trang bị của bạn!`;
  }

  if (btnAgain1) {
    btnAgain1.innerText = bannerType === "normal" ? "Quay lại x1 (200k)" : "Triệu hồi x1 (3💎+3🔥)";
    btnAgain1.onclick = () => { closeGachaResultModal(); drawGacha(bannerType, 1); };
  }
  if (btnAgain10) {
    btnAgain10.innerText = bannerType === "normal" ? "Quay lại x10 (1.8M)" : "Triệu hồi x10 (25💎+25🔥)";
    btnAgain10.onclick = () => { closeGachaResultModal(); drawGacha(bannerType, 10); };
  }

  m.style.display = "flex";
}

function closeGachaResultModal() {
  const m = document.getElementById("gachaResultModal");
  if (m) m.style.display = "none";
}



// THÁP BOSS MA VƯƠNG (BOSS TOWER)
const TOWER_BOSSES = [
  { floor: 1, name: "Ma Vương Gorgon", title: "Điện Thờ Gorgon", lv: 150, hp: 80000, dmg: 800, def: 350, reqCp: 5000, icon: "🐍" },
  { floor: 2, name: "Thủy Quái Bahamut", title: "Vực Sâu Atlans", lv: 200, hp: 180000, dmg: 1500, def: 600, reqCp: 12000, icon: "🐉" },
  { floor: 3, name: "Tử Thần Balrog", title: "Lost Tower Cực Đỉnh", lv: 250, hp: 350000, dmg: 2800, def: 1000, reqCp: 25000, icon: "💀" },
  { floor: 4, name: "Kỵ Sĩ Ác Ma Tarkan", title: "Sa Mạc Chết Chóc", lv: 300, hp: 600000, dmg: 4500, def: 1800, reqCp: 45000, icon: "😈" },
  { floor: 5, name: "Hỏa Long Vương Hoàng Kim", title: "Hỏa Ngục Bất Diệt", lv: 350, hp: 1200000, dmg: 7000, def: 2800, reqCp: 80000, icon: "🐲" },
  { floor: 6, name: "Ma Thụ Cổ Yêu Aida", title: "Rừng Thiêng Hắc Ám", lv: 380, hp: 2000000, dmg: 10000, def: 4200, reqCp: 140000, icon: "🌳" },
  { floor: 7, name: "Bóng Ma Kundun", title: "Ảo Ảnh Hư Không", lv: 400, hp: 3500000, dmg: 14000, def: 6000, reqCp: 220000, icon: "👻" },
  { floor: 8, name: "Chiến Binh Thiên Giới", title: "Tầng Mây Icarus", lv: 400, hp: 5500000, dmg: 18000, def: 8500, reqCp: 350000, icon: "⚔️" },
  { floor: 9, name: "Cự Thần Maya Kanturu", title: "Lõi Năng Lượng Cổ Đại", lv: 400, hp: 8500000, dmg: 24000, def: 12000, reqCp: 550000, icon: "🤖" },
  { floor: 10, name: "Tử Thần Hư Không Kundun", title: "Hư Không Tối Thượng", lv: 400, hp: 15000000, dmg: 32000, def: 18000, reqCp: 900000, icon: "🌌" }
];

function getTowerBossData(floor) {
  if (floor <= 10) return TOWER_BOSSES[floor - 1];
  const scale = Math.pow(1.30, floor - 10);
  return {
    floor,
    name: `Kundun Tối Thượng Tầng ${floor}`,
    title: `Cung Điện Vô Tận Tầng ${floor}`,
    lv: 400,
    hp: Math.floor(15000000 * scale),
    dmg: Math.floor(32000 * Math.pow(1.20, floor - 10)),
    def: Math.floor(18000 * scale),
    reqCp: Math.floor(900000 * scale),
    icon: "👑"
  };
}

function openTowerModal() {
  const m = document.getElementById("towerModal");
  if (m) {
    m.style.display = "flex";
    renderTowerView();
  }
}

function closeTowerModal() {
  const m = document.getElementById("towerModal");
  if (m) m.style.display = "none";
}

function toggleAutoTower() {
  state.autoTower = !state.autoTower;
  const chk = document.getElementById("chkAutoTower");
  if (chk) chk.checked = !!state.autoTower;
  addLog(`🔄 [THÁP BOSS] Chế độ Tự Động Leo Tháp đã được ${state.autoTower ? "BẬT" : "TẮT"}!`, "log-buff");
  saveGameState();
}

function renderTowerView() {
  const floor = state.towerFloor || 1;
  const boss = getTowerBossData(floor);
  const stats = calculateStats();

  const titleEl = document.getElementById("txtTowerFloorTitle");
  const nameEl = document.getElementById("txtTowerBossName");
  const statsEl = document.getElementById("txtTowerBossStats");
  const cpRecEl = document.getElementById("txtTowerCpRec");
  const playerCpEl = document.getElementById("txtTowerPlayerCp");
  const badgeEl = document.getElementById("txtTowerFloorBadge");
  const hpBarEl = document.getElementById("txtTowerBossHpBar");
  const hpFillEl = document.getElementById("txtTowerBossHpFill");
  const spriteEl = document.getElementById("towerBossSpriteEl");
  const autoChk = document.getElementById("chkAutoTower");

  if (titleEl) titleEl.innerText = `TẦNG ${floor}: ${boss.title.toUpperCase()}`;
  if (nameEl) nameEl.innerText = `${boss.icon} ${boss.name} (Lv.${boss.lv})`;
  if (statsEl) statsEl.innerText = `Máu: ${boss.hp.toLocaleString()} • Công: ${boss.dmg.toLocaleString()} • Thủ: ${boss.def.toLocaleString()}`;
  if (playerCpEl) playerCpEl.innerText = `${stats.cp.toLocaleString()} CP`;
  if (badgeEl) badgeEl.innerText = `T.${floor}`;
  if (autoChk) autoChk.checked = !!state.autoTower;

  if (hpBarEl) hpBarEl.innerText = `HP: ${boss.hp.toLocaleString()} / ${boss.hp.toLocaleString()} (100%)`;
  if (hpFillEl) hpFillEl.style.width = "100%";

  // Render 2.5D Volumetric Boss Sprite based on floor
  if (spriteEl && typeof CHIBI_MONSTERS !== "undefined") {
    let bossSvg = CHIBI_MONSTERS.spider;
    if (floor % 7 === 1) bossSvg = CHIBI_MONSTERS.spider;
    else if (floor % 7 === 2) bossSvg = CHIBI_MONSTERS.sea;
    else if (floor % 7 === 3) bossSvg = CHIBI_MONSTERS.demon;
    else if (floor % 7 === 4) bossSvg = CHIBI_MONSTERS.golem;
    else if (floor % 7 === 5) bossSvg = CHIBI_MONSTERS.dragon;
    else if (floor % 7 === 6) bossSvg = CHIBI_MONSTERS.treant;
    else bossSvg = CHIBI_MONSTERS.void;
    spriteEl.innerHTML = bossSvg;
  }

  if (cpRecEl) {
    const isReady = stats.cp >= boss.reqCp;
    cpRecEl.innerHTML = `Lực chiến đề cử: <b>${boss.reqCp.toLocaleString()} CP</b> | Bạn có: <b style="color:${isReady ? "#2ecc71" : "#ff7675"};">${stats.cp.toLocaleString()} CP</b> ${isReady ? "✓ Đủ sức chiến thắng!" : "⚠️ Cần rèn thêm đồ!"}`;
  }
}

function challengeTowerBoss() {
  const floor = state.towerFloor || 1;
  const boss = getTowerBossData(floor);
  const stats = calculateStats();
  const battleMsg = document.getElementById("towerBattleMsg");

  if (stats.cp < boss.reqCp * 0.40) {
    if (battleMsg) {
      battleMsg.style.color = "#ff7675";
      battleMsg.innerText = `⚠️ Lực chiến chênh lệch lớn! Cần ít nhất ${(boss.reqCp * 0.40).toLocaleString()} CP để đối kháng Ma Vương!`;
    }
    audio.playSlash();
    return;
  }

  audio.playMagic();
  audio.playSlash();

  const winChance = Math.min(0.98, Math.max(0.20, stats.cp / (boss.reqCp * 0.95)));
  if (Math.random() <= winChance) {
    state.towerFloor = floor + 1;

    // Rơi cực nhiều Lông Vũ để ép cánh!
    const dropFeathers = Math.floor(Math.random() * 3) + 3; // 3 - 5 Lông Vũ!
    const dropFlames = floor >= 8 ? Math.floor(Math.random() * 2) + 1 : 0;
    const dropBeast = Math.floor(Math.random() * 4) + 4;
    const dropHorn = floor >= 4 ? 1 : 0;
    const dropKirin = floor >= 7 && Math.random() < 0.5 ? 1 : 0;
    const dropZen = floor * 500000 + 500000;
    const dropBless = Math.floor(Math.random() * 3) + 3;
    const dropChaos = Math.floor(Math.random() * 3) + 3;
    const dropLife = Math.floor(Math.random() * 2) + 2;

    state.feather = (state.feather || 0) + dropFeathers;
    if (dropFlames > 0) state.flame = (state.flame || 0) + dropFlames;
    state.beastSoul = (state.beastSoul || 0) + dropBeast;
    if (dropHorn > 0) state.fenrirHorn = (state.fenrirHorn || 0) + dropHorn;
    if (dropKirin > 0) state.kirinFragment = (state.kirinFragment || 0) + dropKirin;
    state.zen += dropZen;
    state.bless += dropBless;
    state.chaos += dropChaos;
    state.life += dropLife;

    // Trang bị Thần Thoại rơi ra và TỰ ĐỘNG DUNG HỢP vào người!
    const mythicTier = Math.min(10, Math.floor(floor / 2) + 4);
    const mythicGear = generateItem(mythicTier, 4, null, "boss");
    handleDroppedItem(mythicGear);

    // Cánh Thần Thoại & Linh Thú rơi ra từ Boss Tháp và TỰ ĐỘNG DUNG HỢP!
    if (floor >= 2) {
      if (Math.random() < 0.5) {
        const droppedWing = generateWingItem(mythicTier, 4);
        spawnFloatingLoot("🪽", `[${droppedWing.name}]`, RARITIES[droppedWing.rarity].color);
        handleDroppedItem(droppedWing);
      } else {
        const droppedPet = generatePetItem(mythicTier, 4);
        spawnFloatingLoot("🐺", `[${droppedPet.name}]`, RARITIES[droppedPet.rarity].color);
        handleDroppedItem(droppedPet);
      }
    }

    audio.playGateOpen();
    audio.playKeng();
    audio.vibrate(250);

    addLog(`🏆 [ĐẠI THẮNG THÁP BOSS] Đã chém gục [${boss.name}] tại ${boss.title}! Nhận +${dropFeathers} Lông Vũ, +${dropZen.toLocaleString()} Zen, Ngọc Quý & Trang Bị Thần Thoại!`, "log-crit");
    spawnFloatingLoot("🗼", `VƯỢT TẦNG ${floor}!`, "#f1c40f");

    if (battleMsg) {
      battleMsg.style.color = "#2ecc71";
      battleMsg.innerHTML = `🎉 ĐẠI THẮNG! Đã hạ gục ${boss.name}! Mở khóa Tầng ${state.towerFloor}! Nhận +${dropFeathers} Lông Vũ Chaos!`;
    }
    renderTowerView();
    updateUI();
    saveGameState();
  } else {
    audio.playSlash();
    if (battleMsg) {
      battleMsg.style.color = "#ff7675";
      battleMsg.innerText = `💀 Thất bại trước đòn hủy diệt của ${boss.name}! Hãy nâng cấp trang bị, dung hợp hoặc tăng điểm rồi khiêu chiến lại!`;
    }
    addLog(`💀 [THÁP BOSS] Bạn đã thất bại trước [${boss.name}] tại Tầng ${floor}! Cần thêm lực chiến!`, "log-boss");
  }
}


window.onload = () => {
  const curUser = getCurrentUser();
  const accounts = getAccounts();

  if (curUser && accounts[curUser]) {
    let cClass = accounts[curUser].charClass;
    if (!["dk", "fe", "dw"].includes(cClass)) cClass = "dk";
    state = Object.assign(getDefaultState(curUser, cClass), accounts[curUser].state);
    if (!["dk", "fe", "dw"].includes(state.charClass)) state.charClass = cClass;
    if (!state.skills || state.skills.length === 0 || !state.skills.some(s => s.id)) state.skills = getClassSkills(state.charClass);
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


// --- PETS, QUESTS, BLOOD CASTLE & PVP ENGINE ---
const PET_SVGS = {
  angel: `<svg viewBox="0 0 40 40" style="width:100%; height:100%;">
    <ellipse cx="20" cy="8" rx="8" ry="2.5" fill="none" stroke="#ffd700" stroke-width="1.8"/>
    <path d="M12 18 Q2 10 6 26 Q14 22 16 24" fill="#ffffff" stroke="#74b9ff" stroke-width="1"/>
    <path d="M28 18 Q38 10 34 26 Q26 22 24 24" fill="#ffffff" stroke="#74b9ff" stroke-width="1"/>
    <path d="M16 22 L24 22 L26 34 L14 34 Z" fill="#74b9ff" stroke="#ffffff" stroke-width="1"/>
    <circle cx="20" cy="16" r="6" fill="#ffeaa7"/>
    <circle cx="18" cy="16" r="0.8" fill="#2c3e50"/>
    <circle cx="22" cy="16" r="0.8" fill="#2c3e50"/>
  </svg>`,
  satan: `<svg viewBox="0 0 40 40" style="width:100%; height:100%;">
    <path d="M14 12 Q10 4 15 8 Z" fill="#e74c3c"/>
    <path d="M26 12 Q30 4 25 8 Z" fill="#e74c3c"/>
    <path d="M12 20 Q2 14 8 28 Q14 24 16 25" fill="#2c2c54" stroke="#c0392b" stroke-width="1"/>
    <path d="M28 20 Q38 14 32 28 Q26 24 24 25" fill="#2c2c54" stroke="#c0392b" stroke-width="1"/>
    <ellipse cx="20" cy="26" rx="6" ry="7" fill="#e74c3c"/>
    <circle cx="20" cy="16" r="6" fill="#e74c3c"/>
    <circle cx="18" cy="16" r="1" fill="#ffd700"/>
    <circle cx="22" cy="16" r="1" fill="#ffd700"/>
  </svg>`,
  fenrir: `<svg viewBox="0 0 40 40" style="width:100%; height:100%;">
    <polygon points="20,4 18,12 22,12" fill="#ffd700" stroke="#d35400" stroke-width="0.8"/>
    <polygon points="14,14 20,10 26,14 24,24 16,24" fill="#f1c40f" stroke="#d35400" stroke-width="1"/>
    <polygon points="14,12 11,6 16,10" fill="#f39c12"/>
    <polygon points="26,12 29,6 24,10" fill="#f39c12"/>
    <ellipse cx="20" cy="27" rx="8" ry="7" fill="#f1c40f" stroke="#d35400" stroke-width="1"/>
    <circle cx="18" cy="17" r="1.5" fill="#00d2d3"/>
    <circle cx="22" cy="17" r="1.5" fill="#00d2d3"/>
  </svg>`,
  fairy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" style="width:100%; height:100%;">
  <circle cx="20" cy="20" r="14" fill="#00d2d3" opacity="0.25"/>
  <path d="M12 18 Q2 6 6 26 Q14 20 16 22" fill="#7efff5" opacity="0.85" stroke="#ffffff" stroke-width="0.8"/>
  <path d="M28 18 Q38 6 34 26 Q26 20 24 22" fill="#7efff5" opacity="0.85" stroke="#ffffff" stroke-width="0.8"/>
  <circle cx="20" cy="18" r="6.5" fill="#fff9d2"/>
  <circle cx="18" cy="17" r="1.2" fill="#0984e3"/>
  <circle cx="22" cy="17" r="1.2" fill="#0984e3"/>
  <ellipse cx="20" cy="27" rx="4" ry="6" fill="#00cec9"/>
  <circle cx="20" cy="8" r="2.5" fill="#ffd700"/>
</svg>`,
  phoenix: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" style="width:100%; height:100%;">
  <path d="M10 20 Q2 8 8 28 Q15 24 16 26" fill="#ff7675" stroke="#ff4757" stroke-width="1"/>
  <path d="M30 20 Q38 8 32 28 Q25 24 24 26" fill="#ff7675" stroke="#ff4757" stroke-width="1"/>
  <ellipse cx="20" cy="24" rx="6" ry="9" fill="#ff4757"/>
  <polygon points="20,6 16,16 24,16" fill="#feca57"/>
  <circle cx="20" cy="14" r="5" fill="#ee5253"/>
  <circle cx="18" cy="14" r="1" fill="#ffffff"/>
  <circle cx="22" cy="14" r="1" fill="#ffffff"/>
  <polygon points="20,17 18,22 22,22" fill="#f39c12"/>
</svg>`,
  drake: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" style="width:100%; height:100%;">
  <path d="M12 20 Q2 10 10 30 Q16 25 18 26" fill="#74b9ff" opacity="0.8" stroke="#0984e3" stroke-width="1"/>
  <path d="M28 20 Q38 10 30 30 Q24 25 22 26" fill="#74b9ff" opacity="0.8" stroke="#0984e3" stroke-width="1"/>
  <ellipse cx="20" cy="25" rx="7" ry="8" fill="#2d3436" stroke="#74b9ff" stroke-width="1"/>
  <polygon points="20,8 14,18 26,18" fill="#dfe6e9"/>
  <circle cx="20" cy="16" r="6" fill="#636e72"/>
  <circle cx="18" cy="16" r="1.5" fill="#00d2d3"/>
  <circle cx="22" cy="16" r="1.5" fill="#00d2d3"/>
</svg>`,
  kirin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" style="width:100%; height:100%;">
  <polygon points="20,2 18,10 22,10" fill="#ffffff" stroke="#ffd700" stroke-width="1.2"/>
  <circle cx="20" cy="6" r="2.5" fill="#ffd700"/>
  <ellipse cx="20" cy="26" rx="8" ry="8" fill="#f1c40f" stroke="#d35400" stroke-width="1.2"/>
  <polygon points="12,12 20,8 28,12 26,22 14,22" fill="#feca57" stroke="#e67e22" stroke-width="1"/>
  <circle cx="18" cy="16" r="1.5" fill="#00cec9"/>
  <circle cx="22" cy="16" r="1.5" fill="#00cec9"/>
  <path d="M14 26 Q4 22 8 34" fill="none" stroke="#ffd700" stroke-width="2"/>
  <path d="M26 26 Q36 22 32 34" fill="none" stroke="#ffd700" stroke-width="2"/>
</svg>`
};

const PETS_DATA = [
  { id: "angel", name: "Thiên Thần Hộ Mệnh", icon: "👼", desc: "Giảm 15% ST nhận, hồi +150 HP/nhịp", cost: 150000, color: "#74b9ff" },
  { id: "satan", name: "Tiểu Ác Ma Satan", icon: "👿", desc: "Tăng +20% Sát thương đòn đánh, +10% Bạo kích", cost: 200000, color: "#ff7675" },
  { id: "fenrir", name: "Chiến Lang Sói Tinh", icon: "🐺", desc: "Tăng +20% Sát thương, +15% Thủ, phản đòn 10%", cost: 350000, color: "#f1c40f" },
  { id: "fairy", name: "Tiên Linh Tinh Tú", icon: "🧚‍♀️", desc: "Tăng +35% Zen rơi, +25% EXP nhận được khi farm", cost: 450000, color: "#00cec9" },
  { id: "phoenix", name: "Hỏa Phượng Hoàng", icon: "🦅", desc: "Tăng +25% ST Phép, thiêu đốt quái mỗi nhịp đánh", cost: 600000, color: "#ff4757" },
  { id: "drake", name: "Băng Long Cốt Tinh", icon: "🐉", desc: "Tăng +30% ST Bạo kích, làm chậm quái 30%", cost: 800000, color: "#70a1ff" },
  { id: "kirin", name: "Kỳ Lân Hoàng Kim", icon: "🦄", desc: "Tăng +40% Tất cả Thuộc tính, nhân đôi tỷ lệ rơi Đồ Hiếm & Ngọc", cost: 1200000, color: "#ffd700" }
];

function initPetsState() {
  if (!state.petsOwned) state.petsOwned = ["angel"];
  if (!state.activePet) state.activePet = "angel";
}

function openPetShopModal() {
  initPetsState();
  const m = document.getElementById("petShopModal");
  const list = document.getElementById("petListContainer");
  if (!m || !list) return;

  list.innerHTML = PETS_DATA.map(p => {
    const isOwned = (state.petsOwned || []).includes(p.id);
    const isActive = state.activePet === p.id;
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 8px; background:#0c0e14; border:1px solid ${isActive ? "var(--gold)" : "#232a3d"}; border-radius:5px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:34px; height:34px;">${PET_SVGS[p.id] || ""}</div>
          <div style="text-align:left;">
            <div style="font-weight:bold; font-size:11px; color:${p.color};">${p.name} ${isActive ? "★ (Đang Xuất Chiến)" : ""}</div>
            <div style="font-size:9px; color:#8fa0b8;">${p.desc}</div>
          </div>
        </div>
        <div>
          ${isActive ? `<span style="font-size:10px; color:var(--gold); font-weight:bold;">Đang dùng</span>` :
            (isOwned ? `<button class="btn btn-sm btn-success" onclick="selectPet('${p.id}')">Xuất Chiến</button>` :
            `<button class="btn btn-sm btn-primary" onclick="buyPet('${p.id}', ${p.cost})">${p.cost.toLocaleString()}z</button>`)}
        </div>
      </div>
    `;
  }).join("");

  m.style.display = "flex";
}

function closePetShopModal() {
  const m = document.getElementById("petShopModal");
  if (m) m.style.display = "none";
}

function selectPet(petId) {
  initPetsState();
  state.activePet = petId;
  audio.playKeng();
  addLog(`[TRỢ THỦ] Đã kích hoạt [${petId.toUpperCase()}] xuất chiến! Lực chiến và thuộc tính đã được gia tăng!`, "log-crit");
  openPetShopModal();
  updateUI();
  saveGameState();
}

function buyPet(petId, cost) {
  if (state.zen < cost) {
    addLog(`Không đủ ${cost.toLocaleString()} Zen để sở hữu linh thú này!`, "log-damage-taken");
    return;
  }
  state.zen -= cost;
  initPetsState();
  state.petsOwned.push(petId);
  state.activePet = petId;
  audio.playKeng();
  audio.vibrate(150);
  addLog(`★ SỞ HỮU LINH THÚ THẦN THOẠI! [${petId.toUpperCase()}] đã đồng hành cùng bạn! ★`, "log-crit");
  openPetShopModal();
  updateUI();
  saveGameState();
}

// BLOOD CASTLE 60S EVENT ENGINE
function startBloodCastleEvent() {
  if (!state.bloodCastle) {
    state.bloodCastle = { inEvent: false, timeLeft: 60, kills: 0, attempts: 3 };
  }
  if (state.bloodCastle.attempts <= 0) {
    addLog("Đã hết 3 lượt tham gia Huyết Lâu hôm nay!", "log-damage-taken");
    return;
  }
  if (state.bloodCastle.inEvent) {
    addLog("Đang trong phụ bản Huyết Lâu!", "log-norm");
    return;
  }

  state.bloodCastle.attempts--;
  state.bloodCastle.inEvent = true;
  state.bloodCastle.timeLeft = 60;
  state.bloodCastle.kills = 0;

  const timerBanner = document.getElementById("bcTimerBanner");
  if (timerBanner) timerBanner.style.display = "flex";

  const attemptsTxt = document.getElementById("txtBcAttempts");
  if (attemptsTxt) attemptsTxt.innerText = `${state.bloodCastle.attempts} / 3`;

  // Change Arena Background to Blood Bridge
  const bg = document.getElementById("arenaBg");
  if (bg) bg.style.background = "linear-gradient(180deg, #4a0000 0%, #1a0505 70%, #000000 100%)";

  audio.playGateOpen();
  audio.playKeng();
  audio.vibrate(180);
  addLog("🏰 [HUYẾT LÂU] CỔNG HUYẾT LÂU ĐÃ MỞ! 60 GIÂY HÀNH ĐỘNG BẮT ĐẦU! TOÀN LỰC XÔNG LÊN!", "log-boss");

  if (state.quests && state.quests.daily && state.quests.daily.bloodCastle) {
    state.quests.daily.bloodCastle.cur++;
  }

  updateUI();
  saveGameState();
}

function finishBloodCastle(victory) {
  if (!state.bloodCastle) return;
  state.bloodCastle.inEvent = false;

  const timerBanner = document.getElementById("bcTimerBanner");
  if (timerBanner) timerBanner.style.display = "none";

  updateArenaBackground(state.currentMapId);

  if (victory) {
    const zenReward = 500000 + state.currentMapId * 50000;
    state.zen += zenReward;
    state.bless += 3;
    state.chaos += 2;
    state.life += 1;
    audio.playKeng();
    audio.vibrate(250);
    addLog(`🏆 [HUYẾT LÂU ĐẠI THẮNG] Phá hủy Tượng Thần thành công! Nhận Rương Thần: +${zenReward.toLocaleString()} Zen, +3x Bless, +2x Chaos, +1x Life!`, "log-crit");
  } else {
    state.zen += 150000;
    state.bless += 1;
    addLog(`⏱️ [HẾT GIỜ HUYẾT LÂU] Rời khỏi Huyết Lâu! Nhận thưởng an ủi: +150.000 Zen & 1x Bless!`, "log-norm");
  }

  updateUI();
  saveGameState();
}



function addPlayerExp(amount) {
  state.exp = (state.exp || 0) + amount;
  let leveledUp = false;
  while (state.exp >= state.nextExp && state.level < 400) {
    state.exp -= state.nextExp;
    state.level++;
    state.nextExp = getRequiredExpForLevel(state.level);
    state.freePoints = (state.freePoints || 0) + 5;
    if (state.level % 5 === 0) {
      state.skillPoints = (state.skillPoints || 0) + 1;
    }
    leveledUp = true;
  }
  if (state.level >= 400) {
    state.level = 400;
    state.exp = state.nextExp;
  }
  if (leveledUp) {
    audio.playKeng();
    audio.vibrate(150);
    addLog(`★ LEVEL UP! Bạn đã đạt Cấp ${state.level}! Chỉ số cơ bản & Lực chiến đã tăng mạnh! ★`, "log-crit");
  }
}

// ==================== MULTI-EVENTS SYSTEM ====================
function initEventsState() {
  if (!state.events) {
    state.events = {};
  }
  const today = new Date().toDateString();
  if (state.events.lastDate !== today) {
    state.events.lastDate = today;
    state.events.devilSquare = { attempts: 3, inEvent: false, timeLeft: 60, kills: 0 };
    state.events.chaosCastle = { attempts: 3, inEvent: false, timeLeft: 60, kills: 0 };
    state.events.goldenDragon = { attempts: 3, inEvent: false, timeLeft: 45, bossHp: 500000, maxHp: 500000 };
    state.events.worldBoss = { attempts: 3, inEvent: false, timeLeft: 60, bossHp: 2500000, maxHp: 2500000 };
    if (state.bloodCastle) state.bloodCastle.attempts = 3;
  }
}

function renderEventsView() {
  initEventsState();
  updateUI();
}

function startDevilSquareEvent() {
  initEventsState();
  const ds = state.events.devilSquare;
  if (ds.attempts <= 0) {
    addLog("Đã hết 3 lượt tham gia Quảng Trường Quỷ hôm nay!", "log-boss");
    return;
  }
  if (ds.inEvent || (state.bloodCastle && state.bloodCastle.inEvent)) {
    addLog("Đang trong một sự kiện khác! Hãy hoàn thành trước.", "log-boss");
    return;
  }

  ds.attempts--;
  ds.inEvent = true;
  ds.timeLeft = 60;
  ds.kills = 0;

  switchTab("battle");

  const timerBanner = document.getElementById("bcTimerBanner");
  if (timerBanner) {
    timerBanner.style.display = "flex";
    const titleEl = document.getElementById("txtBcEventTitle");
    if (titleEl) titleEl.innerText = "😈 QUẢNG TRƯỜNG QUỶ:";
    const goalEl = document.getElementById("txtBcGoalLabel");
    if (goalEl) goalEl.innerText = "Diệt";
  }

  const bg = document.getElementById("arenaBg");
  if (bg) bg.style.background = "linear-gradient(180deg, #2c003e 0%, #150020 70%, #000000 100%)";

  audio.playGateOpen();
  audio.playKeng();
  audio.vibrate(180);
  addLog("😈 [QUẢNG TRƯỜNG QUỶ] QUỶ THẦN TRỖI DẬY! 60 GIÂY QUÉT QUÁI THU THẬP SIÊU CẤP EXP BẮT ĐẦU!", "log-crit");
  updateUI();
  saveGameState();
}

function finishDevilSquare(victory) {
  const ds = state.events && state.events.devilSquare;
  if (!ds) return;
  ds.inEvent = false;

  const timerBanner = document.getElementById("bcTimerBanner");
  if (timerBanner) timerBanner.style.display = "none";
  updateArenaBackground(state.currentMapId);

  if (victory || ds.kills >= 35) {
    const zenReward = 800000 + state.currentMapId * 80000;
    state.zen += zenReward;
    state.soul = (state.soul || 0) + 2;
    state.chaos = (state.chaos || 0) + 2;
    state.feather = (state.feather || 0) + 3;
    const expGain = 150000 + state.level * 1000;
    addPlayerExp(expGain);

    audio.playKeng();
    audio.vibrate(250);
    spawnHeroFloatingEffect("🏆 ĐẠI THẮNG QUẢNG TRƯỜNG QUỶ!", "float-crit");
    addLog(`🏆 [QUẢNG TRƯỜNG QUỶ] ĐẠI THẮNG! Quét sạch quái vật, nhận +${zenReward.toLocaleString()} Zen, +2x Soul, +2x Chaos, +3x Lông Vũ & +${expGain.toLocaleString()} EXP!`, "log-crit");
  } else {
    state.zen += 200000;
    addLog("⏱️ [HẾT GIỜ QUẢNG TRƯỜNG QUỶ] Nhận thưởng an ủi: +200.000 Zen!", "log-norm");
  }
  updateUI();
  saveGameState();
}

function startChaosCastleEvent() {
  initEventsState();
  const cc = state.events.chaosCastle;
  if (cc.attempts <= 0) {
    addLog("Đã hết 3 lượt tham gia Hỗn Nguyên Lâu hôm nay!", "log-boss");
    return;
  }
  if (cc.inEvent || (state.bloodCastle && state.bloodCastle.inEvent)) {
    addLog("Đang trong một sự kiện khác!", "log-boss");
    return;
  }

  cc.attempts--;
  cc.inEvent = true;
  cc.timeLeft = 60;
  cc.kills = 0;

  switchTab("battle");

  const timerBanner = document.getElementById("bcTimerBanner");
  if (timerBanner) {
    timerBanner.style.display = "flex";
    const titleEl = document.getElementById("txtBcEventTitle");
    if (titleEl) titleEl.innerText = "⚔️ HỖN NGUYÊN LÂU:";
    const goalEl = document.getElementById("txtBcGoalLabel");
    if (goalEl) goalEl.innerText = "Hạ";
  }

  const bg = document.getElementById("arenaBg");
  if (bg) bg.style.background = "linear-gradient(180deg, #16a085 0%, #0e6655 50%, #07352c 100%)";

  audio.playGateOpen();
  audio.playKeng();
  audio.vibrate(180);
  addLog("⚔️ [HỖN NGUYÊN LÂU] SÀN ĐẤU SINH TỬ BẮT ĐẦU! SỐNG SÓT ĐẾN CUỐI CÙNG ĐỂ GIÀNH THÁNH KHÍ!", "log-crit");
  updateUI();
  saveGameState();
}

function finishChaosCastle(victory) {
  const cc = state.events && state.events.chaosCastle;
  if (!cc) return;
  cc.inEvent = false;

  const timerBanner = document.getElementById("bcTimerBanner");
  if (timerBanner) timerBanner.style.display = "none";
  updateArenaBackground(state.currentMapId);

  if (victory || cc.kills >= 25) {
    const zenReward = 1200000;
    state.zen += zenReward;
    state.life = (state.life || 0) + 2;
    state.bless = (state.bless || 0) + 2;
    state.beastSoul = (state.beastSoul || 0) + 5;

    // Rớt trang bị Thần Thoại và tự động dung hợp
    const mythicGear = generateItem(Math.min(10, state.currentMapId + 3), 4, null, "boss");
    handleDroppedItem(mythicGear);

    audio.playKeng();
    audio.vibrate(250);
    spawnHeroFloatingEffect("🏆 ĐỆ NHẤT HỖN NGUYÊN LÂU!", "float-crit");
    addLog(`🏆 [HỖN NGUYÊN LÂU] CHIẾN THẮNG TUYỆT ĐỐI! Nhận +${zenReward.toLocaleString()} Zen, +2x Life, +2x Bless, +5x Hồn Thú & Trang Bị Cực Phẩm!`, "log-crit");
  } else {
    state.zen += 250000;
    addLog("⏱️ [HẾT GIỜ HỖN NGUYÊN LÂU] Nhận thưởng an ủi: +250.000 Zen!", "log-norm");
  }
  updateUI();
  saveGameState();
}

function startGoldenDragonEvent() {
  initEventsState();
  const gd = state.events.goldenDragon;
  if (gd.attempts <= 0) {
    addLog("Đã hết 3 lượt săn Binh Đoàn Rồng Vàng hôm nay!", "log-boss");
    return;
  }
  if (gd.inEvent) return;

  gd.attempts--;
  gd.inEvent = true;
  gd.timeLeft = 45;
  gd.maxHp = 500000;
  gd.bossHp = 500000;

  switchTab("battle");

  const timerBanner = document.getElementById("bcTimerBanner");
  if (timerBanner) {
    timerBanner.style.display = "flex";
    const titleEl = document.getElementById("txtBcEventTitle");
    if (titleEl) titleEl.innerText = "🐉 RỒNG VÀNG:";
    const goalEl = document.getElementById("txtBcGoalLabel");
    if (goalEl) goalEl.innerText = "HP";
  }

  const bg = document.getElementById("arenaBg");
  if (bg) bg.style.background = "linear-gradient(180deg, #b7791f 0%, #744210 50%, #1a1005 100%)";

  audio.playGateOpen();
  audio.playKeng();
  audio.vibrate(200);
  addLog("🐉 [BINH ĐOÀN RỒNG VÀNG] RỒNG VÀNG HOÀNG KIM XUẤT HIỆN! TIÊU DIỆT NHẬN HỘP VÀNG MAY MẮN!", "log-crit");
  updateUI();
  saveGameState();
}

function finishGoldenDragon(victory) {
  const gd = state.events && state.events.goldenDragon;
  if (!gd) return;
  gd.inEvent = false;

  const timerBanner = document.getElementById("bcTimerBanner");
  if (timerBanner) timerBanner.style.display = "none";
  updateArenaBackground(state.currentMapId);

  if (victory) {
    const zenReward = 2000000;
    state.zen += zenReward;
    state.bless = (state.bless || 0) + 3;
    state.chaos = (state.chaos || 0) + 3;

    // Tỷ lệ rơi Cánh Thần hoặc Linh Thú
    if (Math.random() < 0.5) {
      const wing = generateWingItem(6, 4);
      handleDroppedItem(wing);
    } else {
      const pet = generatePetItem(5, 4);
      handleDroppedItem(pet);
    }

    audio.playKeng();
    audio.vibrate(250);
    spawnHeroFloatingEffect("🐉 HẠ GỤC RỒNG VÀNG!", "float-crit");
    addLog(`🏆 [ĐẠI THẮNG RỒNG VÀNG] Nhận +${zenReward.toLocaleString()} Zen, +3x Bless, +3x Chaos & Mở Hòm Vàng Rơi Cực Phẩm!`, "log-crit");
  } else {
    state.zen += 300000;
    addLog("⏱️ [HẾT GIỜ] Rồng Vàng đã bay mất! Nhận thưởng an ủi +300.000 Zen!", "log-norm");
  }
  updateUI();
  saveGameState();
}

function startWorldBossEvent() {
  initEventsState();
  const wb = state.events.worldBoss;
  if (wb.attempts <= 0) {
    addLog("Đã hết 3 lượt khiêu chiến Boss Thế Giới hôm nay!", "log-boss");
    return;
  }
  if (wb.inEvent) return;

  wb.attempts--;
  wb.inEvent = true;
  wb.timeLeft = 60;
  wb.maxHp = 2500000;
  wb.bossHp = 2500000;

  switchTab("battle");

  const timerBanner = document.getElementById("bcTimerBanner");
  if (timerBanner) {
    timerBanner.style.display = "flex";
    const titleEl = document.getElementById("txtBcEventTitle");
    if (titleEl) titleEl.innerText = "👑 BOSS KUNDUN:";
    const goalEl = document.getElementById("txtBcGoalLabel");
    if (goalEl) goalEl.innerText = "HP";
  }

  const bg = document.getElementById("arenaBg");
  if (bg) bg.style.background = "linear-gradient(180deg, #780206 0%, #061161 100%)";

  audio.playGateOpen();
  audio.playKeng();
  audio.vibrate(250);
  addLog("👑 [BOSS THẾ GIỚI] CHÚA TỂ BÓNG TỐI KUNDUN THỨC TỈNH! TOÀN LỤC ĐỊA MU TẬP KẾT TIÊU DIỆT!", "log-crit");
  updateUI();
  saveGameState();
}

function finishWorldBoss(victory) {
  const wb = state.events && state.events.worldBoss;
  if (!wb) return;
  wb.inEvent = false;

  const timerBanner = document.getElementById("bcTimerBanner");
  if (timerBanner) timerBanner.style.display = "none";
  updateArenaBackground(state.currentMapId);

  if (victory) {
    const zenReward = 5000000;
    state.zen += zenReward;
    state.flame = (state.flame || 0) + 1;
    state.kirinFragment = (state.kirinFragment || 0) + 1;
    state.bless = (state.bless || 0) + 5;
    state.chaos = (state.chaos || 0) + 5;

    // Rơi trang bị Đỏ Thần Thoại Bậc 10
    const mythicGear = generateItem(10, 6, null, "boss");
    handleDroppedItem(mythicGear);

    audio.playGateOpen();
    audio.playKeng();
    audio.vibrate(300);
    spawnHeroFloatingEffect("👑 ĐẠI THẮNG CHÚA TỂ KUNDUN!", "float-crit");
    addLog(`🏆 [ĐẠI THẮNG BOSS THẾ GIỚI] ĐÃ CHÉM GỤC MA VƯƠNG KUNDUN! Nhận +${zenReward.toLocaleString()} Zen, +1x Ngọn Lửa Condor, +1x Mảnh Kỳ Lân, +5x Bless & Trang Bị Đỏ Bậc 10!`, "log-crit");
  } else {
    state.zen += 500000;
    addLog("⏱️ [HẾT GIỜ] Ma Vương Kundun đã rút lui vào hư không! Nhận thưởng an ủi +500.000 Zen!", "log-norm");
  }
  updateUI();
  saveGameState();
}

// QUESTS & ACHIEVEMENTS SYSTEM
let currentQuestTab = "daily";

function initQuestsState() {
  const today = new Date().toDateString();
  if (!state.quests || state.quests.lastResetDay !== today) {
    if (!state.bloodCastle) state.bloodCastle = { inEvent: false, timeLeft: 60, kills: 0, attempts: 3 };
    state.bloodCastle.attempts = 3;
    const oldAchieve = state.quests ? state.quests.achievements : null;
    state.quests = {
      lastResetDay: today,
      daily: {
        killMobs: { cur: 0, target: 100, claimed: false, rewardZen: 50000, title: "Thợ Săn Quái Vật", desc: "Tiêu diệt 100 quái dã ngoại" },
        killBosses: { cur: 0, target: 2, claimed: false, rewardBless: 1, title: "Trảm Sát Thủ Lĩnh", desc: "Tiêu diệt 2 Boss Thủ Lĩnh" },
        forgeOnce: { cur: 0, target: 1, claimed: false, rewardChaos: 1, title: "Luyện Kim Thuật", desc: "Cường hóa trang bị tại Lò Rèn 1 lần" },
        usePotions: { cur: 0, target: 5, claimed: false, rewardPotions: 20, title: "Dược Sĩ Phòng Thân", desc: "Sử dụng 5 bình dược phẩm" },
        bloodCastle: { cur: 0, target: 1, claimed: false, rewardLife: 1, title: "Dũng Sĩ Huyết Lâu", desc: "Tham gia phụ bản Huyết Lâu 1 lần" }
      },
      achievements: oldAchieve || {
        lv50: { claimed: false, title: "Tập Sự Lorencia", desc: "Đạt Cấp Độ 50", rewardZen: 100000, rewardBless: 2 },
        lv100: { claimed: false, title: "Chiến Binh Thành Thạo", desc: "Đạt Cấp Độ 100", rewardZen: 300000, rewardBless: 3, rewardChaos: 1 },
        lv200: { claimed: false, title: "Hào Kiệt Lục Địa", desc: "Đạt Cấp Độ 200", rewardZen: 1000000, rewardBless: 5, rewardChaos: 2 },
        rs1: { claimed: false, title: "Chuyển Sinh Tái Sinh", desc: "Thực hiện Chuyển Sinh lần 1", rewardZen: 2000000, rewardBless: 10 },
        plus9: { claimed: false, title: "Bậc Thầy Cường Hóa", desc: "Sở hữu trang bị cường hóa +9", rewardChaos: 3, rewardLife: 2 },
        boss25: { claimed: false, title: "Sát Tinh Thủ Lĩnh", desc: "Tiêu diệt 25 Boss Thủ Lĩnh", rewardChest: 1 }
      }
    };
  }
}

function openQuestsModal() {
  initQuestsState();
  const m = document.getElementById("questsModal");
  if (m) m.style.display = "flex";
  renderQuestsModal(currentQuestTab);
}
function closeQuestsModal() {
  const m = document.getElementById("questsModal");
  if (m) m.style.display = "none";
}
function switchQuestTab(tab) {
  currentQuestTab = tab;
  const btnD = document.getElementById("btnTabDailyQuests");
  const btnA = document.getElementById("btnTabAchievements");
  if (btnD) btnD.classList.toggle("btn-primary", tab === "daily");
  if (btnA) btnA.classList.toggle("btn-primary", tab === "achieve");
  renderQuestsModal(tab);
}

function renderQuestsModal(tab) {
  initQuestsState();
  const container = document.getElementById("questsContentContainer");
  if (!container) return;

  let html = "";
  if (tab === "daily") {
    const daily = state.quests.daily;
    for (const k in daily) {
      const q = daily[k];
      const isDone = q.cur >= q.target;
      const canClaim = isDone && !q.claimed;

      let rewardText = "";
      if (q.rewardZen) rewardText = `+${q.rewardZen.toLocaleString()} Zen`;
      if (q.rewardBless) rewardText = `+${q.rewardBless} Bless`;
      if (q.rewardChaos) rewardText = `+${q.rewardChaos} Chaos`;
      if (q.rewardLife) rewardText = `+${q.rewardLife} Life`;
      if (q.rewardPotions) rewardText = `+${q.rewardPotions} Bình Máu & Mana`;

      html += `
        <div class="quest-row">
          <div>
            <div style="font-weight:bold; color:var(--gold); font-size:11px;">${q.title}</div>
            <div style="font-size:9px; color:#8fa0b8;">${q.desc} (${Math.min(q.target, q.cur)}/${q.target})</div>
            <div style="font-size:9px; color:#00ffcc;">Thưởng: <b>${rewardText}</b></div>
          </div>
          <div>
            ${q.claimed ? `<span style="color:#576574; font-size:9px; font-weight:bold;">Đã Nhận ✓</span>` :
              (canClaim ? `<button class="btn btn-sm btn-success" onclick="claimDailyQuest('${k}')">Nhận Thưởng</button>` :
              `<span style="color:#e74c3c; font-size:9px; font-weight:bold;">Chưa Đạt</span>`)}
          </div>
        </div>
      `;
    }
  } else {
    const achieve = state.quests.achievements;
    for (const k in achieve) {
      const a = achieve[k];
      let isDone = false;
      if (k === "lv50") isDone = state.level >= 50;
      else if (k === "lv100") isDone = state.level >= 100;
      else if (k === "lv200") isDone = state.level >= 200;
      else if (k === "rs1") isDone = state.rs >= 1;
      else if (k === "boss25") isDone = (state.bossKilled || 0) >= 25;
      else if (k === "plus9") {
        for (const slotKey in state.equipped) {
          if (state.equipped[slotKey] && state.equipped[slotKey].plus >= 9) { isDone = true; break; }
        }
      }

      const canClaim = isDone && !a.claimed;
      let rewardText = "";
      if (a.rewardZen) rewardText += `+${a.rewardZen.toLocaleString()} Zen `;
      if (a.rewardBless) rewardText += `+${a.rewardBless} Bless `;
      if (a.rewardChaos) rewardText += `+${a.rewardChaos} Chaos `;
      if (a.rewardLife) rewardText += `+${a.rewardLife} Life `;
      if (a.rewardChest) rewardText += `+1 Rương Đồ Cam `;

      html += `
        <div class="quest-row">
          <div>
            <div style="font-weight:bold; color:var(--gold); font-size:11px;">🏆 ${a.title}</div>
            <div style="font-size:9px; color:#8fa0b8;">${a.desc}</div>
            <div style="font-size:9px; color:#00ffcc;">Thưởng: <b>${rewardText}</b></div>
          </div>
          <div>
            ${a.claimed ? `<span style="color:#576574; font-size:9px; font-weight:bold;">Đã Nhận ✓</span>` :
              (canClaim ? `<button class="btn btn-sm btn-success" onclick="claimAchievement('${k}')">Nhận Thưởng</button>` :
              `<span style="color:#e74c3c; font-size:9px; font-weight:bold;">Chưa Đạt</span>`)}
          </div>
        </div>
      `;
    }
  }

  container.innerHTML = html;
  updateQuestNotificationDot();
}

function claimDailyQuest(key) {
  initQuestsState();
  const q = state.quests.daily[key];
  if (!q || q.claimed || q.cur < q.target) return;

  q.claimed = true;
  if (q.rewardZen) state.zen += q.rewardZen;
  if (q.rewardBless) state.bless += q.rewardBless;
  if (q.rewardChaos) state.chaos += q.rewardChaos;
  if (q.rewardLife) state.life += q.rewardLife;
  if (q.rewardPotions) {
    state.potions.hp += q.rewardPotions;
    state.potions.mp += q.rewardPotions;
  }

  audio.playKeng();
  addLog(`★ NHẬN THƯỞNG NHIỆM VỤ! [${q.title}] hoàn thành! ★`, "log-crit");
  renderQuestsModal("daily");
  updateUI();
  saveGameState();
}

function claimAchievement(key) {
  initQuestsState();
  const a = state.quests.achievements[key];
  if (!a || a.claimed) return;

  a.claimed = true;
  if (a.rewardZen) state.zen += a.rewardZen;
  if (a.rewardBless) state.bless += a.rewardBless;
  if (a.rewardChaos) state.chaos += a.rewardChaos;
  if (a.rewardLife) state.life += a.rewardLife;
  if (a.rewardChest) {
    const item = generateItem(state.currentMapId, 3);
    addLog(`[RƯƠNG THÀNH TỰU] Nhận được [${item.name}] phẩm chất Cam!`, "log-equip");
    handleDroppedItem(item);
  }

  audio.playKeng();
  audio.vibrate(120);
  addLog(`★ VINH DANH THÀNH TỰU! [${a.title}] hoàn thành! ★`, "log-crit");
  renderQuestsModal("achieve");
  updateUI();
  saveGameState();
}

function updateQuestNotificationDot() {
  initQuestsState();
  const dot = document.getElementById("questNotifDot");
  if (!dot) return;

  let hasUnclaimed = false;
  for (const k in state.quests.daily) {
    const q = state.quests.daily[k];
    if (q.cur >= q.target && !q.claimed) { hasUnclaimed = true; break; }
  }
  if (!hasUnclaimed) {
    for (const k in state.quests.achievements) {
      const a = state.quests.achievements[k];
      let isDone = false;
      if (k === "lv50") isDone = state.level >= 50;
      else if (k === "lv100") isDone = state.level >= 100;
      else if (k === "lv200") isDone = state.level >= 200;
      else if (k === "rs1") isDone = state.rs >= 1;
      else if (k === "boss25") isDone = (state.bossKilled || 0) >= 25;
      else if (k === "plus9") {
        for (const slotKey in state.equipped) {
          if (state.equipped[slotKey] && state.equipped[slotKey].plus >= 9) { isDone = true; break; }
        }
      }
      if (isDone && !a.claimed) { hasUnclaimed = true; break; }
    }
  }

  dot.style.display = hasUnclaimed ? "inline-block" : "none";
}

// ASYNCHRONOUS PVP ARENA DUEL ENGINE
function challengePlayer(oppIndex) {
  const stats = calculateStats();
  const list = LEGEND_RANKS.map(l => ({
    name: l.name,
    charClass: l.charClass,
    cp: Math.max(500, Math.floor(l.cpMult * 8500)),
    rs: l.rs,
    lv: l.lv
  }));

  const opp = list[oppIndex];
  if (!opp) return;

  const winRate = Math.min(0.92, Math.max(0.08, stats.cp / (stats.cp + opp.cp)));
  const isVictory = Math.random() < winRate;

  animateHeroAction("attack");
  audio.playSlash();

  const modal = document.getElementById("pvpResultModal");
  const title = document.getElementById("pvpResultTitle");
  const body = document.getElementById("pvpResultBody");
  if (!modal || !title || !body) return;

  if (isVictory) {
    title.innerText = "🏆 ĐẠI THẮNG ĐẤU TRƯỜNG!";
    title.style.color = "var(--gold)";
    const rewardZen = 100000;
    state.zen += rewardZen;
    audio.playKeng();
    audio.vibrate(200);

    body.innerHTML = `
      Chúc mừng bạn đã xuất sắc đánh bại <b>[${opp.name}]</b>!<br>
      • Lực chiến của bạn: <b style="color:var(--gold);">${stats.cp.toLocaleString()} CP</b><br>
      • Lực chiến đối thủ: <b style="color:#ff7675;">${opp.cp.toLocaleString()} CP</b><br><br>
      🎁 <b>Phần thưởng chiến thắng:</b> +${rewardZen.toLocaleString()} Zen & Danh Hiệu Đấu Sĩ!
    `;
    addLog(`⚔️ [ĐẤU TRƯỜNG PVP] Hạ gục ${opp.name} thành công! Nhận +${rewardZen.toLocaleString()} Zen!`, "log-crit");
  } else {
    title.innerText = "💀 THẤT BẠI ĐẤU TRƯỜNG";
    title.style.color = "#ff7675";

    body.innerHTML = `
      Bạn đã bị <b>[${opp.name}]</b> áp đảo lực chiến!<br>
      • Lực chiến của bạn: <b style="color:var(--gold);">${stats.cp.toLocaleString()} CP</b><br>
      • Lực chiến đối thủ: <b style="color:#ff7675;">${opp.cp.toLocaleString()} CP</b><br><br>
      💡 <b>Lời khuyên:</b> Hãy cường hóa trang bị lên +9 hoặc +11 tại Lò Rèn để tăng vọt lực chiến trước khi tái đấu!
    `;
    addLog(`⚔️ [ĐẤU TRƯỜNG PVP] Bị ${opp.name} đánh bại trong gang tấc! Hãy tiếp tục rèn luyện!`, "log-damage-taken");
  }

  modal.style.display = "flex";
  updateUI();
  saveGameState();
}

function closePvpResultModal() {
  const modal = document.getElementById("pvpResultModal");
  if (modal) modal.style.display = "none";
}

// CLASS SELECTION & SWITCH MODAL
function openClassSelectModal() {
  const modal = document.getElementById("classSelectModal");
  if (modal) modal.style.display = "flex";
}

function closeClassSelectModal() {
  const modal = document.getElementById("classSelectModal");
  if (modal) modal.style.display = "none";
}

function switchClass(newClass) {
  if (!newClass || !["dk", "fe", "dw"].includes(newClass)) {
    closeClassSelectModal();
    return;
  }
  if (state.charClass === newClass) {
    closeClassSelectModal();
    return;
  }
  state.charClass = newClass;
  state.gender = newClass === "fe" ? "female" : "male";
  state.skills = getClassSkills(newClass);
  const classNames = {
    dk: "Dark Knight (Chiến Binh)",
    fe: "Fairy Elf (Cung Thủ)",
    dw: "Dark Wizard (Pháp Sư)"
  };
  addLog(`★ CHUYỂN PHÁI THÀNH CÔNG! Bạn đã chuyển sang [${classNames[newClass]}]! Bộ kỹ năng và hình hài mới đã sẵn sàng! ★`, "log-crit");
  audio.playGateOpen();
  audio.playKeng();
  renderHeroSprite(true);
  closeClassSelectModal();
  updateUI();
  saveGameState();
}
