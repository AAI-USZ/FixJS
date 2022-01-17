function topLoad(URL){
	pURL = URL;
	$("#move").animate({"margin-top":"150%"},{duration:aTime})
	// this.location.href=URL;
	setTimeout("pageLoad()",aTime);
}