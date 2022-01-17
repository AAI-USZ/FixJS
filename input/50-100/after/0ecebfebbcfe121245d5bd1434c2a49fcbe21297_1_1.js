function() {
		x = parseInt($P.pointer_x/$P.width*$P.iconSize)
		y = parseInt($P.pointer_y/$P.height*$P.iconSize)
		if ($P.onCanvas) {
			$C.fillRect(x*$P.pixelSize,y*$P.pixelSize,$P.intPixelSize,$P.intPixelSize)
		}
	}