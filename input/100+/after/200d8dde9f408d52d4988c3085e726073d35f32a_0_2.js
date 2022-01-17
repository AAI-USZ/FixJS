function(hndlrs, settings) {		

		handlers = hndlrs;

		var options = $.extend({

			smallImgClassName:  'zt-small',

			zoomedImgClassName: 'zt-zoomed',

			dbKeyDimensions:    'originalDimensions',

			dbKeyZoomedImg:     'zoomedImage',

			zoomedImageCss:     {

									padding:    '5px', 

									background: 'white'									

								},

			loaderCss:          {

									opacity:         0.8,

									'border-radius': 1,

									background:      'white'

								} 

		}, settings);		

		

		// Remove the zoom image if the mouse is anywhere but on a zoomed image or a small image

		$(this).parent().mousemove(function(e){

			if (!($(e.target).hasClass(options.smallImgClassName) || $(e.target).hasClass(options.zoomedImgClassName))){

				var zoomedImage = $('.' + options.zoomedImgClassName).filter(':visible');

				zoomedImage.fadeOut();

			}

		});

		

		// Iterate all elements under this one

		$('*', this).each(function(index, element) {

			var $el = $(element);

			if ($el.hasClass(options.smallImgClassName) || $el.hasClass(options.zoomedImgClassName)) return;

			var	zoomedImageUrl = getZoomedImageUrl($el);			

			if (zoomedImageUrl === undefined) return; // Can't find zoomed image URL - no need to continue

			

			$el.mousemove(function(e){				

				if ($el.hasClass(options.smallImgClassName)) { // Zoomed image is ready, we just need to set position and dimensions 

					var existingZoomedImage = $.data($el, options.dbKeyZoomedImg);

					var dimensions = $.data($el, options.dbKeyDimensions);

					if (dimensions === undefined) return; // Happens in FF sometime for some reason

					setPositionAndDimensions(e, existingZoomedImage, dimensions);

					if (!existingZoomedImage.is(':visible')){

						existingZoomedImage.fadeIn();

					}

				} else { // First time we've seen this element so we need to set up everything						

					var loader = $('<img />', { // Spinner

							id:  'loader',

							src: 'ajax-loader.gif',

							alt: 'Loading...'

						}),

						zoomImage = $('<img />', { // The zoom image

							'class': options.zoomedImgClassName, 

							src:     zoomedImageUrl, 

							alt:     ''

						}).css({visibility: 'hidden'}),

						$body = $('body');

					loader.load(function(){

						$(this).css($.extend({							

							position: 		 'absolute',

							top:  			 $el.offset().top + 2,

							left: 			 $el.offset().left + $el.width() - $(this).width() - 2

						}, options.loaderCss));

					});					

					$body.append(loader);

					

					// Create the zoom image, when it's loaded give it the proper dimensions	

					$body.append(zoomImage);

					zoomImage.load(function(){

						$.data($el, options.dbKeyDimensions, {

							width:  $(this).width(), 

							height: $(this).height()

						});

						$(this).css($.extend(options.zoomedImageCss, {

						    visibility: 'visible',

							position:   'absolute', 

							zIndex:     999							

						}));

						setPositionAndDimensions(e, this, $.data($el, options.dbKeyDimensions));

						loader.remove();

					});

					var bounds = {

						xMin: $el.offset().left,

						xMax: $el.offset().left + $(this).width(),

						yMin: $el.offset().top,

						yMax: $el.offset().top + $(this).height()

					};

					// If the mouse pointer is on the zoomed image but out of the bounds of the small image, remove the zoom image, otherwise make sure we move the zoom image and modify its size appropriately

					zoomImage.mousemove(function(e){ 

						if (e.pageX < bounds.xMin || 

							e.pageX > bounds.xMax || 

							e.pageY < bounds.yMin || 

							e.pageY > bounds.yMax) {

							$(this).fadeOut();

							return;

						}

						setPositionAndDimensions(e, this, $.data($el, options.dbKeyDimensions));						

					});		

					$el.addClass(options.smallImgClassName);	

					$.data($el, options.dbKeyZoomedImg, zoomImage);			

				}

			});

		});

    }