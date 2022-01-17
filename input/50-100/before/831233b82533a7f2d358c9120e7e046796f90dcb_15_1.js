function(obj) {
	
		if(!obj || !jQuery(obj).length > 0){	
			return false;
		}

		obj = jQuery(obj);

		if( obj.find('span[role=annotation]').length > 0 ) {
			return true;
		}

		return false;
	}