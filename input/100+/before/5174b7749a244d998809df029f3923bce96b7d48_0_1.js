function createStripes() {
            if (!opts.stripes) return;

            var stripes = chart.stripes || initStripes();
            var u = 0,
                v = width - 2 * gutter;

            var u_min = 9999,
                v_max = 0;
            var base_color = opts.stripes.color || { h: 0.42, s: 1, l: 0.5 };

            for (var j = 0, jj = stripesx_shrinked.length - 1; j < jj; j++) {
                u = Math.max(0, Math.round( (stripesx_shrinked[j] - minx) * kx )),
                v = Math.min(width - 2 * gutter, Math.round( (stripesx_shrinked[j+1] - minx) * kx ));
                var value = (stripesy_shrinked[j] - stripes_miny) / (stripes_maxy - stripes_miny);

                u_min = Math.min(u, u_min);
                v_max = Math.max(v, v_max);
                //console.log(u + " - " + v);
                for (u; u < v; u++) {
                    // value is the saturation of the color from 0 to 1, where 0 is white and
                    // 1 is full saturated.
                    var color = paper.raphael.hsl(
                        base_color.h * 100,
                        base_color.s * 100,
                        base_color.l * 100 + (100 - base_color.l * 100) * value
                    );
                    stripes[u].attr({ stroke: color });
                }
            }

            // reset stripes which are not set yet...
            for (u_min; u_min > 0; --u_min) {
                stripes[u_min].attr({ stroke: "#ffffff" });
            }

            for (v_max; v_max < (width - 2 * gutter); v_max++) {
                stripes[v_max].attr({ stroke: "#ffffff" });
            }

            return stripes;
        }