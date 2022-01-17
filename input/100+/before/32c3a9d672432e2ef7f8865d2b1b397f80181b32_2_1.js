function hud_touchend(evt){
	if (Codex.Trace.gestures) tracetouch("hud_touchend",evt);
	var target=fdjtUI.T(evt);
	mouseisdown=false; // For faketouch
	var scroller=((Codex.scrolling)&&(Codex.scrollers)&&
		      (Codex.scrollers[Codex.scrolling]));
	if ((scroller)&&(scroller.motion)&&(scroller.motion>10)) return;
	else if (isClickable(target)) {
	    if (Codex.ui==="faketouch") {
		// This happens automatically when faking touch
		fdjtUI.cancel(evt);
		return;}
	    else {
		var click_evt = document.createEvent("MouseEvents");
		while (target)
		    if (target.nodeType===1) break;
		else target=target.parentNode;
		if (!(target)) return;
		if (Codex.Trace.gestures)
		    fdjtLog("Synthesizing click on %o",target);
		click_evt.initMouseEvent("click", true, true, window,
					 1,page_x,page_y,last_x, last_y,
					 false, false, false, false, 0, null);
		fdjtUI.cancel(evt);
		target.dispatchEvent(click_evt);
		return;}}
	else return hud_tapped(evt);}