        (function() {
            // ==================== CONFIG ====================
            var CONFIG = {
                GRID_SIZE: 20,
                CANVAS_SIZE: 500,
                BASE_SPEED: 120,
                COMBO_TIMEOUT: 2000
            };

            // ==================== WORLDS ====================
            var WORLDS = [
                { id: 1, name: "Green Meadows", color: "#00ff88", bgColor: "#0a1a0a", levels: 10, enemies: ["worm"], bossName: "🐸 Giant Toad", bossHP: 100 },
                { id: 2, name: "Sandy Desert", color: "#ffd700", bgColor: "#1a1a0a", levels: 10, enemies: ["worm", "scorpion"], bossName: "🦂 Scorpion King", bossHP: 150 },
                { id: 3, name: "Deep Ocean", color: "#00aaff", bgColor: "#0a0a1a", levels: 10, enemies: ["octopus"], bossName: "🐙 Kraken", bossHP: 200 },
                { id: 4, name: "Dark Cave", color: "#a855f7", bgColor: "#0a0a0f", levels: 10, enemies: ["spider", "bat"], bossName: "🦇 Vampire", bossHP: 250 },
                { id: 5, name: "Volcano", color: "#ff6b6b", bgColor: "#1a0a0a", levels: 10, enemies: ["worm", "scorpion", "spider"], bossName: "🐉 Dragon", bossHP: 300 }
            ];

            // ==================== SHOP ====================
            var SHOP_ITEMS = {
                skins: [
                    { id: 'default', name: 'Classic', desc: 'Original snake', price: 0, color: '#00ff88', icon: '🐍', rarity: 'common', bonus: '' },
                    { id: 'neon', name: 'Neon', desc: 'Glowing cyan', price: 100, color: '#00ffff', icon: '💎', rarity: 'common', bonus: '+5% score' },
                    { id: 'fire', name: 'Flame', desc: 'Hot!', price: 200, color: '#ff4500', icon: '🔥', rarity: 'rare', bonus: '+10% score' },
                    { id: 'gold', name: 'Golden', desc: 'Luxury', price: 400, color: '#ffd700', icon: '👑', rarity: 'epic', bonus: '+15% coins' },
                    { id: 'rainbow', name: 'Rainbow', desc: 'Colorful!', price: 500, color: 'rainbow', icon: '🌈', rarity: 'epic', bonus: '+10% all' },
                    { id: 'dragon', name: 'Dragon', desc: 'Ancient', price: 1000, color: '#ff6b6b', icon: '🐲', rarity: 'legendary', bonus: '+25% all' }
                ],
                powerups: [
                    { id: 'shield_pack', name: 'Shield x3', desc: 'Start with shield', price: 150, icon: '🛡️', uses: 3 },
                    { id: 'magnet_pack', name: 'Magnet x3', desc: 'Attract items', price: 150, icon: '🧲', uses: 3 },
                    { id: 'double_coin', name: '2x Coins', desc: 'Double coins (1 game)', price: 100, icon: '💰', uses: 1 },
                    { id: 'extra_life', name: 'Extra Life', desc: 'One revival', price: 250, icon: '❤️', uses: 1 },
                    { id: 'head_start', name: 'Head Start', desc: 'Start +5 length', price: 100, icon: '🚀', uses: 1 }
                ],
                upgrades: [
                    { id: 'speed_up', name: 'Speed+', desc: 'Move faster', price: 200, icon: '⚡', maxLevel: 5, perLevel: 8 },
                    { id: 'coin_bonus', name: 'Coin+', desc: '+15% coins/level', price: 250, icon: '🪙', maxLevel: 5, perLevel: 15 },
                    { id: 'score_bonus', name: 'Score+', desc: '+15% score/level', price: 250, icon: '📈', maxLevel: 5, perLevel: 15 },
                    { id: 'start_length', name: 'Length+', desc: '+1 start length', price: 200, icon: '📏', maxLevel: 5, perLevel: 1 },
                    { id: 'combo_time', name: 'Combo+', desc: '+0.5s combo time', price: 300, icon: '⏱️', maxLevel: 5, perLevel: 500 }
                ]
            };

            // ==================== ACHIEVEMENTS ====================
            var ACHIEVEMENTS = [
                { id: 'first_game', name: 'First Steps', desc: 'Play your first game', icon: '👶', reward: 50, condition: function() { return game.stats.gamesPlayed >= 1; } },
                { id: 'score_100', name: 'Century', desc: 'Score 100 points', icon: '💯', reward: 50, condition: function() { return game.stats.highScore >= 100; } },
                { id: 'score_500', name: 'High Scorer', desc: 'Score 500 points', icon: '🎯', reward: 100, condition: function() { return game.stats.highScore >= 500; } },
                { id: 'score_1000', name: 'Pro Player', desc: 'Score 1000 points', icon: '🏅', reward: 200, condition: function() { return game.stats.highScore >= 1000; } },
                { id: 'score_2500', name: 'Legend', desc: 'Score 2500 points', icon: '🏆', reward: 500, condition: function() { return game.stats.highScore >= 2500; } },
                { id: 'food_50', name: 'Hungry', desc: 'Eat 50 food total', icon: '🍎', reward: 50, condition: function() { return game.stats.totalFood >= 50; } },
                { id: 'food_200', name: 'Glutton', desc: 'Eat 200 food total', icon: '🍔', reward: 150, condition: function() { return game.stats.totalFood >= 200; } },
                { id: 'food_500', name: 'Feast Master', desc: 'Eat 500 food total', icon: '🎂', reward: 300, condition: function() { return game.stats.totalFood >= 500; } },
                { id: 'combo_5', name: 'Combo Starter', desc: 'Get a 5x combo', icon: '🔥', reward: 75, condition: function() { return game.stats.bestCombo >= 5; } },
                { id: 'combo_10', name: 'Combo King', desc: 'Get a 10x combo', icon: '👑', reward: 200, condition: function() { return game.stats.bestCombo >= 10; } },
                { id: 'combo_20', name: 'Combo God', desc: 'Get a 20x combo', icon: '⚡', reward: 500, condition: function() { return game.stats.bestCombo >= 20; } },
                { id: 'enemy_10', name: 'Survivor', desc: 'Kill 10 enemies', icon: '💀', reward: 100, condition: function() { return game.stats.enemiesKilled >= 10; } },
                { id: 'enemy_50', name: 'Slayer', desc: 'Kill 50 enemies', icon: '⚔️', reward: 250, condition: function() { return game.stats.enemiesKilled >= 50; } },
                { id: 'boss_1', name: 'Boss Slayer', desc: 'Defeat your first boss', icon: '👹', reward: 200, condition: function() { return game.stats.bossesDefeated >= 1; } },
                { id: 'boss_5', name: 'Boss Hunter', desc: 'Defeat 5 bosses', icon: '🐉', reward: 500, condition: function() { return game.stats.bossesDefeated >= 5; } },
                { id: 'world_2', name: 'Explorer', desc: 'Reach World 2', icon: '🗺️', reward: 150, condition: function() { return game.unlockedWorld >= 2; } },
                { id: 'world_3', name: 'Adventurer', desc: 'Reach World 3', icon: '🧭', reward: 250, condition: function() { return game.unlockedWorld >= 3; } },
                { id: 'world_5', name: 'World Conqueror', desc: 'Unlock all worlds', icon: '🌍', reward: 1000, condition: function() { return game.unlockedWorld >= 5; } },
                { id: 'coins_1000', name: 'Wealthy', desc: 'Earn 1000 coins total', icon: '💰', reward: 100, condition: function() { return game.stats.totalCoins >= 1000; } },
                { id: 'coins_5000', name: 'Rich', desc: 'Earn 5000 coins total', icon: '💎', reward: 300, condition: function() { return game.stats.totalCoins >= 5000; } },
                { id: 'games_10', name: 'Dedicated', desc: 'Play 10 games', icon: '🎮', reward: 100, condition: function() { return game.stats.gamesPlayed >= 10; } },
                { id: 'games_50', name: 'Addicted', desc: 'Play 50 games', icon: '🕹️', reward: 300, condition: function() { return game.stats.gamesPlayed >= 50; } },
                { id: 'length_20', name: 'Long Snake', desc: 'Reach length 20', icon: '📏', reward: 150, condition: function() { return game.stats.maxLength >= 20; } },
                { id: 'length_50', name: 'Giant Snake', desc: 'Reach length 50', icon: '🐍', reward: 400, condition: function() { return game.stats.maxLength >= 50; } },
                { id: 'no_death', name: 'Untouchable', desc: 'Complete a level without dying', icon: '🛡️', reward: 200, condition: function() { return game.stats.perfectLevels >= 1; } },
                { id: 'skin_3', name: 'Fashionista', desc: 'Own 3 skins', icon: '🎨', reward: 150, condition: function() { return game.ownedSkins.length >= 3; } },
                { id: 'upgrade_max', name: 'Maxed Out', desc: 'Max any upgrade', icon: '⬆️', reward: 300, condition: function() { for(var k in game.upgradeLevels) { if(game.upgradeLevels[k] >= 5) return true; } return false; } },
                { id: 'all_upgrades', name: 'Fully Upgraded', desc: 'Max all upgrades', icon: '🌟', reward: 1000, condition: function() { var items = SHOP_ITEMS.upgrades; for(var i=0; i<items.length; i++) { if((game.upgradeLevels[items[i].id]||0) < 5) return false; } return true; } }
            ];

            // ==================== ENEMIES ====================
            var ENEMY_TYPES = {
                worm: { icon: '🐛', speed: 0.5, behavior: 'random', points: 25 },
                scorpion: { icon: '🦂', speed: 0.3, behavior: 'chase', points: 50 },
                spider: { icon: '🕷️', speed: 0.8, behavior: 'erratic', points: 40 },
                octopus: { icon: '🐙', speed: 0.2, behavior: 'shoot', points: 60 },
                bat: { icon: '🦇', speed: 1.0, behavior: 'swoop', points: 35 }
            };

            // ==================== GAME STATE ====================
            var game = {
                snake: [],
                direction: { x: 1, y: 0 },
                nextDirection: { x: 1, y: 0 },
                food: null,
                specialItems: [],
                enemies: [],
                enemyProjectiles: [],
                obstacles: [],

                score: 0,
                highScore: 0,
                coins: 500,
                combo: 1,
                maxCombo: 1,
                lastEatTime: 0,
                foodEaten: 0,

                currentWorld: 1,
                currentLevel: 1,
                unlockedWorld: 1,
                levelProgress: {},

                isPlaying: false,
                isPaused: false,
                gameLoopId: null,
                itemTimerId: null,
                enemyTimerId: null,
                speed: CONFIG.BASE_SPEED,
                lives: 1,
                perfectRun: true,

                powerUps: { shield: false, magnet: false, doublePoints: false },
                powerUpTimers: {},
                powerUpDurations: {},

                boss: null,
                bossActive: false,
                bossHealth: 100,
                bossMaxHealth: 100,
                bossPhase: 1,
                bossProjectiles: [],

                ownedSkins: ['default'],
                ownedPowerups: {},
                upgradeLevels: {},
                selectedSkin: 'default',
                activeConsumables: {},
                unlockedAchievements: [],

                stats: {
                    gamesPlayed: 0,
                    highScore: 0,
                    totalFood: 0,
                    totalCoins: 0,
                    bestCombo: 0,
                    enemiesKilled: 0,
                    bossesDefeated: 0,
                    maxLength: 0,
                    perfectLevels: 0
                }
            };
            var uiSettings = {
                shortcutHintsEnabled: true
            };
            var STORAGE_KEYS = {
                ui: 'snake_ui_settings',
                progress: 'snake_progress_v1'
            };

            // ==================== CANVAS ====================
            var canvas = document.getElementById('gameCanvas');
            var ctx = canvas.getContext('2d');
            var cellSize = CONFIG.CANVAS_SIZE / CONFIG.GRID_SIZE;

            // ==================== DOM ====================
            var $ = function(id) { return document.getElementById(id); };
            var BUTTON_SHORTCUTS = [
                { id: 'pauseBtn', key: ' ', label: 'Space', screen: 'game', showHint: true },
                { id: 'menuBtn', key: 'm', label: 'M', screen: 'game', showHint: true },
                { id: 'shopBtn', key: 'b', label: 'B', screen: 'game', showHint: true },
                { id: 'achieveBtn', key: 'k', label: 'K', screen: 'game', showHint: true },

                { id: 'startGameBtn', key: 'enter', label: 'Enter', screen: 'menuScreen', showHint: true },
                { id: 'selectLevelBtn', key: 'l', label: 'L', screen: 'menuScreen', showHint: true },
                { id: 'openShopBtn', key: 's', label: 'S', screen: 'menuScreen', showHint: true },
                { id: 'moreOptionsBtn', key: 'm', label: 'M', screen: 'menuScreen', showHint: true },

                { id: 'achievementsBtn', key: 'a', label: 'A', screen: 'moreScreen', showHint: true },
                { id: 'statsBtn', key: 't', label: 'T', screen: 'moreScreen', showHint: true },
                { id: 'helpBtn', key: 'h', label: 'H', screen: 'moreScreen', showHint: true },
                { id: 'moreBackBtn', key: 'escape', label: 'Esc', screen: 'moreScreen', showHint: true },

                { id: 'levelBackBtn', key: 'escape', label: 'Esc', screen: 'levelScreen', showHint: true },
                { id: 'shopBackBtn', key: 'escape', label: 'Esc', screen: 'shopScreen', showHint: true },
                { id: 'achieveBackBtn', key: 'escape', label: 'Esc', screen: 'achievementsScreen', showHint: true },
                { id: 'statsBackBtn', key: 'escape', label: 'Esc', screen: 'statsScreen', showHint: true },
                { id: 'helpBackBtn', key: 'escape', label: 'Esc', screen: 'helpScreen', showHint: true },

                { id: 'tryAgainBtn', key: 'r', label: 'R', screen: 'gameOverScreen', showHint: true },
                { id: 'gameOverMenuBtn', key: 'm', label: 'M', screen: 'gameOverScreen', showHint: true },

                { id: 'nextLevelBtn', key: 'n', label: 'N', screen: 'levelCompleteScreen', showHint: true },
                { id: 'levelCompleteMenuBtn', key: 'm', label: 'M', screen: 'levelCompleteScreen', showHint: true },

                { id: 'continueBtn', key: 'enter', label: 'Enter', screen: 'bossDefeatedScreen', showHint: true },

                { id: 'resumeBtn', key: 'enter', label: 'Enter', screen: 'pauseScreen', showHint: true },
                { id: 'restartBtn', key: 'r', label: 'R', screen: 'pauseScreen', showHint: true },
                { id: 'pauseMenuBtn', key: 'm', label: 'M', screen: 'pauseScreen', showHint: true }
            ];

            // ==================== HELPERS ====================
            function showScreen(id) {
                var screens = ['menuScreen', 'moreScreen', 'levelScreen', 'shopScreen', 'achievementsScreen', 'statsScreen', 'helpScreen', 'gameOverScreen', 'levelCompleteScreen', 'bossDefeatedScreen', 'pauseScreen'];
                for (var i = 0; i < screens.length; i++) {
                    var el = $(screens[i]);
                    if (el) el.classList.remove('active');
                }
                if (id) $(id).classList.add('active');
            }

            function getActiveScreenId() {
                var active = document.querySelector('.screen-overlay.active');
                return active ? active.id : null;
            }

            function isShortcutActive(def) {
                var activeScreen = getActiveScreenId();
                if (def.screen === 'game') return game.isPlaying && !activeScreen;
                return activeScreen === def.screen;
            }

            function normalizeShortcutKey(key) {
                if (key === ' ') return ' ';
                return String(key || '').toLowerCase();
            }

            function handleShortcut(e) {
                if (e.metaKey || e.ctrlKey || e.altKey) return false;

                var key = normalizeShortcutKey(e.key);
                for (var i = 0; i < BUTTON_SHORTCUTS.length; i++) {
                    var def = BUTTON_SHORTCUTS[i];
                    if (key === def.key && isShortcutActive(def)) {
                        var btn = $(def.id);
                        if (!btn) return false;
                        e.preventDefault();
                        btn.click();
                        return true;
                    }
                }
                return false;
            }

            function applyShortcutHints() {
                for (var i = 0; i < BUTTON_SHORTCUTS.length; i++) {
                    var def = BUTTON_SHORTCUTS[i];
                    if (!def.showHint) continue;

                    var btn = $(def.id);
                    if (!btn || btn.querySelector('.shortcut-hint')) continue;

                    btn.classList.add('has-shortcut');

                    var label = btn.querySelector('.btn-label');
                    if (!label) {
                        label = document.createElement('span');
                        label.className = 'btn-label';
                        while (btn.firstChild) {
                            label.appendChild(btn.firstChild);
                        }
                        btn.appendChild(label);
                    }

                    var hint = document.createElement('span');
                    hint.className = 'shortcut-hint';
                    hint.textContent = def.label;
                    btn.appendChild(hint);

                    var existingTitle = btn.getAttribute('title');
                    var shortcutTitle = 'Shortcut: ' + def.label;
                    btn.setAttribute('title', existingTitle ? (existingTitle + ' | ' + shortcutTitle) : shortcutTitle);
                }
            }

            function readStorageJson(key) {
                try {
                    var raw = localStorage.getItem(key);
                    if (!raw) return null;
                    return JSON.parse(raw);
                } catch (e) {
                    return null;
                }
            }

            function writeStorageJson(key, value) {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                } catch (e) {}
            }

            function loadUISettings() {
                var parsed = readStorageJson(STORAGE_KEYS.ui);
                if (!parsed) return;
                if (typeof parsed.shortcutHintsEnabled === 'boolean') {
                    uiSettings.shortcutHintsEnabled = parsed.shortcutHintsEnabled;
                }
            }

            function saveUISettings() {
                writeStorageJson(STORAGE_KEYS.ui, uiSettings);
            }

            function getProgressSnapshot() {
                return {
                    coins: game.coins,
                    currentWorld: game.currentWorld,
                    currentLevel: game.currentLevel,
                    unlockedWorld: game.unlockedWorld,
                    levelProgress: game.levelProgress,
                    ownedSkins: game.ownedSkins,
                    ownedPowerups: game.ownedPowerups,
                    upgradeLevels: game.upgradeLevels,
                    selectedSkin: game.selectedSkin,
                    unlockedAchievements: game.unlockedAchievements,
                    stats: game.stats
                };
            }

            function applyProgressSnapshot(snapshot) {
                if (!snapshot || typeof snapshot !== 'object') return;

                if (typeof snapshot.coins === 'number' && isFinite(snapshot.coins)) {
                    game.coins = Math.max(0, Math.floor(snapshot.coins));
                }
                if (typeof snapshot.currentWorld === 'number' && isFinite(snapshot.currentWorld)) {
                    game.currentWorld = Math.min(WORLDS.length, Math.max(1, Math.floor(snapshot.currentWorld)));
                }
                if (typeof snapshot.currentLevel === 'number' && isFinite(snapshot.currentLevel)) {
                    var maxLevels = WORLDS[game.currentWorld - 1].levels;
                    game.currentLevel = Math.min(maxLevels, Math.max(1, Math.floor(snapshot.currentLevel)));
                }
                if (typeof snapshot.unlockedWorld === 'number' && isFinite(snapshot.unlockedWorld)) {
                    game.unlockedWorld = Math.min(WORLDS.length, Math.max(1, Math.floor(snapshot.unlockedWorld)));
                }

                if (snapshot.levelProgress && typeof snapshot.levelProgress === 'object' && !Array.isArray(snapshot.levelProgress)) {
                    var nextLevelProgress = {};
                    for (var levelKey in snapshot.levelProgress) {
                        if (!Object.prototype.hasOwnProperty.call(snapshot.levelProgress, levelKey)) continue;
                        var levelValue = snapshot.levelProgress[levelKey];
                        if (typeof levelValue !== 'number' || !isFinite(levelValue)) continue;
                        if (!/^[0-9]+(?:-[0-9]+_stars)?$/.test(levelKey)) continue;
                        nextLevelProgress[levelKey] = Math.max(0, Math.floor(levelValue));
                    }
                    game.levelProgress = nextLevelProgress;
                }

                if (Array.isArray(snapshot.ownedSkins)) {
                    var skinMap = {};
                    for (var i = 0; i < SHOP_ITEMS.skins.length; i++) {
                        skinMap[SHOP_ITEMS.skins[i].id] = true;
                    }
                    var nextSkins = ['default'];
                    for (var j = 0; j < snapshot.ownedSkins.length; j++) {
                        var skinId = snapshot.ownedSkins[j];
                        if (skinMap[skinId] && nextSkins.indexOf(skinId) === -1) {
                            nextSkins.push(skinId);
                        }
                    }
                    game.ownedSkins = nextSkins;
                }

                if (snapshot.ownedPowerups && typeof snapshot.ownedPowerups === 'object' && !Array.isArray(snapshot.ownedPowerups)) {
                    var nextPowerups = {};
                    for (var p = 0; p < SHOP_ITEMS.powerups.length; p++) {
                        var powerupId = SHOP_ITEMS.powerups[p].id;
                        var powerupCount = snapshot.ownedPowerups[powerupId];
                        if (typeof powerupCount === 'number' && isFinite(powerupCount) && powerupCount > 0) {
                            nextPowerups[powerupId] = Math.floor(powerupCount);
                        }
                    }
                    game.ownedPowerups = nextPowerups;
                }

                if (snapshot.upgradeLevels && typeof snapshot.upgradeLevels === 'object' && !Array.isArray(snapshot.upgradeLevels)) {
                    var nextUpgradeLevels = {};
                    for (var u = 0; u < SHOP_ITEMS.upgrades.length; u++) {
                        var upgrade = SHOP_ITEMS.upgrades[u];
                        var upgradeLevel = snapshot.upgradeLevels[upgrade.id];
                        if (typeof upgradeLevel === 'number' && isFinite(upgradeLevel)) {
                            nextUpgradeLevels[upgrade.id] = Math.min(upgrade.maxLevel, Math.max(0, Math.floor(upgradeLevel)));
                        }
                    }
                    game.upgradeLevels = nextUpgradeLevels;
                }

                if (typeof snapshot.selectedSkin === 'string' && game.ownedSkins.indexOf(snapshot.selectedSkin) !== -1) {
                    game.selectedSkin = snapshot.selectedSkin;
                } else if (game.ownedSkins.indexOf(game.selectedSkin) === -1) {
                    game.selectedSkin = 'default';
                }

                if (Array.isArray(snapshot.unlockedAchievements)) {
                    var achievementMap = {};
                    for (var a = 0; a < ACHIEVEMENTS.length; a++) achievementMap[ACHIEVEMENTS[a].id] = true;
                    var nextAchievements = [];
                    for (var b = 0; b < snapshot.unlockedAchievements.length; b++) {
                        var achievementId = snapshot.unlockedAchievements[b];
                        if (achievementMap[achievementId] && nextAchievements.indexOf(achievementId) === -1) {
                            nextAchievements.push(achievementId);
                        }
                    }
                    game.unlockedAchievements = nextAchievements;
                }

                if (snapshot.stats && typeof snapshot.stats === 'object' && !Array.isArray(snapshot.stats)) {
                    var statKeys = ['gamesPlayed', 'highScore', 'totalFood', 'totalCoins', 'bestCombo', 'enemiesKilled', 'bossesDefeated', 'maxLength', 'perfectLevels'];
                    for (var s = 0; s < statKeys.length; s++) {
                        var statKey = statKeys[s];
                        var statValue = snapshot.stats[statKey];
                        if (typeof statValue === 'number' && isFinite(statValue)) {
                            game.stats[statKey] = Math.max(0, Math.floor(statValue));
                        }
                    }
                }
            }

            function loadProgress() {
                applyProgressSnapshot(readStorageJson(STORAGE_KEYS.progress));
            }

            function saveProgress() {
                writeStorageJson(STORAGE_KEYS.progress, getProgressSnapshot());
            }

            function updateShortcutHintsToggleButton() {
                var btn = $('toggleShortcutHintsBtn');
                if (!btn) return;
                btn.textContent = '⌨️ Shortcut Hints: ' + (uiSettings.shortcutHintsEnabled ? 'On' : 'Off');
            }

            function applyShortcutHintsVisibility() {
                document.body.classList.toggle('shortcut-hints-disabled', !uiSettings.shortcutHintsEnabled);
                updateShortcutHintsToggleButton();
            }

            function showNotification(msg, type) {
                var el = $('notification');
                el.textContent = msg;
                el.className = 'notification show' + (type ? ' ' + type : '');
                setTimeout(function() { el.classList.remove('show'); }, 3000);
            }

            function showAchievementPopup(name) {
                var el = $('achievementPopup');
                el.textContent = '🏆 ' + name + ' Unlocked!';
                el.classList.add('show');
                setTimeout(function() { el.classList.remove('show'); }, 3000);
            }

            function createParticles(x, y, color, count) {
                var container = $('particles');
                for (var i = 0; i < count; i++) {
                    var p = document.createElement('div');
                    p.className = 'particle';
                    p.style.left = x + 'px';
                    p.style.top = y + 'px';
                    p.style.width = (4 + Math.random() * 6) + 'px';
                    p.style.height = p.style.width;
                    p.style.background = color;
                    p.style.transform = 'translate(' + ((Math.random() - 0.5) * 50) + 'px,' + ((Math.random() - 0.5) * 50) + 'px)';
                    container.appendChild(p);
                    (function(particle) {
                        setTimeout(function() { if (particle.parentNode) particle.parentNode.removeChild(particle); }, 800);
                    })(p);
                }
            }

            function screenShake() {
                $('gameContainer').classList.add('shake');
                setTimeout(function() { $('gameContainer').classList.remove('shake'); }, 300);
            }

            function updateDisplays() {
                $('scoreDisplay').textContent = game.score;
                $('highScoreDisplay').textContent = game.stats.highScore;
                $('coinsDisplay').textContent = '💰 ' + game.coins;
                $('comboDisplay').textContent = 'x' + game.combo;
                $('shopCoins').textContent = game.coins;
            }

            function updateProgress() {
                var world = WORLDS[game.currentWorld - 1];
                var isBoss = game.currentLevel === world.levels;
                var goal = getGoal();

                var progress = isBoss ? (game.bossActive ? 0 : 100) : Math.min((game.foodEaten / goal) * 100, 100);

                $('progressFill').style.width = progress + '%';
                $('progressText').textContent = isBoss ? (game.bossActive ? 'DEFEAT THE BOSS!' : 'DONE!') : (game.foodEaten + '/' + goal);
                $('progressLabel').textContent = isBoss ? 'Boss Battle' : 'Progress';
            }

            function getGoal() {
                return 5 + game.currentLevel * 2 + (game.currentWorld - 1) * 3;
            }

            function updatePowerUpIndicator() {
                var html = '';
                var types = [
                    { key: 'shield', name: '🛡️ Shield' },
                    { key: 'magnet', name: '🧲 Magnet' },
                    { key: 'doublePoints', name: '🔥 2x' }
                ];
                for (var i = 0; i < types.length; i++) {
                    var t = types[i];
                    if (game.powerUps[t.key]) {
                        var dur = game.powerUpDurations[t.key] || 100;
                        html += '<div class="powerup-active">' + t.name + '<div class="powerup-timer"><div class="powerup-timer-fill" style="width:' + dur + '%"></div></div></div>';
                    }
                }
                $('powerupIndicator').innerHTML = html;
            }

            // ==================== MULTIPLIERS (WORKING UPGRADES) ====================
            function getScoreMultiplier() {
                var mult = 1;

                // Upgrade bonus
                var scoreLevel = game.upgradeLevels.score_bonus || 0;
                mult += scoreLevel * 0.15; // +15% per level

                // Power-up
                if (game.powerUps.doublePoints) mult *= 2;

                // Skin bonus
                var skin = getSkinData();
                if (skin && skin.bonus) {
                    if (skin.bonus.indexOf('score') !== -1 || skin.bonus.indexOf('all') !== -1) {
                        var match = skin.bonus.match(/\+(\d+)%/);
                        if (match) mult += parseInt(match[1]) / 100;
                    }
                }

                // Combo multiplier
                mult *= (1 + (game.combo - 1) * 0.1);

                return mult;
            }

            function getCoinMultiplier() {
                var mult = 1;

                // Upgrade bonus
                var coinLevel = game.upgradeLevels.coin_bonus || 0;
                mult += coinLevel * 0.15; // +15% per level

                // Consumable
                if (game.activeConsumables.double_coin) mult *= 2;

                // Skin bonus
                var skin = getSkinData();
                if (skin && skin.bonus) {
                    if (skin.bonus.indexOf('coins') !== -1 || skin.bonus.indexOf('all') !== -1) {
                        var match = skin.bonus.match(/\+(\d+)%/);
                        if (match) mult += parseInt(match[1]) / 100;
                    }
                }

                return mult;
            }

            function getComboTime() {
                var base = CONFIG.COMBO_TIMEOUT;
                var comboLevel = game.upgradeLevels.combo_time || 0;
                return base + comboLevel * 500; // +0.5s per level
            }

            function getStartLength() {
                var base = 3;
                var lengthLevel = game.upgradeLevels.start_length || 0;
                var bonus = lengthLevel * 1; // +1 per level
                if (game.activeConsumables.head_start) bonus += 5;
                return base + bonus;
            }

            function getSpeed() {
                var base = CONFIG.BASE_SPEED;
                var speedLevel = game.upgradeLevels.speed_up || 0;
                var reduction = speedLevel * 8; // -8ms per level (faster)
                var worldReduction = (game.currentWorld - 1) * 5 + (game.currentLevel - 1) * 2;
                return Math.max(50, base - reduction - worldReduction);
            }

            function getSkinData() {
                for (var i = 0; i < SHOP_ITEMS.skins.length; i++) {
                    if (SHOP_ITEMS.skins[i].id === game.selectedSkin) {
                        return SHOP_ITEMS.skins[i];
                    }
                }
                return null;
            }

            // ==================== ACHIEVEMENTS ====================
            function checkAchievements() {
                var unlockedAny = false;
                for (var i = 0; i < ACHIEVEMENTS.length; i++) {
                    var ach = ACHIEVEMENTS[i];
                    if (game.unlockedAchievements.indexOf(ach.id) === -1) {
                        if (ach.condition()) {
                            game.unlockedAchievements.push(ach.id);
                            game.coins += ach.reward;
                            game.stats.totalCoins += ach.reward;
                            unlockedAny = true;
                            showAchievementPopup(ach.name);
                            updateDisplays();
                        }
                    }
                }
                if (unlockedAny) saveProgress();
            }

            function generateAchievementsGrid() {
                var html = '';
                var unlocked = 0;

                for (var i = 0; i < ACHIEVEMENTS.length; i++) {
                    var ach = ACHIEVEMENTS[i];
                    var isUnlocked = game.unlockedAchievements.indexOf(ach.id) !== -1;
                    if (isUnlocked) unlocked++;

                    html += '<div class="achievement-card ' + (isUnlocked ? 'unlocked' : 'locked') + '">';
                    html += '<div class="achievement-badge">' + (isUnlocked ? '✓' : '🔒') + '</div>';
                    html += '<div class="achievement-header">';
                    html += '<div class="achievement-icon">' + ach.icon + '</div>';
                    html += '<div class="achievement-info">';
                    html += '<div class="achievement-name">' + ach.name + '</div>';
                    html += '<div class="achievement-desc">' + ach.desc + '</div>';
                    html += '</div></div>';
                    html += '<div class="achievement-reward">Reward: +' + ach.reward + ' 💰</div>';
                    html += '</div>';
                }

                $('achievementsGrid').innerHTML = html;
                $('achieveCount').textContent = unlocked;
                $('achieveTotal').textContent = ACHIEVEMENTS.length;
            }

            // ==================== STATS ====================
            function generateStatsGrid() {
                var stats = [
                    { label: 'Games Played', value: game.stats.gamesPlayed },
                    { label: 'High Score', value: game.stats.highScore },
                    { label: 'Best Combo', value: 'x' + game.stats.bestCombo },
                    { label: 'Total Food', value: game.stats.totalFood },
                    { label: 'Total Coins', value: game.stats.totalCoins },
                    { label: 'Enemies Killed', value: game.stats.enemiesKilled },
                    { label: 'Bosses Defeated', value: game.stats.bossesDefeated },
                    { label: 'Max Length', value: game.stats.maxLength },
                    { label: 'Perfect Levels', value: game.stats.perfectLevels },
                    { label: 'Achievements', value: game.unlockedAchievements.length + '/' + ACHIEVEMENTS.length },
                    { label: 'Skins Owned', value: game.ownedSkins.length + '/' + SHOP_ITEMS.skins.length },
                    { label: 'World Progress', value: game.unlockedWorld + '/' + WORLDS.length }
                ];

                var html = '';
                for (var i = 0; i < stats.length; i++) {
                    html += '<div class="stat-card">';
                    html += '<div class="stat-card-label">' + stats[i].label + '</div>';
                    html += '<div class="stat-card-value">' + stats[i].value + '</div>';
                    html += '</div>';
                }

                $('statsGrid').innerHTML = html;
            }

            // ==================== LEVEL GRID ====================
            function generateWorldTabs() {
                var html = '';
                for (var i = 0; i < WORLDS.length; i++) {
                    var w = WORLDS[i];
                    var locked = w.id > game.unlockedWorld;
                    html += '<div class="world-tab' + (w.id === game.currentWorld ? ' active' : '') + (locked ? ' locked' : '') + '" data-world="' + w.id + '">';
                    html += (locked ? '🔒' : '') + ' W' + w.id;
                    html += '</div>';
                }
                $('worldTabs').innerHTML = html;

                var tabs = $('worldTabs').querySelectorAll('.world-tab:not(.locked)');
                for (var j = 0; j < tabs.length; j++) {
                    tabs[j].onclick = function() {
                        game.currentWorld = parseInt(this.getAttribute('data-world'));
                        generateWorldTabs();
                        generateLevelGrid();
                    };
                }
            }

            function generateLevelGrid() {
                var world = WORLDS[game.currentWorld - 1];
                var html = '';

                for (var i = 1; i <= world.levels; i++) {
                    var unlocked = game.currentWorld < game.unlockedWorld || (game.currentWorld === game.unlockedWorld && i <= (game.levelProgress[game.currentWorld] || 1));
                    var isBoss = i === world.levels;
                    var stars = game.levelProgress[game.currentWorld + '-' + i + '_stars'] || 0;

                    html += '<div class="level-card' + (unlocked ? '' : ' locked') + (isBoss ? ' boss' : '') + '" data-level="' + i + '">';
                    html += '<div class="level-number">' + (isBoss ? '👹' : i) + '</div>';
                    html += '<div class="level-stars">' + (unlocked ? getStarDisplay(stars) : '🔒') + '</div>';
                    html += '</div>';
                }

                $('levelGrid').innerHTML = html;

                var cards = $('levelGrid').querySelectorAll('.level-card:not(.locked)');
                for (var j = 0; j < cards.length; j++) {
                    cards[j].onclick = function() {
                        game.currentLevel = parseInt(this.getAttribute('data-level'));
                        startGame();
                    };
                }
            }

            function getStarDisplay(stars) {
                var s = '';
                for (var i = 0; i < 3; i++) s += i < stars ? '⭐' : '☆';
                return s;
            }

            // ==================== SHOP ====================
            var currentTab = 'skins';

            function generateShopGrid() {
                var items = SHOP_ITEMS[currentTab];
                var html = '';

                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var owned = false;
                    var equipped = false;
                    var level = 0;
                    var maxed = false;

                    if (currentTab === 'skins') {
                        owned = game.ownedSkins.indexOf(item.id) !== -1;
                        equipped = game.selectedSkin === item.id;
                    } else if (currentTab === 'powerups') {
                        owned = (game.ownedPowerups[item.id] || 0) > 0;
                    } else if (currentTab === 'upgrades') {
                        level = game.upgradeLevels[item.id] || 0;
                        maxed = level >= item.maxLevel;
                    }

                    var classes = 'shop-item';
                    if (item.rarity) classes += ' rarity-' + item.rarity;
                    if (owned) classes += ' owned';
                    if (equipped) classes += ' equipped';
                    if (maxed) classes += ' maxed';

                    html += '<div class="' + classes + '" data-id="' + item.id + '">';
                    html += '<div class="shop-item-icon">' + item.icon + '</div>';
                    html += '<div class="shop-item-name">' + item.name + '</div>';
                    html += '<div class="shop-item-desc">' + item.desc + '</div>';

                    if (item.bonus) {
                        html += '<div class="shop-item-stats">' + item.bonus + '</div>';
                    }

                    if (currentTab === 'upgrades') {
                        html += '<div class="upgrade-level">';
                        for (var j = 0; j < item.maxLevel; j++) {
                            html += '<div class="upgrade-pip' + (j < level ? ' filled' : '') + '"></div>';
                        }
                        html += '</div>';

                        if (maxed) {
                            html += '<div style="color:#ffd700;font-weight:bold;margin-top:5px;">MAXED</div>';
                        } else {
                            var price = item.price * (level + 1);
                            html += '<div class="shop-item-price">💰 ' + price + '</div>';
                        }
                    } else if (currentTab === 'skins') {
                        if (owned) {
                            html += '<div style="color:' + (equipped ? '#00aaff' : '#00ff88') + ';font-weight:bold;margin-top:5px;">' + (equipped ? '✓ EQUIPPED' : 'Click to Equip') + '</div>';
                        } else {
                            html += '<div class="shop-item-price">💰 ' + item.price + '</div>';
                        }
                    } else if (currentTab === 'powerups') {
                        var uses = game.ownedPowerups[item.id] || 0;
                        if (uses > 0) {
                            html += '<div class="shop-item-stats">' + uses + ' owned</div>';
                        }
                        html += '<div class="shop-item-price">💰 ' + item.price + '</div>';
                    }

                    html += '</div>';
                }

                $('shopGrid').innerHTML = html;

                var shopItems = $('shopGrid').querySelectorAll('.shop-item');
                for (var k = 0; k < shopItems.length; k++) {
                    shopItems[k].onclick = function() {
                        handleShopClick(this.getAttribute('data-id'));
                    };
                }
            }

            function handleShopClick(id) {
                var items = SHOP_ITEMS[currentTab];
                var item = null;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].id === id) { item = items[i]; break; }
                }
                if (!item) return;

                if (currentTab === 'skins') {
                    if (game.ownedSkins.indexOf(id) !== -1) {
                        game.selectedSkin = id;
                        showNotification('Equipped ' + item.name + '!', 'success');
                    } else if (game.coins >= item.price) {
                        game.coins -= item.price;
                        game.ownedSkins.push(id);
                        game.selectedSkin = id;
                        showNotification('Purchased ' + item.name + '!', 'success');
                        checkAchievements();
                    } else {
                        showNotification('Not enough coins!', 'warning');
                    }
                } else if (currentTab === 'powerups') {
                    if (game.coins >= item.price) {
                        game.coins -= item.price;
                        game.ownedPowerups[id] = (game.ownedPowerups[id] || 0) + item.uses;
                        showNotification('Purchased ' + item.name + '!', 'success');
                    } else {
                        showNotification('Not enough coins!', 'warning');
                    }
                } else if (currentTab === 'upgrades') {
                    var level = game.upgradeLevels[id] || 0;
                    if (level >= item.maxLevel) {
                        showNotification('Already maxed!', 'warning');
                        return;
                    }
                    var price = item.price * (level + 1);
                    if (game.coins >= price) {
                        game.coins -= price;
                        game.upgradeLevels[id] = level + 1;
                        showNotification(item.name + ' → Level ' + (level + 1) + '!', 'success');
                        checkAchievements();
                    } else {
                        showNotification('Not enough coins!', 'warning');
                    }
                }

                updateDisplays();
                generateShopGrid();
                saveProgress();
            }

            function setupShopTabs() {
                var tabs = document.querySelectorAll('.shop-tab');
                for (var i = 0; i < tabs.length; i++) {
                    tabs[i].onclick = function() {
                        for (var j = 0; j < tabs.length; j++) tabs[j].classList.remove('active');
                        this.classList.add('active');
                        currentTab = this.getAttribute('data-tab');
                        generateShopGrid();
                    };
                }
            }

            // ==================== GAME LOGIC ====================
            function startGame() {
                var world = WORLDS[game.currentWorld - 1];
                var isBoss = game.currentLevel === world.levels;

                // Apply upgrades
                var startLen = getStartLength();
                game.speed = getSpeed();

                game.snake = [];
                for (var i = 0; i < startLen; i++) {
                    game.snake.push({ x: 10 - i, y: 10 });
                }

                game.direction = { x: 1, y: 0 };
                game.nextDirection = { x: 1, y: 0 };
                game.score = 0;
                game.foodEaten = 0;
                game.combo = 1;
                game.maxCombo = 1;
                game.lastEatTime = 0;
                game.isPlaying = true;
                game.isPaused = false;
                game.enemies = [];
                game.enemyProjectiles = [];
                game.specialItems = [];
                game.bossProjectiles = [];
                game.perfectRun = true;
                game.lives = 1 + (game.activeConsumables.extra_life ? 1 : 0);

                game.powerUps = { shield: false, magnet: false, doublePoints: false };
                game.powerUpTimers = {};
                game.powerUpDurations = {};

                // Apply consumables
                if (game.ownedPowerups.shield_pack > 0) {
                    game.ownedPowerups.shield_pack--;
                    activatePowerUp('shield', 10000);
                }
                if (game.ownedPowerups.magnet_pack > 0) {
                    game.ownedPowerups.magnet_pack--;
                    activatePowerUp('magnet', 10000);
                }
                if (game.ownedPowerups.double_coin > 0) {
                    game.ownedPowerups.double_coin--;
                    game.activeConsumables.double_coin = true;
                }
                if (game.ownedPowerups.extra_life > 0) {
                    game.ownedPowerups.extra_life--;
                    game.lives++;
                }
                if (game.ownedPowerups.head_start > 0) {
                    game.ownedPowerups.head_start--;
                    // Already applied in getStartLength
                }

                // Clear timers
                if (game.gameLoopId) clearInterval(game.gameLoopId);
                if (game.itemTimerId) clearInterval(game.itemTimerId);
                if (game.enemyTimerId) clearInterval(game.enemyTimerId);
                for (var key in game.powerUpTimers) clearInterval(game.powerUpTimers[key]);

                // Obstacles
                game.obstacles = [];
                var obsCount = Math.min(12, game.currentWorld * 2 + game.currentLevel);
                for (var j = 0; j < obsCount; j++) {
                    game.obstacles.push(getRandomPos());
                }

                // Boss
                if (isBoss) {
                    game.bossActive = true;
                    game.bossHealth = world.bossHP;
                    game.bossMaxHealth = world.bossHP;
                    game.bossPhase = 1;
                    game.boss = { x: CONFIG.GRID_SIZE / 2 - 2, y: 2, width: 4, height: 2 };
                    $('bossContainer').classList.add('active');
                    $('bossName').textContent = world.bossName;
                    $('bossHealthFill').style.width = '100%';
                    $('bossPhase').textContent = 'Phase 1';
                } else {
                    game.bossActive = false;
                    game.boss = null;
                    $('bossContainer').classList.remove('active');
                }

                spawnFood();

                $('levelBadge').textContent = game.currentWorld + '-' + game.currentLevel;
                $('worldName').textContent = world.name;
                showScreen(null);
                updateDisplays();
                updateProgress();
                updatePowerUpIndicator();

                game.stats.gamesPlayed++;
                checkAchievements();
                saveProgress();

                game.gameLoopId = setInterval(gameLoop, game.speed);
                game.itemTimerId = setInterval(spawnItem, 4000);
                if (!isBoss) game.enemyTimerId = setInterval(spawnEnemy, 3500);
            }

            function stopGame() {
                game.isPlaying = false;
                game.isPaused = false;
                if (game.gameLoopId) clearInterval(game.gameLoopId);
                if (game.itemTimerId) clearInterval(game.itemTimerId);
                if (game.enemyTimerId) clearInterval(game.enemyTimerId);
                game.gameLoopId = null;
                game.itemTimerId = null;
                game.enemyTimerId = null;
                game.activeConsumables = {};
            }

            function pauseGame() {
                if (!game.isPlaying || game.isPaused) return;
                game.isPaused = true;
                clearInterval(game.gameLoopId);
                showScreen('pauseScreen');
            }

            function resumeGame() {
                if (!game.isPaused) return;
                game.isPaused = false;
                showScreen(null);
                game.gameLoopId = setInterval(gameLoop, game.speed);
            }

            function gameLoop() {
                update();
                draw();
            }

            function update() {
                game.direction = { x: game.nextDirection.x, y: game.nextDirection.y };

                var head = {
                    x: game.snake[0].x + game.direction.x,
                    y: game.snake[0].y + game.direction.y
                };

                // Walls
                if (head.x < 0 || head.x >= CONFIG.GRID_SIZE || head.y < 0 || head.y >= CONFIG.GRID_SIZE) {
                    handleDeath(); return;
                }

                // Collisions
                if (!game.powerUps.shield) {
                    for (var i = 0; i < game.snake.length; i++) {
                        if (head.x === game.snake[i].x && head.y === game.snake[i].y) {
                            handleDeath(); return;
                        }
                    }
                    for (var j = 0; j < game.obstacles.length; j++) {
                        if (head.x === game.obstacles[j].x && head.y === game.obstacles[j].y) {
                            handleDeath(); return;
                        }
                    }
                    for (var k = 0; k < game.enemies.length; k++) {
                        var e = game.enemies[k];
                        if (Math.floor(e.x) === head.x && Math.floor(e.y) === head.y) {
                            handleDeath(); return;
                        }
                    }
                    for (var l = 0; l < game.enemyProjectiles.length; l++) {
                        var ep = game.enemyProjectiles[l];
                        if (Math.floor(ep.x) === head.x && Math.floor(ep.y) === head.y) {
                            handleDeath(); return;
                        }
                    }
                    for (var m = 0; m < game.bossProjectiles.length; m++) {
                        var bp = game.bossProjectiles[m];
                        if (Math.floor(bp.x) === head.x && Math.floor(bp.y) === head.y) {
                            handleDeath(); return;
                        }
                    }
                }

                game.snake.unshift(head);

                // Food
                var ate = false;
                if (game.food && head.x === game.food.x && head.y === game.food.y) {
                    ate = true;
                    eatFood();
                }

                // Magnet
                if (game.powerUps.magnet && game.food) {
                    var dx = head.x - game.food.x;
                    var dy = head.y - game.food.y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 5 && dist > 0) {
                        game.food.x = Math.round(game.food.x + Math.sign(dx) * 0.3);
                        game.food.y = Math.round(game.food.y + Math.sign(dy) * 0.3);
                    }
                }

                if (!ate) game.snake.pop();

                // Track max length
                if (game.snake.length > game.stats.maxLength) {
                    game.stats.maxLength = game.snake.length;
                }

                // Items
                for (var n = game.specialItems.length - 1; n >= 0; n--) {
                    var item = game.specialItems[n];
                    if (head.x === item.x && head.y === item.y) {
                        collectItem(item);
                        game.specialItems.splice(n, 1);
                    }
                }

                updateEnemies();
                if (game.bossActive) updateBoss();
                updateProgress();

                // Win check
                if (!game.bossActive && game.foodEaten >= getGoal()) {
                    levelComplete();
                }
            }

            function handleDeath() {
                game.lives--;
                game.perfectRun = false;
                screenShake();
                createParticles(game.snake[0].x * cellSize + cellSize / 2, game.snake[0].y * cellSize + cellSize / 2, '#ff0000', 12);

                if (game.lives > 0) {
                    showNotification('Life lost! ' + game.lives + ' remaining', 'warning');
                    activatePowerUp('shield', 3000);
                } else {
                    gameOver();
                }
            }

            function eatFood() {
                // Combo
                var now = Date.now();
                var comboTime = getComboTime();
                if (now - game.lastEatTime < comboTime) {
                    game.combo++;
                    if (game.combo > game.maxCombo) game.maxCombo = game.combo;
                    if (game.maxCombo > game.stats.bestCombo) game.stats.bestCombo = game.maxCombo;

                    if (game.combo % 5 === 0) {
                        $('comboPopup').textContent = 'COMBO x' + game.combo + '!';
                        $('comboPopup').classList.add('active');
                        setTimeout(function() { $('comboPopup').classList.remove('active'); }, 1000);
                    }
                } else {
                    game.combo = 1;
                }
                game.lastEatTime = now;

                var pts = Math.floor((game.food.points || 10) * getScoreMultiplier());
                game.score += pts;
                game.foodEaten++;
                game.stats.totalFood++;

                if (Math.random() < 0.3) {
                    var coinAmt = Math.floor((5 + game.currentWorld) * getCoinMultiplier());
                    game.coins += coinAmt;
                    game.stats.totalCoins += coinAmt;
                }

                createParticles(game.food.x * cellSize + cellSize / 2, game.food.y * cellSize + cellSize / 2, '#00ff88', 6);
                spawnFood();
                updateDisplays();
                checkAchievements();
            }

            function collectItem(item) {
                createParticles(item.x * cellSize + cellSize / 2, item.y * cellSize + cellSize / 2, item.color || '#ffd700', 8);

                if (item.type === 'star') {
                    var pts = Math.floor(50 * getScoreMultiplier());
                    game.score += pts;
                    showNotification('+' + pts + ' bonus!', 'success');
                } else if (item.type === 'diamond') {
                    var coins = Math.floor(100 * getCoinMultiplier());
                    game.coins += coins;
                    game.stats.totalCoins += coins;
                    showNotification('+' + coins + ' 💰', 'success');
                } else if (item.type === 'crown') {
                    var coins2 = Math.floor(200 * getCoinMultiplier());
                    game.coins += coins2;
                    game.stats.totalCoins += coins2;
                    showNotification('+' + coins2 + ' 💰 👑', 'legendary');
                } else if (item.type === 'heart') {
                    game.lives++;
                    showNotification('Extra Life! ❤️', 'success');
                } else if (item.type === 'shield') {
                    activatePowerUp('shield', 8000);
                } else if (item.type === 'magnet') {
                    activatePowerUp('magnet', 10000);
                } else if (item.type === 'double') {
                    activatePowerUp('doublePoints', 12000);
                } else if (item.type === 'bossDamage' && game.bossActive) {
                    damageBoss(25);
                }

                updateDisplays();
                checkAchievements();
            }

            function activatePowerUp(type, duration) {
                game.powerUps[type] = true;
                game.powerUpDurations[type] = 100;

                var names = { shield: 'Shield', magnet: 'Magnet', doublePoints: '2x Points' };
                showNotification(names[type] + ' active!', 'success');

                if (game.powerUpTimers[type]) clearInterval(game.powerUpTimers[type]);

                var start = Date.now();
                game.powerUpTimers[type] = setInterval(function() {
                    var elapsed = Date.now() - start;
                    var remaining = Math.max(0, 100 - (elapsed / duration) * 100);
                    game.powerUpDurations[type] = remaining;
                    updatePowerUpIndicator();

                    if (remaining <= 0) {
                        clearInterval(game.powerUpTimers[type]);
                        game.powerUps[type] = false;
                        updatePowerUpIndicator();
                    }
                }, 100);
            }

            function updateEnemies() {
                var newProj = [];

                for (var i = 0; i < game.enemies.length; i++) {
                    var en = game.enemies[i];
                    var type = ENEMY_TYPES[en.type];

                    en.timer = (en.timer || 0) + 1;
                    if (en.timer >= Math.floor(10 / type.speed)) {
                        en.timer = 0;

                        if (type.behavior === 'random') {
                            en.x += (Math.random() - 0.5) * 2;
                            en.y += (Math.random() - 0.5) * 2;
                        } else if (type.behavior === 'chase') {
                            en.x += Math.sign(game.snake[0].x - en.x);
                            en.y += Math.sign(game.snake[0].y - en.y);
                        } else if (type.behavior === 'erratic') {
                            en.x += (Math.random() - 0.5) * 3;
                            en.y += (Math.random() - 0.5) * 3;
                        } else if (type.behavior === 'shoot' && Math.random() < 0.1) {
                            var angle = Math.atan2(game.snake[0].y - en.y, game.snake[0].x - en.x);
                            game.enemyProjectiles.push({ x: en.x, y: en.y, vx: Math.cos(angle) * 0.3, vy: Math.sin(angle) * 0.3 });
                        } else if (type.behavior === 'swoop') {
                            en.x += en.vx || 1;
                            if (en.x < 0 || en.x >= CONFIG.GRID_SIZE) en.vx = -(en.vx || 1);
                        }
                    }

                    en.x = Math.max(0, Math.min(CONFIG.GRID_SIZE - 1, en.x));
                    en.y = Math.max(0, Math.min(CONFIG.GRID_SIZE - 1, en.y));
                }

                for (var j = 0; j < game.enemyProjectiles.length; j++) {
                    var p = game.enemyProjectiles[j];
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x >= 0 && p.x < CONFIG.GRID_SIZE && p.y >= 0 && p.y < CONFIG.GRID_SIZE) {
                        newProj.push(p);
                    }
                }
                game.enemyProjectiles = newProj;
            }

            function updateBoss() {
                game.boss.x += Math.sin(Date.now() / 500) * 0.08;
                game.boss.x = Math.max(0, Math.min(CONFIG.GRID_SIZE - game.boss.width, game.boss.x));

                var attackChance = 0.02 + game.bossPhase * 0.01;
                if (Math.random() < attackChance) {
                    for (var i = -game.bossPhase + 1; i < game.bossPhase; i++) {
                        game.bossProjectiles.push({
                            x: game.boss.x + game.boss.width / 2,
                            y: game.boss.y + game.boss.height,
                            vx: i * 0.15,
                            vy: 0.25
                        });
                    }
                }

                var newProj = [];
                for (var j = 0; j < game.bossProjectiles.length; j++) {
                    var p = game.bossProjectiles[j];
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.y < CONFIG.GRID_SIZE && p.x >= 0 && p.x < CONFIG.GRID_SIZE) newProj.push(p);
                }
                game.bossProjectiles = newProj;

                var hp = (game.bossHealth / game.bossMaxHealth) * 100;
                $('bossHealthFill').style.width = hp + '%';

                if (hp < 30 && game.bossPhase < 3) {
                    game.bossPhase = 3;
                    $('bossPhase').textContent = 'Phase 3 - ENRAGED!';
                } else if (hp < 60 && game.bossPhase < 2) {
                    game.bossPhase = 2;
                    $('bossPhase').textContent = 'Phase 2';
                }
            }

            function damageBoss(dmg) {
                game.bossHealth -= dmg;
                screenShake();
                createParticles(game.boss.x * cellSize + cellSize * 2, game.boss.y * cellSize + cellSize, '#ff6b6b', 10);
                showNotification('Boss -' + dmg + ' HP!', 'warning');

                if (game.bossHealth <= 0) bossDefeated();
            }

            function bossDefeated() {
                game.bossActive = false;
                game.boss = null;
                game.bossProjectiles = [];
                $('bossContainer').classList.remove('active');

                var world = WORLDS[game.currentWorld - 1];
                $('defeatedBossName').textContent = world.bossName + ' Defeated!';

                var reward = 750 + game.currentWorld * 100;
                game.coins += Math.floor(reward * getCoinMultiplier());
                game.stats.totalCoins += Math.floor(reward * getCoinMultiplier());
                game.stats.bossesDefeated++;

                if (game.currentWorld >= game.unlockedWorld && game.currentWorld < WORLDS.length) {
                    game.unlockedWorld = game.currentWorld + 1;
                }

                updateDisplays();
                stopGame();
                checkAchievements();
                saveProgress();
                showScreen('bossDefeatedScreen');
            }

            function spawnFood() {
                var foods = [
                    { icon: '🍎', points: 10, weight: 60 },
                    { icon: '🍊', points: 20, weight: 25 },
                    { icon: '🍇', points: 30, weight: 15 }
                ];
                var total = 0;
                for (var i = 0; i < foods.length; i++) total += foods[i].weight;
                var r = Math.random() * total;
                var cum = 0;
                var food = foods[0];
                for (var j = 0; j < foods.length; j++) {
                    cum += foods[j].weight;
                    if (r < cum) { food = foods[j]; break; }
                }
                var pos = getRandomPos();
                game.food = { x: pos.x, y: pos.y, icon: food.icon, points: food.points };
            }

            function spawnItem() {
                if (!game.isPlaying || game.isPaused || game.specialItems.length >= 3) return;

                var items = [
                    { type: 'star', icon: '⭐', color: '#ffd700', weight: 25 },
                    { type: 'diamond', icon: '💎', color: '#00aaff', weight: 15 },
                    { type: 'shield', icon: '🛡️', color: '#00ff88', weight: 15 },
                    { type: 'magnet', icon: '🧲', color: '#ff69b4', weight: 10 },
                    { type: 'double', icon: '🔥', color: '#ff6b6b', weight: 12 },
                    { type: 'heart', icon: '❤️', color: '#ff0000', weight: 5 },
                    { type: 'crown', icon: '👑', color: '#ffd700', weight: 2 }
                ];

                if (game.bossActive) {
                    items.push({ type: 'bossDamage', icon: '💥', color: '#ff0000', weight: 30 });
                    items.push({ type: 'bossDamage', icon: '💥', color: '#ff0000', weight: 30 });
                }

                var total = 0;
                for (var i = 0; i < items.length; i++) total += items[i].weight;
                var r = Math.random() * total;
                var cum = 0;
                var item = items[0];
                for (var j = 0; j < items.length; j++) {
                    cum += items[j].weight;
                    if (r < cum) { item = items[j]; break; }
                }

                var pos = getRandomPos();
                game.specialItems.push({ x: pos.x, y: pos.y, type: item.type, icon: item.icon, color: item.color });
            }

            function spawnEnemy() {
                if (!game.isPlaying || game.isPaused || game.enemies.length >= 4 + game.currentWorld) return;
                var world = WORLDS[game.currentWorld - 1];
                var types = world.enemies;
                var type = types[Math.floor(Math.random() * types.length)];
                var pos = null;
                for (var tries = 0; tries < 20; tries++) {
                    var candidate = getRandomPos();
                    if (isEnemySpawnSafe(candidate)) {
                        pos = candidate;
                        break;
                    }
                }
                if (!pos) return;
                game.enemies.push({ x: pos.x, y: pos.y, type: type, timer: 0, vx: Math.random() < 0.5 ? 1 : -1 });
            }

            function isEnemySpawnSafe(pos) {
                var head = game.snake[0];
                if (!head) return true;

                var dx = pos.x - head.x;
                var dy = pos.y - head.y;
                var dir = game.direction;
                var forwardRange = 7;
                var laneWidth = 1;

                if (dir.x !== 0) {
                    var aheadX = dx * dir.x;
                    if (aheadX > 0 && aheadX <= forwardRange && Math.abs(dy) <= laneWidth) return false;
                } else if (dir.y !== 0) {
                    var aheadY = dy * dir.y;
                    if (aheadY > 0 && aheadY <= forwardRange && Math.abs(dx) <= laneWidth) return false;
                }

                return true;
            }

            function getRandomPos() {
                var pos, attempts = 0;
                do {
                    pos = { x: Math.floor(Math.random() * CONFIG.GRID_SIZE), y: Math.floor(Math.random() * CONFIG.GRID_SIZE) };
                    attempts++;
                } while (!isPosValid(pos) && attempts < 100);
                return pos;
            }

            function isPosValid(pos) {
                for (var i = 0; i < game.snake.length; i++) {
                    if (pos.x === game.snake[i].x && pos.y === game.snake[i].y) return false;
                }
                for (var j = 0; j < game.obstacles.length; j++) {
                    if (pos.x === game.obstacles[j].x && pos.y === game.obstacles[j].y) return false;
                }
                if (game.boss && pos.x >= game.boss.x - 1 && pos.x <= game.boss.x + game.boss.width + 1 && pos.y <= game.boss.y + game.boss.height + 3) return false;
                var head = game.snake[0];
                if (head && Math.abs(pos.x - head.x) < 3 && Math.abs(pos.y - head.y) < 3) return false;
                return true;
            }

            function gameOver() {
                stopGame();

                if (game.score > game.stats.highScore) {
                    game.stats.highScore = game.score;
                    $('newRecordBadge').style.display = 'block';
                } else {
                    $('newRecordBadge').style.display = 'none';
                }

                var earned = Math.floor((game.score / 10 + game.foodEaten * 2) * getCoinMultiplier());
                game.coins += earned;
                game.stats.totalCoins += earned;

                $('finalScore').textContent = game.score;
                $('finalCombo').textContent = game.maxCombo;
                $('coinsEarned').textContent = earned;

                updateDisplays();
                checkAchievements();
                saveProgress();
                showScreen('gameOverScreen');
            }

            function levelComplete() {
                stopGame();

                var stars = 1;
                if (game.maxCombo >= 5) stars = 2;
                if (game.maxCombo >= 10 && game.snake.length >= 15) stars = 3;

                if (game.perfectRun) {
                    game.stats.perfectLevels++;
                }

                var bonus = Math.floor((stars * 75 + game.score) * getCoinMultiplier());
                game.coins += bonus;
                game.stats.totalCoins += bonus;

                var key = game.currentWorld + '-' + game.currentLevel;
                var oldStars = game.levelProgress[key + '_stars'] || 0;
                if (stars > oldStars) game.levelProgress[key + '_stars'] = stars;

                if (game.currentLevel < WORLDS[game.currentWorld - 1].levels) {
                    game.levelProgress[game.currentWorld] = Math.max(game.levelProgress[game.currentWorld] || 1, game.currentLevel + 1);
                }

                $('levelStars').textContent = getStarDisplay(stars);
                $('levelScore').textContent = game.score;
                $('levelBonus').textContent = bonus;

                updateDisplays();
                checkAchievements();
                saveProgress();
                showScreen('levelCompleteScreen');
            }

            function nextLevel() {
                var world = WORLDS[game.currentWorld - 1];
                if (game.currentLevel >= world.levels) {
                    if (game.currentWorld < game.unlockedWorld) {
                        game.currentWorld++;
                        game.currentLevel = 1;
                        startGame();
                    } else {
                        showScreen('menuScreen');
                    }
                } else {
                    game.currentLevel++;
                    startGame();
                }
            }

            // ==================== DRAWING ====================
            function draw() {
                var world = WORLDS[game.currentWorld - 1];

                ctx.fillStyle = world.bgColor;
                ctx.fillRect(0, 0, CONFIG.CANVAS_SIZE, CONFIG.CANVAS_SIZE);

                // Grid
                ctx.strokeStyle = 'rgba(255,255,255,0.03)';
                for (var i = 0; i <= CONFIG.GRID_SIZE; i++) {
                    ctx.beginPath();
                    ctx.moveTo(i * cellSize, 0);
                    ctx.lineTo(i * cellSize, CONFIG.CANVAS_SIZE);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(0, i * cellSize);
                    ctx.lineTo(CONFIG.CANVAS_SIZE, i * cellSize);
                    ctx.stroke();
                }

                // Obstacles
                ctx.fillStyle = 'rgba(100,100,120,0.8)';
                for (var j = 0; j < game.obstacles.length; j++) {
                    var o = game.obstacles[j];
                    ctx.fillRect(o.x * cellSize + 2, o.y * cellSize + 2, cellSize - 4, cellSize - 4);
                }

                // Boss
                if (game.boss) {
                    ctx.shadowColor = '#ff6b6b';
                    ctx.shadowBlur = 15;
                    ctx.fillStyle = '#ff6b6b';
                    ctx.fillRect(game.boss.x * cellSize, game.boss.y * cellSize, game.boss.width * cellSize, game.boss.height * cellSize);
                    ctx.shadowBlur = 0;
                    ctx.font = (cellSize * 2) + 'px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('👹', game.boss.x * cellSize + game.boss.width * cellSize / 2, game.boss.y * cellSize + game.boss.height * cellSize / 2);
                }

                // Boss projectiles
                ctx.fillStyle = '#ff4444';
                for (var bp = 0; bp < game.bossProjectiles.length; bp++) {
                    var bpr = game.bossProjectiles[bp];
                    ctx.beginPath();
                    ctx.arc(bpr.x * cellSize + cellSize / 2, bpr.y * cellSize + cellSize / 2, cellSize / 3, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Enemies
                for (var e = 0; e < game.enemies.length; e++) {
                    var en = game.enemies[e];
                    var et = ENEMY_TYPES[en.type];
                    ctx.font = (cellSize - 2) + 'px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(et.icon, en.x * cellSize + cellSize / 2, en.y * cellSize + cellSize / 2);
                }

                // Enemy projectiles
                ctx.fillStyle = '#ff69b4';
                for (var ep = 0; ep < game.enemyProjectiles.length; ep++) {
                    var epr = game.enemyProjectiles[ep];
                    ctx.beginPath();
                    ctx.arc(epr.x * cellSize + cellSize / 2, epr.y * cellSize + cellSize / 2, cellSize / 4, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Food
                if (game.food) {
                    ctx.font = (cellSize - 2) + 'px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(game.food.icon, game.food.x * cellSize + cellSize / 2, game.food.y * cellSize + cellSize / 2);
                }

                // Special items
                for (var s = 0; s < game.specialItems.length; s++) {
                    var si = game.specialItems[s];
                    ctx.shadowColor = si.color;
                    ctx.shadowBlur = 8;
                    ctx.font = (cellSize - 2) + 'px Arial';
                    ctx.fillText(si.icon, si.x * cellSize + cellSize / 2, si.y * cellSize + cellSize / 2);
                    ctx.shadowBlur = 0;
                }

                // Snake
                for (var k = 0; k < game.snake.length; k++) {
                    var seg = game.snake[k];
                    var x = seg.x * cellSize;
                    var y = seg.y * cellSize;
                    var isHead = k === 0;

                    var color = getSnakeColor(k);

                    if (game.powerUps.shield) {
                        ctx.shadowColor = '#00ff88';
                        ctx.shadowBlur = 12;
                    }

                    ctx.fillStyle = color;
                    ctx.globalAlpha = 1 - (k / game.snake.length) * 0.4;

                    var r = isHead ? 8 : 5;
                    ctx.beginPath();
                    ctx.moveTo(x + 2 + r, y + 2);
                    ctx.lineTo(x + cellSize - 2 - r, y + 2);
                    ctx.quadraticCurveTo(x + cellSize - 2, y + 2, x + cellSize - 2, y + 2 + r);
                    ctx.lineTo(x + cellSize - 2, y + cellSize - 2 - r);
                    ctx.quadraticCurveTo(x + cellSize - 2, y + cellSize - 2, x + cellSize - 2 - r, y + cellSize - 2);
                    ctx.lineTo(x + 2 + r, y + cellSize - 2);
                    ctx.quadraticCurveTo(x + 2, y + cellSize - 2, x + 2, y + cellSize - 2 - r);
                    ctx.lineTo(x + 2, y + 2 + r);
                    ctx.quadraticCurveTo(x + 2, y + 2, x + 2 + r, y + 2);
                    ctx.fill();

                    ctx.shadowBlur = 0;
                    ctx.globalAlpha = 1;

                    if (isHead) {
                        ctx.fillStyle = '#fff';
                        var ex1, ey1, ex2, ey2;
                        if (game.direction.x === 1) { ex1 = x + cellSize - 8; ey1 = y + 6; ex2 = x + cellSize - 8; ey2 = y + cellSize - 6; }
                        else if (game.direction.x === -1) { ex1 = x + 8; ey1 = y + 6; ex2 = x + 8; ey2 = y + cellSize - 6; }
                        else if (game.direction.y === -1) { ex1 = x + 6; ey1 = y + 8; ex2 = x + cellSize - 6; ey2 = y + 8; }
                        else { ex1 = x + 6; ey1 = y + cellSize - 8; ex2 = x + cellSize - 6; ey2 = y + cellSize - 8; }
                        ctx.beginPath();
                        ctx.arc(ex1, ey1, 3, 0, Math.PI * 2);
                        ctx.arc(ex2, ey2, 3, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            function getSnakeColor(idx) {
                var skin = getSkinData();
                if (!skin) return '#00ff88';
                if (skin.color === 'rainbow') {
                    var hue = (idx * 20 + Date.now() / 20) % 360;
                    return 'hsl(' + hue + ',100%,50%)';
                }
                return skin.color;
            }

            // ==================== EVENTS ====================
            document.addEventListener('keydown', function(e) {
                if (handleShortcut(e)) return;
                if (!game.isPlaying) return;
                var k = normalizeShortcutKey(e.key);
                if (k === 'arrowup' || k === 'w') { e.preventDefault(); if (game.direction.y !== 1) game.nextDirection = { x: 0, y: -1 }; }
                if (k === 'arrowdown' || k === 's') { e.preventDefault(); if (game.direction.y !== -1) game.nextDirection = { x: 0, y: 1 }; }
                if (k === 'arrowleft' || k === 'a') { e.preventDefault(); if (game.direction.x !== 1) game.nextDirection = { x: -1, y: 0 }; }
                if (k === 'arrowright' || k === 'd') { e.preventDefault(); if (game.direction.x !== -1) game.nextDirection = { x: 1, y: 0 }; }
                if (k === ' ') { e.preventDefault(); game.isPaused ? resumeGame() : pauseGame(); }
            });

            $('upBtn').onclick = function() { if (game.isPlaying && game.direction.y !== 1) game.nextDirection = { x: 0, y: -1 }; };
            $('downBtn').onclick = function() { if (game.isPlaying && game.direction.y !== -1) game.nextDirection = { x: 0, y: 1 }; };
            $('leftBtn').onclick = function() { if (game.isPlaying && game.direction.x !== 1) game.nextDirection = { x: -1, y: 0 }; };
            $('rightBtn').onclick = function() { if (game.isPlaying && game.direction.x !== -1) game.nextDirection = { x: 1, y: 0 }; };

            $('startGameBtn').onclick = function() { game.currentWorld = 1; game.currentLevel = 1; startGame(); };
            $('selectLevelBtn').onclick = function() { generateWorldTabs(); generateLevelGrid(); showScreen('levelScreen'); };
            $('openShopBtn').onclick = function() { generateShopGrid(); showScreen('shopScreen'); };
            $('moreOptionsBtn').onclick = function() { showScreen('moreScreen'); };
            $('achievementsBtn').onclick = function() { generateAchievementsGrid(); showScreen('achievementsScreen'); };
            $('statsBtn').onclick = function() { generateStatsGrid(); showScreen('statsScreen'); };
            $('helpBtn').onclick = function() { showScreen('helpScreen'); };
            $('toggleShortcutHintsBtn').onclick = function() {
                uiSettings.shortcutHintsEnabled = !uiSettings.shortcutHintsEnabled;
                saveUISettings();
                applyShortcutHintsVisibility();
            };

            $('levelBackBtn').onclick = function() { showScreen('menuScreen'); };
            $('shopBackBtn').onclick = function() { showScreen('menuScreen'); };
            $('moreBackBtn').onclick = function() { showScreen('menuScreen'); };
            $('achieveBackBtn').onclick = function() { showScreen('moreScreen'); };
            $('statsBackBtn').onclick = function() { showScreen('moreScreen'); };
            $('helpBackBtn').onclick = function() { showScreen('moreScreen'); };

            $('pauseBtn').onclick = pauseGame;
            $('menuBtn').onclick = function() { stopGame(); showScreen('menuScreen'); };
            $('shopBtn').onclick = function() { pauseGame(); generateShopGrid(); showScreen('shopScreen'); };
            $('achieveBtn').onclick = function() { pauseGame(); generateAchievementsGrid(); showScreen('achievementsScreen'); };

            $('tryAgainBtn').onclick = startGame;
            $('gameOverMenuBtn').onclick = function() { showScreen('menuScreen'); };
            $('nextLevelBtn').onclick = nextLevel;
            $('levelCompleteMenuBtn').onclick = function() { showScreen('menuScreen'); };
            $('continueBtn').onclick = nextLevel;
            $('resumeBtn').onclick = resumeGame;
            $('restartBtn').onclick = function() { showScreen(null); startGame(); };
            $('pauseMenuBtn').onclick = function() { stopGame(); showScreen('menuScreen'); };

            setupShopTabs();
            loadUISettings();
            loadProgress();
            updateDisplays();
            generateWorldTabs();
            generateLevelGrid();
            generateShopGrid();
            generateAchievementsGrid();
            applyShortcutHints();
            applyShortcutHintsVisibility();
            window.addEventListener('beforeunload', saveProgress);

            ctx.fillStyle = '#0a0a15';
            ctx.fillRect(0, 0, CONFIG.CANVAS_SIZE, CONFIG.CANVAS_SIZE);
            ctx.fillStyle = '#00ff88';
            ctx.font = '24px Segoe UI';
            ctx.textAlign = 'center';
            ctx.fillText('🐍 Ultimate Snake 🐍', CONFIG.CANVAS_SIZE / 2, CONFIG.CANVAS_SIZE / 2 - 15);
            ctx.font = '14px Segoe UI';
            ctx.fillStyle = '#888';
            ctx.fillText('Click Start Adventure!', CONFIG.CANVAS_SIZE / 2, CONFIG.CANVAS_SIZE / 2 + 15);

        })();
