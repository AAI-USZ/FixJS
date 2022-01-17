function( bounds,  targetPt,  backFacing )
        {
            var pt = targetPt.slice(0);
            while (pt.length > 2)  pt.pop();

            // this function returns -1 for inside, 0 for on and 1 for outside.
            // values defined as instance variables above
            var nPts = bounds.length;
            var pt1 = bounds[nPts-1].slice(0);
            while (pt1.length > 2)  pt1.pop();
            for (var i=0;  i<nPts;  i++)
            {
                // get the vector along the edge of the boundary
                var pt0 = pt1;
                pt1 = bounds[i].slice(0);
                while (pt1.length > 2)  pt1.pop();
                var vec0 = VecUtils.vecSubtract(2, pt1, pt0 );
                if (vec0.length == 3)  vec0.pop();

                // get a vector from the target point to pt0
                //var vec1 = pt.subtract( pt0 );
                var vec1 = VecUtils.vecSubtract(2, pt, pt0 );
                if (vec1.length == 3)  vec1.pop();

                // look at the cross product of the 2 vectors
                var cross = VecUtils.vecCross(2, vec0, vec1 );
                var sign = this.fpSign( cross );
                if (sign == 0)
                {
                    //var t = vec1.modulus() / vec0.modulus();
                    var t = VecUtils.vecMag(2, vec1)/VecUtils.vecMag(2, vec0);
					var dot = VecUtils.vecDot(2, vec0, vec1);
                    if ((this.fpSign(dot) >= 0) && (this.fpSign(t) >= 0) && (this.fpCmp(t,1.0) <= 0))
                        return this.ON;
                    else
                        return this.OUTSIDE;
                }

                if (backFacing)
                {
                    if (this.fpSign(cross) < 0)  return this.OUTSIDE;
                }
                else
                {
                    if (this.fpSign(cross) > 0)  return this.OUTSIDE;
                }
            }

            return this.INSIDE;
        }