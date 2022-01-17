function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $container.offset().left + $container.width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    }