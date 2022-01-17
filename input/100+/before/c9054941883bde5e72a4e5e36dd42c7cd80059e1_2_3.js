function(coordX, coordY, updateLines) {
            // find distance in pixels to move
            var distance = KhanUtil.getDistance(this.graph.scalePoint([coordX, coordY]), this.graph.scalePoint(this.coord));

            // 5ms per pixel seems good
            var time = distance * 5;

            var scaled = graph.scalePoint([coordX, coordY]);
            var end = { x: coordX, y: coordY };
            if (true) {
                var start = {
                    x: this.coord[0],
                    y: this.coord[1]
                };
                $(start).animate(end, {
                    duration: time,
                    easing: "linear",
                    step: function(now, fx) {
                        if (fx.prop === "x") {
                            movablePoint.coord[0] = now;
                        } else {
                            movablePoint.coord[1] = now;
                        }
                        movablePoint.setCoord(movablePoint.coord);
                    }
                });

            }
            if ($.isFunction(this.onMove)) {
                this.onMove(coordX, coordY);
            }
        }