function _initCanvas(options) {

			channels = audioletApp.init();

			/* OPTIONS FUNCITONALITY ADDED BY ANDY */
			canvas = options.canvas;
			context = options.context;
			noteWidth = options.noteWidth;
			noteHeight = options.noteHeight;

			// get patterns list:
			rows[sample.bass_drum] = channels[0].pattern.list;
			rows[sample.hi_hat] = channels[1].pattern.list;
			rows[sample.snare_drum] = channels[2].pattern.list;

			patternLength = rows[sample.bass_drum].length;

			_draw();
		}