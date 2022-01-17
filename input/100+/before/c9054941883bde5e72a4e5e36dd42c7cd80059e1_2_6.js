function(options) {
        var lineSegment = $.extend({
            graph: KhanUtil.currentGraph,
            coordA: [0, 0],
            coordZ: [1, 1],
            snapX: 0,
            snapY: 0,
            fixed: false,
            ticks: 0,
            normalStyle: {
                "stroke": KhanUtil.BLUE,
                "stroke-width": 2
            },
            highlightStyle: {
                "stroke": KhanUtil.ORANGE,
                "stroke-width": 6
            },
            highlight: false,
            dragging: false,
            tick: [],
            extendLine: false,
            constraints: {
                fixed: false,
                constrainX: false,
                constrainY: false
            }
        }, options);

        // If the line segment is defined by movablePoints, coordA/coordZ are
        // owned by the points, otherwise they're owned by us
        if (options.pointA !== undefined) {
            lineSegment.coordA = options.pointA.coord;
            lineSegment.pointA.lineStarts.push(lineSegment);
        } else if (options.coordA !== undefined) {
            lineSegment.coordA = options.coordA.slice();
        }

        if (options.pointZ !== undefined) {
            lineSegment.coordZ = options.pointZ.coord;
            lineSegment.pointZ.lineEnds.push(lineSegment);
        } else if (options.coordA !== undefined) {
            lineSegment.coordA = lineSegment.coordA.slice();
        }

        var graph = lineSegment.graph;

        graph.style(lineSegment.normalStyle);
        for (var i = 0; i < lineSegment.ticks; ++i) {
            lineSegment.tick[i] = KhanUtil.bogusShape;
        }
        var tickpath = "";
        for (var i = 0; i < lineSegment.ticks; ++i) {
            var tickoffset = (0.5 * graph.scale[0]) + (2 * i - lineSegment.ticks + 1) * 3;
            tickpath += KhanUtil.svgPath([[tickoffset, -7], [tickoffset, 7]]);
        }
        lineSegment.tickLines = graph.raphael.path(tickpath);
        lineSegment.tickLines.attr(lineSegment.normalStyle);
        var path = KhanUtil.svgPath([[0, 0], [graph.scale[0], 0]]);
        lineSegment.visibleLine = graph.raphael.path(path);
        lineSegment.visibleLine.attr(lineSegment.normalStyle);
        if (!lineSegment.fixed) {
            lineSegment.mouseTarget = graph.mouselayer.rect(
                graph.scalePoint([graph.range[0][0], graph.range[1][1]])[0],
                graph.scalePoint([graph.range[0][0], graph.range[1][1]])[1] - 15,
                graph.scaleVector([1, 1])[0], 30
            );
            lineSegment.mouseTarget.attr({fill: "#000", "opacity": 0.0});
        }

        // Reposition the line segment. Call after changing coordA and/or
        // coordZ, or pass syncToPoints = true to use the current position of
        // the corresponding movablePoints, if the segment was defined using
        // movablePoints
        lineSegment.transform = function(syncToPoints) {
            if (syncToPoints) {
                if (typeof this.pointA === "object") {
                    this.coordA = this.pointA.coord;
                }
                if (typeof this.pointZ === "object") {
                    this.coordZ = this.pointZ.coord;
                }
            }
            var angle = KhanUtil.findAngle(this.coordZ, this.coordA);
            var scaledA = graph.scalePoint(this.coordA);
            var scaledZ = graph.scalePoint(this.coordZ);
            var lineLength = KhanUtil.getDistance(this.coordA, this.coordZ);
            if (this.extendLine) {
                if (this.coordA[0] !== this.coordZ[0]) {
                    var slope = (this.coordZ[1] - this.coordA[1]) / (this.coordZ[0] - this.coordA[0]);
                    var y1 = slope * (graph.range[0][0] - this.coordA[0]) + this.coordA[1];
                    var y2 = slope * (graph.range[0][1] - this.coordA[0]) + this.coordA[1];
                    if (this.coordA[0] < this.coordZ[0]) {
                        scaledA = graph.scalePoint([graph.range[0][0], y1]);
                        scaledZ = graph.scalePoint([graph.range[0][1], y2]);
                        scaledA[0]++;
                        scaledZ[0]--;
                    } else {
                        scaledA = graph.scalePoint([graph.range[0][1], y2]);
                        scaledZ = graph.scalePoint([graph.range[0][0], y1]);
                        scaledA[0]--;
                        scaledZ[0]++;
                    }
                    lineLength = KhanUtil.getDistance([graph.range[0][0], y1], [graph.range[0][1], y2]);
                } else {
                    if (this.coordA[1] < this.coordZ[1]) {
                        scaledA = graph.scalePoint([this.coordA[0], graph.range[1][0]]);
                        scaledZ = graph.scalePoint([this.coordA[0], graph.range[1][1]]);
                    } else {
                        scaledA = graph.scalePoint([this.coordA[0], graph.range[1][1]]);
                        scaledZ = graph.scalePoint([this.coordA[0], graph.range[1][0]]);
                    }
                    lineLength = graph.range[1][1] - graph.range[1][0];
                }
            }

            var center = [(scaledZ[0]+scaledA[0])/2, (scaledZ[1]+scaledA[1])/2];

            this.visibleLine.transform("T"+(center[0]-graph.scale[0]/2)+","+(center[1])+"R"+(-angle)+"S"+lineLength);
            this.tickLines.transform("T"+(center[0]-graph.scale[0]/2)+","+(center[1])+"R"+(-angle));

            if (!this.fixed) {
                this.mouseTarget.transform("T"+(center[0]-graph.scale[0]/2)+","+(center[1])+"R"+(-angle)+"S"+lineLength+","+1);
            }
        };

        // Change z-order to back;
        lineSegment.toBack = function() {
            if (!lineSegment.fixed) {
                lineSegment.mouseTarget.toBack();
            }
            lineSegment.visibleLine.toBack();
        };

        // Change z-order to front
        lineSegment.toFront = function() {
            if (!lineSegment.fixed) {
                lineSegment.mouseTarget.toFront();
            }
            lineSegment.visibleLine.toFront();
        };

        if (!lineSegment.fixed && !lineSegment.constraints.fixed) {
            $(lineSegment.mouseTarget[0]).css("cursor", "move");
            $(lineSegment.mouseTarget[0]).bind("vmousedown vmouseover vmouseout", function(event) {
                if (event.type === "vmouseover") {
                    if (!KhanUtil.dragging) {
                        lineSegment.highlight = true;
                        lineSegment.visibleLine.animate(lineSegment.highlightStyle, 50);
                    }

                } else if (event.type === "vmouseout") {
                    lineSegment.highlight = false;
                    if (!lineSegment.dragging) {
                        lineSegment.visibleLine.animate(lineSegment.normalStyle, 50);
                    }

                } else if (event.type === "vmousedown" && (event.which === 1 || event.which === 0)) {
                    event.preventDefault();
                    // coord{X|Y} are the scaled coordinate values of the mouse position
                    var coordX = (event.pageX - $(graph.raphael.canvas.parentNode).offset().left) / graph.scale[0] + graph.range[0][0];
                    var coordY = graph.range[1][1] - (event.pageY - $(graph.raphael.canvas.parentNode).offset().top) / graph.scale[1];
                    if (lineSegment.snapX > 0) {
                        coordX = Math.round(coordX / lineSegment.snapX) * lineSegment.snapX;
                    }
                    if (lineSegment.snapY > 0) {
                        coordY = Math.round(coordY / lineSegment.snapY) * lineSegment.snapY;
                    }
                    // Offsets between the mouse and each end of the line segment
                    var mouseOffsetA = [lineSegment.coordA[0] - coordX, lineSegment.coordA[1] - coordY];
                    var mouseOffsetZ = [lineSegment.coordZ[0] - coordX, lineSegment.coordZ[1] - coordY];

                    // Figure out how many pixels of the bounding box of the line segment lie to each direction of the mouse
                    var offsetLeft = -Math.min(graph.scaleVector(mouseOffsetA)[0], graph.scaleVector(mouseOffsetZ)[0]);
                    var offsetRight = Math.max(graph.scaleVector(mouseOffsetA)[0], graph.scaleVector(mouseOffsetZ)[0]);
                    var offsetTop = Math.max(graph.scaleVector(mouseOffsetA)[1], graph.scaleVector(mouseOffsetZ)[1]);
                    var offsetBottom = -Math.min(graph.scaleVector(mouseOffsetA)[1], graph.scaleVector(mouseOffsetZ)[1]);

                    $(document).bind("vmousemove vmouseup", function(event) {
                        event.preventDefault();
                        lineSegment.dragging = true;
                        KhanUtil.dragging = true;

                        // mouse{X|Y} are in pixels relative to the SVG
                        var mouseX = event.pageX - $(graph.raphael.canvas.parentNode).offset().left;
                        var mouseY = event.pageY - $(graph.raphael.canvas.parentNode).offset().top;
                        // no part of the line segment can go beyond 10 pixels from the edge
                        mouseX = Math.max(offsetLeft + 10, Math.min(graph.xpixels - 10 - offsetRight, mouseX));
                        mouseY = Math.max(offsetTop + 10, Math.min(graph.ypixels - 10 - offsetBottom, mouseY));

                        // coord{X|Y} are the scaled coordinate values
                        var coordX = mouseX / graph.scale[0] + graph.range[0][0];
                        var coordY = graph.range[1][1] - mouseY / graph.scale[1];
                        if (lineSegment.snapX > 0) {
                            coordX = Math.round(coordX / lineSegment.snapX) * lineSegment.snapX;
                        }
                        if (lineSegment.snapY > 0) {
                            coordY = Math.round(coordY / lineSegment.snapY) * lineSegment.snapY;
                        }

                        if (event.type === "vmousemove") {
                            if (lineSegment.constraints.constrainX) {
                                coordX = lineSegment.coordA[0] - mouseOffsetA[0];
                            }
                            if (lineSegment.constraints.constrainY) {
                                coordY = lineSegment.coordA[1] - mouseOffsetA[1];
                            }
                            var dX = coordX + mouseOffsetA[0] - lineSegment.coordA[0];
                            var dY = coordY + mouseOffsetA[1] - lineSegment.coordA[1];
                            lineSegment.coordA = [coordX + mouseOffsetA[0], coordY + mouseOffsetA[1]];
                            lineSegment.coordZ = [coordX + mouseOffsetZ[0], coordY + mouseOffsetZ[1]];
                            lineSegment.transform();
                            if ($.isFunction(lineSegment.onMove)) {
                                lineSegment.onMove(dX, dY);
                            }

                        } else if (event.type === "vmouseup") {
                            $(document).unbind("vmousemove vmouseup");
                            lineSegment.dragging = false;
                            KhanUtil.dragging = false;
                            if (!lineSegment.highlight) {
                                lineSegment.visibleLine.animate(lineSegment.normalStyle, 50);
                            }
                            if ($.isFunction(lineSegment.onMoveEnd)) {
                                lineSegment.onMoveEnd();
                            }

                        }
                    });
                }
            });
        }


        if (lineSegment.pointA !== undefined) {
            lineSegment.pointA.toFront();
        }
        if (lineSegment.pointZ !== undefined) {
            lineSegment.pointZ.toFront();
        }
        lineSegment.transform();
        return lineSegment;
    }