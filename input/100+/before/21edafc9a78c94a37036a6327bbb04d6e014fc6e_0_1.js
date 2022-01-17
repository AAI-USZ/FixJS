function(from, to, reset_y_axis) {
            var max_len = 0;

            for (i = 0, ii = valuesy.length; i < ii; i++) {
                if (from[i] == -1 || to[i] == -1) {
                  valuesx_shrinked[i] = [];
                  valuesy_shrinked[i] = [];
                  continue;
                }

                valuesy_shrinked[i] = shrink(valuesy[i].slice(from[i], to[i]+1), width - 2 * gutter);
                len = valuesy_shrinked.lenght;

                if (valuesx[i]) {
                    valuesx_shrinked[i] = shrink(valuesx[i].slice(from[i], to[i]+1), width - 2 * gutter);
                    if (max_len < valuesx_shrinked[i].length) max_len = valuesx_shrinked[i].length;
                }

                if (opts.stripes) {
                    stripesy_shrinked[i] = shrink(stripesy[primary].slice(from[primary], to[primary]+1), width - 2 * gutter);
                }
            }

            allx = Array.prototype.concat.apply([], valuesx_shrinked);
            xdim = chartinst.snapEnds(Math.min.apply(Math, allx), Math.max.apply(Math, allx), max_len - 1);
            minx = xdim.from;
            maxx = xdim.to;
            kx = (width - gutter * 2) / ((maxx - minx) || 1);

            if (reset_y_axis) {
              ally = Array.prototype.concat.apply([], valuesy),
              ydim = chartinst.snapEnds(Math.min.apply(Math, ally), Math.max.apply(Math, ally), max_len - 1),
              miny = ydim.from,
              maxy = ydim.to,
              ky = (height - gutter * 2) / ((maxy - miny) || 1),
              stripes_miny = Math.min.apply(Math, stripesy[primary]),
              stripes_maxy = Math.max.apply(Math, stripesy[primary]);
            }

            var res = createLines();
            lines = res.lines,
            symbols = res.symbols;

            chart.lines.remove();
            chart.lines = lines;

            chart.symbols.remove();
            chart.symbols = symbols;

            chart.axis.remove();
            chart.axis = createAxis();

            chart.stripes = createStripes();
        }