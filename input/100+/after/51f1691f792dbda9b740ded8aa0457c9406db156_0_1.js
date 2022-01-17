function( plane )
        {
            // if the plane is edge-on, ignore it
            if ( MathUtils.fpSign( plane.getPlaneEq()[2] ) == 0 )  return;

            // do some quick box tests.
            var minPt = this.getMinPoint(),
                    maxPt = this.getMaxPoint();

            if (maxPt[0] < plane._rect.getLeft())     return;
            if (minPt[0] > plane._rect.getRight())    return;

            if (maxPt[1] < plane._rect.getTop())      return;
            if (minPt[1] > plane._rect.getBottom())   return;

            if (minPt[2] > plane.getZMax())           return;

            // get the boundary points for the plane
            var boundaryPts = plane.getBoundaryPoints().slice();

            // get the points and direction vector for the current line
            var pt0 = this.getPoint0(),  pt1 = this.getPoint1();
            //var lineDir = pt1.subtract( pt0 );
            var lineDir = vecUtils.vecSubtract(3, pt1, pt0);

            // intersect with the front plane
            var planeEq = plane.getPlaneEq();
            var t = MathUtils.vecIntersectPlaneForParam( pt0, lineDir, planeEq );
            if (t != undefined)
            {
                if ((MathUtils.fpSign(t) >= 0) && (MathUtils.fpCmp(t,1.0) <= 0))
                {
                    // get the intersection point
                    var pt = MathUtils.interpolateLine3D( pt0, pt1, t );

                    // see if the intersection point is contained in the bounds
                    //var contains = this.boundaryContainsPoint( boundaryPts, plane.isBackFacing(), pt );
                    var onEdge = [];
                    var contains = MathUtils.boundaryContainsPoint( boundaryPts, pt, plane.isBackFacing(), onEdge );
                    if (contains == MathUtils.INSIDE)
                    {
                        // add the intersection
                        var dot = MathUtils.dot3( pt0, planeEq ) + planeEq[3];
                        var deltaVis = (dot > 0) ? 1 : -1;
//					if (plane.isBackFacing())
//                        deltaVis = (dot < 0) ? 1 : -1;

                        this.addIntersection( plane, t, deltaVis );
                    }
                    else if (contains == MathUtils.ON)
                    {
                        if (MathUtils.fpCmp(t,1.0) < 0)
                        {
                            // determine if the intersection is on a front side (no intersection) of the polygons
                            //var ctr = [ 0.5*(boundaryPts[0][0] + boundaryPts[2][0]),  0.5*(boundaryPts[0][1] + boundaryPts[2][1]),  0.5*(boundaryPts[0][2] + boundaryPts[2][2]) ];
                            //var vec = vecUtils.vecSubtract(3, pt, ctr );
                            if (this.edgeGoesBehindPlane( plane, boundaryPts, onEdge[0], onEdge[1],  pt0, pt1  ))
                            {
                                this.addIntersection( plane, t, 1 );
                            }
                            else if (this.edgeGoesBehindPlane( plane, boundaryPts, onEdge[0], onEdge[1],  pt1, pt0  ))
                            {
                                this.addIntersection( plane, t, -1 );
                            }

                            /*
                            if ( !this.edgeIsFrontFacing(boundaryPts, planeEq, plane.isBackFacing(), onEdge[0], onEdge[1]) )
                            {
                                // take the dot product between the line and the normal to the plane
                                // to determine the change in visibility
                                var vec = vecUtils.vecSubtract( 3, pt1, pt0 );
                                var dot = vecUtils.vecDot( 3, vec, planeEq );
                                var sign = MathUtils.fpSign( dot );
                                if (sign == 0)
                                    throw new Error( "coplanar intersection being treated as not coplanar" );
                                if (!plane.isBackFacing())
                                {
                                    if (sign < 0)
                                        this.addIntersection( plane, t, 1 );
                                }
                                else
                                {
                                    if (sign > 0)
                                        this.addIntersection( plane, t, -1 );
                                }
                            }
                            */
                        }
                    }
                }
            }
            else
            {
                // the line must be parallel to the plane.  If the line is in the plane,
                // we need to do some special processing
                var d0 = vecUtils.vecDot(3, planeEq, pt0) + planeEq[3],
                        d1 = vecUtils.vecDot(3, planeEq, pt1) + planeEq[3];
                if ((MathUtils.fpSign(d0) == 0) && (MathUtils.fpSign(d1) == 0))
                    this.doCoplanarIntersection( plane );
            }

            // intersect with the 4 planes formed by the edges of the plane, going back in Z
            var bPt1 = boundaryPts[3];
            for (var i=0;  i<4;  i++)
            {
                // get the 2 points that define the front edge of the plane
                var bPt0 = bPt1;
                var bPt1 = boundaryPts[i];

                // calculate the plane equation.  The normal should point towards the OUTSIDE of the boundary
                //var vec = bPt1.subtract( bPt0 );
                var vec = vecUtils.vecSubtract(3, bPt1, bPt0);
                if (plane.isBackFacing())
                    MathUtils.negate( vec );
                planeEq = [-vec[1], vec[0], 0];
                var normal = [planeEq[0], planeEq[1], planeEq[2]];
//			var d = -planeEq.dot(bPt0);
                var d = -vecUtils.vecDot(3, planeEq, bPt0);
                planeEq[3] = d;

                t = MathUtils.vecIntersectPlaneForParam( pt0, lineDir, planeEq );
                if (t)
                {
                    if ((MathUtils.fpSign(t) > 0) && (MathUtils.fpCmp(t,1.0) <= 0))	// the strict vs not-strict inequality comparisons are IMPORTANT!
                    {
                        // get the intersection point
                        var pt = MathUtils.interpolateLine3D( pt0, pt1, t );

                        // we need to get the parameter on the edge of the projection
                        // of the intersection point onto the line.
                        var index = (Math.abs(vec[0]) > Math.abs(vec[1])) ? 0 : 1;
                        var tEdge = (pt[index] - bPt0[index])/(bPt1[index] - bPt0[index]);
                        if ((MathUtils.fpSign(tEdge) > 0) && (MathUtils.fpCmp(tEdge,1.0) <= 0))
                        {
                            var edgePt = MathUtils.interpolateLine3D( bPt0, bPt1, tEdge );
                            if (MathUtils.fpCmp(pt[2],edgePt[2]) < 0)
                            {
                                // add the intersection
                                var deltaVis = MathUtils.dot(lineDir,normal) > 0 ? -1 : 1;
                                this.addIntersection( plane, t, deltaVis );
                            }
                        }
                    }
                }
            }
        }