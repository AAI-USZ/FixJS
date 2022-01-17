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