function(syncToPoints) {
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
            var lineLength = KhanUtil.getDistance(this.coordA, this.coordZ);
            if (this.extendLine) {
                if (this.coordA[0] !== this.coordZ[0]) {
                    var slope = (this.coordZ[1] - this.coordA[1]) / (this.coordZ[0] - this.coordA[0]);
                    var y1 = slope * (graph.range[0][0] - this.coordA[0]) + this.coordA[1];
                    var y2 = slope * (graph.range[0][1] - this.coordA[0]) + this.coordA[1];
                    if (this.coordA[0] < this.coordZ[0]) {
                        scaledA = graph.scalePoint([graph.range[0][0], y1]);
                        scaledA[0]++;
                    } else {
                        scaledA = graph.scalePoint([graph.range[0][1], y2]);
                        scaledA[0]--;
                    }
                    lineLength = KhanUtil.getDistance([graph.range[0][0], y1], [graph.range[0][1], y2]);
                } else {
                    if (this.coordA[1] < this.coordZ[1]) {
                        scaledA = graph.scalePoint([this.coordA[0], graph.range[1][0]]);
                    } else {
                        scaledA = graph.scalePoint([this.coordA[0], graph.range[1][1]]);
                    }
                    lineLength = graph.range[1][1] - graph.range[1][0];
                }
            }
            this.visibleLine.translate(scaledA[0] - this.visibleLine.attr("translation").x,
                    scaledA[1] - this.visibleLine.attr("translation").y);
            this.visibleLine.rotate(-angle, scaledA[0], scaledA[1]);
            this.visibleLine.scale(lineLength, 1, scaledA[0], scaledA[1]);

            if (!this.fixed) {
                this.mouseTarget.translate(scaledA[0] - this.mouseTarget.attr("translation").x,
                        scaledA[1] - this.mouseTarget.attr("translation").y);
                this.mouseTarget.rotate(-angle, scaledA[0], scaledA[1]);
                this.mouseTarget.scale(lineLength, 1, scaledA[0], scaledA[1]);
            }
        }