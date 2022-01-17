function(now, fx) {
                        movablePoint.visibleShape.attr(fx.prop, now);
                        movablePoint.mouseTarget.attr(fx.prop, now);
                        if (fx.prop === "cx") {
                            movablePoint.coord[0] = now / graph.scale[0] + graph.range[0][0];
                        } else {
                            movablePoint.coord[1] = graph.range[1][1] - now / graph.scale[1];
                        }
                        movablePoint.updateLineEnds();
                    }