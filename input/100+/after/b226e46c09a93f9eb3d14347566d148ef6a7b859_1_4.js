function(options){
				if (_.isString(options)){
					options = {message: options};
				}
				var settings = $.extend({}, this.attributes, options);
				if (settings.title && options.dialog === undefined) {
					settings.dialog = true;
				}
				if ((settings.modal || settings.dialog) && options.hideOnClick === undefined) {
					settings.hideOnClick = false;
				}
				if (settings.dialog && options.ms === undefined) {
					settings.ms = null;
				}
				if (settings.dialog && options.position === undefined) {
					settings.position = 'center';
				}
				return settings;
			}