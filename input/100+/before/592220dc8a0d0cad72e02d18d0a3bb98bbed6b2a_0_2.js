function(options) {
            //Set the default values of the plugin
            var defaults = {
            	link_labels: false,
            	top_links: '.toplink',
                nav: '.nav',
                slides: '.slide',
                duration: 1000,
                easing: 'swing',
                next_button: '.next',
                prev_button: '.prev',
                keyboard: true
            } 
            var options =  $.extend(defaults, options);
            return this.each(function() {
                var o = options;
                var nav = o.nav;
                var slide;
				
				// Change the current navigation class to 'current'
				$(o.slides).waypoint(function(e, dir) {
					//console.log($(this));
					if(dir == 'up' && $(this).attr('id') != 'slide1') slide = $(this).prev();
					else slide = $(this);
					$(o.top_links).removeClass('current');
					$(o.top_links+'[href=#'+slide.attr('id')+']').addClass('current');
				});
				
				// Add the labels beneath the navigation links
				if(o.link_labels) {
					$(o.top_links).each(function() {
						$(this).append('<div class="label">'+$(this).attr('title')+'</div>');
					});
				}
				
				$(o.nav).click(function() {
					slide = $($(this).attr('href'));
					$(window)._scrollable().stop();
					$.scrollTo(slide, {
						duration: o.duration,
						easing: o.easing
					});
					
					return false;
				});
				
				// Setup the next button functionality
				$(o.next_button).click(function() {
					slide = slide.next();
					$(window)._scrollable().stop();
					$.scrollTo(slide, {
						duration: o.duration,
						easing: o.easing
					});
					
					return false;
				});
				
				// Setup the prev button functionality
				$(o.prev_button).click(function() {
					slide = slide.prev();
					$(window)._scrollable().stop();
					$.scrollTo(slide, {
						duration: o.duration,
						easing: o.easing
					});
					
					return false;
				});
				
				// Set up keyboard control
				if(o.keyboard) {
					$(document).keydown(function(e){
					    if ((e.keyCode == 37) && slide.attr('id') != 'slide1') { 
							slide = slide.prev();
							$(window)._scrollable().stop();
							$(window).scrollTo(slide, {
								duration: o.duration,
								easing: o.easing
							});
					    	
							return false;
					    }
					    else if ((e.keyCode == 39 || e.keyCode == 32) && slide.attr('id') != 'slide11') { 
							slide = slide.next();
							$(window)._scrollable().stop();
							$(window).scrollTo(slide, {
								duration: o.duration,
								easing: o.easing
							});
							
							return false;
					    }
					});
				}
                
            });
        }