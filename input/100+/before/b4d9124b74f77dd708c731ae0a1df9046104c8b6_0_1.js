function(event) {
				var item = event.data;
				if (that.gMM.sequencer.view == null) return;
				var list = that.gMM.sequencer.view.mediaList;

				switch (event.type) {
					case Components.interfaces.sbIMediacoreEvent.TRACK_CHANGE:
						var artist = gMM.sequencer.currentItem.getProperty(SBProperties.artistName);
						var album = gMM.sequencer.currentItem.getProperty(SBProperties.albumName);
						var track = gMM.sequencer.currentItem.getProperty(SBProperties.trackName);
						that.unityServiceProxy.SoundMenuSetTrackInfo(artist, album, track, null);
						break;
						
					case Components.interfaces.sbIMediacoreEvent.STREAM_START:
						that.unityServiceProxy.SoundMenuSetPlayingState(UNITY_PLAYBACK_STATE_PLAYING);
						break;
						
					case Components.interfaces.sbIMediacoreEvent.STREAM_PAUSE:
						that.unityServiceProxy.SoundMenuSetPlayingState(UNITY_PLAYBACK_STATE_PAUSED);
						break;
						
					case Components.interfaces.sbIMediacoreEvent.STREAM_STOP:
					case Components.interfaces.sbIMediacoreEvent.STREAM_END:
						that.unityServiceProxy.SoundMenuSetPlayingState(UNITY_PLAYBACK_STATE_STOPED);
						break;
						
					default:
						break;
				}
			}