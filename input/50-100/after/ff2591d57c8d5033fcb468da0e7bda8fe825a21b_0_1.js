function(response) {
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
                    latLngArray.push({ lat: fixlat(lat), lng: fixlng(lng)});
            }
        }
    }