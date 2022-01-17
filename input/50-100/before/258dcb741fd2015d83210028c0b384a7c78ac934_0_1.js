function outer_mousemove(evt){
	evt=evt||event;
	var target=fdjtUI.T(evt);
	if (!(hasParent(target,".fdjtaphold"))) {
	    if (pressed) released(pressed);
	    pressed=th_target=false;
	    return;}}