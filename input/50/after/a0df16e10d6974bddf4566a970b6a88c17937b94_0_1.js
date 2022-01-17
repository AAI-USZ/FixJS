function(e) {
			// Check if ctrl or meta key is pressed also check if alt is false for Polish users
			return tinymce.isMac ? e.metaKey : e.ctrlKey && !e.altKey;
		}