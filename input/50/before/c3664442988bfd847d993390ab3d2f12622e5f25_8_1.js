function () {
			YJ.player = new YT.Player('ytplayer', {
				height: '390',
				width: '640',
				videoId: 'cLiLSRKms30',
				events: {
					'onStateChange': that.stateChange
				}
			});
		}