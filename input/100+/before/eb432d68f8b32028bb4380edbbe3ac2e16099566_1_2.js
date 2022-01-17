function(meeting) {
        // joinable only if on specified date interval (if any)
        var startOk = !meeting.startDate || meeting.startDate == 0 || (bbbServerTimeStamp.timestamp - bbbServerTimeStamp.timestamp % 1000) >= meeting.startDate;
        var endOk = !meeting.endDate || meeting.endDate == 0 || (bbbServerTimeStamp.timestamp - bbbServerTimeStamp.timestamp % 1000) < meeting.endDate;

        var offset = bbbServerTimeStamp.timezoneOffset;
        meeting.timezoneOffset = "GMT" + (offset > 0? "+": "") + (offset/3600000);

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