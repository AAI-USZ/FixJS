function GotNotificationRequest(request) {

	DLog("BackgroundScript: Got Notification request.");



	if (request.actionName == "Show") {

		notificationManager.Show(request.requestData);

	}

}