function(type, id, options) {
		if (options == null || typeof options != 'object') {
			options = {};
		}

		// default group is the turtle's name. if a manual group name is passed,
		// the turtle will be grouped in a different placeholder class
		if (!options.group) {
			options.group = type;
		}

		// default colspan width
		if (!options.colspan) {
			options.colspan = 1;
		}

		/*
		 * All turtles instances are grouped in a separate <section> for each
		 * turtle group. If no group is set from the options the turtle's name
		 * is used, otherwise different turtles can be grouped in the same
		 * column with this group name.
		 */
		var group = $('section.group#' + options.group);
		if (group.length == 0) {
			group = $('<section class="group" id="' + options.group + '" data-colspan="' + options.colspan + '"></section>');
			
			// add group colspan to total columns
			columns += parseInt(options.colspan);

			// add group to main container
			$(rootElement).append(group);
			
			/*
			 * This group's width is automatically calculated depending on the
			 * total number of columns and the set colspan.
			 */
			var i = 0, left = 100;
			
			// chrome is a bitch
			/*if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
				left = 100.1;*/
			
			$('section.group').each(function() {
				var width = Math.floor((100 / columns) * $(this).data('colspan'));
				i++;
				
				if(i == $('section.group').length) {
					$(this).width(left + '%');
					$(this).attr('data-width', left);
				} else {
					$(this).width(width + '%');
					$(this).attr('data-width', width);
					left -= width;
				}
			});
		}

		// create placeholder and append it to the group
		options.el = $('<div class="turtle" id="' + id + '"></div>');
		$(group).append(options.el);

		// if a turtle does not have a source, still do a last effort
		if (!options.source)
			options.source = 'turtles/' + type + '/' + type + '.js';

		/*
		 * Preloading the i18n file. This file needs to be located in a /i18n
		 * folder that contains javascript files for each supported language
		 * code. Example: "turtle/i18n/nl.js" for dutch
		 * 
		 * These javascript files are fetched using ajax and the resulting i18n
		 * object is passed as an options to your module's components.
		 */
		if (infoScreen.lang) {
			var location = options.source.substring(0, options.source.lastIndexOf('/') + 1) + 'i18n/';

			$.ajax({
				url : location + infoScreen.lang + '.js',
				dataType : 'script',
				async : false, // we need to wait and pass this to the instance
				success : function() {
					// i18n object found!
					if (i18n !== undefined) {
						options.i18n = i18n;
					} else {
						// The requested language file did not contain the i18n
						// object, using default language as fallback
						$.ajax({
							url : location + defaultLanguage + '.js',
							dataType : 'script',
							async : false, // we need to wait and pass this to the instance
							success : function() {
								// i18n object found!
								if (i18n !== undefined) {
									options.i18n = i18n;
								}
							},
							error : function() {
								options.i18n = {};
							}
						});
					}
				},
				error : function() {
					// Error occurred while loading the requested language file,
					// using default language as fallback
					$.ajax({
						url : location + defaultLanguage + '.js',
						dataType : 'script',
						async : false, // we need to wait and pass this to the instance
						success : function() {
							// i18n object found!
							if (i18n !== undefined) {
								options.i18n = i18n;
							}
						},
						error : function() {
							options.i18n = {};
						}
					});
				}
			});
		}

		// fetch the turtle script once
		if (!this.registered(type)) {
			var self = this;
			// load turtle javascript
			$.ajax({
				url : options.source,
				dataType : 'script',
				async : false, // to prevent duplicate javascript file loading
				success : function() {
					self.instantiate(type, id, options);
				}
			});
		} else {
			this.instantiate(type, id, options);
		}
	}