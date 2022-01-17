function($, window, document, undefined) {
    $.fn.carousel = function(method) {
        // Method calling logic
        if(methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.carousel');
        }
        
        // function next() { methods.next.apply(this, arguments); }
    };
    
    // default slides

    // structure is:
    // <div class="slider">
    //     <div class="panel">
    //         <div class="slide 1">
    //             // ... any content ...
    //         </div>
    //         <div class="slide 2">
    //             // ... any content ...
    //         </div>
    //         <div class="slide 3">
    //             // ... any content ...
    //         </div>
    //     </div>
    // </div>
    var defaults = {
        slide:        '.slide', // default slide class
        panel:        '.panel', // default panel class (section that contains all slides)
        direction:    'next', // [next | prev] indicates direction to move slider if it auto-slides
        init:         function(prevSlide, curSlide, nextSlide, settings) {}, // before-init callback
        before:       function(prevSlide, curSlide, nextSlide, settings) {}, // before-slide callback
        after:        function(prevSlide, curSlide, nextSlide, settings) {}, // after-slide callback
        slideshow:    false, // is this a slideshow? (i.e. auto-advances)
        speed:        800, // transition speed in ms
        timeout:      8000, // timeout between slides (timer starts after last slide transition ends)
        easing:       'swing', // easing. without jQuery UI, only swing and linear are supported
        fullWidth:    false, // should this slideshow take up the entire width of the screen?
        needsStyle:   false, // apply styles via jQuery?
        nextButton:   false, // class for button that moves slideshow forward
        prevButton:   false, // class for button that moves slideshow backward
        navigation:   false,
        minWidth:     960, // set a minWidth for fullWidth sliders. fullWidth sliders can be responsive,
                           // this makes sure they don't get too small. Only is used is responsive is true
        slidesToShow: -1,  // number of slides to show at one time (-1 for as many as will fit).
                          // does not initiate if there aren't that many slides.
                          // does not apply to fullwidth slideshows

        // Not Yet Implemented
        responsive:   false // this can be used to make sliders to be responsive.

    };

    var clickable = true;
        
    var methods = {

        // function is called if no other function was explicitly called
        init: function(options) {

            // return self for chaining
            return this.each(function() {
                var $this = $(this);
               
                var settings = $.extend({}, defaults, options);
                $this.data('carousel', settings);
                                
                settings.curSlideIndex = 0;

                // set up vars
                settings.jump = 1;
                var $panel = $this.find(settings.panel);
                var $slides = $panel.find(settings.slide);

                // initialize positions (which are based off of initial DOM position)
                $slides.each(function(index) {
                    $(this).data('position', index);
                });
                
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
                        settings.timer = setTimeout(function() { $this.carousel(settings.direction); }, settings.timeout);
                    }

                    // set up auto navigation
                    if(settings.navigation) {
                        var $nav = $('<div class="carousel-navigation">').appendTo($this).on('click', 'a', function(event) {
                            event.preventDefault();

                            var jumpTo = $(this).data('jump');
                            $this.carousel('jump', jumpTo);
                        });

                        $slides.each(function(i) {
                            $('<a href="#" data-jump="' + i + '">' + (i + 1) + '</a>').appendTo($nav);
                        });
                    }

                    // it sets up sizing vars on window's resize, so let's force it the first time
                    $(window).resize();
                }
            });
        }, // init()
        
        // move slider in the forward direction (direction depends on settings)
        next: function() {

            // return self for chaining
            return $(this).each(function() {
                var $this = $(this);
                
                var settings = $this.data('carousel');
          
                // can't chain clicks
                if(!clickable) return;
                clickable = false;

                // set up variables
                var $panel = $this.find(settings.panel);
                var $slides = $panel.find(settings.slide);

                // prep the slider to go forward
                // if we're sliding several at once, jump will be the number we're jumping, so we prepare accodingly
                var jump = settings.jump;
                for(var i=0; i < jump; i++) {
                    // order constantly changing, so let's not use cached version
                    var $clone = $panel.find(settings.slide).eq(i).clone(true, false);
                    $clone.insertAfter($panel.find(settings.slide).last());
                }

                // order has changed. refresh $slides var
                $slides = $panel.find(settings.slide);
                
                // trigger the "slide is about to start" or "before" callback
                settings.before(
                    $slides.eq(0 + (jump - 1)), // prev slide
                    $slides.eq(1 + (jump - 1)), // current slide
                    $slides.eq(2 + (jump - 1)), // next slide
                    settings // settings (for reference on timer lengths, etc)
                );
        
                // advance the slider to the next position
                $panel.animate(
                    {'left': '-=' + settings.slideAmount},
                    settings.speed,
                    settings.easing,
                    function() {
                        // reset the slider positions
                        for(var i=0; i < jump; i++) {
                            // order constantly changing, so let's not use cached version
                            $panel.find(settings.slide).first().remove();
                        }

                        $panel.css('left', '-' + ((settings.slideWidth) + settings.offset) + 'px');

                        // order has changed. refresh $slides var
                        $slides = $panel.find(settings.slide);
                                
                        // trigger the "slide just finished" or "after" callback
                        settings.after(
                            $slides.eq(0), // prev slide
                            $slides.eq(1), // current slide
                            $slides.eq(2), // next slide
                            settings // settings (for reference on timer lengths, etc)
                        );
            
                        // make the slider buttons clickable again
                        clickable = true;

                        // start time for timeout AFTER animation finishes
                        if(settings.slideshow) {
                            clearTimeout(settings.timer);
                            settings.timer = setTimeout(function() { $this.carousel(settings.direction); }, settings.timeout);
                        }
                    }
                ); // $panel.animate()
            });
        }, // next()

        // move slider in the backward direction (direction depends on settings)
        prev: function() {

            // return self for chaining
            return $(this).each(function() {
                var $this = $(this);
                
                var settings = $this.data('carousel');
          
                // can't chain clicks
                if(!clickable) return;
                clickable = false;

                // set up variables
                var $panel = $this.find(settings.panel);
                var $slides = $panel.find(settings.slide);
    
                // prep the slider to go backward by cloning last slide to the front and adjusting positioning
                var jump = settings.jump;

                // if we're sliding several at once, jump will be the number we're jumping, so we prepare accodingly
                for(var i = 0; i < jump; i++) {
                    var len = $panel.find(settings.slide).length;
                    var $clone = $panel.find(settings.slide).eq(len - 1 - i).clone(true, false);
                    $clone.insertBefore($panel.find(settings.slide).first());
                }

                $panel.css('left', '-' + ((settings.slideWidth + settings.slideAmount) + settings.offset) + 'px');
            
                // order has changed. refresh $slides var
                $slides = $panel.find(settings.slide);

                // trigger the "slide is about to start" or "before" callback
                settings.before(
                    $slides.eq(3), // prev slide
                    $slides.eq(2), // current slide
                    $slides.eq(1), // next slide
                    settings // settings (for reference on timer lengths, etc)
                );
                
                // advance the slider to the previous position
                $panel.animate(
                    {'left': '+=' + settings.slideAmount},
                    settings.speed,
                    settings.easing,
                    function() {
                        // reset the slider positions
                        for(var i=0; i < jump; i++) {
                            $panel.find(settings.slide).first().remove();
                            $panel.find(settings.slide).first().before($panel.find(settings.slide).last());
                        }

                        $panel.css('left', '-' + ((settings.slideWidth) + settings.offset) + 'px');
                                
                        // order has changed. refresh $slides var
                        $slides = $panel.find(settings.slide);

                        // trigger the "slide just finished" or "after" callback
                        settings.after(
                            $slides.eq(0), // prev slide
                            $slides.eq(1), // current slide
                            $slides.eq(2), // next slide
                            settings // settings (for reference on timer lengths, etc)
                        );
        
                        // make the slider buttons clickable again
                        clickable = true;

                        // start time for timeout AFTER animation finishes
                        if(settings.slideshow) {
                            clearTimeout(settings.timer);
                            settings.timer = setTimeout(function() { $this.carousel(settings.direction); }, settings.timeout);
                        }
                    }
                ); // $panel.animate()
            });
        }, // prev()

        // jump to a specified position
        jump: function(jumpTo) {

            // return self for chaining
            return $(this).each(function() {
                var $this = $(this);
                
                var settings = $this.data('carousel');
                var $panel = $this.find(settings.panel);

                // get current position
                var currentPosition = $panel.find(settings.slide).eq(1).data('position');
            
                // find how much we're changing
                var change = jumpTo - currentPosition;
                
                // if change === 0, it means we're already on that slide
                if(change === 0) return;

                
                // determine that we're going to jump by abs(change)
                settings.jump = Math.abs(change);

                // stop current timeout
                clearTimeout(settings.timer);

                // make a note of the "normal" slideAmount
                var tempWidth = settings.slideAmount;
            
                // multiple the slide amount to reflech the number of slides we're changing
                settings.slideAmount *= Math.abs(change);
                
                // start the jump
                if(change < 0) $this.carousel('prev');
                else $this.carousel('next');
            
                // restore settings to their normal amounts
                settings.jump = 1;
                settings.slideAmount = tempWidth;
            });
        } // jump()

    }; // methods
}