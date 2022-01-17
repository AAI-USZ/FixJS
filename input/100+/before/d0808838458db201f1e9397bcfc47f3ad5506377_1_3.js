function(opts) {

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

	}