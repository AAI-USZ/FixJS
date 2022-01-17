function(itemNumber)
		{
			switch(itemNumber)
			{
				case 0:
				{//Shield
					player.money -= (player.shieldLevel + 1) * 250;
					player.upgradeShield();break;
				}
				case 1:
				{//Fuel
					break;
				}
				case 2:
				{//Secondary Ammo Level
					player.money -= (player.secondaryAmmoLevel + 1) * 50;
					player.upgradeSecondaryAmmo();
					break;
				}
				case 3:
				{//Extra Secondary Ammo
					player.money -= this.secondaryAmmoPrice;
					player.secondaryAmmo += 25;
					if(player.secondaryAmmo > player.maxSecondaryAmmo){player.secondaryAmmo = player.maxSecondaryAmmo;}
				}
				case 4:
				{
					player.money -= ((100 - player.life) * 2);
					player.life = 100;
				}
			}
		}