function(type){
				this.show = type;
				if(Game.all().length === 0){
					this.fetch();
				}
				else{
					this.addSelected();
				}
			}