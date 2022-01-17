function (/*int*/x, /*int*/y, /*ArtAssetRef*/ref) {
		screen.drawImage(assets[ref.id].image,
				x, y, screen.getWidth(), screen.getHeight(),
				0, 0, screen.getWidth(), screen.getHeight());
	}