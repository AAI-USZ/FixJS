function(editable) {
			var that = this;
			var config = that.getEditableConfig(editable);

			if(jQuery.inArray('true',config) === -1) {
				// Return if the plugin should do nothing in this editable
				return false;
			}

			jQuery(editable).find('h1, h2, h3, h4, h5, h6').not('.aloha-customized').each(function(){ 
				that.processH(this); 
			});

		}