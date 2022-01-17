function( localPt, elt ) {
            // get the 3D transformation and 2D offset from the element
            var pt = localPt.slice(0);
            if (pt.length < 3)  pt[2] = 0;
            if (pt.length == 4)  pt.pop();

            // transform the bounds up the tree
            var child = elt;
            while ( child )
            {
                pt = this.childToParent( pt, child );

//                if (child === this.application.ninja.currentDocument.model.documentRoot)  break;
//                child = child.offsetParent;

                if (child === this._stageElement)  break;
                if (child === this._rootElement)  break;
                child = this.getOffsetParent(child);
                if (child === this._rootElement)  break;
            }

            /////////////////////////////////////////////////////////
            // DEBUG CODE
            /*
             var tmpMat = this.getLocalToGlobalMatrix( elt );
             var hPt = localPt.slice(0);
             MathUtils.makeDimension4( hPt );
             var tmpPt = MathUtils.transformHomogeneousPoint( hPt, tmpMat );
             var gPt = MathUtils.applyHomogeneousCoordinate( tmpPt );
             */
            /////////////////////////////////////////////////////////

            return pt;
        }