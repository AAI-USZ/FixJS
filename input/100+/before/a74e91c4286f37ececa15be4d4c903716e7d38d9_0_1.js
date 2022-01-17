function(bytes, options) {
		var i, units, defaults = {
			units: 'short'
		};
		options = $.extend({}, defaults, options || {});
		bytes = parseInt(bytes, 10);
		units = {
			10: options.units === 'short'? ' B' :  ' Bytes',
			20: options.units === 'short'? ' KB' : ' Kilobytes',
			30: options.units === 'short'? ' MB' : ' Megabytes',
			40: options.units === 'short'? ' GB' : ' Gigabytes',
            50: options.units === 'short'? ' TB' : ' Terabytes',
            60: options.units === 'short'? ' PB' : ' Petabytes'
		};

		for (i in units)
			if (bytes < Math.pow(2, i))
				return (bytes / Math.pow(2, i-10)).toFixed(1) + units[i];
		return (bytes / Math.pow(2, 30)).toFixed(1) + units[60];
	}