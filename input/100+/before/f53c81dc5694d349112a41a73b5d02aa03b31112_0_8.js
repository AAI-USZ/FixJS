function() {
				var $this = $(this);

				clearTimeout( mouseOver );

				// Wait 100ms before animating to prevent unnecessary flickering
				mouseOver = setTimeout( function() {
					$this.find('li a').stop(true,true).slideHorzShow(300);
				}, 100);
			}