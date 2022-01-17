function()
        {
            var shapes = Y.all(SHAPE),
                ellipses = Y.all(ELLIPSE),
                shape = shapes.shift(),
                ellipse = ellipses.shift(),
                fillColor = "#9aa",
                strokeColor = "#000",
                strokeWeight = 2,
                fillOpacity = 1,
                strokeOpacity = 1,
                node = Y.ShapeNode.one(shape),
                fill = node.getFill(),
                stroke = node.getStroke();

            fillColor = toRGBA(TOHEX(fillColor), fillOpacity);
            strokeColor = toRGBA(TOHEX(strokeColor), strokeOpacity);
            Y.Assert.areEqual(shape, ellipse, "Both instances should be the same shape.");
            Y.Assert.areEqual(fillColor, fill.color, "The fill color should be " + fillColor + ".");
            Y.Assert.areEqual(strokeColor, stroke.color, "The stroke color should be " + strokeColor + ".");
            Y.Assert.areEqual(strokeWeight, stroke.weight, "The stroke weight should be " + strokeWeight + ".");
        }