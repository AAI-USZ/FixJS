function( localPt, elt ) {
            if ((elt == null) || (elt === this._stageElement))  return localPt;

            // get the 3D transformation and 2D offset from the element
            var pt = localPt.slice(0);
            pt = MathUtils.makeDimension3( pt );

            // transform the point up the tree
            var child = elt;
            var parent = elt.offsetParent;
            while ( parent )
            {
                // go to screen space of the current child
                this.pushViewportObj( child );
                pt = this.viewToScreen( pt );
                this.popViewportObj();

                // to screen space of the parent
                var offset = this.getElementOffset( child );
                offset[2] = 0.0;
                pt = vecUtils.vecAdd( 3, pt, offset );

                // to view space of the parent
                this.pushViewportObj( parent );
                pt = this.screenToView( pt[0], pt[1], pt[2] );
                this.popViewportObj();

                // check if we are done
                if (parent === this._stageElement)  break;

                if (this.elementHas3D( parent ))
                {
                    var parentMat = this.getMatrixFromElement( parent );
                    pt = MathUtils.transformPoint( pt, parentMat );
                }

                child = parent;
                parent = parent.offsetParent;
            }

            return pt;
        }