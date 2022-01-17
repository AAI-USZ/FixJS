function(eventList) {
						that.reset(eventList.items.map(function(evt) { return _convert_event(evt); }));
						deferred.resolve(that);
					}