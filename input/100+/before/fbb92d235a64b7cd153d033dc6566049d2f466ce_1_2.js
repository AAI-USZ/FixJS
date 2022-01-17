function( courseSections ){
		var sectionID = new Array();
		var i = courseSections.length - 1;
		for (; i >= 0; i--){
			sectionID.push( courseSections[i].section );
		}
		callback( null, sectionID );
		return;
	}