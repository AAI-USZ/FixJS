function (clones) {
            var _this = this,
                // Get padding of '.rs-slide-bg' elem
                padding =   parseInt(this.$sliderBG.css('padding-left').replace('px', ''))
                            + parseInt(this.$sliderBG.css('padding-right').replace('px', '')),
                widths = [];

            // Loop through image clones & create array of widths
            var i = clones.length;
            while (i--) {
                widths.push($(clones[i]).width());

                // If not needed for thumbnails, remove image clones from the DOM
                if (_this.settings['controls'] !== 'thumbs') {
                    $(clones[i]).remove();
                }
            }

            // Apply width to '.rs-wrap' elem (width of slimmest slide image + container padding)
            this.$sliderWrap.css('width', Math.floor.apply(Math, widths) + padding);

            // Use the clones generated in this.init() to make thumbnails
            if (this.settings['controls'] === 'thumbs') {
                this.setThumbs(clones);
            }

            // Display first slide
            this.$currentSlide.css({'opacity' : 1, 'z-index' : 2});

            // Trigger hardware acceleration (if supported)
            this.$sliderBG.prefixes({'transform' : 'translateZ(0)'});
        }