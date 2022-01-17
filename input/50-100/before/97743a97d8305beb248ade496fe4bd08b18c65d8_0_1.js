function() {
				// only in case we are not loading stuff
				if (!me.sys.useNativeAnimFrame && me.sys.pauseOnBlur && (_state != obj.LOADING)) {
					obj.resume(true);

					// force repaint
					me.game.repaint();
				}
				// callback?
				if (obj.onResume)
					obj.onResume();

			}