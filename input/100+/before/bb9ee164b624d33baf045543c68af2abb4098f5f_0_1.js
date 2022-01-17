function () {

			// Grabs if there are MORE THAN ONE item in a page or just one
			var moreThanOne = itemsPerPage > 1,

			// Total space to use as margin into mask
			// It's the difference between mask width and total width of all items
				freeSpace = maskWidth - (itemOuterWidth * itemsPerPage),

			// Amount of spaces to distribute the free space
			// When there are 6 items on a page, there are 5 spaces between them
			// Except when there are only one page that NO exist spaces
				spaces = moreThanOne ? itemsPerPage - 1 : 0,

			// Free space for each space between items
			// Ceil to delete float numbers (not Floor, because next page is seen)
			// There is no margin when there are only one item in a page
				margin = moreThanOne ? Math.ceil(freeSpace / spaces / 2) : 0,

			// Width to add to each item to get responsivity
			// When there are more than one item, get extra width for each one
			// When there are only one item, extraWidth must be just the freeSpace
				extraWidth = moreThanOne ? Math.ceil(freeSpace / itemsPerPage / 2) : Math.ceil(freeSpace);

			// Update ONLY IF margin changed from last redraw
			if (itemExtraWidth === extraWidth) { return; }

			// Update global values
			itemMargin = margin;
			itemExtraWidth = extraWidth;

			// Update distance needed to move ONLY ONE page
			// The width of all items on a page, plus the width of all margins of items
			pageWidth = (itemOuterWidth + extraWidth + margin) * itemsPerPage;

			// Update list width
			// Consider one more page to get an error margin
			$list.css("width", pageWidth * (pages + 1));

			// Update element styles
			$items.css({
				"width": itemWidth + extraWidth,
				"margin-right": margin
			});
		}