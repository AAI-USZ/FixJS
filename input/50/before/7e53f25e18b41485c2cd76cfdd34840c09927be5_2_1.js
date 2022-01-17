function()
        {
            var defDataProvider = [];
            if(!this._seriesKeysExplicitlySet)
            {
                this._seriesKeys = this._buildSeriesKeys(defDataProvider);
            }
            return defDataProvider;
        }