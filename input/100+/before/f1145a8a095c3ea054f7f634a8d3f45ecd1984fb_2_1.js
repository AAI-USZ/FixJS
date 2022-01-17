function(){
				//setting up event bindings for when the Game changes
				//any time a game is created or a vote happens, set the daily limit
				Game.bind('create', Dailies.setToday);
				Game.bind('vote', Dailies.setToday);
				//on any of the following actions, rerender the list of games
				Game.bind('refresh', this.proxy(this.addSelected));
				Game.bind('cleargames', this.proxy(this.addSelected));
				Game.bind('setgotit', this.proxy(this.addSelected));
				Game.bind('vote', this.proxy(this.addSelected));
				//we need to get the latest list when something new since the api only returns true on addnewgame
				Game.bind('addnewgame', this.proxy(this.fetch));

				var self = this;
				this.routes({
					'/games/all': function(){
						self.show = 'All';
						self.fetchOrShow();
						self.updateMenu();
					},
					'/games/owned': function(){
						self.show = 'Owned';
						self.fetchOrShow();
						self.updateMenu();
					},
					'/games/wanted': function(){
						self.show = 'Unowned';
						self.fetchOrShow();
						self.updateMenu();
					}
				});

				Spine.Route.setup();
			}