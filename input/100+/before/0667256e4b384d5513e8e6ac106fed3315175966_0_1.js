function makeFloating(surface, SurfaceTypeManager) {
		subguarded([
			'aloha-selection-changed',
			'aloha.ui.container.selected'
		], onActivatedSurface, surface, function () {
			surface._move();
		});

		var updateSurfacePosition = function () {
			var position = forcePositionIntoWindow({
				top: SurfaceTypeManager.pinTop,
				left: SurfaceTypeManager.pinLeft
			});

			SurfaceTypeManager.setFloatingPosition(position);

			surface.$element.css({
				'position': 'fixed',
				'top': position.top,
				'left': position.left
			});
		};

		$window.scroll(function () {
			// TODO: only do this for active surfaces.
			surface._move(0);
		});

		$window.resize(function () {
			if (!SurfaceTypeManager.isFloatingMode) {
				updateSurfacePosition();
			}
		});

		surface.addPin();

		if (SurfaceTypeManager.isFloatingMode) {
			surface.$element.css('position', 'fixed');
		} else {
			updateSurfacePosition();
		}

		surface.$element.css('z-index', 10100).draggable({
			'distance': 20,
			'stop': function (event, ui) {
				SurfaceTypeManager.setFloatingPosition(ui.position);
				if (!SurfaceTypeManager.isFloatingMode) {
					storePinPosition(ui.position);
				}
			}
		});

		// Resizable toolbars are possible, and would be a nice feature.
		//surface.$element.resizable();
	}