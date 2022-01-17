function(obj) {
		
		var delay = obj.delay||5000;
	
		startRotator = function(){
			if(current >= totale)
				current = 0;
			
			container.find('#banner_selector_wrap .active').removeClass('active');
			container.find('#banner_selector_wrap .banner_selector:eq('+current+')').addClass('active');
			
			container.children('div').filter(':eq('+current+')').fadeIn("slow").end().not(":eq("+current+")").fadeOut("slow");
			
			current++;
		};
		
		var container = $(this),
			totale = container.children('div').size(),
			current = 0,
			i = setInterval(startRotator,delay);
		
		container.append('<span id="banner_selector_wrap"></span>');
		var bannerButtons = container.find('#banner_selector_wrap');
		
		for(var count=1;count<=totale;count++){
			bannerButtons.append('<span class="banner_selector" data-bannerPosition="'+count+'">'+count+'</span>');
		}
		
		$('.banner_selector').click(function(){
		
			clearInterval(i);
			i = null;
			
			current = $(this).attr('data-bannerPosition')-1;
			bannerButtons.find('.active').removeClass('active');
			bannerButtons.find('.banner_selector:eq('+current+')').addClass('active');
			
			container.children('div').filter(':eq('+current+')').fadeIn('slow').end().not(':eq('+current+')').fadeOut('slow');
			
			current++;
			i = setInterval(startRotator,delay);
			
		});
		startRotator();
		
		return container;
	}