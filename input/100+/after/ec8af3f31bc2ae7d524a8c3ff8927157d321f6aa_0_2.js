function(i) {
			var $self = $(this),
				preload_count = 0,
				timerCheck = true,
				imageCache = [];
			
			/* --------------------- */
			
			// @Modern
			
			/* 
			MODERN BROWSER NOTES:
				Modern browsers have CSS3 background-size option so we setup the DOM to be the following structure for cycle plugin:
				div = cycle
					div = slide with background-size:cover
					div = slide with background-size:cover
					etc.
			*/
			
			var Modern = {
				setup: function(){
					if($.Slides.length > 0){
						// Setup images
						for(var i in $.Slides) {
							// Set our image
							var $img = $.Slides[i];
							
							// Create a div with a background image so we can use CSS3's position cover (for modern browsers)
							$self.append('<div class="mc-image ' + $img.theclass + '" title="' + $img.alt + '" style="background-image:url(\'' + $img.url + '\');' + $img.style + '" data-href="'+ $img.datahref +'">'+ $img.content +'</div>');
						}
						
						// Begin our preload process (increments itself after load)
						Modern.preload(0);
						
						// If using Cycle, this resets the height and width of each div to always fill the window; otherwise can be done with CSS
						Modern.resize();
					}
				},
				resize: function(){
					// Cycle sets the height of each slide so when we resize our browser window this becomes a problem.
					//  - the cycle option 'slideResize' has to be set to false otherwise it will trump our resize
					$.Window
						.bind($.Events.RESIZE,
						function(){
							// Remove scrollbars so we can take propper measurements
							$.Scroll.addClass('mc-hide-scrolls');
							
							// Set vars so we don't have to constantly check it
							$.Window.data('h', $.Window.height()).data('w', $.Window.width());
							
							// Set container and slides height and width to match the window size
							$self
								.height($.Window.data('h')).width($.Window.data('w'))
								.children()
								.height($.Window.data('h')).width($.Window.data('w'));
							
							// This is special noise for cycle (cycle has separate height and width for each slide)
							$self.children().each(function(){
								this.cycleH = $.Window.data('h');
								this.cycleW = $.Window.data('w');
							});
							
							// Put the scrollbars back to how they were
							$($.Scroll).removeClass('mc-hide-scrolls');
						});
				},
				preload: function(n){
					// Preload all of the images but never show them, just use their completion so we know that they are done
					// 		and so that the browser can cache them / fade them in smoothly
					
					// Create new image object
					var $img = $('<img/>');
					$img.load(function() {				
						// Once the first image has completed loading, start the slideshow, etc.
						if(preload_count==0) {
							// Only start cycle after first image has loaded
							Cycle.setup();
							
							// Run user defined onFirstImageLoaded() function
							config.onFirstImageLoaded();
						}
						
						// preload_count starts with 0, $.Slides.length starts with 1
						if(preload_count==($.Slides.length-1)) {
							// If we have just loaded the final image, run the user defined function onImagesLoaded()
							config.onImagesLoaded();
						}else{ 
							// Increment the counter
							preload_count++;
							
							// Load the next image
							Modern.preload(preload_count);
						}
					});
					
					// Set the src... this triggers begin of load
					$img[0].src = $.Slides[n].url;
					
					// Push to external array to avoid cleanup by aggressive garbage collectors
					imageCache.push($img[0]);
				}
			}
			
			
			
			/* --------------------- */
			
			// @Old
			
			/* 
			OLD BROWSER NOTES:
				Old browsers do not have a background-size option (CSS3) so we setup the dom to be the following structure for cycle plugin:
				div = cycle
					div = slide
						img = full screen size image
					div = slide
						img = full screen size image
					etc.
			*/
			var Old = {
				setup: function(){
					$.Body.addClass('mc-old-browser').addClass('mc-browserversion-'+$.browser.version.split('.')[0]);
					
					if($.Slides.length > 0){					
						for(var j in $.Slides) {
							// Add new container div to the DOM
							$self.append($("<div>" + $.Slides[j].content + "</div>").attr("class", "mc-image mc-image-n" + j));
							
							// Cache our window's new dimensions
							$.Window
								.data('h',$(window).height())
								.data('w',$(window).width());
						}
						
						// Add our loading div to the DOM
						$('body').append($("<div></div>").attr("class", "mc-loader").css({'position':'absolute','left':'-99999px;'}));
						
						// Begin preloading
						Old.preload(0);
						
						// Setup the resize function to listen for window changes
						Old.windowResize();
					}
				},
				preload: function(num){
					// Load the image
					var $img = $('<img/>');
					$img.load(function() {
						var $loaded = $(this);
						$loaded.appendTo($('div.mc-loader'));
						$loaded.show();
						$loaded
							.data('h', $loaded.height())
							.data('w', $loaded.width())
							.data('ar', ($loaded.width() / $loaded.height()));
						$loaded.prependTo($('div.mc-image-n' + num));
						$('div.mc-loader').html();
						
						if(preload_count == ($.Slides.length-1)) {
							// Remove our loader element because all of our images are now loaded
							$('div.mc-loader').remove();
						
							// If we have just loaded the final image, run the user defined function onImagesLoaded()
							config.onImagesLoaded();
						
							// Configure the image
							Old.onceLoaded(preload_count);
						}else{
							// Configure the image
							Old.onceLoaded(preload_count);
							
							// Increment the counter
							preload_count++;
							
							// Load the next image
							Old.preload(preload_count);
						}
					});
					$img[0].src = $.Slides[num].url;
				},
				onceLoaded: function(m){
					// Do maximage magic
					Old.maximage(m);
					
					// Once the first image has completed loading, start the slideshow, etc.
					if(m==0) {
						// If we changed the visibility before, make sure it is back on
						$self.css({'visibility':'visible'});
						
						// Only start cycle after the first image has loaded
						Cycle.setup();
						
						// Run user defined onFirstImageLoaded() function
						config.onFirstImageLoaded();
					}
				},
				maximage: function(p){
					// Cycle sets the height of each slide so when we resize our browser window this becomes a problem.
					//  - the cycle option 'slideResize' has to be set to false otherwise it will trump our resize
					
					$('div.mc-image-n' + p)
						.height($.Window.data('h'))
						.width($.Window.data('w'))
						.children('img')
						.first()
						.each(function(){
							Old.scaleBG($(this));
						});
				},
				scaleBG: function($item){
					if($.Window.data('w') / $.Window.data('h') < $item.data('ar')){
						$item
							.height($.Window.data('h'))
							.width(($.Window.data('h') * $item.data('ar')).toFixed(0));
					}else{
						$item
							.height(($.Window.data('w') / $item.data('ar')).toFixed(0))
							.width($.Window.data('w'));
					}
					Old.centerBG($item);
				},
				centerBG: function($item){
					// Note: if alignment is 'left' or 'right' it can be controlled with CSS once verticalCenter 
					// 	and horizontal center are set to false in the plugin options
					if(config.verticalCenter && $item.width() == $.Window.data('w')){
						$item.css({'margin-top':(($item.height() - $.Window.data('h'))/2) * -1, marginLeft:0});
					}
					if(config.horizontalCenter && $item.height() == $.Window.data('h')){
						$item.css({marginLeft:(($item.width() - $.Window.data('w'))/2) * -1, marginTop:0});
					}
				},
				windowResize: function(){
					$.Window
						.bind($.Events.RESIZE,
						function(){
							clearTimeout(this.id);
							this.id = setTimeout(Old.doneResizing, 200);
						});
				},
				doneResizing: function(){
					// The final resize (on finish)
					// Remove scrollbars so we can take propper measurements
					$($.Scroll).addClass('mc-hide-scrolls');
					
					// Cache our window's new dimensions
					$.Window
						.data('h',$(window).height())
						.data('w',$(window).width());
					
					// Set the container's height and width
					$self.height($.Window.data('h')).width($.Window.data('w'))
					
					// Set slide's height and width to match the window size
					$self.find('.mc-image').each(function(n){
						Old.maximage(n);
					});
					
					// Update cycle's ideas of what our slide's height and width should be
					var curr_opts = $self.data('cycle.opts');
					curr_opts.height = $.Window.data('h');
					curr_opts.width = $.Window.data('w');
					jQuery.each(curr_opts.elements, function(index, item) {
					    item.cycleW = $.Window.data('w');
						item.cycleH = $.Window.data('h');
					})
					
					// Put the scrollbars back to how they were
					$($.Scroll).removeClass('mc-hide-scrolls');
				}
			}
			
			
			/* --------------------- */
			
			// @Cycle
			
			var Cycle = {
				setup: function(){
					$self.addClass('mc-cycle');
					
					var cycleOptions = $.extend(settings.cycleOptions, {
						fit:1,
						containerResize:0,
						height:$(window).height(),
						width:$(window).width()
					});
					
					$self.cycle( cycleOptions );
				}
			}
			
			
			/* --------------------- */
			
			// @Timer
			
			var Timer = {
				wait: function(){
					timerCheck = false;
				},
				start: function(){
					setTimeout( function() { Timer.reset(); }, config.scaleInterval );
				},
				reset: function(){
					timerCheck = true;
				},
				isReady: function(){
					return timerCheck;
				}
			}
			
			
			/* --------------------- */
			
			// @Utils = General utilities for the plugin
			
			var Utils = {
				construct_slide_object: function(){
					var obj = new Object();
					var arr = new Array();
					var temp = '';
					
					$self.children().each(function(){
						$img = $(this).is('img') ? $(this).clone() : $(this).find('img').first().clone();
						
						// reset obj
						obj = {};
						
						// set attributes to obj
						obj.url = $img.attr('src');
						obj.title = $img.attr('title') != undefined ? $img.attr('title') : '';
						obj.alt = $img.attr('alt') != undefined ? $img.attr('alt') : '';
						obj.theclass = $img.attr('class') != undefined ? $img.attr('class') : '';
						obj.styles = $img.attr('style') != undefined ? $img.attr('style') : '';
						obj.orig = $img.clone();
						obj.datahref = $img.attr('data-href') != undefined ? $img.attr('data-href') : '';
						obj.content = "";
						
						// Setup content for within container
						if($(this).find('img').length > 0){
							$(this).find('img').first().remove();
							obj.content = $(this).html();
						}
						
						// Stop loading image so we can load them sequentially
						$img.attr('src','');
						
						// Remove original object
						$(this).remove()
						
						// attach obj to arr
						arr.push(obj);
					});
					
					return arr;
				}
			}
			
			
			/* --------------------- */
			
			// @Instantiation
			
			// Construct array of image objects for us to use
			$.Slides = Utils.construct_slide_object();
			
			// Begin setup
			if(modern_browser()){
				Modern.setup();
				
				// Used for testing: 
				// Old.setup();
			}else{
				Old.setup();
			}
		}