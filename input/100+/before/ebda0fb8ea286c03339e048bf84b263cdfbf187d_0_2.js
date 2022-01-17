function checkForGoody(x, y, self) {
		switch (brick_array[x][y]) {
			case 10: // Speedup
				itemSpeedUp.play();
				self.attr({speed: self.speed+1.0});
				brick_array[x][y] = 0;
				goody_array[x][y].trigger("explode");
				break;
			case 11: //Bombup
				bingo.play();
				self.attr({maxBombs: self.maxBombs+1.0});
				brick_array[x][y] = 0;
				goody_array[x][y].trigger("explode");
				break;
			case 12: //Fireup
				bingo.play();
				self.attr({fireRange: self.fireRange+1.0});
				brick_array[x][y] = 0;
				goody_array[x][y].trigger("explode");
				break;
			case 13: //Timefuze
				ohlala.play();
				self.attr({timeFuze: true});
				brick_array[x][y] = 0;
				goody_array[x][y].trigger("explode");
				break;
			case 14: //DeathSkull
				scream.play();
				self.xDeath = goody_array[x][y].x;
				self.yDeath = goody_array[x][y].y;
				self.trigger("explode");
				break;
			case 15: //Disease
				if (self.timeTillExplode > 1) {
					self.attr({timeTillExplode: self.timeTillExplode - 2});
				}
				brick_array[x][y] = 0;
				goody_array[x][y].trigger("explode");
				break;
			case 16: //Invincible
				ohlala.play();
				brick_array[x][y] = 0;
				goody_array[x][y].trigger("explode");	
				self.invincible = true;
				self.addComponent("Invincible");
				self.setInvincibleAnimation(self.PLAYER);
				break;
			case 17: //Money
				cash.play();
				brick_array[x][y] = 0;
				goody_array[x][y].trigger("explode");	
				self.money +=1 ;
				gameState[self.PLAYER_NUMBER-1].money +=1;
			default:
				break;
		}
	}