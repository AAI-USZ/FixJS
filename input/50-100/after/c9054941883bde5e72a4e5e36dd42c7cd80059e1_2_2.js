function(coord) {
            if (this.visible) {
                var scaledPoint = graph.scalePoint(coord);
                this.visibleShape.attr({ cx: scaledPoint[0] });
                this.visibleShape.attr({ cy: scaledPoint[1] });
                this.mouseTarget.attr({ cx: scaledPoint[0] });
                this.mouseTarget.attr({ cy: scaledPoint[1] });
            }
            this.coord = coord.slice();
        }