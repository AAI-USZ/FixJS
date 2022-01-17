function() {
					if(Crafty.randRange(0, 50) > 25){
						switch (/*parseInt(getRandom(7))*/7) {
							case 0:
								generateGoody("speed_up", x, y, 10);
								break;
							case 1:
								generateGoody("bombs_up", x, y, 11);
								break;
							case 2:
								generateGoody("fire_up", x, y, 12);
								break;	
							case 3:
								generateGoody("time_fuze", x, y, 13);
								break;
							case 4: 
								generateGoody("death_skull", x, y, 14);
								break;
							case 5: 
								generateGoody("disease", x, y, 15);
								break;
							case 6: 
								generateGoody("invincible", x, y, 16);
								break;
							case 7: 
								generateGoody("money", x, y, 17);
								break;	
							default:
								break;
						}
					}
					this.destroy();
                }