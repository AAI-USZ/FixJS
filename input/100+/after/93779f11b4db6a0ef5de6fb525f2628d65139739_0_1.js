f		        	if (info.clientHeight + info.offsetTop + info.scrollTop > window.appHeight) {
		        		console.log('infinite scrolling!');
		        		window.cascadeTimeout = 0;
		        		FB.Canvas.setSize({height: window.appHeight+1200});
		        		window.appHeight = window.appHeight+1200;
						
						//for (var idx = 0; idx < collection.length; idx++) {
							//var counter = 0;
						if (typeof d1 != 'undefined' &&
							typeof d2 != 'undefined' &&
							typeof limit != 'undefined') {
							while (!d1.equals(limit)) {
								for (var i = 0; i < window.app.collection.length; i++) {			
									var eventInstance = window.app.collection.at(i);
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
							console.log('d1: ' + d1);
							console.log('d2: ' + d2);
							console.log('limit: ' + limit);
				        	d1 = limit.clone();
							d2 = d1.addDays(1);
							limit = limit.addDays(8);
							if (limit.isAfter(window.app.collection.at(window.app.collection.length-1).eventDateObj)) {
								window.app.collection.meta('event_date_time_local', '[' + DateUtil.convertToStubDate(limit) + ' TO *]');
								window.app.collection.fetch();
							}
						}
		        	}

					$('.modal').css('top', info.clientHeight + info.scrollTop - 300 + 'px');
		        }
