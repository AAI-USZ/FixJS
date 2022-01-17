function tilesetSelectChange() {
		var info = JSON.parse(tilesetSelect.val());
		
		if (info[0].length > 0) {
			tileset.load(info[0], info[3]);
		} else {
			tileset.unload();
		}
	}