function (callback) {

            var _this = this;



            // Prepare slide opacity & z-index

            this.RS.$currentSlide.css('z-index', 2);

            this.RS.$nextSlide.css({'opacity' : 1, 'z-index' : 1});



            // Fade out/in captions with CSS/JS depending on browser capability

            if (this.RS.cssTransitions) {

                this.RS.$currentSlide.find('.rs-caption').css('opacity', 0);

                this.RS.$nextSlide.find('.rs-caption').css('opacity', 1);

            } else {

                this.RS.$currentSlide.find('.rs-caption').animate({'opacity' : 0}, _this.RS.settings['transitionDuration']);

                this.RS.$nextSlide.find('.rs-caption').animate({'opacity' : 1}, _this.RS.settings['transitionDuration']);

            }



            // Check if transition describes a setup method

            if (typeof this.setup === 'function') {

                // Setup required by transition

                var transition = this.setup();

                setTimeout(function () {

                    callback(transition);

                }, 40);

            } else {

                // Transition execution

                this.execute();

            }



            // Listen for CSS transition end on elem (set by transition)

            if (this.RS.cssTransitions) {

                $(this.listenTo).one('webkitTransitionEnd transitionend otransitionend msTransitionend MSTransitionEnd', function () {

                    // Post-transition reset

                    _this.after();

                });

            }

        }