function() {
			var uid = $(this).parent().parent().attr('data-name');
			wn.pages.users.show_settings(uid);
		}