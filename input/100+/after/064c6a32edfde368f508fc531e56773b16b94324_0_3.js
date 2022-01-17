function() {
            var copy = this,
                style = value || copy.currentStyle['text-shadow'],
                $copy = $(copy),
                parent = copy.parentNode,
                shadows, i = 0;
            
            // ensure we have the correct style using inheritence
            while ((!style || style === 'none') && parent.nodeName !== 'HTML') {
                style = parent.currentStyle['text-shadow'];
                parent = parent.parentNode;
            }
            
            // don't apply style if we can't find one
            if (!style || style === 'none') {
                return true;
            }
            
            // split the style, in case of multiple shadows
            shadows = style.split(rtextshadowsplit);

            // loop by the splits
            $.each(shadows, function() {
                var shadow = this;

                if (shadow == ',') { // IE 9
                    return true;
                }

                // parse the style
                var values = shadow.match(rtextshadow),
                    color = 'inherit',
                    opacity = 1,
                    x, y, blur, $elem;

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
                
                // create new shadows when multiple shadows exist
                if (i == 0) {
                    $elem = $copy;
                } else {
                    $elem = $copy.clone().prependTo($copy.parent())
                        .addClass(prefix + '-copy-' + (i + 1))
                        .removeClass(prefix + '-copy-1');
                }

                // style the element
                $elem.css({
                    color: color,
                    left: (x - blur) + 'px',
                    top: (y - blur) + 'px'
                });
                
                // add in the filters
                if (opacity < 1 || blur > 0) {
                    $elem[0].style.filter = [
                        opacity < 1 ? filter + "Alpha(opacity=" + parseInt(opacity * 100, 10) + ") " : '',
                        blur > 0 ? filter + "Blur(pixelRadius=" + blur + ")" : ''
                    ].join('');
                }
                i++;
            });
        }