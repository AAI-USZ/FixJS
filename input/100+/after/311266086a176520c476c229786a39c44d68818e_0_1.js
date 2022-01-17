function _onSendOk(aExchangeRequest, aResp)
	{
		/*
		 * We want to include all Single items, all Exception items, but also
		 * at least one Occurrence or Exception item for each master.
		 * If we include too many Occurrences, we will query for the master
		 * too often, but if we don't include any, we might not query for the
		 * master at all.
		 *
		 * We first collect all non-Occurrences, and after that we fill in
		 * Occurrence for those masters that did not yet see any Exception.
		 */
		exchWebService.commonFunctions.LOG("erFindCalendarItemsRequest.onSendOk:"+String(aResp)+"\n");

		var aError = false;
		var aCode = 0;
		var aMsg = "";

		var rm = aResp.XPath("/s:Envelope/s:Body/m:FindItemResponse/m:ResponseMessages/m:FindItemResponseMessage[@ResponseClass='Success' and m:ResponseCode='NoError']");

		if (rm.length > 0) {
			var rootFolder = rm[0]["m:RootFolder"];
			if (rootFolder) {
				if (rootFolder.getAttribute("IncludesLastItemInRange") == "true") {
					// Process results.
					var calendarItems = rootFolder.XPath("/t:Items/t:CalendarItem");
					for (var index in calendarItems) {
						exchWebService.commonFunctions.LOG("1: index:"+index);
						var uid = "";
						if (calendarItems[index]["t:UID"]) {
							uid = calendarItems[index]["t:UID"].value;
						}
						switch (calendarItems[index]["t:CalendarItemType"].value) {
							case "Occurrence" :
							case "Exception" :
								if (uid != "") {
									this.occurrences[uid] = {Id: calendarItems[index]["t:ItemId"].getAttribute("Id"),
										  ChangeKey: calendarItems[index]["t:ItemId"].getAttribute("ChangeKey"),
										  type: calendarItems[index]["t:CalendarItemType"].value,
										  uid: uid,
										  start: calendarItems[index]["t:Start"].value,
										  end: calendarItems[index]["t:End"].valu};
								}
							case "RecurringMaster" :
							case "Single" :
								this.ids.push({Id: calendarItems[index]["t:ItemId"].getAttribute("Id"),
									  ChangeKey: calendarItems[index]["t:ItemId"].getAttribute("ChangeKey"),
									  type: calendarItems[index]["t:CalendarItemType"].value,
									  uid: uid,
									  start: calendarItems[index]["t:Start"].value,
									  end: calendarItems[index]["t:End"].value});
								break;
							default:
								exchWebService.commonFunctions.LOG("UNKNOWN CalendarItemType:"+calendarItems[index]["t:CalendarItemType"].value+"\n");
								break;
						}
						exchWebService.commonFunctions.LOG("2: index:"+index);
					}
				}
				else {
					// We do not know how to handle this yet. Do not know if it ever happens. We did not restrict MaxEntriesReturned.
					exchWebService.commonFunctions.LOG("PLEASE MAIL THIS LINE TO exchangecalendar@extensions.1st-setup.nl: IncludesLastItemInRange == false in FindItemResponse.");
				}
			}
			else {
				aCode = this.parent.ER_ERROR_SOAP_RESPONSECODE_NOTFOUND;
				aError = true;
				aMsg = "No RootFolder found in FindItemResponse.";
			}
		}
		else {
			aMsg = this.parent.getSoapErrorMsg(aResp);
			if (aMsg) {
				aCode = this.parent.ER_ERROR_CONVERTID;
				aError = true;
			}
			else {
				aCode = this.parent.ER_ERROR_SOAP_RESPONSECODE_NOTFOUND;
				aError = true;
				aMsg = "Wrong response received.";
			}
		}

		exchWebService.commonFunctions.LOG("3: aError:"+aError);
		if (aError) {
			this.onSendError(aExchangeRequest, aCode, aMsg);
		}
		else {
			if (this.mCbOk) {
		exchWebService.commonFunctions.LOG("4: aError:"+aError);
				var occurrenceList = [];
				for (var index in this.occurrences) {
					occurrenceList.push(this.occurrences[index]);
				}

		exchWebService.commonFunctions.LOG("5: aError:"+aError);
try{
				this.mCbOk(this, this.ids, occurrenceList);
}catch(exc){exchWebService.commonFunctions.LOG("ERROR:"+exc);}
		exchWebService.commonFunctions.LOG("6: aError:"+aError);
			}
			this.isRunning = false;
		}
		
/*		var rm = aResp..nsMessages::ResponseMessages.nsMessages::FindItemResponseMessage;
		var ResponseCode = rm.nsMessages::ResponseCode.toString();
		if (ResponseCode == "NoError") {

			for each (var e in aResp..nsTypes::CalendarItem) {
				switch (e.nsTypes::CalendarItemType.toString()) {
					case "RecurringMaster" :
						this.ids.push({Id: e.nsTypes::ItemId.@Id.toString(),
							  ChangeKey: e.nsTypes::ItemId.@ChangeKey.toString(),
							  type: e.nsTypes::CalendarItemType.toString(),
							  uid: e.nsTypes::UID.toString(),
							  start: e.nsTypes::Start.toString(),
							  end: e.nsTypes::End.toString()});
						break; // BUG 13.n
					case "Occurrence" :
					case "Exception" :
						this.occurrences[e.nsTypes::UID.toString()] = {Id: e.nsTypes::ItemId.@Id.toString(),
							  ChangeKey: e.nsTypes::ItemId.@ChangeKey.toString(),
							  type: e.nsTypes::CalendarItemType.toString(),
							  uid: e.nsTypes::UID.toString(),
							  start: e.nsTypes::Start.toString(),
							  end: e.nsTypes::End.toString()};
						// BUG 13.sn
						this.ids.push({Id: e.nsTypes::ItemId.@Id.toString(),
							  ChangeKey: e.nsTypes::ItemId.@ChangeKey.toString(),
							  type: e.nsTypes::CalendarItemType.toString(),
							  uid: e.nsTypes::UID.toString(),
							  start: e.nsTypes::Start.toString(),
							  end: e.nsTypes::End.toString()});
						// BUG 13.en
						break;
					case "Single" :
						this.ids.push({Id: e.nsTypes::ItemId.@Id.toString(),
							  ChangeKey: e.nsTypes::ItemId.@ChangeKey.toString(),
							  type: e.nsTypes::CalendarItemType.toString(),
							  uid: e.nsTypes::UID.toString(),
							  start: e.nsTypes::Start.toString(),
							  end: e.nsTypes::End.toString()});
						break;
					default:
						exchWebService.commonFunctions.LOG("UNKNOWN CalendarItemType:"+e.nsTypes::CalendarItemType.toString()+"\n");
						break;
				}
			}
		
			if (this.mCbOk) {
				var occurrenceList = [];
				for (var index in this.occurrences) {
					occurrenceList.push(this.occurrences[index]);
				}

				this.mCbOk(this, this.ids, occurrenceList);
			}
			this.isRunning = false;
		}
		else {
			this.onSendError(aExchangeRequest, this.parent.ER_ERROR_SOAP_ERROR, ResponseCode);
		} */
	}