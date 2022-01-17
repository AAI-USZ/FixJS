function (image) {

		// Hide the rabbit

		bunny.css("top", ( -image.height() ) + "px");

		// Start the loop

		loop(bunny);

	}