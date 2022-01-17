function() {
                var $this = $(this);
                
                var settings = $this.data('carousel');
          
                // can't chain clicks
                if(!settings.clickable) return;
                settings.clickable = false;

                // timer's gonna get reset at the end of the callback, but let's make sure it doesn't trigger in the middle of everything
                if(settings.timer !== undefined) window.clearTimeout(settings.timer);

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
        
                        // make the slider buttons settings.clickable again
                        settings.clickable = true;

                        // start time for timeout AFTER animation finishes
                        if(settings.slideshow) {
                            settings.timer = window.setTimeout(function() { methods.next.apply($this, [settings.direction]); }, settings.timeout);
                        }
                    }
                ); // $panel.animate()
            }