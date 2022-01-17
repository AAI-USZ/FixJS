function()
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