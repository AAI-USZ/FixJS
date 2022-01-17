function(color) {
		color = color || "#cccccc"
		$C.strokeStyle = color
		$C.lineWidth = 1
		for (i=1;i<$P.iconSize;i++) {
			$C.beginPath()
			$C.moveTo(Math.floor(i*$P.pixelSize),0)
			$C.lineTo(Math.floor(i*$P.pixelSize),$P.height)
			$C.stroke()
		}
		for (i=1;i<$P.iconSize;i++) {
			$C.beginPath()
			$C.moveTo(0,Math.floor(i*$P.pixelSize))
			$C.lineTo($P.width,Math.floor(i*$P.pixelSize))
			$C.stroke()
		}
	}