function()
		{
			this.levelMission.GenerateObjectives();
			
			this.weaponsOwned[0] = false;//Pea Shooter
			this.weaponsOwned[1] = false;//Pea Shooter Pro
			this.weaponsOwned[2] = false;//Master Pea Shooter
			this.weaponsOwned[50] = false;//Missile
			this.weaponsOwned[51] = false;//Homing Missile
            this.weaponsOwned[52] = false;//Space Mine
			
			this.weaponPrice[0] = 0;//Pea Shooter
			this.weaponPrice[1] = 25;//Pea Shooter Pro
			this.weaponPrice[2] = 250;//Master Pea Shooter
			this.weaponPrice[50] = 50;//Missile
			this.weaponPrice[51] = 100;//Homing Missile
            this.weaponPrice[52] = 250;//Space Mine
		}