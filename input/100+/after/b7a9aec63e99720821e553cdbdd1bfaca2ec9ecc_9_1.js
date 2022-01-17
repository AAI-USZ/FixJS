function GotDataRequest(request, response) {

	DLog("BackgroundScript: Got Data request.");



	// On GET request

	if (request.actionName == "get") {

		// Get data from storage by requestName

		var data = localStorage.getItem(request.requestName);



		Log("BackgroundScript: Data '" + request.requestName + "' GET [" + data + "]");



		// Send data back in response

		response(data);

	}

	// ON SET request

	else if (request.actionName == "set") {

		try {

			// Check if data needs to be stringifyed

			if (typeof request.requestData != "string") {

				request.requestData = JSON.stringify(request.requestData);

			}



			// Save data to storage

			localStorage.setItem(request.requestName, request.requestData);



			Log("BackgroundScript: Data '" + request.requestName + "' SET [" + request.requestData + "]");

		} catch (e) {

			if (e != null) {

				// Data wasnt successfully saved due to quota exceed so throw an error

				Error("BackgroundScript:  Quota exceeded!");

				Warn("BackgroundScript: " + localStorage.length);

				alert("Quota exceded! Can't save any changes for Project Axeman");

			}

			else {

				Error("BackgroundScript:  Unknown error!");

				alert("Unknown error! Can't save any changes for Projrct Axeman");

			}

		}

	}

}