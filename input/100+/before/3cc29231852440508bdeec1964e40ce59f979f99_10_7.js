function( elt ) {
            var mat = Matrix.I(4),
                projMat,
                pDist;
            // TODO - Commenting out flatten support until new perspective workflow is fully working
            var zMat = Matrix.I(4);
//            zMat[9] = 0;
//            zMat[10] = 0;
//            zMat[11] = 0;
//            zMat[12] = 0;
            while (elt)
            {
                this.pushViewportObj( elt );
                    var cop = this.getCenterOfProjection();
                    var s2v = Matrix.Translation([-cop[0], -cop[1], 0]);
                    var objMat = this.getMatrixFromElement( elt );

                    //var projMat = Matrix.I(4).multiply( this.getPerspectiveDistFromElement(elt) );
                    pDist = this.getPerspectiveDistFromElement(elt);
                    if(pDist)
                    {
                        projMat = glmat4.scale(Matrix.I(4), [pDist,pDist,pDist], []);
                        projMat[11] = -1;
                        projMat[15] = 1400;
                    }
                    var v2s = Matrix.Translation([cop[0], cop[1], 0]);

                    glmat4.multiply( s2v, mat, mat );
                    glmat4.multiply( objMat, mat, mat );
//                    glmat4.multiply( projMat, mat, mat );
                    if(pDist)
                    {
                        //mat = projMat.multiply( mat );
                        glmat4.multiply( projMat, mat, mat );
                        pDist = null;
                    }
                    glmat4.multiply( v2s, mat, mat );

                // TODO - Commenting out flatten support until new perspective workflow is fully working
//                    var flatten = (elt !== this._rootElement) && (elt.parentElement !== this._rootElement) && (ElementsMediator.getProperty(elt.parentElement, "-webkit-transform-style") !== "preserve-3d");
//                    if(flatten)
//                    {
//                        glmat4.multiply( zMat, mat, mat );
//                    }

                    // offset to the parent
                    var offset = this.getElementOffset( elt );
                    var offMat = Matrix.Translation([offset[0], offset[1], 0]);
                    //mat = offMat.multiply( mat );
                    glmat4.multiply( offMat, mat, mat );

                this.popViewportObj();

                if (elt === this._stageElement)  break;
                if (elt === this._rootElement)  break;
                elt = elt.offsetParent;
                if (elt === this._rootElement)  break;
            }

            return mat;
        }