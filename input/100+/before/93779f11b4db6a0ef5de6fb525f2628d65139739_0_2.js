f		window.CONFIG = new MdlConfig();
		this.view = new TimelineView();
		this.modal = new TimelineDetailView();
/*		this.view.addEvent(new StubHubEventModel({
			eventYear: 2012,
			eventMonth: 5,
			eventDate: 18,
			eventName: 'Surprise Event',
			eventDescription: 'Surprise event for those who are not surprised!'
		}));

		this.view.addEvent(new StubHubEventModel({
			eventYear: 2012,
			eventMonth: 5,
			eventDate: 18,
			eventName: 'Surprise Event 2',
			eventDescription: 'Surprise event for those who are not surprised!'
		}));

		this.view.addEvent(new StubHubEventModel({
			eventYear: 2012,
			eventMonth: 5,
			eventDate: 18,
			eventName: 'Surprise Event 3',
			eventDescription: 'Surprise event for those who are not surprised!'
		}));

		this.view.addEvent(new StubHubEventModel({
			eventYear: 2012,
			eventMonth: 5,
			eventDate: 18,
			eventName: 'Surprise Event 4',
			eventDescription: 'Surprise event for those who are not surprised!'
		}));

		this.view.addEvent(new StubHubEventModel({
			eventYear: 2012,
			eventMonth: 5,
			eventDate: 18,
			eventName: 'Surprise Event 5',
			eventDescription: 'Surprise event for those who are not surprised!'
		}));
		
		this.view.addEvent(new StubHubEventModel({
			eventYear: 2012,
			eventMonth: 5,
			eventDate: 18,
			eventName: 'Surprise Event 6',
			eventDescription: 'Surprise event for those who are not surprised!'
		}));*/
		this.hunch = new HunchRecCollection();
		//this.collection.fetch({success: function(){}});

/*		this.HunchRecCollection = new HunchRecCollection();
		this.HunchRecCollection.meta('topic_ids', 'list_musician');
		this.HunchRecCollection.meta('likes', 'hn_3570964');
		this.HunchRecCollection.meta('blocked_result_ids', 'hn_3570964');
		console.log(this.HunchRecCollection.url());
		this.HunchRecCollection.fetch();*/
		window.appHeight = 1200;
		window.cascadeTimeout = 0;
		
		setInterval(function(){
			FB.Canvas.getPageInfo(
		        function(info) {
		        	if (info.clientHeight + info.offsetTop + info.scrollTop > window.appHeight) {
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

					$('.modal').css('top', info.clientHeight + info.scrollTop - 200 + 'px');
		        }
    		);
		}, 500);

	},
