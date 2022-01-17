function($container, css) {
        for (var i in css) {
            if (typeof(css[i]) != 'string')
                continue;
            css[i] = css[i]
                        .replace(/%window_height%/gi, $(window).height())
                        .replace(/%window_width%/gi,  $(window).width())
                        .replace(/%left%/gi,   $container.position().left)
                        .replace(/%top%/gi,    $container.position().top)
                        .replace(/%height%/gi, $container.outerHeight())
                        .replace(/%width%/gi,  $container.outerWidth());
            //Make int from result value
            var intVal = parseInt(css[i]);
            if (intVal)
                css[i] = intVal;
        }
        return css;
    }