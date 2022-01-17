function(obj) {
	
		if( !obj || !jQuery(obj).length > 0 ) {	
			return false;
		}

		obj = jQuery(obj);

		// we have to check the content of this object without the annotation span
		var objCleaned = obj.clone().find('span[role=annotation]').remove().end();

		// check for text, also in other possible sub tags
		if ( objCleaned.text().trim().length > 0 ) {
			return true;
		}
	
		return false;
	}