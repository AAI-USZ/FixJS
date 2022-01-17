function Request(requestSign, requestCategory, requestName, requestData) {

	this.Sign = requestSign;

	this.Category = requestCategory;

	this.Name = requestName;

	this.Data = requestData;



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