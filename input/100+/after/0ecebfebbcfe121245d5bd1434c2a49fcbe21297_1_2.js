function(e) {
		offsetX = ($(window).width()-$P.width)/2;
		offsetY = $P.v_offset;//($(window).height()-$P.height)/2;
		if (e.touches && (e.touches[0] || e.changedTouches[0])) {
			var touch = e.touches[0] || e.changedTouches[0];
			$P.pointer_x = touch.pageX - offsetX;
			$P.pointer_y = touch.pageY - offsetY;
			$P.onCanvas = (touch.pageX >= offsetX && touch.pageX < offsetX+$P.width && touch.pageY >= offsetY && touch.pageY < offsetY+$P.height)
		} else {
			$P.pointer_x = e.offsetX
			$P.pointer_y = e.offsetY
			$P.onCanvas = (e.pageX >= offsetX && e.pageX < offsetX+$P.width && e.pageY >= offsetY && e.pageY < offsetY+$P.height)
		}
	}