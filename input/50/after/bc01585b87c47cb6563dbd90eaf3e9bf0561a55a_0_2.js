function() {
			var field = $j(this).prev('input').attr('id');
			BrowseServer(field);
			return false;
		}