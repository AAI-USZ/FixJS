function createStripes() {
            if (!opts.stripes) return;

            var stripes = chart.stripes || initStripes();
            var u = 0,
                v = width - 2 * gutter;

            var u_min = v,
                v_max = u;
            var base_color = opts.stripes.color || { h: 0.42, s: 1, l: 0.5 };
            var stripes_range = opts.stripes.range || Math.max(1, stripes_maxy - stripes_miny);

            for (var j = 0, jj = stripesy_shrinked.length - 1; j < jj; j++) {
                u = Math.max(0, Math.round( (stripesx_shrinked[j] - minx) * kx )),
                v = Math.min(width - 2 * gutter, Math.round( (stripesx_shrinked[j+1] - minx) * kx ));
                var value = (stripesy_shrinked[j] - stripes_miny) / stripes_range;

                u_min = Math.min(u, u_min);
                v_max = Math.max(v, v_max);

                for (u; u < v; u++) {
                    // value is the saturation of the color from 0 to 1, where 0 is white and
                    // 1 is full saturated.
                    var color = paper.raphael.hsl(
                        base_color.h * 100,
                        base_color.s * 100,
                        base_color.l * 100 + (100 - base_color.l * 100) * (1 - value)
                    );
                    stripes[u].attr({ stroke: color });
                }
            }

            // reset stripes which are not set yet...
            for (var i = u_min - 1; i >= 0; i--) {
                stripes[i].attr({ stroke: "#ffffff" });
            }

            for (var i = Math.max(v_max, u_min); i < (width - 2 * gutter); i++) {
                stripes[i].attr({ stroke: "#ffffff" });
            }

            return stripes;
        }