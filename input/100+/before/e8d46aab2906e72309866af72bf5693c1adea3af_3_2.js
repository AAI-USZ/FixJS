function(caption, captionText) {
		var that = this;
		var cSpan = caption.children('div').eq(0);
		if (cSpan.length == 0) {
			// generate a new div
			cSpan = jQuery('<div></div>');
			jQuery(cSpan).addClass('aloha-ui');
			jQuery(cSpan).addClass('aloha-editable-caption');
			if (caption.contents().length > 0) {
				// when the caption has content, we wrap it with the new div
				caption.contents().wrap(cSpan);
			} else {
				// caption has no content, so insert the default caption text
				if (captionText) {
					cSpan.text(captionText);
				}
				// and append the div into the caption
				caption.append(cSpan);
			}
		}
		// make the div editable
		cSpan.contentEditable(true);
		cSpan.unbind('mousedown');
		// focus on click
		cSpan.bind('mousedown', function(jqEvent) {
			cSpan.focus();
			// stop bubble, otherwise the mousedown of the table is called ...
			jqEvent.preventDefault();
			jqEvent.stopPropagation();
			return false;
		});
	}