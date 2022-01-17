function(caption, captionText) {
		var that = this;
		var cSpan = caption.children('div');
		if (cSpan.length === 0) {
			// generate a new div
			cSpan = jQuery('<div></div>');
			jQuery(cSpan).addClass('aloha-ui');
			jQuery(cSpan).addClass('aloha-editable-caption');
			if (caption.contents().length > 0) {
				// when the caption has content, we wrap it with the new div
				cSpan.append(caption.contents());
				caption.append(cSpan);
			} else {
				// caption has no content, so insert the default caption text
				if (captionText) {
					cSpan.text(captionText);
				}
				// and append the div into the caption
				caption.append(cSpan);
			}
		} else if (cSpan.length > 1) {
			// merge multiple divs (they are probably created by IE)
			caption.children('div:not(:first-child)').each(function () {
				$this = jQuery(this);
				cSpan.eq(0).append($this.contents());
				$this.remove();
			});
			cSpan = cSpan.eq(0);
		}
		// make the div editable
		cSpan.contentEditable(true);
	}