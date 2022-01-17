function () {

		/// <summary>

		/// Sends request and loads available user profiles

		/// </summary>



		DLog("App: Requesting profiles list...");



		var profilesRequest = new Request("Background", "Data", "Profiles", "get", null);

		profilesRequest.Send(function (response) {

			// Check if response is valid

			if (IsNullOrEmpty(response)) {

				DLog("App: No profiles found...");

				DLog("App: Creating new profiles list...");



				AvailableProfiles = new Array();

			}

			else {

				// Parse response

				AvailableProfiles = JSON.parse(response) || new Array();



				DLog("App: Recieved [" + AvailableProfiles.length + "] profile(s)");

			}



			// Calls for loading finished for this request

			CheckFinishedLoading();

		});

	}