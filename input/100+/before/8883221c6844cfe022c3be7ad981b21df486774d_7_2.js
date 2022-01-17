function() {
		if (this.state == DESTROYING) {
			return;
		}
		
		// Finish the spawn and start moving
		else if (this.state == SPAWNING && !this.isPlaying("spawn")) {
			this.state = MOVING_OUT_OF_SPAWN;
			this.changeDirection(this.walkingDirection);
		}
		
		// Finish the attack and die
		else if (this.state == ATTACKING
		&& !this.isPlaying("attack_right")
		&& !this.isPlaying("attack_left")
		&& !this.isPlaying("attack_up")
		&& !this.isPlaying("attack_down")) {
			this.die();
			return;
		}
		
		// Delete the sprite
		else if (this.state == DYING && !this.isPlaying("die")) {
			this.destroy();
			this.state = DESTROYING;
			return;
		}
		
		this.z = this.y;
		
		if (this.state == MOVING || this.state == MOVING_OUT_OF_SPAWN) {
			var beforeMiddle = false;
			var pastMiddle = false;
			
			var xoffset = 0;
			var yoffset = 0;
			
			if (this.size == 1) {
				switch (this.walkingDirection) {
					case WEST:	yoffset = -10;	break;
					case EAST:	yoffset = -10;	break;
				}
			} else {
				switch (this.walkingDirection) {
					case NORTH:	yoffset = +20;	break;
					case SOUTH:	yoffset = +20;	break;
					case WEST:	xoffset = -10;	break;
					case EAST:	xoffset =   0;	break;
				}
			}
			
			// Check whether the zombie is before the middle of the square
			if (this.currentCell) {
				var middleOffset = {
					x: this.x + this.centerOffset.x + xoffset - this.currentCell.center.x,
					y: this.y + this.centerOffset.y + yoffset - this.currentCell.center.y
				};
				
				beforeMiddle = (
					   this.walkingDirection == WEST  && middleOffset.x > 0
					|| this.walkingDirection == EAST  && middleOffset.x < 0
					|| this.walkingDirection == NORTH && middleOffset.y > 0
					|| this.walkingDirection == SOUTH && middleOffset.y < 0);
			}
			
			// Move the zombie
			this.move(this.walkingDirection, ETA.config.game.zombie.speed);
			
			// Check whether the zombie is after the middle of the square (after the movement)
			if (this.currentCell) {
				var middleOffset = {
					x: this.x + this.centerOffset.x + xoffset - this.currentCell.center.x,
					y: this.y + this.centerOffset.y + yoffset - this.currentCell.center.y
				};
				
				var afterMiddle = (
					   this.walkingDirection == WEST  && middleOffset.x <= 0
					|| this.walkingDirection == EAST  && middleOffset.x >= 0
					|| this.walkingDirection == NORTH && middleOffset.y <= 0
					|| this.walkingDirection == SOUTH && middleOffset.y >= 0);
				
				if (beforeMiddle && afterMiddle) {
					pastMiddle = true;
				}
			}
			
			pseudoCenter = {
				x: this.x + this.centerOffset.x + xoffset,
				y: this.y + this.centerOffset.y + yoffset
			};
			
			/*
			//DEBUG
			if (this.debug) {
				this.debug.destroy();
			}
			this.debug = Crafty.e("2D, DOM, Color")
			   .color("#FF0000")
			   .attr({
					x: pseudoCenter.x,//this.x + 19,
					y: pseudoCenter.y,//this.y + 22,
					z: this.y + 1,
					w: 2,
					h: 2
				});
			///DEBUG
			*/
			
			// Determine if the zombie changed cell
			var changedCell = false;
			var newCell = ETA.grid.getCell(pseudoCenter.x, pseudoCenter.y);
			
			if (newCell != this.currentCell) {
				if (this.state == MOVING_OUT_OF_SPAWN && this.currentCell) {
					this.state = MOVING;
				}
							
				this.currentCell = newCell;
				changedCell = true;
			}
			
			// Check for signs
			if (pastMiddle) {
				var signDirection;
				
				if (this.currentCell.elem != null
				&& this.currentCell.elem.type == SIGN
				&& this.currentCell.elem.player.id == this.player.id) {
					var signDirection =  this.currentCell.elem.direction;
					
					// Sign and upper border
					if (this.currentCell.upperCell && signDirection == NORTH) {
						if (this.walkingDirection == NORTH) {
							this.changeDirection((Crafty.math.randomInt(1, 2) == 1) ? WEST : EAST);
						}
					}
					// Sign and lower border
					else if (this.currentCell.lowerCell && signDirection == SOUTH) {
						if (this.walkingDirection == SOUTH) {
							this.changeDirection((Crafty.math.randomInt(1, 2) == 1) ? WEST : EAST);
						}
					}
					// Sign
					else if (this.walkingDirection != signDirection) {
						this.changeDirection(signDirection);
					}
				} else {
					// Upper border
					if (this.currentCell.upperCell && this.walkingDirection == NORTH) {
						this.changeDirection((Crafty.math.randomInt(1, 2) == 1) ? WEST : EAST);
					}
					// Lower border
					else if (this.currentCell.lowerCell && this.walkingDirection == SOUTH) {
						this.changeDirection((Crafty.math.randomInt(1, 2) == 1) ? WEST : EAST);
					}
				}
			}
			
			// Cell has changed, check for new cell content
			if (this.state != MOVING_OUT_OF_SPAWN && changedCell) {
				if (this.currentCell.elem != null) {
					// Fortress
					if (this.currentCell.elem.type == FORTRESS || this.currentCell.elem.type == CEMETERY) {
						if (this.player.id == this.currentCell.elem.player.id) {
							this.changeDirection(this.player.defaultDirection);
						} else {
							this.currentCell.elem.loseHP(ETA.config.game.zombie.damage * this.size);
							this.attack(this.currentCell.elem.type);
							return;
						}
					}
					// City
					else if (this.currentCell.elem.type == CITY) {
						if (this.currentCell.elem.player == null || this.currentCell.elem.player.id != this.player.id) {
							// Attack city
							if (this.currentCell.elem.nbGuards - this.size >= 0) {
								this.currentCell.elem.loseGuards(this.size);
								this.attack(CITY);
								return;
							}
							// Invade city
							else {
								this.currentCell.elem.changePlayer(this.player);
								this.currentCell.elem.gainGuards(this.size);
								this.destroy();
								this.state = DESTROYING;
								return;
							}
						}
						// Enforce city
						else if (this.currentCell.elem.nbGuards < 99) {
							this.currentCell.elem.gainGuards(this.size);
							this.destroy();
							this.state = DESTROYING;
							return;
						}
						// Return to the earth
						else {
							this.die();
							return;
						}
					}
				}
			}
			
			// Check for collisions with other zombies
			var collisions = this.hit('zombi');
			if (collisions) {
				var nbCollisions = collisions.length;
				for (var i = 0; i < nbCollisions; i++) {
					if (collisions[i].type == "SAT") {
						var otherZombie = collisions[i].obj;
						
						if (otherZombie.player.id != this.player.id) {
							if (this.state == MOVING && otherZombie.state == MOVING) {
								if (this.size == otherZombie.size) {
									var rand = Math.random();
									
									if (rand < 0.33) {
										this.attack(ZOMBIE);
									} else if (rand < 0.66) {
										otherZombie.attack(ZOMBIE);
									} else {
										this.attack(ZOMBIE);
										otherZombie.attack(ZOMBIE);
									}
								} else {
									this.setApart();
									otherZombie.setApart();
								}
								
								return;
							}
						}
					}
				}
			}
		}
	}