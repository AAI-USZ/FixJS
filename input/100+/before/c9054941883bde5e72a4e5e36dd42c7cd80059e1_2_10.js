function Protractor(center) {
    var graph = KhanUtil.currentGraph;
    this.set = graph.raphael.set();

    var lineColor = "#789";
    var pro = this;

    var r = 8.05;
    var imgPos = graph.scalePoint([-r, r - 0.225]);
    var protractorImg = graph.mouselayer.image(Khan.urlBase + "images/protractor.png", -161, -156, 322, 161);
    this.set.push(protractorImg);

    // Customized polar coordinate thingie to make it easier to draw the double-headed arrow thing.
    // angle is what you'd expect -- use that big protractor on your screen :)
    // pixels from edge is relative to the edge of the protractor; it's not the full radius
    var arrowHelper = function(angle, pixelsFromEdge) {
        var scaledRadius = graph.scaleVector(r);
        var scaledCenter = [0, 0]; //graph.scalePoint(center);
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
            Math.sin(275 * Math.PI / 180) * (r + 0.5) + center[0],
            Math.cos(275 * Math.PI / 180) * (r + 0.5) + center[1]
        ],
        onMove: function(x, y) {
            var angle = Math.atan2(pro.center[1] - y, pro.center[0] - x) * 180 / Math.PI;
            pro.rotate(-angle - 5);
        }
    });

    // Add a constraint so the point moves in a circle
    this.rotateHandle.constraints.fixedDistance.dist = r + 0.5;
    this.rotateHandle.constraints.fixedDistance.point = this.centerPoint;

    // Remove the default dot added by the movablePoint since we have our double-arrow thing
    this.rotateHandle.visibleShape.remove();
    // Make the mouse target bigger to encompass the whole area around the double-arrow thing
    this.rotateHandle.mouseTarget.attr({ scale: 2.0 });

    // Set the initial arrow size
    this.arrowscale = 1.0;

    // Make the arrow-thing grow and shrink with mouseover/out
    $(this.rotateHandle.mouseTarget[0]).bind("vmouseover", function(event) {
        pro.arrowscale = 1.5;
        arrow.animate({ transform: pro.transformString()+"S1.5" }, 50);
    });
    $(this.rotateHandle.mouseTarget[0]).bind("vmouseout", function(event) {
        pro.arrowscale = 1.0;
        arrow.animate({ transform: pro.transformString()+"S1.0" }, 50);
    });

    // Add the translation callbacks to the protractor
    this.makeTranslatable = function makeTranslatable() {
        // add the "move" cursor
        $(protractorImg.node).css("cursor", "move");

        $(protractorImg.node).bind("vmousedown", function(event) {
            event.preventDefault();

            // on mousedown, calculate the initial offset from the mouse position to the protractor center
            var startpt = graph.unscalePoint([event.pageX - $(graph.raphael.canvas.parentNode).offset().left,
                                              event.pageY - $(graph.raphael.canvas.parentNode).offset().top]);
            var offsetvec = [pro.center[0] - startpt[0], pro.center[1] - startpt[1]];

            $(document).bind("vmousemove", function(event) {
                // when moved, calculate the new offset as mousepos + offset, and move there
                var mousept = graph.unscalePoint([event.pageX - $(graph.raphael.canvas.parentNode).offset().left,
                                                  event.pageY - $(graph.raphael.canvas.parentNode).offset().top]);

                pro.move([mousept[0] + offsetvec[0], mousept[1] + offsetvec[1]]);
            });

            $(document).one("vmouseup", function(event) {
                $(document).unbind("vmousemove");
            });
        });
    };

    // set the initial rotation
    this.rotation = 0;

    // on rotate, simply set the rotate and transform
    this.rotate = function(angle) {
        this.rotation = angle;
        this.transform();
    };

    // set the initial center position
    this.center = center;

    // on move, set the center and transform
    this.move = function(position) {
        this.center = position;
        this.transform();
    }

    // return the string which is passed to transform, so that things can be appended to it
    this.transformString = function() {
        var center = graph.scalePoint(this.center);
        return "T"+center[0]+","+center[1]+"R"+(this.rotation)+","+center[0]+","+center[1];
    }

    // transform the protractor to make up for any scale/rotation/position changes
    this.transform = function() {
        // stop any current animations
        this.set.stop();
        arrow.stop();
        // transform the entire thing, and apply an additional scale to the arrow
        this.set.transform(this.transformString());
        arrow.transform("...S"+this.arrowscale);
        // manually position the center point and the handle point
        this.centerPoint.setCoord(this.center);
        this.rotateHandle.setCoord([Math.sin((this.rotation - 85) * Math.PI / 180) * (r + 0.5) + this.center[0],
                                    Math.cos((this.rotation - 85)* Math.PI / 180) * (r + 0.5) + this.center[1]]);
    }

    // move the point to the center, to ensure everything gets set up right
    this.move(center);

    // animate the protractor moving to a position
    this.moveTo = function moveTo(x, y) {
        var start = pro.centerPoint.coord;
        var end = [x, y];
        var time = KhanUtil.getDistance(start, end) * 30;  // 2ms per pixel

        $({ x: start[0], y: start[1] }).animate({ x: x, y: y }, {
            duration: time,
            step: function(now, fx) {
                // change the appropriate coordinate using .move
                if (fx.prop === "x") {
                    pro.move([now, pro.center[1]]);
                } else {
                    pro.move([pro.center[0], now]);
                }
            }
        });
    };

    // animate the protractor rotating to an angle
    this.rotateTo = function rotateTo(angle) {
        // make sure it doesn't rotate the wrong way
        if (Math.abs(this.rotation - angle) > 180) {
            this.rotation += 360;
        }
        var time = Math.abs(this.rotation - angle) * 5;  // 5ms per deg
        $({ 0: this.rotation }).animate({ 0: angle }, {
            duration: time,
            step: function(now, fx) {
                // rotate using .rotate
                pro.rotate(now);
            }
        });
    };

    // make the protractor opaque
    this.set.attr({ opacity: 0.5 });
    // make translatable
    this.makeTranslatable();
    return this;
}