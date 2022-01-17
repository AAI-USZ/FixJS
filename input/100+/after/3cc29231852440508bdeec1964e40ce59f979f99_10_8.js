function( elt, shouldProject ) {
            var mat = Matrix.I(4),
                projMat,
                pDist;
            while (elt)
            {
                this.pushViewportObj( elt );
                    var cop = this.getCenterOfProjection();
                    var s2v = Matrix.Translation([-cop[0], -cop[1], 0]);
                    var objMat = this.getMatrixFromElement( elt );
                    if(shouldProject)
                    {
                        pDist = this.getPerspectiveDistFromElement(elt);
                        if(pDist)
                        {
                            projMat = glmat4.scale(Matrix.I(4), [pDist,pDist,pDist], []);
                            projMat[11] = -1;
                            projMat[15] = 1400;
                        }
                    }
                    var v2s = Matrix.Translation([cop[0], cop[1], 0]);
                this.popViewportObj();

                // multiply all the matrices together
                //mat = s2v.multiply( mat );
                glmat4.multiply( s2v, mat, mat );
                if (elt === this._stageElement)  break;
                //mat = objMat.multiply( mat );
                glmat4.multiply( objMat, mat, mat );
                if(shouldProject && pDist)
                {
                    //mat = projMat.multiply( mat );
                    glmat4.multiply( projMat, mat, mat );
                    pDist = null;
                }
                //mat = v2s.multiply( mat );
                glmat4.multiply( v2s, mat, mat );

                // offset to the parent
                var offset = this.getElementOffset( elt );
                var offMat = Matrix.Translation([offset[0], offset[1], 0]);
                //mat = offMat.multiply( mat );
                glmat4.multiply( offMat, mat, mat );

                elt = this.getOffsetParent(elt);
            }

            return mat;
        }