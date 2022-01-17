function(e) {

			if ($(e.relatedTarget).parents('.item').get(0) != $(this).get(0)) {
				aigua.resetMenu();
			}
		}