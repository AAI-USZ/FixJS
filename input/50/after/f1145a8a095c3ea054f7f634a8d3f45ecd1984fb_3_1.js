function(type){
				type = type || 'all';
				this.games.fetchOrShow(type);
				this.updateMenu(type);
			}