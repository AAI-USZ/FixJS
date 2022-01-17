function() {
				if(this.isDown('SPACE')) {
					if(Crafty.isPaused()) {Crafty.pause();}
					this.destroy();
					Crafty.trigger(model.get('actionToTrigger'));
					
				}
			}