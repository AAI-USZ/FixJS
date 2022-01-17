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