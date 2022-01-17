function()
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