function( plane, boundaryPts, iEdge, t,  lPt0, lPt1 )
        {
            var rtnVal = false;

            if ( MathUtils.fpCmp(t,1.0) == 0 )
            {
                iEdge = (iEdge + 1) % 4;
                t = 0.0;
            }

            // boundary points (line points: lPt0, lPt1)
            var bPt0, bPt1, bPt2, bVec, bVec0, bVec1, lVec;

            if (MathUtils.fpSign(t) == 0)
            {
                // get the 3 relevant points.  The line goes through pt1.
                bPt0  = boundaryPts[(iEdge+3)%4].slice();
                bPt1  = boundaryPts[iEdge].slice();
                bPt2  = boundaryPts[(iEdge+1)%4].slice();
                bVec0 = vecUtils.vecSubtract(2, bPt0, bPt1);
                bVec1 = vecUtils.vecSubtract(2, bPt2, bPt1);
                lVec  = vecUtils.vecSubtract(2, lPt1, bPt1);

                var c0 = vecUtils.vecCross(2, bVec1, lVec),
                    c1 = vecUtils.vecCross(2, lVec, bVec0);
//                if ((MathUtils.fpSign(c0) < 0) && (MathUtils.fpSign(c1) < 0))
//                    rtnVal = true;
				if (!plane.isBackFacing() && (MathUtils.fpSign(c0) < 0) && (MathUtils.fpSign(c1) < 0))
					rtnVal = true;
				else if (plane.isBackFacing() && (MathUtils.fpSign(c0) > 0) && (MathUtils.fpSign(c1) > 0))
					rtnVal = true;
            }
            else
            {
                bPt0 = boundaryPts[iEdge].slice();
                bPt1 = boundaryPts[(iEdge+1)%4].slice();
                bVec = vecUtils.vecSubtract(3, bPt1, bPt0);
                lVec = vecUtils.vecSubtract(3, lPt1, lPt0);

                var planeEq = plane.getPlaneEq();
                var bNormal = vecUtils.vecCross(3, planeEq, bVec);
                var dot = vecUtils.vecDot(3, bNormal, lVec);
                if (MathUtils.fpSign(dot) > 0)
                {
                    var d = vecUtils.vecDot(3, lPt1, planeEq) + planeEq[3];
                    if (plane.isBackFacing())  d = -d;
                    if (MathUtils.fpSign(d) > 0)  rtnVal = true;
                }
            }

            return rtnVal;
        }