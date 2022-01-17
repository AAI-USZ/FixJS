function() {
					if ( jQuery(this).attr('style') && jQuery(this).attr('style').search('mso-hide') > -1 ) {
						jQuery(this).remove();
					}
					jQuery(this).contents().unwrap();
				}