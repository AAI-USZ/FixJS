function () {
            var that = this;
            $('body')
                .append($('<div class="ltl-modal-overlay"></div>')
                    .hide()
                    .click(function () {
                        that.hideLightbox();
                    })
                    )
                .append($($('<div class="ltl-box"></div>')
                    .append($('<div class="ltl-close-button"></div>')
                        .click(function () {
                            that.hideLightbox();
                        })
                        )
                    .append($('<div class="ltl-scroller left"></div>')
                        .click(function () {
                            that.scrollGallery('left');
                        })
                        )
                    .append($('<div class="ltl-scroller right"></div>')
                        .click(function () {
                            that.scrollGallery('right');
                        })
                        )
                    .append($('<div class="image"></div>'))
                    .hide()
                    ));

            this.findImagesInLists().click(function () {
                that.switchImage(this);
                that.showLightbox();
            });
        }