function GotDataRequest(request, response) {

	Helpers.DLog("BackgroundScript: Got Data request.");



	if (request.actionName == "get") {

		var data = localStorage.getItem(request.requestName);



		Helpers.Log("BackgroundScript: Data '" + request.requestName + "' GET [" + data + "]");



		response(data);

	}

	else if (request.actionName == "set") {

		try {

			localStorage.setItem(reque.requestName, request.requestData);

			Helpers.Log("BackgroundScript: Data '" + request.requestName + "' SET [" + request.requestData + "]");

		} catch (e) {

			if (e != null) {

				// Data wasnt successfully saved due to quota exceed so throw an error

				Helpers.Error("BackgroundScript:  Quota exceeded!");

				Helpers.Warn("BackgroundScript: " + localStorage.length);

				alert("Quota exceded! Can't save any changes for Project Axeman");

			}

			else {

				Helpers.Error("BackgroundScript:  Unknown error!");

				alert("Unknown error! Can't save any changes for Projrct Axeman");

			}

		}

	}

}