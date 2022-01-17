function() {
			var field = $j(this).prev('input').attr('id');
			BrowseFileServer(field);
			return false;
		}