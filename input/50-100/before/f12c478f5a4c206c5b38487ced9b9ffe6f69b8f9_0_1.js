function refreshRecordingList(meetingId) {
	
	var getRecordingResponse = (meetingId == null)? BBBUtils.getSiteRecordingList(bbbSiteId): BBBUtils.getMeetingRecordingList(meetingId);
	
	if ( getRecordingResponse.returncode == 'SUCCESS' ){
		bbbCurrentRecordings = getRecordingResponse.recordings;
	} else {
		//Something went wrong
		bbbCurrentRecordings = new Array();
		
		if ( getRecordingResponse.messageKey != null ){
	    	BBBUtils.showMessage(getRecordingResponse.messageKey + ":" + getRecordingResponse.message, 'warning');
		} else {
	    	BBBUtils.showMessage("An unidentified error has just happened", 'warning');
		}
	}

}