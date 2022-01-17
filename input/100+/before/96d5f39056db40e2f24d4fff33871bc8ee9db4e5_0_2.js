function(options) {
	
	var int;
	var slide=1;
	
	 var settings = $.extend( {
	  	'slideDirection' : ['right'], // direction for main_img, can be assigned for each slide
		'slideFrom' : [], // start position, can be assigned for individual slide, if not assigned it assigns automatically
		'slideTo' : [], // end position of main_img, can be assigned for individual slide
		'animDuration' : [1000],  // animation duration of main_img, can be assigned for individual slide
		'slideDuration' : [5000],  // animation duration of each slide, can be assigned for individual slide
		'slideEasing' : ['easeOutBack'], // animation easing of main_img, can be assigned for individual slide
		'preloadImgs' : true, // preloading images
		'loader' : true, // shows loader in beginning
		'imagesUrl' : '../images/',
		'anchors' : true
    }, options);
	
	
	var $this = $(this);
	
	$this.find('li').hide();
	if(settings.loader==true) $this.addClass('loader');
	
	if(settings.anchors == true) {
		$('<div class="balls"></div>').appendTo($this);
		$this.find('li').each(function(i) { 
			$(this).addClass("slide"+(i+1));
			$('<div><img src="'+settings.imagesUrl+'balls.png" width="12" height="24" border="0"  /></div>')
										   .click(function() { slide = i+1; runSlide(); }).appendTo('.balls'); });
	
	}
	
	if(settings.preloadImgs == true) {
		var urlImgs = [];
		$this.find('img').each(function() {  urlImgs.push($(this).attr('src'));  });
		
		$.preloadImages(urlImgs,function(){ 
		}).done(function(){ 
		   setTimeout(runSlide, 1000);
		});
	} else { 
		runSlide();
	}

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
	
	
		if(slide>=3) slide=1; else slide ++;
		int = setTimeout(runSlide, slideDuration);
	}
	
	function calculateSlideFrom(dir, slide) { 
		$mainImg = $this.find('li:nth-child('+slide+') .main_img');
		$this.find('li:nth-child('+slide+') .main_img').width($(this).find('img').width());
		$this.find('li:nth-child('+slide+') .main_img').height($(this).find('img').height());
		$mainImg.css(dir, 0);
		
		if(dir == "right" || dir == "left") var val = $this.find('li:nth-child('+slide+') .main_img img').width()*-1;
		else if(dir == "top" || dir == "bottom") var val = $this.find('li:nth-child('+slide+') .main_img img').height()*-1;
		
		return val;
	}
	
}