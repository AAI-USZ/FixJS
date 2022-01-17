function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $container.offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    }