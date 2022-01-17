function()
    {
        var xAxis = this.get("xAxis"),
            yAxis = this.get("yAxis");
        if(xAxis)
        {
            this._xDataReadyHandle = xAxis.after("dataReady", Y.bind(this._xDataChangeHandler, this));
            this._xDataUpdateHandle = xAxis.after("dataUpdate", Y.bind(this._xDataChangeHandler, this));
        }
        if(yAxis)
        {
            this._yDataReadyHandle = yAxis.after("dataReady", Y.bind(this._yDataChangeHandler, this));
            this._yDataUpdateHandle = yAxis.after("dataUpdate", Y.bind(this._yDataChangeHandler, this));
        }
        this._xAxisChangeHandle = this.after("xAxisChange", this._xAxisChangeHandler);
        this._yAxisChangeHandle = this.after("yAxisChange", this._yAxisChangeHandler);
        this._stylesChangeHandle = this.after("stylesChange", function(e) {
            var axesReady = this._updateAxisData();
            if(axesReady)
            {
                this.draw();
            }
        });
        this._widthChangeHandle = this.after("widthChange", function(e) {
            var axesReady = this._updateAxisData();
            if(axesReady)
            {
                this.draw();
            }
        });
        this._heightChangeHandle = this.after("heightChange", function(e) {
            var axesReady = this._updateAxisData();
            if(axesReady)
            {
                this.draw();
            }
        });
        this._visibleChangeHandle = this.after("visibleChange", this._handleVisibleChange);
    }