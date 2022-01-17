function() {
				var jqElem = jQuery(this),
					spans = jqElem.find('span'),
					links = jqElem.find('a');

				// a table of contents entry looks like
				// 1. Title text ... 5
				// we get rid of the "... 5" part which repesents the page number
				spans.each(function() {
					if ( jQuery(this).attr('style') && jQuery(this).attr('style').search('mso-hide') > -1 ) {
						jQuery(this).remove();
					}
					jQuery(this).contents().unwrap();
				});

				// remove the anchor link of the toc item
				links.each(function() {
					jQuery(this).contents().unwrap();
				});
			}