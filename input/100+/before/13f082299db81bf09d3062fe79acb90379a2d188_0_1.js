function(id){
		switch(id){
			case "change":
				this.aC.currentMenuPos = 1;
				this.aC.videoSelected = false;
				this.yt.stopVideo();
				dojo.addClass("control-list","inactive");
				dojo.query('#control-list li').removeClass('selected');
				dojo.query('#video-list li:nth-child('+(this.aC.currentPlaylistPos+1)+')').addClass('selected');
				dojo.query('#video-list li').removeClass('nowplaying');
			break;
			case "playpause":
				if (ytplayer) {
					if (playerState() == this.aC.ps.playing) dojo.byId('playpause').innerHTML = 'Play';
					else if (playerState() == this.aC.ps.paused) dojo.byId('playpause').innerHTML = 'Pause';
				}
				this.playPause();
			break;
			case "beginning":
				this.yt.seekTo(0);
			break;
			case "back":
				var currentTime = this.yt.getCurrentTime();
				if (currentTime > 10) this.yt.seekTo(currentTime - 10);
				else this.yt.seekTo(0);
			break;
			case "forward":
				var currentTime = this.yt.getCurrentTime(), duration = this.yt.getDuration();
				if (currentTime < (duration - 10)) this.yt.seekTo(currentTime + 10);
				else this.yt.seekTo(duration);
			break;
			case "related":
				var vIndex = ((this.aC.currentPlaylistPage - 1) * this.aC.vThumbs) + (this.aC.currentPlaylistPos - 1);
				var vid = this.aC.playlistArr[vIndex].id;
				this.getVideos('related',vid);
				this.controlList('change');
			break;
		}
	}