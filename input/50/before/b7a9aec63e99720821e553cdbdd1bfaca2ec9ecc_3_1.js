function () {

		/// <summary>

		/// Increments number of current loads and checks if it is equal 

		/// to needed loads, if so calls initialization finalization

		/// </summary>



		Helpers.DLog("App: Loaded [" + (currentLoad + 1) + " of " + loadNumber + "]");



		if (++currentLoad >= loadNumber) {

			// If loading finished, finalize initialization

			app.InitializeFinalize();

		}

	}