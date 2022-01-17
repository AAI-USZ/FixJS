function() {
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
		}