function(options) {
        // The state object that gets returned
        var movablePoint = $.extend(true, {
            graph: KhanUtil.currentGraph,
            coord: [0, 0],
            snapX: 0,
            snapY: 0,
            highlight: false,
            dragging: false,
            visible: true,
            constraints: {
                fixed: false,
                constrainX: false,
                constrainY: false,
                fixedAngle: {},
                fixedDistance: {}
            },
            lineStarts: [],
            lineEnds: [],
            normalStyle: {
                fill: KhanUtil.ORANGE,
                stroke: KhanUtil.ORANGE
            },
            highlightStyle: {
                fill: KhanUtil.ORANGE,
                stroke: KhanUtil.ORANGE
            }
        }, options);

        // deprecated: don't use coordX/coordY; use coord[]
        if (options.coordX !== undefined) {
            movablePoint.coord[0] = options.coordX;
        }
        if (options.coordY !== undefined) {
            movablePoint.coord[1] = options.coordY;
        }

        var graph = movablePoint.graph;

        if (movablePoint.visible) {
            graph.style(movablePoint.normalStyle, function() {
                movablePoint.visibleShape = graph.ellipse([1, 1], [4 / graph.scale[0], 4 / graph.scale[1]]);
                movablePoint.visibleShape.attr({cx: 0, cy: 0});
            });
        }
        movablePoint.normalStyle.rx = 4;
        movablePoint.highlightStyle.rx = 8;
        movablePoint.normalStyle.ry = 4;
        movablePoint.highlightStyle.ry = 8;

        // Using the passed coordinates, apply any constraints and return the closest coordinates
        // that match the constraints.
        movablePoint.applyConstraint = function(coord, extraConstraints, override) {
            var newCoord = coord.slice();
            // use the configured constraints for the point plus any passed-in constraints; use only passed-in constraints if override is set
            var constraints = {};
            if (override) {
                $.extend(constraints, {
                    fixed: false,
                    constrainX: false,
                    constrainY: false,
                    fixedAngle: {},
                    fixedDistance: {}
                }, extraConstraints);
            } else {
                $.extend(constraints, this.constraints, extraConstraints);
            }

            // constrain to vertical movement
            if (constraints.constrainX) {
                newCoord = [this.coord[0], coord[1]];

            // constrain to horizontal movement
            } else if (constraints.constrainY) {
                newCoord = [coord[0], this.coord[1]];

            // both distance and angle are constrained
            } else if (typeof constraints.fixedAngle.angle === "number" && typeof constraints.fixedDistance.dist === "number") {
                var vertex = constraints.fixedAngle.vertex.coord || constraints.fixedAngle.vertex;
                var ref = constraints.fixedAngle.ref.coord || constraints.fixedAngle.ref;
                var distPoint = constraints.fixedDistance.point.coord || constraints.fixedDistance.point;

                var constrainedAngle = (constraints.fixedAngle.angle + KhanUtil.findAngle(ref, vertex)) * Math.PI / 180;
                var length = constraints.fixedDistance.dist;
                newCoord[0] = length * Math.cos(constrainedAngle) + distPoint[0];
                newCoord[1] = length * Math.sin(constrainedAngle) + distPoint[1];

            // angle is constrained
            } else if (typeof constraints.fixedAngle.angle === "number") {
                var vertex = constraints.fixedAngle.vertex.coord || constraints.fixedAngle.vertex;
                var ref = constraints.fixedAngle.ref.coord || constraints.fixedAngle.ref;

                // constrainedAngle is the angle from vertex to the point with reference to the screen
                var constrainedAngle = (constraints.fixedAngle.angle + KhanUtil.findAngle(ref, vertex)) * Math.PI / 180;
                // angle is the angle from vertex to the mouse with reference to the screen
                var angle = KhanUtil.findAngle(coord, vertex) * Math.PI / 180;
                var distance = KhanUtil.getDistance(coord, vertex);
                var length = distance * Math.cos(constrainedAngle - angle);
                length = length < 1.0 ? 1.0 : length;
                newCoord[0] = length * Math.cos(constrainedAngle) + vertex[0];
                newCoord[1] = length * Math.sin(constrainedAngle) + vertex[1];

            // distance is constrained
            } else if (typeof constraints.fixedDistance.dist === "number") {
                var distPoint = constraints.fixedDistance.point.coord || constraints.fixedDistance.point;

                var angle = KhanUtil.findAngle(coord, distPoint);
                var length = constraints.fixedDistance.dist;
                angle = angle * Math.PI / 180;
                newCoord[0] = length * Math.cos(angle) + distPoint[0];
                newCoord[1] = length * Math.sin(angle) + distPoint[1];

            // point is fixed
            } else if (constraints.fixed) {
                newCoord = movablePoint.coord;
            }
            return newCoord;
        };

        if (movablePoint.visible && !movablePoint.constraints.fixed) {
            // the invisible shape in front of the point that gets mouse events
            movablePoint.mouseTarget = graph.mouselayer.circle(graph.scalePoint(movablePoint.coord)[0], graph.scalePoint(movablePoint.coord)[1], 15);
            movablePoint.mouseTarget.attr({fill: "#000", "opacity": 0.0});

            $(movablePoint.mouseTarget[0]).css("cursor", "move");
            $(movablePoint.mouseTarget[0]).bind("vmousedown vmouseover vmouseout", function(event) {
                if (event.type === "vmouseover") {
                    movablePoint.highlight = true;
                    if (!KhanUtil.dragging) {
                        movablePoint.visibleShape.animate(movablePoint.highlightStyle, 50);
                    }

                } else if (event.type === "vmouseout") {
                    movablePoint.highlight = false;
                    if (!movablePoint.dragging) {
                        movablePoint.visibleShape.animate(movablePoint.normalStyle, 50);
                    }

                } else if (event.type === "vmousedown" && (event.which === 1 || event.which === 0)) {
                    event.preventDefault();

                    $(document).bind("vmousemove vmouseup", function(event) {
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
                    });
                }
            });
        }

        // Method to let the caller animate the point to a new position. Useful
        // as part of a hint to show the user the correct place to put the point.
        movablePoint.moveTo = function(coordX, coordY, updateLines) {
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
        };


        // After moving the point, call this to update all line segments terminating at the point
        movablePoint.updateLineEnds = function() {
            $(this.lineStarts).each(function() {
                this.coordA = movablePoint.coord;
                this.transform();
            });
            $(this.lineEnds).each(function() {
                this.coordZ = movablePoint.coord;
                this.transform();
            });
        };

        // Put the point at a new position without any checks, animation, or callbacks
        movablePoint.setCoord = function(coord) {
            this.coord = coord.slice();
            this.transform();
        };

        // Change z-order to back
        movablePoint.toBack = function() {
            if (this.visible) {
                this.mouseTarget.toBack();
                this.visibleShape.toBack();
            }
        };

        // Change z-order to front
        movablePoint.toFront = function() {
            if (this.visible) {
                this.mouseTarget.toFront();
                this.visibleShape.toFront();
            }
        };

        movablePoint.transform = function() {
            var scaledPoint = graph.scalePoint(this.coord);

            if (this.visible) {
                this.visibleShape.transform("T"+scaledPoint[0]+","+scaledPoint[1]);
            }
            if (!this.fixed && this.visible) {
                this.mouseTarget.attr({ cx: scaledPoint[0] });
                this.mouseTarget.attr({ cy: scaledPoint[1] });
            }
        }

        movablePoint.transform();

        return movablePoint;
    }