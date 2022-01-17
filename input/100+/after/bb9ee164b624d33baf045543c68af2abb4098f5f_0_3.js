function (amount) {

			// Take the sample from queue
			var sample = queue.splice(0, amount),
			
			// Function with content processing using asyncRender or not
				getContent = conf.asyncRender || function (data) { return data; };

			// Replace sample items with Carousel item template)
			for (var i = 0; i < amount; i += 1) {
				// Replace sample item
				sample[i] = [
					// Open tag with ARIA role
					"<li role=\"listitem\"",
					// Add classname to identify this as item
					" class=\"ch-carousel-item\"",
					// Add the same margin than all siblings items
					" style=\"width: " + (itemWidth + itemExtraWidth) + "px; margin-right: " + itemMargin + "px\"",
					// Add content (executing a template, if user specify it) and close the tag
					">" + getContent(sample[i]) + "</li>"
				// Get it as string
				].join("");
			};

			// Add sample items to the list
			$list.append(sample.join(""));

			// Update items collection
			$items = $list.children();

			// Trigger item addition event as deferred
			that.trigger("itemsAdded");

			// Trigger item addition event as configuration
			that.callbacks("onItemsAdded");
		}