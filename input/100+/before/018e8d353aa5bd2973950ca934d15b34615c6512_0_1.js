function() {

	var start_animation = function(element) {

		element.delay(5000).animate({top: 0}, 3000, "easeInBounce")

		.promise().pipe(function() {

			element.delay(2000).animate({top: -element.height()});

		})

	    .promise().pipe(function() {

			start_animation(element);

		});

	}

	

	var bunny = $("#upside_down");

	

	// Wait for image to be loaded.

	$("img", bunny).bind("load", function(evt) {

		var height = $(evt.target).height();

		bunny.css("top", - bunny.height() + "px");

		start_animation(bunny);

	});

	

}