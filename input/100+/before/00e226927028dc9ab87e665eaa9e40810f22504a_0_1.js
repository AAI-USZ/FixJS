function()
{
    var features = [];
    var geopointQuestionName = null;
    var geopointQuestion = formJSONMngr.getGeoPointQuestion();
    if(geopointQuestion)
        geopointQuestionName = geopointQuestion[constants.NAME];
    _(this.responses).each(function (response) {
        var gps = response[geopointQuestionName];
        if(gps)
        {
            // split gps into its parts
            var parts = gps.split(" ");
            if(parts.length > 1)
            {
                var lng = parts[0];
                var lat = parts[1];

                var geometry = {"type":"Point", "coordinates": [lat, lng]};
                var feature = {"type": "Feature", "id": response._id, "geometry":geometry, "properties":response};
                features.push(feature);
            }
        }
    });

    this.geoJSON = {"type":"FeatureCollection", "features":features};
}