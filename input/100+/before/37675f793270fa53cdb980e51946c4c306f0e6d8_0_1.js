function(geometry, style, featureId) {
        var pt = this.getLocalXY(geometry);
        //
        // avoid expensive floating poit sub-pixel rendering
        // http://www.html5rocks.com/en/tutorials/canvas/performance/#toc-avoid-float
        //
        var p0 = (0.5 + pt[0]) | 0;
        var p1 = (0.5 + pt[1]) | 0;
        if(!isNaN(p0) && !isNaN(p1)) {
            // Set the style properties.
            this.canvas.fillStyle   = '#169C19';
            this.canvas.strokeStyle = '#3F6C3F';
            this.canvas.lineWidth   = 1;

            //this.canvas.beginPath();
            // Start from the top-left point.s

//            var width=15, height=5;
//
//            this.canvas.moveTo(p0, p1); // give the (x,y) coordinates
//            this.canvas.lineTo(p0+height, p1+height);
//            this.canvas.lineTo(p0+width, p1+height);
//            this.canvas.lineTo(p0+width, p1-height);
//            this.canvas.lineTo(p0+height, p1-height);
//            this.canvas.lineTo(p0, p1);
//
//            // Done! Now fill the shape, and draw the stroke.
//            // Note: your shape will not be visible until you call any of the two methods.
//            this.canvas.fill();
//            this.canvas.stroke();
//            this.canvas.closePath();

            this.canvas.beginPath();
            this.canvas.moveTo(p0-1, p1+1);
            this.canvas.lineTo(p0, p1-5);
            this.canvas.lineTo(p0+5, p1);
            this.canvas.moveTo(p0-1, p1+1);
            this.canvas.fill();
            //this.canvas.stroke();
            this.canvas.beginPath();
            this.canvas.arc(p0+5,p1-5,5,0,360, true);
            this.canvas.fill();
            this.canvas.stroke();
        }
    }