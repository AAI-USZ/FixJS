function(){
    //$("#myModal").modal({backdrop: true});
    $('.close').click(function(e){$(this).parent().fadeOut(1000);});
    update_time_staying_counters();
    setInterval(update_time_staying_counters, 1000);
    dispatch_checkins_request();
    setInterval(dispatch_checkins_request, 2000);
    //setTimeout(dispatch_checkins_request, 2000);
    MapApplet.init()
    MapApplet.placeAllMarkers(data);
}