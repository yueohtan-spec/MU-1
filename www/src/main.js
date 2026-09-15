class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.createProceduralTextures();
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
