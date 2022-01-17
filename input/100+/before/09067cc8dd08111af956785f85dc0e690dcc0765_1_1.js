function() {
				return History.getState().url
					.replace(/\?.*/, '')
					.replace(/#.*/, '')
					.replace($('base').attr('href'), '');
			}