function()
    {
        var seriesCollection,
            dataProvider = this.get("dataProvider");
        if(dataProvider)
        {
            seriesCollection = this._parseSeriesCollection();
        }
        return seriesCollection;
    }