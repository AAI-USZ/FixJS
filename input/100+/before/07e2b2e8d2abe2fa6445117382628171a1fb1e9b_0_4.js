function()
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
                            
                            // Center boss
                            if(!this.inCenter)
                            {
                                if(this.x >= _buffer.width / 2)
                                {
                                    this.x -= this.xMoveSpeed * delta;
                                    this.xMoveSpeed = this.x - this.xstop;
                                    if(this.x - this.xstop < 15)
                                    {
                                        this.inCenter = true;
                                    }
                                }
                                else
                                {
                                    this.x += this.xMoveSpeed * delta;
                                    this.xMoveSpeed = this.xstop - this.x;
                                    if(this.x > this.xstop - 15)
                                    {
                                        this.inCenter = true;
                                    }
                                }
                            }
                            if(this.inCenter == true && Math.round(this.y) >= this.ystop)
                            {
                                this.phase++;
                                this.speed = 10;
                                this.startX = this.x;
                                this.startY = this.y;
                            }
/*
                            if(!this.didTeleport){this.y += this.speed * delta; this.speed = this.ystop - this.y;}
                            // Center boss
                            if(!this.inCenter){if(this.x >= _buffer.width / 2){this.x -= this.xMoveSpeed * delta; this.xMoveSpeed = this.x - this.xstop; if(this.x - this.xstop < 15){this.inCenter = true; this.phase = 2; this.speed = 10; this.startX = this.x; this.startY = this.y;}} else {this.x += this.xMoveSpeed * delta; this.xMoveSpeed = this.xstop - this.x; if(this.x > this.xstop - 15){this.inCenter = true; this.phase = 2; this.speed = 10; this.startX = this.x; this.startY = this.y;}}}
*/
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
                            if(this.laser)
                            {
                                if(!sfx.bossLaserPlaying){sfx.play(2);}
                                this.laserX = this.x;
                                this.laserY = this.y + 25;
                                this.laserHeight = _canvas.height - this.y + 25;
                            } else
                            {
                                if(sfx.bossLaserPlaying){sfx.pause(2);}
                            }
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
                            if(this.laser)
                            {
                                if(!sfx.bossLaserPlaying){sfx.play(2);}
                                this.laserX = this.x;
                                this.laserY = this.y + 25;
                                this.laserHeight = _canvas.height - this.y + 25;
                            } else
                            {
                                if(sfx.bossLaserPlaying){sfx.pause(2);}
                            }
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
                            if(this.x <= 50)
                            {
                                this.moveLeft = false;
                                
                            }
                            else if(this.x >= _buffer.width - 50)
                            {
                                this.moveLeft = true;
                            }
                            
                            if(this.moveLeft)
                            {
                                this.x -= (this.speed * 5) * delta;
                            }
                            else
                            {
                                this.x += (this.speed * 5) * delta;
                            }
                            
                            this.y = this.startY + (150 * Math.sin(this.speed * Math.PI * (this.waveLength / 2) * (this.timeAlive / 1000))) * this.sinOffset;
                        break;
                        }
                    }

					if(this.life <= 0)
					{
						destroys += 1;
                        this.phase++;
						explosion = new Explosion(this.x, this.y, 75, 4, 200, 3, 3, 3);
						explosions.push(explosion);
						this.speed = 10;
                        this.doRealMovement = false;
						if(sfx.bossLaserPlaying){ sfx.pause(2); }
						this.startX = this.x;
						this.startY = this.y;
						this.circleYStop = this.y + 25;
                        if(this.phase >= 5)
                        {
                            //Update Mission Data
                            gco.levelMission.UpdateProgress(this.type);
                            gco.win = true;
                            return 3;
                        }
                        else
                        {
							this.laser = false;
                            this.startX = this.x;
                            this.startY = this.y;
                            this.life = 500 * this.phase;
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