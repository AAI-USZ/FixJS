function() {
                var $this = $(this);

                var settings = $.extend({}, defaults, options);
                $this.data('carousel', settings);
                                
                settings.curSlideIndex = 0;
                settings.clickable = true;

                if(settings.panel === false) {
                    var panelClass = 'carousel-panel';
                    var $tmpSlides = $this.find(settings.slide);
                    $('<div class="' + panelClass + '" />').appendTo($this).append($tmpSlides);
                    settings.panel = '.' + panelClass;
                }

                // set up vars
                settings.jump = 1;
                var $panel = $this.find(settings.panel);
                var $slides = $panel.find(settings.slide);

                // initialize positions (which are based off of initial DOM position)
                $slides.each(function(index) {
                    $(this).data('position', index);
                });
                
                // don't intialize the slides if there are less slides than we even want to show
                if($slides.length >= settings.slidesToShow || settings.slidesToShow === -1) {

                    // option to set the styles via jQuery
                    // extra initialization overhead, but easier to set up
                    // must be done first or else the next step may have incorrect numbers
                    if(settings.needsStyle) {
                        $this.width(settings.slideAmount).css('overflow', 'hidden');
                        $panel.width('12000px').css('position', 'relative');
                        
                        if(settings.fullWidth) $panel.css('margin-left', '50%');
                        $slides.css('float', 'left');
                    }

                    $(window).resize(function() {
                        // make sure to refresh $slides to be in current state
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
                        
                        // these two lines are the position "reset"
                        $panel.css('left', '-' + ((settings.slideAmount) + settings.offset) + 'px');
                        settings.curSlideIndex = (settings.curSlideIndex % settings.numberOfSlides) + 1;
                        
                        // TODO: implement responsive
                        // make slideshow responsive
                        if(settings.fullWidth && settings.responsive && false) {
                            $slides.find('img').css('max-width', Math.max(settings.minWidth, $this.width()));
                            $this.height('auto');
                        }
                    }); // $(window).resize()
                    
                    // bind buttons
                    if(settings.nextButton) {
                        $(settings.nextButton).click(function(event) {
                            event.preventDefault();
                            $this.carousel('next');
                        });
                    }
                    if(settings.prevButton) {
                        $(settings.prevButton).click(function(event) {
                            event.preventDefault();
                            $this.carousel('prev');
                        });
                    }
                    
                    // if only 1 slide, copy and append twice. if only 2 slides, copy the two slides and append. needs min of 3 slides to work (since 3 can be visible at once)
                    if(settings.fullWidth) {
                        if(settings.numberOfSlides === 1) {
                            $slides.last()
                                .after($slides.first().clone(true))
                                .after($slides.first().clone(true), settings);
                        }

                        if(settings.numberOfSlides === 2) {
                            $slides.last()
                                .after($slides.clone(true), settings);
                        }
                    }
                    
                    // first last slide before first
                    $slides.last().insertBefore(
                        $slides.first()
                    );
                            
                    // prepare the first slide
                    $panel.css('left', '-' + ((settings.slideWidth) + settings.offset) + 'px');
                    settings.init($slides.eq(0), $slides.eq(1), $slides.eq(2), settings);
                
                    // set timeout if this is a slideshow
                    if(settings.slideshow) {
                        settings.timer = window.setTimeout(function() { methods.next.apply($this, [settings.direction]); }, settings.timeout);
                    }

                    // TODO: this nav thing could definitely be a lot more robust
                    // set up auto navigation
                    if(settings.navigation) {
                        var $nav = $('<div class="carousel-navigation">').appendTo($this).on('click', 'a', function(event) {
                            event.preventDefault();

                            var jumpTo = $(this).data('jump');
                            $this.carousel('jump', jumpTo);
                        });

                        // create links for jumps
                        $slides.each(function(i) {
                            $('<a href="#" data-jump="' + i + '">' + (i + 1) + '</a>').appendTo($nav);
                        });
                    }

                    // it sets up sizing vars on window's resize, so let's force it the first time
                    $(window).resize();
                }
            }