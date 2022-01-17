function() {

			img = $(this);

	      	var options = $.meta ?
	      		$.extend({}, ip.options, img.data()) : ip.options;


			ip.image 		= img;
			ip.frame 		= 'div.' + options.frameClassName;

			ip.imageWidth 	= img.width();
			ip.imageHeight  = img.height();

			ip.frames 		= options.frames;
			ip.framesNum 	= options.frames.length;

			ip.activeFrame  = options.startFrame;
			ip.nextFrame 	= parseInt(options.startFrame) + 1;

			// Get object data & do the resize math
			target = getTargetObject(options.startFrame);
			target = resizeMath(target)



			img

				// Add page class
				.addClass('page')

				// Scale & shift image
				.css({
					marginTop: 	'-' + target.top + 'px',
					marginLeft: '-' + target.left + 'px',
					width: 		target.imgWidth,
					height: 	target.imgHeight,
				})

				// Wrap image in frame
				.wrap('<div class="' + options.frameClassName + ' loading"></div>')
			;

			var frame = img.parent();

			// Scale frame
			frame.css({
				overflow: 	'hidden',
				width: 		target.width,
				height: 	target.height
			});


			// If image loaded

			img.load(function(){

				var loadedImage = $(this);

				// Show frame
				if(typeof options.startEffect == 'function') {
					options.startEffect.call(this);
				} else {

					// Show image
					switch(options.startEffect) {

						case 'static':
							loadedImage.show(0, function(){
								onFirstLoaded(loadedImage);
							});
						break;

						case 'fadeIn':
							loadedImage.fadeIn(options.startFadeDuration, function(){
								onFirstLoaded(loadedImage);
							});
						break;
					}
				}

				// Show controls
				initControls(target, frame);

				// Show Logo
				if(ip.options.showLogo){
					$(frame).prepend(
						'<div class="ui logo" style="position: absolute; display: block; opacity:1; width:200px; text-align: left; top:-6px; z-index:100;">' +
						    '<a href="http://imgplayer.yaycomics.net"><img src="../imgplayer/images/logo.png" style="border:none; opacity:0.25;margin: 12px;"></a>' +
						'</div>'
					);
				}

				/* DEV -------------------------------------------

				// UI Elements

				// Fullscreen
				if($.imgplayer.options.showFullscreen){
					$(frame).prepend(
						'<div class="ui fullscreen-button" style="position: absolute; display: block; float:right; opacity:1; width:50px; text-align: right; bottom:-8px;right:0;  z-index:100;">' +
						    '<a class="goFullscreen"><img src="../imgplayer/images/fullscreen.png" style="border:none; opacity:0.25;"></a>' +
						'</div>'
					);
				}
				$('.goFullscreen').click(function(){ $.imgplayer.goFullscreen(); });

				*/

				// Autoplay
				if(ip.options.autoplay) {

					ip.autoplay(ip.options.autoplayDelay);

					if(ip.options.autoplayHoverPause) {

						frame.hover(function(){

							// Todo: Move in function autoplayPause()
							ip.stopAutoplay(autoplay);
							img.stop().animate({opacity:0.4}, 200);
							//$(frame).prepend(ip.options.tplAutoplayPause);

						}, function(){

							// Todo: Move in function autoplayContinue()
							img.stop().animate({opacity:1}, 200);
							ip.autoplay(ip.options.autoplayDelay);
							//$('.autoplay-pause').remove();

						});
					}
				}

				// Hover UI Buttons
				$('.ui img').hover(function(){
					$(this).stop().animate({opacity: 1});
				},function(){
					$(this).stop().animate({opacity: 0.25});
				});

				// onImageClick Callback
				if(typeof ip.options.onImageClick == 'function'){
					$(frame).click(function(){
						ip.options.onImageClick.call(this);
					});
				}


			});	// End of image .load()



			/*
			$('.navi a').hide();
			// onImageClick behaviour
			if($.imgplayer.options.onImageClick) {
				$(frame).css('cursor', 'pointer');
				$('.navi a').hover(function(){
					$(this).show();
				}, function(){
					$(this).fadeOut();
				});
			}
			*/

			/* Round corners support */
			var borderRadius = img.css('border-radius');
			var borderRadiusInt = parseInt(borderRadius);
			if(borderRadiusInt!=0) {
				img.wrap('<div class="imgplayer-borderradius" style="border-radius:'+borderRadius+'; -webkit-border-radius:'+borderRadius+'; -moz-border-radius:'+borderRadius+'; overflow:hidden; height: 100%" />');
			}





		}