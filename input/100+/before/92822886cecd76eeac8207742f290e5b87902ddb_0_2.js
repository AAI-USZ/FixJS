function( plane )
		{
			// get the boundary points for the plane
			var boundaryPts = plane.getBoundaryPoints();
			var planeEq = plane.getPlaneEq();

			if (plane.isBackFacing())
			{
				var tmp;
				tmp = boundaryPts[0];  boundaryPts[0] = boundaryPts[3];  boundaryPts[3] = tmp;
				tmp = boundaryPts[1];  boundaryPts[1] = boundaryPts[2];  boundaryPts[2] = tmp;
			}

			var pt0 = this.getPoint0(),
				pt1 = this.getPoint1();

			// keep a couple flags to prevent counting crossings twice in edge cases
			var gotEnter = false,
					gotExit = false;

			var bp1 = boundaryPts[3];
			for (var i=0;  i<4;  i++)
			{
				var bp0 = bp1;
				bp1 = boundaryPts[i];
				var vec = vecUtils.vecSubtract(3, bp1, bp0);
				var nrm = vecUtils.vecCross(3, vec, planeEq);
				nrm[3] = -vecUtils.vecDot(3, bp0, nrm);

				var d0 = vecUtils.vecDot(3, nrm, pt0) + nrm[3],
						d1 = vecUtils.vecDot(3, nrm, pt1) + nrm[3];

				var s0 = MathUtils.fpSign(d0),
						s1 = MathUtils.fpSign(d1);

				if (s0 != s1)
				{
					var t = Math.abs(d0)/( Math.abs(d0) + Math.abs(d1) );
					if (MathUtils.fpSign(t) === 0)
					{
						// the first point of the line is on the (infinite) extension of a side of the boundary.
						// Make sure the point (pt0) is within the range of the polygon edge
						var vt0 = vecUtils.vecSubtract(3, pt0, bp0),
							vt1 = vecUtils.vecSubtract(3, bp1, pt0);
						var dt0 = vecUtils.vecDot(3, vec, vt0),
							dt1 = vecUtils.vecDot(3, vec, vt1);
						var st0 = MathUtils.fpSign(dt0),  st1 = MathUtils.fpSign(dt1);
						if ((st0 >= 0) && (st1 >= 0))
						{
							if (s1 > 0)	// entering the material from the beginning of the line that is to be drawn
							{
								// see if the start point of the line is at a corner of the bounded plane
								var lineDir = vecUtils.vecSubtract(3, pt1, pt0);
								vecUtils.vecNormalize(3, lineDir);
								var dist = vecUtils.vecDist( 3, pt0, bp1 );
								var bp2, bv0, bv1, cross1, cross2, cross3;
								if ( MathUtils.fpSign(dist) == 0)
								{
									bp2 = boundaryPts[(i+1) % 4];
									bv0 = vecUtils.vecSubtract(3, bp2, bp1);
									bv1 = vecUtils.vecSubtract(3, bp0, bp1);
									cross1 = vecUtils.vecCross(3, bv0, lineDir);
									cross2 = vecUtils.vecCross(3, lineDir, bv1);
									cross3 = vecUtils.vecCross(3, bv0, bv1);
									if ( (MathUtils.fpSign(vecUtils.vecDot(3, cross1, cross3)) == 0) && (MathUtils.fpSign(vecUtils.vecDot(3, cross2, cross3)) == 0))
									{
										gotEnter = true;
										this.addIntersection( plane, t, 1 );
									}
								}
								else if (MathUtils.fpSign( vecUtils.vecDist(3, pt0, bp0)) === 0)
								{
									bp2 = boundaryPts[(i+2) % 4];
									bv0 = vecUtils.vecSubtract(3, bp2, bp0);
									bv1 = vecUtils.vecSubtract(3, bp1, bp0);
									cross1 = vecUtils.vecCross(3, bv0, lineDir);
									cross2 = vecUtils.vecCross(3, lineDir, bv1);
									cross3 = vecUtils.vecCross(3, bv0, bv1);
									if ( (MathUtils.fpSign(vecUtils.vecDot(3, cross1, cross3)) == 0) && (MathUtils.fpSign(vecUtils.vecDot(3, cross2, cross3)) == 0))
									{
										gotEnter = true;
										this.addIntersection( plane, t, 1 );
									}
								}
								else
								{
									// check if the line is on the edge of the boundary or goes to the interior
									gotEnter = true;
									this.addIntersection( plane, t, 1 );
								}
							}
						}
					}
					else if ( (MathUtils.fpSign(t) > 0) && (MathUtils.fpCmp(t,1.0) <= 0))
					{
						// get the point where the line crosses the edge of the element plane
						var pt = MathUtils.interpolateLine3D(pt0, pt1, t );

						// we know that the line crosses the infinite extension of the edge.  Determine
						// if that crossing is within the bounds of the edge
						var dot0 = vecUtils.vecDot(3, vecUtils.vecSubtract(3,pt, bp0),  vec),
								dot1 = vecUtils.vecDot(3, vecUtils.vecSubtract(3,pt, bp1),  vec);
						if ((MathUtils.fpSign(dot0) > 0) && (MathUtils.fpSign(dot1) < 0))
						{
							// determine if the line is entering or exiting
							if (s0 <= 0)		// entering
							{
								if (!gotEnter)
								{
									gotEnter = true;
									this.addIntersection( plane, t, 1 );
								}
							}
							else if (s0 > 0) // exiting
							{
								if (!gotExit)
								{
									gotExit = true;
									this.addIntersection( plane, t, -1 );
								}
							}
							else	// s0 == 0
							{
								// TODO
							}
						}
						else if ((MathUtils.fpSign(dot0) == 0) && (MathUtils.fpSign(dot1) < 0))
						{
							var j = i - 2;
							if (j < 0)  j += 4;
							var bp = boundaryPts[j];

							var v0 = vecUtils.vecSubtract( 3, bp, bp0 ),
									v1 = vec;

							if (s0 <= 0)
							{
								var v = vecUtils.vecSubtract(3, pt1, pt0);
								if ((MathUtils.fpSign(vecUtils.vecCross(3, v0,v)) > 0) && (MathUtils.fpSign(vecUtils.vecCross(3, v,v1)) > 0))
								{
									gotEnter = true;
									this.addIntersection( plane, t, 1 );
								}
							}
							else if (s0 > 0)
							{
								var v = vecUtils.vecSubtract(3, pt0, pt1);	// note the reversed order from the previous case
								if ((MathUtils.fpSign(vecUtils.vecCross(3, v0,v)) > 0) && (MathUtils.fpSign(vecUtils.vecCross(3, v,v1)) > 0))
								{
									gotEnter = true;
									this.addIntersection( plane, t, -1 );
								}
							}
						}
						else if ((MathUtils.fpSign(dot0) > 0) && (MathUtils.fpSign(dot1) == 0))
						{
							var j = (i + 1) % 4;
							var bp = boundaryPts[j];

							var v1 = vec.slice(0),
									v0 = vecUtils.vecSubtract( 3, bp, bp1 ),
									v1 = vecUtils.vecNegate(3, v1);

							if (s0 <= 0)
							{
								var v = vecUtils.vecSubtract(3, pt1, pt0);
								if ((MathUtils.fpSign(vecUtils.vecCross(3, v0,v)) < 0) && (MathUtils.fpSign(vecUtils.vecCross(3, v,v1)) < 0))
								{
									gotEnter = true;
									this.addIntersection( plane, t, 1 );
								}
							}
							else if (s0 > 0)
							{
								var v = vecUtils.vecSubtract(3, pt0, pt1);	// note the reversed order from the previous case
								if ((MathUtils.fpSign(vecUtils.vecCross(3, v0,v)) > 0) && (MathUtils.fpSign(vecUtils.vecCross(3, v,v1)) > 0))
								{
									gotEnter = true;
									this.addIntersection( plane, t, -1 );
								}
							}
						}
					}
				}
			}
		}