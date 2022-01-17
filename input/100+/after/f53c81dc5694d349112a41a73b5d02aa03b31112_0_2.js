function() {

		var $fancyboxItems = $('.single-image, .image-gallery, .iframe');

		// Images
		$('.single-image, .image-gallery').fancybox({
			type        : 'image',
			openEffect  : 'fade',
			closeEffect	: 'fade',
			nextEffect  : 'fade',
			prevEffect  : 'fade',
			helpers     : {
				title   : {
					type : 'inside'
				},
				buttons  : {},
				media    : {}
			},
			afterLoad   : function() {
				this.title = this.group.length > 1 ? 'Image ' + ( this.index + 1 ) + ' of ' + this.group.length + ( this.title ? ' - ' + this.title : '' ) : this.title;
			}
		});

		// Iframe
		$('.iframe').fancybox({
			type        : 'iframe',
			openEffect  : 'fade',
			closeEffect	: 'fade',
			nextEffect  : 'fade',
			prevEffect  : 'fade',
			helpers     : {
				title   : {
					type : 'inside'
				},
				buttons  : {},
				media    : {}
			},
			width       : '70%',
			height      : '70%',
			maxWidth    : 800,
			maxHeight   : 600,
			fitToView   : false,
			autoSize    : false,
			closeClick  : false
		});

		// Insert zoom icons, once page is fully loaded
		$(window).load(function() {

			$fancyboxItems.each(function() {

				var $this = $(this);

				if( !$this.hasClass('none') && !$this.children('.entry-image').length && !$this.parents('.image-gallery-slider').length )
					$this.css({
						'height' : $this.children().height() !== 0 ? $this.children().height() : 'auto',
						'width'  : $this.children().width()  !== 0 ? $this.children().width()  : 'auto'
					});

				$this.append('<span class="zoom">&nbsp;</span>');

			});

		});
		
	}