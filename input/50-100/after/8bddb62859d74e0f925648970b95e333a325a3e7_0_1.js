function() {

            var _this = this,

                $captions = this.$slides.find('.rs-caption');



            // User-defined caption width

            $captions.css({'width' : _this.settings['captionWidth'] + '%', 'opacity' : 0});



            // Display starting slide's caption

            this.$currentSlide.find('.rs-caption').css({'opacity' : 1});



            // Add CSS3 transition vendor prefixes

            $captions.each(function() {

                $(this).prefixes({

                    'transition':'opacity ' + _this.settings['transitionDuration'] + 'ms ease-in-out',

                    'transform' : 'translateZ(0)' // Necessary for some reason to stop caption opacity jumping when translateZ is also applied to '.rs-slide-bg' (RS.$sliderBG)

                });

            });

        }