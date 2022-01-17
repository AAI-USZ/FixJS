function(options){
			// Prepare
			var collections, config, $container;
			collections = [];

			// Prepare
			var	$target = $(this);
			if ( $target.length === 0 ) {
				// Chain
				return this;
			}

			// Handle Options
			config = $.extend({},ScrollTo.config,options);

			// Fetch
			$container = $target.parent();

			// Cycle through the containers
			while ( $container.length === 1 && $container.is('body') === false && ($container.get(0) === document) === false ) {
				// Check Container
				var container;
				container = $container.get(0);
				if ( $container.css('overflow-y') !== 'visible' && container.scrollHeight !== container.clientHeight ) {
					// Push the Collection
					collections.push({
						'$container': $container,
						'$target': $target
					});
					// Update the Target
					$target = $container;
				}
				// Update the Container
				$container = $container.parent();
			}

			// Add the final collection
			collections.push({
				'$container': $($.browser.msie ? 'html' : 'body'),
				'$target': $target
			});

			// Adjust the Config
			if ( config.durationMode === 'all' ) {
				config.duration /= collections.length;
			}

			// Handle
			ScrollTo.scroll(collections,config);

			// Chain
			return this;
		}