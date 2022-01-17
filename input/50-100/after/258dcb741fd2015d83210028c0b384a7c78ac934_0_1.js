function outer_mousemove(evt){
	evt=evt||event;
	var target=fdjtUI.T(evt);
	// If it doesn't have a parent, it's been removed from the DOM,
	//  so we can't tell if it *was* in a .fdjtaphold region, so we punt.
	if (!(target.parentNode)) return;
	if (!(hasParent(target,".fdjtaphold"))) {
	    if (pressed) released(pressed);
	    pressed=th_target=false;
	    return;}}