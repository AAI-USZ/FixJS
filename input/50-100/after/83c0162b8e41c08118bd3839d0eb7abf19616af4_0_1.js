function(reply){
			if(reply.status != "OK"){
				// Actions for saving failure
				closeAllLoadingMessages();
				humanMsg.displayMsg(reply.message);
				return;
			}
			CitizenCalendarSettingsHelper._subscriptions.existing = CitizenCalendarSettingsHelper._subscriptions.next.slice(0);
			CitizenCalendarSettingsHelper._subscriptions.add = [];
			CitizenCalendarSettingsHelper._subscriptions.remove = [];
			closeAllLoadingMessages();
			humanMsg.displayMsg(reply.message);
			return;
		}