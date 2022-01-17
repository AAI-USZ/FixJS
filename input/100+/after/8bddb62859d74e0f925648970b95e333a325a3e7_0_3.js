function (clones) {

            var _this = this,

                // Set percentage width (minus user-defined margin) to span width of slider

                width = (100 - ((this.totalSlides - 1) * this.settings['thumbMargin'])) / this.totalSlides + '%';



            // <div> wrapper to contain thumbnails

            this.$thumbWrap = $('<div class="rs-thumb-wrap" />').appendTo(this.$sliderWrap);



            // Loop to apply thumbnail widths/margins to <a> wraps, appending an image clone to each

            for (var i = 0; i < this.totalSlides; i++) {

                var $thumb = $('<a class="rs-slide-link-'+ i +'" />').css({'width' : width, 'marginLeft' : this.settings['thumbMargin'] + '%'}).attr({'href' : '#'});

                $(clones[i]).removeAttr('style').appendTo(this.$thumbWrap).wrap($thumb);

            }



            // Safety margin to stop IE7 wrapping the thumbnails (no visual effect in other browsers)

            this.$thumbWrap.children().last().css('margin-right', -10);



            // Add active class to starting slide's respective thumb

            $(this.$thumbWrap.find('a')[this.settings['startSlide']]).addClass('active');



            // Listen for click events on thumnails

            this.$thumbWrap.on('click', 'a', function (e) {

                e.preventDefault();



                // Get identifier from thumb class

                var cl = parseInt($(this).attr('class').split('-')[3]);



                // Call transition

                _this.transition(cl);

            });

        }