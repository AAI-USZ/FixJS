function( error, courseSections ){
    	if ( error ){
    			callback( error, null );
    			return;
    	}
    	args.sections = courseSections;
    	Section.findSection( args, function( error, section ){
    		if ( error ){
    			callback( error, null );
    			return;
    		}
    		args.sectionObject = section;
    		args.title = args.newtitle;
    		Section.updateSection( args, function( error, updatedSection ){
    			callback( null, updatedSection );
    		});
    	});
    }