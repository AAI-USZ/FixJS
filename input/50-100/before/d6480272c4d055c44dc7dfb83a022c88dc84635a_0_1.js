function(obj, index) {
		var style = getStyle(index);
		var itemWidth = colwidth - (obj.outerWidth() - obj.width());

		obj.css({
			'width': itemWidth,
			'left': style.x * itemWidth,
			'top': style.y * (settings.rowHeight + settings.itemHeight),
			'height': settings.itemHeight,
		});

		obj.addClass('snaky-item ' + style.class);
	}