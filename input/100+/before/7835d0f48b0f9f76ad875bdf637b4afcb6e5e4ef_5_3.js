function() {
		//this.disableAutoPlay();
		var timelineEventViews = this.meta('timelineEventViews');
		var TEMNum = timelineEventViews.length;
		var carouselPos = this.meta('carouselPos');
		if (TEMNum > 3) {
			if (carouselPos < (TEMNum - 3)) {
				$(this.el).find('.eventInfos').animate({
					left: '-=197'
				}, 300, 'swing');
				carouselPos = carouselPos+1;
				this.meta('carouselPos', carouselPos);
				if (carouselPos == (TEMNum - 3)) {
					$(this.el).find('.arrow-left').css('border-right', '10px solid #666');
					$(this.el).find('.arrow-right').css('border-left', '10px solid #AAA');
				} else {
					$(this.el).find('.arrow-left').css('border-right', '10px solid #666');
					$(this.el).find('.arrow-right').css('border-left', '10px solid #666');
				}
			}
		}
	}