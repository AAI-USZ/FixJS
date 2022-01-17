function () {
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
		}