function(latLongFilter)
{
    var responses = this.responses;
    var features = [];
    var latLngArray = [];
    var geopointQuestionName = null;
    var geopointQuestion = formJSONMngr.getGeoPointQuestion()
    // The following functions needed hexbin-js doesn't deal well with negatives
    function fixlng(n) { return (n < 0 ? 360 + n : n); }; 
    function fixlnginv(n) { return (n > 180 ? n - 360 : n); };
    function fixlat(n) { return (n < 0 ? 90 + n : 90 + n); }; 
    function fixlatinv(n) { return (n > 90 ? n - 90 : n - 90); };
    if(geopointQuestion)
        geopointQuestionName = geopointQuestion["name"];
    _.each(responses, function(response) {
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
                    latLngArray.push({ lat: fixlat(lat), lng: fixlng(lng), response: response});
            }
        }
    });
    hexset = d3.layout.hexbin()
                .xValue( function(d) { return d.lng; } )
                .yValue( function(d) { return d.lat; } )
                ( latLngArray );
    countMax = d3.max( hexset, function(d) { return d.data.length; } );
    _.each(hexset, function(hex) {
        if(hex.data.length) {
            var geometry = {"type":"Polygon", 
                            "coordinates": _(hex.points).map(function(d) {
                                    return [fixlatinv(d.y), fixlnginv(d.x)];
                                    })
                            };
            var feature = {"type": "Feature", 
                           "geometry":geometry, 
                           "properties": {"rawdata" :_(hex.data).map(function(d) {
                                                return {lat: fixlatinv(d.lat), lng: fixlnginv(d.lng), response: d.response}; }),
                                           "count" : hex.data.length,
                                           "countMax" : countMax
                                          }
                           };
                features.push(feature);
        }
    });

    this.hexGeoJSON = {"type":"FeatureCollection", "features":features};
}