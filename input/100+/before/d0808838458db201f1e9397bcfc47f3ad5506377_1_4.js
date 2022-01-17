function($, window){

	/* Private variables */

	var overlay = $('<div id="galleryOverlay">'),
		slider = $('<div id="gallerySlider" class="gallery-slider" />'),
		prevArrow = $('<a id="prevArrow" class="gallery-nav gallery-nav-prev" data-gallery-nav="prev"></a>'),
		nextArrow = $('<a id="nextArrow" class="gallery-nav gallery-nav-prev" data-gallery-nav="next"></a>'),
		overlayVisible = false,
		currentGalleryID;


	/* Creating the plugin */

	$.touchTouch = {

		init: function () {

			// Listen for touch events on the body and check if they
			// originated in #gallerySlider img - the images in the slider.
			$('body').on('touchstart.touchtouch', '.gallery-slider img', function(e) {

				var touch = e.originalEvent,
					startX = touch.changedTouches[0].pageX;

				slider.on('touchmove.touchtouch',function(e){

					e.preventDefault();

					touch = e.originalEvent.touches[0] ||
							e.originalEvent.changedTouches[0];

					if (touch.pageX - startX > 10) {
						slider.off('touchmove.touchtouch');
						slider.trigger('slide.touchtouch', 'prev');
						//showPrevious();
					} else if (touch.pageX - startX < -10) {
						slider.off('touchmove.touchtouch');
						slider.trigger('slide.touchtouch', 'next');
						//showNext();
					}
				});

				// Return false to prevent image
				// highlighting on Android
				return false;

			}).on('touchend.touchtouch',function(){
				slider.off('touchmove.touchtouch');
			});

			// Listen for arrow keys
			$(window).bind('keydown.touchtouch', function(e) {

				if (e.keyCode == 37) {
					slider.trigger('slide.touchtouch', 'prev');
					//showPrevious();
				}
				else if (e.keyCode==39){
					slider.trigger('slide.touchtouch', 'next');
					//showNext();
				}

			});

			// Hide the gallery if the background is touched / clicked
			slider.on('click.touchtouch',function(e){
				if(!$(e.target).is('img')){
					$.touchTouch.hideOverlay();
				}
			});

			// Appending the markup to the page
			overlay
			.append(slider)
			.append('<div class="gallery-caption"><span /></div>');

			// If the browser does not have support
			// for touch, display the arrows
			if ( !("ontouchstart" in window) ) {
				overlay
				.append(prevArrow, nextArrow)
				.on('click.touchtouch', '.gallery-nav', function () {
					var dir = $(this).data('gallery-nav');
					slider.trigger('slide.touchtouch', dir);
					return false;
				});
			}

			overlay.hide().appendTo('body');
		},

		offsetSlider: function (index){
			// This will trigger a smooth css transition
			slider.css('left',(-index*100)+'%');
		},

		showOverlay: function (index) {

			// If the overlay is already shown, exit
			if (overlayVisible){
				return false;
			}

			// Show the overlay
			overlay.show();

			setTimeout(function(){
				// Trigger the opacity CSS transition
				overlay.addClass('is-visible');
			}, 100);

			// Move the slider to the correct image
			$.touchTouch.offsetSlider(index);

			// Raise the visible flag
			overlayVisible = true;
		},

		hideOverlay: function () {
			// If the overlay is not shown, exit
			if(!overlayVisible){
				return false;
			}

			// Hide the overlay
			overlay.hide().removeClass('is-visible');
			overlayVisible = false;
		},

		// Load the image and execute a callback function.
		// Returns a jQuery object

		loadImage: function (src, callback){
			var img = $('<img>').on('load', function() {
				callback.call(img);
			});

			img.attr('src',src);
		},

		defaults: {
			showCaption: true
		}
	};

	$.fn.touchTouch = function(opts) {

		var placeholders = '',
			index = 0,
			items = this,
			galleryID = 'gallery-' + ($.guid++),
			options = $.extend({}, $.touchTouch.defaults, opts || {});

		/* Private functions */


		// Preload an image by its index in the items array
		function preload(index){
			setTimeout(function(){
				showImage(index);
			}, 1000);
		}

		// Show image in the slider
		function showImage(index){
			var item;
			// If the index is outside the bonds of the array
			if(index < 0 || index >= items.length){
				return false;
			}

			item = items.eq(index);

			// Call the load function with the href attribute of the item
			$.touchTouch.loadImage(item.attr('href'), function() {
				placeholders.eq(index).html(this);
			});
		}

		function showNext () {

			// If this is not the last image
			if(index+1 < items.length){
				index++;
				$.touchTouch.offsetSlider(index);
				preload(index+1);
			}
			else{
				// Trigger the spring animation

				slider.addClass('rightSpring');
				setTimeout(function(){
					slider.removeClass('rightSpring');
				},500);
			}
		}

		function showPrevious () {

			// If this is not the first image
			if(index>0){
				index--;
				$.touchTouch.offsetSlider(index);
				preload(index-1);
			}
			else{
				// Trigger the spring animation

				slider.addClass('leftSpring');
				setTimeout(function(){
					slider.removeClass('leftSpring');
				},500);
			}
		}

		// Creating a placeholder for each image
		$.each(items.get(), function() {
			placeholders += '<div class="placeholder" />';
		});
		placeholders = $(placeholders);

		// Listening for clicks on the thumbnails

		items
		.data('touchtouch-gallery-id', galleryID)
		.on('click.touchtouch', function(e) {

			//get the galleryID
			var galleryID = $.data(this, 'touchtouch-gallery-id');

			e.preventDefault();

			if (galleryID !== currentGalleryID) {
				currentGalleryID = galleryID;
				slider
				.empty()
				.off('slide.touchtouch')
				.append(placeholders)
				.on('slide.touchtouch', function (e, dir) {
					if (dir === 'next') {
						showNext();
					} else {
						showPrevious();
					}
					if (options.showCaption) {
						overlay.find('.gallery-caption span').html(items.eq(index).attr('title'));
					}

				});
			}

			// Find the position of this image
			// in the collection

			index = items.index(this);
			$.touchTouch.showOverlay(index);
			showImage(index);
			if (options.showCaption) {
				overlay.find('.gallery-caption span').html($.attr(this, 'title'));
			}

			// Preload the next image
			preload(index+1);

			// Preload the previous
			preload(index-1);

		});

		return this;

	};

	$(document).ready($.touchTouch.init);

}