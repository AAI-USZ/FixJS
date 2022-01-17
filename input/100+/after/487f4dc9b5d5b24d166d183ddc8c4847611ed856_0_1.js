function(exp, c) {
            if ($.browser.mozilla) {
                // Firefox leaves the top in-place and resizes the bottom of an absolutely positioned bottom: 0 div,
                // so we need to counter-adjust the top by delta-height
                $(exp).each(function() {
                    var el = $(this), start = $(this).data("resizable-alsoresize-reverse"), style = {}, css = c && c.length ? c : ['width', 'height', 'top', 'left'];

                    $.each(css || ['width', 'height', 'top', 'left'], function(i, prop) {
                        var sum = (start[prop]||0) - (delta[prop]||0);
                        if (prop == 'top') {
                            var dh = (delta['height']||0);
                            sum += dh;
                        }
                        if (sum && sum >= 0)
                            style[prop] = sum || null;
                    });
                    
                    el.css(style);
                });
            } else {
                $(exp).each(function() {
                    var el = $(this), start = $(this).data("resizable-alsoresize-reverse"), style = {}, css = c && c.length ? c : ['width', 'height', 'top', 'left'];

                    $.each(css || ['width', 'height', 'top', 'left'], function(i, prop) {
                        var sum = (start[prop]||0) - (delta[prop]||0);
                        if (sum && sum >= 0)
                            style[prop] = sum || null;
                    });

                    //Opera fixing relative position
                    if (/relative/.test(el.css('position')) && $.browser.opera) {
                        self._revertToRelativePosition = true;
                        el.css({ position: 'absolute', top: 'auto', left: 'auto' });
                    }

                    el.css(style);
                });
            }
        }