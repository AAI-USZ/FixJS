function(e) {
		if (e.touches && (e.touches[0] || e.changedTouches[0])) {
			var touch = e.touches[0] || e.changedTouches[0];
			offsetX = ($(window).width()-$P.width)/2;
			offsetY = $P.v_offset;//($(window).height()-$P.height)/2;
			$P.pointer_x = touch.pageX - offsetX;
			$P.pointer_y = touch.pageY - offsetY;
		} else {
			$P.pointer_x = e.offsetX
			$P.pointer_y = e.offsetY
		}
	}