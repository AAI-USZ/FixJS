function CodexMode(mode){
	    var oldmode=Codex.mode;
	    if (typeof mode === 'undefined') return oldmode;
	    if (mode==='last') mode=Codex.last_mode||'help';
	    if (mode==='none') mode=false;
	    if (mode==='heart') mode=Codex.heart_mode||"about";
	    if (Codex.Trace.mode)
		fdjtLog("CodexMode %o, cur=%o dbc=%o",
			mode,Codex.mode,document.body.className);
	    if ((Codex.mode==='help')&&(!(mode))) mode=Codex.last_mode;
	    if ((mode!==Codex.mode)&&(Codex.previewing))
		Codex.stopPreview();
	    if (mode) {
		if (mode!=="scanning") Codex.scanning=false;
		if ((mode==="scanning")||(mode==="tocscan"))
		    addClass(document.body,"codexscanning");
		else dropClass(document.body,"codexscanning");
		if (mode===Codex.mode) {}
		else if (mode===true) {
		    /* True just puts up the HUD with no mode info */
		    if (codex_mode_foci[Codex.mode]) {
			var input=fdjtID(codex_mode_foci[Codex.mode]);
			input.blur();}
		    Codex.mode=false;
		    Codex.last_mode=true;}
		else if (typeof mode !== 'string') 
		    throw new Error('mode arg not a string');
		else {
		    if (codex_mode_foci[Codex.mode]) {
			var input=fdjtID(codex_mode_foci[Codex.mode]);
			input.blur();}
		    Codex.mode=mode;
		    if (Codex.mode!=='help') Codex.last_mode=Codex.mode;}
		// If we're switching to the inner app but the iframe
		//  hasn't been initialized, we do it now.
		if ((mode==="sbookapp")&&(!(fdjtID("SBOOKSAPP").src)))
		    sbookSetupFlyleaf();
		// Update Codex.scrolling which is the scrolling
		// element in the HUD for this mode
		if (!(typeof mode === 'string'))
		    Codex.scrolling=false;
		else if (codex_mode_scrollers[mode]) 
		    Codex.scrolling=(codex_mode_scrollers[mode]);
		else Codex.scrolling=false;
		// Actually change the class on the HUD object
		if (mode===true) {
		    fdjtDOM.swapClass(CodexHUD,CodexMode_pat,"minimal");
		    dropClass(CodexHUD,"openheart");}
		else {
		    if (mode.search(codexHeartMode_pat)<0)
			dropClass(CodexHUD,"openheart");
		    fdjtDOM.swapClass(CodexHUD,CodexMode_pat,mode);}
		// Update the body scanning mode
		if ((mode==="scanning")||(mode==="tocscan"))
		    addClass(document.body,"codexscanning");
		else dropClass(document.body,"codexscanning");
		// Update the 'heart' meta mode
		if ((mode)&&(typeof mode === 'string')) {
		    if (mode.search(codexHeartMode_pat)===0) {
			Codex.heart_mode=mode;
			addClass(CodexHUD,"openheart");}
		    else dropClass(CodexHUD,"openheart");
		    fdjtID("CODEXBUTTON").className=mode;}
		// Help mode (on the hud) actually dims the body
		if (mode==="help")
		    addClass(document.body,"dimmed");
		else dropClass(document.body,"dimmed");
		// Scanning is a funny mode in that the HUD is down
		//  for it.  We handle all of this stuff here.
		if ((mode==='scanning')||(mode==='tocscan')) {
		    if (mode!==oldmode) {
			Codex.hudup=false;
			dropClass(CodexHUD,"openheart");
			dropClass(CodexHUD,"full");
			dropClass(document.body,"hudup");}}
		else if (mode==='addgloss') {}
		// And if we're not scanning, we just raise the hud
		else setHUD(true);
		// This updates scroller dimensions, we delay it
		//  because apparently, on some browsers, the DOM
		//  needs to catch up with CSS
		if (Codex.scrolling) {
		  var scroller=fdjtID(Codex.scrolling);
		  setTimeout(function(){updateScroller(scroller);},
			     100);}
		// We autofocus any input element appropriate to the
		// mode
		if (codex_mode_foci[mode]) {
		  var input=fdjtID(codex_mode_foci[mode]);
		  if (input) focus(input);}
		// Moving the focus back to the body lets keys work
		else document.body.focus();
		if (display_sync) Codex.displaySync();}
	    else {
		// Clearing the mode is a lot simpler, in part because
		//  setHUD clears most of the classes when it brings
		//  the HUD down.
		fdjtLog.HumaneHide();
		if (Codex.mode!=='help') Codex.last_mode=Codex.mode;
		if (Codex.liveinput) {
		    Codex.liveinput.blur();
		    Codex.liveinput=false;}
		document.body.focus();
		dropClass(document.body,"dimmed");
		dropClass(document.body,"codexscanning");
		setHUD(false);
		if (display_sync) Codex.displaySync();}}