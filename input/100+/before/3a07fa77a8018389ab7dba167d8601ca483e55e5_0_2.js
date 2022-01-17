function()
    {
        if(levelStart)
        {
            bgm.play();
        }
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
				
        if(gameState == 1)
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
                
                for(var i = 0; i < missiles.length; i++){ missiles[i].Update(i); }
                
                for(var i = 0; i < enemies.length; i++)
                {
                    if(enemies[i].Update() != 0)
                    {
						mon = new MoneyEntity(enemies[i].Cores, enemies[i].x, enemies[i].y);
						money.push(mon);
                        self.popArray(enemies, i);
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
                            if(self.Collision(player, enemies[a]))
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
                else
                {
                    colSwap = true;
                }
            }
        }
    }