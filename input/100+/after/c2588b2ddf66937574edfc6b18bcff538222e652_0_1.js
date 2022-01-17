function showValue(value, line, fromCol, toCol, cmLinesNode, cm) {
		removePopup();
		
		// Create the popup with an ID for CSS
		var $popup = $("<div>").attr("id", "jdiehl-debugger-variable-value");
		// Make the text movable independent of the rest (the arrow) by wrapping it in another div
		var $text  = $("<div>").text(value).appendTo($popup);
		// Append the popup to a node compatible with "local" coordinates as used below
		$("> div:last", cmLinesNode).append($popup);

		// Prevent a weird effect when a variable is in the first column and the cursor is left of it
		if (toCol === 0) { toCol = 1; }
		// Get the pixel coordinates of the left and right end of the token
		var left   = cm.charCoords({ line: line, ch: fromCol }, "local");
		var right  = cm.charCoords({ line: line, ch: toCol   }, "local");
		// Right shift to the middle of the token
		left.x += Math.round((right.x - left.x) / 2);
		// Left shift so that the middle of the text is at the middle of the token
		left.x -= Math.round($popup.outerWidth() / 2);
		// Position the popup
		$popup.css({ left: left.x, top: left.y });

		// Minimum left coordinate, negative so the arrow does not overlap the rounded corner
		var minLeft = -8;
		// Shift the text part of the popup to the right if it is cut off
		if (left.x < minLeft) {
			// Setting margin-right = -1 * margin-left keeps left: 50% intact (for the arrow)
			$text.css({ 'margin-left': minLeft - left.x, 'margin-right': - (minLeft - left.x) });
		}
		
		return $popup;
	}