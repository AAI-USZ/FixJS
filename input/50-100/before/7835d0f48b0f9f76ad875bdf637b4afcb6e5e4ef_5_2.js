function() {
		var carouselActive = this.meta('carouselActive');
		if (typeof carouselActive == 'undefined' || carouselActive === false) {
			$(this.el).find('.arrow-right').css('display', 'block');
			$(this.el).find('.arrow-left').css('display', 'block');
			$(this.el).find('.arrow-right').css('border-left', '10px solid #666');
			//this.enableAutoPlay();
			//this.meta('carouselActive', true);
		}
	}