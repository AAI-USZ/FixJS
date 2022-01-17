function(name, callback) {
        jCarousel.plugins[name] = callback;

        if (jCarouselAutoInstall !== false) {
            install($, $.fn, name, callback);
        }
    }