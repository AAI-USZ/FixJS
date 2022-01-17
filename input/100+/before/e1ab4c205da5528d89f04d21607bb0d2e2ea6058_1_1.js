function syncStartup(){
		    fdjtLog.console="CODEXCONSOLELOG";
	    fdjtLog.consoletoo=true;
	    if (!(Codex._setup_start)) Codex._setup_start=new Date();
	    fdjtLog("This is Codex version %s, built %s on %s, starting %s",
		    Codex.version,sbooks_buildtime,sbooks_buildhost,
		    Codex._setup_start.toString());
	    if (navigator.appVersion)
		fdjtLog("Navigator App version: %s",navigator.appVersion);
	    if (getQuery("cxtrace")) traceSetup();
	    appSetup();
	    userSetup();}