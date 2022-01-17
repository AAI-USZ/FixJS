function buildFormats(str) {
				var formats = [];

				each(str.split(/,/), function(type) {
					formats.push({
						title : 'advlist.' + (type == 'default' ? 'def' : type.replace(/-/g, '_')),
						styles : {
							listStyleType : type == 'default' ? '' : type
						}
					});
				});

				return formats;
			}