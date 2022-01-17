function(name) {
			console.log(name);
			collection.meta('description', name);
			collection.meta('event_date_time_local', '[2012-07-01T00:00:00Z TO 2012-08-01T00:00:00Z]');
			collection.fetch();		
		}