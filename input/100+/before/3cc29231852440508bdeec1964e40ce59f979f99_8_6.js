function() {
            // set the element to be the viewport object - temporarily
            var tmpCanvas = this.application.ninja.stage.canvas;
            var tmpStage = this.application.ninja.currentDocument.model.documentRoot;
//          this.viewUtils.pushViewportObj( tmpCanvas );

            // save the source space object and set to the target object
            var saveSource = this._sourceSpaceElt;
            this._sourceSpaceElt = tmpStage;

            // temporarily set the line color
            var saveColor = this._lineColor;
            var saveLineWidth = this._lineWidth;

            var origLeft = 60;
            var origTop = tmpCanvas.height - 60;

            var mat = this.viewUtils.getMatrixFromElement( this._sourceSpaceElt );
            var tMat = Matrix.Translation([origLeft,origTop,0]);

            mat[12] = 0;
            mat[13] = 0;
            mat[14] = 0;

            //var resMat = tMat.multiply(mat);
            var resMat = glmat4.multiply( tMat, mat, [] );
            var origin = [0,0,0,1];

            var zoomFactor = this.application.ninja.documentBar.zoomFactor/100.0;
            var arrowSize = 50 / zoomFactor;
            var xAxis = [arrowSize,0,0,1];
            //var rO = resMat.multiply(origin);
            var rO = glmat4.multiplyVec3( resMat, origin, []);
            //var xO = resMat.multiply(xAxis);
            var xO = glmat4.multiplyVec3( resMat, xAxis, []);

            var yAxis = [0,arrowSize,0,1];
            var yO = glmat4.multiplyVec3( resMat, yAxis, []);

            var zAxis = [0,0,arrowSize,1];
            var zO = glmat4.multiplyVec3( resMat, zAxis, []);

            var saveContext = this.getDrawingSurfaceElement();
            //this.setDrawingSurfaceElement(window.stageManager.layoutCanvas);
            this.setDrawingSurfaceElement(this.application.ninja.stage.layoutCanvas);
            // clear just the 3d compass area
            this._drawingContext.save();
            this._drawingContext.rect(10, origTop-60, 100, 110);
            this._drawingContext.clip();

            this._drawingContext.lineWidth = 2.0;

            this._drawingContext.beginPath();
            this._drawingContext.strokeStyle = "red";
            this._drawingContext.moveTo(rO[0], rO[1]);
            this._drawingContext.lineTo(xO[0], xO[1]);
            this._drawingContext.closePath();
            this._drawingContext.stroke();
            this.drawArrowHead(rO, xO);

            this._drawingContext.beginPath();
            this._drawingContext.strokeStyle = "green";
            this._drawingContext.moveTo(rO[0], rO[1]);
            this._drawingContext.lineTo(yO[0], yO[1]);
            this._drawingContext.closePath();
            this._drawingContext.stroke();
            this.drawArrowHead(rO, yO);

            this._drawingContext.beginPath();
            this._drawingContext.strokeStyle = "blue";
            this._drawingContext.moveTo(rO[0], rO[1]);
            this._drawingContext.lineTo(zO[0], zO[1]);
            this._drawingContext.closePath();
            this._drawingContext.stroke();
            this.drawArrowHead(rO, zO);

            // restore the state
//          this.viewUtils.popViewportObj();
            this._drawingContext.restore();
            this.setDrawingSurfaceElement(saveContext);
            this._lineColor = saveColor;
            this._lineWidth = saveLineWidth;
            this._sourceSpaceElt = saveSource;
        }