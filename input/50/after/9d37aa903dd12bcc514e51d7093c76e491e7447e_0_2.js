function() {

		waitsFor(function() {

			return !!applauncher.browserExecPath;

		});



		runs(function() {

			expect(applauncher.browserExecPath).toBeDefined();

		})

	}