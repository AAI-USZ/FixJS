function() {
        var p1c, p2c, r, lbda,
            slide = this.slideObject, alpha;

        if(slide.elementClass == JXG.OBJECT_CLASS_CIRCLE) {
			r = slide.Radius();
            this.coords.setCoordinates(JXG.COORDS_BY_USER, [
					slide.center.X() + r*Math.cos(this.position),
					slide.center.Y() + r*Math.sin(this.position)
				]);
        } else if(slide.elementClass == JXG.OBJECT_CLASS_LINE) {
            p1c = slide.point1.coords.usrCoords;
            p2c = slide.point2.coords.usrCoords;
            if (Math.abs(p2c[0])<JXG.Math.eps) {                        // The second point is an ideal point
                lbda = Math.min(Math.abs(this.position), 1.0-JXG.Math.eps);
                lbda /= (1.0-lbda);
                if (this.position < 0) {
                    lbda *= -1.0;
                }
                this.coords.setCoordinates(JXG.COORDS_BY_USER, [
                    p1c[0] + lbda*p2c[0],
                    p1c[1] + lbda*p2c[1],
					p1c[2] + lbda*p2c[2]
                ]);
            } else if (Math.abs(p1c[0])<JXG.Math.eps) {                 // The first point is an ideal point
                lbda = Math.max(this.position, JXG.Math.eps);
                lbda = Math.min(lbda, 2.0-JXG.Math.eps);
                if (lbda > 1.0) {
                    lbda = (lbda-1)/(lbda-2);
                } else {
                    lbda = (1.0-lbda)/lbda;
                }
                this.coords.setCoordinates(JXG.COORDS_BY_USER, [
                    p2c[0] + lbda*p1c[0],
                    p2c[1] + lbda*p1c[1],
					p2c[2] + lbda*p1c[2]
                ]);
            } else {
                lbda = this.position;
                this.coords.setCoordinates(JXG.COORDS_BY_USER, [
                    p1c[0] + lbda*(p2c[0]-p1c[0]),
                    p1c[1] + lbda*(p2c[1]-p1c[1]),
					p1c[2] + lbda*(p2c[2]-p1c[2])
                ]);
            }
        } else if(slide.type == JXG.OBJECT_TYPE_TURTLE) {
            this.coords.setCoordinates(JXG.COORDS_BY_USER, [slide.Z(this.position), slide.X(this.position), slide.Y(this.position)]);
            this.updateConstraint(); // In case, the point is a constrained glider.
            this.coords  = JXG.Math.Geometry.projectPointToTurtle(this, slide, this.board);  // side-effect: this.position is overwritten
        } else if(slide.elementClass == JXG.OBJECT_CLASS_CURVE) {
            this.coords.setCoordinates(JXG.COORDS_BY_USER, [slide.Z(this.position), slide.X(this.position), slide.Y(this.position)]);
            
            if (slide.type == JXG.OBJECT_TYPE_ARC || slide.type == JXG.OBJECT_TYPE_SECTOR) {
                alpha = JXG.Math.Geometry.rad([slide.center.X()+1, slide.center.Y()], slide.center, slide.radiuspoint);
                r = slide.Radius();
                this.coords.setCoordinates(JXG.COORDS_BY_USER, [
                        slide.center.X() + r*Math.cos(this.position+alpha),
                        slide.center.Y() + r*Math.sin(this.position+alpha)
                    ]);
            } else {
                this.updateConstraint(); // In case, the point is a constrained glider.
                this.coords  = JXG.Math.Geometry.projectPointToCurve(this, slide, this.board);  // side-effect: this.position is overwritten
            }
            
        } else if(slide.elementClass == JXG.OBJECT_CLASS_POINT) {
            this.coords  = JXG.Math.Geometry.projectPointToPoint(this, slide, this.board);
        }
    }