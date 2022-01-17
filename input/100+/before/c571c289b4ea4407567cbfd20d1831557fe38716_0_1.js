function(rdfcollection) {
		"strict mode";
		// DEBUG: Replace "window. " with "var "
		window.placesCollection = rdfcollection('http://data.southampton.ac.uk/dumps/places/2012-06-06/places.rdf');
		window.eventsCollection = rdfcollection('http://data.southampton.ac.uk/dumps/events-diary/2012-06-29/events-diary.rdf');

		var newEventCollection = new Backbone.Collection();

		$.when(
			placesCollection.fetch(),
			eventsCollection.fetch().then(function() {
				eventsCollection.models.map(function(model) {
					var separatorPos = model.attributes._id.indexOf('#') === -1 ?
										model.attributes._id.length :
										model.attributes._id.indexOf('#');
					var eventID = model.attributes._id.substring(0,separatorPos);
					var propertyName = model.attributes._id.substring(separatorPos);
					console.log(eventID+" : "+propertyName);
					eventModel = newEventCollection.get(eventID) |
									(function() {
										model = new Backbone.Model({_id:eventID});
										newEventCollection.add(model);
										return model;
									})();
					
				})
			})
		).done(function() {
		}).fail(function(e) {
			console.error(e);
		});
	}