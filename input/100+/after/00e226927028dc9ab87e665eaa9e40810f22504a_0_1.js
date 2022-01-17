function()
{
    var features = [];
    var geopointQuestionName = constants.GEOLOCATION;
    _(this.responses).each(function (response) {
        var gps = response[geopointQuestionName];
        if(gps && gps[0] && gps[1])
        {
            var lat = gps[0];
            var lng = gps[1];

            var geometry = {"type":"Point", "coordinates": [lng, lat]};
            var feature = {"type": "Feature", "id": response._id, "geometry":geometry, "properties":response};
            features.push(feature);
        }
    });

    this.geoJSON = {"type":"FeatureCollection", "features":features};
}