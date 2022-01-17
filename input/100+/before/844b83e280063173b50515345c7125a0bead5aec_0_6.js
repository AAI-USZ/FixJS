function doMouseClick(e)
	{
		//State GUIs
		// 0 = Main Menu
		// 1 = Pause Menu
		// 2 = Level Up Menu
		// 3 = Game Over Menu
		// 4 = Continue Menu
		switch(currentGui)
		{
			case 0:
			{//Main Menu
				if(mouseX > (_canvas.width / 2 + 10) - 115 && mouseX < (_canvas.width / 2 + 10) + 100 && mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					currentGui = 2;//default case will Trigger
				}
				if(mouseX > (_canvas.width / 2 + 10) - 65 && mouseX < (_canvas.width / 2 + 10) + 40 && mouseY < (_canvas.height / 2 + 60) + 20 && mouseY > (_canvas.height / 2 + 60) - 10)
				{
					currentGui = 6; lastGui = 0;	
				}
				break;
			}
			case 1:
			{//Pause Menu
				break;
			}
			case 2:
			{//Level up Menu
//**********************************************************************//
//						UPGRADE MENU SECTION							//
//**********************************************************************//
if(mouseX > (_canvas.width - 175) && mouseX < (_canvas.width - 25) && mouseY < (280) && mouseY > (250))
{//Start Level
	if(player.weapon != 49){ gco.StartLevel(); }
}
if(mouseX > (_canvas.width - 160) && mouseX < (_canvas.width - 35) && mouseY < (55) && mouseY > (15))
{//Options Menu
	currentGui = 6; lastGui = 2;
}
if(mouseX > 10 && mouseX < 58 && mouseY > 280 && mouseY < 328)
{//Pea Shooter, Weapon ID: 0
	if(gco.weaponsOwned[0]){ gco.EquipWeapon(0); } else { if(player.money >= gco.weaponPrice[0]){ gco.PurchaseWeapon(0); }}
}
if(mouseX > 60 && mouseX < 108 && mouseY > 280 && mouseY < 328)
{//Pea Shooter Pro, Weapon ID: 1
	if(gco.weaponsOwned[1]){ gco.EquipWeapon(1); } else { if(player.money >= gco.weaponPrice[1]){ gco.PurchaseWeapon(1); }}
}
if(mouseX > 110 && mouseX < 158 && mouseY > 280 && mouseY < 328)
{//Master Pea Shooter, Weapon ID: 2
	if(gco.weaponsOwned[2]){ gco.EquipWeapon(2); } else { if(player.money >= gco.weaponPrice[2]){ gco.PurchaseWeapon(2); }}
}
if(mouseX > 10 && mouseX < 58 && mouseY > 448 && mouseY < 496)
{//Boom Bullet, Weapon ID: 50
	if(gco.weaponsOwned[50]){ gco.EquipWeapon(50); } else { if(player.money >= gco.weaponPrice[50]){ gco.PurchaseWeapon(50); }}
}
if(mouseX > 60 && mouseX < 108 && mouseY > 448 && mouseY < 496)
{//Friendly Boom Bullet, Weapon ID: 51
	if(gco.weaponsOwned[51]){ gco.EquipWeapon(51); } else { if(player.money >= gco.weaponPrice[51]){ gco.PurchaseWeapon(51); }}
}
if(mouseX > 110 && mouseX < 158 && mouseY > 448 && mouseY < 496)
{//Space Mine, Weapon ID: 52
	if(gco.weaponsOwned[52]){ gco.EquipWeapon(52); } else { if(player.money >= gco.weaponPrice[52]){ gco.PurchaseWeapon(52); }}
}
if(mouseX > 160 && mouseX < 208 && mouseY > 448 && mouseY < 496)
{//Laser: Weapon ID: 9000
	if(gco.ownLaser){ gco.EquipWeapon(9000); } else { if(player.money >= gco.laserPrice){ gco.PurchaseWeapon(9000); } }
}
if(mouseX > _canvas.width - 300 && mouseX < _canvas.width - 252 && mouseY > 448 && mouseY < 496)
{//Shield
	if(player.money >= (player.shieldLevel + 1) * 250){gco.PurchaseExtras(0);}
}
if(mouseX > _canvas.width - 250 && mouseX < _canvas.width - 202 && mouseY > 448 && mouseY < 496)
{//Max Ammo
	if(player.money >= (player.secondaryAmmoLevel + 1) * 50){gco.PurchaseExtras(2);}
}
if(mouseX > _canvas.width - 200 && mouseX < _canvas.width - 152 && mouseY > 448 && mouseY < 496)
{//Buy Secondary Ammo
	if(player.money >= gco.secondaryAmmoPrice && player.secondaryAmmo < player.maxSecondaryAmmo){gco.PurchaseExtras(3);}
}
if(mouseX > _canvas.width - 150 && mouseX < _canvas.width - 102 && mouseY > 448 && mouseY < 496)
{//Buy Fill Health
	if(player.money >= ((100 - player.life) * 2)){gco.PurchaseExtras(4);}
}
//**********************************************************************//
//					  END UPGRADE MENU SECTION							//
//**********************************************************************//
				break;
			}
			case 3:
			{// Continue Menu
				if(mouseX > (_canvas.width / 2 + 10) - 75 && mouseX < (_canvas.width / 2 + 10) + 60 &&
				   mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					currentGui = NULL_GUI_STATE;
					self.softReset();
				}
				break;
			}
			case 4:
			{// Level Up Menu
				if(mouseX > (_canvas.width / 2 + 10) - 75 && mouseX < (_canvas.width / 2 + 10) + 60 &&
				   mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					self.softReset();
					gco.GoToUpgradeMenu();	
				}
				break;
			}
			case 5:
			{// Game Over Menu
				if(mouseX > (_canvas.width / 2 + 10) - 75 && mouseX < (_canvas.width / 2 + 10) + 60 &&
				   mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					currentGui = 0;
					gameState = 0;
					self.hardReset();
				}
				break;
			}
			case 6:
			{//Options Menu
				if(mouseX > 0 && mouseX < 90 && mouseY < _canvas.height && mouseY > _canvas.height - 45)
				{//Back
					currentGui = lastGui; lastGui = 6;
				}
				if(mouseX > 0 && mouseX < 47 && mouseY < 105 && mouseY > 75) {
					particleOffset += 1;
					if(particleOffset > 5){particleOffset = 5;}
				}
				if(mouseX >= 47 && mouseX < 95 && mouseY < 105 && mouseY > 75) {
					particleOffset -= 1;
					if(particleOffset < 1){particleOffset = 1;}
				}
			}
		}
	}