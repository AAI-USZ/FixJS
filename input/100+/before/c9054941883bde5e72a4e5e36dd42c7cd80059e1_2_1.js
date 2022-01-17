function(event) {
                        event.preventDefault();
                        movablePoint.dragging = true;
                        KhanUtil.dragging = true;

                        // mouse{X|Y} are in pixels relative to the SVG
                        var mouseX = event.pageX - $(graph.raphael.canvas.parentNode).offset().left;
                        var mouseY = event.pageY - $(graph.raphael.canvas.parentNode).offset().top;
                        // can't go beyond 10 pixels from the edge
                        mouseX = Math.max(10, Math.min(graph.xpixels - 10, mouseX));
                        mouseY = Math.max(10, Math.min(graph.ypixels - 10, mouseY));

                        // snap to points around circle
                        if (movablePoint.constraints.fixedDistance.snapPoints) {

                            var snapRadians = 2 * Math.PI / movablePoint.constraints.fixedDistance.snapPoints;
                            var radius = movablePoint.constraints.fixedDistance.dist;

                            // get coordinates relative to the fixedDistance center
                            var centerCoord = graph.scalePoint(movablePoint.constraints.fixedDistance.point);
                            var centerX = centerCoord[0];
                            var centerY = centerCoord[1];

                            var mouseXrel = mouseX - centerX;
                            var mouseYrel = -mouseY + centerY;
                            var radians = Math.atan(mouseYrel / mouseXrel);

                            // adjust so that angles increase from 0 to 2 pi as you go around the circle
                            if (mouseXrel < 0) {
                                radians += Math.PI;
                            }

                            // perform the snap
                            radians = Math.round(radians / snapRadians) * snapRadians;

                            // convert from radians back to pixels
                            mouseXrel = radius * Math.cos(radians);
                            mouseYrel = radius * Math.sin(radians);
                            // convert back to coordinates relative to graphie canvas
                            mouseX = mouseXrel + centerX;
                            mouseY = - mouseYrel + centerY;
                        }

                        // coord{X|Y} are the scaled coordinate values
                        var coords = graph.unscalePoint([mouseX, mouseY]);
                        var coordX = coords[0];
                        var coordY = coords[1];

                        // snap coordinates to grid
                        if (movablePoint.snapX !== 0) {
                            coordX = Math.round(coordX / movablePoint.snapX) * movablePoint.snapX;
                        }
                        if (movablePoint.snapY !== 0) {
                            coordY = Math.round(coordY / movablePoint.snapY) * movablePoint.snapY;
                        }

                        // apply any constraints on movement
                        var coord = movablePoint.applyConstraint([coordX, coordY]);
                        coordX = coord[0];
                        coordY = coord[1];

                        if (event.type === "vmousemove") {
                            var doMove = true;
                            // The caller has the option of adding an onMove() method to the
                            // movablePoint object we return as a sort of event handler
                            // By returning false from onMove(), the move can be vetoed,
                            // providing custom constraints on where the point can be moved.
                            // By returning array [x, y], the move can be overridden
                            if ($.isFunction(movablePoint.onMove)) {
                                var result = movablePoint.onMove(coordX, coordY);
                                if (result === false) {
                                    doMove = false;
                                }
                                if ($.isArray(result)) {
                                    coordX = result[0];
                                    coordY = result[1];
                                }
                            }

                            if (doMove) {
                                movablePoint.setCoord([coordX, coordY]);
                                movablePoint.updateLineEnds();
                            }
                        } else if (event.type === "vmouseup") {
                            $(document).unbind("vmousemove vmouseup");
                            movablePoint.dragging = false;
                            KhanUtil.dragging = false;
                            if ($.isFunction(movablePoint.onMoveEnd)) {
                                var result = movablePoint.onMoveEnd(coordX, coordY);
                                if ($.isArray(result)) {
                                    movablePoint.setCoord(result);
                                }
                            }
                            // FIXME: check is commented out since firefox isn't always sending mouseout for some reason
                            //if (!movablePoint.highlight) {
                                movablePoint.visibleShape.animate(movablePoint.normalStyle, 50);
                            //}
                        }
                    }