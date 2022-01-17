function(image) {
		/*
		 * If the image parameter is passed, then scan the entire page for the
		 * largest image that belongs to the IIV.
		 * Otherwise only scan the passed image
		 */

		//Get the x position of the rightmost edge of whatever images are being scanned
		//Note: a scan of approx 500 images takes 47ms (Chrome 19.0.1084.54 Mac @ 2.53Ghz) 
		var rightEdge = Math.max.apply(Math, $(image || 'div.madeVisible img').map(function(){
			return $(this).position().left+this.offsetWidth;
		}));
		//Find the x-index of the sidebar (
		var leftEdge = window.innerWidth - $('.side').width();
		if (image) {
			//Since we only looked at one image, take into account the rightmost edge from the last full scan
			var bestEdge = Math.max(rightEdge, this.furthestRightEdge || 0);
		} else {
			//Since we are calculating this for everything we already know the answer,
			//and save the value
			var bestEdge = this.furthestRightEdge = rightEdge;
		}
		//Allow a 15 pixel buffer 
		if (leftEdge - bestEdge < 15) {
			$('.side').fadeOut();
			if (image) {
				var closest = $(image).closest('div.md');
				var maxWidth = $(closest).css('max-width');
				$(closest).data('max-width',maxWidth);
				$(closest).css('max-width','100%');
			}
			/*
			 * search for .side.hidden
			 * While this is better than .fadeOut since things moved out
			 * of the sidebar using CSS are still visible,
			 * there are some issues with that methods that I have not
			 * resolved to my satisfation.
			 * (note: the fix is easy, I would just rather not do it)
			 */
//			$('.side').addClass('hidden');
		} else {
			$('.side').fadeIn();
//			$('.side').removeClass('hidden');
		}
	}