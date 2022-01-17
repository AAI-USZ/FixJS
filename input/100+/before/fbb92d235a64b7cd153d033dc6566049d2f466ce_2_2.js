function(sectionToBeRemoved){
		if ( null === sectionToBeRemoved ){
			callback("This section does not exist " + args.section , null );
		}
		else {
			sectionToBeRemoved.destroy().error(function(error){
				callback(error, null);
			}).success( function ( removedSection ){
				
			callback( null,sectionToBeRemoved);
			});
		}
	}