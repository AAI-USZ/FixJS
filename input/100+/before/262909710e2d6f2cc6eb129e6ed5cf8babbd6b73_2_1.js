function(collections, config){
			// Prepare
			var collection, $container, $target, $inline,
				position, startOffset, targetOffset, offsetDifference,
				callback;

			// Determine the Scroll
			collection = collections.pop();
			$container = collection.$container;
			$target = collection.$target;

			// Prepare the Inline Element of the Container
			$inline = $('<span/>').css({
				'position': 'absolute',
				'top': '0px',
				'left': '0px'
			});
			position = $container.css('position');

			// Insert the Inline Element of the Container
			$container.css('position','relative');
			$inline.appendTo($container);

			// Determine the Offsets
			startOffset = $inline.offset().top;
			targetOffset = $target.offset().top;
			offsetDifference = targetOffset - startOffset;

			// Reset the Inline Element of the Container
			$inline.remove();
			$container.css('position',position);

			// Prepare the callback
			callback = function(event){
				// Check
				if ( collections.length === 0 ) {
					// Callback
					if ( typeof config.callback === 'function' ) {
						config.callback.apply(this,[event]);
					}
				}
				else {
					// Recurse
					ScrollTo.scroll(collections,config);
				}
				// Return true
				return true;
			};

			// Perform the Scroll
			$container.animate({
				'scrollTop': offsetDifference+'px'
			}, config.duration, config.easing, callback);

			// Return true
			return true;
		}