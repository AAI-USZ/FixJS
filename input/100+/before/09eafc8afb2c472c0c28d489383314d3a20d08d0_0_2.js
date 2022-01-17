function(latLongFilter)
{
    var features = [];
    var latLngArray = [];
    var geopointQuestionName = null;
    var geopointQuestion = formJSONMngr.getGeoPointQuestion();
    // The following functions needed hexbin-js doesn't deal well with negatives
    function fixlng(n) { return (n < 0 ? 360 + n : n); } 
    function fixlnginv(n) { return (n > 180 ? n - 360 : n); }
    function fixlat(n) { return (n < 0 ? 90 + n : 90 + n); } 
    function fixlatinv(n) { return (n > 90 ? n - 90 : n - 90); }
    if(geopointQuestion)
        geopointQuestionName = geopointQuestion[constants.NAME];
    _(this.responses).each(function(response) {
        var gps = response[geopointQuestionName];
        if(gps)
        {
            // split gps into its parts
            var parts = gps.split(" ");
            if(parts.length > 1)
            {
                var lat = parseFloat(parts[0]);
                var lng = parseFloat(parts[1]);
                if(latLongFilter===undefined || latLongFilter(lat, lng))
                    latLngArray.push({ lat: fixlat(lat), lng: fixlng(lng), response_id: response._id});
            }
        }
    });
    try {
        hexset = d3.layout.hexbin()
                .xValue( function(d) { return d.lng; } )
                .yValue( function(d) { return d.lat; } )
                ( latLngArray );
    } catch (err) { 
        this.hexGeoJSON = {"type": "FeatureCollection", "features": []};
        this._addMetadataColumn("_id", "hexID", dv.type.nominal, _.map(latLngArray, function(x) { return undefined; }));
        return;
    };
    countMax = d3.max( hexset, function(d) { return d.data.length; } );
    var hexOfResponseID = {}, responseIDs = [], hexID = '';
    _.each(hexset, function(hex, idx) {
        if(hex.data.length) {
            hexID = 'HEX: ' + idx;
            var geometry = {"type":"Polygon", 
                            "coordinates": _(hex.points).map(function(d) {
                                    return [fixlatinv(d.y), fixlnginv(d.x)];
                                    })
                            };
            responseIDs = [];
            _(hex.data).each(function(d) {
                responseIDs.push(d.response_id);
                hexOfResponseID[d.response_id] = hexID; 
            });
            features.push({"type": "Feature", 
                           "geometry":geometry, 
                           "properties": { "id" : hexID, "responseIDs" : responseIDs }
                           });
        }
    });
    this.hexGeoJSON = {"type":"FeatureCollection", "features":features};
    this._addMetadataColumn("_id", "hexID", dv.type.nominal, hexOfResponseID);
}