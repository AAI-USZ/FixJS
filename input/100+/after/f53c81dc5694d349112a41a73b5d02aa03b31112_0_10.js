function(){

			var selectors  = [
				"iframe[src^='http://player.vimeo.com']",
				"iframe[src^='http://www.youtube.com']",
				"iframe[src^='http://blip.tv']",
				"iframe[src^='http://www.kickstarter.com']", 
				"object",
				"embed"
			],
				$allVideos = $(this).find(selectors.join(','));

			$allVideos.each(function(){

				var $this = $(this);

				if ( $this.hasClass('vjs-tech') || this.tagName.toLowerCase() == 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length )
					return;

				var videoHeight = $this.attr('height') || $this.height(),
					videoWidth  = $this.attr('width') || $this.width();

				$this.css({
					'height' : '100%',
					'width'  : '100%'
				})
				.removeAttr('height').removeAttr('width')
				.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css({
					'height' : videoHeight,
					'width'  : videoWidth
				})
				.data( 'aspectRatio', videoWidth / videoHeight )
				.addClass( $(this).attr('class') );

				adjustVideos();

			});

		}