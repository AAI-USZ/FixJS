function(collections, config){
			// Prepare
			var collection, $container, $target, $inline, position,
				startOffsetTop, targetOffsetTop, offsetDifferenceTop,
				startOffsetLeft, targetOffsetLeft, offsetDifferenceLeft,
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

			// Determine the top offset
			startOffsetTop = $inline.offset().top;
			targetOffsetTop = $target.offset().top;
			offsetDifferenceTop = targetOffsetTop - startOffsetTop - parseInt(config.offsetTop,10);

			// Determine the left offset
			startOffsetLeft = $inline.offset().left;
			targetOffsetLeft = $target.offset().left;
			offsetDifferenceLeft = targetOffsetLeft - startOffsetLeft - parseInt(config.offsetLeft,10);

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
				'scrollTop': offsetDifferenceTop+'px',
				'scrollLeft': offsetDifferenceLeft+'px'
			}, config.duration, config.easing, callback);

			// Return true
			return true;
		}