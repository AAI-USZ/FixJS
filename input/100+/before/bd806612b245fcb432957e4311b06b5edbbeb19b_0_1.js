function(imageData, isSync) {
				var gallery = this;
				var nextIndex = this.getNextIndex(imageData.index);

				// Construct new hidden span for the image
				var newSlide = this.$imageContainer
					.append('<span class="image-wrapper current"><a class="advance-link" rel="history" href="#'+this.data[nextIndex].hash+'" title="'+imageData.title+'">&nbsp;</a></span>')
					.find('span.current').css('opacity', '0');
				
				newSlide.find('a')
					.append(imageData.image)
					.click(function(e) {
						gallery.clickHandler(e, this);
					});
				
				var newCaption = 0;
				if (this.$captionContainer) {
					// Construct new hidden caption for the image
                    
                    filename = imageData.slideUrl.replace(/^.*[\\\/]/, '');
                    //console.log("imageData.slideUrl = " + imageData.slideUrl);
                    console.log("filename = " + filename);
                    
                    if (filename.indexOf("no_pic") == -1) {
                        newCaption = this.$captionContainer
                            .append('<span class="image-caption current" id="current-caption"></span>')
                            .find('span.current').css('opacity', '0')
                            .append(imageData.caption);
                    }
                    else { // For no pic - bigger text
                        newCaption = this.$captionContainer
                            .append('<span class="image-caption-large current" id="current-caption"></span>')
                            .find('span.current').css('opacity', '0')
                            .append(imageData.caption);
                    }
                    
				}

				// Hide the loading conatiner
				if (this.$loadingContainer) {
					this.$loadingContainer.hide();
				}

				// Transition in the new image
				if (this.onTransitionIn) {
					this.onTransitionIn(newSlide, newCaption, isSync);
				} else {
					newSlide.fadeTo(this.getDefaultTransitionDuration(isSync), 1.0);
					if (newCaption)
						newCaption.fadeTo(this.getDefaultTransitionDuration(isSync), 1.0);
				}
				
				if (this.isSlideshowRunning) {
					if (this.slideshowTimeout)
						clearTimeout(this.slideshowTimeout);

					this.slideshowTimeout = setTimeout(function() { gallery.ssAdvance(); }, this.delay);
				}

				return this;
			}