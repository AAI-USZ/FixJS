function( content )  {
			// sanitize does not work in IE7. It tries to set the style attribute via setAttributeNode() and this is know to not work in IE7
			// (see http://www.it-blogger.com/2007-06-22/microsofts-internetexplorer-und-mitglied-nicht-gefunden/ as a reference)
			if (jQuery.browser.msie && jQuery.browser.version <= 7) {
				return content;
			}
			if ( typeof sanitize === 'undefined' ) {
			   initSanitize();
			}

			if ( typeof content === 'string' ){
				content = jQuery( '<div>' + content + '</div>' ).get(0);
			} else if ( content instanceof jQuery ) {
				content = jQuery( '<div>' ).append(content).get(0);
			}

			return jQuery('<div>').append(sanitize.clean_node(content)).html();
		}