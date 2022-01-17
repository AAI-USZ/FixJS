function(){
			self.invincible = true;
			self.addComponent("Invincible");
			self.setInvincibleAnimation(self.PLAYER);
			var PLAYERCORD = getPlayerCord(self.PLAYER)+88;
			self.animate("walk_down_"+self.PLAYER, [[0,PLAYERCORD]]);
			
			self.stop().animate("walk_down_"+self.PLAYER, 6);
		}