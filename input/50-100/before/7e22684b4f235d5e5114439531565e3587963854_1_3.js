function() {
		
		var observations = [];
		
		var observation_current = null;
		for(observation in this.retrievedResultObservations) {
			observation_current = this.retrievedResultObservations[observation];
			
		}
		
		console.log(this.retrievedResultObservations);
		console.log(this.dimensions);
	}