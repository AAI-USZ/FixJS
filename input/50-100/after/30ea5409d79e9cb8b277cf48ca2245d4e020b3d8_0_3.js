function(slideIndex){
				stop.call(this);
				if (slideIndex < 0) {
					slideIndex = 0;
				} else {
					var size = getState(this)[1];
					slideIndex = slideIndex > size ? size : slideIndex;
				}
				slide(this, slideIndex);
			}