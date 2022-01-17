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