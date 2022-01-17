function () {

            var _this = this;



            // User-defined function to fire on slider initialisation

            this.settings['onInit']();



            // Setup captions

            this.captions();



            // Setup arrow navigation

            if (this.settings['controls'] === 'arrows') this.setArrows();



            // Setup keyboard navigation

            if (this.settings['keyNav']) this.setKeys();



            // Add slide identifying classes

            for (var i = 0; i < this.totalSlides; i++) {

                $(this.$slides[i]).attr('class', 'rs-slide-' + i);

            }



            // Setup slideshow

            if (this.settings['autoPlay']) {

                this.setAutoPlay();



                // Listen for slider mouseover

                this.$slider.on('mouseenter', function () {

                    clearTimeout(_this.cycling); // Pause if hovered

                });



                // Listen for slider mouseout

                this.$slider.on('mouseleave', function () {

                    _this.setAutoPlay(); // Resume slideshow

                });

            }



            // Get the first image in each slide <li>

            var images = $(this.$slides).find('img:eq(0)').addClass('rs-slide-image'),

                clones = [];



            // Fires once all images have been loaded

            $(images).imagesLoaded(function () {



                // Loop through images & append clones to slider (for dimension testing and thumbnails)

                for (var i = 0; i < _this.totalSlides; i++) {

                    clones.push($(images[i]).clone().css({'position':'absolute', 'visibility':'hidden', 'display':'block'}).appendTo(_this.$slider));

                }

                setTimeout(function () {

                    _this.setup(clones);

                }, 0); // Webkit requires this instant timeout to avoid premature rendering

            });

        }