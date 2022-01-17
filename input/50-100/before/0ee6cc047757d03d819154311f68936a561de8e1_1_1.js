function tilesetSelectChange() {
		var info = JSON.parse(tilesetSelect.val());
		
		if (info[0].length > 0) {
			tileset.load(info[0], !serverInfo.paths.merge_folders? info[3] : false);
		} else {
			tileset.unload();
		}
	}