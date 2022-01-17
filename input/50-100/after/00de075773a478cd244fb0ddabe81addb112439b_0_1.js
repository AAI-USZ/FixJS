function(n) {
                $('<span class="' + opts.span_class + '" style="background-image: url(' + url + ');background-position : right -' + finks[n] * 16 + 'px;"></span>')[manipFn](this);
            }