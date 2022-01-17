function(){
			var App = Spine.Stack.sub({
				className: 'app',
				el: 'body',

				//the two main controller views -- only the active one will be shown
				controllers: {
					home: Home,
					admin: Admin
				},

				//routing setup to handle location hashes and activate the controllers
				routes: {
					'/': function(){
						this.clearMessage();
						this.home.showGames();
						this.home.active();
						this.updateMenu('home');
					},
					'/games/:type': function(params){
						this.clearMessage();
						this.home.showGames(params.type);
						this.home.active();
						this.updateMenu('home');
					},
					'/admin': function(){
						this.clearMessage();
						this.admin.active();
						this.updateMenu('admin');
					}
				},

				updateMenu: function(type){
					$('#home-pill, #admin-pill').removeClass('active');
					$('#' + type + '-pill').addClass('active');
				},

				clearMessage: function(){
					$(".message-area").empty();
				}
			});
			
			var app = new App();
			Spine.Route.setup();
		}