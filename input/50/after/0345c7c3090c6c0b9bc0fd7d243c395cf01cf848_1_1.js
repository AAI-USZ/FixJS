function() {
            elem.toggleClass(options.closed_css).toggleClass(options.open_css);
            options.on_toggle(elem, options);
        }