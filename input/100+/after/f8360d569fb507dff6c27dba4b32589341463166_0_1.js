function(e){
				// AutoSlide controls.
				if (self.options.autoSlideControls && autoSlideStopWhenClicked) {
					$('body').find('[data-ref*=' + (self.sliderId).split('#')[1] + '][name=stop]').html(self.options.autoSlideStartText);
					clearTimeout(self.autoslideTimeout);
				}
				if (!self.clickable && self.options.continuous) {
					if (self.options.autoSlideStopWhenClicked) { clearTimeout(self.autoslideTimeout); }
					return false;
				}
				if (self.options.autoSlide) {
					// Clear the timeout
					if (self.options.autoSlideStopWhenClicked) { clearTimeout(self.autoslideTimeout); }
					else {
						self.autoSlide(clearTimeout(self.autoslideTimeout));
						self.clickable = true;
					}
				}
				// Stops from speedy clicking for continuous sliding.
				if (self.options.continuous) {clearTimeout(self.continuousTimeout);}
			}