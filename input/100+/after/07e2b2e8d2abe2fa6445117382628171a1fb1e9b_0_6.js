function(i)
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