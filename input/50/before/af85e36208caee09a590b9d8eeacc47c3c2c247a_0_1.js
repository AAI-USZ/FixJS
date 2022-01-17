function () {
				controller.show(settings);

				expect($('.url-input:focus').length).toBe(1);
			}