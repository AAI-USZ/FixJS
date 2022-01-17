function() {
		//this.disableAutoPlay();
		var timelineEventViews = this.meta('timelineEventViews');
		var TEMNum = timelineEventViews.length;
		var carouselPos = this.meta('carouselPos');
		if (TEMNum > 3) {
			if (carouselPos < (TEMNum - 3)) {
				$(this.el).find('.eventInfos').animate({
					left: '-=202'
				}, 300, 'swing');
				carouselPos = carouselPos+1;
				this.meta('carouselPos', carouselPos);
				if (carouselPos == (TEMNum - 3)) {
					$(this.el).find('.arrow-left').css('border-right', '15px solid #f97506');
					$(this.el).find('.arrow-right').css('border-left', '15px solid #b5b5b5');
				} else {
					$(this.el).find('.arrow-left').css('border-right', '15px solid #f97506');
					$(this.el).find('.arrow-right').css('border-left', '15px solid #f97506');
				}
			}
		}
	}