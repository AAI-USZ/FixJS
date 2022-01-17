function($, settings){
		if(window.Game){
			return window.Game;
		}

		var Game = Spine.Model.sub();
		Game.configure('Game', 'id', 'title', 'votes', 'owned');

		//example data:
		// {
		// api_id: "36",
		// id: "1258",
		// owned: "0",
		// title: "test game",
		// votes: "0"
		// };

		//private methods
		var connect = function(method, cb, data, options){
			var handleCallBack = function(records){
				if(cb){
					cb(records);
				}
				Game.trigger(method);
				return records;
			};

			if(options && options.disableAjax){
				return handleCallBack();
			}
			data = $.extend(data || {}, {apiKey: settings.apiKey});
			$.ajax({
				url: [settings.votingServiceUrl, method].join('/'),
				dataType: 'jsonp',
				data: data,
				success: handleCallBack,
				error: function(e){
					console.log(e);
				}
			});
		};

		var scrubGameData = function(game){
			//return game data with correct data types
			return {
				id: parseInt(game.id, 10),
				owned: game.owned === "1",
				title: game.title,
				votes: parseInt(game.votes, 10)
			};
		};

		//instance methods
		Game.include({
			vote: function(options, cb){
				connect('vote', cb, {id: this.id}, options);
				//Spine wants to call save after updating attributes. disable.
				this.updateAttribute('votes', this.votes + 1, {disableAjax: true});
			},

			setOwned: function(options, cb){
				connect('setgotit', cb, {id: this.id}, options);
				//Spine wants to call save after updating attributes. disable.
				this.updateAttribute('owned', true, {disableAjax: true});
			},

			//override spine's save method because we aren't using REST
			save: function(options, cb){
				connect('addnewgame', cb, {title: this.title}, options);
				return Game.__super__.save.call(this);
			},

			validate: function(){
				if(this.title === undefined || this.title.replace(/\s/g, '').length === 0){
					return "Game title must have a value";
				}
				if(Game.findByAttribute('title', this.title) !== null){
					return "Game title already exists";
				}
			}
		});

		//static methods
		Game.extend({
			clear: function(options, cb){
				Game.deleteAll();
				connect('cleargames', cb, null, options);
			},

			fetch: function(options, cb){
				connect('getgames', function(records){
					if(records){
						//need to scrub all of the fields for each record
						for(var i=0;i<records.length;i++){
							records[i] = scrubGameData(records[i]);
						}
						Game.refresh(records);
					}
					if(cb){
						cb();
					}
				}, null, options);
			}
		});

		//attaching to window because controllers need an identical reference
		window.Game = Game;

		return Game;
	}