function content_mouseup(evt,target){
	if (!(target)) target=fdjtUI.T(evt);
	// Don't capture modified events
	if ((evt.shiftKey)||(evt.ctrlKey)||(evt.altKey)) return;
	var anchor=getParent(target,"A"), href;
	// If you tap on a relative anchor, move there using Codex
	// rather than the browser default
	if ((anchor)&&(anchor.href)&&
	    (href=anchor.getAttribute("href"))&&(href[0]==='#')&&
	    (document.getElementById(href.slice(1)))) {
	    var elt=document.getElementById(href.slice(1));
	    // This would be the place to provide smarts for
	    // asides/notes/etc, so they (for example) pop up
	    Codex.JumpTo(elt);
	    fdjtUI.cancel(evt);
	    return;}
	var sel=window.getSelection();
	var seltext=sel.toString();
	var passage=getTarget(target)||getTarget(sel.anchorNode)||
	    getTarget(sel.focusNode);
	// We get the passage here so we can include it in the trace message
	if (Codex.Trace.gestures)
	    fdjtLog("content_mouseup (%o) on %o passage=%o mode=%o",
		    evt,target,passage,Codex.mode);
	// If we're not over any content, just toggle out of the HUD.
	if (!(passage)) {
	    CodexMode(false);
	    fdjtUI.cancel(evt); return;}
	// Always go and add gloss if text is selected.  Otherwise,
	// lower the HUD if it's up or add a gloss on an apparent
	// double click.
	if ((!(seltext))||(isEmpty(seltext))) {
	    if (Codex.mode) {
		CodexMode(false); fdjtUI.cancel(evt); return;}
	    else if (last_tap) {
		if (last_tap!==passage) {
		    last_tap=passage; fdjtUI.cancel(evt); return;}
		else {
		    // Double tap, go ahead, fall through and add a gloss
		    last_tap=false; last_target=false;}}
	    else {
		last_tap=passage; fdjtUI.cancel(evt); return;}}
	var form=Codex.setGlossTarget(passage);
	var form_elt=fdjtDOM.getChild(form,"form");
	var form_class='';
	if ((seltext)&&(!(isEmpty(seltext)))) 
	    Codex.setExcerpt(form,seltext);
	else if (evt.shiftKey) {
	    form_class='addtag';
	    Codex.setHUD(true);}
	else {
	    form_class='editnote';
	    Codex.setHUD(true);}
	Codex.setGlossForm(form);
	if (form_elt) form_elt.className=form_class;
	fdjtUI.cancel(evt);
	CodexMode("addgloss");}