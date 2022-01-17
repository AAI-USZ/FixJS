function(span) {
			// we check the selected span for line breaks
			var response = this.checkLineBreaks(span);
			if(response) {
				// if we find any we turn those into a list
				var html = span.html().replace(/(<div>)?<br>|(<div>)+/gi, '<li>')
							.replace(/<\/div>/gi, '</li>');
				span.html(html);
				return true; // we created a list
			} else {
				return false; // no list
			}
		}