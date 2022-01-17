f		window.CONFIG = new MdlConfig();
		this.view = new TimelineView();
		this.modal = new TimelineDetailView();
		this.collection = new StubHubEventCollection();
		this.hunch = new HunchRecCollection();

		this.geo = new GeoLocationModel();

/*		this.HunchRecCollection = new HunchRecCollection();
		this.HunchRecCollection.meta('topic_ids', 'list_musician');
		this.HunchRecCollection.meta('likes', 'hn_3570964');
		this.HunchRecCollection.meta('blocked_result_ids', 'hn_3570964');
		console.log(this.HunchRecCollection.url());
		this.HunchRecCollection.fetch();*/
		window.appHeight = 1200;
		window.cascadeTimeout = 0;
		window.loadingMore = false;
		
		setInterval(function(){
			FB.Canvas.getPageInfo(
		        function(info) {
		        	if (info.clientHeight + info.offsetTop + info.scrollTop > window.appHeight) {
		        		if (!loadingMore) {
		        			loadingMore = true;

		        			console.log('infinite scrolling!');
			        		window.cascadeTimeout = 0;
			        		FB.Canvas.setSize({height: window.appHeight+1200});
			        		window.appHeight = window.appHeight+1200;
							
							//for (var idx = 0; idx < collection.length; idx++) {
								//var counter = 0;
							console.log('d1: ' + d1);
							console.log('d2: ' + d2);
							console.log('limit: ' + limit);
							if (typeof d1 != 'undefined' &&
								typeof d2 != 'undefined' &&
								typeof limit != 'undefined') {
								if (limit.isAfter(window.app.collection.at(window.app.collection.length-1).get('eventDateObj'))) {
									var lastDate = window.app.collection.at(window.app.collection.length-1).get('eventDateObj').clone();
									while (d1.getDate() !== lastDate.getDate()) {
										for (var i = 0; i < window.app.collection.length; i++) {			
											var eventInstance = window.app.collection.at(i);
											var eventDateObj = eventInstance.get('eventDateObj');
											if (eventDateObj.between(d1, d2)) {
												DisplayedCollection.add(eventInstance);
												window.app.view.addEvent(eventInstance);
											}
										}
										
										d1 = d2.clone();
										d2 = d2.addDays(1);
										console.log('d1: ' + d1 );
										console.log('d2: ' + d1 );
									}
									var temp1 = d1.clone();
									var temp2 = d1.clone();
									d2 = temp1.addDays(1);
									limit = temp2.addDays(8);

									window.app.collection.meta('event_date_time_local', '[' + DateUtil.convertToStubDate(lastDate) + ' TO *]');
									window.app.collection.fetch({success: function() {
										while (!d1.equals(limit)) {
											for (var i = 0; i < window.app.collection.length; i++) {			
												var eventInstance = window.app.collection.at(i);
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
									}});
								} else {
									while (!d1.equals(limit)) {
										for (var i = 0; i < window.app.collection.length; i++) {			
											var eventInstance = window.app.collection.at(i);
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
								}
								

								console.log('d1: ' + d1);
								console.log('d2: ' + d2);
								console.log('limit: ' + limit);
							}

							loadingMore = false;
		        		}
		        		
		        	}

					$('.modal').css('top', info.clientHeight + info.scrollTop - 300 + 'px');
					$('#header-container').css('top', info.scrollTop + 'px');
		        }
    		);
		}, 500);

	},
