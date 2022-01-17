function (e) {
				if (!self._overlayActive) {
					return;
				}
				var overlayVisibleAndNotTarget
					=  (self.$node.css('display') === 'table') &&
						(e.target !== self.$node[0]) &&
				    // don't consider clicks to the 'show' button.
						!jQuery(e.target).is('button.aloha-button-characterpicker');
				if (overlayVisibleAndNotTarget) {
					self.$node.hide();
				}
			}