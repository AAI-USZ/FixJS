function() {
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
            }