function runSlide() {
		
		// vars
		var slideDir = settings.slideDirection[slide-1] ? settings.slideDirection[slide-1] : settings.slideDirection[0];
		var slideEasing = settings.slideEasing[slide-1] ? settings.slideEasing[slide-1] : settings.slideEasing[0];
		var animDuration = settings.animDuration[slide-1] ? settings.animDuration[slide-1] : settings.animDuration[0];
		var slideDuration = settings.slideDuration[slide-1] ? settings.slideDuration[slide-1] : settings.slideDuration[0];
		var slideFrom = settings.slideFrom[slide-1] ? settings.slideFrom[slide-1] : calculateSlideFrom(slideDir, slide);
		var slideTo = settings.slideTo[slide-1] ? settings.slideTo[slide-1] : 0;
		
		
		// resets
		clearTimeout(int);
		if(settings.loader==true) $this.removeClass('loader'); 
		$this.find('li').hide();
		$this.find('li:nth-child('+slide+') .desc').children().stop(true).hide();
		if(settings.anchors == true) $('.balls img').css('top', ($('.balls img').height()/2)*-1);
		$this.find('li:nth-child('+slide+') .main_img').stop(true).css(slideDir, slideFrom);
		$this.find('li:nth-child('+slide+')').show();
		
		
		var aniArgs = {};
		aniArgs[slideDir] = slideTo; 
		
		// animations
		$('.balls div:nth-child('+slide+') img').css('top', '0');
		$this.find('li:nth-child('+slide+') .main_img').animate(aniArgs, {duration:animDuration, easing:slideEasing});
		$this.find('li:nth-child('+slide+') .desc').children().delay(animDuration+500).each(function(i) {
			$(this).delay(i*400).slideDown();									  
		});
	
	
		if(slide>=totalSlides) slide=1; else slide ++;
		int = setTimeout(runSlide, slideDuration);
	}