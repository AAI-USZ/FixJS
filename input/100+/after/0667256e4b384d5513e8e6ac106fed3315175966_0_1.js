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
				top: position.top,
				left: position.left
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

		// IE7 will not properly set the position property to "fixed" if our
		// element is not rendered.  We therefore have to do a rigmarore to
		// temorarily render the element in order to set the position
		// correctly.
		if ($.browser.msie) {
			var $parent = surface.$element.parent();
			surface.$element.appendTo('body');
			surface.$element.css('position', 'fixed').appendTo($parent);
		} else {
			surface.$element.css('position', 'fixed');
		}

		if (!SurfaceTypeManager.isFloatingMode) {
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