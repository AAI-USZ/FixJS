function(t, val, time, orig, index) {
            var px = (m - val) * s.height;
            t.attr('style', (time ? (prefix + '-transition:all ' + time.toFixed(1) + 's ease-out;') : '') + (has3d ? (prefix + '-transform:translate3d(0,' + px + 'px,0);') : ('top:' + px + 'px;')));

            function getVal(t, b, c, d) {
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            }

            if (time && orig !== undefined) {
                var i = 0;
                clearInterval(iv[index]);
                iv[index] = setInterval(function() {
                    i += 0.1;
                    t.data('pos', Math.round(getVal(i, orig, val - orig, time)));
                    if (i >= time) {
                        clearInterval(iv[index]);
                        t.data('pos', val);
                    }
                }, 100);
                // Show +/- buttons
                clearTimeout(tv[index]);
                tv[index] = setTimeout(function() {
                    if (s.mode == 'mixed' && !t.hasClass('dwa'))
                        t.closest('.dwwl').find('.dwwb').fadeIn('fast');
                }, time * 1000);
            }
            else
                t.data('pos', val)
        }