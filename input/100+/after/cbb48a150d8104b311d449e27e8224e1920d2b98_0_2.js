function (e) {
                // We don't need to worry about unbinding these events
                // This is because hideLightbox() doesn't do anything of
                // significance if the lightbox is already hidden, and
                // scrollGallery() only scrolls if there's something to
                // scroll to.
                if (e.keyCode === 27) {
                    that.hideLightbox();
                }
                if (e.keyCode === 37) {
                    that.scrollGallery('left');
                }
                if (e.keyCode === 39) {
                    that.scrollGallery('right');
                }
            }