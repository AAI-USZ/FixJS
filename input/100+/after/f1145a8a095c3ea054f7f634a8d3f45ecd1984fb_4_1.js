function(options, cb){
				if(!this.exists()){
					//custom handling of game creation here
					connect('addnewgame', cb, {title: this.title}, options);
				}
				else{
					//need to call this to fire spine events when updating
					this.constructor.__super__.update.apply(this);
				}

			}