function(data, styleClass) {
		//get ids as array
		var ids = data.split(",");
		// loop and add class
		for (var i = 0; i < ids.length; i++) {
			var obj = document.getElementById(ids[i]);
			$(obj).addClass(styleClass);
		}
	}