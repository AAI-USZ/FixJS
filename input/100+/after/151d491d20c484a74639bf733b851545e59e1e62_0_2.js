function noteinput_keydown(evt){
	evt=evt||event;
	var kc=evt.keyCode;
	var target=fdjtUI.T(evt);
	var form=getParent(target,'form');
	var mode=getGlossMode(form);
	if (kc===13) { // newline/enter
	    if (!(mode)) {submitEvent(form);}
	    else {
		var bracketed=getbracketed(target);
		if (bracketed) {
		    fdjtUI.cancel(evt);
		    handleBracketed(form,getbracketed(target,true),true);}
		else if (evt.ctrlKey) {
		    fdjtUI.cancel(evt);
		    submitEvent(target);}
		else if (!(evt.shiftKey)) {
		    fdjtUI.cancel(evt);
		    var notespan=getChild(form,".notespan");
		    if (notespan)
			fdjtDOM.replace(
			    notespan,
			    Ellipsis("span.notespan",target.value,140));
		    dropClass(form,"editnote");}
		else fdjtUI.cancelBubble(evt);}}
	else if (mode) {}
	else if ((kc===35)||(kc===91)) // # or [
	    setGlossMode("addtag",form);
	else if (kc===32) // Space
	    setGlossMode("editnode",form);
	else if ((kc===47)||(kc===58)) // /or :
	    setGlossMode("addlink",form);
	else if ((kc===64)) // @
	    setGlossMode("sharing",form);
	else {}}