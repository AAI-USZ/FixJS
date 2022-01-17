function() {
				var jqElem = jQuery(this),
					spans = jqElem.find('span'),
					links = jqElem.find('a');
				
				// remove TOC numbering
				spans.each(function() {
					if (jQuery(this).text().trim().match(/^([0-9]{1,3}\.)|([0-9]{1,3}\))|([a-zA-Z]{1,5}\.)|([a-zA-Z]{1,5}\))$/)) {
						jQuery(this).remove();
					}
				})
				
				// remove TOC anchor links
				links.each(function() {
					if ( typeof jQuery(this).attr('href') === 'undefined' ) {
						jQuery(this).contents().unwrap();
					}
				});
				
			}