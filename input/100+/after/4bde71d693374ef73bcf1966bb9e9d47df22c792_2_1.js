function() {
		var self = this;
		var musicianNames = self.get('musicianNames');
		var musicianIDs = self.get('musicianIDs');
		var teamNames = self.get('teamNames');
		var teamIDs = self.get('teamIDs');

		var collection = window.app.collection;

		// _.each(musicianNames, function(name) {
		// 	console.log(name);
		// 	collection.meta('description', name);
		// 	collection.meta('event_date_time_local', '[2012-07-01T00:00:00Z TO 2012-12-01T00:00:00Z]');
		// 	collection.fetch();		
		// });

		//filter and reconstruct Collection based on likes (preserving the original copy)
		collection.meta('view', this.view);
		collection.meta('event_date_time_local', '[NOW TO *]');
		collection.fetch({success: function() {
			console.log('filtering collection');


			window.DisplayedCollection = new StubHubEventCollection();

			for (var i = 0; i < collection.length; i++) {			
				var eventInstance = collection.at(i);
				var act_primary = eventInstance.get('act_primary');
				var musicianMatch = false;
				var teamMatch = false;
				for (var j = 0; j < musicianNames.length; j++) {
					if ((new RegExp(musicianNames[j])).test(act_primary)) {
						musicianMatch = true;
						break;
					}
				}

				for (var k = 0; k < teamNames.length; k++) {
					if ((new RegExp(teamNames[k])).test(act_primary)) {
						teamMatch = true;
						break;
					}
				}

				if (musicianMatch || teamMatch) {
					DisplayedCollection.add(eventInstance);
					window.app.view.addEvent(eventInstance);
				}

			}


			console.log(DisplayedCollection);
		}});

		



		window.app.hunch.meta('topic_ids', 'list_musician');
		window.app.hunch.meta('likes', musicianIDs);
		window.app.hunch.meta('blocked_result_ids', musicianIDs);

		console.log(window.app.hunch.url());
		window.app.hunch.fetch();
	}