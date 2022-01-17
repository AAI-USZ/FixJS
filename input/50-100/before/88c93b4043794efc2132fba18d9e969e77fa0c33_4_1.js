function (e) {
				if (opened && !$(e.target).is(elm) && $(e.target).closest(elm).length === 0) {
					toggle();
				}
			}