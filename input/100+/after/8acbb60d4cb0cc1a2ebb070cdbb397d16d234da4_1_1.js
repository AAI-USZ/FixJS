function(board, parents, attributes) {

    var el, attr;

        

    // Three points?

    if ( !(JXG.isPoint(parents[0]) && JXG.isPoint(parents[1]) && JXG.isPoint(parents[2]))) {

        throw new Error("JSXGraph: Can't create Sector with parent types '" + 

                        (typeof parents[0]) + "' and '" + (typeof parents[1]) + "' and '" + 

                        (typeof parents[2]) + "'.");

    }



    attr = JXG.copyAttributes(attributes, board.options, 'sector');



    el = board.create('curve', [[0], [0]], attr);

    

    el.type = JXG.OBJECT_TYPE_SECTOR;



    el.elType = 'sector';

    el.parents = [parents[0].id, parents[1].id, parents[2].id];



    /**

     * Midpoint of the sector.

     * @memberOf Sector.prototype

     * @name point1

     * @type JXG.Point

     */

    el.point1 = JXG.getReference(board, parents[0]);

    el.center = el.point1;



    /**

     * This point together with {@link Sector#point1} defines the radius..

     * @memberOf Sector.prototype

     * @name point2

     * @type JXG.Point

     */

    el.point2 = JXG.getReference(board, parents[1]);

    el.radiuspoint = el.point2;



    /**

     * Defines the sector's angle.

     * @memberOf Sector.prototype

     * @name point3

     * @type JXG.Point

     */

    el.point3 = JXG.getReference(board, parents[2]);

    el.anglepoint = el.point3;

    

    /* Add arc as child to defining points */

    el.point1.addChild(el);

    el.point2.addChild(el);

    el.point3.addChild(el);

    

    el.useDirection = attributes['usedirection'];      // useDirection is necessary for circumCircleSectors



    /**

     * documented in JXG.Curve

     * @ignore

     */

    el.updateDataArray = function() {

        var A = this.point2,

            B = this.point1,

            C = this.point3,

            beta, co, si, matrix,

            phi = JXG.Math.Geometry.rad(A,B,C),

            i,

            x = B.X(),

            y = B.Y(),

            z = B.Z(),

            v, 

            det, p0c, p1c, p2c,

            p1, p2, p3, p4,

            k, ax, ay, bx, by, d, r,

            PI2 = Math.PI*0.5;



        if (this.useDirection) {  // This is true for circumCircleArcs. In that case there is

                                  // a fourth parent element: [midpoint, point1, point3, point2]

            p0c = parents[1].coords.usrCoords,

            p1c = parents[3].coords.usrCoords,

            p2c = parents[2].coords.usrCoords;

            det = (p0c[1]-p2c[1])*(p0c[2]-p1c[2]) - (p0c[2]-p2c[2])*(p0c[1]-p1c[1]);

            if(det < 0) {

                this.point2 = parents[1];

                this.point3 = parents[2];

            }

            else {

                this.point2 = parents[2];

                this.point3 = parents[1];

            }

        }

        

        r = B.Dist(A);

        p1 = [A.Z(), A.X(), A.Y()];

        p1[1] /= p1[0];

        p1[2] /= p1[0];

        p1[0] /= p1[0];

        p4 = p1.slice(0);

        x /= z;

        y /= z;

        this.dataX = [x, x+0.333*(p1[1]-x), x+0.666*(p1[1]-x), p1[1]];

        this.dataY = [y, y+0.333*(p1[2]-y), y+0.666*(p1[2]-y), p1[2]];

        while (phi>JXG.Math.eps) {

            if (phi>=PI2) {

                beta = PI2;

                phi -= PI2;

            } else {

                beta = phi;

                phi = 0.0;

            }



            co = Math.cos(beta);

            si = Math.sin(beta);

            matrix = [[1,          0,   0],

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

        this.dataX = this.dataX.concat([ p4[1]+0.333*(x-p4[1]), p4[1]+0.666*(x-p4[1]), x]);

        this.dataY = this.dataY.concat([ p4[2]+0.333*(y-p4[2]), p4[2]+0.666*(y-p4[2]), y]);

        

        this.bezierDegree = 3;

    };



    /**

     * Returns the radius of the sector.

     * @memberOf Sector.prototype

     * @name Radius

     * @function

     * @returns {Number} The distance between {@link Sector#point1} and {@link Sector#point2}.

     */

    el.Radius = function() {

        return this.point2.Dist(this.point1);

    };



    /**

     * deprecated

     * @ignore

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

            angle = JXG.Math.Geometry.rad(this.point2, this.center, checkPoint.usrCoords.slice(1));

            alpha = 0.0;

            beta = JXG.Math.Geometry.rad(this.point2, this.center, this.point3);

            if (angle<alpha || angle>beta) { 

                has = false; 

            }

        }

        return has;    

    };



    /**

     * Checks whether (x,y) is within the area defined by the sector.

     * @memberOf Sector.prototype

     * @name hasPointSector

     * @function

     * @param {Number} x Coordinate in x direction, screen coordinates.

     * @param {Number} y Coordinate in y direction, screen coordinates.

     * @returns {Boolean} True if (x,y) is within the sector defined by the arc, False otherwise.

     */

    el.hasPointSector = function (x, y) { 

        var checkPoint = new JXG.Coords(JXG.COORDS_BY_SCREEN, [x,y], this.board),

            r = this.Radius(),

            dist = this.point1.coords.distance(JXG.COORDS_BY_USER,checkPoint),

            has = (dist<r),

            angle;

        

        if(has) {

            angle = JXG.Math.Geometry.rad(this.point2,this.point1,checkPoint.usrCoords.slice(1));

            if (angle>JXG.Math.Geometry.rad(this.point2,this.point1,this.point3)) { has = false; }

        }

        return has;    

    };



    /**

     * documented in GeometryElement

     * @ignore

     */

    el.getTextAnchor = function() {

        return this.point1.coords;

    };



    /**

     * documented in GeometryElement

     * @ignore

     */

    el.getLabelAnchor = function() {

        var angle = JXG.Math.Geometry.rad(this.point2, this.point1, this.point3),

            dx = 13/(this.board.unitX),

            dy = 13/(this.board.unitY),

            p2c = this.point2.coords.usrCoords,

            pmc = this.point1.coords.usrCoords,

            bxminusax = p2c[1] - pmc[1],

            byminusay = p2c[2] - pmc[2],

            coords, vecx, vecy, len;



        if(this.label.content != null) {                          

            this.label.content.relativeCoords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0,0],this.board);                      

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



        return new JXG.Coords(JXG.COORDS_BY_USER, [pmc[1]+vecx,pmc[2]+vecy],this.board);

    };



    el.prepareUpdate().update();

    

    return el;

}