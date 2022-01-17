function () {
			var csl = CSLEDIT.options.get('loadCSLFunc')();
			if (csl !== null && typeof csl !== "undefined") {
				CSLEDIT.controller.exec('setCslCode', [csl]);
			}
		}