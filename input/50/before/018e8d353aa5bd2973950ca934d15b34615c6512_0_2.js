function(evt) {

		var height = $(evt.target).height();

		bunny.css("top", - bunny.height() + "px");

		start_animation(bunny);

	}