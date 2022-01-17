function()
    {
        var marker,
            markers = this.get("markers");
        if(this.get("rendered"))
        {
            if(this._xDataReadyHandle)
            {
                this._xDataReadyHandle.detach();
            }
            if(this._xDataUpdateHandle)
            {
                this._xDataUpdateHandle.detach();
            }
            if(this._yDataReadyHandle)
            {
                this._yDataReadyHandle.detach();
            }
            if(this._yDataUpdateHandle)
            {
                this._yDataUpdateHandle.detach();
            }
            this._xAxisChangeHandle.detach();
            this._yAxisChangeHandle.detach();
            this._stylesChangeHandle.detach();
            this._widthChangeHandle.detach();
            this._heightChangeHandle.detach();
            this._visibleChangeHandle.detach();
        }
        while(markers && markers.length > 0)
        {
            marker = markers.shift();
            if(marker && marker instanceof Y.Shape)
            {
                marker.destroy();
            }
        }
        if(this._path)
        {
            this._path.destroy();
            this._path = null;
        }
        if(this._lineGraphic)
        {
            this._lineGraphic.destroy();
            this._lineGraphic = null;
        }
        if(this._groupMarker)
        {
            this._groupMarker.destroy();
            this._groupMarker = null;
        }
    }