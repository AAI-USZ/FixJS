f		var self = this;
		var musicianNames = self.get('musicianNames');
		var musicianIDs = self.get('musicianIDs');
		var teamNames = self.get('teamNames');
		var teamIDs = self.get('teamIDs');

		window.app.collection = new StubHubEventCollection();	
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
			//$('#ajax-loader').fadeOut('fast');
			//successfully retrieved 200 items from LCS
			console.log('filtering collection');

			window.DisplayedCollection = new StubHubEventCollection();
			window.d1 = new Date();
			window.d2 = new Date().addDays(1);
			window.limit = new Date().addDays(8);


			
			//for (var idx = 0; idx < collection.length; idx++) {
				//var counter = 0;
			while (!d1.equals(limit)) {
				for (var i = 0; i < collection.length; i++) {			
					var eventInstance = collection.at(i);
					var act_primary = eventInstance.get('act_primary');
					// var musicianMatch = false;
					// var teamMatch = false;
					// for (var j = 0; j < musicianNames.length; j++) {
					// 	if ((new RegExp(musicianNames[j])).test(act_primary)) {
					// 		musicianMatch = true;
					// 		break;
					// 	}
					// }

					// for (var k = 0; k < teamNames.length; k++) {
					// 	if ((new RegExp(teamNames[k])).test(act_primary)) {
					// 		teamMatch = true;
					// 		break;
					// 	}
					// }

					// if (musicianMatch || teamMatch) {
					// 	DisplayedCollection.add(eventInstance);
					// 	window.app.view.addEvent(eventInstance);

					// }

					var eventDateObj = eventInstance.get('eventDateObj');
					if (eventDateObj.between(d1, d2)) {
						DisplayedCollection.add(eventInstance);
						window.app.view.addEvent(eventInstance);
					}
				}
				d1 = d2.clone();
				d2 = d2.addDays(1);
			}

			d2 = d1.addDays(1);
			limit = limit.addDays(8);	

				
			

/*			window.app.hunch.meta('API-method', 'get-results');
			window.app.hunch.meta('result_ids', musicianIDs[j]);
			window.app.hunch.meta('fields', 'name,image_urls');*/
						
			
//			console.log(DisplayedCollection);
			// for (var idx = 0; idx < DisplayedCollection.length; idx++) {
			// 	var eventInstance = DisplayedCollection.at(idx);
			// 	var eventYear = eventInstance.get('eventYear');
			// 	var eventMonth = eventInstance.get('eventMonth');
			// 	var eventDate = eventInstance.get('eventDate');
			// 	var eventName = eventInstance.get('eventName');

			// 	var counter = 0;
			// 	var view = window.app.view;
			// 	for (var idx2 = 0; idx2 < collection.length; idx2++) {
			// 		var ei = collection.at(idx2);
			// 		if (counter < 6) {
			// 			if (ei.get('eventYear') === eventYear &&
			// 				ei.get('eventMonth') === eventMonth &&
			// 				ei.get('eventDate') === eventDate &&
			// 				ei.get('eventName') !== eventName) {
			// 				if (!view.hasEvent(ei)) {
			// 					window.app.view.addEvent(ei);
			// 					counter++;	
			// 				}
			// 			}
			// 		} else {
			// 			break;
			// 		}
			// 	}
			// }
		}});

		


	},
