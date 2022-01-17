function checkins_request_success(response){
    console.log("Response Success", response);
    var html = [];
    for(var i in response){
	if(checkin_valid(response[i]))
	    html.push(generate_checkin_listing(response[i]));
    }
    $("#checkins").html(html.join(''));
    data = response;
    MapApplet.placeAllMarkers(data);
    update_time_staying_counters();
}