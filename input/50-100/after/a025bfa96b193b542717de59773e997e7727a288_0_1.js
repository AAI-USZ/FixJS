function $_log (str, verbose) {
			if (!THIRDCONTEXT.CONSTANTS.DEBUGMODE) {
				return;
			}
			void 0 === verbose && (verbose = false);
			if (!verbose || THIRDCONTEXT.CONSTANTS.DEBUG_VERBOSE) {
				str.constructor !== Array ? console.log(str)
										  : console.log.apply(console, str);
			}
			return;
		}