function() {
				if(this.isDown('SPACE')) {
					this.destroy();
					if(Crafty.isPaused()) {Crafty.pause();}
					var action = model.get('actionToTrigger');
					if(action !== '') {
						Crafty.trigger(action);
					}
					
				}
			}