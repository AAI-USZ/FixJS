function( $el, $slides, nmbSlides, slideWidth, $slideBg, $button, $slideImagesContainer, $slidesContainer, settings ) {
					var $slide   = $slides.eq( $button.index() ),
						slideIdx = $slide.index(),
						bgimage  = $('img', $slideImagesContainer ).eq( slideIdx ).attr('src'),
						dir;
					
					if( settings.pos === slideIdx ) {
						$el.data( 'anim', false );
						return false;
					}
					
					settings.pos = $slide.index();
					
					anim[settings.type.mode].slideAux( $el, $slides, nmbSlides, slideWidth, $slideBg, bgimage, dir, settings );
					
				}