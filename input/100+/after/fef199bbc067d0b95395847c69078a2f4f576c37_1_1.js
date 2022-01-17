function _onSendOk(aExchangeRequest, aResp)
	{
		exchWebService.commonFunctions.LOG("erGetFolderRequest.onSendOk:"+String(aResp));
		// Get FolderID and ChangeKey
		var aError = false;
		var aCode = 0;
		var aMsg = "";
		var aResult = undefined;

		var rm = aResp.XPath("/s:Envelope/s:Body/m:GetFolderResponse/m:ResponseMessages/m:GetFolderResponseMessage[@ResponseClass='Success' and m:ResponseCode='NoError']");

		if (rm.length > 0) {
			var calendarFolder = rm[0].XPath("/m:Folders/t:CalendarFolder");
			if (calendarFolder.length == 0) {
				var calendarFolder = rm[0].XPath("/m:Folders/t:TasksFolder");
			}
			if (calendarFolder.length > 0) {
				var folderID = calendarFolder[0]["t:FolderId"]["@Id"];
				var changeKey = calendarFolder[0]["t:FolderId"]["@ChangeKey"];
				var folderClass = calendarFolder[0]["t:FolderClass"].value;
				this.displayName = calendarFolder[0]["t:DisplayName"].value;
			}
			else {
				aMsg = "Did not find any CalendarFolder parts.";
				aCode = this.parent.ER_ERROR_FINDFOLDER_FOLDERID_DETAILS;
				aError = true;
			}
		}
		else {
			aMsg = this.parent.getSoapErrorMsg(aResp);
			if (aMsg) {
				aCode = this.parent.ER_ERROR_FINDFOLDER_FOLDERID_DETAILS;
				aError = true;
			}
			else {
				aCode = this.parent.ER_ERROR_SOAP_RESPONSECODE_NOTFOUND;
				aError = true;
				aMsg = "Wrong response received.";
			}
		}

		if (aError) {
			this.onSendError(aExchangeRequest, aCode, aMsg);
		}
		else {
			if (this.mCbOk) {
				this.properties = aResp;
				this.mCbOk(this, folderID, changeKey, folderClass);
			}
			this.isRunning = false;
		}

	}