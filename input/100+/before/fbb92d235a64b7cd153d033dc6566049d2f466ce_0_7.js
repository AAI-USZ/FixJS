function( error, courseSections ){
		SectionImpl.findAll({ where : { uuid : courseSections }}).success(function( sections ){
			var retSections = new Array();
			var x = sections.length -1 ;
			for ( ; x >= 0; x-- ){
				retSections.push(sections[x]);
			}
			callback( null, retSections );
			return;
		}).error( function ( error ) {
			callback( error, null );
		});
	}