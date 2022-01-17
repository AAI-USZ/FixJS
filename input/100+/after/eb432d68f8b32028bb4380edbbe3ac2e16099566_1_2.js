function(meeting) {

		// joinable only if on specified date interval (if any)
		
		var serverTimeStamp = parseInt(bbbServerTimeStamp.timestamp);
		serverTimeStamp = (serverTimeStamp - serverTimeStamp % 1000)

		var startOk = !meeting.startDate || meeting.startDate == 0 || serverTimeStamp >= meeting.startDate;
        var endOk = !meeting.endDate || meeting.endDate == 0 || serverTimeStamp < meeting.endDate;

        meeting.notStarted = !startOk && endOk;
        meeting.finished = startOk && !endOk;
        meeting.joinable = startOk && endOk;
        
        // specific meeting permissions
        if(bbbCurrentUser.id === meeting.ownerId) {
            meeting.canEdit = bbbUserPerms.bbbEditOwn | bbbUserPerms.bbbEditAny;
            meeting.canEnd = bbbUserPerms.bbbEditOwn | bbbUserPerms.bbbEditAny;
            meeting.canDelete = bbbUserPerms.bbbDeleteOwn | bbbUserPerms.bbbDeleteAny;
        }else{
            meeting.canEdit = bbbUserPerms.bbbEditAny;
            meeting.canEnd = bbbUserPerms.bbbEditAny;
            meeting.canDelete = bbbUserPerms.bbbDeleteAny;
        }
	}