function() {
		sendRequest('action=like;sa=getlikes;m=' + parseInt($(this).parent().attr('data-mid'))  + ';r=' + parseInt($(this).attr('data-rtype')), null);
		return(false);
	}