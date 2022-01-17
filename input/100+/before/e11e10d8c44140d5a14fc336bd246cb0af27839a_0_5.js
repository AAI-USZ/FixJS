function() {
		generateWorld();

		/**
		 * Component Explode
		 * sets fire entities
		 */
		Crafty.c("Explode", {
			Explode: function (x, y, self) {
				self.bombsPlanted -= 1;
				Crafty.e("SetFire")
					.setFire(x, y, 0, 0, self, 0);
				this.delay(function() {
						//fire left 
						Crafty.e("SetFire")
							.setFire(x, y, -1, 0, self, self.fireRange-1);
						//fire right 	
						Crafty.e("SetFire")
							.setFire(x, y, 1, 0, self, self.fireRange-1);
						//fire up
						Crafty.e("SetFire")
							.setFire(x, y, 0, -1, self, self.fireRange-1);
						//fire down
						Crafty.e("SetFire")
							.setFire(x, y, 0, 1, self, self.fireRange-1);
				}, 100);
			}   
		});
		

		/**
		 * Component SetFire
		 * Sets a fire and checks for players, goodys and bricks underneath
		 */
		Crafty.c("SetFire", {
			setFire:function (x, y, dx, dy, self, fireRangeLeft) {
				var x = x+(dx * 32);
				var y = y+(dy * 32);

				if ((x == 0) || (x == 576) || (y == 0) || (y == 448)) {
					return;
				} else if (fireRangeLeft >= 0) {
		       		this.addComponent("2D","DOM","SpriteAnimation", "fire", "animate")
					.attr({x: x, y: y, z: 100})
			        .animate('fire', 0, 3, 5)
					.bind("enterframe", function(e){
						this.animate("fire", 1);
					})
					.delay(function() {
						self.xDeath = xRelocator(self.x);
						self.yDeath = yRelocator(self.y)+12;
						
						for (var i=0; i < players.length; i++) {
			 	 			if (players[i] != undefined) {							
			 	 				if (xRelocator(players[i].x) == x && yRelocator(players[i].y)+12 == y) {
									if(players[i].invincible){
										players[i].removeComponent("Invincible");
										players[i].addComponent("InvincibleVanish");
										players[i].setInvincibleVanishAnimation(players[i].PLAYER);
										removeInvincibleFromPlayer(players[i]);
									} else {
										players[i].xDeath = xRelocator(x);
										players[i].yDeath = yRelocator(y)+12;
										players[i].trigger("explode");
									}			
								}
							}
			 	 		}
						this.destroy();  
	                }, 250);
					
					if (brick_array[x/32][y/32] < 10) {
						switch (brick_array[x/32][y/32]) {
							case 2:
								fireRangeLeft = 0;
								entity_array[x/32][y/32].trigger("explode");
								brick_array[x/32][y/32] = 0;
								break;
							case 3:
								fireRangeLeft = 0;
								entity_array[x/32][y/32].sprite(2, 1);
								brick_array[x/32][y/32] = 2;
								break;
							case 4:
								fireRangeLeft = 0;
								entity_array[x/32][y/32].sprite(1, 1);
								brick_array[x/32][y/32] = 3;
								break;
							case 5:
								fireRangeLeft = 0;
								bomb_array[x/32][y/32].trigger("explode");
								brick_array[x/32][y/32] = 0;
								break;
							default:
								brick_array[x/32][y/32] = 0;
								break;
							}
					} else { 
						fireRangeLeft = 0;
						brick_array[x/32][y/32] = 0;
						goody_array[x/32][y/32].trigger("explode");
					}
					this.delay(function	() {
						fireRangeLeft -= 1;
						Crafty.e("SetFire")
							.setFire(x, y, dx, dy, self, fireRangeLeft);
					}, 150);
				} else{		
				}
			}
		});


		/**
		 * Component SetBurning brick
		 * animation for a burning brick entity
		 */
		Crafty.c("SetBurningBrick", {
			setBurningBrick: function(x, y){
			    this.addComponent("2D","DOM","SpriteAnimation", "burning_brick", "animate")
				.attr({x: x, y: y, z: 9})
		        .animate('burning_brick', 0, 4, 3)
				.bind("enterframe", function(e){
					this.animate("burning_brick", 10);
				})
				.delay(function() {
					if(Crafty.randRange(0, 50) > 25){
						switch (/*parseInt(getRandom(7))*/3) {
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
                }, 500)				
			}
		});
		
		
		var Gamelogic = function (pn){
			{
				this.gamelogic = function(gameState) {
					var move = {left: false, right: false, up: false, down: false};	
					var saveMove = {left: false, right: false, up: false, down: false};
					var costumKeys = {left: 0, right: 0, up: 0, down: 0};
					var xDeath, yDeath;
					var maxBombs, speed, fireRange, timeTillExplode, triggeredBomb, bombsPlanted, PLAYER_NUMBER, money; 
					var timeFuze, invincible;
					var triggeredBomb;
					
					this.move = {left: false, right: false, up: false, down: false};	
					this.saveMove = {left: false, right: false, up: false, down: false};
					this.timeFuze = false;
					this.invincible = false;
					this.xDeath = 0;
					this.yDeath = 0;	
					this.speed = 1.5;
					this.fireRange = 2;
					this.timeTillExplode = 3;
					this.triggeredBomb = 0;
					this.bombsPlanted = 0;
					this.PLAYER = "";
					this.PLAYER_NUMBER = pn;
					this.triggeredBomb = 0;
					
					var posObj = generateStartPosition(this.PLAYER_NUMBER);
					this.x = posObj.x;
					this.y = posObj.y;
					this.z = posObj.z;
					
					/*if(gameState) {
						this.speed = gameState.speed;
						this.maxBombs = gameState.maxbomben;
						var PLAYER = gameState.username;
						this.PLAYER = PLAYER;
						this.money = gameState.money;
					}*/
					
					if(gameState) {			
						this.speed = gameState.speed;
						this.maxBombs = gameState.maxBombs;
						var PLAYER = gameState.username;
						this.PLAYER = PLAYER;
						this.money = gameState.money;
						this.fireRange = gameState.fireRange;
						this.speed = gameState.speed;
						if(gameState.invinsible){
							makeInvincible(this);
						}
					}
					

					costumKeys.left = gameState.controls.left;
					costumKeys.right = gameState.controls.right;
					costumKeys.up = gameState.controls.up;
					costumKeys.down = gameState.controls.down;
					costumKeys.bomb = gameState.controls.bomb;

					var self = this;
					
					var xOldRelativePlayerPosition = 0;
					var yOldRelativePlayerPosition = 0;

					var xNewRelativePlayerPosition = xRelocator(this.x)/32;
					var yNewRelativePlayerPosition = (yRelocator(this.y+12)+12)/32;
					this.z = yNewRelativePlayerPosition+9;

					this.bind('enterframe', function() {

						xNewRelativePlayerPosition = xRelocator(this.x)/32;
						yNewRelativePlayerPosition = (yRelocator(this.y+12)+12)/32;

						if(xOldRelativePlayerPosition != xNewRelativePlayerPosition || yOldRelativePlayerPosition != yNewRelativePlayerPosition){
							if(yNewRelativePlayerPosition > yOldRelativePlayerPosition){
								this.z +=1
							} 
							if(yNewRelativePlayerPosition < yOldRelativePlayerPosition){
								this.z -=1
							}
							xOldRelativePlayerPosition = xNewRelativePlayerPosition;
							yOldRelativePlayerPosition = yNewRelativePlayerPosition;						
						}
						if (move.right) {
							if(!this.isPlaying("walk_right_"+PLAYER))
								this.stop().animate("walk_right_"+PLAYER, 6);
							
							if(!solidRight(this)){
								var r = yPlayerRelocator(this.y+12);
								this.y = r;
								this.x += this.speed;
								saveMove.right = true;
							}
						}
						else if (move.left) {
							if(!this.isPlaying("walk_left_"+PLAYER))
								this.stop().animate("walk_left_"+PLAYER, 6);
								
							if (!solidLeft(this)) {
								var r = yPlayerRelocator(this.y+12);
								this.y = r;
								this.x -= this.speed; 
								saveMove.left = true;
							}
						}
						else if (move.up) {
							if(!this.isPlaying("walk_up_"+PLAYER))
								this.stop().animate("walk_up_"+PLAYER, 6);
								
							if(!solidUp(this)){
								var r = xPlayerRelocator (this.x);
								this.x = r;
								this.y -= this.speed;
								saveMove.up = true;
							}
						}
						else if (move.down) {
							if(!this.isPlaying("walk_down_"+PLAYER))
								this.stop().animate("walk_down_"+PLAYER, 6);
							if(!solidDown(this)){
								var r = xPlayerRelocator (this.x);
								this.x = r;
								this.y += this.speed;
								saveMove.down = true;
							}
						}
					}).bind('keydownself', function(e) {
						if (e.which === costumKeys.right) {
							saveMove.right = true;
							move.right = true;
						}
						if (e.which === costumKeys.left) {
							saveMove.left = true;
							move.left = true;
						}
						if (e.which === costumKeys.up) {
							saveMove.up = true;
							move.up = true;
						}
						if (e.which === costumKeys.down) {
							saveMove.down = true;
							move.down = true;
						}
						if (e.which === costumKeys.bomb) {
							if(saveMove.right){
								move.right = true;
							}
							else if(saveMove.left){
								move.left = true;
							}
							else if(saveMove.up){
								move.up = true;
							}
							else if(saveMove.down){
								move.down = true;
							}
							var xGrid = xRelocator (this.x);
							var yGrid = yRelocator(this.y)+12;
							if (!this.timeFuze){
								if (this.bombsPlanted < this.maxBombs) {
									if (!(brick_array[xGrid/32][yGrid/32] == 5)) {
										brick_array[xGrid/32][yGrid/32] = 5;
										this.bombsPlanted += 1;	
										bomb_array[xGrid/32][yGrid/32] = Crafty.e("2D","DOM","SpriteAnimation", "bomb", "animate", "explodable", "Explode")
																.attr({x: xGrid, y: yGrid, z: 10})
														        .animate('bomb', 0, 2, 2)
																.bind("enterframe", function(e){
																	this.animate("bomb", 10);
																})
																.bind("explode", function() {
																	brick_array[xGrid/32][yGrid/32] = 0;
												                    Crafty.e("Explode")
																	  .Explode(xGrid, yGrid, self);
																	this.destroy();
																});
										setTimeout(function(){
												brick_array[xGrid/32][yGrid/32] = 0;
												bomb_array[xGrid/32][yGrid/32].trigger("explode");
							                }, this.timeTillExplode * 1000);	
									}
								}
							} else {
								if(this.bombsPlanted < 1) {
									this.bombsPlanted = 1;
									brick_array[xGrid/32][yGrid/32] = 5;
									this.triggeredBomb = Crafty.e("2D","DOM","SpriteAnimation", "bomb", "animate", "explodable")
										.attr({x: xGrid, y: yGrid, z: 9})
							        	.animate('bomb', 0, 2, 2)
										.bind("enterframe", function(e){
											this.animate("bomb", 10);
										})
										.bind("explode", function() {
											brick_array[xGrid/32][yGrid/32] = 0;
					                    	Crafty.e("Explode")
										  		.Explode(xGrid, yGrid, self);
											this.destroy();
										})										
								}						
							}
		             };				
					}).bind('keyupself', function(e) {
						if (e.which === costumKeys.right) {
							move.right = false;
							saveMove.right = false;
							this.stop().animate("stay_right_"+PLAYER, 1);
						}
						if (e.which === costumKeys.left) {
							move.left = false;
							saveMove.left = false;
							this.stop().animate("stay_left_"+PLAYER, 1);
						}
						if (e.which === costumKeys.up){
							move.up = false;
							saveMove.up = false;
							this.stop().animate("stay_up_"+PLAYER, 1);
						} 
						if (e.which === costumKeys.down) {
							move.down = saveMove.down = false;
							this.stop().animate("stay_down_"+PLAYER, 1);
						}
						if (this.timeFuze) {
							if (e.which === costumKeys.bomb) {
								this.triggeredBomb.trigger("explode");
								this.bombsPlanted = 0;
							}
						}			
					})
					return this;
				}
				this.detonateTriggeredBomb = function(){
					if(this.timeFuze){
						this.triggeredBomb.trigger("explode");
					}
				};

			}
			
		}

		
		/**
		 * Component DeathAnimation
		 * animates the player death 
		 * @param reference to the player
		 */
		Crafty.c("DeathAnimation", {
			setDeathAnimation:function (self) {
				var PLAYERDEATHCORD = getPlayerCord(self.PLAYER) + 44;
				this.addComponent(self.PLAYER+"_DEATH")
				.attr({z: 200})
				.animate(self.PLAYER+"_DEATH", [[0,PLAYERDEATHCORD],[32,PLAYERDEATHCORD],[64,PLAYERDEATHCORD],
				[96,PLAYERDEATHCORD],[128,PLAYERDEATHCORD],[160,PLAYERDEATHCORD],[192,PLAYERDEATHCORD],
				[224,PLAYERDEATHCORD],[256,PLAYERDEATHCORD]])
				.bind("enterframe", function(e){
					this.animate(self.PLAYER+"_DEATH", 10);
				})
				.delay(function() {
					PLAYERS_ALIVE -=1;
					removeReference(self);
					checkForWinner(self);
					this.destroy();				
                }, 600)
			}
		});
		
		/**
		 * Component Normal
		 * animates the normal player look
		 */
		Crafty.c("Normal", {
			setNormalAnimation: function(PLAYER){
				var PLAYERCORD = getPlayerCord(PLAYER);
				this.animate("stay_left_"+PLAYER, [[192,PLAYERCORD]])
				this.animate("stay_right_"+PLAYER, [[288,PLAYERCORD]])
				this.animate("stay_up_"+PLAYER, [[96,PLAYERCORD]])
				this.animate("stay_down_"+PLAYER, [[0,PLAYERCORD]])

				this.animate("walk_left_"+PLAYER, [[192,PLAYERCORD],[224,PLAYERCORD],[256,PLAYERCORD]])
	            this.animate("walk_right_"+PLAYER, [[288,PLAYERCORD],[320,PLAYERCORD],[352,PLAYERCORD]])
	            this.animate("walk_up_"+PLAYER, [[96,PLAYERCORD],[128,PLAYERCORD],[160,PLAYERCORD]])
	            this.animate("walk_down_"+PLAYER, [[0,PLAYERCORD],[32,PLAYERCORD],[64,PLAYERCORD]])
				this.bind("enterframe", function(e) {

				});
				return this;
			}
		});
		
		/**
		 * Component Invincible
		 * animates the invincible player look
		 */
		Crafty.c("Invincible", {
			setInvincibleAnimation:function(PLAYER) {
				var PLAYERCORD = getPlayerCord(PLAYER)+88;
				this.animate("stay_left_"+PLAYER, [[192,PLAYERCORD]])
				this.animate("stay_right_"+PLAYER, [[288,PLAYERCORD]])
				this.animate("stay_up_"+PLAYER, [[96,PLAYERCORD]])
				this.animate("stay_down_"+PLAYER, [[0,PLAYERCORD]])

				this.animate("walk_left_"+PLAYER, [[192,PLAYERCORD],[224,PLAYERCORD],[256,PLAYERCORD]])
	            this.animate("walk_right_"+PLAYER, [[288,PLAYERCORD],[320,PLAYERCORD],[352,PLAYERCORD]])
	            this.animate("walk_up_"+PLAYER, [[96,PLAYERCORD],[128,PLAYERCORD],[160,PLAYERCORD]])
	            this.animate("walk_down_"+PLAYER, [[0,PLAYERCORD],[32,PLAYERCORD],[64,PLAYERCORD]])
			}
		});
		
		/**
		 * Component InvincibleVanish
		 * animates the vanish of invinciblity
		 */
		Crafty.c("InvincibleVanish", {
			setInvincibleVanishAnimation:function(PLAYER) {
				var PLAYERCORD = getPlayerCord(PLAYER);

				this.animate("stay_left_"+PLAYER, [[192,PLAYERCORD],[192,PLAYERCORD + 88]])
				this.animate("stay_right_"+PLAYER, [[288,PLAYERCORD],[192,PLAYERCORD + 88]])
				this.animate("stay_up_"+PLAYER, [[96,PLAYERCORD],[96,PLAYERCORD + 88]])
				this.animate("stay_down_"+PLAYER, [[0,PLAYERCORD], [0,PLAYERCORD + 88]])

				this.animate("walk_left_"+PLAYER, [[192,PLAYERCORD],[224,PLAYERCORD + 88],[256,PLAYERCORD]])
	            this.animate("walk_right_"+PLAYER, [[288,PLAYERCORD],[320,PLAYERCORD + 88],[352,PLAYERCORD]])
	            this.animate("walk_up_"+PLAYER, [[96,PLAYERCORD],[128,PLAYERCORD + 88],[160,PLAYERCORD]])
	            this.animate("walk_down_"+PLAYER, [[0,PLAYERCORD],[32,PLAYERCORD + 88],[64,PLAYERCORD]])
			}
		});	
		
		
		/**Set TimeoutFunction
		*@author Sergej
		*/
		setTimeout(function() { 
			//backgroundAlarm(startcolor);
			//startShrinking();
			//alarm.play();
		}, 3000); //Time passing after starting game before Alarm starts (in milli seconds)

		/**
		 * Generates an instances of players
		 */
		for (var i=0; i < gameState.length; i++) {

			Crafty.c('Gamelogic'+i, new Gamelogic(i+1));

			players[i] = Crafty.e("2D", "DOM", gameState[i].username, "Gamelogic"+i, "animate", "explodable", "Normal")
				.gamelogic(gameState[i])
				.bind("explode", function() {
					if(this.timeFuze){
						this.detonateTriggeredBomb();
					}
					Crafty.e("DeathAnimation", "2D","DOM","SpriteAnimation", "animate")
						.attr({x: this.xDeath, y: this.yDeath-12, z: 10})
						.setDeathAnimation(this);
					this.destroy();
				})
				.setNormalAnimation(gameState[i].username);
		};
	}