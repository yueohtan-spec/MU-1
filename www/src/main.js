// --- MU: TEXT IDLE RPG ENGINE (ZERO-INVENTORY + SVG ICONS + 10 MAPS + 3 MONSTER TIERS) ---

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

// 10 MU MAPS WITH DETAILED MONSTER ROSTER & REQUIREMENTS
const MAPS = [
  { id: 1, name: "Lorencia", reqLv: 1, reqRs: 0, tier: 1, mobDmg: [15, 30], mobs: ["Nhện Độc", "Rồng Con", "Trâu Rừng", "Người Xương"], boss: "Chúa Tể Rồng Đen" },
  { id: 2, name: "Noria", reqLv: 50, reqRs: 0, tier: 2, mobDmg: [60, 120], mobs: ["Bọ Khổng Lồ", "Ma Cây Agon", "Thợ Săn Rừng", "Yêu Tinh Đá"], boss: "Quái Thú Rừng Xanh" },
  { id: 3, name: "Devias", reqLv: 100, reqRs: 1, tier: 3, mobDmg: [150, 280], mobs: ["Giun Tuyết", "Người Tuyết Yeti", "Quái Vật Băng", "Sát Thủ Băng"], boss: "Yeti Khổng Lồ" },
  { id: 4, name: "Dungeon", reqLv: 150, reqRs: 2, tier: 4, mobDmg: [300, 550], mobs: ["Ma Xương Cầm Rìu", "Độc Nhãn Ma", "Quỷ Hồn Đỏ", "Bò Cạp Ngục"], boss: "Quỷ Đao Ngục Tối" },
  { id: 5, name: "Lost Tower", reqLv: 200, reqRs: 5, tier: 5, mobDmg: [600, 1000], mobs: ["Quỷ Đao Shadow", "Pháp Sư Lửa", "Hiệp Sĩ Hắc Ám", "Tử Thần"], boss: "Chúa Tể Balrog" },
  { id: 6, name: "Atlans", reqLv: 250, reqRs: 10, tier: 6, mobDmg: [1200, 2000], mobs: ["Quái Tôm Bahamut", "Ma Nữ Vepar", "Thủy Quái Biển Sâu", "Thằn Lằn Nước"], boss: "Thủy Quái Hydra" },
  { id: 7, name: "Tarkan", reqLv: 300, reqRs: 20, tier: 7, mobDmg: [2500, 4000], mobs: ["Bọ Cạp Cát", "Rồng Cát Iron Wheel", "Quái Thú Sa Mạc", "Dị Nhân"], boss: "Chúa Tể Zaikan" },
  { id: 8, name: "Icarus", reqLv: 350, reqRs: 50, tier: 8, mobDmg: [5000, 8000], mobs: ["Linh Hồn Gió", "Nữ Hoàng Rainer", "Hắc Long Bay", "Thần Gió Megalo"], boss: "Phượng Hoàng Lửa Phoenix" },
  { id: 9, name: "Kanturu", reqLv: 380, reqRs: 100, tier: 9, mobDmg: [10000, 15000], mobs: ["Chiến Binh Cơ Giáp", "Bọ Robot Kentauros", "Khổng Lồ Máy", "Vệ Binh Độc"], boss: "Cỗ Máy Hủy Diệt Maya" },
  { id: 10, name: "Swamp of Peace", reqLv: 400, reqRs: 200, tier: 10, mobDmg: [20000, 35000], mobs: ["Đầm Lầy Ma Sapi", "Cá Sấu Độc Pawn", "Ma Cây Cổ Đại", "Hắc Tinh Tà Ác"], boss: "Nữ Hoàng Rắn Medusa" }
];

const TIERS = [
  { tier: 1, name: "Da (Leather)", minDmg: 25, def: 8, hp: 60 },
  { tier: 2, name: "Đồng (Bronze)", minDmg: 55, def: 18, hp: 130 },
  { tier: 3, name: "Vảy Cá (Scale)", minDmg: 95, def: 32, hp: 220 },
  { tier: 4, name: "Ngũ Sắc (Brass)", minDmg: 150, def: 50, hp: 350 },
  { tier: 5, name: "Thiết Ma (Plate)", minDmg: 220, def: 75, hp: 520 },
  { tier: 6, name: "Rồng Đỏ (Dragon)", minDmg: 320, def: 110, hp: 750 },
  { tier: 7, name: "Hắc Long (Black Dragon)", minDmg: 460, def: 160, hp: 1100 },
  { tier: 8, name: "Phượng Hoàng (Phoenix)", minDmg: 650, def: 230, hp: 1600 },
  { tier: 9, name: "Thần Ma (Titan)", minDmg: 900, def: 320, hp: 2300 },
  { tier: 10, name: "Hỗn Nguyên Thần (Divine Dragon)", minDmg: 1300, def: 450, hp: 3300 }
];

const RARITIES = [
  { id: 0, key: "white", name: "Thường", color: "#e0e0e0", class: "r-white", optCount: 1 },
  { id: 1, key: "green", name: "Tinh Nhuệ", color: "#2ecc71", class: "r-green", optCount: 2 },
  { id: 2, key: "blue", name: "Tuyệt Hảo", color: "#3498db", class: "r-blue", optCount: 3 },
  { id: 3, key: "orange", name: "Đồ Thần", color: "#e67e22", class: "r-orange", optCount: 4 },
  { id: 4, key: "yellow", name: "Huyền Thoại", color: "#f1c40f", class: "r-yellow", optCount: 5 },
  { id: 5, key: "purple", name: "Thần Thoại", color: "#9b59b6", class: "r-purple", optCount: 6 },
  { id: 6, key: "red", name: "Hỗn Nguyên Thần", color: "#e74c3c", class: "r-red", optCount: 7 }
];

const OPTION_POOL = [
  "+Tấn công cơ bản +15%",
  "+Phòng thủ cơ bản +15%",
  "+Máu tối đa +20%",
  "+Tăng Zen rơi từ quái +25%",
  "+Tỉ lệ Né tránh +12%",
  "+Tốc độ xuất chiêu +18%",
  "+Tỉ lệ Chí Mạng (Crit) +15%",
  "+Sát thương Chí Mạng +30%",
  "+Hút máu khi đánh trúng +6%",
  "+Bỏ qua 15% phòng ngự quái",
  "+Sát thương Hoàn Hảo (Excellent Damage) +20%",
  "+Đòn đánh nhân đôi (Double Damage) +15%",
  "+Tỉ lệ Rơi Ngọc Bless/Chaos +25%",
  "+Hồi sinh 40% HP khi nhận đòn chí tử"
];

// SVG Vector Icons for each equipment slot
const SVG_ICONS = {
  helm: `<svg class="slot-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a7 7 0 0 0-7 7v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a7 7 0 0 0-7-7z"/><path d="M4 14h16M12 2v12"/></svg>`,
  armor: `<svg class="slot-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l8-2 8 2v8c0 5-3.5 9-8 10-4.5-1-8-5-8-10V4z"/><path d="M12 2v20"/></svg>`,
  gloves: `<svg class="slot-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V4a2 2 0 0 1 4 0v5M10 9V3a2 2 0 0 1 4 0v6M14 9V5a2 2 0 0 1 4 0v6M6 14v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6"/></svg>`,
  boots: `<svg class="slot-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 3h6v9l5 2v7H4V3z"/><path d="M10 12l5 2"/></svg>`,
  mainWeapon: `<svg class="slot-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 4l5 5L7 21.5 2 22l.5-5L14.5 4z"/><path d="M18 7.5L16.5 6M8 16l-2-2"/></svg>`,
  offWeapon: `<svg class="slot-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  wings: `<svg class="slot-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 12c-4-8-10-8-10-8s2 6 5 8c-3 0-5 2-5 2s4 3 7 1M12 12c4-8 10-8 10-8s-2 6-5 8c3 0 5 2 5 2s-4 3-7 1"/><circle cx="12" cy="15" r="2"/></svg>`,
  ring1: `<svg class="slot-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="13" r="7"/><path d="M12 6L10 2h4l-2 4z"/></svg>`,
  ring2: `<svg class="slot-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="13" r="7"/><path d="M12 6L10 2h4l-2 4z"/></svg>`,
  pendant1: `<svg class="slot-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3c0 7 6 11 6 11s6-4 6-11"/><circle cx="12" cy="17" r="3"/></svg>`,
  pendant2: `<svg class="slot-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3c0 7 6 11 6 11s6-4 6-11"/><circle cx="12" cy="17" r="3"/></svg>`
};

const SLOT_TYPES = [
  { key: "mainWeapon", name: "Vũ khí chính", type: "weapon" },
  { key: "offWeapon", name: "Vũ khí phụ/Khiên", type: "offhand" },
  { key: "helm", name: "Nón/Mũ", type: "armor" },
  { key: "armor", name: "Áo Giáp", type: "armor" },
  { key: "gloves", name: "Găng Tay", type: "armor" },
  { key: "boots", name: "Giày", type: "armor" },
  { key: "pendant1", name: "Dây chuyền 1", type: "accessory" },
  { key: "pendant2", name: "Dây chuyền 2", type: "accessory" },
  { key: "ring1", name: "Nhẫn 1", type: "accessory" },
  { key: "ring2", name: "Nhẫn 2", type: "accessory" },
  { key: "wings", name: "Cánh", type: "wings" }
];

let state = {
  username: "Hero_Lorencia",
  gender: "male",
  level: 1,
  exp: 0,
  nextExp: 100,
  rs: 0,
  srs: 0,
  freePoints: 0,
  autoStats: true, // Mặc định BẬT
  currentMapId: 1,
  stats: { str: 25, agi: 20, vit: 25, ene: 15 },
  zen: 10000,
  bless: 2,
  chaos: 0,
  life: 0,
  currentHp: 500,
  currentMp: 200,
  equipped: {
    mainWeapon: null, offWeapon: null, helm: null, armor: null,
    gloves: null, boots: null, pendant1: null, pendant2: null,
    ring1: null, ring2: null, wings: null
  },
  selectedSlotKey: "mainWeapon",
  lastSaveTime: Date.now(),
  mobsKilled: 0
};

function getItemCP(item) {
  if (!item) return 0;
  return Math.floor((item.atk * 1.8) + (item.def * 1.5) + (item.hp * 0.4) + (item.plus * 50) + (item.options.length * 80));
}

function getItemSellPrice(item) {
  if (!item) return 0;
  const baseValue = (item.tier * 200) + (item.rarity * 400) + (item.plus * 500);
  return Math.max(30, Math.floor(baseValue * 0.30));
}

function generateItem(targetTier = null, forceRarity = null) {
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

  let baseName = "";
  if (slotDef.key === "mainWeapon") baseName = state.gender === "male" ? `Kiếm ${tierData.name}` : `Nỏ ${tierData.name}`;
  else if (slotDef.key === "offWeapon") baseName = `Khiên ${tierData.name}`;
  else if (slotDef.key === "helm") baseName = `Mũ ${tierData.name}`;
  else if (slotDef.key === "armor") baseName = `Áo ${tierData.name}`;
  else if (slotDef.key === "gloves") baseName = `Găng ${tierData.name}`;
  else if (slotDef.key === "boots") baseName = `Giày ${tierData.name}`;
  else if (slotDef.key === "wings") baseName = `Cánh Cấp ${Math.min(4, Math.floor(tierData.tier / 2.5) + 1)}`;
  else if (slotDef.type === "accessory") baseName = slotDef.name.includes("Dây") ? `Dây Chuyền Bậc ${tierData.tier}` : `Nhẫn Bậc ${tierData.tier}`;

  const shuffled = [...OPTION_POOL].sort(() => 0.5 - Math.random());
  const options = shuffled.slice(0, rarityObj.optCount);

  return {
    id: Math.random().toString(36).substring(2, 9),
    name: baseName,
    slotKey: slotDef.key,
    tier: tierData.tier,
    plus: 0,
    rarity: rarityObj.id,
    atk: Math.floor(tierData.minDmg * (1 + rarityObj.id * 0.2)),
    def: Math.floor(tierData.def * (1 + rarityObj.id * 0.2)),
    hp: Math.floor(tierData.hp * (1 + rarityObj.id * 0.2)),
    options: options
  };
}

function handleDroppedItem(droppedItem) {
  const slotKey = droppedItem.slotKey;
  const currentItem = state.equipped[slotKey];
  const newCP = getItemCP(droppedItem);
  const oldCP = getItemCP(currentItem);

  if (!currentItem || newCP > oldCP) {
    state.equipped[slotKey] = droppedItem;
    let sellMsg = "";
    if (currentItem) {
      const oldZen = getItemSellPrice(currentItem);
      state.zen += oldZen;
      sellMsg = ` Đồ cũ tự động thanh lý thu về +${oldZen.toLocaleString()} Zen (30%)!`;
    }
    addLog(`[NÂNG CẤP] Trang bị mới [${droppedItem.name}] (CP: ${newCP.toLocaleString()}) mạnh hơn -> Tự động mặc vào!${sellMsg}`, "log-equip");
    if (droppedItem.rarity >= 3) {
      audio.playKeng();
      audio.vibrate(120);
    }
  } else {
    const sellZen = getItemSellPrice(droppedItem);
    state.zen += sellZen;
    addLog(`[RƠI ĐỒ] Nhặt [${droppedItem.name}] (CP: ${newCP.toLocaleString()} thấp hơn) -> Tự động bán thu về +${sellZen.toLocaleString()} Zen (30%)!`, "log-zen");
  }
}

function calculateStats() {
  const baseStr = Math.min(10000, state.stats.str);
  const baseAgi = Math.min(10000, state.stats.agi);
  const baseVit = Math.min(10000, state.stats.vit);
  const baseEne = Math.min(10000, state.stats.ene);

  let totalAtk = baseStr * 2.2 + baseEne * 0.8;
  let totalDef = baseAgi * 1.5;
  let maxHp = baseVit * 15 + 400;
  let maxMp = baseEne * 10 + 200;

  let setTierCounts = {};
  for (const slotKey in state.equipped) {
    const item = state.equipped[slotKey];
    if (item) {
      const mult = 1 + item.plus * 0.12;
      totalAtk += item.atk * mult;
      totalDef += item.def * mult;
      maxHp += item.hp * mult;

      if (["helm", "armor", "gloves", "boots"].includes(slotKey)) {
        setTierCounts[item.tier] = (setTierCounts[item.tier] || 0) + 1;
      }
    }
  }

  let activeSetTier = null;
  for (const t in setTierCounts) {
    if (setTierCounts[t] === 4) {
      activeSetTier = t;
      totalDef *= 1.20;
      maxHp *= 1.20;
      break;
    }
  }

  const srsMult = 1 + state.srs * 0.5;
  totalAtk *= srsMult;
  totalDef *= srsMult;
  maxHp *= srsMult;

  const cp = Math.floor(totalAtk * 1.8 + totalDef * 1.5 + maxHp * 0.4);
  return { totalAtk: Math.floor(totalAtk), totalDef: Math.floor(totalDef), maxHp: Math.floor(maxHp), maxMp: Math.floor(maxMp), cp, activeSetTier };
}

// Combat Engine (0.5s/action)
let combatInterval = null;
function startCombatLoop() {
  if (combatInterval) clearInterval(combatInterval);
  combatInterval = setInterval(() => { runCombatTick(); }, 500);
}

function runCombatTick() {
  const currentMap = MAPS.find(m => m.id === state.currentMapId) || MAPS[0];
  const stats = calculateStats();

  // Natural regeneration
  state.currentHp = Math.min(stats.maxHp, state.currentHp + Math.floor(state.stats.vit * 0.8) + 10);
  state.currentMp = Math.min(stats.maxMp, state.currentMp + Math.floor(state.stats.ene * 0.5) + 5);

  state.mobsKilled++;

  // 3 Monster Tiers roll
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

  // 1. Outgoing Damage (Bạn đánh quái)
  const isCrit = Math.random() < (0.2 + (state.stats.agi / 10000) * 0.4);
  const dmg = isCrit ? Math.floor(stats.totalAtk * 1.7) : stats.totalAtk;

  if (isCrit) {
    const skillName = state.gender === "male" ? "Twisting Slash" : "Triple Shot";
    addLog(`⚡ [CRIT] ${skillName} gây ${dmg.toLocaleString()} sát thương lên ${mobName}!`, "log-crit");
    audio.playSlash();
  } else {
    addLog(`⚔ [TẤN CÔNG] Bạn đánh ${mobName} gây ${dmg.toLocaleString()} sát thương.`, mobColorClass);
  }

  // 2. Incoming Damage (Quái đánh bạn)
  const rawMobDmg = Math.floor(Math.random() * (currentMap.mobDmg[1] - currentMap.mobDmg[0]) + currentMap.mobDmg[0]) * mobMult;
  const takenDmg = Math.max(5, Math.floor(rawMobDmg - (stats.totalDef * 0.6)));
  state.currentHp -= takenDmg;

  addLog(`🛡 [BỊ ĐÁNH] ${mobName} phản kích, bạn mất -${takenDmg.toLocaleString()} HP!`, "log-damage-taken");

  if (state.currentHp <= 0) {
    addLog(`💀 [TỬ VONG] Bạn đã bị ${mobName} hạ gục! Đang hồi phục tại Lorencia...`, "log-boss");
    state.currentHp = Math.floor(stats.maxHp * 0.5);
    state.currentMapId = 1; // Lui về map 1
    updateUI();
    return;
  }

  // 3. Guaranteed 100% Zen Drop (Random * Tier * Multiplier)
  const earnedZen = Math.floor(Math.random() * 70 + 50) * currentMap.tier * mobMult;
  state.zen += earnedZen;
  addLog(`[NHẶT ZEN] +${earnedZen.toLocaleString()} Zen! (Tỷ lệ 100%)`, "log-zen");

  // 4. EXP Boost x10.000
  const earnedExp = 25 * 10000 * currentMap.tier * mobMult;
  state.exp += earnedExp;

  // 5. Jewel Drops
  const rollJewel = Math.random() * 100;
  const jewelBoost = mobCategory === "boss" ? 10 : (mobCategory === "elite" ? 3 : 1);

  if (rollJewel < 3.0 * jewelBoost) {
    state.bless++;
    addLog(`*KENG!* Nhặt được 1x Jewel of Bless từ ${mobName}!`, "log-bless");
    audio.playKeng();
    audio.vibrate(60);
  } else if (rollJewel < (3.0 + 1.2) * jewelBoost) {
    state.chaos++;
    addLog(`*KENG!* Nhặt được 1x Jewel of Chaos từ ${mobName}!`, "log-chaos");
    audio.playKeng();
  } else if (rollJewel < (3.0 + 1.2 + 0.8) * jewelBoost) {
    state.life++;
    addLog(`*KENG!* Nhặt được 1x Jewel of Life từ ${mobName}!`, "log-life");
    audio.playKeng();
  }

  // 6. Gear Drop & Auto-Equip
  const gearDropChance = mobCategory === "boss" ? 0.40 : (mobCategory === "elite" ? 0.10 : 0.02);
  if (Math.random() < gearDropChance) {
    const forceR = mobCategory === "boss" ? Math.min(6, 3 + Math.floor(Math.random() * 4)) : (mobCategory === "elite" ? Math.min(3, 2 + Math.floor(Math.random() * 2)) : null);
    const droppedItem = generateItem(currentMap.tier, forceR);
    handleDroppedItem(droppedItem);
  }

  // 7. Level Up Check
  if (state.exp >= state.nextExp) {
    while (state.exp >= state.nextExp) {
      state.exp -= state.nextExp;
      state.level++;
      state.nextExp = Math.floor(state.nextExp * 1.35);
      state.freePoints += 5;
    }
    addLog(`★ LEVEL UP! Đạt Cấp ${state.level}! Nhận Điểm Tiềm Năng! ★`, "log-crit");
    
    // Auto stats if enabled
    if (state.autoStats) {
      autoDistributeStats();
    }
  }

  updateUI();
  saveGameState();
}

function addLog(msg, cssClass = "log-norm") {
  const box = document.getElementById("logBox");
  if (!box) return;
  const time = new Date().toTimeString().split(" ")[0];
  const div = document.createElement("div");
  div.className = `log-entry ${cssClass}`;
  div.innerHTML = `<span class="log-time">[${time}]</span> ${msg}`;
  box.appendChild(div);
  if (box.children.length > 50) box.removeChild(box.firstChild);
  box.scrollTop = box.scrollHeight;
}

function updateUI() {
  const stats = calculateStats();
  
  // Title & Hero Info
  const heroNameEl = document.getElementById("heroName");
  if (heroNameEl) heroNameEl.innerText = state.gender === "male" ? `${state.username} [DK Nam]` : `${state.username} [FE Nữ]`;

  // Prominent CP Banner
  const valTotalCP = document.getElementById("valTotalCP");
  if (valTotalCP) valTotalCP.innerText = `${stats.cp.toLocaleString()} CP`;

  const curMap = MAPS.find(m => m.id === state.currentMapId) || MAPS[0];
  const mapBadge = document.getElementById("currentMapBadge");
  if (mapBadge) mapBadge.innerText = `Map ${curMap.id}: ${curMap.name}`;

  // Currency
  const valZen = document.getElementById("valZen");
  if (valZen) valZen.innerText = `Zen: ${state.zen.toLocaleString()}`;
  const valBless = document.getElementById("valBless");
  if (valBless) valBless.innerText = `B: ${state.bless}`;
  const valChaos = document.getElementById("valChaos");
  if (valChaos) valChaos.innerText = `C: ${state.chaos}`;
  const valLife = document.getElementById("valLife");
  if (valLife) valLife.innerText = `L: ${state.life}`;

  // HP & MP Bars
  state.currentHp = Math.max(0, Math.min(stats.maxHp, state.currentHp));
  state.currentMp = Math.max(0, Math.min(stats.maxMp, state.currentMp));
  const hpPercent = Math.max(0, Math.min(100, (state.currentHp / stats.maxHp) * 100));
  const mpPercent = Math.max(0, Math.min(100, (state.currentMp / stats.maxMp) * 100));

  const barHpFill = document.getElementById("barHpFill");
  if (barHpFill) barHpFill.style.width = `${hpPercent}%`;
  const txtHpBar = document.getElementById("txtHpBar");
  if (txtHpBar) txtHpBar.innerText = `HP: ${state.currentHp.toLocaleString()} / ${stats.maxHp.toLocaleString()}`;

  const barMpFill = document.getElementById("barMpFill");
  if (barMpFill) barMpFill.style.width = `${mpPercent}%`;
  const txtMpBar = document.getElementById("txtMpBar");
  if (txtMpBar) txtMpBar.innerText = `MP: ${state.currentMp.toLocaleString()} / ${stats.maxMp.toLocaleString()}`;

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

  // 11 Paperdoll Slots with SVG Icons
  SLOT_TYPES.forEach(s => {
    const el = document.getElementById(`slot-${s.key}`);
    if (!el) return;
    const item = state.equipped[s.key];
    const isSelected = state.selectedSlotKey === s.key;
    const svgIcon = SVG_ICONS[s.key] || "";

    if (item && RARITIES[item.rarity]) {
      const r = RARITIES[item.rarity];
      el.className = `slot-card ${r.class} ${isSelected ? "selected" : ""}`;
      el.innerHTML = `
        <div class="slot-icon-box" style="color:${r.color}; border:1px solid ${r.color};">${svgIcon}</div>
        <div class="slot-info">
          <div class="slot-label" style="color:${r.color};">${s.name}</div>
          <div class="slot-name">${item.name}</div>
          <div class="slot-opt">CP: ${getItemCP(item).toLocaleString()}</div>
        </div>
        ${item.plus > 0 ? `<div class="slot-plus-tag">+${item.plus}</div>` : ""}
      `;
    } else {
      el.className = `slot-card ${isSelected ? "selected" : ""}`;
      el.innerHTML = `
        <div class="slot-icon-box" style="color:#576574; opacity:0.4;">${svgIcon}</div>
        <div class="slot-info">
          <div class="slot-label">${s.name}</div>
          <div class="slot-name" style="color:#576574;">(Trống)</div>
        </div>
      `;
    }
  });

  // Stats Tab
  const freePointsEl = document.getElementById("statFreePoints");
  if (freePointsEl) freePointsEl.innerText = state.freePoints;

  ["str", "agi", "vit", "ene"].forEach(k => {
    const val = state.stats[k];
    const el = document.getElementById(`txt${k.toUpperCase()}`);
    if (el) {
      if (val >= 10000) {
        el.innerHTML = `<span class="stat-max">[MAX 10.000]</span>`;
      } else {
        el.innerText = `${val} / 10.000`;
      }
    }
  });

  // Enable/Disable manual stat buttons based on checkbox
  document.querySelectorAll(".btn-stat").forEach(btn => {
    btn.disabled = state.autoStats;
  });

  renderMapList();
  updateRebirthTab();
  renderDetailPanel();
}

// Map Selection Renderer
function renderMapList() {
  const container = document.getElementById("mapListContainer");
  if (!container) return;
  container.innerHTML = "";

  MAPS.forEach(m => {
    const unlocked = state.level >= m.reqLv && state.rs >= m.reqRs;
    const isCurrent = state.currentMapId === m.id;
    const div = document.createElement("div");
    div.className = `map-card ${isCurrent ? "active-map" : ""}`;
    
    let btnHtml = "";
    if (isCurrent) {
      btnHtml = `<span style="font-size:10px; color:#2ecc71; font-weight:bold;">Đang ở đây</span>`;
    } else if (unlocked) {
      btnHtml = `<button class="btn btn-sm btn-primary" onclick="teleportMap(${m.id})">Dịch chuyển</button>`;
    } else {
      btnHtml = `<span style="font-size:9.5px; color:#e74c3c; font-weight:bold;">🔒 Cần Lv.${m.reqLv} & RS.${m.reqRs}</span>`;
    }

    div.innerHTML = `
      <div>
        <div class="map-title">Map ${m.id}: ${m.name} (Bậc ${m.tier})</div>
        <div class="map-req">Yêu cầu: Lv.${m.reqLv} - RS.${m.reqRs} | ST Quái: ${m.mobDmg[0]}-${m.mobDmg[1]} | Boss: ${m.boss}</div>
      </div>
      <div>${btnHtml}</div>
    `;
    container.appendChild(div);
  });
}

function teleportMap(mapId) {
  const target = MAPS.find(m => m.id === mapId);
  if (!target) return;
  if (state.level < target.reqLv || state.rs < target.reqRs) {
    alert(`Chưa đủ điều kiện vào Map! Cần Level ${target.reqLv} và ${target.reqRs} Lần Reset.`);
    return;
  }
  state.currentMapId = mapId;
  addLog(`★ ĐÃ CHUYỂN BẢN ĐỒ SANG: [Map ${target.id}: ${target.name}]! ★`, "log-boss");
  updateUI();
  saveGameState();
}

// Auto Stats Toggle
function toggleAutoStats() {
  const chk = document.getElementById("chkAutoStats");
  state.autoStats = chk ? chk.checked : true;
  if (state.autoStats && state.freePoints > 0) {
    autoDistributeStats();
  }
  updateUI();
  saveGameState();
}

function autoDistributeStats() {
  if (state.freePoints <= 0) return;
  const keys = ["str", "agi", "vit", "ene"];
  while (state.freePoints > 0) {
    let available = keys.filter(k => state.stats[k] < 10000);
    if (available.length === 0) break;
    available.forEach(k => {
      if (state.freePoints > 0 && state.stats[k] < 10000) {
        state.stats[k]++;
        state.freePoints--;
      }
    });
  }
  updateUI();
  saveGameState();
}

function addStat(statKey, amount) {
  if (state.freePoints <= 0) return;
  const current = state.stats[statKey];
  if (current >= 10000) return;
  const toAdd = Math.min(amount, state.freePoints, 10000 - current);
  state.stats[statKey] += toAdd;
  state.freePoints -= toAdd;
  updateUI();
  saveGameState();
}

function getRebirthReqs(rsCount) {
  let reqLevel = 100;
  if (rsCount >= 10 && rsCount < 20) reqLevel = 200;
  else if (rsCount >= 20 && rsCount < 30) reqLevel = 300;
  else if (rsCount >= 30) reqLevel = 400;

  const reqZen = 50000 + (rsCount * 25000);

  let reqBless = 1, reqChaos = 0, reqLife = 0;
  if (rsCount >= 10 && rsCount < 30) {
    reqBless = 1; reqChaos = 1;
  } else if (rsCount >= 30) {
    reqBless = 2; reqChaos = 1; reqLife = 1;
  }

  return { reqLevel, reqZen, reqBless, reqChaos, reqLife };
}

function updateRebirthTab() {
  const req = getRebirthReqs(state.rs);
  const passLevel = state.level >= req.reqLevel;
  const passZen = state.zen >= req.reqZen;
  const passBless = state.bless >= req.reqBless;
  const passChaos = state.chaos >= req.reqChaos;
  const passLife = state.life >= req.reqLife;
  const passJewels = passBless && passChaos && passLife;

  const chkL = document.getElementById("chkLevel");
  if (chkL) {
    chkL.innerHTML = `Cấp độ yêu cầu: <b>Lv.${req.reqLevel}</b> (Hiện tại: Lv.${state.level}) <span class="${passLevel ? "check-pass" : "check-fail"}">${passLevel ? "✔ ĐẠT" : "✖ CHƯA ĐỦ"}</span>`;
  }
  const chkZ = document.getElementById("chkZen");
  if (chkZ) {
    chkZ.innerHTML = `Phí Zen Hardcore: <b>${req.reqZen.toLocaleString()} Zen</b> (Có: ${state.zen.toLocaleString()}) <span class="${passZen ? "check-pass" : "check-fail"}">${passZen ? "✔ ĐẠT" : "✖ THIẾU"}</span>`;
  }
  
  let jewelTxt = `${req.reqBless} Bless`;
  if (req.reqChaos > 0) jewelTxt += `, ${req.reqChaos} Chaos`;
  if (req.reqLife > 0) jewelTxt += `, ${req.reqLife} Life`;

  const chkJ = document.getElementById("chkJowels");
  if (chkJ) {
    chkJ.innerHTML = `Ngọc tế lễ: <b>${jewelTxt}</b> <span class="${passJewels ? "check-pass" : "check-fail"}">${passJewels ? "✔ ĐẠT" : "✖ THIẾU"}</span>`;
  }

  const rsInfo = document.getElementById("rsInfoText");
  if (rsInfo) {
    rsInfo.innerHTML = `
      Số lần Reset hiện tại: <b>${state.rs} / 1.000</b> (S-RS: <b>${state.srs}</b>)<br>
      Phần thưởng Reset: <b>+100 Điểm Tiềm Năng Vĩnh Viễn</b>.<br>
      Đạt 1.000 RS sẽ tự động chuyển sang <b>Siêu Chuyển Sinh (S-RS)</b>!
    `;
  }
}

function performRebirth() {
  const req = getRebirthReqs(state.rs);
  if (state.level < req.reqLevel) { alert(`Chưa đủ cấp độ! Cần đạt Level ${req.reqLevel}.`); return; }
  if (state.zen < req.reqZen) { alert(`Chưa đủ Zen! Cần ${req.reqZen.toLocaleString()} Zen để Reset.`); return; }
  if (state.bless < req.reqBless || state.chaos < req.reqChaos || state.life < req.reqLife) {
    alert("Chưa đủ số lượng ngọc tế lễ yêu cầu!"); return;
  }

  state.zen -= req.reqZen;
  state.bless -= req.reqBless;
  state.chaos -= req.reqChaos;
  state.life -= req.reqLife;

  state.rs++;
  state.level = 1;
  state.exp = 0;
  state.nextExp = 100;
  state.freePoints += 100;

  if (state.rs >= 1000) {
    state.rs = 0;
    state.srs++;
    addLog(`★★★ CHÚC MỪNG: ĐẠT MỐC 1.000 RS -> THĂNG CẤP LÊN SIÊU CHUYỂN SINH S-RS ${state.srs}! ★★★`, "log-boss");
    audio.playKeng();
    audio.vibrate(300);
  } else {
    addLog(`★ CHUYỂN SINH THÀNH CÔNG LẦN ${state.rs}! NHẬN +100 ĐIỂM TIỀM NĂNG VĨNH VIỄN! ★`, "log-crit");
    audio.playKeng();
  }

  if (state.autoStats) {
    autoDistributeStats();
  }
  updateUI();
  saveGameState();
}

function toggleGender() {
  state.gender = state.gender === "male" ? "female" : "male";
  addLog(`Đã chuyển sang hình tượng: ${state.gender === "male" ? "Dark Knight [Nam]" : "Fairy Elf [Nữ]"}!`);
  updateUI();
  saveGameState();
}

function selectSlot(slotKey) {
  state.selectedSlotKey = slotKey;
  updateUI();
}

function renderDetailPanel() {
  const item = state.equipped[state.selectedSlotKey];
  const dTitle = document.getElementById("dTitle");
  const dStats = document.getElementById("dStats");
  const dOptions = document.getElementById("dOptions");
  const dActions = document.getElementById("dActions");
  const dLockTag = document.getElementById("dLockTag");

  if (!item || !RARITIES[item.rarity]) {
    if (dTitle) { dTitle.innerText = "Ô trang bị đang trống"; dTitle.style.color = "#8fa0b8"; }
    if (dStats) dStats.innerText = "Khi đánh quái nhặt được món đồ phù hợp, hệ thống sẽ tự động trang bị vào đây.";
    if (dOptions) dOptions.innerHTML = "";
    if (dActions) dActions.style.display = "none";
    if (dLockTag) dLockTag.innerText = "";
    return;
  }

  const r = RARITIES[item.rarity];
  const cp = getItemCP(item);
  if (dTitle) { dTitle.innerText = `${item.name} ${item.plus > 0 ? "+"+item.plus : ""} (${r.name})`; dTitle.style.color = r.color; }
  if (dLockTag) dLockTag.innerText = `Lực chiến: ${cp.toLocaleString()}`;
  if (dStats) dStats.innerText = `Bậc ${item.tier} | Công: +${item.atk} | Thủ: +${item.def} | Máu: +${item.hp}`;
  
  if (dOptions) {
    dOptions.innerHTML = item.options.map(o => `<div style="color:${r.color};">• ${o}</div>`).join("");
  }
  if (dActions) dActions.style.display = "flex";

  const forgeText = document.getElementById("forgeTargetText");
  if (forgeText) {
    forgeText.innerHTML = `Mục tiêu đang chọn: <b style="color:${r.color}">${item.name} +${item.plus}</b> (${r.name}) - CP: ${cp.toLocaleString()}`;
  }
}

function quickForgeEnhance() {
  switchTab("forge");
  forgeEnhance();
}
function quickForgeReforge() {
  switchTab("forge");
  forgeReforge();
}

function forgeEnhance() {
  const item = state.equipped[state.selectedSlotKey];
  if (!item) { alert("Vui lòng chọn 1 trang bị đang mặc trước!"); return; }
  if (item.plus >= 15) { alert("Trang bị đã đạt cấp tối đa +15!"); return; }

  const reqZen = (item.plus + 1) * 800;
  const isHighLevel = item.plus >= 6;

  if (state.zen < reqZen) { alert(`Cần ${reqZen.toLocaleString()} Zen để cường hóa!`); return; }
  if (state.bless < 1) { alert("Cần tối thiểu 1x Jewel of Bless!"); return; }
  if (isHighLevel && state.chaos < 1) { alert("Từ +7 trở lên cần thêm 1x Jewel of Chaos!"); return; }

  state.zen -= reqZen;
  state.bless--;
  if (isHighLevel) state.chaos--;

  let successRate = 1.0;
  if (item.plus >= 6 && item.plus < 9) successRate = 0.70;
  else if (item.plus >= 9 && item.plus < 12) successRate = 0.55;
  else if (item.plus >= 12) successRate = 0.40;

  audio.playAnvil();

  if (Math.random() <= successRate) {
    item.plus++;
    item.atk += Math.floor(item.atk * 0.15);
    item.def += Math.floor(item.def * 0.15);
    item.hp += Math.floor(item.hp * 0.15);
    addLog(`★★★ ĐẬP ĐỒ THÀNH CÔNG! [${item.name}] ĐÃ LÊN +${item.plus}! ★★★`, "log-crit");
    audio.playKeng();
    audio.vibrate(150);
  } else {
    if (item.plus >= 7) item.plus = 0;
    addLog(`[LÒ RÈN] Rất tiếc, cường hóa [${item.name}] thất bại!`, "log-boss");
  }
  updateUI();
  saveGameState();
}

function forgeReforge() {
  const item = state.equipped[state.selectedSlotKey];
  if (!item) { alert("Vui lòng chọn 1 trang bị đang mặc trước!"); return; }
  if (state.life < 1) { alert("Cần 1x Jewel of Life để tẩy luyện dòng option!"); return; }

  state.life--;
  const r = RARITIES[item.rarity];
  const shuffled = [...OPTION_POOL].sort(() => 0.5 - Math.random());
  item.options = shuffled.slice(0, r.optCount);

  audio.playAnvil();
  addLog(`★ TẨY LUYỆN THÀNH CÔNG! [${item.name}] đã làm mới các dòng thuộc tính! ★`, "log-life");
  audio.playKeng();
  updateUI();
  saveGameState();
}

function switchTab(tabKey) {
  document.querySelectorAll(".tab-btn").forEach((b) => {
    b.classList.toggle("active", b.getAttribute("onclick").includes(tabKey));
  });
  document.querySelectorAll(".tab-content").forEach(c => {
    c.classList.toggle("active", c.id === `tab-${tabKey}`);
  });
}

function enterGameGate() {
  try {
    const uInput = document.getElementById("gateUser");
    if (uInput && uInput.value.trim()) {
      state.username = uInput.value.trim();
    }
  } catch(e) {}

  const gate = document.getElementById("loginGate");
  if (gate) {
    gate.style.display = "none";
  }

  try {
    audio.playGateOpen();
    audio.vibrate(150);
  } catch(e) {}

  try {
    checkOfflineProgress();
  } catch(e) {}

  try {
    startCombatLoop();
  } catch(e) {}

  try {
    addLog(`★ CHÀO MỪNG HIỆP SĨ [${state.username}] ĐÃ BƯỚC VÀO LỤC ĐỊA MU! ★`, "log-boss");
    addLog("Hệ thống tự động chiến đấu & tự động trang bị đã kích hoạt!", "log-crit");
  } catch(e) {}

  updateUI();
  saveGameState();
}

function checkOfflineProgress() {
  const saved = localStorage.getItem("mu_text_rpg_save");
  if (!saved) return;
  try {
    const data = JSON.parse(saved);
    Object.assign(state, data);

    const now = Date.now();
    const elapsedSeconds = Math.floor((now - (state.lastSaveTime || now)) / 1000);
    const maxOfflineSeconds = 24 * 3600;
    const actualSeconds = Math.min(elapsedSeconds, maxOfflineSeconds);

    if (actualSeconds > 60) {
      const currentTier = state.currentMapId;
      const mobsKilledOffline = Math.floor(actualSeconds / 0.5);
      const gainedZen = mobsKilledOffline * 60 * currentTier;
      const gainedExp = mobsKilledOffline * 25 * 10000 * currentTier;
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
  } catch (e) {}
}

function closeOfflineModal() {
  const modal = document.getElementById("offlineModal");
  if (modal) modal.style.display = "none";
}

function saveGameState() {
  state.lastSaveTime = Date.now();
  try {
    localStorage.setItem("mu_text_rpg_save", JSON.stringify(state));
  } catch (e) {}
}

window.onload = () => {
  try {
    if (!state.equipped.mainWeapon) {
      state.equipped.mainWeapon = generateItem(1, 0);
      state.equipped.helm = generateItem(1, 0);
      state.equipped.armor = generateItem(1, 0);
      state.equipped.gloves = generateItem(1, 0);
      state.equipped.boots = generateItem(1, 0);
    }

    const saved = localStorage.getItem("mu_text_rpg_save");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.username) {
        state.username = data.username;
        const uInput = document.getElementById("gateUser");
        if (uInput) uInput.value = data.username;
      }
      if (typeof data.autoStats === "boolean") {
        state.autoStats = data.autoStats;
        const chk = document.getElementById("chkAutoStats");
        if (chk) chk.checked = data.autoStats;
      }
    }
  } catch(e) {}

  updateUI();
  document.body.addEventListener("click", () => audio.init(), { once: true });
};
