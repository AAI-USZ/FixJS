function onConnect(status)
{
    if (status == Strophe.Status.CONNECTING) {
	    $("#status").text('Connecting...');
    } else if (status == Strophe.Status.CONNFAIL) {
	    $("#status").text('Failed to connect.');
    } else if (status == Strophe.Status.DISCONNECTING) {
		$('#status').text('Disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
		$('#status').text('Disconnected.');
    } else if (status == Strophe.Status.CONNECTED) {
		$('#status').text('Connected.');
        if(window.location.pathname.substr(0,6) == "/room/"){
            talkback.roomname = window.location.pathname.replace("/room/", "");
            talkback.joinRoom(talkback.roomname+"@chat.talkback.im");            
        }else{
            talkback.roomname = "test";
            talkback.joinRoom("test@chat.talkback.im");
        }
        $("#mapname").text(talkback.roomname);
        talkback.pubsubSubscribe();


        if(navigator.geolocation) {
            //        $('a#findme').click(function(){           
            navigator.geolocation.getCurrentPosition(function(position) {
                var browserLoc = new L.LatLng(position.coords.latitude,position.coords.longitude);
                map.panTo(browserLoc);
            });
            //        });
        }


	//connection.disconnect();
    }
}