function ()
        {
            this.application.ninja.stage.clearGridCanvas();
            this.drawStageOutline();
            if (this.isDrawingGrid()) {
                var saveContext = this.getDrawingSurfaceElement();
                this.setDrawingSurfaceElement(this.application.ninja.stage.gridCanvas);

                // 3 coordinate axes for the plane
                var zAxis = [this._workingPlane[0], this._workingPlane[1], this._workingPlane[2]];

                // get a point that lies on the plane
                var ptOnPlane = MathUtils.getPointOnPlane(this._workingPlane);

                // define the grid parameters
                var width = this.snapManager.getStageWidth(),
                    height = this.snapManager.getStageHeight(),
                    nLines = 10;

                // get a matrix from working plane space to the world
                var mat = this.getPlaneToWorldMatrix(zAxis, ptOnPlane);
                var tMat = Matrix.Translation( [0.5*width, 0.5*height, 0] );
                //mat = tMat.multiply(mat);
                glmat4.multiply( tMat, mat, mat);

                // the positioning of the grid may depend on the view direction.
                var stage = this.snapManager.getStage();
                var viewMat = this.viewUtils.getMatrixFromElement(stage);
                var viewDir = [viewMat[8], viewMat[9], viewMat[10]];

                var dx, dy, delta, pt0, pt1;
                dx = this._gridVerticalSpacing;
                dy = this._gridHorizontalSpacing;
                nLines = Math.floor(width / dx) + 1;
                if (MathUtils.fpCmp(dx*nLines,width) == 0)  nLines--;

                var saveColor = this._lineColor;
                var saveLineWidth = this._drawingContext.lineWidth;

                // reset the line cache
                this._gridLineArray = new Array();

                if (this.drawXY) this._lineColor = "red";
                if (this.drawYZ) this._lineColor = "green";
                if (this.drawXZ) this._lineColor = "blue";
                this._drawingContext.lineWidth = 0.25;

                // get the two endpoints of the first line with constant X
                pt0 = [-width / 2.0, height / 2.0, 0];
                pt1 = [-width / 2.0, -height / 2.0, 0];
                delta = [dx, 0, 0];

                this._gridVerticalLineCount = nLines;
                this._gridOrigin = pt1.slice(0);

                // draw the lines with constant X
                this.drawGridLines(pt0, pt1, delta, mat, nLines);

                // get the two endpoints of the first line with constant Y
                pt0 = [-width / 2.0, -height / 2.0, 0];
                pt1 = [width / 2.0, -height / 2.0, 0];

                delta = [0, dy, 0];
                nLines = Math.floor(height / dy) + 1;
                if (MathUtils.fpCmp(dy*nLines,height) == 0)  nLines--;

                this._gridHorizontalLineCount = nLines;

                // draw the lines with constant Y
                this.drawGridLines(pt0, pt1, delta, mat, nLines);

                this._lineColor = saveColor;
                this._drawingContext.lineWidth = saveLineWidth;

                // draw the lines
                this.redrawGridLines();

                this.setDrawingSurfaceElement(saveContext);
            }
            this.draw3DCompass();
        }