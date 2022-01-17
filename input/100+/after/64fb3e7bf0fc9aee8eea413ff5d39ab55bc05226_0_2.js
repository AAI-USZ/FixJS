function(tileEvent, tile, x, y, w, h) {
		tileEvent.co.x = tile.__coord[0];
		tileEvent.co.y = tile.__coord[1];
		tileEvent.co.w = tile.__coord[2];
		tileEvent.co.h = tile.__coord[3];
		tileEvent.pos._x = x;
		tileEvent.pos._y = y;
		tileEvent.pos._w = w;
		tileEvent.pos._h = h;
		tile.trigger("Draw", tileEvent);
	}