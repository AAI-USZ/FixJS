function( pt, child ) {
            // pt should be a 3D (2D is ok) vector in the space of the element
            if (pt.length == 2)  pt[2] = 0;

            // transform the bounds up the tree
            var parent = this.getOffsetParent(child);
            // TODO - Should have a different way to check for new template mode
            if ( parent || (child === this.application.ninja.currentDocument.model.documentRoot) )
            {
                this.setViewportObj( child );

                // get the offset (previously computed
                var childMat = this.getMatrixFromElement( child );
                var offset = this.getElementOffset( child );
                offset[2] = 0;

                if (this.elementHas3D( child ))
                {
                    // TODO - Commenting out flatten support until new perspective workflow is fully working
                    // if (flatten)  pt[2] = 0;
//                    var flatten = (parent !== this._rootElement) && (ElementsMediator.getProperty(parent, "-webkit-transform-style") !== "preserve-3d");
//                    if(flatten)
//                    {
//                        pt[2] = 0;
//                    }
                    pt = this.screenToView( pt[0], pt[1], pt[2] );
                    pt[3] = 1;
                    //var wPt = childMat.multiply( pt );
                    var wPt = glmat4.multiplyVec3( childMat, pt, [] );
//                    if(flatten)
//                    {
//                        wPt[2] = 0;
//                    }
                    var scrPt = this.viewToScreen( wPt );
                    pt = scrPt;
                }

                //pt = pt.add(offset);
                pt = vecUtils.vecAdd(3, pt, offset);
            }

            return [pt[0], pt[1], pt[2]];
        }