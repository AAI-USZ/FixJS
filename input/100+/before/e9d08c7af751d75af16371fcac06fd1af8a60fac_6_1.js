function(event) {
            var point = webkitConvertPointFromPageToNode(this.application.ninja.stage.canvas,
                                                            new WebKitPoint(event.pageX, event.pageY));
            var x = point.x, y = point.y;
            this._useQuadPt = false;

            ///////////////////////////////////////////////////////////
            // do a 3D snap if the mouse button is not down
            this._snapIndex = -1;
            this._useQuadPt = false;
            var mouseIsDown = (this._mouseDownHitRec !== null);
            var do3DSnap = (!mouseIsDown || event.shiftKey);

            // set the snapping capabilities
            if (mouseIsDown)
            {
                snapManager.enableElementSnap   ( this._snapToElements  );
                snapManager.enableGridSnap      ( this._snapToGrid      );
            }
//          else
//          {
//              this._showFeedbackOnMouseMove(event);
//          }

            snapManager.enableElementSnap   ( snapManager.elementSnapEnabledAppLevel()  );
            snapManager.enableGridSnap      ( snapManager.gridSnapEnabledAppLevel()     );
            //snapManager.enableSnapAlign       ( snapManager.snapAlignEnabledAppLevel()    );
            snapManager.enableSnapAlign     ( false );  // only snap to element bounds (below)

            // do the snap
            var quadPt;
            if (mouseIsDown && !do3DSnap && this._shouldUseQuadPt && (this._handleMode === null) && (this._mode === 0))
                quadPt = this.GetQuadrantSnapPoint(x,y);
            var hitRec = snapManager.snap(x, y, do3DSnap, quadPt );

            snapManager.enableSnapAlign( snapManager.snapAlignEnabledAppLevel() );
            if ( snapManager.snapAlignEnabled() && this._clickedObject &&
                (this._clickedObject !== this.application.ninja.currentDocument.model.documentRoot) )
            {
                var alignBounds = !hitRec || (hitRec.getType() == hitRec.SNAP_TYPE_STAGE) || hitRec.isSomeGridTypeSnap();
                if (alignBounds)
                {
                    // calculate the delta to offset the points of the element by
                    var scrPt = this.GetObjectHitPoint();
                    scrPt = viewUtils.localToGlobal( scrPt, this._clickedObject );
                    var delta = [x-scrPt[0], y-scrPt[1]];

                    var alignArray = new Array();
                    snapManager.snapAlignToElementBounds( this._clickedObject, delta, alignArray );
                    if (alignArray.length > 0)
                        hitRec = alignArray[0];
                }
            }

            if (hitRec)
            {
                if (mouseIsDown && this._clickedObject)
                {
                    // make the hit record working plane relative
                    this._snapIndex = hitRec.getSnapBoundaryIndex();
                    this._useQuadPt = hitRec.getUseQuadPoint();
                    var wp = this._dragPlane ? this._dragPlane : workingPlane;
                    hitRec = hitRec.convertToWorkingPlane( wp );

                    // update the target
                    this._mouseUpHitRec = hitRec;
                    var pt = hitRec.getScreenPoint();
                    this.upPoint.x = pt[0];
                    this.upPoint.y = pt[1];
                    this.upPoint.z = pt[2];
                }
            }
        }