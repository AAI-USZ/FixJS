function(eventList) {
						if (eventList.items) {
							that.reset(eventList.items.map(function(evt) { return _convert_event(evt); }));
						}
						deferred.resolve(that);
					}