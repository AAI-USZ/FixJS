function() {
		x = parseInt($P.pointer_x/$P.width*$P.iconSize)
		y = parseInt($P.pointer_y/$P.height*$P.iconSize)
		if ($P.pointer_x >= 0 && $P.pointer_x < $P.width && $P.pointer_y >= 0 && $P.pointer_y < $P.height) {
			$C.fillRect(x*$P.pixelSize,y*$P.pixelSize,$P.intPixelSize,$P.intPixelSize)
		}
	}