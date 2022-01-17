function(el) {
		return {
			elm: el,
			defaults: {
				width: el.width(),
				height: el.height(),
				left: parseInt(el.css("left"),10),
				top: parseInt(el.css("top"),10)
			},
			expanded: {
				width: parseInt(el.attr("width"),10),
				height: parseInt(el.attr("height"),10),
				left: parseInt(el.css("left"),10),
				top: parseInt(el.css("top"),10)
			}
		};
	}