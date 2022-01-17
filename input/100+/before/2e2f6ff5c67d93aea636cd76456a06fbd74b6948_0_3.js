function playvideo(session,name) {

	var prevmsg="";

	var status_OnComplete = function(data) {

		streaming = $('#streaming');

		var status = data.status;

		var message = data.message;

		var url = data.url;

		var time = new Date();

		var thumbwidth = streaming.find('span[rel="thumbwidth"]').text();

		var thumbheight = streaming.find('span[rel="thumbheight"]').text();

		streaming.find('ul[class="streamstatus"]').find('span[class="mode"]').html(message);

		if ( status == "ready" || status == "error" ) {

		streaming.find('#player').removeAttr("style");	

		streaming.find('#player').html('<video id="videofeed" src="' + url + '" controls autoplay ></video><span rel="ready"></span>');



			return false;

			}

		prevmsg = message;

		status_Start(session,prevmsg);

	}

	

	var status_Start = function(session,prevmsg) {

		dataString = "action=getStreamStatus&session=" + session + "&msg=" + encodeURIComponent(prevmsg);

		$.getJSON("bin/backend.php",

		dataString,

		function(data){	

			status_OnComplete(data)

		});

	}

	status_Start(session,prevmsg);

}