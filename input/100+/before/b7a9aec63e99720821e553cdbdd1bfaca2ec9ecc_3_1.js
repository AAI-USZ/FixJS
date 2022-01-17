function () {

		/// <summary>

		/// Loads all variables needed for further initialization

		/// </summary>

		

		Helpers.Log("App: Loading...");



		// Loading available user profiles

		Helpers.DLog("App: Requesting profiles list...");

		var profilesRequest = new Request("Background", "Data", "Profiles", "get", null);

		profilesRequest.Send(function (response) {

			// Check if response is valid

			if (response != null && response.length > 0) {

				// Parse response

				var profilesParsed = JSON.parse(response);

				AvailableProfiles = profilesParsed || new Array();



				Helpers.DLog("App: Recieved [" + profilesParsed.length + "] profile(s)");



				if (AvailableProfiles.length == 0) {

					// TODO First start - creating profile

					Helpers.Error("App: No profiles found. Try creating one!");

				}

				else {

					CheckFinishedLoading();

				}

			}

			else Helpers.Error("App: No profiles found. Try creating one!");

		});

	}