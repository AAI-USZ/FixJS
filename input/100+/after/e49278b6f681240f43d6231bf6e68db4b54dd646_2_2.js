function ( content ) {
			
			// unwrap empty tags
			// do not remove them here because of eg. spaces wrapped in spans which are needed
			content.find('*').filter( function() {
				return jQuery.trim(jQuery(this).text()) == '';
			}).contents().unwrap();
			
			// unwrap all spans
			content.find('span').contents().unwrap();
			
			// when href starts with #, it's the link to an anchor. remove it.
			content.find('a').each(function() {
				if ( jQuery(this).attr('href') && jQuery(this).attr('href').trim().match(/^#(.*)$/) ) {
					jQuery(this).contents().unwrap();
				}
			});
			
			// eg. footnotes are wrapped in divs. unwrap them.
			content.find('div').contents().unwrap();
			
			// remove empty tags
			content.find('*').filter( function() {
			    return jQuery.trim(jQuery(this).text()) == '';
			}).remove();
			
		}