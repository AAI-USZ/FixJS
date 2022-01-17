function() {
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
					// var act_primary = eventInstance.get('act_primary');
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

			var temp = new Date();
			temp = d1.clone();
			d2 = temp.addDays(1);
			limit = limit.addDays(8);	

			console.log('d1: ' + d1);
			console.log('d2: ' + d2);
			console.log('limit: ' + limit);

			//Checking for no event dates
			var dateObj = new Date();
			while (dateObj.isBefore(d2)) {
				var containsDate = false;
				for (var j = 0; j < window.DisplayedCollection.length; j++) {
					var eventInstance = DisplayedCollection.at(j);
					if (eventInstance.get('eventMonth') === dateObj.getMonth()) {
						if (dateObj.getDate() === eventInstance.get('eventDate')) {
							containsDate = true;
							break;
						}
					}
				}
				if (!containsDate) {
					var mdl = new StubHubEventModel();
					mdl.setEventTime(dateObj);
					var monthViews = window.app.view.meta('timelineMonthViews');
					for (var k = 0; k < monthViews.length; k++) {
						var mv = monthViews[k];
						if (mv.meta('eventMonth') === dateObj.getMonth()) {
							var dateViews = mv.meta('timelineItemViews');
							for (var l = 0; l < dateViews.length; l++) {
								var dv = dateViews[l];
								console.log('dv.meta("dateNumber"): ' + dv.meta('dateNumber'));
								console.log('dateObj.getDate(): ' + dateObj.getDate());
								if (dv.meta('dateNumber')-1 === dateObj.getDate()) {
									console.log(dv.el);
									DisplayedCollection.add(mdl);
									window.app.view.insertEvent(mdl, dv);
								}
							}
						}
					}
					console.log('making eventMdl for date: ' + dateObj);
				}
				// if (!window.app.view.hasDate(dateObj)) {
				// 	console.log('missing date: ' + dateObj);
				// }
				dateObj = dateObj.addDays(1);
			}
			
			

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
		}}