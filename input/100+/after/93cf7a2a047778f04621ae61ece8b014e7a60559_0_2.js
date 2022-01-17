function (event, pos, item) {
                if (item) {
                    if ( !arrays_equal(previousPoint, item.datapoint)) {
                        previousPoint = item.datapoint;

                        $(id('tooltip', graph)).remove();
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                        showTooltip(item.pageX, item.pageY,
                                    item.series.label + " = " + y);
                    }
                } else {
                    calc_distance = function(mark, event) {
                        mark_where = plot.pointOffset({ x: mark.xaxis.from, y: 0});
                        d = plot.offset().left + mark_where.left - event.pageX - plot.getPlotOffset().left;
                        return d*d;
                    }
                    distance = undefined;
                    winner = null;
                    for (marki in markings) {
                        mark = markings[marki];
                        dist = calc_distance(mark, pos);
                        if (distance == undefined || distance > dist) {
                            distance = dist;
                            winner = mark;
                        }
                    }
                    if (distance < 20) {
                        if (!arrays_equal(previousPoint,[winner])) {
                            previousPoint = [winner]
                            $(id('tooltip', graph)).remove();
                            showTooltip(pos.pageX-20, pos.pageY-20, winner.text);
                        }
                    } else {
                        if (previousPoint != null) {
                            previousPoint = null;
                            $(id('tooltip', graph)).remove();
                        }

                    }
                }
            }