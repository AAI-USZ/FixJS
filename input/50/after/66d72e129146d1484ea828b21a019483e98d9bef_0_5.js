function() {
				var chatSoundPlayer = document.getElementById('chat-sound-player');
				try {
					chatSoundPlayer.SetVariable('method:stop', '');
					chatSoundPlayer.SetVariable('method:play', '');
				} catch (e) {}
			}