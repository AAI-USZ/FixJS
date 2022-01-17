function(title, options){
				var game = new Game({ title: title });
				if(!this.showError(this.validate() || Dailies.validate() || game.validate())){
					game.save(options);
					this.addGameInput.val('');
					return true;
				}
				return false;
			}