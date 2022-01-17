function(stopfx)
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
			}
		}