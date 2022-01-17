function applyStyles($copy, value) {
        // skip this if there's no currentStyle property
        if (!$copy[0].currentStyle) { return; }

        // this will work in IE
        $copy.each(function() {
            var copy = this,
                style = value || copy.currentStyle['text-shadow'],
                $copy = $(copy),
                parent = copy.parentNode;
            
            // ensure we have the correct style using inheritence
            while ((!style || style === 'none') && parent.nodeName !== 'HTML') {
                style = parent.currentStyle['text-shadow'];
                parent = parent.parentNode;
            }
            
            // don't apply style if we can't find one
            if (!style || style === 'none') {
                return true;
            }
            
            // parse the style
            var values = style.match(rtextshadow),
                color = 'inherit',
                opacity = 1,
                x, y, blur;

            // capture the values
            
            // pull out the color from either the first or last position
            // actually remove it from the array
            if (rcolortest.test(values[0])) {
                opacity = getAlpha(values[0]);
                color = toHex(values.shift());
            } else if (rcolortest.test(values[values.length - 1])) {
                opacity = getAlpha(values[values.length - 1]);
                color = toHex(values.pop());
            }

            x = parseFloat(values[0]); // TODO: handle units
            y = parseFloat(values[1]); // TODO: handle units
            blur = values[2] !== undefined ? parseFloat(values[2]) : 0; // TODO: handle units
            
            // style the element
            $copy.css({
                color: color,
                left: (x - blur) + 'px',
                top: (y - blur) + 'px'
            });
            
            // add in the filters
            if (opacity < 1 || blur > 0) {
                copy.style.filter = [
                    opacity < 1 ? filter + "Alpha(opacity=" + parseInt(opacity * 100, 10) + ") " : '',
                    blur > 0 ? filter + "Blur(pixelRadius=" + blur + ")" : ''
                ].join('');
            }
        });
    }