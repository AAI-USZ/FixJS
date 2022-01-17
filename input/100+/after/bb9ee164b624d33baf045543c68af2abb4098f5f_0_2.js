function () {

			// Defines the sizing behavior of Carousel
			setWidth();

			// Set initial width of the list, to make space to all items
			$list.css("width", itemOuterWidth * ($items.length + queue.length));

			// Wrap the list with mask and change overflow to translate that feature to mask
			that.$element.wrapInner($mask).css("overflow", "hidden");

			// TODO: Get a better reference to rendered mask
			$mask = that.$element.children(".ch-carousel-mask");
			
			// Update the mask height with the list height
			// Do it here because before, items are stacked
			$mask.css("height", $list.outerHeight());

			// If efects aren't needed, avoid transition on list
			if (!conf.fx) { $list.addClass("ch-carousel-nofx"); }

			// Position absolutelly the list when CSS transitions aren't supported
			if (!ch.features.transition) { $list.css({"position": "absolute", "left": "0"}); }

			// Allow to render the arrows over the mask or not
			arrowsFlow(conf.arrows);

			// Trigger all recalculations to get the functionality measures
			draw();

			// Analizes if next page needs to load items from queue and execute addItems() method
			loadAsyncItems();

			// Set WAI-ARIA properties to each item depending on the page in which these are
			updateARIA();

			// If there are a parameter specifying a pagination, add it
			if (conf.pagination) { addPagination(); }
		}