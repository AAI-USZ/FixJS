function(index) {
		var x = index % settings.numOfCol;
		var row = Math.floor(index / settings.numOfCol);

		// if the current row is odd we go right to left, so we
		// substract the current X to the total number of rows
		var style = {
			x: row % 2 ? settings.numOfCol - x - 1 : x,
            y: row,
            name: ''
		};

		// when we fill the whole row we move to the next one and set the style
		// on the items on the corners
		if (x == (settings.numOfCol-1)) {
			style.name = style.y % 2 ? 'snaky-item-top-left' : 'snaky-item-top-right';
		} else if (x === 0) {
			style.name = style.y % 2 ? 'snaky-item-bottom-right' : 'snaky-item-bottom-left';
		}
		
		return style;
	}