function(coordX, coordY, updateLines) {
            // find distance in pixels to move
            var distance = KhanUtil.getDistance(this.graph.scalePoint([coordX, coordY]), this.graph.scalePoint(this.coord));

            // 5ms per pixel seems good
            var time = distance * 5;

            var scaled = graph.scalePoint([coordX, coordY]);
            var end = { cx: scaled[0], cy: scaled[1] };
            if (updateLines) {
                var start = {
                    cx: this.visibleShape.attr("cx"),
                    cy: this.visibleShape.attr("cy")
                };
                $(start).animate(end, {
                    duration: time,
                    easing: "linear",
                    step: function(now, fx) {
                        movablePoint.visibleShape.attr(fx.prop, now);
                        movablePoint.mouseTarget.attr(fx.prop, now);
                        if (fx.prop === "cx") {
                            movablePoint.coord[0] = now / graph.scale[0] + graph.range[0][0];
                        } else {
                            movablePoint.coord[1] = graph.range[1][1] - now / graph.scale[1];
                        }
                        movablePoint.updateLineEnds();
                    }
                });

            } else {
                this.visibleShape.animate(end, time);
                this.mouseTarget.animate(end, time);
            }
            this.coord = [coordX, coordY];
            if ($.isFunction(this.onMove)) {
                this.onMove(coordX, coordY);
            }
        }