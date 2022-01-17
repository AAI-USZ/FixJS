function(options) {
            var line = $.extend(true, {
                start: [0, 0],
                extend: false,
                clickable: false,
                state: 0,
                maxState: 1,
                tickDiff: 0.15,
                tickLength: 0.2
            }, options);

            // look up the start and end points, if they are
            // given as strings
            if (typeof line.start === "string") {
                line.startPt = congruency.points[line.start];
                line.start = line.startPt.pos;
            }
            if (typeof line.end === "string") {
                line.endPt = congruency.points[line.end];
                line.end = line.endPt.pos;
            }

            // check how the line is defined, and calculate the other
            // variables based on those
            if (line.end != null) {
                line.radAngle = Math.atan2(line.end[1] - line.start[1],
                                           line.end[0] - line.start[0]);
                line.angle = KhanUtil.toDegrees(line.radAngle);
            } else if (line.angle != null) {
                line.radAngle = KhanUtil.toRadians(line.angle);
                line.end = [Math.cos(line.radAngle) + line.start[0],
                            Math.sin(line.radAngle) + line.start[1]];
            }

            // calculate and bound the slope;
            line.slope = (line.end[1] - line.start[1]) /
                         (line.end[0] - line.start[0]);
            line.slope = Math.max(-999999, Math.min(999999, line.slope));

            // a function which represents the line
            line.func = function(x) {
                return line.start[1] + line.slope * (x - line.start[0]);
            };

            // the inverse function of the line
            line.invfunc = function(y) {
                var slope = (line.slope === 0) ? 0.00001 : line.slope
                return line.start[0] + (y - line.start[1]) / slope;
            };

            // extend the line if specified
            if (line.extend) {
                // check which orientation the points are currently in
                var order = (line.start[0] < line.end[0]);

                // the new 'left' and 'right' points
                var left, right;

                // check to see where the 'left' side of
                // the line intersects
                var y1int = line.func(congruency.x1);

                if (y1int >= congruency.y1 && y1int <= congruency.y2) {
                    left = [congruency.x1, y1int];
                } else if (y1int > congruency.y2) {
                    left = [line.invfunc(congruency.y2), congruency.y2];
                } else {
                    left = [line.invfunc(congruency.y1), congruency.y1];
                }

                // check to see where the 'right' side of
                // the line intersects
                var y2int = line.func(congruency.x2);

                if (y2int >= congruency.y1 && y2int <= congruency.y2) {
                    right = [congruency.x2, y2int];
                } else if (y2int > congruency.y2) {
                    right = [line.invfunc(congruency.y2), congruency.y2];
                } else {
                    right = [line.invfunc(congruency.y1), congruency.y1];
                }

                // re-store the points in the correct positions
                if (order) {
                    line.start = left;
                    line.end = right;
                } else {
                    line.end = left;
                    line.start = right;
                }
            }

            // do placeAtStart and placeAtEnd
            if (line.placeAtStart != null) {
                line.startPt = congruency.addPoint(line.placeAtStart,
                                                   line.start);
            }
            if (line.placeAtEnd != null) {
                line.endPt = congruency.addPoint(line.placeAtEnd, line.end);
            }

            // if startPt and endPt exist (i.e. they are both named
            // points) add the name of our line to the congruency
            if (line.startPt != null &&
                line.endPt != null) {
                congruency.lines[line.startPt.name + line.endPt.name] = line;
                congruency.lines[line.endPt.name + line.startPt.name] = line;
            }

            // if the points are named, add the other end of the line
            // to the connected points, so they can calculate what angles
            // they create
            if (line.startPt != null && line.endPt != null) {
                line.startPt.connected.push(line.endPt);
                line.endPt.connected.push(line.startPt);
            }

            // actually draw the line with the current styles
            line.draw = function() {
                if (this.line != null) {
                    this.line.remove();
                }

                // create a set
                this.line = graph.raphael.set();

                // do a bunch of tick calculations
                var startDiff = this.tickDiff * (this.state - 1) / 2;

                var direction = [Math.cos(this.radAngle), Math.sin(this.radAngle)];
                var normalDir = [-direction[1] * this.tickLength,
                                  direction[0] * this.tickLength];

                var midpoint = [(this.start[0] + this.end[0]) / 2,
                                (this.start[1] + this.end[1]) / 2];

                var startPos = [midpoint[0] - startDiff * direction[0],
                                midpoint[1] - startDiff * direction[1]];

                // add each of the ticks
                for (var curr = 0; curr < this.state; curr += 1) {
                    var currPos = [startPos[0] + curr * direction[0] * this.tickDiff,
                                   startPos[1] + curr * direction[1] * this.tickDiff];
                    var start = [currPos[0] + normalDir[0],
                                 currPos[1] + normalDir[1]];
                    var end = [currPos[0] - normalDir[0],
                               currPos[1] - normalDir[1]];

                    this.line.push(graph.line(start, end));
                }

                // add our line
                this.line.push(graph.line(this.start, this.end));

                // set the attributes
                this.line.attr(this.normal);
                this.point.visibleShape = this.line;
            };

            // calculate our midpoint, for where the clickable
            // point should go
            var pointPos = [(line.start[0] + line.end[0]) / 2,
                            (line.start[1] + line.end[1]) / 2];

            // add a movable point
            line.point = KhanUtil.addMovablePoint({
                coord: pointPos
            });
            // Make it not move
            line.point.onMove = function(x, y) {
                return false;
            };

            // make the mouse target pretty big
            line.point.mouseTarget.attr({ r: graph.scale[0] * 0.7 });

            // remove the original visible shape
            line.point.visibleShape.remove();

            // the original styles
            line.normal = {
                stroke: "black",
                "stroke-width": 2
            };
            line.highlight = {
                stroke: "black",
                "stroke-width": 3
            };

            // store them in the movable points
            line.point.normalStyle = line.normal;
            line.point.highlightStyle = line.highlight;

            // functions to change the styling of the line
            line.highlightStyle = function(options) {
                $.extend(true, this.highlight, options);
                this.draw();
            };
            line.normalStyle = function(options) {
                $.extend(true, this.normal, options);
                this.draw();
            };

            // draw the line
            line.draw();

            // function to change the current state
            line.setState = function(state) {
                this.state = state;

                this.draw();
            };

            // make the clickable point change the state
            $(line.point.mouseTarget[0]).bind("vmouseup", function(event) {
                line.setState((line.state === line.maxState) ? 0 : line.state + 1);
            });

            // make the line stick in the state it is in currently,
            // and remove the clickable part
            line.stick = function() {
                line.point.mouseTarget.remove();
            };

            // if we shouldn't be clickable, stick right now
            if (!line.clickable) {
                line.stick();
            }

            return line;
        }