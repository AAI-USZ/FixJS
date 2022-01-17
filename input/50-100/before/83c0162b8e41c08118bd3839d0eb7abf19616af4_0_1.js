function(reply){
			if(reply.status != "OK"){
				// Actions for saving failure
				closeAllLoadingMessages();
				humanMsg.displayMsg(reply.message);
				return;
			}
			CitizenCalendarSettingsHelper._subscriptions.existing = CitizenCalendarSettingsHelper._subscriptions.next.slice(0);
			closeAllLoadingMessages();
			humanMsg.displayMsg(reply.message);
			return;
		}