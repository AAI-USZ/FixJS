function() {
                        // make sure we have recent version of "slides"
                        $slides = $panel.find(settings.slide);

                        // make sure these settings realign with screen resize
                        settings.slideAmount = settings.slideWidth = $slides.eq(0).outerWidth(true);
                        
                        settings.numberOfSlides = $slides.length;

                        // because of different combinations of settings, this can get complex,
                        // but we need to adjust the slider on screen resize
                        if(settings.fullWidth) {
                            $this.width(Math.floor($(this).width()));
                            settings.offset = $slides.outerWidth(true) / 2;
                        } else {
                            settings.offset = 0;

                            if(settings.slidesToShow > 0) {
                                $this.width(settings.slidesToShow * settings.slideWidth);
                            }
                        }
                        
                        // these two lines are the "reset"
                        $panel.css('left', '-' + ((settings.slideAmount) + settings.offset) + 'px');
                        settings.curSlideIndex = (settings.curSlideIndex % settings.numberOfSlides) + 1;
                        
                        // TODO: This assumes a min width of 960, but probably shouldn't
                        if(settings.fullWidth) {
                            $('img', settings.slide).css('max-width', Math.max(960, $(this).width()));
                            $this.height('auto');
                        }
                    }