function(session,prevmsg) {

		dataString = "action=getStreamStatus&session=" + session + "&msg=" + encodeURIComponent(prevmsg);

		$.getJSON("bin/backend.php",

		dataString,

		function(data){	

			status_OnComplete(data)

		});

	}