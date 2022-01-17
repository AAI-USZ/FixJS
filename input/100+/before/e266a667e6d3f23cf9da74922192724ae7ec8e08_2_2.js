function handleImageLoadEvent(thread, image, fullsizeImageUrl) {
			// Ignore Imgur's "Image does not exist" image
			// TODO: Find a way to make absolutely sure we are actually blocking Imgur's "Image does not exist" image and not a random image with the same dimensions.
			if (image.height === 81
					&& image.width === 161
					&& image.src.match(/^https?:\/\/i\.imgur\.com\//)) {
				console.log("Ignoring image: " + image.src);
				return;
			}

			if (columnIndex < 0 || columnIndex >= columns.length) {
				columnIndex = 0;
			}

			var boardItem = app.views.boardItem.createInstance();
			var boardItemElement = boardItem.create(thread, image, fullsizeImageUrl);

			columns[columnIndex].grab(boardItemElement);
			columnIndex++;

			if (!hasLoadedAnImage) {
				hasLoadedAnImage = true;
				updateLoadMoreAnchor();
			}
		}