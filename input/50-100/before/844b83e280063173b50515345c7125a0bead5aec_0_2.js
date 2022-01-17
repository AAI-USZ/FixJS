function(playfx)
		{
			switch(playfx)
			{
				case 0: {//Explode
					this.explosion.channel[this.explosion.index].play();
					this.explosion.index += 1; if(this.explosion.index > (this.explosion.channels - 1)){this.explosion.index = 0;}
				}
				case 1: {//Laser
					this.laser.play();
					this.laserPlaying = true;
				}
			}
		}