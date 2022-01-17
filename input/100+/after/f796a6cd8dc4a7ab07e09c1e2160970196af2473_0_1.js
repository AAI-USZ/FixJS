function(rdfcollection) {
		"strict mode";
		var placesCollection = rdfcollection.get_rdf('http://data.southampton.ac.uk/dumps/places/2012-06-06/places.rdf');
		var eventsCollection = rdfcollection.get_rdf('http://data.southampton.ac.uk/dumps/events-diary/2012-06-29/events-diary.rdf');

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
		    console.log("done");                    
                    window.places = placesCollection;
                    window.events = eventsCollection;
			console.log(placesCollection);
			console.log(eventsCollection);
		}).fail(function(e) {
			console.error(e);
		});
	}