function()
    {
        if(this.get("xcoords").length < 1) 
        {
            return;
        }
        var isNumber = Y_Lang.isNumber,
            xcoords,
            ycoords,
            direction = this.get("direction"),
            len,
            lastPointValid,
            pointValid,
            noPointsRendered = true,
            lastValidX,
            lastValidY,
            nextX,
            nextY,
            i,
            styles = this.get("styles").line,
            lineType = styles.lineType,
            lc = styles.color || this._getDefaultColor(this.get("graphOrder"), "line"),
            lineAlpha = styles.alpha,
            dashLength = styles.dashLength,
            gapSpace = styles.gapSpace,
            connectDiscontinuousPoints = styles.connectDiscontinuousPoints,
            discontinuousType = styles.discontinuousType,
            discontinuousDashLength = styles.discontinuousDashLength,
            discontinuousGapSpace = styles.discontinuousGapSpace,
            path = this._getGraphic();
        if(this._stacked)
        {
            xcoords = this.get("stackedXCoords");
            ycoords = this.get("stackedYCoords");
        }
        else
        {
            xcoords = this.get("xcoords");
            ycoords = this.get("ycoords");
        }
        len = direction === "vertical" ? ycoords.length : xcoords.length;
        path.set("stroke", {
            weight: styles.weight, 
            color: lc, 
            opacity: lineAlpha
        });
        for(i = 0; i < len; i = ++i)
        {
            nextX = xcoords[i];
            nextY = ycoords[i];
            pointValid = isNumber(nextX) && isNumber(nextY); 
            if(!pointValid)
            {
                lastPointValid = pointValid;
                continue;
            }
            if(noPointsRendered)
            {
                noPointsRendered = false;
                path.moveTo(nextX, nextY);
            }
            else if(lastPointValid)
            {
                if(lineType != "dashed")
                {
                    path.lineTo(nextX, nextY);
                }
                else
                {
                    this.drawDashedLine(path, lastValidX, lastValidY, nextX, nextY, 
                                                dashLength, 
                                                gapSpace);
                }
            }
            else if(!connectDiscontinuousPoints)
            {
                path.moveTo(nextX, nextY);
            }
            else
            {
                if(discontinuousType != "solid")
                {
                    this.drawDashedLine(path, lastValidX, lastValidY, nextX, nextY, 
                                                discontinuousDashLength, 
                                                discontinuousGapSpace);
                }
                else
                {
                    path.lineTo(nextX, nextY);
                }
            }
            lastValidX = nextX;
            lastValidY = nextY;
            lastPointValid = true;
        }
        path.end();
    }