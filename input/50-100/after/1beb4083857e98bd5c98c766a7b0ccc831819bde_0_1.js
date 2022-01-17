function(name, url, options) {
		options = $.extend({}, {
					status : 0,
					toolbar : 0,
					location : 0,
					titlebar : 0,
					menubar : 0,
					resizable : 1,
					scrollbars : 1,
					width : 1024,
					height : 600
				}, options)
		var os = 'directories=0'
		$.each(options, function(k, v) {
			os += ',' + k + '=' + v
		})
		window.open(url, name, os)
	}