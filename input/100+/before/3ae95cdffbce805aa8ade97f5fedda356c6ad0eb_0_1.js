function()
    {
		//State GUIs
			// 0 = Main Menu
            // 1 = Pause Menu
            // 2 = Level Up Menu
            // 3 = Continue Menu
            // 4 = Level Up Menu
            // 5 = Game Over Menu
            // 6 = Options Menu
            // 7 = Submit Score Menu
		//Non-State Guis
		// Debug
		// Life & other ingame info(can't be on any state gui's)
		
		//Draw State Gui's
		var guiText = [];
		switch(currentGui)
		{
			case 0:
			{// Main Menu
				if(!logged)
				{
					guiText[0] = new GUIText("Please Login above to play", _canvas.width / 2, _canvas.height / 2 - 100, "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
					guiText[1] = new GUIText("Kill all the Things!", _canvas.width / 2, _canvas.height / 2 - 50, "28px Helvetica", "center", "top", "rgb(255, 0, 255)");
				} else
				{
					guiText[0] = new GUIText("Kill all the Things!", _canvas.width / 2, _canvas.height / 2 - 100, "28px Helvetica", "center", "top", "rgb(255, 0, 255)");
					guiText[1] = new GUIText("Start New Game", _canvas.width / 2, _canvas.height / 2, "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
					if(mouseX > (_canvas.width / 2 + 10) - 115 && mouseX < (_canvas.width / 2 + 10) + 100 && mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
					{
						guiText[1] = new GUIText("Start New Game", _canvas.width / 2, _canvas.height / 2, "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
					}
					guiText[2] = new GUIText("Options", _canvas.width / 2, (_canvas.height / 2) + 50, "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
					if(mouseX > (_canvas.width / 2 + 10) - 65 && mouseX < (_canvas.width / 2 + 10) + 40 && mouseY < (_canvas.height / 2 + 60) + 20 && mouseY > (_canvas.height / 2 + 60) - 10)
					{
						guiText[2] = new GUIText("Options", _canvas.width / 2, (_canvas.height / 2) + 50, "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
					}
					guiText[3] = new GUIText("Story", _canvas.width / 2, (_canvas.height / 2) + 100, "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
					if(mouseX > (_canvas.width / 2 + 10) - 65 && mouseX < (_canvas.width / 2 + 10) + 40 && mouseY < (_canvas.height / 2 + 110) + 20 && mouseY > (_canvas.height / 2 + 110) - 10)
					{
						guiText[3] = new GUIText("Story", _canvas.width / 2, (_canvas.height / 2) + 100, "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
					}
				}
				
				break;
			}
			case 1:
			{// Pause Menu
				guiText[0] = new GUIText("Paused", _canvas.width / 2, _canvas.height / 2 - 100, "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
				guiText[1] = new GUIText("Options", _canvas.width / 2, _canvas.height / 2, "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
				if(mouseX > (_canvas.width / 2 + 10) - 115 && mouseX < (_canvas.width / 2 + 10) + 100 && mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					guiText[1] = new GUIText("Options", _canvas.width / 2, _canvas.height / 2, "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
				}
				break;
			}
			case 2:
			{// Upgrade Menu
                //**********************************************************************//
                //						UPGRADE MENU SECTION							//
                //**********************************************************************//

                //Static Text
                guiText[0] = new GUIText("Missions", 10, 10, 
                                    "18px Helvetica", "left", "top", "rgb(230, 230, 255)");
                guiText[1] = new GUIText("Main Weapon [space]", 10, _canvas.height / 2 - 50, 
                                    "18px Helvetica", "left", "top", "rgb(230, 230, 255)");
                guiText[2] = new GUIText("Secondary Weapon [B]", 10, 420, 
                                    "18px Helvetica", "left", "top", "rgb(230, 230, 255)");
                guiText[3] = new GUIText("Cores: " + player.money, _canvas.width - 100, _canvas.height - 53, 
                                    "18px Helvetica", "left", "top", "rgb(230, 230, 255)");
                guiText[4] = new GUIText("Extra Items", _canvas.width - 300, 420, 
                                    "18px Helvetica", "left", "top", "rgb(230, 230, 255)");
                guiText[7] = new GUIText("Level " + gco.level, 5, _buffer.height / 2 - 75, 
                                    "18px Helvetica", "left", "top", "rgb(230, 230, 255)");
				guiText[8] = new GUIText(player.shieldLevel, _canvas.width - 271, 448, 
                                    "18px Helvetica", "left", "top", "rgb(0, 0, 0)");
				guiText[9] = new GUIText(player.secondaryAmmoLevel, _canvas.width - 221, 448, 
                                    "18px Helvetica", "left", "top", "rgb(0, 0, 0)");


//**********************************************************************//
//					    MISSION MENU SECTION							//
//**********************************************************************//
                var drawX = 10;
                var drawY = 50;
                var j = 0;
                for(var i = 0; i < gco.levelMission.objectives.length; i++)
                {
                    j++;
                    var outText = "";
                    switch(i)
                    {//Case Cooresponds to enemy types, enemy type missions cooresponds to level.
                        case 0:{outText += "Drone Kills: "; break;}
                        case 1:{outText += "Weaver Kills: "; break;}
                        case 2:{outText += "Kamakaze Kills: "; break;}
                        case 3:{outText += "Splitter Kills: "; break;}
                        case 4:{outText += "Teleporter Kills: "; break;}
						case 5:{outText += "Drone Core... Time to Kill all the Things! Ready yourself, there is no turning back! "; break;}
                        default:{outText += "Level Not Added: "; break;}
                    }
					if(i != 5)
					{
						gco.missionText[i] = new GUIText(outText + gco.levelMission.progress[i] + "/" + gco.levelMission.objectives[i],
                                        drawX, drawY, "16px Helvetica", "left", "top", "rgb(230, 230, 255)");
					} else
					{
						gco.missionText[i] = new GUIText(outText, drawX, drawY, "16px Helvetica", "left", "top", "rgb(230, 230, 255)");
					}
                    if(j == 4)
                    {
                        j = 0;
                        drawY = 50;
                        drawX += 200;
                    } else
                    {
                        drawY += 35;
                    }
                }
//**********************************************************************//
//					   END MISSION MENU SECTION							//
//**********************************************************************//
									
				var xDrawOffset = 160;
                buffer.beginPath();
                for(var i = 0; i < gco.missionText.length; i++)
                {
                    buffer.fillStyle = gco.missionText[i].color;
                    buffer.font = gco.missionText[i].fontStyle;
                    buffer.textAlign = gco.missionText[i].alignX;
                    buffer.textBaseline = gco.missionText[i].alignY;
                    buffer.fillText(gco.missionText[i].text, gco.missionText[i].x, gco.missionText[i].y);
					switch(i){
						case 0:{ buffer.drawImage(enemyImages[0], gco.missionText[i].x + xDrawOffset, gco.missionText[i].y - 5, enemyImages[0].width, enemyImages[0].height); break;}
						case 1:{ buffer.drawImage(enemyImages[2], gco.missionText[i].x + xDrawOffset, gco.missionText[i].y - 5, enemyImages[2].width, enemyImages[2].height); break;}
						case 2:{ buffer.drawImage(enemyImages[4], gco.missionText[i].x + xDrawOffset, gco.missionText[i].y - 5, enemyImages[4].width, enemyImages[4].height); break;}
						case 3:{ buffer.drawImage(enemyImages[6], gco.missionText[i].x + xDrawOffset, gco.missionText[i].y - 5, enemyImages[6].width, enemyImages[6].height); break;}
						case 4:{ buffer.drawImage(enemyImages[11], gco.missionText[i].x + xDrawOffset, gco.missionText[i].y - 5, enemyImages[11].width, enemyImages[11].height); break;}
					}
                }
                buffer.closePath();
            // Level Progress Meter
                var LPM_width = _buffer.width;
                var LPM_height = 20;
                var LPM_x1 = 0;
                var LPM_y1 = _buffer.height / 2 - 75;
                var LPM_x2 = LPM_width;
                var LPM_y2 = LPM_y1 + LPM_height;

                buffer.beginPath();
                    buffer.fillStyle = "rgba(0, 192, 255, 0.5)";
                    buffer.fillRect(LPM_x1, LPM_y1, LPM_width, LPM_height);
                buffer.closePath();
                var LPM_grd = buffer.createLinearGradient(LPM_x1, LPM_y1, LPM_x2, LPM_y2);
                LPM_grd.addColorStop(0, "rgb(0, 0, 255)");
                LPM_grd.addColorStop(1, "rgb(0, 192, 255)");
                buffer.beginPath();
                    buffer.fillStyle = LPM_grd;
                    buffer.fillRect(LPM_x1, LPM_y1, LPM_width * gco.levelProgress, LPM_height);
                buffer.closePath();
                
                buffer.beginPath();
                    buffer.strokeStyle = "rgb(255, 255, 255)";
                        buffer.moveTo(LPM_x1, LPM_y1);
                        buffer.lineTo(LPM_x2, LPM_y1);
                        buffer.lineTo(LPM_x2, LPM_y2);
                        buffer.lineTo(LPM_x1, LPM_y2);
                        buffer.lineTo(LPM_x1, LPM_y1);
                    buffer.stroke();
                buffer.closePath();

                
                if(mouseX > (_canvas.width - 175) && mouseX < (_canvas.width - 25) && mouseY < (280) && mouseY > (250))
                {//Start Level
                    guiText[5] = new GUIText("Start Level", _canvas.width - 100, 250, 
                                         "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
                    if(player.weapon == 49){guiText[guiText.length] = new GUIText("Must equip main weapon", _canvas.width - 100, 280, 
                                         "12px Helvetica", "center", "top", "rgb(255, 50, 50)");}
                } else
                {
                    guiText[5] = new GUIText("Start Level", _canvas.width - 100, 250, 
                                         "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
                }

                guiText[6] = new GUIText("Click item to purchase.", _canvas.width / 2, _canvas.height - 33, 
                                    "12px Helvetica", "center", "top", "rgb(230, 230, 255)");

                // GUI Icons
// NEW WEAPON Pea Shooter
                if(mouseX > 10 && mouseX < 58 && mouseY > 280 && mouseY < 328)
                {//Pea Shooter, Weapon ID: 0
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[0], 10, 280, 48, 48);    
                    buffer.shadowBlur = 0;
                    if(gco.weaponsOwned[0])
                    {
                        guiText[6].text = "You already own Pea Shooter.";
                    } else
                    {
                        guiText[6].text = "Pea Shooter costs 0 cores.";
                    }
                }
                if(gco.weaponsOwned[0] && player.weapon == 0)
                {
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[0], 10, 280, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[0], 10, 280, 48, 48);
					buffer.globalAlpha = 1.0;
                } 
                //END WEAPON

// NEW WEAPON Pea Shooter Pro
                if(mouseX > 60 && mouseX < 108 && mouseY > 280 && mouseY < 328)
                {//Pea Shooter Pro, Weapon ID: 1
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[1], 60, 280, 48, 48);
                    buffer.shadowBlur = 0;
                    if(gco.weaponsOwned[1])
                    {
                        guiText[6].text = "You already own Pea Shooter Pro.";
                    } else
                    {
                        guiText[6].text = "Pea Shooter Pro costs 25 cores.";
                    }
                }
                if(gco.weaponsOwned[1] && player.weapon == 1)
                {
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 150, 250)';
                    buffer.drawImage(images[1], 60, 280, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[1], 60, 280, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON
				
// NEW WEAPON Master Pea Shooter
                if(mouseX > 110 && mouseX < 158 && mouseY > 280 && mouseY < 328)
                {//Master Pea Shooter, Weapon ID: 2
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[7], 110, 280, 48, 48);
                    buffer.shadowBlur = 0;
                    if(gco.weaponsOwned[2])
                    {
                        guiText[6].text = "You already own Master Pea Shooter.";
                    } else
                    {
                        guiText[6].text = "Master Pea Shooter costs 250 cores.";
                    }
                }
                if(gco.weaponsOwned[2] && player.weapon == 2)
                {
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 150, 250)';
                    buffer.drawImage(images[7], 110, 280, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[7], 110, 280, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON

// NEW WEAPON Boom Bullet
                if(mouseX > 10 && mouseX < 58 && mouseY > 448 && mouseY < 496)
                {//Boom Bullet, Weapon ID: 50
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[2], 10, 448, 48, 48);
                    buffer.shadowBlur = 0;
                    if(gco.weaponsOwned[50])
                    {
                        guiText[6].text = "You already own Boom Bullet.";
                    } else
                    {
                        guiText[6].text = "Boom Bullet costs 50 cores.";
                    }
                }
                if(gco.weaponsOwned[50] && player.secondary == 50)
                {
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[2], 10, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[2], 10, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }

                //END WEAPON

// NEW WEAPON Friendly Boom Bullet
                if(mouseX > 60 && mouseX < 108 && mouseY > 448 && mouseY < 496)
                {//Friendly Boom Bullet, Weapon ID: 51
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[3], 60, 448, 48, 48);
                    buffer.shadowBlur = 0;
                    if(gco.weaponsOwned[51])
                    {
                        guiText[6].text = "You already own Friendly Boom Bullet.";
                    } else
                    {
                        guiText[6].text = "Friendly Boom Bullet costs 100 cores.";
                    }
                }
                if(gco.weaponsOwned[51] && player.secondary == 51)
                {
					buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[3], 60, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[3], 60, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON

// NEW WEAPON Space Mine
                if(mouseX > 110 && mouseX < 158 && mouseY > 448 && mouseY < 496)
                {//Friendly Boom Bullet, Weapon ID: 52
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[8], 110, 448, 48, 48);
                    buffer.shadowBlur = 0;
                    if(gco.weaponsOwned[52])
                    {
                        guiText[6].text = "You already own Space Mine.";
                    } else
                    {
                        guiText[6].text = "Space Mine costs 250 cores.";
                    }
                }
                if(gco.weaponsOwned[52] && player.secondary == 52)
                {
					buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[8], 110, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[8], 110, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON
				
// NEW WEAPON Laser
                if(mouseX > 160 && mouseX < 208 && mouseY > 448 && mouseY < 496)
                {//Laser: Weapon ID: 9000
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[10], 160, 448, 48, 48);
                    buffer.shadowBlur = 0;
                    if(gco.ownLaser)
                    {
                        guiText[6].text = "You already own the Phaser Laser.";
                    } else
                    {
                        guiText[6].text = "Phaser Laser costs 500 cores.";
                    }
                }
                if(gco.ownLaser && player.secondary == 9000)
                {
					buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[10], 160, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[10], 160, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON
				
// NEW POWERUP Shield
                if(mouseX > _canvas.width - 300 && mouseX < _canvas.width - 252 && mouseY > 448 && mouseY < 496)
                {//Shield
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[4], _canvas.width - 300, 448, 48, 48);
                    buffer.shadowBlur = 0;
                    if(player.hasShield)
                    {
                        guiText[6].text = "Your shield is level " + player.shieldLevel + ". Upgrade for " + (player.shieldLevel + 1) * 250 + " cores.";
                    } else
                    {
                        guiText[6].text = "A Shield costs 250 cores.";
                    }
                }
                if(player.hasShield)
                {
					buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[4], _canvas.width - 300, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[4], _canvas.width - 300, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON

// NEW POWERUP Max Ammo
                if(mouseX > _canvas.width - 250 && mouseX < _canvas.width - 202 && mouseY > 448 && mouseY < 496)
                {//Max Ammo
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[5], _canvas.width - 250, 448, 48, 48);
                    buffer.shadowBlur = 0;
                    guiText[6].text = "Ammo Level: " + player.secondaryAmmoLevel + "  Max Secondary Ammo: " + player.maxSecondaryAmmo + ". Upgrade for " + (player.secondaryAmmoLevel + 1) * 50 + " cores.";
                }
                if(player.secondaryAmmoLevel > 1)
                {
					buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[5], _canvas.width - 250, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[5], _canvas.width - 250, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON
			
// NEW POWERUP Buy Secondary Ammo
                if(mouseX > _canvas.width - 200 && mouseX < _canvas.width - 152 && mouseY > 448 && mouseY < 496)
                {//Buy Secondary Ammo
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[6], _canvas.width - 200, 448, 48, 48);
                    buffer.shadowBlur = 0;
					if(player.secondaryAmmo < player.maxSecondaryAmmo)
					{
                    	guiText[6].text = "Secondary Ammo: " + player.secondaryAmmo + "  Max Secondary Ammo: " + player.maxSecondaryAmmo + ". +25 Ammo for " + gco.secondaryAmmoPrice + " cores.";
					} else
					{
						guiText[6].text = "Secondary Ammo full.";
					}
                }
                if(player.secondaryAmmo < player.maxSecondaryAmmo)
                {
					buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[6], _canvas.width - 200, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[6], _canvas.width - 200, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON
				
// NEW POWERUP Buy Fill Health
                if(mouseX > _canvas.width - 150 && mouseX < _canvas.width - 102 && mouseY > 448 && mouseY < 496)
                {//Buy Fill Health
                    buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[9], _canvas.width - 150, 448, 48, 48);
                    buffer.shadowBlur = 0;
					if(player.life < 100)
					{
                    	guiText[6].text = "Hull(" + player.life + "/100) Repair Hull: " + ((100 - player.life) * 2) + " cores.";
					} else
					{
						guiText[6].text = "Hull is operating at 100%";
					}
                }
                if(player.life < 100)
                {
					buffer.shadowBlur = 1;
                    buffer.shadowColor = 'rgb(0, 173, 239)';
                    buffer.drawImage(images[9], _canvas.width - 150, 448, 48, 48);
					buffer.shadowBlur = 0;
                }
                else
                {
					buffer.globalAlpha = 0.5;
                    buffer.drawImage(images[9], _canvas.width - 150, 448, 48, 48);
					buffer.globalAlpha = 1.0;
                }
                //END WEAPON

				// Options Menu Selection
				if(mouseX > (_canvas.width - 160) && mouseX < (_canvas.width - 35) && mouseY < (55) && mouseY > (15))
                {//Options Menu
                    guiText[10] = new GUIText("Options", _canvas.width - 100, 20, "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
                } else
                {
                    guiText[10] = new GUIText("Options", _canvas.width - 100, 20, "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
                }
				
				guiText[11] = new GUIText("Score: " + score, 10, _canvas.height - 53, "18px Helvetica", "left", "top", "rgb(230, 230, 255)");
//**********************************************************************//
//					  END UPGRADE MENU SECTION							//
//**********************************************************************//
                break;
			}
			case 3:
			{// Continue Menu
				guiText[0] = new GUIText("You Died! :(", _canvas.width / 2, _canvas.height / 2 - 100, 
										 "28px Helvetica", "center", "top", "rgb(255, 0, 0)");
										 
        		if(mouseX > (_canvas.width / 2 + 10) - 75 && mouseX < (_canvas.width / 2 + 10) + 60 &&
				   mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					guiText[1] = new GUIText("Continue", _canvas.width / 2, _canvas.height / 2, 
										 "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
				} else
				{
					guiText[1] = new GUIText("Continue", _canvas.width / 2, _canvas.height / 2, 
										 "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
				}
				break;
			}
			case 4:
			{// Level Up Menu
				guiText[0] = new GUIText("Level Up! Now on level: " + (gco.level + 1), _canvas.width / 2, _canvas.height / 2 - 100, 
										 "28px Helvetica", "center", "top", "rgb(255, 0, 0)");
										 
        		if(mouseX > (_canvas.width / 2 + 10) - 75 && mouseX < (_canvas.width / 2 + 10) + 60 &&
				   mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					guiText[1] = new GUIText("Continue", _canvas.width / 2, _canvas.height / 2, 
										 "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
				} else
				{
					guiText[1] = new GUIText("Continue", _canvas.width / 2, _canvas.height / 2, 
										 "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
				}
				break;
			}
			case 5:
			{// Game Over Menu
				guiText[0] = new GUIText("Game Over", _canvas.width / 2, _canvas.height / 2 - 100, 
										 "28px Helvetica", "center", "top", "rgb(255, 0, 0)");
										 
        		if(mouseX > (_canvas.width / 2 + 10) - 75 && mouseX < (_canvas.width / 2 + 10) + 60 && mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					guiText[1] = new GUIText("Title Screen", _canvas.width / 2, _canvas.height / 2, "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
				} else
				{
					guiText[1] = new GUIText("Title Screen", _canvas.width / 2, _canvas.height / 2, "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
				}
				break;
			}
			case 6:
			{//Options Menu
				guiText[0] = new GUIText("Options", _canvas.width / 2, 25, "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
				guiText[1] = new GUIText("Back", 10, _canvas.height - 35, "28px Helvetica", "left", "top", "rgb(96, 150, 96)");
				if(mouseX > 0 && mouseX < 90 && mouseY < _canvas.height && mouseY > _canvas.height - 45)
				{
					guiText[1] = new GUIText("Back", 10, _canvas.height - 35, "28px Helvetica", "left", "top", "rgb(96, 255, 96)");
				}
				//particleOffset
				guiText[2] = new GUIText("Particles", (_canvas.width / 2), 125, "20px Helvetica", "center", "top", "rgb(96, 150, 96)");
                
                if(mouseX >= 200 && mouseX <= 225 && mouseY >= 150 && mouseY <= 200)
                {
					buffer.drawImage(images[12], (_canvas.width / 4), 150, 400, 50);
				}
                else if(mouseX >= 575 && mouseX <= 600 && mouseY >= 150 && mouseY <= 200)
                {
                    buffer.drawImage(images[13], (_canvas.width / 4), 150, 400, 50);
                }
                else
                {
                    buffer.drawImage(images[11], (_canvas.width / 4), 150, 400, 50);
                }
				
                buffer.drawImage(images[14], (19 + (87.5 * particleOffset) - 88) + (_canvas.width / 4), 161, 13, 28);
                
				switch(particleOffset)
				{
					case 1:{guiText[3] = new GUIText("1", _canvas.width / 2, 205, "26px Helvetica", "center", "top", "rgb(96, 255, 96)");
							guiText[4] = new GUIText("Need new computer...", _canvas.width / 2, 235, "10px Helvetica", "center", "top", "rgb(96, 255, 96)");break;}
					case 2:{guiText[3] = new GUIText("2", _canvas.width / 2, 205, "26px Helvetica", "center", "top", "rgb(120, 200, 60)");
							guiText[4] = new GUIText("Needs Shinies :(", _canvas.width / 2, 235, "10px Helvetica", "center", "top", "rgb(120, 200, 60)");break;}
					case 3:{guiText[3] = new GUIText("3", _canvas.width / 2, 205, "26px Helvetica", "center", "top", "rgb(150, 100, 20)");
							guiText[4] = new GUIText("Less Shinies.", _canvas.width / 2, 235, "10px Helvetica", "center", "top", "rgb(150, 100, 20)");break;}
					case 4:{guiText[3] = new GUIText("4", _canvas.width / 2, 205, "26px Helvetica", "center", "top", "rgb(200, 25, 0)");
							guiText[4] = new GUIText("Shinies!", _canvas.width / 2, 235, "10px Helvetica", "center", "top", "rgb(200, 55, 0)");break;}
					case 5:{guiText[3] = new GUIText("5", _canvas.width / 2, 205, "26px Helvetica", "center", "top", "rgb(255, 0, 0)");
							guiText[4] = new GUIText("OMFG SPARKLES!", _canvas.width / 2, 235, "10px Helvetica", "center", "top", "rgb(255, 0, 0)");break;}
				}
				break;
			}
			case 7:
			{// Submit Score Menu
				guiText[0] = new GUIText("Score: " + score + "  Kills: " + enemiesKilled + "  Cores: " + totalCores + "  Items Used: " + itemsUsed, _canvas.width / 2, _canvas.height / 2 - 100, 
										 "20px Helvetica", "center", "top", "rgb(255, 0, 0)");
										 
        		if(mouseX > (_canvas.width / 2 + 10) - 75 && mouseX < (_canvas.width / 2 + 10) + 60 && mouseY < (_canvas.height / 2 + 10) + 20 && mouseY > (_canvas.height / 2 + 10) - 10)
				{
					guiText[1] = new GUIText("Submit Score", _canvas.width / 2, _canvas.height / 2, "28px Helvetica", "center", "top", "rgb(96, 255, 96)");
				} else
				{
					guiText[1] = new GUIText("Submit Score", _canvas.width / 2, _canvas.height / 2, "28px Helvetica", "center", "top", "rgb(96, 150, 96)");
				}
				break;
			}
			default:{break;}
		}
		buffer.beginPath();
		for(var i = 0; i < guiText.length; i++)
        {
			buffer.fillStyle = guiText[i].color;
			buffer.font = guiText[i].fontStyle;
			buffer.textAlign = guiText[i].alignX;
			buffer.textBaseline = guiText[i].alignY;
			buffer.fillText(guiText[i].text, guiText[i].x, guiText[i].y);
		}
		buffer.closePath();
		delete guiText;
		if(!gco.win)
		{//Stateless Menu Items
			var guiText = [];
			//Debug
			if(debug)
			{
				guiText[0] = new GUIText("Shot: " + player.totalMissiles, 32, 32, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[1] = new GUIText("In Air: " + missiles.length, _canvas.width - 100, 32, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[2] = new GUIText("Enemies: " + enemies.length, _canvas.width - 250, 32, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[3] = new GUIText("Explosions: " + explosions.length, _canvas.width - 150, _canvas.height - 32, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[4] = new GUIText("FPS: " + FPS, 182, 32, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[5] = new GUIText("Seconds: " + seconds, 182, 52, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[6] = new GUIText("Tick: " + ticks, 182, 72, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				buffer.beginPath();
				for(var i = 0; i < guiText.length; i++)
				{
					buffer.fillStyle = guiText[i].color;
					buffer.font = guiText[i].fontStyle;
					buffer.textAlign = guiText[i].alignX;
					buffer.textBaseline = guiText[i].alignY;
					buffer.fillText(guiText[i].text, guiText[i].x, guiText[i].y);
				}
				buffer.closePath();
			}
			delete guiText;
			//End Debug
			
			// Player Info
			var guiText = [];
			if(playerInfo)
			{
				guiText[0] = new GUIText("Fuel: " + player.currentFuel, 105, _canvas.height - 78, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[1] = new GUIText("Shield: " + Math.floor(player.shield), 105, _canvas.height - 53, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[2] = new GUIText("Hull: " + player.life, 105, _canvas.height - 28, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[3] = new GUIText("Destroyed: " + destroys, _canvas.width / 2, _canvas.height - 32, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[4] = new GUIText("Cores: " + player.money, _canvas.width / 2, _canvas.height - 53, "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				guiText[5] = new GUIText("Score: " + score, _canvas.width - 100, 20, "12px Helvetica", "left", "top", "rgb(96, 255, 96)");
			} else
			{
				if(gameState == 1)
				{
					guiText[0] = new GUIText("[E] Player Info", 105, _canvas.height - 28, 
											 "18px Helvetica", "left", "top", "rgb(96, 255, 96)");
				}
			}
			buffer.beginPath();
				for(var i = 0; i < guiText.length; i++)
				{
					buffer.fillStyle = guiText[i].color;
					buffer.font = guiText[i].fontStyle;
					buffer.textAlign = guiText[i].alignX;
					buffer.textBaseline = guiText[i].alignY;
					buffer.fillText(guiText[i].text, guiText[i].x, guiText[i].y);
				}
			buffer.closePath();
		}
		delete guiText;
		// End Player Info
    }