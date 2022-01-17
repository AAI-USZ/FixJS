function (event) {

			var view = $(document).fracs('viewport');

			x = event.pageX;
			y = event.pageY;
			l = x;
			t = y;
			w = 0;
			h = 0;

			// only on left button and don't block the scrollbars
			if (event.button !== 0 || l >= view.right || t >= view.bottom) {
				return;
			}

			event.preventDefault();
			$(':focus').blur();
			if (!ctrlKeyPressed) {
				$('#extended .entry').removeClass('selected');
				publish();
			}
			$selectionRect
				.stop(true, true)
				.css({left: l, top: t, width: w, height: h, opacity: 1})
				.show();

			$document
				.on('mousemove', selectionUpdate)
				.one('mouseup', selectionEnd);
		}