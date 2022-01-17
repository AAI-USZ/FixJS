function() {
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
            }