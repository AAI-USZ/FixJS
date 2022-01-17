function(){
		var h100 = 700,
			h = $(mainCtn).height(),d
			w = $(mainCtn).width(),
			mr = 0,
			mt = (h * 0.05),
			height,
			width;
			
		height = h - mt * 2;
		width = height;
		
		var gap = ((w - width) /2);
		
		if (h > w) {
			height = width = w;
			mt = (h - w) / 2;
			mr = gap * -1;
		}
		else {
			mr = gap * 0.75;
		}
		
		$('html').css('font-size', ((h*100)/h100) + '%');
		
		for(var i=0; i< slideData.length; i++){
			if(slideData[i].isChapter)
				slides.eq(i).addClass('title');
		}
		
		var slideCommon = $("<li>").width(Math.floor(width)).css('margin-right', Math.floor(mr));;
		var slideChapter = $("<li>").addClass('title').width(Math.floor(width)).css('margin-right', Math.floor(mr));;
		slider.append(slideCommon).append(slideChapter);
		
		var theBiggest;
		if (slideCommon.outerWidth() > slideChapter.outerWidth()){
			theBiggest = slideCommon;
			var dif = slideCommon.outerWidth(true) - slideChapter.outerWidth(true);
			slides.filter('.title').width(width + dif);
			slides.not('.title').width(width);
		}
		else {
			theBiggest = slideChapter;
			var dif = slideChapter.outerWidth(true) - slideCommon.outerWidth(true);
			slides.not('.title').width(width + dif);
			slides.filter('.title').width(width);
		}
		
		slides.height(Math.floor(height)).css('margin-right', Math.floor(mr));
		slider.height(Math.ceil(height + mt)).css('margin-top', Math.floor(mt));

		currentSlide = slides.eq(currentIndex).addClass('current');
		increment = Math.floor(width + (theBiggest.outerWidth(true) - theBiggest.innerWidth()));
		
		slideCommon.remove();
		slideChapter.remove();
		theBiggest.remove();
		
		slider.width(Math.ceil(increment * slidesLen) + 200);
		
		if (h > w) initialMargin = 0;
		else initialMargin = Math.floor((w - width) / 2);
		
		slider.css('margin-left', initialMargin);
		
		setPosition(null, true);
	}