function update_time_staying_counters(){
    var time = getTime();
    for(var i in data){
	var checkin = data[i];
	var $elem = $("#time-staying-id"+checkin.id);
	var timeLeft = (parseInt(checkin.posted) + parseInt(checkin.time_staying)) - time;
	if(timeLeft < 0){
	    $("#check-in-id"+checkin.id).fadeOut(20);
	} else {
	    var s = new Date(timeLeft*1000).toTimeString().substring(0,8)
	    $elem.html(s);
	}
    }
}