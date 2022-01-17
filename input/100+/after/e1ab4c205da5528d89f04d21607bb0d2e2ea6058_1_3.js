function appSplash(){
	    // Take any message passed along as a query string
	    //  and put it in the top of the help window, then
	    //  display the help window
	    if (getQuery("congratulations"))
		fdjtDOM(fdjtID("CODEXINTRO"),
			fdjtDOM("strong","Congratulations, "),
			getQuery("congratulations"));
	    else if (getQuery("sorry"))
		fdjtDOM(fdjtID("CODEXINTRO"),
			fdjtDOM("strong","Sorry, "),
			getQuery("sorry"));
	    else if (getQuery("weird")) 
		fdjtDOM(fdjtID("CODEXINTRO"),
			fdjtDOM("strong","Weird, "),
			getQuery("weird"));
	    if ((getQuery("ACTION"))||
		(getQuery("JOIN"))||
		(getQuery("OVERLAY")))
		CodexMode("sbookapp");
	    else {}
	    // Hide the splash page, if any
	    if (fdjtID("CODEXSPLASH"))
		fdjtID("CODEXSPLASH").style.display='none';
	    window.focus();}