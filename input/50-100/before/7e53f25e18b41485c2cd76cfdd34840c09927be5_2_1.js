function(dataProvider)
    {
        var allKeys,
            catKey = this.get("categoryKey"),
            keys = [],
            i;
        if(this._seriesKeys)
        {
            return this._seriesKeys;
        }
        allKeys = this._getAllKeys(dataProvider);
        for(i in allKeys)
        {
            if(allKeys.hasOwnProperty(i) && i != catKey)
            {
                keys.push(i);
            }
        }
        return keys;
    }