function Protractor(center) {
    var graph = KhanUtil.currentGraph;
    this.set = graph.raphael.set();

    this.cx = center[0];
    this.cy = center[1];
    var lineColor = "#789";
    var pro = this;

    var r = 8.05;
    var imgPos = graph.scalePoint([this.cx - r, this.cy + r - 0.225]);
    this.set.push(graph.mouselayer.image(Khan.urlBase + "images/protractor.png", imgPos[0], imgPos[1], 322, 161));


    // Customized polar coordinate thingie to make it easier to draw the double-headed arrow thing.
    // angle is what you'd expect -- use that big protractor on your screen :)
    // pixels from edge is relative to the edge of the protractor; it's not the full radius
    var arrowHelper = function(angle, pixelsFromEdge) {
        var scaledRadius = graph.scaleVector(r);
        var scaledCenter = graph.scalePoint(center);
        var x = Math.sin((angle + 90) * Math.PI / 180) * (scaledRadius[0] + pixelsFromEdge) + scaledCenter[0];
        var y = Math.cos((angle + 90) * Math.PI / 180) * (scaledRadius[1] + pixelsFromEdge) + scaledCenter[1];
        return x + "," + y;
    };

    // Draw the double-headed arrow thing that shows users where to click and drag to rotate
    var arrow = graph.raphael.path(
        " M" + arrowHelper(180, 6) +
        " L" + arrowHelper(180, 2) +
        " L" + arrowHelper(183, 10) +
        " L" + arrowHelper(180, 18) +
        " L" + arrowHelper(180, 14) +
        " A" + (graph.scaleVector(r)[0] + 10) + "," + (graph.scaleVector(r)[1] + 10) + ",0,0,1," + arrowHelper(170, 14) +
        " L" + arrowHelper(170, 18) +
        " L" + arrowHelper(167, 10) +
        " L" + arrowHelper(170, 2) +
        " L" + arrowHelper(170, 6) +
        " A" + (graph.scaleVector(r)[0] + 10) + "," + (graph.scaleVector(r)[1] + 10) + ",0,0,0," + arrowHelper(180, 6) +
        " Z"
    ).attr({
        "stroke": null,
        "fill": KhanUtil.ORANGE
    });

    // add it to the set so it translates with everything else
    this.set.push(arrow);

    this.centerPoint = KhanUtil.addMovablePoint({
        coord: center,
        visible: false
    });

    // Use a movablePoint for rotation
    this.rotateHandle = KhanUtil.addMovablePoint({
        coord: [
            Math.sin(275 * Math.PI / 180) * (r + 0.5) + this.cx,
            Math.cos(275 * Math.PI / 180) * (r + 0.5) + this.cy
        ],
        onMove: function(x, y) {
            var angle = Math.atan2(pro.centerPoint.coord[1] - y, pro.centerPoint.coord[0] - x) * 180 / Math.PI;
            pro.rotate(-angle - 5, true);
        }
    });

    // Add a constraint so the point moves in a circle
    this.rotateHandle.constraints.fixedDistance.dist = r + 0.5;
    this.rotateHandle.constraints.fixedDistance.point = this.centerPoint;

    // Remove the default dot added by the movablePoint since we have our double-arrow thing
    this.rotateHandle.visibleShape.remove();
    // Make the mouse target bigger to encompass the whole area around the double-arrow thing
    this.rotateHandle.mouseTarget.attr({ scale: 2.0 });

    // Make the arrow-thing grow and shrink with mouseover/out
    $(this.rotateHandle.mouseTarget[0]).bind("vmouseover", function(event) {
        arrow.animate({ scale: 1.5 }, 50);
    });
    $(this.rotateHandle.mouseTarget[0]).bind("vmouseout", function(event) {
        arrow.animate({ scale: 1.0 }, 50);
    });


    var setNodes = $.map(this.set, function(el) { return el.node; });
    this.makeTranslatable = function makeTranslatable() {
        $(setNodes).css("cursor", "move");

        $(setNodes).bind("vmousedown", function(event) {
            event.preventDefault();
            var startx = event.pageX - $(graph.raphael.canvas.parentNode).offset().left;
            var starty = event.pageY - $(graph.raphael.canvas.parentNode).offset().top;

            $(document).bind("vmousemove", function(event) {
                // mouse{X|Y} are in pixels relative to the SVG
                var mouseX = event.pageX - $(graph.raphael.canvas.parentNode).offset().left;
                var mouseY = event.pageY - $(graph.raphael.canvas.parentNode).offset().top;
                // can't go beyond 10 pixels from the edge
                mouseX = Math.max(10, Math.min(graph.xpixels - 10, mouseX));
                mouseY = Math.max(10, Math.min(graph.ypixels - 10, mouseY));

                var dx = mouseX - startx;
                var dy = mouseY - starty;

                $.each(pro.set.items, function() {
                    this.translate(dx, dy);
                });
                pro.centerPoint.setCoord([pro.centerPoint.coord[0] + dx / graph.scale[0], pro.centerPoint.coord[1] - dy / graph.scale[1]]);
                pro.rotateHandle.setCoord([pro.rotateHandle.coord[0] + dx / graph.scale[0], pro.rotateHandle.coord[1] - dy / graph.scale[1]]);
                startx = mouseX;
                starty = mouseY;
            });

            $(document).one("vmouseup", function(event) {
                $(document).unbind("vmousemove");
            });
        });
    };


    this.rotation = 0;

    this.rotate = function(offset, absolute) {
        var center = graph.scalePoint(this.centerPoint.coord);

        if (absolute) {
            this.rotation = 0;
        }

        this.set.rotate(this.rotation + offset, center[0], center[1]);
        this.rotation = this.rotation + offset;

        return this;
    };

    this.moveTo = function moveTo(x, y) {
        var graph = KhanUtil.currentGraph;
        var start = graph.scalePoint(pro.centerPoint.coord);
        var end = graph.scalePoint([x, y]);
        var time = KhanUtil.getDistance(start, end) * 2;  // 2ms per pixel

        $({ x: start[0], y: start[1] }).animate({ x: end[0], y: end[1] }, {
            duration: time,
            step: function(now, fx) {
                var dx = 0;
                var dy = 0;
                if (fx.prop === "x") {
                    dx = now - graph.scalePoint(pro.centerPoint.coord)[0];
                } else if (fx.prop === "y") {
                    dy = now - graph.scalePoint(pro.centerPoint.coord)[1];
                }
                $.each(pro.set.items, function() {
                    this.translate(dx, dy);
                });
                pro.centerPoint.setCoord([pro.centerPoint.coord[0] + dx / graph.scale[0], pro.centerPoint.coord[1] - dy / graph.scale[1]]);
                pro.rotateHandle.setCoord([pro.rotateHandle.coord[0] + dx / graph.scale[0], pro.rotateHandle.coord[1] - dy / graph.scale[1]]);
            }
        });
    };

    this.rotateTo = function rotateTo(angle) {
        if (Math.abs(this.rotation - angle) > 180) {
            this.rotation += 360;
        }
        var time = Math.abs(this.rotation - angle) * 5;  // 5ms per deg
        $({ 0: this.rotation }).animate({ 0: angle }, {
            duration: time,
            step: function(now, fx) {
                pro.rotate(now, true);
                pro.rotateHandle.setCoord([
                    Math.sin((now + 275) * Math.PI / 180) * (r + 0.5) + pro.centerPoint.coord[0],
                    Math.cos((now + 275) * Math.PI / 180) * (r + 0.5) + pro.centerPoint.coord[1]
                ]);
            }
        });
    };

    this.set.attr({ opacity: 0.5 });
    this.makeTranslatable();
    return this;
}