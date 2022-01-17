function(response) {
        var gps = response[geopointQuestionName];
        if(gps && gps[0] && gps[1])
        {
            var lat = gps[0];
            var lng = gps[1];
            if(latLongFilter===undefined || latLongFilter(lat, lng))
                latLngArray.push({ lat: fixlat(lat), lng: fixlng(lng), response_id: response._id});
        }
    }