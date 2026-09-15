class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.createProceduralTextures();// --- MU: TEXT IDLE RPG ENGINE ---

class SoundController {
  constructor() { this.ctx = null; }
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }
  playKeng() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2093, now);
      osc.frequency.exponentialRampToValueAtTime(1046, now + 0.6);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    } catch (e) {}
  }
  playSlash() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.12);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }
  playAnvil() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }
  vibrate(ms = 80) {
    if (navigator.vibrate) navigator.vibrate(ms);
  }
}

const audio = new SoundController();

const TIERS = [
  { tier: 1, name: "Da (Leather)", map: "Lorencia", minDmg: 25, def: 8, hp: 60 },
  { tier: 2, name: "Đồng (Bronze)", map: "Noria", minDmg: 55, def: 18, hp: 130 },
  { tier: 3, name: "Vảy Cá (Scale)", map: "Devias", minDmg: 95, def: 32, hp: 220 },
  { tier: 4, name: "Ngũ Sắc (Brass)", map: "Dungeon", minDmg: 150, def: 50, hp: 350 },
  { tier: 5, name: "Thiết Ma (Plate)", map: "Lost Tower", minDmg: 220, def: 75, hp: 520 },
  { tier: 6, name: "Rồng Đỏ (Dragon)", map: "Atlans", minDmg: 320, def: 110, hp: 750 },
  { tier: 7, name: "Hắc Long (Black Dragon)", map: "Tarkan", minDmg: 460, def: 160, hp: 1100 },
  { tier: 8, name: "Phượng Hoàng (Phoenix)", map: "Icarus", minDmg: 650, def: 230, hp: 1600 },
  { tier: 9, name: "Thần Ma (Titan)", map: "Kanturu", minDmg: 900, def: 320, hp: 2300 },
  { tier: 10, name: "Hỗn Nguyên Thần (Divine Dragon)", map: "Swamp", minDmg: 1300, def: 450, hp: 3300 }
];

const RARITIES = [
  { id: 0, key: 'white', name: "Thường", color: "#e0e0e0", class: "r-white", optCount: 1 },
  { id: 1, key: 'green', name: "Tinh Nhuệ", color: "#2ecc71", class: "r-green", optCount: 2 },
  { id: 2, key: 'blue', name: "Tuyệt Hảo", color: "#3498db", class: "r-blue", optCount: 3 },
  { id: 3, key: 'orange', name: "Đồ Thần", color: "#e67e22", class: "r-orange", optCount: 4 },
  { id: 4, key: 'yellow', name: "Huyền Thoại", color: "#f1c40f", class: "r-yellow", optCount: 5 },
  { id: 5, key: 'purple', name: "Thần Thoại", color: "#9b59b6", class: "r-purple", optCount: 6 },
  { id: 6, key: 'red', name: "Hỗn Nguyên Thần", color: "#e74c3c", class: "r-red", optCount: 7 }
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

const SLOT_TYPES = [
  { key: 'mainWeapon', name: 'Vũ khí chính', type: 'weapon' },
  { key: 'offWeapon', name: 'Vũ khí phụ/Khiên', type: 'offhand' },
  { key: 'helm', name: 'Nón/Mũ', type: 'armor' },
  { key: 'armor', name: 'Áo Giáp', type: 'armor' },
  { key: 'gloves', name: 'Găng Tay', type: 'armor' },
  { key: 'boots', name: 'Giày', type: 'armor' },
  { key: 'pendant1', name: 'Dây chuyền 1', type: 'accessory' },
  { key: 'pendant2', name: 'Dây chuyền 2', type: 'accessory' },
  { key: 'ring1', name: 'Nhẫn 1', type: 'accessory' },
  { key: 'ring2', name: 'Nhẫn 2', type: 'accessory' },
  { key: 'wings', name: 'Cánh', type: 'wings' }
];

let state = {
  gender: 'male',
  level: 1,
  exp: 0,
  nextExp: 100,
  rs: 0,
  srs: 0,
  freePoints: 0,
  stats: { str: 25, agi: 20, vit: 25, ene: 15 },
  zen: 1000,
  bless: 3,
  chaos: 1,
  life: 1,
  equipped: {
    mainWeapon: null, offWeapon: null, helm: null, armor: null,
    gloves: null, boots: null, pendant1: null, pendant2: null,
    ring1: null, ring2: null, wings: null
  },
  inventory: [],
  selectedItemRef: null,
  lastSaveTime: Date.now(),
  mobsKilled: 0
};

function generateItem(targetTier = null, forceRarity = null) {
  const tierIndex = targetTier !== null ? targetTier - 1 : Math.min(9, Math.floor(state.rs / 2));
  const tierData = TIERS[tierIndex] || TIERS[0];
  const slotDef = SLOT_TYPES[Math.floor(Math.random() * SLOT_TYPES.length)];
  
  let rarityObj = RARITIES[0];
  if (forceRarity !== null) {
    rarityObj = RARITIES[forceRarity];
  } else {
    const roll = Math.random() * 100;
    if (roll < 45) rarityObj = RARITIES[0];
    else if (roll < 72) rarityObj = RARITIES;
    else if (roll < 88) rarityObj = RARITIES;
    else if (roll < 95) rarityObj = RARITIES;
    else if (roll < 98.2) rarityObj = RARITIES[4];
    else if (roll < 99.6) rarityObj = RARITIES[5];
    else rarityObj = RARITIES[6];
  }

  let baseName = "";
  if (slotDef.key === 'mainWeapon') baseName = state.gender === 'male' ? `Kiếm ${tierData.name}` : `Nỏ ${tierData.name}`;
  else if (slotDef.key === 'offWeapon') baseName = `Khiên ${tierData.name}`;
  else if (slotDef.key === 'helm') baseName = `Mũ ${tierData.name}`;
  else if (slotDef.key === 'armor') baseName = `Áo ${tierData.name}`;
  else if (slotDef.key === 'gloves') baseName = `Găng ${tierData.name}`;
  else if (slotDef.key === 'boots') baseName = `Giày ${tierData.name}`;
  else if (slotDef.key === 'wings') baseName = `Cánh Cấp ${Math.min(4, Math.floor(tierData.tier / 2.5) + 1)}`;
  else if (slotDef.type === 'accessory') baseName = slotDef.name.includes('Dây') ? `Dây Chuyền Bậc ${tierData.tier}` : `Nhẫn Bậc ${tierData.tier}`;

  const shuffled = [...OPTION_POOL].sort(() => 0.5 - Math.random());
  const options = shuffled.slice(0, rarityObj.optCount);
  const locked = rarityObj.id >= 3;

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
    options: options,
    locked: locked
  };
}

function calculateStats() {
  const baseStr = Math.min(10000, state.stats.str);
  const baseAgi = Math.min(10000, state.stats.agi);
  const baseVit = Math.min(10000, state.stats.vit);
  const baseEne = Math.min(10000, state.stats.ene);

  let totalAtk = baseStr * 2.2 + baseEne * 0.8;
  let totalDef = baseAgi * 1.5;
  let totalHp = baseVit * 12 + 200;

  let setTierCounts = {};
  for (const slotKey in state.equipped) {
    const item = state.equipped[slotKey];
    if (item) {
      const mult = 1 + item.plus * 0.12;
      totalAtk += item.atk * mult;
      totalDef += item.def * mult;
      totalHp += item.hp * mult;

      if (['helm', 'armor', 'gloves', 'boots'].includes(slotKey)) {
        setTierCounts[item.tier] = (setTierCounts[item.tier] || 0) + 1;
      }
    }
  }

  let activeSetTier = null;
  for (const t in setTierCounts) {
    if (setTierCounts[t] === 4) {
      activeSetTier = t;
      totalDef *= 1.20;
      totalHp *= 1.20;
      break;
    }
  }

  const srsMult = 1 + state.srs * 0.5;
  totalAtk *= srsMult;
  totalDef *= srsMult;
  totalHp *= srsMult;

  const cp = Math.floor(totalAtk * 1.8 + totalDef * 1.5 + totalHp * 0.4);
  return { totalAtk: Math.floor(totalAtk), totalDef: Math.floor(totalDef), totalHp: Math.floor(totalHp), cp, activeSetTier };
}

let combatInterval = null;
function startCombatLoop() {
  if (combatInterval) clearInterval(combatInterval);
  combatInterval = setInterval(() => { runCombatTick(); }, 500);
}

function runCombatTick() {
  const currentTier = Math.min(10, Math.floor(state.rs / 2) + 1);
  const tierData = TIERS[currentTier - 1] || TIERS[0];
  const stats = calculateStats();

  state.mobsKilled++;
  const isBoss = state.mobsKilled % 10 === 0;
  const mobName = isBoss ? `BOSS ${tierData.map.toUpperCase()}` : `Quái ${tierData.map}`;
  const isCrit = Math.random() < (0.2 + (state.stats.agi / 10000) * 0.4);
  const dmg = isCrit ? Math.floor(stats.totalAtk * 1.7) : stats.totalAtk;

  if (isBoss) {
    addLog(`[CẢNH BÁO] ${mobName} XUẤT HIỆN!`, 'log-boss');
    addLog(`[TIÊU DIỆT] Hạ gục ${mobName}! Gây ${dmg} sát thương! Nhận Rương Báu & Chuyển Ải!`, 'log-boss');
    state.zen += 250 * currentTier;
    state.exp += 180 * currentTier;
    if (Math.random() < 0.4) {
      state.bless++;
      addLog(`*KENG!* Nhặt được 1x Jewel of Bless từ Boss!`, 'log-bless');
      audio.playKeng();
      audio.vibrate(100);
    }
    if (Math.random() < 0.25) {
      state.chaos++;
      addLog(`*KENG!* Nhặt được 1x Jewel of Chaos từ Boss!`, 'log-chaos');
      audio.playKeng();
    }
  } else {
    if (isCrit) {
      const skillName = state.gender === 'male' ? 'Twisting Slash' : 'Triple Shot';
      addLog(`[CRIT] ${skillName} gây ${dmg} sát thương lên ${mobName}!`, 'log-crit');
      audio.playSlash();
    } else {
      addLog(`Tấn công ${mobName} gây ${dmg} sát thương.`, 'log-norm');
    }

    state.zen += Math.floor(15 * currentTier + Math.random() * 20);
    state.exp += 25 * currentTier;

    if (Math.random() < 0.12) {
      state.bless++;
      addLog(`*KENG!* Nhặt được 1x Jewel of Bless!`, 'log-bless');
      audio.playKeng();
      audio.vibrate(60);
    } else if (Math.random() < 0.05) {
      state.chaos++;
      addLog(`*KENG!* Nhặt được 1x Jewel of Chaos!`, 'log-chaos');
      audio.playKeng();
    } else if (Math.random() < 0.04) {
      state.life++;
      addLog(`*KENG!* Nhặt được 1x Jewel of Life!`, 'log-life');
      audio.playKeng();
    }

    if (Math.random() < 0.10 && state.inventory.length < 16) {
      const droppedItem = generateItem(currentTier);
      state.inventory.push(droppedItem);
      const rObj = RARITIES[droppedItem.rarity];
      addLog(`[RƠI ĐỒ] Nhặt được: [${droppedItem.name}] (${rObj.name})!`, rObj.class);
      if (droppedItem.rarity >= 3) {
        audio.playKeng();
        audio.vibrate(120);
      }
    }
  }

  if (state.exp >= state.nextExp) {
    state.exp -= state.nextExp;
    state.level++;
    state.nextExp = Math.floor(state.nextExp * 1.35);
    state.freePoints += 5;
    addLog(`★ LEVEL UP! Đạt Cấp ${state.level}! Nhận +5 Điểm Tiềm Năng! ★`, 'log-crit');
  }

  updateUI();
  saveGameState();
}

function addLog(msg, cssClass = 'log-norm') {
  const box = document.getElementById('logBox');
  if (!box) return;
  const time = new Date().toTimeString().split(' ')[0];
  const div = document.createElement('div');
  div.className = `log-entry ${cssClass}`;
  div.innerHTML = `<span class="log-time">[${time}]</span> ${msg}`;
  box.appendChild(div);
  if (box.children.length > 50) box.removeChild(box.firstChild);
  box.scrollTop = box.scrollHeight;
}

function updateUI() {
  const stats = calculateStats();
  document.getElementById('heroName').innerText = state.gender === 'male' ? 'Dark Knight [Nam]' : 'Fairy Elf [Nữ]';
  document.getElementById('heroMeta').innerText = `Lv.${state.level} | RS: ${state.rs} (S-RS: ${state.srs}) | CP: ${stats.cp.toLocaleString()}`;
  document.getElementById('valZen').innerText = `Zen: ${state.zen.toLocaleString()}`;
  document.getElementById('valBless').innerText = `B: ${state.bless}`;
  document.getElementById('valChaos').innerText = `C: ${state.chaos}`;
  document.getElementById('valLife').innerText = `L: ${state.life}`;

  const setBadge = document.getElementById('setBonusBadge');
  if (stats.activeSetTier) {
    setBadge.style.display = 'block';
    setBadge.innerText = `★ KÍCH HOẠT SET 4 MÓN BẬC ${stats.activeSetTier}: +20% HP & THỦ ★`;
  } else {
    setBadge.style.display = 'none';
  }

  SLOT_TYPES.forEach(s => {
    const el = document.getElementById(`slot-${s.key}`);
    if (!el) return;
    const item = state.equipped[s.key];
    if (item) {
      const r = RARITIES[item.rarity];
      el.className = `slot-card ${r.class}`;
      el.innerHTML = `
        <div class="slot-label" style="color:${r.color}">${s.name} ${item.plus > 0 ? '+'+item.plus : ''}</div>
        <div class="slot-name">${item.name}</div>
        <div class="slot-opt">${item.options.length} dòng thuộc tính</div>
      `;
    } else {
      el.className = `slot-card`;
      el.innerHTML = `<div class="slot-label">${s.name}</div><div class="slot-name" style="color:#576574;">(Trống)</div>`;
    }
  });

  const invGrid = document.getElementById('invGrid');
  invGrid.innerHTML = '';
  document.getElementById('invCount').innerText = state.inventory.length;
  for (let i = 0; i < 16; i++) {
    const item = state.inventory[i];
    const div = document.createElement('div');
    if (item) {
      const r = RARITIES[item.rarity];
      div.className = `inv-slot ${r.class}`;
      div.onclick = () => selectInv(i);
      div.innerHTML = `
        <div style="font-size:9.5px; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.name} ${item.plus > 0 ? '+'+item.plus : ''}</div>
        <div style="font-size:8.5px; color:${r.color};">${r.name}</div>
        ${item.locked ? '<span class="lock-icon">🔒</span>' : ''}
      `;
    } else {
      div.className = 'inv-slot empty';
      div.innerHTML = `<span style="font-size:10px; color:#576574;">Ô ${i+1}</span>`;
    }
    invGrid.appendChild(div);
  }

  document.getElementById('statFreePoints').innerText = state.freePoints;
  ['str', 'agi', 'vit', 'ene'].forEach(k => {
    const val = state.stats[k];
    const el = document.getElementById(`txt${k.toUpperCase()}`);
    if (val >= 10000) {
      el.innerHTML = `<span class="stat-max">[MAX 10.000]</span>`;
    } else {
      el.innerText = `${val} / 10.000`;
    }
  });

  const reqLevel = getRebirthRequiredLevel(state.rs);
  document.getElementById('rsInfo').innerHTML = `
    Số lần Reset hiện tại: <b>${state.rs} / 1000</b> (S-RS: <b>${state.srs}</b>)<br>
    Cấp độ yêu cầu lần này: <b>Level ${reqLevel}</b> (Hiện tại: Lv.${state.level})<br>
    Phần thưởng Reset: <b>+100 Điểm Tiềm Năng Vĩnh Viễn</b><br>
    Khi đạt 1.000 RS sẽ tự động chuyển sang <b>Siêu Chuyển Sinh (S-RS)</b>!
  `;

  renderDetailPanel();
}

function getRebirthRequiredLevel(rsCount) {
  if (rsCount < 10) return 100;
  if (rsCount < 20) return 200;
  if (rsCount < 30) return 300;
  return 400;
}

function performRebirth() {
  const req = getRebirthRequiredLevel(state.rs);
  if (state.level < req) {
    alert(`Bạn cần đạt Level ${req} để Chuyển Sinh lần này!`);
    return;
  }
  state.rs++;
  state.level = 1;
  state.exp = 0;
  state.nextExp = 100;
  state.freePoints += 100;

  if (state.rs >= 1000) {
    state.rs = 0;
    state.srs++;
    addLog(`★★★ ĐẠT 1.000 RS -> THĂNG CẤP LÊN SIÊU CHUYỂN SINH S-RS ${state.srs}! ★★★`, 'log-boss');
    audio.playKeng();
    audio.vibrate(300);
  } else {
    addLog(`★ CHUYỂN SINH THÀNH CÔNG LẦN ${state.rs}! NHẬN +100 ĐIỂM TIỀM NĂNG! ★`, 'log-crit');
    audio.playKeng();
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

function autoDistributeStats() {
  if (state.freePoints <= 0) return;
  const keys = ['str', 'agi', 'vit', 'ene'];
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

function toggleGender() {
  state.gender = state.gender === 'male' ? 'female' : 'male';
  addLog(`Đã chuyển sang hình tượng: ${state.gender === 'male' ? 'Dark Knight [Nam]' : 'Fairy Elf [Nữ]'}!`);
  updateUI();
  saveGameState();
}

function selectSlot(slotKey) {
  const item = state.equipped[slotKey];
  state.selectedItemRef = item ? { source: 'equipped', key: slotKey } : null;
  updateUI();
}

function selectInv(index) {
  const item = state.inventory[index];
  state.selectedItemRef = item ? { source: 'inv', index: index } : null;
  updateUI();
}

function getSelectedItem() {
  if (!state.selectedItemRef) return null;
  if (state.selectedItemRef.source === 'equipped') return state.equipped[state.selectedItemRef.key];
  return state.inventory[state.selectedItemRef.index];
}

function renderDetailPanel() {
  const item = getSelectedItem();
  const dTitle = document.getElementById('dTitle');
  const dStats = document.getElementById('dStats');
  const dOptions = document.getElementById('dOptions');
  const dActions = document.getElementById('dActions');
  const dLockTag = document.getElementById('dLockTag');

  if (!item) {
    dTitle.innerText = "Chưa chọn trang bị";
    dTitle.style.color = "#ffffff";
    dStats.innerText = "Chạm vào 1 món đồ từ 11 ô hoặc trong túi để xem chi tiết.";
    dOptions.innerHTML = "";
    dActions.style.display = "none";
    dLockTag.innerText = "";
    return;
  }

  const r = RARITIES[item.rarity];
  dTitle.innerText = `${item.name} ${item.plus > 0 ? '+'+item.plus : ''} (${r.name})`;
  dTitle.style.color = r.color;
  dLockTag.innerText = item.locked ? "🔒 Đã Khóa Bảo Vệ" : "";
  dStats.innerText = `Bậc ${item.tier} | Công: +${item.atk} | Thủ: +${item.def} | Máu: +${item.hp}`;
  
  dOptions.innerHTML = item.options.map(o => `<div style="color:${r.color};">• ${o}</div>`).join('');
  dActions.style.display = "flex";

  const btnEquip = document.getElementById('btnActionEquip');
  btnEquip.innerText = state.selectedItemRef.source === 'equipped' ? "Tháo ra" : "Trang bị";
  document.getElementById('btnActionLock').innerText = item.locked ? "Mở khóa" : "Khóa";

  const forgeText = document.getElementById('forgeTargetText');
  if (forgeText) {
    forgeText.innerHTML = `Mục tiêu đang chọn: <b style="color:${r.color}">${item.name} +${item.plus}</b> (${r.name})`;
  }
}

function actionEquip() {
  const item = getSelectedItem();
  if (!item) return;

  if (state.selectedItemRef.source === 'equipped') {
    if (state.inventory.length >= 16) { alert("Túi đồ đã đầy!"); return; }
    state.inventory.push(item);
    state.equipped[state.selectedItemRef.key] = null;
    state.selectedItemRef = null;
  } else {
    const targetSlot = item.slotKey;
    const oldEquipped = state.equipped[targetSlot];
    state.equipped[targetSlot] = item;
    state.inventory.splice(state.selectedItemRef.index, 1);
    if (oldEquipped) state.inventory.push(oldEquipped);
    state.selectedItemRef = { source: 'equipped', key: targetSlot };
    addLog(`Đã trang bị: [${item.name}]!`, 'log-crit');
  }
  updateUI();
  saveGameState();
}

function actionToggleLock() {
  const item = getSelectedItem();
  if (!item) return;
  item.locked = !item.locked;
  updateUI();
  saveGameState();
}

function actionSell() {
  const item = getSelectedItem();
  if (!item) return;
  if (item.locked) { alert("Trang bị này đã bị khóa bảo vệ!"); return; }
  const sellPrice = (item.tier * 80) + (item.rarity * 150) + (item.plus * 200);
  state.zen += sellPrice;
  if (state.selectedItemRef.source === 'equipped') {
    state.equipped[state.selectedItemRef.key] = null;
  } else {
    state.inventory.splice(state.selectedItemRef.index, 1);
  }
  state.selectedItemRef = null;
  addLog(`Đã bán [${item.name}] nhận +${sellPrice} Zen.`, 'log-zen');
  updateUI();
  saveGameState();
}

function quickEquip() {
  SLOT_TYPES.forEach(slot => {
    let bestIndex = -1;
    let bestPower = state.equipped[slot.key] ? (state.equipped[slot.key].atk + state.equipped[slot.key].def + state.equipped[slot.key].hp) : -1;
    
    state.inventory.forEach((item, idx) => {
      if (item.slotKey === slot.key) {
        const p = item.atk + item.def + item.hp;
        if (p > bestPower) {
          bestPower = p;
          bestIndex = idx;
        }
      }
    });

    if (bestIndex !== -1) {
      const bestItem = state.inventory[bestIndex];
      const old = state.equipped[slot.key];
      state.equipped[slot.key] = bestItem;
      state.inventory.splice(bestIndex, 1);
      if (old) state.inventory.push(old);
    }
  });
  addLog("Đã trang bị nhanh các món đồ mạnh nhất!", 'log-crit');
  updateUI();
  saveGameState();
}

function sellJunk() {
  let soldCount = 0;
  let earnedZen = 0;
  for (let i = state.inventory.length - 1; i >= 0; i--) {
    const it = state.inventory[i];
    if (!it.locked && it.rarity <= 1) {
      earnedZen += (it.tier * 60);
      state.inventory.splice(i, 1);
      soldCount++;
    }
  }
  if (soldCount > 0) {
    state.zen += earnedZen;
    addLog(`Đã bán ${soldCount} món đồ rác thu về +${earnedZen} Zen!`, 'log-zen');
  } else {
    alert("Không có trang bị rác nào để bán!");
  }
  updateUI();
  saveGameState();
}

function forgeEnhance() {
  const item = getSelectedItem();
  if (!item) { alert("Vui lòng chọn 1 trang bị ở Tab 1 trước!"); return; }
  if (item.plus >= 15) { alert("Trang bị đã đạt cấp tối đa +15!"); return; }

  const reqZen = (item.plus + 1) * 300;
  const isHighLevel = item.plus >= 6;

  if (state.zen < reqZen) { alert(`Cần ${reqZen} Zen để cường hóa!`); return; }
  if (state.bless < 1) { alert("Cần tối thiểu 1x Jewel of Bless!"); return; }
  if (isHighLevel && state.chaos < 1) { alert("Từ +7 trở lên cần thêm 1x Jewel of Chaos!"); return; }

  state.zen -= reqZen;
  state.bless--;
  if (isHighLevel) state.chaos--;

  let successRate = 1.0;
  if (item.plus >= 6 && item.plus < 9) successRate = 0.75;
  else if (item.plus >= 9 && item.plus < 12) successRate = 0.60;
  else if (item.plus >= 12) successRate = 0.45;

  audio.playAnvil();

  if (Math.random() <= successRate) {
    item.plus++;
    item.atk += Math.floor(item.atk * 0.15);
    item.def += Math.floor(item.def * 0.15);
    item.hp += Math.floor(item.hp * 0.15);
    addLog(`★★★ ĐẬP ĐỒ THÀNH CÔNG! [${item.name}] ĐÃ LÊN +${item.plus}! ★★★`, 'log-crit');
    audio.playKeng();
    audio.vibrate(150);
  } else {
    if (item.plus >= 7) item.plus = 0;
    addLog(`[LÒ RÈN] Cường hóa [${item.name}] thất bại!`, 'log-boss');
  }
  updateUI();
  saveGameState();
}

function forgeReforge() {
  const item = getSelectedItem();
  if (!item) { alert("Vui lòng chọn 1 trang bị ở Tab 1 trước!"); return; }
  if (state.life < 1) { alert("Cần 1x Jewel of Life để tẩy luyện!"); return; }

  state.life--;
  const r = RARITIES[item.rarity];
  const shuffled = [...OPTION_POOL].sort(() => 0.5 - Math.random());
  item.options = shuffled.slice(0, r.optCount);

  audio.playAnvil();
  addLog(`★ TẨY LUYỆN THÀNH CÔNG! [${item.name}] đã làm mới các dòng thuộc tính! ★`, 'log-life');
  audio.playKeng();
  updateUI();
  saveGameState();
}

function pullGacha(times) {
  const reqZen = times === 1 ? 500 : 2200;
  const reqBless = times === 1 ? 1 : 4;

  if (state.zen < reqZen || state.bless < reqBless) {
    alert(`Không đủ tài nguyên! Cần ${reqZen} Zen và ${reqBless} Jewel of Bless!`);
    return;
  }
  if (state.inventory.length + times > 16) {
    alert("Túi đồ không đủ chỗ trống!");
    return;
  }

  state.zen -= reqZen;
  state.bless -= reqBless;

  for (let i = 0; i < times; i++) {
    const rolledTier = Math.min(10, Math.floor(state.rs / 2) + 1 + Math.floor(Math.random() * 2));
    const newItem = generateItem(rolledTier);
    state.inventory.push(newItem);
    const r = RARITIES[newItem.rarity];
    addLog(`[GACHA] Triệu hồi thành công: [${newItem.name}] (${r.name})!`, r.class);
    if (newItem.rarity >= 3) audio.playKeng();
  }

  audio.vibrate(100);
  updateUI();
  saveGameState();
}

function switchTab(tabKey) {
  document.querySelectorAll('.tab-btn').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('onclick').includes(tabKey));
  });
  document.querySelectorAll('.tab-content').forEach(c => {
    c.classList.toggle('active', c.id === `tab-${tabKey}`);
  });
}

function checkOfflineProgress() {
  const saved = localStorage.getItem('mu_text_rpg_save');
  if (!saved) return;
  try {
    const data = JSON.parse(saved);
    Object.assign(state, data);

    const now = Date.now();
    const elapsedSeconds = Math.floor((now - (state.lastSaveTime || now)) / 1000);
    const maxOfflineSeconds = 24 * 3600;
    const actualSeconds = Math.min(elapsedSeconds, maxOfflineSeconds);

    if (actualSeconds > 60) {
      const currentTier = Math.min(10, Math.floor(state.rs / 2) + 1);
      const mobsKilledOffline = Math.floor(actualSeconds / 0.5);
      const gainedZen = mobsKilledOffline * 8 * currentTier;
      const gainedExp = mobsKilledOffline * 12 * currentTier;
      const gainedBless = Math.floor(mobsKilledOffline * 0.005);
      const gainedChaos = Math.floor(mobsKilledOffline * 0.002);
      const gainedLife = Math.floor(mobsKilledOffline * 0.002);

      state.zen += gainedZen;
      state.exp += gainedExp;
      state.bless += gainedBless;
      state.chaos += gainedChaos;
      state.life += gainedLife;

      const hours = (actualSeconds / 3600).toFixed(1);
      document.getElementById('offlineReportText').innerHTML = `
        Thời gian offline: <b>${hours} giờ</b> (${mobsKilledOffline.toLocaleString()} quái dọn dẹp)<br><br>
        • Vàng: <b style="color:var(--zen)">+${gainedZen.toLocaleString()} Zen</b><br>
        • EXP: <b style="color:#00ffcc">+${gainedExp.toLocaleString()} EXP</b><br>
        • Ngọc Ước Nguyện: <b style="color:var(--bless)">+${gainedBless} Jewel of Bless</b><br>
        • Ngọc Hỗn Nguyên: <b style="color:var(--chaos)">+${gainedChaos} Jewel of Chaos</b><br>
        • Ngọc Sinh Mệnh: <b style="color:var(--life)">+${gainedLife} Jewel of Life</b>
      `;
      document.getElementById('offlineModal').style.display = 'flex';
      audio.playKeng();
    }
  } catch (e) {}
}

function closeOfflineModal() {
  document.getElementById('offlineModal').style.display = 'none';
}

function saveGameState() {
  state.lastSaveTime = Date.now();
  try {
    localStorage.setItem('mu_text_rpg_save', JSON.stringify(state));
  } catch (e) {}
}

window.onload = () => {
  if (state.inventory.length === 0 && !state.equipped.mainWeapon) {
    state.equipped.mainWeapon = generateItem(1, 0);
    state.equipped.helm = generateItem(1, 0);
    state.equipped.armor = generateItem(1, 0);
    state.equipped.gloves = generateItem(1, 0);
    state.equipped.boots = generateItem(1, 0);
    state.inventory.push(generateItem(1, 1));
    state.inventory.push(generateItem(1, 2));
  }

  checkOfflineProgress();
  updateUI();
  startCombatLoop();

  addLog("★ CHÀO MỪNG ĐẾN VỚI LỤC ĐỊA MU: TEXT IDLE RPG! ★", 'log-boss');
  addLog("Hệ thống tự động chiến đấu tốc độ cao 0.5s/dòng đã kích hoạt!", 'log-crit');

  document.body.addEventListener('click', () => audio.init(), { once: true });
};
  }

  createProceduralTextures() {
    const heroGfx = this.make.graphics({ x: 0, y: 0, add: false });
    heroGfx.fillStyle(0xb22222, 1);
    heroGfx.fillCircle(20, 20, 16);
    heroGfx.fillStyle(0xffd700, 1);
    heroGfx.fillTriangle(4, 8, 4, 32, -8, 20);
    heroGfx.fillTriangle(36, 8, 36, 32, 48, 20);
    heroGfx.generateTexture('hero', 40, 40);

    const mobGfx = this.make.graphics({ x: 0, y: 0, add: false });
    mobGfx.fillStyle(0x2e8b57, 1);
    mobGfx.fillCircle(15, 15, 12);
    mobGfx.fillStyle(0x000000, 1);
    mobGfx.fillCircle(10, 10, 3);
    mobGfx.fillCircle(20, 10, 3);
    mobGfx.generateTexture('spider', 30, 30);

    const slashGfx = this.make.graphics({ x: 0, y: 0, add: false });
    slashGfx.lineStyle(4, 0x00ffff, 0.8);
    slashGfx.strokeCircle(50, 50, 45);
    slashGfx.lineStyle(2, 0xffffff, 0.9);
    slashGfx.strokeCircle(50, 50, 35);
    slashGfx.generateTexture('slash_fx', 100, 100);

    const zenGfx = this.make.graphics({ x: 0, y: 0, add: false });
    zenGfx.fillStyle(0xffd700, 1);
    zenGfx.fillCircle(8, 8, 7);
    zenGfx.generateTexture('loot_zen', 16, 16);

    const blessGfx = this.make.graphics({ x: 0, y: 0, add: false });
    blessGfx.fillStyle(0x9400d3, 1);
    blessGfx.fillTriangle(8, 0, 16, 16, 0, 16);
    blessGfx.generateTexture('loot_bless', 16, 16);
  }

  create() {
    this.w = this.cameras.main.width;
    this.h = this.cameras.main.height;

    this.stats = {
      level: 1,
      exp: 0,
      nextExp: 100,
      zen: 0,
      bless: 0,
      atk: 45,
      critRate: 0.25,
      hp: 500,
      maxHp: 500
    };

    this.add.rectangle(this.w / 2, this.h / 2, this.w, this.h, 0x141619);
    for (let i = 0; i < 25; i++) {
      const x = Phaser.Math.Between(20, this.w - 20);
      const y = Phaser.Math.Between(80, this.h - 100);
      this.add.rectangle(x, y, 4, 4, 0x282c34);
    }

    this.enemies = this.physics.add.group();
    this.loots = this.physics.add.group();

    this.hero = this.physics.add.sprite(this.w / 2, this.h / 2, 'hero');
    this.hero.setCollideWorldBounds(true);

    this.glowRing = this.add.ellipse(this.hero.x, this.hero.y + 15, 36, 16, 0x00ffff, 0.4);
    this.slashSprite = this.add.sprite(this.hero.x, this.hero.y, 'slash_fx');
    this.slashSprite.setVisible(false);

    this.createHUD();

    this.time.addEvent({
      delay: 700,
      callback: this.autoCombatLoop,
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 2000,
      callback: this.spawnWave,
      callbackScope: this,
      loop: true
    });

    this.spawnWave();
  }

  createHUD() {
    const headerBg = this.add.rectangle(this.w / 2, 35, this.w, 70, 0x0a0c10, 0.85);
    headerBg.setDepth(10);

    this.levelText = this.add.text(16, 12, `Lv.1 Dark Knight`, {
      font: 'bold 15px Arial',
      fill: '#ffd700'
    }).setDepth(11);

    this.expText = this.add.text(16, 32, `EXP: 0 / 100`, {
      font: '12px Arial',
      fill: '#00ffcc'
    }).setDepth(11);

    this.zenText = this.add.text(this.w - 16, 12, `Zen: 0`, {
      font: 'bold 14px Arial',
      fill: '#ffec8b',
      align: 'right'
    }).setOrigin(1, 0).setDepth(11);

    this.blessText = this.add.text(this.w - 16, 32, `Bless: 0`, {
      font: 'bold 13px Arial',
      fill: '#da70d6',
      align: 'right'
    }).setOrigin(1, 0).setDepth(11);

    this.stageBanner = this.add.text(this.w / 2, 85, 'ẢI 1: LORENCIA NGOẠI THÀNH', {
      font: 'bold 13px Arial',
      fill: '#888888'
    }).setOrigin(0.5).setDepth(10);
  }

  spawnWave() {
    if (this.enemies.countActive(true) >= 8) return;

    for (let i = 0; i < 3; i++) {
      const x = Phaser.Math.Between(40, this.w - 40);
      const y = Phaser.Math.Between(120, this.h - 120);
      const enemy = this.enemies.create(x, y, 'spider');
      enemy.hp = 100 + this.stats.level * 15;
      enemy.maxHp = enemy.hp;
      enemy.setImmovable(true);
    }
  }

  autoCombatLoop() {
    const target = this.getClosestEnemy();
    if (!target) return;

    const distance = Phaser.Math.Distance.Between(this.hero.x, this.hero.y, target.x, target.y);
    if (distance > 65) {
      this.physics.moveToObject(this.hero, target, 130);
    } else {
      this.hero.body.reset(this.hero.x, this.hero.y);
      this.castTwistingSlash();
    }
  }

  getClosestEnemy() {
    let closest = null;
    let minDistance = Infinity;

    this.enemies.children.each((enemy) => {
      if (enemy.active) {
        const dist = Phaser.Math.Distance.Between(this.hero.x, this.hero.y, enemy.x, enemy.y);
        if (dist < minDistance) {
          minDistance = dist;
          closest = enemy;
        }
      }
    });

    return closest;
  }

  castTwistingSlash() {
    this.slashSprite.setPosition(this.hero.x, this.hero.y);
    this.slashSprite.setVisible(true);
    this.slashSprite.setScale(0.7);

    this.tweens.add({
      targets: this.slashSprite,
      angle: 360,
      scale: 1.2,
      duration: 250,
      onComplete: () => {
        this.slashSprite.setVisible(false);
        this.slashSprite.setAngle(0);
      }
    });

    this.enemies.children.each((enemy) => {
      if (enemy.active) {
        const dist = Phaser.Math.Distance.Between(this.hero.x, this.hero.y, enemy.x, enemy.y);
        if (dist <= 95) {
          this.applyDamage(enemy);
        }
      }
    });
  }

  applyDamage(enemy) {
    const isCrit = Math.random() < this.stats.critRate;
    const baseDamage = this.stats.atk + Phaser.Math.Between(-5, 10);
    const finalDamage = isCrit ? Math.floor(baseDamage * 1.7) : baseDamage;

    enemy.hp -= finalDamage;
    this.showDamageText(enemy.x, enemy.y, finalDamage, isCrit);

    if (enemy.hp <= 0) {
      this.onEnemyKilled(enemy);
    }
  }

  showDamageText(x, y, damage, isCrit) {
    const color = isCrit ? '#00ff66' : '#ffff00';
    const text = isCrit ? `Crit! ${damage}` : `${damage}`;

    const dmgText = this.add.text(x + Phaser.Math.Between(-10, 10), y - 10, text, {
      font: `bold ${isCrit ? 16 : 13}px Arial`,
      fill: color
    }).setOrigin(0.5);

    this.tweens.add({
      targets: dmgText,
      y: y - 40,
      alpha: 0,
      duration: 650,
      onComplete: () => dmgText.destroy()
    });
  }

  onEnemyKilled(enemy) {
    const ex = enemy.x;
    const ey = enemy.y;
    enemy.destroy();

    if (Math.random() < 0.8) {
      const zen = this.loots.create(ex, ey, 'loot_zen');
      zen.type = 'zen';
      zen.amount = Phaser.Math.Between(15, 35) * this.stats.level;
    }

    if (Math.random() < 0.15) {
      const bless = this.loots.create(ex + 10, ey, 'loot_bless');
      bless.type = 'bless';
      bless.amount = 1;
    }

    this.time.delayedCall(400, () => this.collectLoots());
    this.gainExp(30);
  }

  collectLoots() {
    this.loots.children.each((item) => {
      if (item.active) {
        this.tweens.add({
          targets: item,
          x: this.hero.x,
          y: this.hero.y,
          duration: 300,
          onComplete: () => {
            if (item.type === 'zen') {
              this.stats.zen += item.amount;
              this.zenText.setText(`Zen: ${this.stats.zen}`);
            } else if (item.type === 'bless') {
              this.stats.bless += item.amount;
              this.blessText.setText(`Bless: ${this.stats.bless}`);
            }
            item.destroy();
          }
        });
      }
    });
  }

  gainExp(amount) {
    this.stats.exp += amount;
    if (this.stats.exp >= this.stats.nextExp) {
      this.stats.exp -= this.stats.nextExp;
      this.stats.level++;
      this.stats.nextExp = Math.floor(this.stats.nextExp * 1.5);
      this.stats.atk += 12;

      this.levelText.setText(`Lv.${this.stats.level} Dark Knight`);

      const lvUp = this.add.text(this.hero.x, this.hero.y - 30, 'LEVEL UP!', {
        font: 'bold 18px Arial',
        fill: '#ffd700'
      }).setOrigin(0.5);

      this.tweens.add({
        targets: lvUp,
        y: this.hero.y - 70,
        alpha: 0,
        duration: 900,
        onComplete: () => lvUp.destroy()
      });
    }

    this.expText.setText(`EXP: ${this.stats.exp} / ${this.stats.nextExp}`);
  }

  update() {
    if (this.glowRing && this.hero) {
      this.glowRing.setPosition(this.hero.x, this.hero.y + 16);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 420,
  height: 750,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [GameScene]
};

new Phaser.Game(config);
