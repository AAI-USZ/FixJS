function () {

		var partyParams = partyMachine.getUrlParams();
		var feedUrl = partyFeedUrl + "?jsoncallback=?" + '&id=' + partyParams["id"];

		$.ajax({
			url: feedUrl,
			jsonp: true,
			dataType: 'json',
			success: function (data) {

				mediaPlayer.update(data.media);
			}
		});

		_mediaTimeoutTimer = window.setTimeout("window.partyMachine.updateMediaTimeout()", _mediaTimeoutTimerDelay);
	}