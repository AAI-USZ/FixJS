function (e) {
					if ($popup.attr('aria-hidden') === 'false' && !$(e.target).is($popup) && !$(e.target).is($popupText) && $(e.target).closest($popup).length === 0) {
						$popup.trigger("close");
					}
				}