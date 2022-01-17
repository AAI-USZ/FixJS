function( viewPt, child ) {
            // pt should be a 3D (2D is ok) vector in the space of the element
            var pt = viewPt.slice(0);
            if (pt.length == 2)  pt[2] = 0;
            pt[3] = 1;

            // transform the bounds up the tree
            var parent = child.offsetParent;
            if ( parent )
            {
                this.setViewportObj( child );

                // get the offset (previously computed
                var offset = this.getElementOffset( child );
                offset[2] = 0;
                pt = this.viewToScreen( pt );
                //pt = pt.add(offset);
                pt = vecUtils.vecAdd(3, pt, offset);
            }

            return [pt[0], pt[1], pt[2]];
        }