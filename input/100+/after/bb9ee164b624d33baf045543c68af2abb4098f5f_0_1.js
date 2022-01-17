function () {

			// Grabs if there are MORE THAN ONE item in a page or just one
			var moreThanOne = itemsPerPage > 1,

			// Total space to use as margin into mask
			// It's the difference between mask width and total width of all items
				freeSpace = maskWidth - (itemOuterWidth * itemsPerPage),

			// Width to add to each item to get responsivity
			// When there are more than one item, get extra width for each one
			// When there are only one item, extraWidth must be just the freeSpace
				extraWidth = moreThanOne ? Math.ceil(freeSpace / itemsPerPage / 2) : Math.ceil(freeSpace);

			// Update ONLY IF margin changed from last redraw
			if (itemExtraWidth === extraWidth) { return; }

			// Amount of spaces to distribute the free space
			// When there are 6 items on a page, there are 5 spaces between them
			// Except when there are only one page that NO exist spaces
			var spaces = moreThanOne ? itemsPerPage - 1 : 0,

			// The new width calculated from current width plus extraWidth
				width = itemWidth + extraWidth;

			// Update global value of width
			itemExtraWidth = extraWidth;

			// Free space for each space between items
			// Ceil to delete float numbers (not Floor, because next page is seen)
			// There is no margin when there are only one item in a page
			// Update global values
			itemMargin = moreThanOne ? Math.ceil(freeSpace / spaces / 2) : 0;

			// Update distance needed to move ONLY ONE page
			// The width of all items on a page, plus the width of all margins of items
			pageWidth = (itemOuterWidth + extraWidth + itemMargin) * itemsPerPage;

			// Update the list width
			// Delete efects on list to change width instantly
			// Do it before item resizing to make space to all items
			$list.addClass("ch-carousel-nofx").css("width", pageWidth * pages);
			
			// Restore efects to list if it's required
			// Use a setTimeout to be sure to do this after width change
			if (conf.fx) {
				setTimeout(function () { $list.removeClass("ch-carousel-nofx"); }, 0);
			}

			// Update element styles
			// Get the height using new width and relation between width and height of item (ratio)
			$items.css({
				"width": width,
				"height": (width * itemHeight) / itemWidth,
				"margin-right": itemMargin
			});
			
			// Update the mask height with the list height
			$mask.css("height", $list.outerHeight());
		}