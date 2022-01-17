function() {

	var loop = function(element) {

		element.delay(5000).animate({top: 0}, 3000, "easeInBounce")

		.promise().pipe(function() {

			element.delay(2000).animate({top: -element.height()});

		})

		.promise().pipe(function() {

			loop(element);

		});

	}

	

	var bunny = $("#upside_down");

	var img = bunny.find("img");

	

	var start_animation = function (image) {

		// Hide the rabbit

		bunny.css("top", ( -image.height() ) + "px");

		// Start the loop

		loop(bunny);

	}

	

	// Wait for image to be loaded, watch for cached images

	if (img[0].complete) {

		start_animation(img);

	} else {

		bunny.find("img").bind("load", function(evt) {

			start_animation($(evt.target));

		});

	}

	

}