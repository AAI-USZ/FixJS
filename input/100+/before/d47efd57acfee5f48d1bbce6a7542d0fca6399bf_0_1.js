function() {
		// set roles
		$('.users-area').on('click', '.btn.user-roles', function() {
			var uid = $(this).parent().parent().attr('data-name');
			wn.pages.users.role_editor.show(uid);
		});

		// settings
		$('.users-area').on('click', '.btn.user-settings', function() {
			var uid = $(this).parent().parent().attr('data-name');
			wn.pages.users.show_settings(uid);
		});
		
		// delete
		$('.users-area').on('click', 'a.close', function() {
			$card = $(this).parent();
			var uid = $card.attr('data-name');
			$card.css('opacity', 0.6);
			wn.call({
				method: 'utilities.page.users.users.delete',
				args: {'uid': uid},
				callback: function(r,rt) {
					if(!r.exc)
						$card.fadeOut()
				}
			});
		})
		
	}