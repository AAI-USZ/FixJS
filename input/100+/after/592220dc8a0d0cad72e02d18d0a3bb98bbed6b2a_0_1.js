function(e){
					    if (e.keyCode == 37) { 
              // slide = slide.prev();
							index = $(".nav").index($(".nav.current"))
              // console.log(index)
							slide = $('.slide').get(index - 1)
							$(window)._scrollable().stop();
							$(window).scrollTo(slide, {
								duration: o.duration,
								easing: o.easing
							});
					    	
							return false;
					    }
					    else if (e.keyCode == 39 || e.keyCode == 32) { 
					    
					    index = $(".nav").index($(".nav.current"))
					    slide = $('.slide').get(index + 1)
              // slide = slide.next();
							$(window)._scrollable().stop();
							$(window).scrollTo(slide, {
								duration: o.duration,
								easing: o.easing
							});
							
							return false;
					    }
					}