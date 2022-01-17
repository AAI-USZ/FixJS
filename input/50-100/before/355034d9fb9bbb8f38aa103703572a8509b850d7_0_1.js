function (/*int*/x, /*int*/y, /*ArtAssetRef*/ref) {
		x = (x < 0) ? 0 : x;
		y = (y < 0) ? 0 : y;
		screen.drawImage(assets[ref.id].image,
				x, y, screen.getWidth(), screen.getHeight(),
				0, 0, screen.getWidth(), screen.getHeight());
	}