function()
{
    var responses = this.responses;
    var features = [];
    var latLngArray = [];
    var geopointQuestionName = null;
    var geopointQuestion = formJSONMngr.getGeoPointQuestion()
    if(geopointQuestion)
        geopointQuestionName = geopointQuestion["name"];
    for(idx in responses)
    {
        var response = responses[idx];
        var gps = response[geopointQuestionName];
        if(gps)
        {
            // split gps into its parts
            var parts = gps.split(" ");
            if(parts.length > 1)
            {
                var lat = parseFloat(parts[0]);
                var lng = parseFloat(parts[1]);
    
                latLngArray.push({ lat: lat,
                                   lng: (lng < 0 ? 90 - lng : lng)});
            }
        }
    }
    hexset = d3.layout.hexbin()
                .xValue( function(d) { return d.lng; } )
                .yValue( function(d) { return d.lat; } )
                ( latLngArray );
    countMax = d3.max( hexset, function(d) { return d.data.length; } );
    for(idx in hexset) { 
        hex = hexset[idx];
        var geometry = {"type":"Polygon", 
                        "coordinates": _(hex.points).map(function(d) {
                                        return [d.y, (d.x > 90 ? 90 - d.x : d.x)];
                                        })
                        };
        var feature = {"type": "Feature", 
                        "geometry":geometry, 
                        "properties": {"rawdata" :_(hex.data).map(function(d) {
                                        return {lat: d.lat, lng: (d.lng > 90 ? 90 - d.lng : d.lng)}; }),
                                       "count" : hex.data.length,
                                       "countMax" : countMax
                                      }
                      };
        features.push(feature);
    } 

    this.hexGeoJSON = {"type":"FeatureCollection", "features":features};
}