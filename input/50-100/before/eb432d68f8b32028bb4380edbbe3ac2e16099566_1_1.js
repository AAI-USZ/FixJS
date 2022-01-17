function(m,status) {
            	list = m['bbb-meeting_collection'];
                if(!list) list = [];
    
                // Work out whether the current user is a moderator of any of the
                // meetings. If so, mark the meeting with a moderator flag.
                for(var i=0,j=list.length;i<j;i++) {
                    BBBUtils.setMeetingPermissionParams(list[i]);
                }
            }