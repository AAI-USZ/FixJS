function(obj, index, colwidth, rowHeight) {
		var style = getStyle(index);
		
		obj.addClass(style.name);
		obj.css({
			'width': colwidth,
            'left': style.x * colwidth,
            'top': style.y * rowHeight
		});
	}