function( $el, $slides, nmbSlides, slideWidth, $slideBg, $slideBgImage, $slideImagesContainer, bgimage, dir, slideIdx, settings ) {
					var cnt = 0;
					
					// Prevent jumping by setting fixed height
					$slideImagesContainer.css('height', $slideImagesContainer.outerHeight() );
					
					$slideBgImage.stop().hide();
					$slideBgImage.eq( slideIdx ).stop().fadeIn( settings.type.speed, settings.type.easing ).css('display', 'block');
					
					// And reset it when animation is done
					$slideImagesContainer.css('height', '');
					
					$el.data( 'anim', false );
				}