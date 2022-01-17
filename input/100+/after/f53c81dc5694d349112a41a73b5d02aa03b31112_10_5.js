function( $el, $slides, nmbSlides, slideWidth, $slideBg, $button, $slideBgImage, $slideImagesContainer, $slidesContainer, settings ) {
					var $slide   = $slides.eq( $button.index() ),
						slideIdx = $slide.index(),
						bgimage  = $('img', $slideImagesContainer ).eq( slideIdx ).attr('src'),
						dir;
					
					if( settings.pos === slideIdx ) {
						$el.data( 'anim', false );
						return false;
					}
					
					settings.pos = $slide.index();
											
					anim['responsiveDef'].slideAux( $el, $slides, nmbSlides, slideWidth, $slideBg, $slideBgImage, $slideImagesContainer, bgimage, dir, slideIdx, settings );
				}