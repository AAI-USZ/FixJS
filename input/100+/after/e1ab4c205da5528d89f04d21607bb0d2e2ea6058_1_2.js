function appSetup() {

	    // Execute any FDJT initializations
	    fdjtDOM.init();

	    // Get various settings for the sBook, including
	    // information for scanning, graphics, glosses, etc
	    readSettings();

	    // Declare this to invoke some style constraints
	    fdjtDOM.addClass(document.body,"codexstartup");

	    var metadata=false;
	    var helphud=false;
	    // Initialize the databases
	    Codex.initDB();
	    // Modifies the DOM in various ways
	    initBody();
	    // This initializes the book tools (the HUD/Heads Up Display)
	    Codex.initHUD();

	    // Get any local saved configuration information
	    //  We do this after the HUD is setup so that the settings
	    //   panel gets initialized appropriately.
	    initConfig();
	    Codex.offline=((!(Codex.force_online))&&
			   ((Codex.force_offline)||(workOffline())));
	    setCheckSpan(fdjtID("CODEXOFFLINECHECKBOX"),Codex.offline);
	    addConfig(
		"offline",
		function(name,value){
		    if ((value)&&(Codex.offline)) return;
		    else if ((!(value))&&(!(Codex.offline))) return;
		    else if (value) {
			/* This should save all of the current state,
			   but that's a little tricky right now. */}
		    else if (!(value)) {
			if (getConfig("local"))
			    clearOffline(Codex.refuri);
			else clearOffline();}
		    Codex.offline=value;});
	    if ((Codex.offline)&&(!(Codex.sourcekb.storage)))
		Codex.sourcekb.storage=new fdjtKB.OfflineKB(Codex.sourcekb);
	    if ((Codex.offline)&&(!Codex.glosses.storage))
		Codex.glosses.storage=new fdjtKB.OfflineKB(Codex.glosses);
	    // Setup the UI components for the body and HUD
	    Codex.setupGestures();
	    
	    // Maybe display the help page
	    if ((!(fdjtID("CODEXSPLASH")))||(Codex.hidesplash===false))
		fdjtDOM.addClass(document.body,"codexhelp");

	    // Setup the reticle (if desired)
	    if ((typeof (document.body.style["pointer-events"])
		 != "undefined")&&
		((Codex.demo)||(fdjtState.getLocal("codex.demo"))||
		 (fdjtState.getCookie("sbooksdemo"))||
		 (getQuery("demo")))) {
		fdjtUI.Reticle.setup();}}