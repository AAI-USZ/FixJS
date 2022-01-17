function() {
        var p1c, p2c, r, lbda;

        if(this.slideObject.elementClass == JXG.OBJECT_CLASS_CIRCLE) {
			r = this.slideObject.Radius();
            this.coords.setCoordinates(JXG.COORDS_BY_USER, [
					this.slideObject.center.X() + r*Math.cos(this.position),
					this.slideObject.center.Y() + r*Math.sin(this.position)
				]);
        } else if(this.slideObject.elementClass == JXG.OBJECT_CLASS_LINE) {
            p1c = this.slideObject.point1.coords.usrCoords;
            p2c = this.slideObject.point2.coords.usrCoords;
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
        } else if(this.slideObject.type == JXG.OBJECT_TYPE_TURTLE) {
            this.coords.setCoordinates(JXG.COORDS_BY_USER, [this.slideObject.Z(this.position), this.slideObject.X(this.position), this.slideObject.Y(this.position)]);
            this.updateConstraint(); // In case, the point is a constrained glider.
            this.coords  = JXG.Math.Geometry.projectPointToTurtle(this, this.slideObject, this.board);  // side-effect: this.position is overwritten
        } else if(this.slideObject.elementClass == JXG.OBJECT_CLASS_CURVE) {
            this.coords.setCoordinates(JXG.COORDS_BY_USER, [this.slideObject.Z(this.position), this.slideObject.X(this.position), this.slideObject.Y(this.position)]);
            this.updateConstraint(); // In case, the point is a constrained glider.
            this.coords  = JXG.Math.Geometry.projectPointToCurve(this, this.slideObject, this.board);  // side-effect: this.position is overwritten
        } else if(this.slideObject.elementClass == JXG.OBJECT_CLASS_POINT) {
            this.coords  = JXG.Math.Geometry.projectPointToPoint(this, this.slideObject, this.board);
        }
    }