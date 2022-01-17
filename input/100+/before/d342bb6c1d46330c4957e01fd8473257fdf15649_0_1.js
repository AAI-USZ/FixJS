function selectMenu(page, params) {
		console.log(!page || typeof(page) != 'string');
		if (!page || typeof(page) != 'string') {
			/.*\/(.+?)$/.test(location.href);
			/(\w+)(\?\w+=)(\d+)/.test(RegExp.$1);
			page = RegExp.$1;
			params = {"x": RegExp.$3};
			console.log('x');
		}
		var cls = page;
		for (key in params)
			cls += params[key];
		$('#lists .selected').removeClass('selected');
		$('#lists .' + cls).addClass('selected');
		console.log($('#lists .' + cls));
	}