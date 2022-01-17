function checkins_request_success(response){
    console.log("Response Success", response);
    var html = [];
    //MapApplet.clearAllMarkers(data);
    var goodData = [];
    for(var i in response){
	if(checkin_valid(response[i])){
	    html.push(generate_checkin_listing(response[i]));
	    goodData.push(response[i]);
	}
    }
    $("#checkins").html(html.join(''));
    MapApplet.updateMarkers(goodData);
    data = response;
    update_time_staying_counters();
}