function(val, r) {
                    var d = me.barDimensions(series, s, r);
                    me.registerSeriesElement(c.paper.rect(d.x, d.y, d.w, d.h).attr({
                        'stroke': 'none',
                        'fill': me.getSeriesColor(series, r)
                    }), series);
                }