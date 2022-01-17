function() {
					if(this.timeFuze){
						this.detonateTriggeredBomb();
					}
					Crafty.e("DeathAnimation", "2D","DOM","SpriteAnimation", "animate")
						.attr({x: this.xDeath, y: this.yDeath-12, z: 10})
						.setDeathAnimation(this);
					this.destroy();
				}