function(){
    //$("#myModal").modal({backdrop: true});
    update_time_staying_counters();
    setInterval(update_time_staying_counters, 1000);
    dispatch_checkins_request();
    setTimeout(dispatch_checkins_request, 2000);
    MapApplet.init()
    MapApplet.placeAllMarkers(data);
}