function (opt) {
		var $optElem = $('.option');

		for (var i in opt) {
			var v = opt[i];
			v = slashAdd(v);
			$optElem.filter('#' + i).val(v);
		}
	}