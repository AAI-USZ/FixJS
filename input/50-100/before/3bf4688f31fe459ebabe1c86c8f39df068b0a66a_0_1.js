function(finishMove){
			var hiddenItems = $('.lazy', currentSlide);
			if (hiddenItems.length > 0) {
				this.moveTo(currentIndex, finishMove);		
			}
			else {
				var prev = currentSlide.attr('data-prev');
				if (prev) {
					this.moveTo(parseInt(prev,10), finishMove);
				}
				else if(currentIndex > 0) {
					this.moveTo(currentIndex - 1, finishMove);
				}
			}
		}