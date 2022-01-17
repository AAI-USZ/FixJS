function Request(requestSign, requestCategory, requestName, actionName, requestData) {

	this.requestSign = requestSign;

	this.requestCategory = requestCategory;

	this.requestName = requestName;

	this.actionName = actionName;

	this.requestData = requestData;



	/**************************************************************************

	 *

	 * Sends request with data and callback to

	 * listener.

	 *

	 **************************************************************************/

	this.Send = function (callback) {

		chrome.extension.sendRequest(this, callback || function () { });

	};

}