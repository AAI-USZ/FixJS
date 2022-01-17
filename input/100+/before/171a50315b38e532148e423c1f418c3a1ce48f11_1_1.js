function _onSendOk(aExchangeRequest, aResp)
	{
		exchWebService.commonFunctions.LOG("erConvertIDRequest.onSendOk: "+String(aResp));

		var aContinue = true;
		var aError = false;
		var aCode = 0;
		var aMsg = "";
		var aResult = undefined;

		var rm = aResp.XPath("/s:Envelope/s:Body/m:ConvertIdResponse/m:ResponseMessages/m:ConvertIdResponseMessage[@ResponseClass='Success' and m:ResponseCode='NoError']");

		if (rm.length > 0) {

//          <m:AlternateId xsi:type="t:AlternateIdType" Format="EwsId" Id="AAMkADNjZmIwYzQyLTdjYmEtNGFlMi05ZGE5LTBlYzRkNzYzODRhOAAuAAAAAAC8WradQ3BFT7SAoV2yp+k8AQDcsp8GsIe7Q5tUJHDnpdbjAAAtr+rqAAA=" Mailbox="jane@example.com"/>

			var alternateId = rm[0]["m:AlternateId"]["@Id"].toString();
			var realMailbox = rm[0]["m:AlternateId"]["@Mailbox"].toString();
		}
		else {
			var rm = aResp.XPath("/s:Envelope/s:Body/m:ConvertIdResponse/m:ResponseMessages/m:ConvertIdResponseMessage[@ResponseClass='Error']");
			if (rm.length > 0) {
				aCode = this.parent.ER_ERROR_CONVERTID;
				aError = true;
				aMsg = rm[0]["m:MessageText"].value+"("+rm[0]["m:ResponseCode"].value+")";
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
				this.mCbOk(alternateId, realMailbox);
			}
			this.isRunning = false;
		}
	}