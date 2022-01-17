function () {
			YJ.player = new YT.Player('ytplayer', {
				height: '390',
				width: '640',
				events: {
					'onStateChange': that.stateChange
				}
			});
		}