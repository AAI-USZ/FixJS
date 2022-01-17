function(finishMove){
			var hiddenItems = $('.lazy', currentSlide);
			if (hiddenItems.length > 0) {
				this.moveTo(currentIndex, finishMove);		
			}
			else {
				if (currentSlide && currentSlide.attr('data-prev')) {
					this.moveTo(parseInt(currentSlide.attr('data-prev'),10), finishMove);
				}
				else if(currentIndex > 0) {
					this.moveTo(currentIndex - 1, finishMove);
				}
			}
		}