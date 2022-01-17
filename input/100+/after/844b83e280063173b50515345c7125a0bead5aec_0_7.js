function()
	{
        var rand_health = Math.floor(Math.random() * 100) + 243;
        var rand1_health = Math.floor(Math.random() * 100) + 100;
        var rand2_health = Math.floor(Math.random() * 100) + 188;
        var r_health = rand_health;
        var g_health = rand1_health;
        var b_health = rand2_health;
        buffer.lineWidth = 3;
        
        var rand_shield = Math.floor(Math.random() * 100) - 50;
        var rand1_shield = Math.floor(Math.random() * 100) + 63;
        var rand2_shield = Math.floor(Math.random() * 100) + 138;
        var r_shield = rand_shield;
        var g_shield = rand1_shield;
        var b_shield = rand2_shield;
        
        var rand_ammo = Math.floor(Math.random() * 100) + 128;
        var rand1_ammo = Math.floor(Math.random() * 100) + 128;
        var rand2_ammo = Math.floor(Math.random() * 100) + 128;
        var r_ammo = rand_ammo;
        var g_ammo = rand1_ammo;
        var b_ammo = rand2_ammo;
        
		for(var i = 0; i < randomItems.length; i++)
		{
			switch(randomItems[i].itemNum)
			{
				case 0:
				{//Health
                    buffer.beginPath();
                    buffer.fillStyle = "rgb(" + r_health + ", " + g_health + ", " + b_health + ")";
                    buffer.strokeStyle = "rgb(255, 0, 0)";
                        buffer.moveTo(randomItems[i].x, randomItems[i].y - 2.5);
                        buffer.lineTo(randomItems[i].x + 2.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x + 5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x + 6.25, randomItems[i].y - 2.5);
                        buffer.lineTo(randomItems[i].x, randomItems[i].y + 5);
                        buffer.lineTo(randomItems[i].x - 6.25, randomItems[i].y - 2.5);
                        buffer.lineTo(randomItems[i].x - 5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x - 2.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x, randomItems[i].y - 2.5);
                    buffer.stroke();
                    buffer.fill();
                    buffer.closePath();
					break;
				}
				case 1:
				{//Shield
                    buffer.beginPath();
					buffer.fillStyle = "rgb(" + r_shield + ", " + g_shield + ", " + b_shield + ")";
                    buffer.strokeStyle = "rgb(0, 113, 188)";
                        buffer.moveTo(randomItems[i].x, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x + 5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x + 5, randomItems[i].y);
                        buffer.lineTo(randomItems[i].x, randomItems[i].y + 7.5);
                        buffer.lineTo(randomItems[i].x - 5, randomItems[i].y);
                        buffer.lineTo(randomItems[i].x - 5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x, randomItems[i].y - 5);
                    buffer.stroke();
                    buffer.fill();
                    buffer.closePath();
					break;
				}
				case 2:
				{//Secondary Ammo
                    buffer.beginPath();
				    buffer.fillStyle = "rgb(" + r_ammo + ", " + g_ammo + ", " + b_ammo + ")";
                    buffer.strokeStyle = "rgb(128, 128, 128)";
                        buffer.moveTo(randomItems[i].x - 10, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x - 8.75, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x - 7.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x - 7.5, randomItems[i].y + 10);
                        buffer.lineTo(randomItems[i].x - 12.5, randomItems[i].y + 10);
                        buffer.lineTo(randomItems[i].x - 12.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x - 11.25, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x - 10, randomItems[i].y - 10);

                        buffer.moveTo(randomItems[i].x, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x + 1.25, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x + 2.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x + 2.5, randomItems[i].y + 10);
                        buffer.lineTo(randomItems[i].x - 2.5, randomItems[i].y + 10);
                        buffer.lineTo(randomItems[i].x - 2.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x - 1.25, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x, randomItems[i].y - 10);

                        buffer.moveTo(randomItems[i].x + 10, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x + 11.25, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x + 12.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x + 12.5, randomItems[i].y + 10);
                        buffer.lineTo(randomItems[i].x + 7.5, randomItems[i].y + 10);
                        buffer.lineTo(randomItems[i].x + 7.5, randomItems[i].y - 5);
                        buffer.lineTo(randomItems[i].x + 8.75, randomItems[i].y - 10);
                        buffer.lineTo(randomItems[i].x + 10, randomItems[i].y - 10);
                    buffer.stroke();
                    buffer.fill();
                    buffer.closePath();
					break;
				}
				case 3:
				{	
					buffer.fillStyle = 'rgb(200, 200, 255)';
					buffer.shadowBlur = 10;
						buffer.drawImage(itemImages[0], randomItems[i].x - (randomItems[i].width / 2), randomItems[i].y - (randomItems[i].height / 2), 25, 25);
					buffer.shadowBlur = 0;
					break;
				}
                default:break;
			}
		}
        buffer.lineWidth = 1;
	}