function(e) {

			if (e.which == 17) {

				// hide the slider
				aigua.slider.hide();

				// reset filler width
				aigua.filler.width(0);

				// reset bar width
				aigua.bar.width(aigua.startingBarWidth);

				// clear out the original number
				aigua.originalNumber = null;
			}
		}