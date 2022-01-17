function(params, start, limit)
{
    var thisFormResponseMngr = this;

    /// invalidate all derivative data 
    this.geoJSON = null;
    this.dtData = null;
    this.hexGeoJSON = null;

    /// append select-one filters to params
    if(formJSONMngr._currentSelectOneQuestionName)
    {
        var questionName = formJSONMngr._currentSelectOneQuestionName;
        var orFilters = [];
        for(idx in this._select_one_filters)
        {
            var responseName =  this._select_one_filters[idx];
            if(responseName == notSpecifiedCaption)
                orFilters.push(null);
            else
                orFilters.push(responseName);
        }
        if(orFilters.length > 0)
        {
            var inParam = {'$in': orFilters};
            params[questionName] = inParam;
        }
    }
    var urlParams = {'query':JSON.stringify(params)};
    start = parseInt(start)
        // use !isNaN so we also have zeros
    if(!isNaN(start))
        urlParams['start'] = start
    limit = parseInt(limit)
    if(!isNaN(limit))
        urlParams['limit'] = limit
    // first do the count
    urlParams['count'] = 1
    $.getJSON(thisFormResponseMngr.url, urlParams).success(function(data){
            thisFormResponseMngr.responseCount = data[0]['count']
            urlParams['count'] = 0
            $.getJSON(thisFormResponseMngr.url, urlParams, function(data){
                thisFormResponseMngr.responses = data;
                thisFormResponseMngr.callback.call(thisFormResponseMngr);
            })
        })
}