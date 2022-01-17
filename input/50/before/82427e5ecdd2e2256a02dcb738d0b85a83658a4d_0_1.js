function () {
				// Remove empty class attributes
				if (jQuery(this).attr('class').length === 0) {
					jQuery(this).removeAttr('class');
				}
			}