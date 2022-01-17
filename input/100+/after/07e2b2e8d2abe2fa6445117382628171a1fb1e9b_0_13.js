function Game()
{
	//Tracked Data
	var score = 0;
	var enemyPoints = 0;
	var enemiesKilled = 0;
	var itemsUsed = 0;
	var totalCores = 0;
	var overNineThousand = false;
	
    this.gameLoop = null;
    var self = this;
    var gameState = 0;
    var levelStart = false;
    var keyPressed;
    var debug = false;
	var playerInfo = false;
	var FIRE_THE_LASER = false;
	
	//GUI Info
	var currentGui = 0;
	var lastGui = 0;
	var NULL_GUI_STATE = 8;// Should always be above current state limit
	//State GUIs
	// 0 = Main Menu
	// 1 = Pause Menu
	// 2 = Level Up Menu
	// 3 = Continue Menu
	// 4 = Level Up Menu
	// 5 = Game Over Menu
	// 6 = Options Menu
	// 7 = Submit Score Menu
	//Non-State Guis
	// Debug
	// Life & other ingame info(can't be on any state gui's)
    
	//Input Info
	var mouseX = 0;
	var mouseY = 0;
	
	//Options
	var particleOffset = 3;
	
    // Timing
    var prevTime = Date.now();
    var delta = 0;
    var elapsedTime = 0;
    var frame = 0;
    var FPS = 0;
    var tickTime = 0;
    var ticks = 1;
    var seconds = 0;
    var paused = false;

    // Context
    var _canvas = null;
    var _buffer = null;
    var canvas = null;
    var buffer = null;
    
    // Resources
        // Graphics
        var images = [];
        for(var i = 0; i < 11; i++)
        {
            images[i] = new Image();
            images[i].src = ('Graphics/GUI_0' + i + '.png');
        }
        
        var enemyImages = [];
        for(var i = 0; i < 16; i++)
        {
            enemyImages[i] = new Image();
            enemyImages[i].src = ('Graphics/ship_' + i + '.png');
        }
        
        var playerImages = [];
        for(var i = 0; i < 1; i++)
        {
            playerImages[i] = new Image();
            playerImages[i].src = ('Graphics/player_' + i + '.png');
        }
        
        var itemImages = [];
        for(var i = 0; i < 1; i++)
        {
            itemImages[i] = new Image();
            itemImages[i].src = ('Graphics/item_' + i + '.png')
        }

    // Containers
    var stars = [];
    var guiText = [];
    var missiles = [];
    var enemies = [];
    var explosions = [];
	var money = [];
	var randomItems = [];
    var keysDown = {};
    
	var NUM_OF_RANDOM_ITEMS = 4;
	//0 = Health
	//1 = Shield
	//2 = Secondary Ammo
	//3 = Cores
    
    // Scoring
    var destroys = 0;
	var totalDestroys = 0;
	var totalShots = 0;

    // Mechanics
    var shootSwap = false;
    var colSwap = true;
    var Keys = [0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0];
    
    // World
    var numStars = 100;
	var numEnemies = 0;

    /******************************************************/
    // Listeners
    /******************************************************/

    addEventListener("keydown", function(e)
    {
        keysDown[e.keyCode] = true;
        keyPressed = e.keyCode;
    }, false);

    addEventListener("keyup", function(e)
    {
        keysDown[e.keyCode] = false;
    }, false);
	
	addEventListener("mousemove", function(e){
        getMousePos(_canvas, e);
    }, false);
    
	addEventListener("click", doMouseClick, false);
    
    //Sound Event Listener	
	document.querySelector("#bgm_square").addEventListener("ended",swapBGM,false);
	document.querySelector("#bgm_fast").addEventListener("ended",swapBGM,false);
	document.querySelector("#bgm_soar").addEventListener("ended",swapBGM,false);
	document.querySelector("#bgm_dorian").addEventListener("ended",swapBGM,false);
    
    /******************************************************/
    
    
    /******************************************************/
    // Global Functions
    /******************************************************/

    this.InitSounds = function()
	{
		gco.bgm = document.getElementById('bgm_square');
		gco.init_audio();
		if(gco.bgm.canPlayType("audio/mp3") == "" ||  gco.bgm.canPlayType("audio/mp3") == "no") {
			sfx.soundType = 1;//Play OGG sound effects
		}
		sfx.Init();
	}
	
	this.RefreshSoundsOnGameLoss = function()
	{
		gco.bgm = document.getElementById('bgm_square');
		gco.init_audio();
	}
	
	this.isEnemyAlive = function(enemyNumber)
	{
		for(var i = 0; i < enemies.length; i++)
		{
			if(enemies[i].enemyNum == enemyNumber && enemies[i].life > 0)
			{
				return true;
			}
		}
		return false;
	}
	
	this.getEnemy = function(enemyNumber)
	{
		for(var i = 0; i < enemies.length; i++)
		{
			if(enemies[i].enemyNum == enemyNumber)
			{
				return enemies[i];
			}
		}
	}
   
    this.hardReset = function()
    {
        missiles = [];
		enemies = [];
		explosions = [];
		money = [];
		randomItems = [];
		totalDestroys = 0;
		destroys = 0;
        player.life = 100;
		player.resetShield();
		player.recharge = true;
		totalShots = 0;
        player = new Player(24, 40);
		gco.bgm.pause();
		gco = new GameControlObject();
		gco.Init();
		sfx.pause(1);
		self.RefreshSoundsOnGameLoss();
		enemyGeneration = new EnemyGeneration();
    }
	
	this.softReset = function()
	{
		missiles = [];
		enemies = [];
		explosions = [];
		money = [];
		randomItems = [];
		totalDestroys += destroys;
		destroys = 0;
        if(!player.isAlive()){player.life = 100;}
		initStars();
		totalShots += player.totalMissiles;
        player.totalMissiles = 0;
        player.x = _buffer.width / 2;
        player.y = _buffer.height / 2;
		gco.ResetFuel();
		gco.GoToUpgradeMenu();
		player.resetShield();
		sfx.pause(1);//Pause laser sound on round end
		enemyGeneration.hasBoss = false;
	}
    
    this.popArray = function(Array, popThis)
    {
        for(var i = popThis; i < Array.length - 1; i++)
        {
            Array[i] = Array[i + 1];
        }
        Array.pop();
    }
	
    /******************************************************/
    
    
    /******************************************************/
    // Objects
    /******************************************************/
	
	function GameControlObject()
	{
		this.level = 6;//Starting at 1
		this.win = false;
		this.enemiesKilled = [];//[enemyNum] = 126
		this.weaponsOwned = [];//[weaponNum] = true
		this.weaponPrice = [];//[weaponNum] = 486 (cores)
		this.ownLaser = false;
		this.laserPrice = 500;
		this.levelProgress = 0.0; // Percentage
		this.levelMission = new LevelMission();
		this.extras = [];
		this.extraPrices = [];
		//0 = shield
		//1 = fuel
		this.fuelLevel = 1;
		this.onTick = 0;
        this.missionText = [];
		this.secondaryAmmoPrice = 25;
		this.bgm = null;
		this.playingBossMusic = false;
		
		this.bossX = 0;//Final Boss X set when boss dies
		this.bossY = 0;//Final Boss Y set when boss dies
		
		this.credits = new Credits();
		
		this.Init = function()
		{
			this.levelMission.GenerateObjectives();
			
			this.weaponsOwned[0] = false;//Pea Shooter
			this.weaponsOwned[1] = false;//Pea Shooter Pro
			this.weaponsOwned[2] = false;//Master Pea Shooter
			this.weaponsOwned[50] = false;//Missile
			this.weaponsOwned[51] = false;//Homing Missile
            this.weaponsOwned[52] = false;//Space Mine
			
			this.weaponPrice[0] = 0;//Pea Shooter
			this.weaponPrice[1] = 25;//Pea Shooter Pro
			this.weaponPrice[2] = 250;//Master Pea Shooter
			this.weaponPrice[50] = 50;//Missile
			this.weaponPrice[51] = 100;//Homing Missile
            this.weaponPrice[52] = 250;//Space Mine
		}
		
		this.init_audio = function()
		{
			this.bgm.currentTime = 0;
			this.bgm.volume = 0.2;
			this.bgm.play();
		}
		
		this.CheckLevelCompletion = function()
		{
			if(this.levelMission.CheckCompletion())
			{
				this.level += 1;
				this.levelMission.ResetObjectives();
				player.life = 100;
				player.resetShield();
			}
		}
		
		this.PurchaseWeapon = function(wepID)
		{//assumes player has the cash/doesn't own weapon
			if(wepID < 9000)
			{
				this.weaponsOwned[wepID] = true;
				player.money -= this.weaponPrice[wepID];
				this.EquipWeapon(wepID);
			} else
			{
				this.ownLaser = true;
				player.money -= gco.laserPrice;
				this.EquipWeapon(wepID);
			}
		}
		
		this.EquipWeapon = function(wepID)
		{
			if(wepID > 48)
			{
				player.secondary = wepID;
			} else
			{
				player.weapon = wepID;
			}
		}
		
		this.PurchaseExtras = function(itemNumber)
		{
			switch(itemNumber)
			{
				case 0:
				{//Shield
					player.money -= (player.shieldLevel + 1) * 250;
					player.upgradeShield();
					break;
				}
				case 1:
				{//Fuel
					break;
				}
				case 2:
				{//Secondary Ammo Level
					player.money -= (player.secondaryAmmoLevel + 1) * 50;
					player.upgradeSecondaryAmmo();
					break;
				}
				case 3:
				{//Extra Secondary Ammo
					player.money -= this.secondaryAmmoPrice;
					player.secondaryAmmo += 25;
					if(player.secondaryAmmo > player.maxSecondaryAmmo){player.secondaryAmmo = player.maxSecondaryAmmo;}
					break;
				}
				case 4:
				{
					player.money -= ((100 - player.life) * 2);
					player.life = 100;
					break;
				}
			}
		}
		
		this.ResetFuel = function()
		{
			player.currentFuel = this.fuelLevel * 60;
		}
		
		this.GoToUpgradeMenu = function()
		{
			currentGui = 2;//Go to upgradeMenu
			gameState = 0;//Take game out of live mode
			playerInfo = false;
			this.levelProgress = this.levelMission.GetCompletionPercent();
			this.CheckLevelCompletion();
			sfx.pause(1);
		}
		
		this.StartLevel = function()
		{
			currentGui = NULL_GUI_STATE;//default case will Trigger
			gameState = 1;//Put Game in live mode
			if(this.level > 5 && !this.playingBossMusic)
			{
				this.playingBossMusic = true;
				this.bgm.pause();
				this.bgm = document.getElementById('bgm_boss');
				this.bgm.loop = true;
				this.init_audio();
			}
		}
		
		this.ShowContinueScreen = function()
		{
			player.lives -= 1;
			if(player.lives < 0)
			{
				currentGui = 5;//Game Over Gui
			} else
			{
				currentGui = 3;//Continue Screen
			}
		}
		
		this.TogglePauseGame = function()
		{
			paused = !paused;
		}
		
		this.Update = function()
		{
			if(this.onTick != ticks)
			{
				this.onTick = ticks;
				
				if(!gco.win)
				{
					if(this.onTick == 19 && player.isAlive() && this.level < 6)
					{//Update Fuel
						if(player.currentFuel == 0)
						{
							if(this.levelMission.CheckCompletion())
							{
								currentGui = 4;//Go to level up menu
								gameState = 0;
							} else
							{
								self.softReset();
								this.GoToUpgradeMenu();	
							}
						}
						player.currentFuel -= 1;
					}
				} else
				{
					if(Math.floor(Math.random() * 4) == 1)
					{
						this.RandomBossExplosion();
					}
				}
			}
		}
		
		this.RandomBossExplosion = function()
		{
			var randX = Math.floor(Math.random() * 51) - 25;
			var randY = Math.floor(Math.random() * 27) - 13;
			var R = Math.floor(Math.random() * 2);
			var G = Math.floor(Math.random() * 2);
			var B = Math.floor(Math.random() * 2);
			if(R == 1){R = 3} else {R = 0.1}; if(G == 1){G = 3} else {G = 0.1}; if(B == 1){B = 3} else {B = 0.1};
			explosion = new Explosion(this.bossX + randX, this.bossY + randY, 75, 4, 200, R, G, B);
			explosions.push(explosion);
		}
	}
	
	function swapBGM()
	{
		switch(Math.round(Math.random() * 4))
		{
			case 0:
			{
				gco.bgm = document.getElementById('bgm_square');
				break;	
			}
			case 1:
			{
				gco.bgm = document.getElementById('bgm_fast');
				break;	
			}
			case 2:
			{
				gco.bgm = document.getElementById('bgm_soar');
				break;
			}
			case 3:
			{
				gco.bgm = document.getElementById('bgm_dorian');
				break;
			}
			default:{}
		}
		gco.init_audio();
	}
	
	function SFXObject()
	{
		this.soundType = 0;//0 = mp3, 1 = ogg
		// Audio
		this.explosion = {}
		this.laser = 0;
		this.laserPlaying = false;
		this.bossLaser = 0;
		this.bossLaserPlaying = false;
		
		this.Init = function()
		{
		//Explosions
			this.explosion.index = 0; this.explosion.channel = []; this.explosion.channels = 10;
			for(var i = 0; i < this.explosion.channels; i++)
			{
				var a = null;
				if(this.soundType == 0){a = new Audio('Audio/Explode.mp3');} else {a = new Audio('Audio/Explode.ogg');}
				a.volume = 0.2;
				a.preload = 'auto';
				this.explosion.channel.push(a);
			}
		//Lasers
			if(this.soundType == 0){this.laser = new Audio('Audio/lasorz.mp3');} else {this.laser = new Audio('Audio/lasorz.ogg');}
			this.laser.volume = 0.5;
			this.laser.preload = 'auto';
			this.laser.loop = true;
			
			if(this.soundType == 0){this.bossLaser = new Audio('Audio/lasorz.mp3');} else {this.bossLaser = new Audio('Audio/lasorz.ogg');}
			this.bossLaser.volume = 0.5;
			this.bossLaser.preload = 'auto';
			this.bossLaser.loop = true;
		}
		
		this.play = function(playfx)
		{
			switch(playfx)
			{
				case 0: {//Explode
					this.explosion.channel[this.explosion.index].play();
					this.explosion.index += 1; if(this.explosion.index > (this.explosion.channels - 1)){this.explosion.index = 0;}
					break;
				}
				case 1: {//Laser
					this.laser.play();
					this.laserPlaying = true;
					break;
				}
				case 2: {//Boss Laser
					this.bossLaser.play();
					this.bossLaserPlaying = true;
					break;
				}
			}
		}
		
		this.pause = function(stopfx)
		{
			switch(stopfx)
			{
				case 0: {//Explode
					break;
				}
				case 1: {//Laser
					this.laser.pause();
					this.laserPlaying = false;
					break;
				}
				case 2: {//Boss Laser
					this.bossLaser.pause();
					this.bossLaserPlaying = false;
					break;
				}
			}
		}
	}
	
	function LevelMission()
	{
		this.objectives = [];
		this.progress = [];
		
		this.GenerateObjectives = function()
		{
			for(var i = 0; i < gco.level; i++)
			{//For each level, a new enemy type objective is placed on the mission stack.
				if(gco.level >= 6){ this.objectives.push(0); }
				else{ this.objectives.push(Math.floor(Math.random() * 25) + 35); }
				this.progress.push(0);
			}
		}
		
		this.UpdateProgress = function(enType)
		{
			this.progress[enType] += 1;
		}
		
		this.CheckCompletion = function()
		{//returns true if level is complete, else returns false
			if(gco.level < 6)
			{
				var completion = [];
				for(var i = 0; i < gco.level; i++)
				{
					if(this.progress[i] >= this.objectives[i])
					{
						//Awesome
					} else
					{
						return false;
					}
				}
				return true;
			} else
			{
				return false;
			}
		}
		
		this.GetCompletionPercent = function()
		{
			var total = 0; var kills = 0;
			for(var i = 0; i < gco.level; i++)
			{
				total += this.objectives[i];
				if(this.progress[i] > this.objectives[i]){kills += this.objectives[i];} else { kills += this.progress[i]; }
			}
			return (kills / total);
		}
		
		this.ResetObjectives = function()
		{
			this.objectives = [];
			this.progress = [];
			this.GenerateObjectives();
		}
	}
	
    function initStars()
    {
		stars = [];
        for(i = 0; i < numStars; i++)
        {
            var X = Math.floor(Math.random() * _buffer.width);
            var Y = Math.floor(Math.random() * _buffer.height);
            star = new Star(X, Y, 255, 255, 255);
            stars.push(star);
        }
    }
    
    function StarGeneration()
	{
		this.onTick = 0;
		this.generate = function()
		{
			if(ticks != this.onTick)
			{
				this.onTick = ticks;
                if(stars.length < numStars - 1)
                {
                    var X = Math.floor(Math.random() * _buffer.width);
                    star = new Star(X, 0);
                    stars.push(star);
                }
			}
		}
	}
    
    function Star(X, Y)
    {
        this.x = X;
        this.y = Y;
        
        this.Update = function()
        {
            this.y += 10 * delta;
            if(this.y > _canvas.height)
            {
                return 1;
            }
            return 0;
        }
    }

	function EnemyGeneration()
	{
		this.hasBoss = false;
		this.onTick = 0;
		this.generate = function(lev)
		{
            if(!this.hasBoss)
            {
                if(ticks != this.onTick)
                {
                    this.onTick = ticks;
                    //Random enemy spawning with random levels
                    for(var i = 0; i <= lev; i++)
                    {
                        var rand = Math.floor(Math.random() * 30);
                        if(rand == 10)
                        {
                            var theType = -1;
                            while(true)
                            {//logic to only generate 1 boss
                                theType = Math.round(Math.random() * (lev - 1));
                                if(gco.level > 5)
                                {
                                    if(theType == 5 && this.hasBoss)
                                    {
                                        continue;
                                    } else {
                                        break;
                                    }
                                } else {
                                    break;
                                }
                            }
                            var startingX = Math.floor(Math.random() * _buffer.width);
                            var theSpeed = 0;
                            var theDmg = 0;
                            var theLife = 0;
                            var Cores = 0;
                            var height = 0;
                            var width = 0;
                            var model = 0;
                            var points = 0;
                            switch(theType)
                            {
                                case 0:
                                {//Drones
                                    theLife = Math.round(Math.random() * 4) + 2;
                                    theSpeed = Math.round(Math.random() * 50) + 50;
                                    theDmg = Math.round(Math.random() * 5) + 5;
                                    Cores = Math.round(Math.random() * 2) + 1;
                                    if(theDmg > 7){model = 1; points = 2;} else {model = 0; points = 1;}
                                    width = 15;
                                    height = 25;
                                    break;
                                }
                                case 1:
                                {//Weavers
                                    theLife = Math.round(Math.random() * 10) + 7;
                                    theSpeed = Math.round(Math.random() * 50) + 50;
                                    theDmg = Math.round(Math.random() * 7) + 7;
                                    Cores = Math.round(Math.random() * 5) + 1;
                                    if(theDmg > 10){model = 3; points = 4;} else {model = 2; points = 3;}
                                    width = 31;
                                    height = 21;
                                    break;
                                }
                                case 2:
                                {//Kamakaze Ships
                                    theLife = Math.round(Math.random() * 15) + 10;
                                    theSpeed = Math.round(Math.random() * 100) + 100;
                                    theDmg = Math.round(Math.random() * 10) + 10;
                                    if(theDmg >= 16)
                                    {
                                        model = 5;
                                        theDmg = Math.round(Math.random() * 10) + 10;
                                        Cores = Math.round(Math.random() * 15) + 10;
                                        points = 6;
                                    }else 
                                    {
                                        points = 5;
                                        model = 4;
                                        theDmg = Math.round(Math.random() * 9) + 9;
                                        Cores = Math.round(Math.random() * 5) + 1;
                                    }
                                    width = 21;
                                    height = 31;
                                    break;
                                }
                                case 3:
                                {//Splitters
                                    theLife = Math.round(Math.random() * 20) + 20;
                                    theSpeed = Math.round(Math.random() * 35) + 35;
                                    theDmg = Math.round(Math.random() * 15) + 15;
                                    if(theDmg >= 23)
                                    {
                                        points = 8;
                                        model = 8;
                                        theDmg = Math.round(Math.random() * 17) + 17;
                                        Cores = Math.round(Math.random() * 30) + 20;
                                        width = 37;
                                        height = 31;
                                    }else 
                                    {
                                        points = 7;
                                        model = 6;
                                        Cores = Math.round(Math.random() * 25) + 10;
                                        width = 29;
                                        height = 30;
                                    }//Missiles 15 x 31
                                    break;
                                }
                                case 4:
                                {//Teleporters
                                    theLife = Math.round(Math.random() * 25) + 15;
                                    theSpeed = Math.round(Math.random() * 35) + 35;
                                    theDmg = Math.round(Math.random() * 17) + 17;
                                    if(theDmg >= 28)
                                    {
                                        points = 10;
                                        theLife = Math.round(Math.random() * 25) + 25;
                                        model = 11;
                                        Cores = Math.round(Math.random() * 30) + 20;
                                        width = 26;
                                        height = 21;
                                    }else 
                                    {
                                        points = 9;
                                        model = 10;
                                        Cores = Math.round(Math.random() * 25) + 10;
                                        width = 26;
                                        height = 21;
                                    }//Missiles 15 x 31
                                    break;
                                }
                                case 5:
                                {//Boss
                                    this.hasBoss = true;
                                    theLife = 500;
                                    theSpeed = 75;
                                    theDmg = 75;
                                    model = 14;
                                    points = 1000;
                                    Cores = 1000;
                                    width = 116;
                                    height = 72;
                                    break;
                                }
                            }
                            
                            enemy = new Enemy(theSpeed, theDmg, theLife, Cores, width, height, model, startingX, 0, theType, points);
                            enemies.push(enemy);
                        }
                    }
                }
            }
		}
	}
	
	function Enemy(spd, dmg, lfe, crs, wdth, hght, mdl, inX, inY, theType, pts)
    {
		numEnemies++;
		this.onTick = 0;
		this.enemyNum = numEnemies;
        
        // Position and movement
        this.x = inX;
        this.y = inY;
        this.speed = spd;
        this.waveLength = 0;
        this.moveVar = 0;
        this.xMoveSpeed = 0;
		this.momentum = 0;
		this.direction = 2;
		this.lastDirection = 2;//0 = left;
        this.tele = 0;
		this.xmove = 0;
        this.startX = this.x;
        this.startY = this.y;
		this.xstop = _buffer.width / 2;
        this.ystop = 0;
        this.readyForTeleport = false;
		this.teleportTimer = 2;
		this.didTeleport = false;
		this.points = pts;
		this.inCenter = false;
		this.moveLeft = false;
        
        this.width = wdth;
        this.height = hght;
		this.damage = dmg;
        this.life = lfe;
		this.type = theType;
		this.Cores = crs;
		this.Model = mdl;
		this.timeAlive = 0;
		this.startLife = this.life;
		this.canFire = [];
		this.isBoss = false;
		this.readyToShoot = false;
		this.shootTimer = 2;
		this.didShoot = false;
        this.phase = 0;
		this.phaseSave = 0;
        this.spawnEnemy = 0;
		this.shootTick = 0;
        this.moveX = 0;
		this.moveY = 0;
		this.doRealMovement = false;
		this.moveYSpeed = 25;
		this.foundCircle = false;
		this.circleYStop = 0;
		
		this.laserTimer = 0;
		this.laser = false;
		this.laserX = this.x;
		this.laserY = this.y + 25;
		this.laserWidth = 10;
		this.laserHeight = _canvas.height - this.y + 25;
		
		switch(this.type)
		{//Special Case Initialization
			case 2:
			{
				this.xMoveSpeed = Math.round(Math.random() * 25) + 25;
				if(this.x < player.x){this.direction = this.lastDirection = 1;} else if(this.x > player.x){this.direction = this.lastDirection = 0;} else {}
				break;	
			}
			case 4:
			{
				this.ystop = Math.round(Math.random() * 301) + 100;
				if(this.Model == 11)
				{
					for(var i = 0; i < 3; i++)
					{
						this.canFire.push(true);
					}
				} else
				{
					this.canFire.push(true);
				}
				break;
			}
			case 5:
			{
				this.ystop = 200;
				this.circleYStop = 165;
				this.xMoveSpeed = this.speed;
                this.waveLength = 100;
				this.isBoss = true;
                this.phase = -1;
                this.sinOffset = -1;
				break;
			}
			case 50:
			{
				this.xMoveSpeed = Math.round(Math.random() * 25) + 25;
				if(this.x < player.x){this.direction = this.lastDirection = 1;} else if(this.x > player.x){this.direction = this.lastDirection = 0;} else {}
				break;	
			}
		}

        this.Update = function()
        {
			this.timeAlive += delta;
			switch(this.type)
			{
				case 0:
				{//Drones
					this.y += this.speed * delta;
					if(this.life <= 0)
					{
						destroys += 1;
						explosion = new Explosion(this.x, this.y, 75, 4, 200, 0.1, 3, 0.1);
						explosions.push(explosion);
						//Update Mission Data
						gco.levelMission.UpdateProgress(this.type);
						return 1;
					}
					else if(this.y > _canvas.height)
					{
						return 1;
					}
					return 0;
				}
				case 1:
				{//Weavers
					this.y += this.speed * delta;
					this.x = this.startX + (30 * Math.sin(6 * 3.14 * 100 * (this.timeAlive / 1000)));
					
					if(Math.round(Math.random() * 1000) == 1)
					{
						this.shoot(100);
					}
					
					if(this.life <= 0)
					{
						destroys += 1;
						explosion = new Explosion(this.x, this.y, 75, 4, 200, 3, 3, 0.1);
						explosions.push(explosion);
						//Update Mission Data
						gco.levelMission.UpdateProgress(this.type);
						return 1;
					}
					else if(this.y > _canvas.height)
					{
						return 1;
					}
					return 0;
				}
				case 2:
				{//Kamakaze Ships
					if(this.x < player.x){this.direction = 1;} else if(this.x > player.x){this.direction = 0;} else {}
					if(this.direction != this.lastDirection){this.momentum = this.xMoveSpeed * 2; this.lastDirection = this.direction;}
					this.y += this.speed * delta;
					//Not-So-Friendly Boom Ship
					if(this.y < player.y)
					{
						if(this.x < player.x)
						{
							this.x += (this.xMoveSpeed - this.momentum) * delta;
						}
						else if(this.x > player.x)
						{
							this.x -= (this.xMoveSpeed - this.momentum) * delta;
						} else { }
						this.momentum -= delta * 100;
						if(this.momentum < 0){this.momentum = 0;}
					}
					if(this.Model == 5)
					{
						if(Math.round(Math.random() * 500) == 1)
						{
							this.shoot(100);
						}
					} else{}
					if(this.life <= 0)
					{
						destroys += 1;
						explosion = new Explosion(this.x, this.y, 75, 4, 200, 3, 0.1, 0.1);
						explosions.push(explosion);
						//Update Mission Data
						gco.levelMission.UpdateProgress(this.type);
						return 1;
					}
					else if(this.y > _canvas.height)
					{
						return 1;
					}
					return 0;
				}
				case 3:
				{//Splitters
					this.y += this.speed * delta;
					if(this.Model == 6)
					{//Normal Ship
						if(Math.round(Math.random() * 500) == 1){ this.shoot(100); }
						if(this.life <= 0)
						{
							destroys += 1;
							explosion = new Explosion(this.x, this.y, 75, 4, 200, 3, 0.1, 0.1);
							explosions.push(explosion);
							//Update Mission Data
							gco.levelMission.UpdateProgress(this.type);
							for(var i = 0; i < 2; i++)
							{
								var xStart = Math.round(Math.random() * 40) + 10;
								var LOR = Math.round(Math.random() * 1) + 1;//Left or Right...1 or 2
								if(LOR == 0){xStart *= -1;}
								enemy = new Enemy(this.speed, this.damage, Math.round(this.startLife / 2) + 1, Math.round(this.Cores / 3) + 1, 15, 31, 7, this.x + xStart, this.y, 50, 2);
								enemies.push(enemy);
							}
							return 1;
						}
					} else
					{//Elite Ship
						if(Math.round(Math.random() * 400) == 1){ this.shoot(100); }
						if(this.life <= 0)
						{
							destroys += 1;
							explosion = new Explosion(this.x, this.y, 75, 4, 200, 3, 0.1, 0.1);
							explosions.push(explosion);
							//Update Mission Data
							gco.levelMission.UpdateProgress(this.type);
							for(var i = 0; i < 3; i++)
							{
								var xStart = Math.round(Math.random() * 40) + 10;
								var LOR = Math.round(Math.random() * 1) + 1;//Left or Right...1 or 2
								if(LOR == 0){xStart *= -1;}
								enemy = new Enemy(this.speed, this.damage, Math.round(this.startLife / 2) + 1, Math.round(this.Cores / 3) + 1, 15, 31, 9, this.x + xStart, this.y, 50, 2);
								enemies.push(enemy);
							}
							return 1;
						}
					}
					if(this.y > _canvas.height)
					{
						return 1;
					}
					return 0;
				}
				case 4:
				{//Teleporters
					this.y += this.speed * delta;
					if(!this.didTeleport){ this.speed = this.ystop - this.y; }
					if(this.speed < 50 && this.speed > 35 && this.canFire[0])
					{
						this.canFire[0] = false;
						this.shoot(100);
					} else
					if(this.speed < 35 && this.speed > 25 && this.canFire[1])
					{
						this.canFire[1] = false;
						this.shoot(100);
					} else
					if(this.speed < 25 && this.canFire[2])
					{
						this.canFire[2] = false;
						this.shoot(100);
					}
					
					if(this.speed < 25){ this.readyForTeleport = true; }
					
					if(this.readyForTeleport)
					{
						if(this.teleportTimer <= 0)
						{
							this.y += 10;
							this.readyForTeleport = false;
							this.didTeleport = true;
							explosions.push(new Explosion(this.x, this.y, 50, 1, 500, 0.1, 0.1, 3));
							if(Math.round(Math.random() * 1) == 1)
							{//teleport left
								this.x -= Math.round(Math.random() * 100) + 50;
								if(this.x < 0){this.x = 5;}
							} else
							{//teleport right
								this.x += Math.round(Math.random() * 100) + 50;
								if(this.x > _buffer.width){this.x = _buffer.width - 5;}
							}
							explosions.push(new Explosion(this.x, this.y, 50, 1, 500, 0.1, 0.1, 3));
						}
						this.teleportTimer -= delta;
					}
					
					if(this.didTeleport){ this.speed = this.y - this.ystop;	}
					
					if(this.life <= 0)
					{
						destroys += 1;
						explosion = new Explosion(this.x, this.y, 75, 4, 200, 3, 3, 3);
						explosions.push(explosion);
						//Update Mission Data
						gco.levelMission.UpdateProgress(this.type);
						return 1;
					}
					else if(this.y > _canvas.height)
					{
						return 1;
					}
					return 0;
				}
				case 5:
				{//Boss
                    switch(this.phase)
                    {
                        case -1:
                        {
                            // Move to proper position
                            if(Math.round(this.y) <= this.ystop)
							{
                                this.y += this.speed * delta;
                                this.speed = this.ystop - this.y;
                            }
							if(Math.abs(this.y - this.ystop) < 5)
							{
								this.didTeleport = true;
							}
                            
                            // Center boss
                            /*if(!this.inCenter)
                            {
                                if(this.x >= _buffer.width / 2)
                                {
                                    this.x -= this.xMoveSpeed * delta;
                                    this.xMoveSpeed = this.x - this.xstop;
                                    if(Math.abs(this.x - this.xstop) < 15)
                                    {
                                        this.inCenter = true;
                                    }
                                }
                                else
                                {
                                    this.x += this.xMoveSpeed * delta;
                                    this.xMoveSpeed = this.xstop - this.x;
                                    if(Math.abs(this.x > this.xstop) - 15)
                                    {
                                        this.inCenter = true;
                                    }
                                }
                            }
                            if(this.inCenter == true && Math.round(this.y) >= this.ystop)
                            {
                                this.phase = this.phaseSave;
                                this.speed = 10;
                                this.startX = this.x;
                                this.startY = this.y;
                            }*/

                            
                            // Center boss
                            if(!this.inCenter){
							if(this.x >= _buffer.width / 2){this.x -= this.xMoveSpeed * delta; this.xMoveSpeed = this.x - this.xstop; if(Math.abs(this.x - this.xstop) < 15 && this.didTeleport){this.inCenter = true; this.phase = this.phaseSave; this.speed = 10; this.startX = this.x; this.startY = this.y;}}
							else {this.x += this.xMoveSpeed * delta; this.xMoveSpeed = this.xstop - this.x; if(this.x > Math.abs(this.xstop - 15) && this.didTeleport){this.inCenter = true; this.phase = this.phaseSave; this.speed = 10; this.startX = this.x; this.startY = this.y;}}
							}

                        break;
                        }
                        
                        case 0:
                        {
                            // Weapons
							this.laserX = this.x;
							this.laserY = this.y + 25;
							this.laserHeight = _canvas.height - this.y + 25;
                            if(this.laser){ if(!sfx.bossLaserPlaying){ sfx.play(2); } } else { if(sfx.bossLaserPlaying){ sfx.pause(2); } }
                            if(this.onTick == 0)
                            {
                                this.laserTimer += 1;
                                if(this.laserTimer >= 5 && !this.laser)
                                {
                                    this.laser = true;
                                } else
                                if(this.laserTimer >= 8)
                                {
                                    this.laser = false;
                                    this.laserTimer = 0;
                                }
                            }
                            if(this.shootTick != ticks)
                            {
								this.shootTick = ticks;
								if(this.shootTick % 2 == 0)
								{
									this.shoot(102);
								} else
								{
									this.shoot(103);
								}
                            }
							// Movement
							if(!this.doRealMovement){this.moveX = this.startX + (50 * Math.cos(this.speed * Math.PI * (this.waveLength / 2) * (this.timeAlive / 1000))) * this.sinOffset;if(this.moveX > this.x){if(this.moveX - this.x <= 5){this.doRealMovement = true;}}else{if(this.x - this.moveX <= 5){this.doRealMovement = true;}}}else{this.x = this.startX + (50 * Math.cos(this.speed * Math.PI * (this.waveLength / 2) * (this.timeAlive / 1000))) * this.sinOffset;}
                        break;
                        }
                        
                        case 1:
                        {
                            // Weapons
							this.laserX = this.x;
							this.laserY = this.y + 25;
							this.laserHeight = _canvas.height - this.y + 25;
                            if(this.laser){ if(!sfx.bossLaserPlaying){ sfx.play(2); } } else { if(sfx.bossLaserPlaying){ sfx.pause(2); } }
                            if(this.onTick == 0)
                            {
                                this.laserTimer += 1;
                                if(this.laserTimer >= 1 && !this.laser)
                                {
                                    this.laser = true;
                                } else
                                if(this.laserTimer >= 2)
                                {
                                    this.laser = false;
                                    this.laserTimer = 0;
                                }
                            }
							if(this.shootTick != ticks){ this.shootTick = ticks; if(this.shootTick % 2 == 0){ } else { this.shoot(103); } }
							if(this.onTick == 0)
                            {
                                switch(this.spawnEnemy)
                                {
                                    case 0:
                                    {
                                        var theLife = Math.round(Math.random() * 15) + 10;
                                        var theSpeed = Math.round(Math.random() * 150) + 150;
                                        var theDmg = Math.round(Math.random() * 10) + 10;
                                        var model;
                                        var Cores;
                                        var points;
                                        if(theDmg >= 16)
                                        {
                                            model = 5;
                                            theDmg = Math.round(Math.random() * 10) + 10;
                                            Cores = Math.round(Math.random() * 15) + 10;
                                            points = 6;
                                        }else 
                                        {
                                            points = 5;
                                            model = 4;
                                            theDmg = Math.round(Math.random() * 9) + 9;
                                            Cores = Math.round(Math.random() * 5) + 1;
                                        }
                                        width = 21;
                                        height = 31;
                                        var enemy = new Enemy(theSpeed, theDmg, theLife, Cores, width, height, model, this.x - 35, this.y + 25, 2, points);
                                        enemies.push(enemy);
                                        this.spawnEnemy++;
                                        break;
                                    }
                                    case 1:
                                    {
                                        var theLife = Math.round(Math.random() * 15) + 10;
                                        var theSpeed = Math.round(Math.random() * 150) + 150;
                                        var theDmg = Math.round(Math.random() * 10) + 10;
                                        var model;
                                        var Cores;
                                        var points;
                                        if(theDmg >= 16)
                                        {
                                            model = 5;
                                            theDmg = Math.round(Math.random() * 10) + 10;
                                            Cores = Math.round(Math.random() * 15) + 10;
                                            points = 6;
                                        }else 
                                        {
                                            points = 5;
                                            model = 4;
                                            theDmg = Math.round(Math.random() * 9) + 9;
                                            Cores = Math.round(Math.random() * 5) + 1;
                                        }
                                        width = 21;
                                        height = 31;
                                        var enemy = new Enemy(theSpeed, theDmg, theLife, Cores, width, height, model, this.x + 35, this.y + 25, 2, points);
                                        enemies.push(enemy);
                                        this.spawnEnemy++;
                                        break;
                                    }
                                    case 2:
                                    {
                                        this.spawnEnemy = 0;
                                        break;
                                    }
                                }
                            }
                            
                            // Movement
							if(!this.doRealMovement){
								this.moveX = this.startX + (50 * Math.sin(this.speed * Math.PI * this.waveLength * (this.timeAlive / 1000))) * this.sinOffset;
								this.moveY = this.startY + (50 * Math.cos(this.speed * Math.PI * this.waveLength * (this.timeAlive / 1000))) * this.sinOffset;
								var lenX = this.moveX - this.x;
								var lenY = this.moveY - this.y;
								var distance = Math.sqrt(lenX * lenX + lenY * lenY);
								if(distance < 5){ this.doRealMovement = true; } else { this.y += 25 * delta; }
								if(!this.foundCircle){this.y += this.moveYSpeed * delta; this.moveYSpeed = this.circleYStop - this.y;}
							} else { 
								this.x = this.startX + (50 * Math.sin(this.speed * Math.PI * this.waveLength * (this.timeAlive / 1000))) * this.sinOffset;
								this.y = this.startY + (50 * Math.cos(this.speed * Math.PI * this.waveLength * (this.timeAlive / 1000))) * this.sinOffset;
							}
                            
                        break;
                        }
                        
                        case 2:
                        {
                            // Weapons
                            if(this.shootTick != ticks){ this.shootTick = ticks; if(this.shootTick % 2 == 0){ } else { this.shoot(103); } }
							
							//Timed Explosive
							
							if(this.onTick == 0)
                            {
                                switch(this.spawnEnemy)
                                {
                                    case 0:
                                    {
                                        var theLife = Math.round(Math.random() * 15) + 10;
                                        var theSpeed = Math.round(Math.random() * 150) + 150;
                                        var theDmg = Math.round(Math.random() * 10) + 10;
                                        var model;
                                        var Cores;
                                        var points;
                                        if(theDmg >= 16)
                                        {
                                            model = 5;
                                            theDmg = Math.round(Math.random() * 10) + 10;
                                            Cores = Math.round(Math.random() * 15) + 10;
                                            points = 6;
                                        }else 
                                        {
                                            points = 5;
                                            model = 4;
                                            theDmg = Math.round(Math.random() * 9) + 9;
                                            Cores = Math.round(Math.random() * 5) + 1;
                                        }
                                        width = 21;
                                        height = 31;
                                        var enemy = new Enemy(theSpeed, theDmg, theLife, Cores, width, height, model, this.x - 35, this.y + 25, 2, points);
                                        enemies.push(enemy);
                                        this.spawnEnemy++;
                                        break;
                                    }
                                    case 1:
                                    {
                                        this.spawnEnemy = 0;
                                        break;
                                    }
                                }
                            }
                            // Movement
							if(!this.doRealMovement){
								this.moveX = this.startX + (150 * Math.sin(this.speed * Math.PI * (this.waveLength / 2) * (this.timeAlive / 1000))) * this.sinOffset;
								if(this.moveX > this.x){ if(this.moveX - this.x <= 5){this.doRealMovement = true;}} else { if(this.x - this.moveX <= 5){this.doRealMovement = true;}}
							} else { 
								this.y = this.startY + (10 * Math.cos(this.speed * Math.PI * (this.waveLength * 2) * (this.timeAlive / 1000))) * this.sinOffset;
								this.x = this.startX + (75 * Math.sin(this.speed * Math.PI * (this.waveLength / 2) * (this.timeAlive / 1000))) * this.sinOffset;
							}
                        break;
                        }
                        
                        case 3:
                        {
                            // Weapons
                            // Laser
							this.laserX = this.x;
							this.laserY = this.y + 25;
							this.laserHeight = _canvas.height - this.y + 25;
                            if(this.laser){ if(!sfx.bossLaserPlaying){sfx.play(2);} } else { if(sfx.bossLaserPlaying){sfx.pause(2);} }
                            if(this.onTick == 0)
                            {
                                this.laserTimer += 1;
                                if(this.laserTimer >= 1 && !this.laser)
                                {
                                    this.laser = true;
                                } else
                                if(this.laserTimer >= 2)
                                {
                                    this.laser = false;
                                    this.laserTimer = 0;
                                }
                            }
                            
                            // Timed Explosives
                            if(this.shootTick != ticks)
                            {
								this.shootTick = ticks;
								if(this.shootTick % 20 == 0)
								{
									this.shoot(104);
								}
                            }
                            
                            // Spawn fighter squadron
                            if(this.onTick == 0)
                            {
                                switch(this.spawnEnemy)
                                {
                                    case 0:
                                    {
                                        this.spawnEnemy++;
                                        break;
                                    }
                                    
                                    case 1:
                                    {
                                        var theLife = Math.round(Math.random() * 15) + 10;
                                        var theSpeed = Math.round(Math.random() * 150) + 150;
                                        var theDmg = Math.round(Math.random() * 10) + 10;
                                        var model;
                                        var Cores;
                                        var points;
                                        if(theDmg >= 16)
                                        {
                                            model = 5;
                                            theDmg = Math.round(Math.random() * 10) + 10;
                                            Cores = Math.round(Math.random() * 15) + 10;
                                            points = 6;
                                        }else 
                                        {
                                            points = 5;
                                            model = 4;
                                            theDmg = Math.round(Math.random() * 9) + 9;
                                            Cores = Math.round(Math.random() * 5) + 1;
                                        }
                                        width = 21;
                                        height = 31;
                                        var enemy = new Enemy(theSpeed, theDmg, theLife, Cores, width, height, model, this.x + 35, this.y + 25, 2, points);
                                        enemies.push(enemy);
                                        this.spawnEnemy++;
                                        break;
                                    }
                                    
                                    case 2:
                                    {
                                        this.spawnEnemy = 0;
                                        break;
                                    }
                                }
                            }
                            
                            // Movement
                            if(!this.doRealMovement){this.moveX = this.startX + (150 * Math.cos(this.speed * Math.PI * (this.waveLength / 2) * (this.timeAlive / 1000))) * this.sinOffset;if(this.moveX > this.x){if(this.moveX - this.x <= 5){this.doRealMovement = true;}}else{if(this.x - this.moveX <= 5){this.doRealMovement = true;}}}else{this.x = this.startX + (150 * Math.cos(this.speed * Math.PI * (this.waveLength / 2) * (this.timeAlive / 1000))) * this.sinOffset;}
                        break;
                        }
                        case 4:
                        {
                            // Weapons
                            // Laser
							this.laserX = this.x;
							this.laserY = this.y + 25;
							this.laserHeight = _canvas.height - this.y + 25;
                            if(this.laser){ if(!sfx.bossLaserPlaying){sfx.play(2);} } else { if(sfx.bossLaserPlaying){sfx.pause(2);} }
                            if(this.onTick == 0)
                            {
                                this.laserTimer += 1;
                                if(this.laserTimer >= 1 && !this.laser)
                                {
                                    this.laser = true;
                                } else
                                if(this.laserTimer >= 2)
                                {
                                    this.laser = false;
                                    this.laserTimer = 0;
                                }
                            }
                            
                            // Timed Explosives
                            if(this.shootTick != ticks)
                            {
								this.shootTick = ticks;
								if(this.shootTick % 20 == 0)
								{
									this.shoot(104);
								}
                            }
                            
                            // Movement
							 // Movement
							if(!this.doRealMovement){
								if(this.moveX <= 50) { this.moveLeft = false; }
								else if(this.moveX >= _buffer.width - 50){ this.moveLeft = true;}
								if(this.moveLeft){ this.moveX -= (this.speed * 5) * delta; } else { this.moveX += (this.speed * 5) * delta; }
								this.moveY = this.startY + (150 * Math.sin(this.speed * Math.PI * (this.waveLength / 2) * (this.timeAlive / 1000))) * this.sinOffset;
								
								var lenX = this.moveX - this.x;
								var lenY = this.moveY - this.y;
								var distance = Math.sqrt(lenX * lenX + lenY * lenY);
								if(distance < 15){ this.doRealMovement = true; } else { this.y += 25 * delta; }
								
								if(this.x > this.moveX){ this.x -= (Math.abs(this.x - this.moveX) * 3) * delta; } else {this.x += (Math.abs(this.x - this.moveX) * 3) * delta;}
								if(this.y > this.moveY){ this.y -= (Math.abs(this.y - this.moveY) * 3) * delta; } else {this.y += (Math.abs(this.y - this.moveY) * 3) * delta;}
							} else { 
								if(this.x <= 50) { this.moveLeft = false; }
								else if(this.x >= _buffer.width - 50){ this.moveLeft = true;}
								if(this.moveLeft){ this.x -= (this.speed * 5) * delta; } else { this.x += (this.speed * 5) * delta; }
								this.y = this.startY + (150 * Math.sin(this.speed * Math.PI * (this.waveLength / 2) * (this.timeAlive / 1000))) * this.sinOffset;
							}
                        break;
                        }
                    }

					if(this.life <= 0)
					{
						destroys += 1;
						explosion = new Explosion(this.x, this.y, 75, 4, 200, 3, 3, 3);
						explosions.push(explosion);
						this.speed = 10;
                        this.doRealMovement = false;
						if(sfx.bossLaserPlaying){ sfx.pause(2); }
						this.startX = this.x;
						this.startY = this.y;
						this.circleYStop = this.y + 25;
						console.log("Boss Died");
						this.phaseSave++;
                        if(this.phaseSave >= 5)
                        {
                            //Update Mission Data
                            gco.levelMission.UpdateProgress(this.type);
                            gco.win = true;
							gco.bossX = this.x;
							gco.bossY = this.y;
                            return 3;
                        }
                        else
                        {
							this.laser = false;
							this.inCenter = false;
                            this.life = 500 * this.phaseSave;
							this.phase = -1;
                        }
						return 2;
					}
					return 0;
				}
				case 50:
				{//Splitter Small
					this.y += this.speed * delta;
					if(this.Model == 7)
					{
						if(Math.round(Math.random() * 700) == 1){ this.shoot(100); }
					} else
					{
						if(this.x < player.x){this.direction = 1;} else if(this.x > player.x){this.direction = 0;} else {}
						if(this.direction != this.lastDirection){this.momentum = this.xMoveSpeed * 2; this.lastDirection = this.direction;}
						if(this.y < player.y)
						{
							if(this.x < player.x)
							{
								this.x += (this.xMoveSpeed - this.momentum) * delta;
							}
							else if(this.x > player.x)
							{
								this.x -= (this.xMoveSpeed - this.momentum) * delta;
							} else { }
							this.momentum -= delta * 100;
							if(this.momentum < 0){this.momentum = 0;}
						}
						if(Math.round(Math.random() * 700) == 1){ this.shoot(100); }
					}
					if(this.life <= 0)
					{
						destroys += 1;
						explosion = new Explosion(this.x, this.y, 75, 4, 200, 3, 0.1, 0.1);
						explosions.push(explosion);
						//Update Mission Data
						gco.levelMission.UpdateProgress(this.type);
						return 1;
					}
					else if(this.y > _canvas.height)
					{
						return 1;
					}
					return 0;
				}
			}
        }
		
		this.shoot = function(missileType)
        {
			switch(missileType)
			{
				case 100:
				{
					this.totalMissiles += 1;
					missile = new Missile(missiles.length, 300, missileType, this.x, this.y + 25, this.damage / 2);
					missiles.push(missile);
					break;
				}
				case 101:
				{
					this.totalMissiles += 1;
					missile = new Missile(missiles.length, 300, missileType, this.x, this.y + 25, this.damage * 2);
					missiles.push(missile);
					break;
				}
                case 102:
                {
                    this.totalMissiles += 1;
					missile = new Missile(missiles.length, 300, missileType, this.x - 20, this.y + 25, this.damage / 5);
					missiles.push(missile);
					break;
                }
                case 103:
                {
                    this.totalMissiles += 1;
					missile = new Missile(missiles.length, 300, missileType, this.x + 20, this.y + 25, this.damage / 5);
					missiles.push(missile);
					break;
                }
                case 104:
                {
                    this.totalMissiles += 1;
					missile = new Missile(missiles.length, 100, missileType, this.x, this.y, this.damage);
					missiles.push(missile);
					break;
                }
			}
        }
    }
	
	function RandomItemGeneration()
	{// randomItems[]
		this.onTick = 0;
		this.generate = function(lev)
		{
			if(ticks != this.onTick)
			{
				this.onTick = ticks;
				//Random enemy spawning with random levels
				var rand = Math.floor(Math.random() * (200));
				if(rand == 10)
				{
					//1% chance per tick to get an enemy.
					var startingX = Math.floor(Math.random() * _buffer.width);
					var itemNumber = (Math.floor(Math.random() * NUM_OF_RANDOM_ITEMS));
					newItem = new Item(itemNumber, startingX, 0);
					randomItems.push(newItem);
				}
			}
		}
	}
	
	function Item(itemNumber, inX, inY)
	{
		this.itemNum = itemNumber;
		this.x = inX;
        this.y = inY;
		this.speed = 50;
        this.width = 15;
        this.height = 15;
		this.used = false;
		
		this.Update = function()
		{
            this.y += this.speed * delta;
			if(this.used || this.y > _canvas.height)
			{
				return 1;
			}
			return 0;
		}
		
		this.doItemEffect = function()
		{
			if(!this.used)
			{
				itemsUsed += 1;
				switch(this.itemNum)
				{
					case 0:
					{//health
						player.life += 20; if(player.life > player.maxLife){player.life = player.maxLife;}
						this.used = true;
						break;
					}
					case 1:
					{//shield
						if(player.hasShield)
						{
							player.shield += 50 * player.shieldLevel;if(player.shield > player.maxShield){player.shield = player.maxShield;}
							player.recharge = true;
						}
						this.used = true;
						break;
					}
					case 2:
					{//secondary ammo
						this.used = true;
						player.secondaryAmmo += 25;
						if(player.secondaryAmmo > player.maxSecondaryAmmo){player.secondaryAmmo = player.maxSecondaryAmmo;}
						break;
					}
					case 3:
					{
						this.used = true;
						var newAmount = Math.round(Math.random() * 100) + 150;
						player.money += newAmount;
						totalCores += newAmount;
						break;	
					}
				}
			}
		}
	}
	
	function MoneyEntity(amnt, inX, inY)
	{
		this.amount = amnt;
		this.x = inX;
        this.y = inY;
		this.speed = 50;
        this.width = 15;
        this.height = 15;
		this.used = false;
		this.Update = function()
		{
            this.y += this.speed * delta;
			if(this.used || this.y > _canvas.height)
			{
				return 1;
			}
			return 0;
		}
	}

    function Missile(missNum, theSpeed, missType, inX, inY, dmg)
    {
        this.missileNum = missNum;
        this.x = inX;
        this.y = inY;
        this.speed = theSpeed;
        this.width = 5;
        this.height = 10;
        this.life = 1;
		this.damage = dmg;
		this.missileType = missType;
		this.moveVar = 0;
		this.startX = this.x;
		this.timeAlive = 0;
		this.sinOffset = 1;
        this.timer = 0;
		this.detonated = false;
		//Special Init logic
		this.missileTarget = 1000;//missile target will remain 1000 is no target selected
		switch(this.missileType)
		{
			case 2:
			{
				if(this.damage == 3){this.sinOffset = -1;}	
				break;
			}
			case 51:
			{
				var distance = 1000;
				var tempTarget = 1000;
				for(var i = 0; i < enemies.length; i++)
				{
					if(enemies[i].x > this.x - 50 && enemies[i].x < this.x + 50)
					{//Enemy is within missile's sight
						if(this.y - enemies[i].y > 0 && this.y - enemies[i].y < distance)
						{//Enemy is in front of missile and is the closest to missile
							distance = this.y - enemies[i].y;
							tempTarget = enemies[i].enemyNum;
						}
					}
				}
				if(tempTarget != 1000)
				{
					this.missileTarget = tempTarget;
				}
				break;
			}
            case 104:
            {
                this.timer = Math.floor(Math.random() * (4)) + 2;
                break;
            }
		}
		
        this.Update = function(i)
        {
			this.timeAlive += delta;
			if(this.y < 0 || this.y > buffer.height)
            {
                self.popArray(missiles, i);
            }
			switch(this.missileType)
			{
				case 0:
				{//Pea Shooter
					this.x1 = this.x;
					this.y1 = this.y - (this.height / 2);
					this.x2 = this.x - (this.width / 2);
					this.y2 = this.y + (this.height / 2);
					this.x3 = this.x + (this.width / 2);
					this.y3 = this.y + (this.height / 2);
					this.y -= this.speed * delta;
					break;
				}
				case 1:
				{//Pea Shooter pro
					this.x1 = this.x;
					this.y1 = this.y - (this.height / 2);
					this.x2 = this.x - (this.width / 2);
					this.y2 = this.y + (this.height / 2);
					this.x3 = this.x + (this.width / 2);
					this.y3 = this.y + (this.height / 2);
					this.y -= this.speed * delta;
					break;
				}
				case 2:
				{//Master Pea Shooter
					this.x = this.startX + (30 * Math.sin(30 * 3.14 * 100 * (this.timeAlive / 1000))) * this.sinOffset;
					this.x1 = this.x;
					this.y1 = this.y - (this.height / 2);
					this.x2 = this.x - (this.width / 2);
					this.y2 = this.y + (this.height / 2);
					this.x3 = this.x + (this.width / 2);
					this.y3 = this.y + (this.height / 2);
					this.y -= this.speed * delta;
					break;
				}
				case 50:
				{//Boom Bullet
					this.x1 = this.x;
					this.y1 = this.y - (this.height / 2);
					this.x2 = this.x - (this.width / 2);
					this.y2 = this.y + (this.height / 2);
					this.x3 = this.x + (this.width / 2);
					this.y3 = this.y + (this.height / 2);
					this.y -= this.speed * delta;
					break;
				}
				case 51:
				{//Friendly Boom Bullet
					this.x1 = this.x;
					this.y1 = this.y - (this.height / 2);
					this.x2 = this.x - (this.width / 2);
					this.y2 = this.y + (this.height / 2);
					this.x3 = this.x + (this.width / 2);
					this.y3 = this.y + (this.height / 2);
					this.y -= this.speed * delta;
					if(this.missileTarget != 1000)
					{
						if(self.isEnemyAlive(this.missileTarget))
						{
							var targetEnemy = self.getEnemy(this.missileTarget);
							if(targetEnemy.x < this.x)
							{
								this.x -= (this.speed / 2) * delta;
							} else
							if(targetEnemy.x > this.x)
							{
								this.x += (this.speed / 2) * delta;
							} else
							{
								this.x = targetEnemy.x;
							}
						}
					}
					break;
				}
                case 52:
				{//Space Mine
					this.x1 = this.x - (this.width / 2);
					this.y1 = this.y - (this.height / 2);
					this.x2 = this.x + (this.width / 2);
					this.y2 = this.y + (this.height / 2);
					break;
				}
				case 100:
				{//Level 2 enemy bullet
					this.x1 = this.x;
					this.y1 = this.y + (this.height / 2);
					this.x2 = this.x - (this.width / 2);
					this.y2 = this.y - (this.height / 2);
					this.x3 = this.x + (this.width / 2);
					this.y3 = this.y - (this.height / 2);
					this.y += this.speed * delta;
					break;
				}
				case 101:
				{//Level 5 enemy bomb
					this.x1 = this.x;
					this.y1 = this.y + (this.height / 2);
					this.x2 = this.x - (this.width / 2);
					this.y2 = this.y - (this.height / 2);
					this.x3 = this.x + (this.width / 2);
					this.y3 = this.y - (this.height / 2);
					this.y += this.speed * delta;
					break;
				}
                case 102:
				{//Boss shotA
					this.x1 = this.x;
					this.y1 = this.y + (this.height / 2);
					this.x2 = this.x - (this.width / 2);
					this.y2 = this.y - (this.height / 2);
					this.x3 = this.x + (this.width / 2);
					this.y3 = this.y - (this.height / 2);
					this.y += this.speed * delta;
					break;
				}
                case 103:
				{//Boss shotB
					this.x1 = this.x;
					this.y1 = this.y + (this.height / 2);
					this.x2 = this.x - (this.width / 2);
					this.y2 = this.y - (this.height / 2);
					this.x3 = this.x + (this.width / 2);
					this.y3 = this.y - (this.height / 2);
					this.y += this.speed * delta;
					break;
				}
                case 104:
				{//Boss timed explosive
                    if(!this.detonated)
                    {
                        if(this.timer > 0)
                        {
                            if(ticks % 20 == 0)
                            {
                                this.timer--;
                            }
                            this.x1 = this.x;
                            this.y1 = this.y + (this.height / 2);
                            this.x2 = this.x - (this.width / 2);
                            this.y2 = this.y - (this.height / 2);
                            this.x3 = this.x + (this.width / 2);
                            this.y3 = this.y - (this.height / 2);
                            this.y += this.speed * delta;
                        }
                        else
                        {
                            this.detonated = true;
                            this.width = 60;
                            this.height = 60;
                            this.timer = 10;
                        }
                    }
                    else
                    {
                        this.timer--;
                        if(this.timer <= 0)
                        {
                            this.life = 0;
                        }
                    }
					break;
				}
			}
        }
    }

    function Particle(X, Y, R, G, B)
    {
        this.x = X;
        this.y = Y;
        this.xv = ((Math.random() - 0.5) * 2.0 * 5.0) * 80;//*80 for delta offset
        this.yv = ((Math.random() - 0.5) * 2.0 * 5.0) * 80;
        this.red = R;
        this.green = G;
        this.blue = B;
    }
    
    function Explosion(X, Y, NumParticles, Size, MaxAge, R, G, B)
    {
        this.particles = [];
        this.numParticles = NumParticles / particleOffset;
        this.size = Size;
        this.age = 0;
        this.maxAge = MaxAge;
        
        for(var i = 0; i < this.numParticles; i++)
        {
            this.particles.push(new Particle(X, Y, R, G, B));
        }
            
        this.Update = function()
        {
            for(var i = 0; i < this.particles.length; i++)
            {
                this.particles[i].x += this.particles[i].xv * delta;
                this.particles[i].y += this.particles[i].yv * delta;
            }
            
            if(this.age >= this.maxAge)
            {
                return 1;
            }
            this.age++;
            return 0;
        }
    }

    function Player(Width, Height)
    {
        this.x = 400;
        this.y = 300;
        this.speed = 200;
        this.width = Width;
        this.height = Height;
        this.totalMissiles = 0;
        this.life = 100;
		this.lives = 3;
        this.maxLife = 100;
		this.shieldLevel = 0;
        this.shield = 100;
		this.maxShield = this.shield * this.shieldLevel;
		this.hasShield = false;
		
		this.weapon = 49;// 0 - 48
		//this.secondary = 49;//Starts at 50, 49 = no secondary.
		this.secondary = 9000;
		this.secondaryAmmo = 50;
		this.secondaryAmmoLevel = 1;
		this.maxSecondaryAmmo = 50 * this.secondaryAmmoLevel;
		
		this.weaponFunc = true;//Used for weapon effects
		this.didShoot = false;
		this.onTick = 0;
		this.money = 3000;
		this.currentFuel = 60;
        this.MAX_FUEL = 60;
		
		this.laser = false;//true if laser is on
		this.laserX = this.x;
		this.laserY = this.y - 25;
		this.laserWidth = 20;
		this.laserHeight = this.y - 25;
        
        this.isAlive = function()
        {
            return (this.life > 0);
        }
		
		this.DamagePlayer = function(dmg)
		{
			if(this.hasShield && this.shield > 0)
			{
				this.shield -= dmg * 3;
			} else
			{
				this.life -= dmg;
				if(this.life < 0){this.life = 0;}
			}
			if(!this.isAlive())
			{ 
				gco.ShowContinueScreen();
				sfx.play(0);
				explosion = new Explosion(player.x, player.y, 350, 5, 200, 0.1, 3, 0.1);
                explosions.push(explosion);
				this.laser = false;
			}
		}

        this.Update = function()
        {
            this.x1 = this.x;
            this.y1 = this.y - (this.height / 2);
            this.x2 = this.x - (this.width / 2);
            this.y2 = this.y + (this.height / 2);
            this.x3 = this.x + (this.width / 2);
            this.y3 = this.y + (this.height / 2);

			//Laser Updating
			if(this.secondary >= 9000) {
				if(Keys[19] != 0 && this.secondaryAmmo > 0) {
					if(!sfx.laserPlaying){ sfx.play(1); }
					this.laser = true;
					this.laserX = this.x;
					this.laserY = 0;
					this.laserHeight = this.y - 25;
					if(ticks == 0){ this.secondaryAmmo -= 3; if(this.secondaryAmmo < 0){this.secondaryAmmo = 0;} }
				} else { if(sfx.laserPlaying){ sfx.pause(1); } this.laser = false; }
			} else
			{
				this.laser = false;
				if(sfx.laserPlaying){ sfx.pause(1); }
			}
			
			if(this.hasShield)
			{
				if(this.shield <= 0)
				{
					this.shield = 0;
				}
			}
        }
		
		this.upgradeShield = function()
		{
			this.hasShield = true;
			this.shieldLevel += 1;
			this.maxShield = 100 * this.shieldLevel
			this.resetShield();
		}
		
		this.resetShield = function()
		{
			this.shield = this.maxShield;
		}
		
		this.upgradeSecondaryAmmo = function()
		{
			this.secondaryAmmoLevel += 1;
			this.maxSecondaryAmmo = 50 * this.secondaryAmmoLevel;
			this.resetSecondaryAmmo();
		}
		
		this.resetSecondaryAmmo = function()
		{
			if(this.secondaryAmmo < this.maxSecondaryAmmo)
			{
				this.secondaryAmmo = this.maxSecondaryAmmo;
			}
		}

        this.shoot = function()
        {
			switch(this.weapon)
			{
				case 0:
				{
					this.totalMissiles += 1;
					if(this.weaponFunc)
					{
						missile = new Missile(missiles.length, 300, this.weapon, this.x, this.y - 25, 1);
						missiles.push(missile);
					}
					this.weaponFunc = !this.weaponFunc;
					break;
				}
				case 1:
				{
					this.totalMissiles += 1;
					if(this.weaponFunc)
					{
						missile = new Missile(missiles.length, 300, this.weapon, this.x - 5, this.y - 25, 2);
						missiles.push(missile);
					} else
					{
						missile = new Missile(missiles.length, 300, this.weapon, this.x + 5, this.y - 25, 2);
						missiles.push(missile);
					}
					this.weaponFunc = !this.weaponFunc;
					break;
				}
				case 2:
				{
					this.totalMissiles += 1;
					if(this.weaponFunc)
					{
						missile = new Missile(missiles.length, 300, 1, this.x - 5, this.y - 25, 2);
						missiles.push(missile);
						missile = new Missile(missiles.length, 300, this.weapon, this.x + 5, this.y - 25, 2);
						missiles.push(missile);
					} else
					{
						missile = new Missile(missiles.length, 300, 1, this.x + 5, this.y - 25, 2);
						missiles.push(missile);
						missile = new Missile(missiles.length, 300, this.weapon, this.x - 5, this.y - 25, 3);
						missiles.push(missile);
					}
					this.weaponFunc = !this.weaponFunc;
					break;
				}
				default:{break;}
			}
        }
		this.shootSecondary = function()
		{
			if(this.secondaryAmmo > 0 && this.secondary < 9000)
			{
				switch(this.secondary)
				{
					case 50:
					{
                        this.secondaryAmmo -= 1;
						this.totalMissiles += 1;
						missile = new Missile(missiles.length, 200, this.secondary, this.x, this.y - 25, 20);
						missiles.push(missile);
						break;
					}
					case 51:
					{
                        this.secondaryAmmo -= 1;
						this.totalMissiles += 1;
						missile = new Missile(missiles.length, 200, this.secondary, this.x, this.y - 25, 15);
						missiles.push(missile);
						break;
					}
                    case 52:
					{
                        this.secondaryAmmo -= 1;
						this.totalMissiles += 1;
						missile = new Missile(missiles.length, 200, this.secondary, this.x, this.y - 25, 25);
						missiles.push(missile);
						break;
					}
				}
			}
		}
    }
    
    function GUIText(Text, X, Y, fStyle, aX, aY, col)
    {
        this.text = Text;
        this.x = X;
        this.y = Y;
		this.fontStyle = fStyle;
		this.alignX = aX;
		this.alignY = aY;
		this.color = col;
    }
	
	function Credits()
	{
		this.overlayAlpha = 0.0;
		this.center = _buffer.width / 2;
		this.credits = [];
		this.lines = 24;
		this.lineHeight = 50;
		this.yOffset = 0;
		this.scrollSpeed = 25;
		this.isBlackedOut = false;
		var out = "";
		var size = "";
		var color = "";
		for(var i = 0; i < this.lines; i++)
		{
			switch(i)
			{
				case 0:{out = "Congradulations!!!"; size = "32px Helvetica"; color = "rgb(255, 127, 255)"; break;}
				case 1:{out = "You Killed all the Things!"; size = "32px Helvetica"; color = "rgb(255, 127, 255)"; break;}
				case 2:{out = "Produced by Blackmodule Studio"; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
				case 3:{out = "Program Managers"; size = "26px Helvetica"; color = "rgb(255, 127, 255)"; break;}
				case 4:{out = "Shawn Deprey"; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
				case 5:{out = "Justin Hammond"; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
				case 6:{out = "Lead Game System Designers"; size = "26px Helvetica"; color = "rgb(255, 127, 255)"; break;}
				case 7:{out = "Shawn Deprey"; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
				case 8:{out = "Justin Hammond"; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
				case 9:{out = "Lead Software Engineers"; size = "26px Helvetica"; color = "rgb(255, 127, 255)"; break;}
				case 10:{out = "Shawn Deprey"; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
				case 11:{out = "Justin Hammond"; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
				case 12:{out = "Programmers in Test"; size = "26px Helvetica"; color = "rgb(255, 127, 255)"; break;}
				case 13:{out = "Andrew Muller"; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
				case 14:{out = "Graphic Designers"; size = "26px Helvetica"; color = "rgb(255, 127, 255)"; break;}
				case 15:{out = "David Van Laar-Veth"; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
				case 16:{out = "Mico Picache"; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
				case 17:{out = "Tyler Madden"; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
				case 18:{out = "Sound Artists"; size = "26px Helvetica"; color = "rgb(255, 127, 255)"; break;}
				case 19:{out = "David Van Laar-Veth (The Badass)"; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
				case 20:{out = "Story"; size = "26px Helvetica"; color = "rgb(255, 127, 255)"; break;}
				case 21:{out = "Mico Picache"; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
				case 22:{out = " "; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
				case 23:{out = "Thanks for playing!"; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
				default:{out = "Line not added."; size = "18px Helvetica"; color = "rgb(96, 255, 96)"; break;}
			}
			this.credits[i] = new GUIText(out, this.center, _buffer.height + (this.lineHeight * i), size, "center", "top", color);
		}
		
		this.Update = function()
		{
			if(this.overlayAlpha >= 1){ this.isBlackedOut = true; } else { this.overlayAlpha += delta / 16; }
			if(this.isBlackedOut && !this.CreditsFinished()){ this.yOffset += this.scrollSpeed * delta; }
			else if(this.isBlackedOut && this.CreditsFinished() && currentGui != 7){ currentGui = 7; }
		}
		
		this.Draw = function()
		{
			this.DrawOverlay();
			if(this.isBlackedOut && !this.CreditsFinished()){ this.DrawCredits(); }
		}
		
		this.DrawOverlay = function()
		{
			buffer.fillStyle = "rgba(0, 0, 0, " + this.overlayAlpha + ")";
			buffer.fillRect(0, 0, _buffer.width, _buffer.height);
		}
		
		this.DrawCredits = function()
		{
			buffer.beginPath();
			for(var i = 0; i < this.credits.length; i++)
			{
				buffer.fillStyle = this.credits[i].color;
				buffer.font = this.credits[i].fontStyle;
				buffer.textAlign = this.credits[i].alignX;
				buffer.textBaseline = this.credits[i].alignY;
				buffer.fillText(this.credits[i].text, this.credits[i].x, this.credits[i].y - this.yOffset);
			}
			buffer.closePath();
		}
		
		this.CreditsFinished = function()
		{
			if(this.credits[this.credits.length - 1].y - this.yOffset < -20){ return true; } else { return false; }
		}
	}
    
    /******************************************************/
    

    /******************************************************/
    // Initialization
    /******************************************************/
    
    this.Init = function()
    {
        _canvas = document.getElementById('canvas');
        if(_canvas && _canvas.getContext)
        {
            canvas = _canvas.getContext('2d');

            _buffer = document.createElement('canvas');
            _buffer.width = _canvas.width;
            _buffer.height = _canvas.height;
            buffer = _buffer.getContext('2d');

            buffer.strokeStyle = "rgb(255, 255, 255)";
            buffer.fillStyle = "rgb(255, 255, 255)";
            buffer.font = "bold 25px sans-serif";
        }

        

        player = new Player(24, 40);
		enemyGeneration = new EnemyGeneration();
        starGeneration = new StarGeneration();
        initStars();
		itemGeneration = new RandomItemGeneration();
		
		gco = new GameControlObject();
		gco.Init();
		
		sfx = new SFXObject();
    }

    /******************************************************/


    /******************************************************/
    // Run
    /******************************************************/
    
    this.Run = function()
    {	
        if(canvas != null)
        {
            self.gameLoop = setInterval(self.Loop, 1);
        }	
    }
    
    /******************************************************/


    /******************************************************/
    // Update
    /******************************************************/
    
    this.Update = function()
    {
		//Stop Sound Check
		if((currentGui != NULL_GUI_STATE) && sfx.laserPlaying){sfx.pause(1);}
		if((gameState != 1) && sfx.bossLaserPlaying){sfx.pause(2);}
		
        if(levelStart){ bgm.play(); }
        // Input
        self.doInput();
        self.getInput();
        
		 // Random Star Generation
		if(!paused)
		{
			starGeneration.generate();
			for(var i = 0; i < stars.length; i++)
			{
				if(stars[i].Update() != 0)
				{
					self.popArray(stars, i);
				}
			}
		}
				
        if(gameState == 1 && !gco.win)
        {
            if(!paused)
            {
				// Game Control Object Update
				gco.Update();
				
				// Random Enemy Generation
				enemyGeneration.generate(gco.level);
				
				// Random Item Generation
				itemGeneration.generate();
				
                // Update Objects
                if(player.isAlive())
                {
					self.levelBoundingCheck(player);
                    player.Update();
                }
                
                for(var i = 0; i < missiles.length; i++)
                {
                    missiles[i].Update(i);
                    if(missiles[i].life <= 0)
                    {
                        explosion = new Explosion(missiles[i].x, missiles[i].y, 15, 5, 60, 3, 0.1, 0.1);
                        explosions.push(explosion);
                        explosion = new Explosion(missiles[i].x, missiles[i].y, 15, 5, 60, 3, 3, 0.1);
                        explosions.push(explosion);
                        self.popArray(missiles, i);
                    }
                }
                
                for(var i = 0; i < enemies.length; i++)
                {
					if(enemies[i].onTick != ticks){ enemies[i].onTick = ticks; }
                    switch(enemies[i].Update())
                    {
                        case 0:
                        break;
                        
                        case 1:
                            if(!self.isEnemyAlive(enemies[i].enemyNum))
                            {
                                enemiesKilled += 1;
                                enemyPoints += enemies[i].points;
                                sfx.play(0);
                                mon = new MoneyEntity(enemies[i].Cores, enemies[i].x, enemies[i].y);
                                money.push(mon);
                            }
                            if(!gco.win){
                                self.popArray(enemies, i);
                            }
                        break;
                        
                        case 2:
                            if(enemies[i].isBoss){ /*console.log("Boss Phase " + enemies[i].phase + " complete!");*/ }
                        break;
                        
                        case 3:
                            if(enemies[i].isBoss){ /*console.log("Boss defeated!");*/ }
                        break;
                    }
                }
				
				for(var i = 0; i < money.length; i++)
				{
					if(money[i].Update() != 0)
					{
						self.popArray(money, i);
					}
				}
				
				for(var i = 0; i < randomItems.length; i++)
				{
					if(randomItems[i].Update() != 0)
					{
						self.popArray(randomItems, i);
					}
				}
                
                for(var i = 0; i < explosions.length; i++)
                {
                    if(explosions[i].Update() != 0)
                    {
                        self.popArray(explosions, i);
                    }
                }
                
                // Collision Detection
                if(colSwap)
                {
                    colSwap = false;
					
					for(var i = 0; i < money.length; i++)
					{
						if(player.isAlive() && !money[i].used)
						{
							if(self.Collision(player, money[i]))
							{
								player.money += money[i].amount;
								totalCores += money[i].amount;
								money[i].used = true;
							}
						}
					}
					
					for(var i = 0; i < randomItems.length; i++)
					{
						if(player.isAlive() && !randomItems[i].used)
						{
							if(self.Collision(player, randomItems[i]))
							{
								randomItems[i].doItemEffect();
							}
						}
					}
					
                    for(var a = 0; a < enemies.length; a++)
                    {
                        if(player.isAlive())
                        {
							if(ticks % 2 == 0)
							{//LASERS!
								if(enemies[a].laser)
								{//Boss Laser
									if(self.BossLaserCollision(player, enemies[a]))
									{
										player.DamagePlayer(2);
									}
								}
								if(player.laser)
								{
									if(self.LaserCollision(enemies[a]))
									{
										enemies[a].life -= 5;
										explosion = new Explosion(enemies[a].x, enemies[a].y, 2, 4, 50, 0.1, 0.1, 3.0);
										explosions.push(explosion);
									}
								}
							}
							
                            if(self.Collision(player, enemies[a]))
							{
								if(enemies[a].isBoss)
								{
									player.DamagePlayer(9000);//once to ensure shield is gone
									player.DamagePlayer(9000);//once to ensure player death
								} else
								{
									player.DamagePlayer(enemies[a].damage);
									explosion = new Explosion(player.x, player.y, 5, 10, 60, 0.1, 3, 0.1);
									explosions.push(explosion);
									enemies[a].life = 0;
								}
							}
                        
							for(var b = 0; b < missiles.length; b++)
							{
								if(missiles[b].missileType > 99)
								{
									if(self.Collision(player, missiles[b]))
									{
										explosion = new Explosion(missiles[b].x, missiles[b].y, 5, 10, 100, 1, 1, 1);
										explosions.push(explosion);
										player.DamagePlayer(missiles[b].damage);
										this.popArray(missiles, b);
									}
								} else
								{
									if(self.Collision(missiles[b], enemies[a]))
									{
										explosion = new Explosion(missiles[b].x, missiles[b].y, 5, 10, 100, 1, 1, 1);
										explosions.push(explosion);
										enemies[a].life -= missiles[b].damage;
										this.popArray(missiles, b);
									}
								}
							}
						}
                    }
                }
                else
                {
					score = (enemyPoints + enemiesKilled) * 10;
                    colSwap = true;
                }
            }
        }
		else if(gameState == 1 && gco.win)
		{//The game is won at this point. Do what happens exactly after game is beat here.
			if(sfx.laserPlaying){sfx.pause(1);}
			gco.credits.Update();
			if(!gco.credits.isBlackedOut){ gco.Update(); }//Will do random boss explosions
			for(var i = 0; i < explosions.length; i++)
			{
				if(explosions[i].Update() != 0)
				{
					self.popArray(explosions, i);
				}
			}
		}
    }

	this.PlayerCollision = function(Player, Target)
    {
        if(
           ((Player.y - Player.height / 2) <= (Target.y + Target.height / 3) &&
           (Player.y + Player.height / 2) >= (Target.y - Target.height / 3))
          )
        {
            if(
               ((Player.x - Player.width / 2) <= (Target.x + Target.width / 3) &&
               (Player.x + Player.width / 2) >= (Target.x - Target.width / 3))
              )
            {
                return true;
            }
            return false;
        }
        return false;
    }
	
	this.levelBoundingCheck = function(Player)
	{
		if(Player.y - Player.height / 2 < 0){Player.y = Player.height / 2;}
		if(Player.y + Player.height / 2 > _buffer.height){Player.y = _buffer.height - Player.height / 2;}
		if(Player.x - Player.width / 2 < 0){Player.x = Player.width / 2;}
		if(Player.x + Player.width / 2 > _buffer.width){Player.x = _buffer.width - Player.width / 2;}
	}
    
    this.Collision = function(Shot, Target)
    {
        if(
           ((Shot.y - Shot.height / 2) <= (Target.y + Target.height / 2) &&
           (Shot.y + Shot.height / 2) >= (Target.y - Target.height / 2))
          )
        {
            if(
               ((Shot.x - Shot.width / 2) <= (Target.x + Target.width / 2) &&
               (Shot.x + Shot.width / 2) >= (Target.x - Target.width / 2))
              )
            {
                return true;
            }
            return false;
        }
        return false;
    }
	
	this.LaserCollision = function(Target)
	{
		if((player.laserY <= (Target.y + Target.height / 2) && player.laserHeight >= (Target.y - Target.height / 2)))
        {
            if(((player.laserX - 10) <= (Target.x + Target.width / 2) && (player.laserX + 10) >= (Target.x - Target.width / 2)))
            {
                return true;
            }
            return false;
        }
        return false;
	}
	
	this.BossLaserCollision = function(Target, Boss)
	{
		if((Boss.laserY <= (Target.y + Target.height / 2) && (Boss.laserHeight + Boss.y) >= (Target.y - Target.height / 2)))
        {
            if(((Boss.laserX - 5) <= (Target.x + Target.width / 2) && (Boss.laserX + 5) >= (Target.x - Target.width / 2)))
            {
                return true;
            }
            return false;
        }
        return false;
	}
	
	function doMouseClick(e)
	{
		//State GUIs
		// 0 = Main Menu
		// 1 = Pause Menu
		// 2 = Level Up Menu
		// 3 = Game Over Menu
		// 4 = Continue Menu
		switch(currentGui)
		{
			case 0:
			{//Main Menu
				if(mouseX > (_canvas.width / 2 + 10) - 115 && mouseX < (_canvas.width / 2 + 10) + 100 && mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					currentGui = 2;//default case will Trigger
				}
				if(mouseX > (_canvas.width / 2 + 10) - 65 && mouseX < (_canvas.width / 2 + 10) + 40 && mouseY < (_canvas.height / 2 + 60) + 20 && mouseY > (_canvas.height / 2 + 60) - 10)
				{
					currentGui = 6; lastGui = 0;	
				}
				break;
			}
			case 1:
			{//Pause Menu
				break;
			}
			case 2:
			{//Level up Menu
//**********************************************************************//
//						UPGRADE MENU SECTION							//
//**********************************************************************//
if(mouseX > (_canvas.width - 175) && mouseX < (_canvas.width - 25) && mouseY < (280) && mouseY > (250))
{//Start Level
	if(player.weapon != 49){ gco.StartLevel(); }
}
if(mouseX > (_canvas.width - 160) && mouseX < (_canvas.width - 35) && mouseY < (55) && mouseY > (15))
{//Options Menu
	currentGui = 6; lastGui = 2;
}
if(mouseX > 10 && mouseX < 58 && mouseY > 280 && mouseY < 328)
{//Pea Shooter, Weapon ID: 0
	if(gco.weaponsOwned[0]){ gco.EquipWeapon(0); } else { if(player.money >= gco.weaponPrice[0]){ gco.PurchaseWeapon(0); }}
}
if(mouseX > 60 && mouseX < 108 && mouseY > 280 && mouseY < 328)
{//Pea Shooter Pro, Weapon ID: 1
	if(gco.weaponsOwned[1]){ gco.EquipWeapon(1); } else { if(player.money >= gco.weaponPrice[1]){ gco.PurchaseWeapon(1); }}
}
if(mouseX > 110 && mouseX < 158 && mouseY > 280 && mouseY < 328)
{//Master Pea Shooter, Weapon ID: 2
	if(gco.weaponsOwned[2]){ gco.EquipWeapon(2); } else { if(player.money >= gco.weaponPrice[2]){ gco.PurchaseWeapon(2); }}
}
if(mouseX > 10 && mouseX < 58 && mouseY > 448 && mouseY < 496)
{//Boom Bullet, Weapon ID: 50
	if(gco.weaponsOwned[50]){ gco.EquipWeapon(50); } else { if(player.money >= gco.weaponPrice[50]){ gco.PurchaseWeapon(50); }}
}
if(mouseX > 60 && mouseX < 108 && mouseY > 448 && mouseY < 496)
{//Friendly Boom Bullet, Weapon ID: 51
	if(gco.weaponsOwned[51]){ gco.EquipWeapon(51); } else { if(player.money >= gco.weaponPrice[51]){ gco.PurchaseWeapon(51); }}
}
if(mouseX > 110 && mouseX < 158 && mouseY > 448 && mouseY < 496)
{//Space Mine, Weapon ID: 52
	if(gco.weaponsOwned[52]){ gco.EquipWeapon(52); } else { if(player.money >= gco.weaponPrice[52]){ gco.PurchaseWeapon(52); }}
}
if(mouseX > 160 && mouseX < 208 && mouseY > 448 && mouseY < 496)
{//Laser: Weapon ID: 9000
	if(gco.ownLaser){ gco.EquipWeapon(9000); } else { if(player.money >= gco.laserPrice){ gco.PurchaseWeapon(9000); } }
}
if(mouseX > _canvas.width - 300 && mouseX < _canvas.width - 252 && mouseY > 448 && mouseY < 496)
{//Shield
	if(player.money >= (player.shieldLevel + 1) * 250){gco.PurchaseExtras(0);}
}
if(mouseX > _canvas.width - 250 && mouseX < _canvas.width - 202 && mouseY > 448 && mouseY < 496)
{//Max Ammo
	if(player.money >= (player.secondaryAmmoLevel + 1) * 50){gco.PurchaseExtras(2);}
}
if(mouseX > _canvas.width - 200 && mouseX < _canvas.width - 152 && mouseY > 448 && mouseY < 496)
{//Buy Secondary Ammo
	if(player.money >= gco.secondaryAmmoPrice && player.secondaryAmmo < player.maxSecondaryAmmo){gco.PurchaseExtras(3);}
}
if(mouseX > _canvas.width - 150 && mouseX < _canvas.width - 102 && mouseY > 448 && mouseY < 496)
{//Buy Fill Health
	if(player.money >= ((100 - player.life) * 2)){gco.PurchaseExtras(4);}
}
//**********************************************************************//
//					  END UPGRADE MENU SECTION							//
//**********************************************************************//
				break;
			}
			case 3:
			{// Continue Menu
				if(mouseX > (_canvas.width / 2 + 10) - 75 && mouseX < (_canvas.width / 2 + 10) + 60 &&
				   mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					currentGui = NULL_GUI_STATE;
					self.softReset();
				}
				break;
			}
			case 4:
			{// Level Up Menu
				if(mouseX > (_canvas.width / 2 + 10) - 75 && mouseX < (_canvas.width / 2 + 10) + 60 &&
				   mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					self.softReset();
					gco.GoToUpgradeMenu();	
				}
				break;
			}
			case 5:
			{// Game Over Menu
				if(mouseX > (_canvas.width / 2 + 10) - 75 && mouseX < (_canvas.width / 2 + 10) + 60 &&
				   mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					currentGui = 0;
					gameState = 0;
					self.hardReset();
				}
				break;
			}
			case 6:
			{//Options Menu
				if(mouseX > 0 && mouseX < 90 && mouseY < _canvas.height && mouseY > _canvas.height - 45)
				{//Back
					currentGui = lastGui; lastGui = 6;
				}
				if(mouseX > 0 && mouseX < 47 && mouseY < 105 && mouseY > 75) {
					particleOffset += 1;
					if(particleOffset > 5){particleOffset = 5;}
				}
				if(mouseX >= 47 && mouseX < 95 && mouseY < 105 && mouseY > 75) {
					particleOffset -= 1;
					if(particleOffset < 1){particleOffset = 1;}
				}
				break;
			}
			case 7:
			{// Submit Score Menu
        		if(mouseX > (_canvas.width / 2 + 10) - 75 && mouseX < (_canvas.width / 2 + 10) + 60 && mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					self.submitScore("http://www.blackmodulestudio.com/games/katt/update_database.php", self.buildScoresHash(), "POST");
				}
				break;
			}
		}
	}
    
	function getMousePos(canvas, evt)
	{
		// get canvas position
		var obj = canvas;
		var top = 0;
		var left = 0;
		while (obj && obj.tagName != 'BODY') {
			top += obj.offsetTop;
			left += obj.offsetLeft;
			obj = obj.offsetParent;
		}
	 
		// return relative mouse position
		mouseX = evt.clientX - left + window.pageXOffset;
		mouseY = evt.clientY - top + window.pageYOffset;
	}
	
    this.doInput = function()
    {
		//Do Keyboard Input
        if(keysDown[38] == true || keysDown[87] == true) // W || Up
        {if(Keys[0] == 0){Keys[0] = 1;}else if(Keys[0] == 1 || Keys[0] == 2){Keys[0] = 2;}}else if(keysDown[38] == false || keysDown[87] == false){if(Keys[0] == 1 || Keys[0] == 2){Keys[0] = 0;}}
        
        if(keysDown[37] == true || keysDown[65] == true) // A || Left
        {if(Keys[1] == 0){Keys[1] = 1;}else if(Keys[1] == 1 || Keys[1] == 2){Keys[1] = 2;}}else if(keysDown[37] == false || keysDown[65] == false){if(Keys[1] == 1 || Keys[1] == 2){Keys[1] = 0;}}

        if(keysDown[40] == true || keysDown[83] == true) // S || Down
        {if(Keys[2] == 0){Keys[2] = 1;}else if(Keys[2] == 1 || Keys[2] == 2){Keys[2] = 2;}}else if(keysDown[40] == false || keysDown[83] == false){if(Keys[2] == 1 || Keys[2] == 2){Keys[2] = 0;}}

        if(keysDown[39] == true || keysDown[68] == true) // D || Right
        {if(Keys[3] == 0){Keys[3] = 1;}else if(Keys[3] == 1 || Keys[3] == 2){Keys[3] = 2;}}else if(keysDown[39] == false || keysDown[68] == false){if(Keys[3] == 1 || Keys[3] == 2){Keys[3] = 0;}}

        if(keysDown[81] == true) // Q
        {if(Keys[4] == 0){Keys[4] = 1;}else if(Keys[4] == 1 || Keys[4] == 2){Keys[4] = 2;}}else if(keysDown[81] == false){if(Keys[4] == 1 || Keys[4] == 2){Keys[4] = 0;}}
        
        if(keysDown[69] == true) // E
        {if(Keys[5] == 0){Keys[5] = 1;}else if(Keys[5] == 1 || Keys[5] == 2){Keys[5] = 2;}}else if(keysDown[69] == false){if(Keys[5] == 1 || Keys[5] == 2){Keys[5] = 0;}}

        if(keysDown[48] == true) // 0
        {if(Keys[6] == 0){Keys[6] = 1;}else if(Keys[6] == 1 || Keys[6] == 2){Keys[6] = 2;}}else if(keysDown[48] == false){if(Keys[6] == 1 || Keys[6] == 2){Keys[6] = 0;}}

        if(keysDown[49] == true) // 1
        {if(Keys[7] == 0){Keys[7] = 1;}else if(Keys[7] == 1 || Keys[7] == 2){Keys[7] = 2;}}else if(keysDown[49] == false){if(Keys[7] == 1 || Keys[7] == 2){Keys[7] = 0;}}

        if(keysDown[50] == true) // 2
        {if(Keys[8] == 0){Keys[8] = 1;}else if(Keys[8] == 1 || Keys[8] == 2){Keys[8] = 2;}}else if(keysDown[50] == false){if(Keys[8] == 1 || Keys[8] == 2){Keys[8] = 0;}}

        if(keysDown[51] == true) // 3
        {if(Keys[9] == 0){Keys[9] = 1;}else if(Keys[9] == 1 || Keys[9] == 2){Keys[9] = 2;}}else if(keysDown[51] == false){if(Keys[9] == 1 || Keys[9] == 2){Keys[9] = 0;}}

        if(keysDown[52] == true) // 4
        {if(Keys[10] == 0){Keys[10] = 1;}else if(Keys[10] == 1 || Keys[10] == 2){Keys[10] = 2;}}else if(keysDown[52] == false){if(Keys[10] == 1 || Keys[10] == 2){Keys[10] = 0;}}

        if(keysDown[53] == true) // 5
        {if(Keys[11] == 0){Keys[11] = 1;}else if(Keys[11] == 1 || Keys[11] == 2){Keys[11] = 2;}}else if(keysDown[53] == false){if(Keys[11] == 1 || Keys[11] == 2){Keys[11] = 0;}}

        if(keysDown[54] == true) // 6
        {if(Keys[12] == 0){Keys[12] = 1;}else if(Keys[12] == 1 || Keys[12] == 2){Keys[12] = 2;}}else if(keysDown[54] == false){if(Keys[12] == 1 || Keys[12] == 2){Keys[12] = 0;}}

        if(keysDown[55] == true) // 7
        {if(Keys[13] == 0){Keys[13] = 1;}else if(Keys[13] == 1 || Keys[13] == 2){Keys[13] = 2;}}else if(keysDown[55] == false){if(Keys[13] == 1 || Keys[13] == 2){Keys[13] = 0;}}

        if(keysDown[56] == true) // 8
        {if(Keys[14] == 0){Keys[14] = 1;}else if(Keys[14] == 1 || Keys[14] == 2){Keys[14] = 2;}}else if(keysDown[56] == false){if(Keys[14] == 1 || Keys[14] == 2){Keys[14] = 0;}}

        if(keysDown[57] == true) // 9
        {if(Keys[15] == 0){Keys[15] = 1;}else if(Keys[15] == 1 || Keys[15] == 2){Keys[15] = 2;}}else if(keysDown[57] == false){if(Keys[15] == 1 || Keys[15] == 2){Keys[15] = 0;}}

        if(keysDown[32] == true) // Space
        {if(Keys[16] == 0){Keys[16] = 1;}else if(Keys[16] == 1 || Keys[16] == 2){Keys[16] = 2;}}else if(keysDown[32] == false){if(Keys[16] == 1 || Keys[16] == 2){Keys[16] = 0;}}
        
        if(keysDown[27] == true) // Escape
        {if(Keys[17] == 0){Keys[17] = 1;}else if(Keys[17] == 1 || Keys[17] == 2){Keys[17] = 2;}}else if(keysDown[27] == false){if(Keys[17] == 1 || Keys[17] == 2){Keys[17] = 0;}}
        
        if(keysDown[13] == true) // Enter
        {if(Keys[18] == 0){Keys[18] = 1;}else if(Keys[18] == 1 || Keys[18] == 2){Keys[18] = 2;}}else if(keysDown[13] == false){if(Keys[18] == 1 || Keys[18] == 2){Keys[18] = 0;}}
		
        if(keysDown[66] == true) // B
        {if(Keys[19] == 0){Keys[19] = 1;}else if(Keys[19] == 1 || Keys[19] == 2){Keys[19] = 2;}}else if(keysDown[66] == false){if(Keys[19] == 1 || Keys[19] == 2){Keys[19] = 0;}}
    }
    
    this.getInput = function()
    {
        if(Keys[17] == 1) // Escape
        {
			if(gameState == 1 && player.isAlive())
			{   if(!gco.win){ gco.TogglePauseGame(); }
				if(!paused){ currentGui = NULL_GUI_STATE;} else { currentGui = 1; }
			}
			
        }
        if(!paused)
        {
            if(Keys[4] == 1)
            {
				debug = !debug;
            }
			if(Keys[5] == 1 && gameState == 1)
			{
				if(playerInfo)
				{
					explosion = new Explosion(135, _canvas.height - 50, 75, 10, 100, 0.1, 3, 0.1);
                    explosions.push(explosion);
					explosion = new Explosion(135, _canvas.height - 30, 75, 10, 100, 0.1, 3, 0.1);
                    explosions.push(explosion);
					explosion = new Explosion(450, _canvas.height - 30, 75, 10, 100, 0.1, 3, 0.1);
                    explosions.push(explosion);
				}
				playerInfo = !playerInfo;
			}
            if(player.isAlive() && gameState == 1 && !gco.win)
            {
                if(Keys[0] >= 1) // W || Up
                {
                    player.y -= player.speed * delta;
                }
                if(Keys[1] >= 1) // A || Left
                {
                    player.x -= player.speed * delta;
                }
                if(Keys[2] >= 1) // S || Down
                {
                    player.y += player.speed * delta;
                }
                if(Keys[3] >= 1) // D || Right
                {
                    player.x += player.speed * delta;
                }

				if(ticks != player.onTick)
                {//On Tick Player Input
					player.onTick = ticks;
					if(Keys[16] >= 1) // Space
					{
						player.shoot();
					}
				}
				
                if(Keys[19] == 1) // B
                {
                    player.shootSecondary();
                }
            }
            else
            {
                if(Keys[18] == 1) // Enter
                {
                    //self.reset();
                }
            }
        }
    }

	this.buildScoresHash = function()
	{
		var scores = {};
		scores['kills'] = enemiesKilled;
		scores['cores'] = totalCores;
		scores['highest_score'] = score;
		scores['items_used'] = itemsUsed;
		scores['from_game'] = "fromgame";
		return scores;
	}
    
	this.submitScore = function(path, params, method)
	{
        method = method || "post"; // Set method to post by default, if not specified.
        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        for(var key in params)
        {
            if(params.hasOwnProperty(key))
            {
                var form_child = document.createElement("input");
                form_child.setAttribute("type", "hidden");
                form_child.setAttribute("name", key);
                form_child.setAttribute("value", params[key]);
                form.appendChild(form_child);
             }
        }
        document.body.appendChild(form);
        form.submit();
    }

    /******************************************************/
    
    
    /******************************************************/
    // Draw
    /******************************************************/
    this.Draw = function()
    {
        buffer.clearRect(0, 0, _buffer.width, _buffer.height);
        canvas.clearRect(0, 0, _canvas.width, _canvas.height);
    
        //Draw Code
        var x = _buffer.width / 2;
        var y = _buffer.height / 2;
        var width = 25;
        var height = 35;

        // Background
        buffer.fillStyle = "rgb(0, 0, 0)";
        buffer.fillRect(0, 0, _buffer.width, _buffer.height);
        
		// Stars
        self.drawStars();
		
        if(gameState == 1 && !gco.credits.isBlackedOut)
        {
			//Money
			self.drawMoney();
			
			//Random Items
			self.drawItems();
			
            // Player
            if(player.isAlive())
            {
                self.drawPlayer();
                if(player.hasShield && player.shield > 0)
                {
                    self.drawShield();
                }
            }

            //Enemies
            self.drawEnemies();
            
            // Missile
            self.drawMissiles();

			//Laser
			if(player.laser){ self.drawLaser(); }
			
            // Explosion
            self.drawExplosions();
            
            // GUI
            self.drawHUD();
        }
		if(gco.win)
		{
			gco.credits.Draw();
		}
		self.drawGUI();
        canvas.drawImage(_buffer, 0, 0);
    }

    this.drawStars = function()
    {
		
        for(i = 0; i < stars.length; i++)
        {
           buffer.fillStyle = 'rgb(200, 200, 255)';
		   buffer.beginPath();
                buffer.arc(stars[i].x, stars[i].y, 2, 0, Math.PI * 2, true);
           buffer.closePath();
           buffer.fill();
        }
		
    }

    this.drawPlayer = function()
    {
		buffer.drawImage(playerImages[0], player.x - (player.width / 2), player.y - (player.height / 2), player.width, player.height);   
    }
    
    this.drawShield = function()
    {
		buffer.shadowBlur = 20;
		buffer.shadowColor = 'rgb(0, 128, 255)';
		
        buffer.beginPath();
            buffer.strokeStyle = 'rgb(0, 128, 255)';
            buffer.lineWidth = 3;
            buffer.arc(player.x, player.y, 28, 0, Math.PI * 2, true);
            buffer.stroke();
        buffer.closePath();
        buffer.lineWidth = 1;
        buffer.beginPath();
            buffer.globalAlpha = 0.5;
            buffer.fillStyle = 'rgb(0, 128, 255)';
            buffer.arc(player.x, player.y, 28, 0, Math.PI * 2, true);
            buffer.fill();
        buffer.closePath();
        buffer.globalAlpha = 1;
		
		buffer.shadowBlur = 0;
    }
	
	this.drawEnemies = function()
    {
		var drawLaser = false;
		var x = 0, y = 0, h = 0, w = 0;
		buffer.beginPath();
        for(var i = 0; i < enemies.length; i++)
        {
			buffer.drawImage(enemyImages[enemies[i].Model], enemies[i].x - (enemies[i].width / 2), enemies[i].y - (enemies[i].height / 2), enemies[i].width, enemies[i].height);
			if(enemies[i].isBoss)
			{
				buffer.drawImage(playerImages[0], enemies[i].moveX - (player.width / 2), enemies[i].moveY - (player.height / 2), player.width, player.height);
			}
			if(enemies[i].laser == true){ drawLaser = true; x = enemies[i].laserX; y = enemies[i].laserY; h = enemies[i].laserHeight; w = enemies[i].laserWidth; }
        }
		buffer.closePath();
		if(drawLaser){ this.drawBossLaser(x, y, w, h); }
    }
	
	this.drawMoney = function()
	{
		for(var i = 0; i < money.length; i++)
		{
			buffer.drawImage(itemImages[0], money[i].x - (money[i].width / 2), money[i].y - (money[i].height / 2), money[i].width, money[i].height);
		}
	}
    
	this.drawItems = function()
	{
        var rand_health = Math.floor(Math.random() * 100) + 243;
        var rand1_health = Math.floor(Math.random() * 100) + 100;
        var rand2_health = Math.floor(Math.random() * 100) + 188;
        var r_health = rand_health;
        var g_health = rand1_health;
        var b_health = rand2_health;
        buffer.lineWidth = 3;
        
        var rand_shield = Math.floor(Math.random() * 100) - 50;
        var rand1_shield = Math.floor(Math.random() * 100) + 63;
        var rand2_shield = Math.floor(Math.random() * 100) + 138;
        var r_shield = rand_shield;
        var g_shield = rand1_shield;
        var b_shield = rand2_shield;
        
        var rand_ammo = Math.floor(Math.random() * 100) + 128;
        var rand1_ammo = Math.floor(Math.random() * 100) + 128;
        var rand2_ammo = Math.floor(Math.random() * 100) + 128;
        var r_ammo = rand_ammo;
        var g_ammo = rand1_ammo;
        var b_ammo = rand2_ammo;
        
		for(var i = 0; i < randomItems.length; i++)
		{
			switch(randomItems[i].itemNum)
			{
				case 0:
				{//Health
                    buffer.beginPath();
                    buffer.fillStyle = "rgb(" + r_health + ", " + g_health + ", " + b_health + ")";
                    buffer.strokeStyle = "rgb(255, 0, 0)";
                        buffer.moveTo(randomItems[i].x, randomItems[i].y - 2.5);
                        buffer.lineTo(randomItems[i].x + 2.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x + 5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x + 6.25, randomItems[i].y - 2.5);
                        buffer.lineTo(randomItems[i].x, randomItems[i].y + 5);
                        buffer.lineTo(randomItems[i].x - 6.25, randomItems[i].y - 2.5);
                        buffer.lineTo(randomItems[i].x - 5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x - 2.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x, randomItems[i].y - 2.5);
                    buffer.stroke();
                    buffer.fill();
                    buffer.closePath();
					break;
				}
				case 1:
				{//Shield
                    buffer.beginPath();
					buffer.fillStyle = "rgb(" + r_shield + ", " + g_shield + ", " + b_shield + ")";
                    buffer.strokeStyle = "rgb(0, 113, 188)";
                        buffer.moveTo(randomItems[i].x, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x + 5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x + 5, randomItems[i].y);
                        buffer.lineTo(randomItems[i].x, randomItems[i].y + 7.5);
                        buffer.lineTo(randomItems[i].x - 5, randomItems[i].y);
                        buffer.lineTo(randomItems[i].x - 5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x, randomItems[i].y - 5);
                    buffer.stroke();
                    buffer.fill();
                    buffer.closePath();
					break;
				}
				case 2:
				{//Secondary Ammo
                    buffer.beginPath();
				    buffer.fillStyle = "rgb(" + r_ammo + ", " + g_ammo + ", " + b_ammo + ")";
                    buffer.strokeStyle = "rgb(128, 128, 128)";
                        buffer.moveTo(randomItems[i].x - 10, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x - 8.75, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x - 7.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x - 7.5, randomItems[i].y + 10);
                        buffer.lineTo(randomItems[i].x - 12.5, randomItems[i].y + 10);
                        buffer.lineTo(randomItems[i].x - 12.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x - 11.25, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x - 10, randomItems[i].y - 10);

                        buffer.moveTo(randomItems[i].x, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x + 1.25, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x + 2.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x + 2.5, randomItems[i].y + 10);
                        buffer.lineTo(randomItems[i].x - 2.5, randomItems[i].y + 10);
                        buffer.lineTo(randomItems[i].x - 2.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x - 1.25, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x, randomItems[i].y - 10);

                        buffer.moveTo(randomItems[i].x + 10, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x + 11.25, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x + 12.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x + 12.5, randomItems[i].y + 10);
                        buffer.lineTo(randomItems[i].x + 7.5, randomItems[i].y + 10);
                        buffer.lineTo(randomItems[i].x + 7.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x + 8.75, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x + 10, randomItems[i].y - 10);
                    buffer.stroke();
                    buffer.fill();
                    buffer.closePath();
					break;
				}
				case 3:
				{	
					buffer.fillStyle = 'rgb(200, 200, 255)';
					buffer.shadowColor = 'rgb(200, 200, 255)';
					buffer.shadowBlur = 10;
						buffer.drawImage(itemImages[0], randomItems[i].x - (randomItems[i].width / 2), randomItems[i].y - (randomItems[i].height / 2), 25, 25);
					buffer.shadowBlur = 0;
					break;
				}
                default:break;
			}
		}
        buffer.lineWidth = 1;
	}
    
    this.drawMissiles = function()
    {
        for(var i = 0; i < missiles.length; i++)
        {
			switch(missiles[i].missileType)
			{
				case 0:
				{//Pea Shooter
					buffer.beginPath();
						buffer.strokeStyle = "rgb(255, 255, 255)";
						buffer.moveTo(missiles[i].x1, missiles[i].y1);
						buffer.lineTo(missiles[i].x2, missiles[i].y2);
						buffer.lineTo(missiles[i].x3, missiles[i].y3);
						buffer.lineTo(missiles[i].x1, missiles[i].y1);
						buffer.stroke();
					buffer.closePath();
					break;
				}
				case 1:
			    {//Pea Shooter Pro
					buffer.beginPath();
						buffer.strokeStyle = "rgb(255, 255, 255)";
						buffer.moveTo(missiles[i].x1, missiles[i].y1);
						buffer.lineTo(missiles[i].x2, missiles[i].y2);
						buffer.lineTo(missiles[i].x3, missiles[i].y3);
						buffer.lineTo(missiles[i].x1, missiles[i].y1);
						buffer.stroke();
					buffer.closePath();
					break;
				}
				case 2:
				{//Pea Shooter Ultra
					buffer.beginPath();
						buffer.strokeStyle = "rgb(255, 255, 255)";
						buffer.moveTo(missiles[i].x1, missiles[i].y1);
						buffer.lineTo(missiles[i].x2, missiles[i].y2);
						buffer.lineTo(missiles[i].x3, missiles[i].y3);
						buffer.lineTo(missiles[i].x1, missiles[i].y1);
						buffer.stroke();
					buffer.closePath();
					break;
				}
				case 50:
				{
					buffer.beginPath();
						buffer.strokeStyle = "rgb(255, 255, 0)";
						buffer.moveTo(missiles[i].x1, missiles[i].y1);
						buffer.lineTo(missiles[i].x2, missiles[i].y2);
						buffer.lineTo(missiles[i].x3, missiles[i].y3);
						buffer.lineTo(missiles[i].x1, missiles[i].y1);
						buffer.stroke();
					buffer.closePath();
					break;
				}
				case 51:
				{
					buffer.beginPath();
						buffer.strokeStyle = "rgb(255, 255, 0)";
						buffer.moveTo(missiles[i].x1, missiles[i].y1);
						buffer.lineTo(missiles[i].x2, missiles[i].y2);
						buffer.lineTo(missiles[i].x3, missiles[i].y3);
						buffer.lineTo(missiles[i].x1, missiles[i].y1);
						buffer.stroke();
					buffer.closePath();
					break;
				}
                case 52:
				{
					buffer.beginPath();
						buffer.strokeStyle = "rgb(0, 255, 255)";
						buffer.moveTo(missiles[i].x1, missiles[i].y1);
						buffer.lineTo(missiles[i].x2, missiles[i].y1);
						buffer.lineTo(missiles[i].x2, missiles[i].y2);
						buffer.lineTo(missiles[i].x1, missiles[i].y2);
                        buffer.lineTo(missiles[i].x1, missiles[i].y1);
						buffer.stroke();
					buffer.closePath();
					break;
				}
				case 100:
				{
					buffer.beginPath();
						buffer.strokeStyle = "rgb(0, 255, 0)";
						buffer.moveTo(missiles[i].x1, missiles[i].y1);
						buffer.lineTo(missiles[i].x2, missiles[i].y2);
						buffer.lineTo(missiles[i].x3, missiles[i].y3);
						buffer.lineTo(missiles[i].x1, missiles[i].y1);
						buffer.stroke();
					buffer.closePath();
					break;
				}
				case 101:
				{
					buffer.beginPath();
						buffer.strokeStyle = "rgb(0, 255, 0)";
						buffer.moveTo(missiles[i].x1, missiles[i].y1);
						buffer.lineTo(missiles[i].x2, missiles[i].y2);
						buffer.lineTo(missiles[i].x3, missiles[i].y3);
						buffer.lineTo(missiles[i].x1, missiles[i].y1);
						buffer.stroke();
					buffer.closePath();
					break;
				}
                case 102:
				{
					buffer.beginPath();
						buffer.strokeStyle = "rgb(0, 255, 0)";
						buffer.moveTo(missiles[i].x1, missiles[i].y1);
						buffer.lineTo(missiles[i].x2, missiles[i].y2);
						buffer.lineTo(missiles[i].x3, missiles[i].y3);
						buffer.lineTo(missiles[i].x1, missiles[i].y1);
						buffer.stroke();
					buffer.closePath();
					break;
				}
                case 103:
				{
					buffer.beginPath();
						buffer.strokeStyle = "rgb(0, 255, 0)";
						buffer.moveTo(missiles[i].x1, missiles[i].y1);
						buffer.lineTo(missiles[i].x2, missiles[i].y2);
						buffer.lineTo(missiles[i].x3, missiles[i].y3);
						buffer.lineTo(missiles[i].x1, missiles[i].y1);
						buffer.stroke();
					buffer.closePath();
					break;
				}
                case 104:
				{
					buffer.beginPath();
						buffer.strokeStyle = "rgb(0, 255, 0)";
						buffer.moveTo(missiles[i].x1, missiles[i].y1);
						buffer.lineTo(missiles[i].x2, missiles[i].y2);
						buffer.lineTo(missiles[i].x3, missiles[i].y3);
						buffer.lineTo(missiles[i].x1, missiles[i].y1);
						buffer.stroke();
					buffer.closePath();
					break;
				}
			}
        }
    }
    
	this.drawLaser = function()
	{
		/* Data
		this.laser = false;//true if laser is on
		this.laserX = this.x;
		this.laserY = this.y - 25;
		this.laserWidth = 20;
		this.laserHeight = this.y - 25;
		this.laserGlowWidth = 5;
		this.glowDirection = 0;//0=out, 1=in;
		*/
		buffer.shadowBlur = 20;
		buffer.shadowColor = 'rgb(0, 128, 255)';
		buffer.beginPath();
			buffer.fillStyle = "rgb(0, 128, 255)";
			buffer.fillRect(player.laserX - 10, player.laserY, player.laserWidth, player.laserHeight);
			buffer.fillStyle = "rgb(0, 200, 255)";
			buffer.fillRect(player.laserX - 5, player.laserY, player.laserWidth / 2, player.laserHeight);
		buffer.closePath();
		buffer.shadowBlur = 0;
	}
	
	this.drawBossLaser = function(x, y, width, height)
	{
		/* Data
		this.laser = false;//true if laser is on
		this.laserX = this.x;
		this.laserY = this.y - 25;
		this.laserWidth = 20;
		this.laserHeight = this.y - 25;
		*/
		buffer.shadowBlur = 10;
		buffer.shadowColor = 'rgb(255, 60, 0)';
		buffer.beginPath();
			buffer.fillStyle = 'rgb(255, 60, 0)';
			buffer.fillRect(x - 5, y, width, height);
		buffer.closePath();
		buffer.shadowBlur = 0;
	}
    
    this.drawExplosions = function()
    {
		buffer.fillStyle = "rgb(0, 0, 0)";
        for(a = 0; a < explosions.length; a++)
        {
            for(var i = 0; i < explosions[a].particles.length; i++)
            {
                var rand = Math.floor(Math.random() * 3) + explosions[a].particles[i].red;
                var rand1 = Math.floor(Math.random() * 3) + explosions[a].particles[i].green;
                var rand2 = Math.floor(Math.random() * 3) + explosions[a].particles[i].blue;
                
                var p = explosions[a].particles[i];
                var r = 255 - explosions[a].age * explosions[a].size / rand;
                var g = 255 - explosions[a].age * explosions[a].size / rand1;
                var b = 255 - explosions[a].age * explosions[a].size / rand2;
                //buffer.beginPath();
                    buffer.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                    var rand3 = Math.floor(Math.random() * 6) + 1;
                    buffer.fillRect(p.x, p.y, rand3, rand3);
                //buffer.closePath();
            }
        }
    }
	  
    this.drawHUD = function()
    {
		self.drawAmmoGui();
        self.drawLifeMeter();
        self.drawShieldMeter();
        self.drawFuelMeter();
		self.drawPlayerLives();
    }
	
	this.drawPlayerLives = function()
	{
		var xOffset = 0;
		for(var i = 0; i < player.lives; i++)
		{
			buffer.drawImage(playerImages[0], _buffer.width - (60 - xOffset), _buffer.height - 25, player.width / 2, player.height / 2);
			xOffset += 20;
		}
	}
	
	this.drawAmmoGui = function()
	{
		var rand_ammo = Math.floor(Math.random() * 100) + 128;
        var rand1_ammo = Math.floor(Math.random() * 100) + 128;
        var rand2_ammo = Math.floor(Math.random() * 100) + 128;
        var r_ammo = rand_ammo;
        var g_ammo = rand1_ammo;
        var b_ammo = rand2_ammo;
		
		this.x = 20;
		this.y = _buffer.height - 95;
		buffer.beginPath();
		buffer.fillStyle = "rgb(" + r_ammo + ", " + g_ammo + ", " + b_ammo + ")";
		buffer.strokeStyle = "rgb(128, 128, 128)";
			buffer.moveTo(this.x - 10, this.y - 10);
			buffer.lineTo(this.x - 8.75, this.y - 10);
			buffer.lineTo(this.x - 7.5, this.y - 5);
			buffer.lineTo(this.x - 7.5, this.y + 10);
			buffer.lineTo(this.x - 12.5, this.y + 10);
			buffer.lineTo(this.x - 12.5, this.y - 5);
			buffer.lineTo(this.x - 11.25, this.y - 10);
			buffer.lineTo(this.x - 10, this.y - 10);

			buffer.moveTo(this.x, this.y - 10);
			buffer.lineTo(this.x + 1.25, this.y - 10);
			buffer.lineTo(this.x + 2.5, this.y - 5);
			buffer.lineTo(this.x + 2.5, this.y + 10);
			buffer.lineTo(this.x - 2.5, this.y + 10);
			buffer.lineTo(this.x - 2.5, this.y - 5);
			buffer.lineTo(this.x - 1.25, this.y - 10);
			buffer.lineTo(this.x, this.y - 10);

			buffer.moveTo(this.x + 10, this.y - 10);
			buffer.lineTo(this.x + 11.25, this.y - 10);
			buffer.lineTo(this.x + 12.5, this.y - 5);
			buffer.lineTo(this.x + 12.5, this.y + 10);
			buffer.lineTo(this.x + 7.5, this.y + 10);
			buffer.lineTo(this.x + 7.5, this.y - 5);
			buffer.lineTo(this.x + 8.75, this.y - 10);
			buffer.lineTo(this.x + 10, this.y - 10);
		buffer.stroke();
		buffer.fill();
		buffer.closePath();
		
		var guiText  = new GUIText("x" + player.secondaryAmmo, this.x + 15, this.y - 6, 
                                    "18px Helvetica", "left", "top", "rgb(230, 230, 255)");
		buffer.beginPath();
			buffer.fillStyle = guiText.color;
			buffer.font = guiText.fontStyle;
			buffer.textAlign = guiText.alignX;
			buffer.textBaseline = guiText.alignY;
			buffer.fillText(guiText.text, guiText.x, guiText.y);
		buffer.closePath();
	}
    
    this.drawLifeMeter = function()
    {
        var width = 100;
        var height = 15;
        var x1 = 0;
        var y1 = _buffer.height - 25;
        var x2 = width;
        var y2 = y1 + height;
		var red

        var grd = buffer.createLinearGradient(x1, y1, x2, y2);
        grd.addColorStop(0, "rgb("+ ((player.maxLife - player.life) * 2) +", 0, 0)");
        grd.addColorStop(1, "rgb(0, "+ (255 -((player.maxLife - player.life) * 2)) +", 0)");
		buffer.beginPath();
            buffer.fillStyle = grd;
            buffer.fillRect(x1, y1, player.life, height);
        buffer.closePath();

        buffer.beginPath();
            buffer.strokeStyle = "rgb(255, 255, 255)";
                buffer.moveTo(x1, y1);
                buffer.lineTo(x2, y1);
                buffer.lineTo(x2, y2);
                buffer.lineTo(x1, y2);
                buffer.lineTo(x1, y1);
            buffer.stroke();
        buffer.closePath();
		
    }
    
    this.drawShieldMeter = function()
    {
		if(player.hasShield)
		{
			var width = 100;
			var height = 15;
			var x1 = 0;
			var y1 = _buffer.height - 50;
			var x2 = width;
			var y2 = y1 + height;
	
			var grd = buffer.createLinearGradient(x1, y1, x2, y2);
			grd.addColorStop(0, "rgb(0, 0, 255)");
			grd.addColorStop(1, "rgb(0, 192, 255)");
			buffer.beginPath();
				buffer.fillStyle = grd;
				buffer.fillRect(x1, y1, player.shield / player.shieldLevel, height);
			buffer.closePath();
			
			buffer.beginPath();
				buffer.strokeStyle = "rgb(255, 255, 255)";
					buffer.moveTo(x1, y1);
					buffer.lineTo(x2, y1);
					buffer.lineTo(x2, y2);
					buffer.lineTo(x1, y2);
					buffer.lineTo(x1, y1);
				buffer.stroke();
			buffer.closePath();
		}
    }
    
    this.drawFuelMeter = function()
    {
        var width = 100;
        var height = 15;
        var x1 = 0;
        var y1 = _buffer.height - 75;
        var x2 = width;
        var y2 = y1 + height;

        buffer.beginPath();
            buffer.fillStyle = "rgba(80, 73, 113, 0.5)";
            buffer.fillRect(x1, y1, width, height);
        buffer.closePath();
        
        var grd = buffer.createLinearGradient(x1, y1, x2, y2);
        grd.addColorStop(0, "rgb(80, 73, 113)");
        grd.addColorStop(1, "rgb(148, 116, 180)");
		buffer.beginPath();
            buffer.fillStyle = grd;
            buffer.fillRect(x1, y1, (player.currentFuel / player.MAX_FUEL) * width, height);
        buffer.closePath();
        
        buffer.beginPath();
            buffer.strokeStyle = "rgb(255, 255, 255)";
                buffer.moveTo(x1, y1);
                buffer.lineTo(x2, y1);
                buffer.lineTo(x2, y2);
                buffer.lineTo(x1, y2);
                buffer.lineTo(x1, y1);
            buffer.stroke();
        buffer.closePath();
    }
    
    this.drawGUI = function()
    {
		//State GUIs
		// 0 = Main Menu
		// 1 = Pause Menu
		// 2 = Level Up Menu
		// 3 = Game Over Menu
		//Non-State Guis
		// Debug
		// Life & other ingame info(can't be on any state gui's)
		
		//Draw State Gui's
		var guiText = [];
		switch(currentGui)
		{
			case 0:
			{// Main Menu
				guiText[0] = new GUIText("Kill All the Things!", _canvas.width / 2, _canvas.height / 2 - 100, 
										 "28px Helvetica", "center", "top", "rgb(255, 0, 255)");
				guiText[1] = new GUIText("Start New Game", _canvas.width / 2, _canvas.height / 2, "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
				if(mouseX > (_canvas.width / 2 + 10) - 115 && mouseX < (_canvas.width / 2 + 10) + 100 && mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					guiText[1] = new GUIText("Start New Game", _canvas.width / 2, _canvas.height / 2, "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
				}
				guiText[2] = new GUIText("Options", _canvas.width / 2, (_canvas.height / 2) + 50, "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
				if(mouseX > (_canvas.width / 2 + 10) - 65 && mouseX < (_canvas.width / 2 + 10) + 40 && mouseY < (_canvas.height / 2 + 60) + 20 && mouseY > (_canvas.height / 2 + 60) - 10)
				{
					guiText[2] = new GUIText("Options", _canvas.width / 2, (_canvas.height / 2) + 50, "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
				}
				break;
			}
			case 1:
			{// Pause Menu
				guiText[0] = new GUIText("Paused", _canvas.width / 2, _canvas.height / 2 - 125,
										 "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
				break;
			}
			case 2:
			{// Upgrade Menu
                //**********************************************************************//
                //						UPGRADE MENU SECTION							//
                //**********************************************************************//

                //Static Text
                guiText[0] = new GUIText("Missions", 10, 10, 
                                    "18px Helvetica", "left", "top", "rgb(230, 230, 255)");
                guiText[1] = new GUIText("Main Weapon [space]", 10, _canvas.height / 2 - 50, 
                                    "18px Helvetica", "left", "top", "rgb(230, 230, 255)");
                guiText[2] = new GUIText("Secondary Weapon [B]", 10, 420, 
                                    "18px Helvetica", "left", "top", "rgb(230, 230, 255)");
                guiText[3] = new GUIText("Cores: " + player.money, _canvas.width - 100, _canvas.height - 53, 
                                    "18px Helvetica", "left", "top", "rgb(230, 230, 255)");
                guiText[4] = new GUIText("Extra Items", _canvas.width - 300, 420, 
                                    "18px Helvetica", "left", "top", "rgb(230, 230, 255)");
                guiText[7] = new GUIText("Level " + gco.level, 5, _buffer.height / 2 - 75, 
                                    "18px Helvetica", "left", "top", "rgb(230, 230, 255)");
				guiText[8] = new GUIText(player.shieldLevel, _canvas.width - 271, 448, 
                                    "18px Helvetica", "left", "top", "rgb(0, 0, 0)");
				guiText[9] = new GUIText(player.secondaryAmmoLevel, _canvas.width - 221, 448, 
                                    "18px Helvetica", "left", "top", "rgb(0, 0, 0)");


//**********************************************************************//
//					    MISSION MENU SECTION							//
//**********************************************************************//
                var drawX = 10;
                var drawY = 50;
                var j = 0;
                for(var i = 0; i < gco.levelMission.objectives.length; i++)
                {
                    j++;
                    var outText = "";
                    switch(i)
                    {//Case Cooresponds to enemy types, enemy type missions cooresponds to level.
                        case 0:{outText += "Drone Kills: "; break;}
                        case 1:{outText += "Weaver Kills: "; break;}
                        case 2:{outText += "Kamakaze Kills: "; break;}
                        case 3:{outText += "Splitter Kills: "; break;}
                        case 4:{outText += "Teleporter Kills: "; break;}
						case 5:{outText += "Drone Core... Time to Kill all the Things! Ready yourself, there is no turning back! "; break;}
                        default:{outText += "Level Not Added: "; break;}
                    }
					if(i != 5)
					{
						gco.missionText[i] = new GUIText(outText + gco.levelMission.progress[i] + "/" + gco.levelMission.objectives[i],
                                        drawX, drawY, "16px Helvetica", "left", "top", "rgb(230, 230, 255)");
					} else
					{
						gco.missionText[i] = new GUIText(outText, drawX, drawY, "16px Helvetica", "left", "top", "rgb(230, 230, 255)");
					}
                    if(j == 4)
                    {
                        j = 0;
                        drawY = 50;
                        drawX += 200;
                    } else
                    {
                        drawY += 35;
                    }
                }
//**********************************************************************//
//					   END MISSION MENU SECTION							//
//**********************************************************************//
									
				var xDrawOffset = 160;
                buffer.beginPath();
                for(var i = 0; i < gco.missionText.length; i++)
                {
                    buffer.fillStyle = gco.missionText[i].color;
                    buffer.font = gco.missionText[i].fontStyle;
                    buffer.textAlign = gco.missionText[i].alignX;
                    buffer.textBaseline = gco.missionText[i].alignY;
                    buffer.fillText(gco.missionText[i].text, gco.missionText[i].x, gco.missionText[i].y);
					switch(i){
						case 0:{ buffer.drawImage(enemyImages[0], gco.missionText[i].x + xDrawOffset, gco.missionText[i].y - 5, enemyImages[0].width, enemyImages[0].height); break;}
						case 1:{ buffer.drawImage(enemyImages[2], gco.missionText[i].x + xDrawOffset, gco.missionText[i].y - 5, enemyImages[2].width, enemyImages[2].height); break;}
						case 2:{ buffer.drawImage(enemyImages[4], gco.missionText[i].x + xDrawOffset, gco.missionText[i].y - 5, enemyImages[4].width, enemyImages[4].height); break;}
						case 3:{ buffer.drawImage(enemyImages[6], gco.missionText[i].x + xDrawOffset, gco.missionText[i].y - 5, enemyImages[6].width, enemyImages[6].height); break;}
						case 4:{ buffer.drawImage(enemyImages[11], gco.missionText[i].x + xDrawOffset, gco.missionText[i].y - 5, enemyImages[11].width, enemyImages[11].height); break;}
					}
                }
                buffer.closePath();
            // Level Progress Meter
                var LPM_width = _buffer.width;
                var LPM_height = 20;
                var LPM_x1 = 0;
                var LPM_y1 = _buffer.height / 2 - 75;
                var LPM_x2 = LPM_width;
                var LPM_y2 = LPM_y1 + LPM_height;

                buffer.beginPath();
                    buffer.fillStyle = "rgba(0, 192, 255, 0.5)";
                    buffer.fillRect(LPM_x1, LPM_y1, LPM_width, LPM_height);
                buffer.closePath();
                var LPM_grd = buffer.createLinearGradient(LPM_x1, LPM_y1, LPM_x2, LPM_y2);
                LPM_grd.addColorStop(0, "rgb(0, 0, 255)");
                LPM_grd.addColorStop(1, "rgb(0, 192, 255)");
                buffer.beginPath();
                    buffer.fillStyle = LPM_grd;
                    buffer.fillRect(LPM_x1, LPM_y1, LPM_width * gco.levelProgress, LPM_height);
                buffer.closePath();
                
                buffer.beginPath();
                    buffer.strokeStyle = "rgb(255, 255, 255)";
                        buffer.moveTo(LPM_x1, LPM_y1);
                        buffer.lineTo(LPM_x2, LPM_y1);
                        buffer.lineTo(LPM_x2, LPM_y2);
                        buffer.lineTo(LPM_x1, LPM_y2);
                        buffer.lineTo(LPM_x1, LPM_y1);
                    buffer.stroke();
                buffer.closePath();

                
                if(mouseX > (_canvas.width - 175) && mouseX < (_canvas.width - 25) && mouseY < (280) && mouseY > (250))
                {//Start Level
                    guiText[5] = new GUIText("Start Level", _canvas.width - 100, 250, 
                                         "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
                    if(player.weapon == 49){guiText[guiText.length] = new GUIText("Must equip main weapon", _canvas.width - 100, 280, 
                                         "12px Helvetica", "center", "top", "rgb(255, 50, 50)");}
                } else
                {
                    guiText[5] = new GUIText("Start Level", _canvas.width - 100, 250, 
                                         "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
                }

                guiText[6] = new GUIText("Click item to purchase.", _canvas.width / 2, _canvas.height - 33, 
                                    "12px Helvetica", "center", "top", "rgb(230, 230, 255)");

                // GUI Icons
// NEW WEAPON Pea Shooter
                if(mouseX > 10 && mouseX < 58 && mouseY > 280 && mouseY < 328)
                {//Pea Shooter, Weapon ID: 0
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[0], 10, 280, 48, 48);    
                    buffer.shadowBlur = 0;
                    if(gco.weaponsOwned[0])
                    {
                        guiText[6].text = "You already own Pea Shooter.";
                    } else
                    {
                        guiText[6].text = "Pea Shooter costs 0 cores.";
                    }
                }
                if(gco.weaponsOwned[0] && player.weapon == 0)
                {
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[0], 10, 280, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[0], 10, 280, 48, 48);
					buffer.globalAlpha = 1.0;
                } 
                //END WEAPON

// NEW WEAPON Pea Shooter Pro
                if(mouseX > 60 && mouseX < 108 && mouseY > 280 && mouseY < 328)
                {//Pea Shooter Pro, Weapon ID: 1
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[1], 60, 280, 48, 48);
                    buffer.shadowBlur = 0;
                    if(gco.weaponsOwned[1])
                    {
                        guiText[6].text = "You already own Pea Shooter Pro.";
                    } else
                    {
                        guiText[6].text = "Pea Shooter Pro costs 25 cores.";
                    }
                }
                if(gco.weaponsOwned[1] && player.weapon == 1)
                {
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 150, 250)';
                    buffer.drawImage(images[1], 60, 280, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[1], 60, 280, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON
				
// NEW WEAPON Master Pea Shooter
                if(mouseX > 110 && mouseX < 158 && mouseY > 280 && mouseY < 328)
                {//Master Pea Shooter, Weapon ID: 2
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[7], 110, 280, 48, 48);
                    buffer.shadowBlur = 0;
                    if(gco.weaponsOwned[2])
                    {
                        guiText[6].text = "You already own Master Pea Shooter.";
                    } else
                    {
                        guiText[6].text = "Master Pea Shooter costs 250 cores.";
                    }
                }
                if(gco.weaponsOwned[2] && player.weapon == 2)
                {
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 150, 250)';
                    buffer.drawImage(images[7], 110, 280, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[7], 110, 280, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON

// NEW WEAPON Boom Bullet
                if(mouseX > 10 && mouseX < 58 && mouseY > 448 && mouseY < 496)
                {//Boom Bullet, Weapon ID: 50
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[2], 10, 448, 48, 48);
                    buffer.shadowBlur = 0;
                    if(gco.weaponsOwned[50])
                    {
                        guiText[6].text = "You already own Boom Bullet.";
                    } else
                    {
                        guiText[6].text = "Boom Bullet costs 50 cores.";
                    }
                }
                if(gco.weaponsOwned[50] && player.secondary == 50)
                {
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[2], 10, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[2], 10, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }

                //END WEAPON

// NEW WEAPON Friendly Boom Bullet
                if(mouseX > 60 && mouseX < 108 && mouseY > 448 && mouseY < 496)
                {//Friendly Boom Bullet, Weapon ID: 51
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[3], 60, 448, 48, 48);
                    buffer.shadowBlur = 0;
                    if(gco.weaponsOwned[51])
                    {
                        guiText[6].text = "You already own Friendly Boom Bullet.";
                    } else
                    {
                        guiText[6].text = "Friendly Boom Bullet costs 100 cores.";
                    }
                }
                if(gco.weaponsOwned[51] && player.secondary == 51)
                {
					buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[3], 60, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[3], 60, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON

// NEW WEAPON Space Mine
                if(mouseX > 110 && mouseX < 158 && mouseY > 448 && mouseY < 496)
                {//Friendly Boom Bullet, Weapon ID: 52
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[8], 110, 448, 48, 48);
                    buffer.shadowBlur = 0;
                    if(gco.weaponsOwned[52])
                    {
                        guiText[6].text = "You already own Space Mine.";
                    } else
                    {
                        guiText[6].text = "Space Mine costs 250 cores.";
                    }
                }
                if(gco.weaponsOwned[52] && player.secondary == 52)
                {
					buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[8], 110, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[8], 110, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON
				
// NEW WEAPON Laser
                if(mouseX > 160 && mouseX < 208 && mouseY > 448 && mouseY < 496)
                {//Laser: Weapon ID: 9000
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[10], 160, 448, 48, 48);
                    buffer.shadowBlur = 0;
                    if(gco.ownLaser)
                    {
                        guiText[6].text = "You already own the Phaser Laser.";
                    } else
                    {
                        guiText[6].text = "Phaser Laser costs 500 cores.";
                    }
                }
                if(gco.ownLaser && player.secondary == 9000)
                {
					buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[10], 160, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[10], 160, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON
				
// NEW POWERUP Shield
                if(mouseX > _canvas.width - 300 && mouseX < _canvas.width - 252 && mouseY > 448 && mouseY < 496)
                {//Shield
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[4], _canvas.width - 300, 448, 48, 48);
                    buffer.shadowBlur = 0;
                    if(player.hasShield)
                    {
                        guiText[6].text = "Your shield is level " + player.shieldLevel + ". Upgrade for " + (player.shieldLevel + 1) * 250 + " cores.";
                    } else
                    {
                        guiText[6].text = "A Shield costs 250 cores.";
                    }
                }
                if(player.hasShield)
                {
					buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[4], _canvas.width - 300, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[4], _canvas.width - 300, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON

// NEW POWERUP Max Ammo
                if(mouseX > _canvas.width - 250 && mouseX < _canvas.width - 202 && mouseY > 448 && mouseY < 496)
                {//Max Ammo
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[5], _canvas.width - 250, 448, 48, 48);
                    buffer.shadowBlur = 0;
                    guiText[6].text = "Ammo Level: " + player.secondaryAmmoLevel + "  Max Secondary Ammo: " + player.maxSecondaryAmmo + ". Upgrade for " + (player.secondaryAmmoLevel + 1) * 50 + " cores.";
                }
                if(player.secondaryAmmoLevel > 1)
                {
					buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[5], _canvas.width - 250, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[5], _canvas.width - 250, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON
			
// NEW POWERUP Buy Secondary Ammo
                if(mouseX > _canvas.width - 200 && mouseX < _canvas.width - 152 && mouseY > 448 && mouseY < 496)
                {//Buy Secondary Ammo
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[6], _canvas.width - 200, 448, 48, 48);
                    buffer.shadowBlur = 0;
					if(player.secondaryAmmo < player.maxSecondaryAmmo)
					{
                    	guiText[6].text = "Secondary Ammo: " + player.secondaryAmmo + "  Max Secondary Ammo: " + player.maxSecondaryAmmo + ". +25 Ammo for " + gco.secondaryAmmoPrice + " cores.";
					} else
					{
						guiText[6].text = "Secondary Ammo full.";
					}
                }
                if(player.secondaryAmmo < player.maxSecondaryAmmo)
                {
					buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[6], _canvas.width - 200, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[6], _canvas.width - 200, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON
				
// NEW POWERUP Buy Fill Health
                if(mouseX > _canvas.width - 150 && mouseX < _canvas.width - 102 && mouseY > 448 && mouseY < 496)
                {//Buy Fill Health
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[9], _canvas.width - 150, 448, 48, 48);
                    buffer.shadowBlur = 0;
					if(player.life < 100)
					{
                    	guiText[6].text = "Hull(" + player.life + "/100) Repair Hull: " + ((100 - player.life) * 2) + " cores.";
					} else
					{
						guiText[6].text = "Hull is operating at 100%";
					}
                }
                if(player.life < 100)
                {
					buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[9], _canvas.width - 150, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[9], _canvas.width - 150, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON

				// Options Menu Selection
				if(mouseX > (_canvas.width - 160) && mouseX < (_canvas.width - 35) && mouseY < (55) && mouseY > (15))
                {//Options Menu
                    guiText[10] = new GUIText("Options", _canvas.width - 100, 20, "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
                } else
                {
                    guiText[10] = new GUIText("Options", _canvas.width - 100, 20, "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
                }
				
				guiText[11] = new GUIText("Score: " + score, 10, _canvas.height - 53, "18px Helvetica", "left", "top", "rgb(230, 230, 255)");
//**********************************************************************//
//					  END UPGRADE MENU SECTION							//
//**********************************************************************//
                break;
			}
			case 3:
			{// Continue Menu
				guiText[0] = new GUIText("You Died! :(", _canvas.width / 2, _canvas.height / 2 - 100, 
										 "28px Helvetica", "center", "top", "rgb(255, 0, 0)");
										 
        		if(mouseX > (_canvas.width / 2 + 10) - 75 && mouseX < (_canvas.width / 2 + 10) + 60 &&
				   mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					guiText[1] = new GUIText("Continue", _canvas.width / 2, _canvas.height / 2, 
										 "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
				} else
				{
					guiText[1] = new GUIText("Continue", _canvas.width / 2, _canvas.height / 2, 
										 "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
				}
				break;
			}
			case 4:
			{// Level Up Menu
				guiText[0] = new GUIText("Level Up! Now on level: " + (gco.level + 1), _canvas.width / 2, _canvas.height / 2 - 100, 
										 "28px Helvetica", "center", "top", "rgb(255, 0, 0)");
										 
        		if(mouseX > (_canvas.width / 2 + 10) - 75 && mouseX < (_canvas.width / 2 + 10) + 60 &&
				   mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					guiText[1] = new GUIText("Continue", _canvas.width / 2, _canvas.height / 2, 
										 "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
				} else
				{
					guiText[1] = new GUIText("Continue", _canvas.width / 2, _canvas.height / 2, 
										 "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
				}
				break;
			}
			case 5:
			{// Game Over Menu
				guiText[0] = new GUIText("Game Over", _canvas.width / 2, _canvas.height / 2 - 100, 
										 "28px Helvetica", "center", "top", "rgb(255, 0, 0)");
										 
        		if(mouseX > (_canvas.width / 2 + 10) - 75 && mouseX < (_canvas.width / 2 + 10) + 60 && mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					guiText[1] = new GUIText("Title Screen", _canvas.width / 2, _canvas.height / 2, "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
				} else
				{
					guiText[1] = new GUIText("Title Screen", _canvas.width / 2, _canvas.height / 2, "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
				}
				break;
			}
			case 6:
			{//Options Menu
				guiText[0] = new GUIText("Options", _canvas.width / 2, 25, "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
				guiText[1] = new GUIText("Back", 10, _canvas.height - 35, "28px Helvetica", "left", "top", "rgb(96, 150, 96)");
				if(mouseX > 0 && mouseX < 90 && mouseY < _canvas.height && mouseY > _canvas.height - 45)
				{
					guiText[1] = new GUIText("Back", 10, _canvas.height - 35, "28px Helvetica", "left", "top", "rgb(96, 255, 96)");
				}
				//particleOffset
				guiText[2] = new GUIText("Particles", 10, 55, "20px Helvetica", "left", "top", "rgb(96, 150, 96)");
				guiText[3] = new GUIText("<", 10, 80, "26px Helvetica", "left", "top", "rgb(96, 150, 96)");
				if(mouseX > 0 && mouseX < 47 && mouseY < 105 && mouseY > 75) {
					guiText[3] = new GUIText("<", 10, 80, "26px Helvetica", "left", "top", "rgb(96, 255, 96)");
				}
				guiText[4] = new GUIText(">", 72, 80, "26px Helvetica", "left", "top", "rgb(96, 150, 96)");
				if(mouseX >= 47 && mouseX < 95 && mouseY < 105 && mouseY > 75) {
					guiText[4] = new GUIText(">", 72, 80, "26px Helvetica", "left", "top", "rgb(96, 255, 96)");
				}
				switch(particleOffset)
				{
					case 1:{guiText[5] = new GUIText("5", 43, 80, "26px Helvetica", "left", "top", "rgb(255, 0, 0)");
							guiText[6] = new GUIText("OMFG SPARKLES!", 51, 110, "10px Helvetica", "center", "top", "rgb(255, 0, 0)");break;}
					case 2:{guiText[5] = new GUIText("4", 43, 80, "26px Helvetica", "left", "top", "rgb(200, 25, 0)");
							guiText[6] = new GUIText("Shinies!", 51, 110, "10px Helvetica", "center", "top", "rgb(200, 55, 0)");break;}
					case 3:{guiText[5] = new GUIText("3", 43, 80, "26px Helvetica", "left", "top", "rgb(150, 100, 20)");
							guiText[6] = new GUIText("Less Shinies.", 51, 110, "10px Helvetica", "center", "top", "rgb(150, 100, 20)");break;}
					case 4:{guiText[5] = new GUIText("2", 43, 80, "26px Helvetica", "left", "top", "rgb(120, 200, 60)");
							guiText[6] = new GUIText("Needs Shinies :(", 51, 110, "10px Helvetica", "center", "top", "rgb(120, 200, 60)");break;}
					case 5:{guiText[5] = new GUIText("1", 41, 80, "26px Helvetica", "left", "top", "rgb(96, 255, 96)");
							guiText[6] = new GUIText("Need new computer...", 51, 110, "10px Helvetica", "center", "top", "rgb(96, 255, 96)");break;}
				}
				break;
			}
			case 7:
			{// Submit Score Menu
				guiText[0] = new GUIText("Score: " + score + "  Kills: " + enemiesKilled + "  Cores: " + totalCores + "  Items Used: " + itemsUsed, _canvas.width / 2, _canvas.height / 2 - 100, 
										 "20px Helvetica", "center", "top", "rgb(255, 0, 0)");
										 
        		if(mouseX > (_canvas.width / 2 + 10) - 75 && mouseX < (_canvas.width / 2 + 10) + 60 && mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					guiText[1] = new GUIText("Submit Score", _canvas.width / 2, _canvas.height / 2, "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
				} else
				{
					guiText[1] = new GUIText("Submit Score", _canvas.width / 2, _canvas.height / 2, "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
				}
				break;
			}
			default:{break;}
		}
		buffer.beginPath();
		for(var i = 0; i < guiText.length; i++)
        {
			buffer.fillStyle = guiText[i].color;
			buffer.font = guiText[i].fontStyle;
			buffer.textAlign = guiText[i].alignX;
			buffer.textBaseline = guiText[i].alignY;
			buffer.fillText(guiText[i].text, guiText[i].x, guiText[i].y);
		}
		buffer.closePath();
		delete guiText;
		if(!gco.win)
		{//Stateless Menu Items
			var guiText = [];
			//Debug
			if(debug)
			{
				guiText[0] = new GUIText("Shot: " + player.totalMissiles, 32, 32, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[1] = new GUIText("In Air: " + missiles.length, _canvas.width - 100, 32, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[2] = new GUIText("Enemies: " + enemies.length, _canvas.width - 250, 32, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[3] = new GUIText("Explosions: " + explosions.length, _canvas.width - 150, _canvas.height - 32, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[4] = new GUIText("FPS: " + FPS, 182, 32, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[5] = new GUIText("Seconds: " + seconds, 182, 52, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[6] = new GUIText("Tick: " + ticks, 182, 72, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				buffer.beginPath();
				for(var i = 0; i < guiText.length; i++)
				{
					buffer.fillStyle = guiText[i].color;
					buffer.font = guiText[i].fontStyle;
					buffer.textAlign = guiText[i].alignX;
					buffer.textBaseline = guiText[i].alignY;
					buffer.fillText(guiText[i].text, guiText[i].x, guiText[i].y);
				}
				buffer.closePath();
			}
			delete guiText;
			//End Debug
			
			// Player Info
			var guiText = [];
			if(playerInfo)
			{
				guiText[0] = new GUIText("Fuel: " + player.currentFuel, 105, _canvas.height - 78, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[1] = new GUIText("Shield: " + Math.floor(player.shield), 105, _canvas.height - 53, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[2] = new GUIText("Hull: " + player.life, 105, _canvas.height - 28, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[3] = new GUIText("Destroyed: " + destroys, _canvas.width / 2, _canvas.height - 32, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[4] = new GUIText("Cores: " + player.money, _canvas.width / 2, _canvas.height - 53, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[5] = new GUIText("Score: " + score, _canvas.width - 100, 20, "12px Helvetica", "left", "top", "rgb(96, 255, 96)");
			} else
			{
				if(gameState == 1)
				{
					guiText[0] = new GUIText("[E] Player Info", 105, _canvas.height - 28, 
											 "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				}
			}
			buffer.beginPath();
				for(var i = 0; i < guiText.length; i++)
				{
					buffer.fillStyle = guiText[i].color;
					buffer.font = guiText[i].fontStyle;
					buffer.textAlign = guiText[i].alignX;
					buffer.textBaseline = guiText[i].alignY;
					buffer.fillText(guiText[i].text, guiText[i].x, guiText[i].y);
				}
			buffer.closePath();
		}
		delete guiText;
		// End Player Info
    }
    
    /******************************************************/
    
    
    /******************************************************/
    // Game Loop
    /******************************************************/
    
    this.Loop = function()
    {
        frame++;
        var curTime = Date.now();
        elapsedTime = curTime - prevTime;
        prevTime = curTime;

        delta = elapsedTime / 1000;

        tickTime += delta;
        if(tickTime >= (ticks / 20))
        {
            ticks++;
            if(ticks >= 20)
            {
                tickTime = 0;
                ticks = 0;
                seconds++;
            }
        }
        if(ticks % 5 == 0)
        {
            FPS = Math.floor(1 / delta);
        }
		
        self.Update();
        self.Draw();	
    }
    
    /******************************************************/
}