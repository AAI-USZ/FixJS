function() {
			var field = $j(this).prev('input').attr('id');
			var path = $j(this).attr('rel');
			BrowseFileServer(field, path);
			return false;
		}