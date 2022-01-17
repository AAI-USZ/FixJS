function gotoItem(itemNumber) {

				// Check if stuff is already being animated and kill the script if it is
				if( $items.is(':animated') || $this.is(':animated') ) return false;
				// If the container has been hidden, kill the script
				// This prevents the script from bugging out if something hides the revolving
				// object from another script (tabs for example)
				if( $box.is(':hidden') ) return false;

				// Don't let itemNumber go above or below possible options
				if ( itemNumber < 1 ) {
					itemNumber = $total;
				} else if ( itemNumber > $total ) {
					itemNumber = 1;
				}

				// Create the data object to pass to our transition method
				var gotoData = {
						current : $( $items[$active -1] ), // Save currently active item
						upcoming : $( $items[itemNumber - 1] ), // Save upcoming item
				}

				// Save current and upcoming hights and outer heights
				gotoData.currentHeight = getHiddenProperty(gotoData.current),
				gotoData.upcomingHeight = getHiddenProperty(gotoData.upcoming),
				gotoData.currentOuterHeight = getHiddenProperty(gotoData.current, 'outerHeight'),
				gotoData.upcomingOuterHeight = getHiddenProperty(gotoData.upcoming, 'outerHeight')

				// Save current and upcoming widths and outer widths
				gotoData.currentWidth = getHiddenProperty(gotoData.current, 'width'),
				gotoData.upcomingWidth = getHiddenProperty(gotoData.upcoming, 'width'),
				gotoData.currentOuterWidth = getHiddenProperty(gotoData.current, 'outerWidth'),
				gotoData.upcomingOuterWidth = getHiddenProperty(gotoData.upcoming, 'outerWidth')

				// Transition method
				if (o.transition != 'basic' && 
						typeof o.transition == 'string' && 
						eval('typeof ' + o.transition) == 'function' ) {
					// Run the passed method
					eval( o.transition + '(gotoData)' );
				} else {
					// Default transition method
					basic(gotoData);
				}

				// Update active item
				$active = itemNumber;

				// Update navigation
				updateNavNum($nav);
				updateNavText($nav);

				// Disable default behavior
				return false;
			}