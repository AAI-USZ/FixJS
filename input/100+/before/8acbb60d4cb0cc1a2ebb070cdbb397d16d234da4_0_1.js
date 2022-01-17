function(board, parents, attributes) {

    var el, attr, i;





    // this method is used to create circumccirclearcs, too. if a circumcirclearc is created we get a fourth

    // point, that's why we need to check that case, too.

    if(!(parents = JXG.checkParents('arc', parents, [

            [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT],

            [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]]))) {

        throw new Error("JSXGraph: Can't create Arc with parent types '" +

                        (typeof parents[0]) + "' and '" + (typeof parents[1]) + "' and '" +

                        (typeof parents[2]) + "'." +

                        "\nPossible parent types: [point,point,point]");

    }



    attr = JXG.copyAttributes(attributes, board.options, 'arc');

    el = board.create('curve', [[0],[0]], attr);



    el.elType = 'arc';



    el.parents = [];

    for (i = 0; i < parents.length; i++) {

        if (parents[i].id) {

            el.parents.push(parents[i].id);

        }

    }



    /**

     * documented in JXG.GeometryElement

     * @ignore

     */

    el.type = JXG.OBJECT_TYPE_ARC;



    /**

     * Center of the arc.

     * @memberOf Arc.prototype

     * @name center

     * @type JXG.Point

     */

    el.center = JXG.getReference(board, parents[0]);



    /**

     * Point defining the arc's radius.

     * @memberOf Arc.prototype

     * @name radiuspoint

     * @type JXG.Point

     */

    el.radiuspoint = JXG.getReference(board, parents[1]);

    el.point2 = el.radiuspoint;



    /**

     * The point defining the arc's angle.

     * @memberOf Arc.prototype

     * @name anglepoint

     * @type JXG.Point

     */

    el.anglepoint = JXG.getReference(board, parents[2]);

    el.point3 = el.anglepoint;



    // Add arc as child to defining points

    el.center.addChild(el);

    el.radiuspoint.addChild(el);

    el.anglepoint.addChild(el);

    

    /**

     * TODO

     */

    el.useDirection = attr['usedirection'];      // useDirection is necessary for circumCircleArcs



    // documented in JXG.Curve

    el.updateDataArray = function() {

        var A = this.radiuspoint,

            B = this.center,

            C = this.anglepoint,

            beta, co, si, matrix, phi, i,

            x = B.X(),

            y = B.Y(),

            z = B.Z(),

            v, det, p0c, p1c, p2c,

            p1, p2, p3, p4,

            k, ax, ay, bx, by, d, r, sgn = 1.0,

            PI2 = Math.PI*0.5;

            

        phi = JXG.Math.Geometry.rad(A,B,C);

        

        if ((this.visProp.type=='minor' && phi>Math.PI) 

            || (this.visProp.type=='major' && phi<Math.PI)) { 

            phi = 2*Math.PI - phi; 

            sgn = -1.0;

        }



        if (this.useDirection) { // This is true for circumCircleArcs. In that case there is

                                  // a fourth parent element: [center, point1, point3, point2]

            p0c = parents[1].coords.usrCoords;

            p1c = parents[3].coords.usrCoords;

            p2c = parents[2].coords.usrCoords;

            det = (p0c[1]-p2c[1])*(p0c[2]-p1c[2]) - (p0c[2]-p2c[2])*(p0c[1]-p1c[1]);

            if (det < 0) {

                this.radiuspoint = parents[1];

                this.anglepoint = parents[2];

            } else {

                this.radiuspoint = parents[2];

                this.anglepoint = parents[1];

            }

        }



        p1 = [A.Z(), A.X(), A.Y()];

        r = B.Dist(A);

        x /= z;

        y /= z;

        this.dataX = [p1[1]/p1[0]];

        this.dataY = [p1[2]/p1[0]];

        while (phi>JXG.Math.eps) {

            if (phi>=PI2) {

                beta = PI2;

                phi -= PI2;

            } else {

                beta = phi;

                phi = 0.0;

            }



            co = Math.cos(sgn*beta);

            si = Math.sin(sgn*beta);

            matrix = [[1,        0,   0],  // z missing

                    [x*(1-co)+y*si,co,-si],

                    [y*(1-co)-x*si,si, co]];

            v = JXG.Math.matVecMult(matrix, p1);

            p4 = [v[0]/v[0], v[1]/v[0], v[2]/v[0]];



            ax = p1[1]-x;

            ay = p1[2]-y;

            bx = p4[1]-x;

            by = p4[2]-y;



            d = Math.sqrt((ax+bx)*(ax+bx) + (ay+by)*(ay+by));

            //if (beta>Math.PI) { d *= -1; }

 

            if (Math.abs(by-ay)>JXG.Math.eps) {

                k = (ax+bx)*(r/d-0.5)/(by-ay)*8.0/3.0;

            } else {

                k = (ay+by)*(r/d-0.5)/(ax-bx)*8.0/3.0;

            }



            p2 = [1, p1[1]-k*ay, p1[2]+k*ax ];

            p3 = [1, p4[1]+k*by, p4[2]-k*bx ];

        

            this.dataX = this.dataX.concat([p2[1], p3[1], p4[1]]);

            this.dataY = this.dataY.concat([p2[2], p3[2], p4[2]]);

            p1 = p4.slice(0);

        }

        this.bezierDegree = 3;



        this.updateStdform();

        this.updateQuadraticform();

    };



    /**

     * Determines the arc's current radius. I.e. the distance between {@link Arc#center} and {@link Arc#radiuspoint}.

     * @memberOf Arc.prototype

     * @name Radius

     * @function

     * @returns {Number} The arc's radius

     */

    el.Radius = function() {

        return this.radiuspoint.Dist(this.center);

    };



    /**

     * @deprecated Use {@link Arc#Radius}

     * @memberOf Arc.prototype

     * @name getRadius

     * @function

     * @returns {Number}

     */

    el.getRadius = function() {

        return this.Radius();

    };



    // documented in geometry element

    el.hasPoint = function (x, y) {

        var prec = this.board.options.precision.hasPoint/(this.board.unitX),

            checkPoint = new JXG.Coords(JXG.COORDS_BY_SCREEN, [x,y], this.board),

            r = this.Radius(),

            dist = this.center.coords.distance(JXG.COORDS_BY_USER, checkPoint),

            has = (Math.abs(dist-r) < prec),

            angle, alpha, beta;

            

        if (has) {

            angle = JXG.Math.Geometry.rad(this.radiuspoint,this.center,checkPoint.usrCoords.slice(1));

            alpha = 0.0;

            beta = JXG.Math.Geometry.rad(this.radiuspoint,this.center,this.anglepoint);

            if ((this.visProp.type=='minor' && beta>Math.PI)

                || (this.visProp.type=='major' && beta<Math.PI)) { 

                alpha = beta; 

                beta = 2*Math.PI;

            } 

            if (angle<alpha || angle>beta) { 

                has = false; 

            }

        }

        return has;    

    };



    /**

     * Checks whether (x,y) is within the sector defined by the arc.

     * @memberOf Arc.prototype

     * @name hasPointSector

     * @function

     * @param {Number} x Coordinate in x direction, screen coordinates.

     * @param {Number} y Coordinate in y direction, screen coordinates.

     * @returns {Boolean} True if (x,y) is within the sector defined by the arc, False otherwise.

     */

    el.hasPointSector = function (x, y) { 

        var checkPoint = new JXG.Coords(JXG.COORDS_BY_SCREEN, [x,y], this.board),

            r = this.Radius(),

            dist = this.center.coords.distance(JXG.COORDS_BY_USER,checkPoint),

            has = (dist<r),

            angle, alpha, beta;

        

        if (has) {

            angle = JXG.Math.Geometry.rad(this.radiuspoint,this.center,checkPoint.usrCoords.slice(1));

            alpha = 0.0;

            beta = JXG.Math.Geometry.rad(this.radiuspoint,this.center,this.anglepoint);

            if ((this.visProp.type=='minor' && beta>Math.PI) 

                || (this.visProp.type=='major' && beta<Math.PI)) { 

                alpha = beta; 

                beta = 2*Math.PI;

            } 

            if (angle<alpha || angle>beta) { 

                has = false; 

            }

        }

        return has;    

    };



    // documented in geometry element

    el.getTextAnchor = function() {

        return this.center.coords;

    };



    // documented in geometry element

    el.getLabelAnchor = function() {

        var angle,

            dx = 10/(this.board.unitX),

            dy = 10/(this.board.unitY),

            p2c = this.point2.coords.usrCoords,

            pmc = this.center.coords.usrCoords,

            bxminusax = p2c[1] - pmc[1],

            byminusay = p2c[2] - pmc[2],

            coords, vecx, vecy, len;



        if(this.label.content != null) {                          

            this.label.content.relativeCoords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0,0],this.board);                      

        }  



        angle = JXG.Math.Geometry.rad(this.radiuspoint, this.center, this.anglepoint);

        if ((this.visProp.type=='minor' && angle>Math.PI)

            || (this.visProp.type=='major' && angle<Math.PI)) { 

            angle = -(2*Math.PI - angle); 

        } 

        

        coords = new JXG.Coords(JXG.COORDS_BY_USER, 

                        [pmc[1]+ Math.cos(angle*0.5)*bxminusax - Math.sin(angle*0.5)*byminusay, 

                        pmc[2]+ Math.sin(angle*0.5)*bxminusax + Math.cos(angle*0.5)*byminusay], 

                        this.board);



        vecx = coords.usrCoords[1] - pmc[1];

        vecy = coords.usrCoords[2] - pmc[2];

    

        len = Math.sqrt(vecx*vecx+vecy*vecy);

        vecx = vecx*(len+dx)/len;

        vecy = vecy*(len+dy)/len;



        return new JXG.Coords(JXG.COORDS_BY_USER, [pmc[1]+vecx,pmc[2]+vecy], this.board);

    };

    

    /**

     * TODO description

     */

    el.updateQuadraticform = function () {

        var m = this.center,

            mX = m.X(), mY = m.Y(), r = this.Radius();

        this.quadraticform = [[mX*mX+mY*mY-r*r,-mX,-mY],

            [-mX,1,0],

            [-mY,0,1]

        ];

    };



    /**

     * TODO description

     */

    el.updateStdform = function () {

        this.stdform[3] = 0.5;

        this.stdform[4] = this.Radius();

        this.stdform[1] = -this.center.coords.usrCoords[1];

        this.stdform[2] = -this.center.coords.usrCoords[2];

        this.normalize();

    };



    el.prepareUpdate().update();

    return el;

}