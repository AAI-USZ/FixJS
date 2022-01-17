function(args) {
		$P.element = $('#canvas')
		$P.element = $('#canvas')[0]
		$P.canvas = $P.element.getContext('2d');
		$C = $P.canvas
		if ($(window).width() < $(window).height()) $P.width = args['displaySize'] || $(window).width()-30 //256
		else $P.width = args['displaySize'] || ($(window).width()-30)/3
		$P.height = $P.width
		$P.element.width = $P.width
		$P.element.height = $P.width
		$P.iconSize = 8//16
		$P.pixelSize = $P.width/$P.iconSize
		$P.intPixelSize = Math.floor($P.width/$P.iconSize)
		$P.grid = args['grid'] || true
		$('body').mouseup($P.on_mouseup)
		$('body').mousedown($P.on_mousedown)
		$('body').mousemove($P.on_mousemove)
		window.addEventListener('touchend',$P.on_mouseup)
		window.addEventListener('touchstart',$P.on_mousedown)
		window.addEventListener('touchmove',$P.on_mousemove)
		//setInterval($P.draw,1500)
		if (args['image_data'] != "") $P.displayIcon(args['image_data'])
		if (args['icon_id'] != "") $P.icon_id = args['icon_id']
		if (args['type'] != "") $P.type = args['type']
		if (args['hash'] != "") {
			$P.hash = args['hash']
			$P.decodeIconString($P.hash)
			$P.generatePermalink()
		}
		if ($P.grid) $P.drawGrid() 
	}