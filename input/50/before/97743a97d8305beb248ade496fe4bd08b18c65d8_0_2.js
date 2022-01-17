function() {
				// only in case we are not loading stuff
				if (!me.sys.useNativeAnimFrame && me.sys.pauseOnBlur && (_state != obj.LOADING)) {
					obj.pause(true);
				}
				// callback?
				if (obj.onPause)
					obj.onPause();

			}