function(
			protocol, host, isTiled, filename, dataset_id, is_preview,
			zoom, plane, slice, image_extension, tile_size, row, col) {
		if (typeof(protocol) != "string") {
			protocol = "http";
		} 
		protocol = $.trim(protocol);
		if (typeof(host) != "string" || $.trim(host) == "localhost") {
			host = "";
		}
		host = $.trim(host);
		if (typeof(dataset_id) != "number" || dataset_id <= 0) {
			return null;
		}
		//are we tiled or not
		if (typeof(isTiled) != "boolean") {
			isTiled = false; // if in doubt => false
		}
		if (!isTiled && typeof(filename) != "string") {
			return null;
		}
		if (typeof(is_preview) != "boolean") {
			return null;
		}
		if (!is_preview && (typeof(tile_size) != "number" || zoom < 0)) {
			tile_size = 256;
		}
		if (typeof(zoom) != "number" || zoom < 0) {
			return null;
		}
		if (typeof(plane) != "string") {
			return null;
		}
		if (typeof(slice) != "number" || slice < 0) {
			return null;
		}
		if (typeof(image_extension) != "string") {
			image_extension = "png";
		}

		// assemble what we have so far
		var url = (host != "" ? (protocol + "://" + host.replace(/[_]/g,".")) : "");
		var path = isTiled ? TissueStack.configuration['tile_directory'].value : TissueStack.configuration['image_service_directory'].value;

		if (isTiled) {
			url += ("/" + path + "/" + dataset_id + "/" + zoom + "/" + plane + "/" + slice);

			// for preview we don't need all the params 
			if (is_preview) {
				return url + ".low.res." + image_extension;
			}

			// for tiling we need the row/col pair in the grid
			if (typeof(row) != "number" || row < 0) {
				return null;
			}
			if (typeof(col) != "number" || col < 0) {
				return null;
			}

			return url + "/" + row + '_' + col + "." + image_extension;
		} else {
			url += ("/" + path + "?volume=" + filename + "&scale=" + zoom + "&dimension=" + plane + "space" + "&slice=" + slice);
			
			if (is_preview) {
				return url + "&quality=10";
			}
			
			return url  + "&quality=1&service=tiles&square=" + tile_size + '&y=' + col + "&x=" + row;
		}
	}