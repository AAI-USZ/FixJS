function() {

		var parts, query, result;

		result = false;

		// Detect whether parameter id is present
		parts = document.location.href.split('?');
		if (parts.length > 0) {
			query = Ext.urlDecode(parts[1]);
			if (query.id > 0) {
				result = true;
			}
		}
		return result;
	}