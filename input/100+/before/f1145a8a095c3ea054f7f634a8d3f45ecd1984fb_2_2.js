function($, Base, GameTitle, Dailies, Game, sort, all_row_template){
		var all_row_tmpl = Handlebars.compile(all_row_template);


		var Games = Spine.Controller.sub({
			el: $('#games tbody'),
			show: 'All',

			elements: {
				'#games tbody': 'rows',
				'#tab-nav': 'tabNav'
			},

			init: function(){
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
			},

			fetch: function(){
				Game.fetch();
			},

			fetchOrShow: function(){
				if(Game.all().length === 0){
					this.fetch();
				}
				else{
					this.addSelected();
				}
			},

			updateMenu: function(){
				/*this.tabs
					.find('li').removeClass('active').end()
					.find('#'+this.show.toLowerCase()+'-tab').addClass('active');*/
			},

			addSelected: function(){
				this.proxy(this.addAll(this['get'+this.show]()));
			},

			addOne: function(item){
				var title = new GameTitle({item: item});
				this.append(title.render(all_row_tmpl));
			},

			addAll: function(items){
				this.el.empty();
				for(var i=0;i<items.length;i++){
					this.proxy(this.addOne(items[i]));
				}

			},

			getAll: function(){
				return Game.all();
			},

			getOwned: function(){
				return Game.findAllByAttribute('owned', true).sort(sort.byProperty('title'));
			},

			getUnowned: function(){
				return Game.findAllByAttribute('owned', false).sort(sort.byProperty('votes')).reverse();
			}
		});

		return new Games();
	}