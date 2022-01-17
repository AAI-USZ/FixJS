function(stopfx)
		{
			switch(stopfx)
			{
				case 0: {//Explode
				}
				case 1: {//Laser
					this.laser.pause();
					this.laserPlaying = false;
				}
			}
		}