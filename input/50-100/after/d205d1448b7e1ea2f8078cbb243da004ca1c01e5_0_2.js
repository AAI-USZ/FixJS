function(data) {
			var response = data.response;
			sessionId = response.session_id;
			$("#_session_id").val(sessionId);
			// update helper link to show session Info
			var siteURL = "http://"+apiHost+"/api/v4/playlist/dynamic/info?api_key=" + apiKey + "&session_id=" + sessionId ;
			$('._en_site').show().children().attr('href', siteURL );

			$("a._history_url").attr("href", "http://developer.echonest.com");
			console.log( "Session ID = " + sessionId );
			getNextSong();
		}