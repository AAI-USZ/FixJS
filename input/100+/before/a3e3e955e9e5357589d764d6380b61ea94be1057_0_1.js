function() {
		
		var target = this;
		var url = target.css("background-image");
		url = url.replace("preview", "full");
		var realWidth = target.data("width");
		var realHeight = target.data("height");
		var isPhotoLandscape = (realWidth > realHeight);
		var ratio = realHeight / realWidth;
		var canvas = $("#canvas");
		
		canvas.css("height", $(document).height());
		canvas.css("width", $(document).width());
		
		var lightboxContainer = $("#lightbox-container");
		lightboxContainer.css("height", $(document).height());
		lightboxContainer.css("width", $(document).width());
		lightboxContainer.show();
		var lightbox = $("#lightbox");
		var height = 0;
		var width = 0;
		if (isPhotoLandscape) {
			height = $(window).height() - 150;
			width = height / ratio;
		} else {
			height = $(window).height() - 150;
			width = height / ratio;			
		}
		lightbox.css("height", height);
		lightbox.css("width", width);
		var offset = $(window).scrollTop();
		lightbox.css("top", offset + ($(window).height() - height - 100) / 2);
		lightbox.css("left", ($(window).width() - width) / 2);
		lightbox.css("background-image", url);
		lightbox.click(function() {
			lightbox.fadeOut(200);
			$("#lightbox-container").fadeOut(200);
		});
		lightbox.show();

	}