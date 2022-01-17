function() {
        var i, p1c, p2c, d, v, poly, cc, pos, sgn;

        if(this.slideObject.elementClass == JXG.OBJECT_CLASS_CIRCLE) {
            this.coords  = JXG.Math.Geometry.projectPointToCircle(this, this.slideObject, this.board);
            this.position = JXG.Math.Geometry.rad([this.slideObject.center.X()+1.0,this.slideObject.center.Y()],this.slideObject.center,this);
        } else if(this.slideObject.elementClass == JXG.OBJECT_CLASS_LINE) {

            /** 
             * onPolygon==true: the point is a slider on a seg,ent and this segment is one of the 
             * "borders" of a polygon.
             * This is a GEONExT feature.
             **/
            if (this.onPolygon) {
                p1c = this.slideObject.point1.coords.usrCoords;
                p2c = this.slideObject.point2.coords.usrCoords;
                i = 1;
                d = p2c[i] - p1c[i];
                if (Math.abs(d)<JXG.Math.eps) { 
                    i = 2; 
                    d = p2c[i] - p1c[i];
                }
                cc = JXG.Math.Geometry.projectPointToLine(this, this.slideObject, this.board);
                pos = (cc.usrCoords[i] - p1c[i]) / d;
                poly = this.slideObject.parentPolygon;

                if (pos<0.0) {
                    for (i=0; i<poly.borders.length; i++) {
                        if (this.slideObject == poly.borders[i]) {
                            this.slideObject = poly.borders[(i - 1 + poly.borders.length) % poly.borders.length];
                            break;
                        }
                    }
                } else if (pos>1.0) {
                    for (i=0; i<poly.borders.length; i++) {
                        if(this.slideObject == poly.borders[i]) {
                            this.slideObject = poly.borders[(i + 1 + poly.borders.length) % poly.borders.length];
                            break;                        
                        }
                    }
                }
            }

            p1c = this.slideObject.point1.coords;
            p2c = this.slideObject.point2.coords;
            // Distance between the two defining points
            d = p1c.distance(JXG.COORDS_BY_USER, p2c);
            p1c = p1c.usrCoords.slice(0);
            p2c = p2c.usrCoords.slice(0);
            
            if (d<JXG.Math.eps) {                                        // The defining points are identical
                this.coords.setCoordinates(JXG.COORDS_BY_USER, p1c);
                this.position = 0.0;
            } else {
                this.coords = JXG.Math.Geometry.projectPointToLine(this, this.slideObject, this.board);
                if (Math.abs(p2c[0])<JXG.Math.eps) {                 // The second point is an ideal point
                    i = 1;
                    d = p2c[i];
                    if (Math.abs(d)<JXG.Math.eps) { 
                        i = 2; 
                        d = p2c[i];
                    }
                    d = (this.coords.usrCoords[i] - p1c[i]) / d;
                    sgn = (d>=0) ? 1 : -1;
                    d = Math.abs(d);
                    this.position = sgn * d/(d+1);
                } else if (Math.abs(p1c[0])<JXG.Math.eps) {          // The first point is an ideal point
                    i = 1;
                    d = p1c[i];
                    if (Math.abs(d)<JXG.Math.eps) { 
                        i = 2; 
                        d = p1c[i];
                    }
                    d = (this.coords.usrCoords[i] - p2c[i]) / d;
                    if (d<0.0) {
                        this.position = (1 - 2.0*d) / (1.0 - d); // 1.0 - d/(1-d);
                    } else {
                        this.position = 1/(d+1);
                    }
                } else {
                    i = 1;
                    d = p2c[i] - p1c[i];
                    if (Math.abs(d)<JXG.Math.eps) { 
                        i = 2; 
                        d = p2c[i] - p1c[i];
                    }
                    this.position = (this.coords.usrCoords[i] - p1c[i]) / d;
                }
            }        
                
            // Snap the glider point of the slider into its appropiate position
            // First, recalculate the new value of this.position
            // Second, call update(fromParent==true) to make the positioning snappier.
            if (this.visProp.snapwidth>0.0 && Math.abs(this._smax-this._smin)>=JXG.Math.eps) {
                if (this.position<0.0) this.position = 0.0;
                if (this.position>1.0) this.position = 1.0;
                    
                v = this.position*(this._smax-this._smin)+this._smin;
                v = Math.round(v/this.visProp.snapwidth)*this.visProp.snapwidth;
                this.position = (v-this._smin)/(this._smax-this._smin);
                this.update(true);
            }

            p1c = this.slideObject.point1.coords.usrCoords;
            if (!this.slideObject.visProp.straightfirst && Math.abs(p1c[0])>JXG.Math.eps && this.position<0) {
                this.coords.setCoordinates(JXG.COORDS_BY_USER, p1c);
                this.position = 0;
            }
            p2c = this.slideObject.point2.coords.usrCoords;
            if (!this.slideObject.visProp.straightlast && Math.abs(p2c[0])>JXG.Math.eps && this.position>1) {
                this.coords.setCoordinates(JXG.COORDS_BY_USER, p2c);
                this.position = 1;
            }
    

        } else if(this.slideObject.type == JXG.OBJECT_TYPE_TURTLE) {
            this.updateConstraint(); // In case, the point is a constrained glider.
            this.coords  = JXG.Math.Geometry.projectPointToTurtle(this, this.slideObject, this.board);  // side-effect: this.position is overwritten
        } else if(this.slideObject.elementClass == JXG.OBJECT_CLASS_CURVE) {
            this.updateConstraint(); // In case, the point is a constrained glider.
            this.coords  = JXG.Math.Geometry.projectPointToCurve(this, this.slideObject, this.board);  // side-effect: this.position is overwritten
        } else if(this.slideObject.elementClass == JXG.OBJECT_CLASS_POINT) {
            this.coords  = JXG.Math.Geometry.projectPointToPoint(this, this.slideObject, this.board);
        }
    }