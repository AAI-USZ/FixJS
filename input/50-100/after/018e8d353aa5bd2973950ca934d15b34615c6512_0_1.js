function(element) {

		element.delay(5000).animate({top: 0}, 3000, "easeInBounce")

		.promise().pipe(function() {

			element.delay(2000).animate({top: -element.height()});

		})

		.promise().pipe(function() {

			loop(element);

		});

	}