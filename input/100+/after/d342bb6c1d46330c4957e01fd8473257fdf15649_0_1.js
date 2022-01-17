function selectMenu(page, params) {
		if (!page || typeof(page) != 'string') {
			/.*\/(.+?)$/.test(location.href);
			/(\w+)(\?\w+=)(\d+)/.test(RegExp.$1);
			page = RegExp.$1;
			params = {"x": RegExp.$3};
		}
		var cls = page;
		for (key in params)
			cls += params[key];
		$('#lists .selected').removeClass('selected');
		$('#lists .' + cls).addClass('selected');
	}