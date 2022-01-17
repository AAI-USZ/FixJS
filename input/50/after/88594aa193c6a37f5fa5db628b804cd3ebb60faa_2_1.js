function()
    {
        this._closeRecordDetails();
        this._scheduleRefresh(false);
        this._timelineGrid.gridHeaderElement.style.width = this._itemsGraphsElement.offsetWidth + "px";
    }