function() {
            var context = this.getContext();
            var lastPos = {};
            context.beginPath();

            context.moveTo(this.attrs.points[0].x, this.attrs.points[0].y);

            for(var n = 1; n < this.attrs.points.length; n++) {
                var x = this.attrs.points[n].x;
                var y = this.attrs.points[n].y;
                if(this.attrs.dashArray.length > 0) {
                    // draw dashed line
                    var lastX = this.attrs.points[n - 1].x;
                    var lastY = this.attrs.points[n - 1].y;
                    this._dashedLine(lastX, lastY, x, y, this.attrs.dashArray);
                }
                else {
                    // draw normal line
                    context.lineTo(x, y);
                }
            }

            if(!!this.attrs.lineCap) {
                context.lineCap = this.attrs.lineCap;
            }

            this.stroke();
        }