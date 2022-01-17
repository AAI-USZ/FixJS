function(obj, index, colwidth) {
		var style = getStyle(index);
		
		obj.css({
			'width': colwidth,
            'left': style.x * colwidth,
            'top': style.y * (settings.rowGap + settings.itemHeight),
            'height': settings.itemHeight
		});

		obj.addClass('snaky-item ' + style.name);
	}