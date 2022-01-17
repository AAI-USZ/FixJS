function _setOptions(sel, opts) {
		var data = sel.data('freetrans'),
		divs = data.divs;
		
		data = $.extend(data, opts);
		data.divs = divs;
	}