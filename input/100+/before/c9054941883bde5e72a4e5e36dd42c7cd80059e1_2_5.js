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
        }