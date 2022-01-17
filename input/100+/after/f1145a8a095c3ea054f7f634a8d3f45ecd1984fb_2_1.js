function(){
				//setting up event bindings for when the Game changes
				//any time a game is created or a vote happens, set the daily limit
				Game.bind('create', Dailies.setToday);
				Game.bind('vote', Dailies.setToday);
				//when refreshing the list or updating, rerender the list of games
				Game.bind('refresh', this.proxy(this.addSelected));
				Game.bind('update', this.proxy(this.addSelected));
				//we need to get the latest list when something new since the api only returns true on addnewgame
				Game.bind('addnewgame', this.proxy(this.fetch));
			}