function(val)
        {
            var dataProvider = this._setDataValues(val);
            if(!this._seriesKeysExplicitlySet)
            {
                this._seriesKeys = this._buildSeriesKeys(dataProvider);
            }
            return dataProvider;
        }