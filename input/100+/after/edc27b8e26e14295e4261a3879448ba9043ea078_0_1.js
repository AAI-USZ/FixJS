function newGenerator(prefix, type, dragStart, dragEnd, colorStops, container) {
        function formatUnit(value) {
            return parseFloat(value) + (LineUtils.getUnit(value) || "");
        }

        container = container || generateContainer(dragStart, dragEnd);

        var gradientPoints = LineUtils.gradientPoints(dragStart, dragEnd, container),
            stopCSS = colorStops.map(function(stop, index) {
                var prev = colorStops[index-1],
                    next = colorStops[index+1],
                    position = " " + Math.floor((gradientPoints.startOff + stop.position*gradientPoints.scale) * 1000)/10 + "%";
                if (prev && next) {
                    // Check to see if these are equally spaced and should have their values removed
                    var avgPos = prev.position + (next.position-prev.position)/2;
                    if (avgPos === stop.position) {
                        // We are on the same line, no need to display the position value
                        position = "";
                    }
                } else if ((!index && position === " 0%") || (!next && position === " 100%")) {
                    position = "";
                }
                return ColorStops.getColorValue(stop.color) + position;
            }).join(", "),

            angle = 360-LineUtils.radsToDegrees(LineUtils.slopeInRads(dragStart, dragEnd)),
            point = !LineUtils.isOnEdge(dragStart, container) ? formatUnit(dragStart.x) + " " + formatUnit(dragStart.y) : "";

        // Generate the position component if necessary
        var position = (angle !== 270 ? angle + "deg" : "");
        position = position + (position && ", ");

        if (type === "linear") {
            return (prefix ? '-' + prefix + '-' : '') + 'linear-gradient(' + position + stopCSS + ')';
        } else if (type === "radial") {
        }
    }