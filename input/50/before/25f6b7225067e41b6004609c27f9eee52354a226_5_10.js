function(value){
		// summary: Escapes a string's HTML
		return dd.mark_safe(value.replace(escapeamp, '&amp;').replace(escapelt, '&lt;').replace(escapegt, '&gt;').replace(escapedblqt, '&quot;').replace(escapeqt, '&#39;'));
	}