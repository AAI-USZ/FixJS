function (el) {

		el.style.zoom = 1;

		if (el.currentStyle.position == 'static') {

			el.style.position = 'relative';

		}

	}