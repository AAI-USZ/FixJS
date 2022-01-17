function(val)
    {
        var dir = this.get("direction"), 
            sc = val || [], 
            catAxis,
            valAxis,
            tempKeys = [],
            series,
            seriesKeys = this.get("seriesKeys").concat(),
            i,
            index,
            l,
            type = this.get("type"),
            key,
            catKey,
            seriesKey,
            graph,
            categoryKey = this.get("categoryKey"),
            showMarkers = this.get("showMarkers"),
            showAreaFill = this.get("showAreaFill"),
            showLines = this.get("showLines");
        if(dir == "vertical")
        {
            catAxis = "yAxis";
            catKey = "yKey";
            valAxis = "xAxis";
            seriesKey = "xKey";
        }
        else
        {
            catAxis = "xAxis";
            catKey = "xKey";
            valAxis = "yAxis";
            seriesKey = "yKey";
        }
        l = sc.length;
        for(i = 0; i < l; ++i)
        {
            key = this._getBaseAttribute(sc[i], seriesKey);
            if(key)
            {
                index = Y.Array.indexOf(seriesKeys, key);
                if(index > -1)
                {
                    seriesKeys.splice(index, 1);
                }
               tempKeys.push(key);
            }
        }
        if(seriesKeys.length > 0)
        {
            tempKeys = tempKeys.concat(seriesKeys);
        }
        l = tempKeys.length;
        for(i = 0; i < l; ++i)
        {
            series = sc[i] || {type:type};
            if(series instanceof Y.CartesianSeries)
            {
                this._parseSeriesAxes(series);
                continue;
            }
            
            series[catKey] = series[catKey] || categoryKey;
            series[seriesKey] = series[seriesKey] || seriesKeys.shift();
            series[catAxis] = this._getCategoryAxis();
            series[valAxis] = this._getSeriesAxis(series[seriesKey]);
            
            series.type = series.type || type;
            series.direction = series.direction || dir;
            
            if((series.type == "combo" || series.type == "stackedcombo" || series.type == "combospline" || series.type == "stackedcombospline"))
            {
                if(showAreaFill !== null)
                {
                    series.showAreaFill = (series.showAreaFill !== null && series.showAreaFill !== undefined) ? series.showAreaFill : showAreaFill;
                }
                if(showMarkers !== null)
                {
                    series.showMarkers = (series.showMarkers !== null && series.showMarkers !== undefined) ? series.showMarkers : showMarkers;
                }
                if(showLines !== null)
                {
                    series.showLines = (series.showLines !== null && series.showLines !== undefined) ? series.showLines : showLines;
                }
            }
            sc[i] = series;
        }
        if(val)
        {
            graph = this.get("graph");
            graph.set("seriesCollection", sc);
            sc = graph.get("seriesCollection");
        }
        return sc;
    }