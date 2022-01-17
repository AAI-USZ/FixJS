function(e) {

			if ($(e.toElement).parents('.item').get(0) != $(this).get(0)) {
				aigua.resetMenu();
			}
		}