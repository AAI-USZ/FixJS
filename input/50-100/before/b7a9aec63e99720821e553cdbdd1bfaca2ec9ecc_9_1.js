function GotRequest(request, sender, sendResponse) {

	Helpers.DLog("Got request { requestSign: " + request.requestSign + ", requestCategory: " + request.requestCategory + ", requestName: " + request.requestName + ", actionName: " + request.actionName + ", requestData: " + request.requestData + " }");



	// Supports following categories

	//		Notification

	//		Data

	switch (request.requestCategory) {

		case "Notification": GotNotificationRequest(request); break;

		case "Data": GotDataRequest(request, sendResponse); break;

		default:

			console.error("BackgroundScript: Unknown category!", request);

			break;

	}

}