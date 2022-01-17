function(obj) {
		var curleft = curtop = 0;

		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}

		return {left: curleft, top: curtop};
	}