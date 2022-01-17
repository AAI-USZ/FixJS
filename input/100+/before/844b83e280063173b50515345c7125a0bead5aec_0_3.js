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
		
		//Special Init logic
		this.missileTarget = 1000;//missile target will remain 1000 is no target selected
		switch(this.missileType)
		{
			case 2:
			{
				if(this.damage == 3){this.sinOffset = -1;}	
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
		}
		
        this.Update = function(i)
        {
			this.timeAlive += delta;
			if(this.y < 0)
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
			}
        }
    }