function onGPSSuccess(pos){
    var myLat = pos.coords.latitude;
    var myLon = pos.coords.longitude;
    var distance = haversine(myLon, myLat, venueObj.lon, venueObj.lat);
    console.log(distance);
    if (distance<=100){
        console.log('button enabled');
        $('#btnCheckin').removeClass('ui-disabled');
        $("input[type='checkbox']").checkboxradio('enable');
    }

}