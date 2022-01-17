function(element, settings) {
        var fold, $container = settings.$container;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            if (!$container.offset()) {console.log(element, $container[0])}
            fold = $container.offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    }