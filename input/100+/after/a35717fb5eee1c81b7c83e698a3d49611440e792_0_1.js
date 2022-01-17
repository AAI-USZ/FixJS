function(value) {
		/*
		 * Hack for large screen On 60 inch screen too much movement was
		 * required to get to next slide This alters the required movement, and
		 * also stops the slide going forward or back more than 1 at a time
		 * 
		 */
		// var valuenow = Cursor.x - this.offset.wrapper[0] -
		// this.offset.mouse[0];
		// var wrapperoff = this.offset.wrapper[0];
		var mouseoffset = this.offset.mouse[0];
		var cursorx = Cursor.x;
		var cursory = Cursor.y;
		var difference = (mouseoffset - cursorx);
		// var currentpage =Math.round(valuenow*(totalSlides-1));
		// var totalwidth = this.steps * 1080;
		var cursorpage = Math.ceil(mouseoffset / 1080);
		var differenceoffset = ((cursorpage - 1) * 1080) - difference;

		var k = 0;
		var min = 1;
		for ( var i = 0; i <= this.steps - 1; i++) {
			if (Math.abs(this.stepRatios[i] - value) < min) {
				min = Math.abs(this.stepRatios[i] - value);
				k = i;
				var e = i;

			}
		}
		//$('#nextButton').append(cursorx + ' ');

		if (cursorx > 973 && cursorx < 1073) {
			
			
		} else  if(cursorx > 10 && cursorx < 109)  {
			
		} else {
			if (differenceoffset < -150) {
				k = cursorpage;
			}

			if (differenceoffset > 150) {
				k = cursorpage - 2;
			}

			if (k < 1) {
				k = 0;
			}

			if (k >= this.steps) {
				k = 4;
			}
		}

		return this.stepRatios[k];
	}