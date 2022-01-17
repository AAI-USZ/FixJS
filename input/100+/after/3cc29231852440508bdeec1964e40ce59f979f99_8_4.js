function(eltArray, drawSelectionCube) {
            this._selectionCtr = null;
            var len = eltArray.length,
                i,
                j,
                bounds,
                bounds3D,
                pt,
                tmpPt,
                ssMat,
                ssMatInv,
                elt,
                dir,
                ctr,
                stageInfo,
                stageComponent = this.application.ninja.stage,
                context;
            
            if (len === 0)  return;
            context = stageComponent.context;
            if(!context) return;
            // TODO - Get values from app settings
            context.strokeStyle = "#46a1ff";
            context.lineWidth = 1;

            // for drawing, we need scrollLeft, scrollTop, and zoom factor from the stage
            var zoomFactor = stageComponent.zoomFactor;
            if(zoomFactor !== 1) {
                stageInfo = {zoomFactor: zoomFactor, scrollLeft: stageComponent._scrollLeft*(zoomFactor - 1), scrollTop: stageComponent._scrollTop*(zoomFactor - 1)};
            }

            // handle the single element case
            // TODO - Currently, the stage draws its own selection bounds for single selection case
            if (len === 1)
            {
//                console.log( "single selection" );
                elt = eltArray[0];
                bounds3D = this.drawElementBoundingBox(elt, context, stageInfo);
                this._selectionCtr = [0,0,0];
                dir = vecUtils.vecSubtract(2, bounds3D[1], bounds3D[3]);
                ctr = vecUtils.vecNormalize(2, dir, vecUtils.vecDist(2, bounds3D[1], bounds3D[3])/2);

                this._selectionCtr[0] += ctr[0] - this.application.ninja.stage.userContentLeft;
                this._selectionCtr[1] += ctr[1] - this.application.ninja.stage.userContentTop;
            }
            else
            {
                // get the plane from the first element to compare against the other elements
                var dot;
                var flat = true;
                var plane = this.viewUtils.getUnprojectedElementPlane( eltArray[0] );
                for (i=1;  i<len;  i++)
                {
                    elt = eltArray[i];
                    var plane2 = this.viewUtils.getUnprojectedElementPlane( elt );
                    dot = Math.abs( MathUtils.dot3(plane,plane2) );
                    if (MathUtils.fpCmp(dot, 1) != 0)
                    {
                        flat = false;
                        break;
                    }

                    // check the offset
                    var d = plane[3],  d2 = plane2[3];
                    if (MathUtils.fpCmp(d,d2) != 0)
                    {
                        flat = false;
                        break;
                    }
                }

                // if all of the planes are aligned, check if they are aligned with the view direction
                if (flat)
                {
                    var stage = this.application.ninja.currentDocument.model.documentRoot;
                    var stageMat = this.viewUtils.getMatrixFromElement(stage);
                    var viewDir = [ stageMat[8], stageMat[9], stageMat[10] ];
                    viewDir = vecUtils.vecNormalize( 3, viewDir );
                    dot = Math.abs( MathUtils.dot3(plane,viewDir) );
                    if (MathUtils.fpCmp(dot, 1) != 0)
                        flat = false;
                }
//                console.log( "drawSelectionBounds, flat: " + flat );

                // if all the elements share the same plane, draw the 2D rectangle
                if (flat)
                {
                    // make a 2D rectangle on the plane
                    var rect;
                    for (i=0;  i<len;  i++)
                    {
                        elt = eltArray[i];

                        bounds = this.drawElementBoundingBox(elt, context, stageInfo);

                        if(drawSelectionCube) {
                            for (j=0;  j<4;  j++)
                            {
                                pt = bounds[j];
                                if (!rect)
                                {
                                    rect = Object.create(Rectangle, {});
                                    rect.setToPoint( pt )
                                }
                                else
                                {
                                    rect.unionPoint( pt );
                                }
                            }
                        }
                    }

                    if(rect) {
                        context.lineWidth = 2;
                        // draw the multi-selection rectangle
                        context.beginPath();

                        pt = MathUtils.makeDimension3(rect.getPoint(3));

                        bounds3D = [[0,0], [0,0], [0,0], [0,0]];
                        this._selectionCtr = pt.slice(0);

                        context.moveTo( pt[0],  pt[1] );
                        for (i=0;  i<4;  i++) {
                            pt = rect.getPoint(i);
                            context.lineTo( pt[0],  pt[1] );
                            bounds3D[i] = pt.slice(0);
                        }
                        context.closePath();
                        context.stroke();

                        dir = vecUtils.vecSubtract(2, bounds3D[1], bounds3D[3]);
                        ctr = vecUtils.vecNormalize(2, dir, vecUtils.vecDist(2, bounds3D[1], bounds3D[3])/2);

                        this._selectionCtr[0] += ctr[0] - this.application.ninja.stage.userContentLeft;
                        this._selectionCtr[1] += ctr[1] - this.application.ninja.stage.userContentTop;
                    }
                }
                else
                {
                    if(drawSelectionCube) {
                        var minPt, maxPt, x, y, z,
                            saveRoot = this.viewUtils.getRootElement();

                        // we set the root to "the world".
                        this.viewUtils.setRootElement( this.viewUtils.getStageElement() );
                        ssMat = this.viewUtils.getLocalToGlobalMatrix( this._sourceSpaceElt );  // stageToGlobal
                        ssMatInv = glmat4.inverse(ssMat, []);   // globalToStageWorld
                        this.viewUtils.setRootElement( saveRoot );

                        for (i=0;  i<len;  i++) {
                            elt = eltArray[i];
                            bounds = this.drawElementBoundingBox(elt, context, stageInfo);
                            for (j=0;  j<4;  j++) {
                                pt = MathUtils.transformAndDivideHomogeneousPoint( bounds[j], ssMatInv );

                                if (!minPt) {
                                    minPt = pt.slice(0);
                                    maxPt = pt.slice(0);
                                } else {
                                    x = pt[0];
                                    y = pt[1];
                                    z = pt[2];

                                    if (x < minPt[0])    minPt[0] = x;
                                    if (x > maxPt[0])    maxPt[0] = x;

                                    if (y < minPt[1])    minPt[1] = y;
                                    if (y > maxPt[1])    maxPt[1] = y;

                                    if (z < minPt[2])    minPt[2] = z;
                                    if (z > maxPt[2])    maxPt[2] = z;
                                }
                            }
                        }

                        context.beginPath();
                        var x0 = minPt[0],  y0 = minPt[1],  z0 = minPt[2],
                            x1 = maxPt[0],  y1 = maxPt[1],  z1 = maxPt[2];

                        var stageWorldCtr = [ 0.5*(x0 + x1),  0.5*(y0 + y1), 0.5*(z0 + z1) ];
                        this._selectionCtr = MathUtils.transformAndDivideHomogeneousPoint( stageWorldCtr, ssMat );

                        // get the 8 corners of the parallelpiped in world space
                        var wc = new Array();   // wc == world cube
                        wc.push(  this.viewUtils.localToGlobal2( [x0,y0,z1], ssMat ) );
                        wc.push(  this.viewUtils.localToGlobal2( [x0,y1,z1], ssMat ) );
                        wc.push(  this.viewUtils.localToGlobal2( [x1,y1,z1], ssMat ) );
                        wc.push(  this.viewUtils.localToGlobal2( [x1,y0,z1], ssMat ) );
                        wc.push(  this.viewUtils.localToGlobal2( [x0,y0,z0], ssMat ) );
                        wc.push(  this.viewUtils.localToGlobal2( [x0,y1,z0], ssMat ) );
                        wc.push(  this.viewUtils.localToGlobal2( [x1,y1,z0], ssMat ) );
                        wc.push(  this.viewUtils.localToGlobal2( [x1,y0,z0], ssMat ) );

                        // determine the signs of the normals of the faces relative to the view direction.
                        var front    = -MathUtils.fpSign( vecUtils.vecCross(3, vecUtils.vecSubtract(3,wc[2],wc[1]), vecUtils.vecSubtract(3,wc[0],wc[1]))[2] ),
                            right   = -MathUtils.fpSign( vecUtils.vecCross(3, vecUtils.vecSubtract(3,wc[6],wc[2]), vecUtils.vecSubtract(3,wc[3],wc[2]))[2] ),
                            back    = -MathUtils.fpSign( vecUtils.vecCross(3, vecUtils.vecSubtract(3,wc[5],wc[6]), vecUtils.vecSubtract(3,wc[7],wc[6]))[2] ),
                            left    = -MathUtils.fpSign( vecUtils.vecCross(3, vecUtils.vecSubtract(3,wc[1],wc[5]), vecUtils.vecSubtract(3,wc[4],wc[5]))[2] ),
                            top     = -MathUtils.fpSign( vecUtils.vecCross(3, vecUtils.vecSubtract(3,wc[3],wc[0]), vecUtils.vecSubtract(3,wc[4],wc[0]))[2] ),
                            bottom  = -MathUtils.fpSign( vecUtils.vecCross(3, vecUtils.vecSubtract(3,wc[5],wc[1]), vecUtils.vecSubtract(3,wc[2],wc[1]))[2] );

                        // draw the side faces
                        var p;

                        //context.strokeStyle = ((front > 0) || (right > 0)) ? dark : light;  context.beginPath();
                        if ((front > 0) || (right > 0)) {
                            context.beginPath();
                            p = this.viewUtils.localToGlobal2( [x1, y0, z1], ssMat );  context.moveTo( p[0], p[1] );
                            p = this.viewUtils.localToGlobal2( [x1, y1, z1], ssMat );  context.lineTo( p[0], p[1] );
                            context.closePath();  context.stroke();
                        }

                        //context.strokeStyle = ((right > 0) || (back > 0)) ? dark : light;  context.beginPath();
                        if ((right > 0) || (back > 0)) {
                            context.beginPath();
                            p = this.viewUtils.localToGlobal2( [x1, y0, z0], ssMat );  context.moveTo( p[0], p[1] );
                            p = this.viewUtils.localToGlobal2( [x1, y1, z0], ssMat );  context.lineTo( p[0], p[1] );
                            context.closePath();  context.stroke();
                        }

                        //context.strokeStyle = ((back > 0) || (left > 0)) ? dark : light;  context.beginPath();
                        if ((back > 0) || (left > 0)) {
                            context.beginPath();
                            p = this.viewUtils.localToGlobal2( [x0, y0, z0], ssMat );  context.moveTo( p[0], p[1] );
                            p = this.viewUtils.localToGlobal2( [x0, y1, z0], ssMat );  context.lineTo( p[0], p[1] );
                            context.closePath();  context.stroke();
                        }

                        //context.strokeStyle = ((left > 0) || (front > 0)) ? dark : light;  context.beginPath();
                        if ((left > 0) || (front > 0)) {
                            context.beginPath();
                            p = this.viewUtils.localToGlobal2( [x0, y0, z1], ssMat );  context.moveTo( p[0], p[1] );
                            p = this.viewUtils.localToGlobal2( [x0, y1, z1], ssMat );  context.lineTo( p[0], p[1] );
                            context.closePath();  context.stroke();
                        }

                        // draw the top and bottom faces
                        //context.strokeStyle = ((front > 0) || (top > 0)) ? dark : light;  context.beginPath();
                        if ((front > 0) || (top > 0)) {
                            context.beginPath();
                            p = this.viewUtils.localToGlobal2( [x0, y0, z1], ssMat );  context.moveTo( p[0], p[1] );
                            p = this.viewUtils.localToGlobal2( [x1, y0, z1], ssMat );  context.lineTo( p[0], p[1] );
                            context.closePath();  context.stroke();
                        }

                        //context.strokeStyle = ((top > 0) || (back > 0)) ? dark : light;  context.beginPath();
                        if ((top > 0) || (back > 0)) {
                            context.beginPath();
                            p = this.viewUtils.localToGlobal2( [x0, y0, z0], ssMat );  context.moveTo( p[0], p[1] );
                            p = this.viewUtils.localToGlobal2( [x1, y0, z0], ssMat );  context.lineTo( p[0], p[1] );
                            context.closePath();  context.stroke();
                        }

                        //context.strokeStyle = ((back > 0) || (bottom > 0)) ? dark : light;  context.beginPath();
                        if ((back > 0) || (bottom > 0)) {
                            context.beginPath();
                            p = this.viewUtils.localToGlobal2( [x0, y1, z0], ssMat );  context.moveTo( p[0], p[1] );
                            p = this.viewUtils.localToGlobal2( [x1, y1, z0], ssMat );  context.lineTo( p[0], p[1] );
                            context.closePath();  context.stroke();
                        }

                        //context.strokeStyle = ((bottom > 0) || (front > 0)) ? dark : light;  context.beginPath();
                        if ((bottom > 0) || (front > 0)) {
                            context.beginPath();
                            p = this.viewUtils.localToGlobal2( [x0, y1, z1], ssMat );  context.moveTo( p[0], p[1] );
                            p = this.viewUtils.localToGlobal2( [x1, y1, z1], ssMat );  context.lineTo( p[0], p[1] );
                            context.closePath();  context.stroke();
                        }

                        // and the remaining lines - varying Z
                        if ((top > 0) || (right > 0)) {
                            context.beginPath();
                            p = this.viewUtils.localToGlobal2( [x1, y0, z0], ssMat );  context.moveTo( p[0], p[1] );
                            p = this.viewUtils.localToGlobal2( [x1, y0, z1], ssMat );  context.lineTo( p[0], p[1] );
                            context.closePath();  context.stroke();
                        }

                        //context.strokeStyle = ((right > 0) || (bottom > 0)) ? dark : light;  context.beginPath();
                        if ((right > 0) || (bottom > 0)) {
                            context.beginPath();
                            p = this.viewUtils.localToGlobal2( [x1, y1, z0], ssMat );  context.moveTo( p[0], p[1] );
                            p = this.viewUtils.localToGlobal2( [x1, y1, z1], ssMat );  context.lineTo( p[0], p[1] );
                            context.closePath();  context.stroke();
                        }

                        //context.strokeStyle = ((bottom > 0) || (left > 0)) ? dark : light;  context.beginPath();
                        if ((bottom > 0) || (left > 0)) {
                            context.beginPath();
                            p = this.viewUtils.localToGlobal2( [x0, y1, z0], ssMat );  context.moveTo( p[0], p[1] );
                            p = this.viewUtils.localToGlobal2( [x0, y1, z1], ssMat );  context.lineTo( p[0], p[1] );
                            context.closePath();  context.stroke();
                        }

                        //context.strokeStyle = ((left > 0) || (top > 0)) ? dark : light;  context.beginPath();
                        if ((left > 0) || (top > 0)) {
                            context.beginPath();
                            p = this.viewUtils.localToGlobal2( [x0, y0, z0], ssMat );  context.moveTo( p[0], p[1] );
                            p = this.viewUtils.localToGlobal2( [x0, y0, z1], ssMat );  context.lineTo( p[0], p[1] );
                            context.closePath();  context.stroke();
                        }
                    } else {
                        for (i=0;  i<len;  i++) {
                            elt = eltArray[i];
                            bounds = this.drawElementBoundingBox(elt, context, stageInfo);
                        }
                    }
                }
            }
        }