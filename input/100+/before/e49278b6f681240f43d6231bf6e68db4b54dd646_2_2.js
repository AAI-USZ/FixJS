function ( content ) {
			
			// remove empty tags
			content.find('*').filter( function() {
			    return jQuery.trim(jQuery(this).html()) == '';
			}).remove();
			
			// http://stackoverflow.com/questions/4232961/jquery-remove-a-tag-but-keep-innerhtml
			content.find('span').contents().unwrap();
		}