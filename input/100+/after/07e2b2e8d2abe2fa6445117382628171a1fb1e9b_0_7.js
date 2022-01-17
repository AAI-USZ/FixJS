function()
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