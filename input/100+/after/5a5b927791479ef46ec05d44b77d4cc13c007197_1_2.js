function(){

    // Imports (kind of )
    var addClass=fdjtDOM.addClass;
    var hasClass=fdjtDOM.hasClass;
    var dropClass=fdjtDOM.dropClass;
    var swapClass=fdjtDOM.swapClass;
    var toggleClass=fdjtDOM.toggleClass;
    var getTarget=Codex.getTarget;
    var getParent=fdjtDOM.getParent;
    var isClickable=fdjtUI.isClickable;
    var getGeometry=fdjtDOM.getGeometry;

    var parsePX=fdjtDOM.parsePX;
    var atoi=parseInt;

    var submitEvent=fdjtUI.submitEvent;

    var reticle=fdjtUI.Reticle;

    var unhold=false;
    var hold_timer=false;
    var hold_interval=1500;
    var start_x=-1; var start_y=-1; var last_x=-1; var last_y=-1;
    var start_t=-1; var last_t=-1;
    var cxicon=Codex.icon;

    /* Setup for gesture handling */

    function addHandlers(node,type){
	var mode=Codex.ui;
	fdjtDOM.addListeners(node,Codex.UI.handlers[mode][type]);}
    Codex.UI.addHandlers=addHandlers;

    function setupGestures(domnode){
	var mode=Codex.ui;
	if (!(mode)) Codex.ui=mode="mouse";
	if (!(domnode)) {
	    addHandlers(false,'window');
	    addHandlers(document,'document');
	    addHandlers(document.body,'body');
	    if (Codex.bypage)
		addHandlers(fdjtID("CODEXPAGE"),'content');
	    else addHandlers(fdjtID("CODEXCONTENT"),'content');
	    addHandlers(Codex.HUD,'hud');}
	var handlers=Codex.UI.handlers[mode];
	if (mode)
	    for (var key in handlers)
		if ((key.indexOf('.')>=0)||(key.indexOf('#')>=0)) {
		    var nodes=fdjtDOM.$(key,domnode);
		    var h=handlers[key];
		    fdjtDOM.addListeners(nodes,h);}}
    Codex.setupGestures=setupGestures;

    var dont=fdjtUI.nobubble;
    function passmultitouch(evt){
	if ((evt.touches)&&(evt.touches.length>1)) return;
	else fdjtUI.nobubble(evt);}

    /* New simpler UI */

    function inUI(node){
	while (node)
	    if (!(node)) return false;
	else if (node.codexui) return true;
	else node=node.parentNode;
	return false;}

    var gloss_focus=false;
    var gloss_blurred=false;
    function addgloss_focus(evt){
	evt=evt||event;
	gloss_blurred=false;
	var target=fdjtUI.T(evt);
	var form=getParent(target,"FORM");
	if (form) addClass(form,"focused");
	gloss_focus=form;}
    function addgloss_blur(evt){
	evt=evt||event;
	var target=fdjtUI.T(evt);
	var form=getParent(target,"FORM");
	if (form) dropClass(form,"focused");
	gloss_blurred=fdjtTime();
	gloss_focus=false;}
    Codex.UI.addgloss_focus=addgloss_focus;
    Codex.UI.addgloss_blur=addgloss_blur;

    /* Adding a gloss button */

    function addGlossButton(target){
	var passage=getTarget(target);
	if (!(passage)) return;
	var img=fdjtDOM.getChild(passage,".codexglossbutton");
	if (img) return;
	img=fdjtDOM.Image(cxicon("remark",32,32),".codexglossbutton",
			  "+","click to add a gloss to this passage");
	Codex.UI.addHandlers(img,"glossbutton");
	fdjtDOM.prepend(passage,img);}
    
    function glossbutton_ontap(evt){
	evt=evt||event;
	var target=fdjtUI.T(evt);
	var passage=getTarget(target);
	if ((Codex.mode==="addgloss")&&
	    (Codex.glosstarget===passage)) {
	    fdjtUI.cancel(evt);
	    CodexMode(true);}
	else if (passage) {
	    fdjtUI.cancel(evt);
	    var form=Codex.setGlossTarget(passage);
	    CodexMode("addgloss");
	    Codex.setGlossForm(form);}}

    var excerpts=[];

    /* New handlers */

    function emptySelection(sel){
	return ((!(sel))||
		(!(sel.focusNode))||
		(!(sel.anchorNode))||
		((sel.anchorNode===sel.focusNode)&&
		 (sel.anchorOffset===sel.focusOffset)));}

    /* Functionality:
       on selection:
       save but keep selection,
       set target (if available)
       if hud is down, raise it
       on tap: (no selection)
       if hud is down, set target and raise it
       if no target, raise hud
       if tapping target, lower HUD
       if tapping other, set target, drop mode, and raise hud
       (simpler) on tap:
       if hudup, drop it
       otherwise, set target and raise HUD
    */

    /* Holding */

    var held=false; var handled=false;

    function clear_hold(caller){
	if (held) {
	    clearTimeout(held); held=false;
	    if (Codex.Trace.gestures)
		fdjtLog("clear_hold from %s",(caller||"somewhere"));}}

    /* Generic content handler */

    function content_tapped(evt,target){
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
	var passage=getTarget(target);
	// We get the passage here so we can include it in the trace message
	if (Codex.Trace.gestures)
	    fdjtLog("content_tapped (%o) on %o passage=%o mode=%o",
		    evt,target,passage,Codex.mode);
	// These should have their own handlers
	if ((isClickable(target))||
	    // (getParent(target,".codexglossbutton"))||
	    (getParent(target,".codexglossmark"))) {
	    if (Codex.Trace.gestures)
		fdjtLog("deferring content_tapped (%o) on %o",
			evt,target,passage,Codex.mode);
	    return;}
	// If there's a selection, store it as an excerpt.
	var sel=window.getSelection();
	if ((sel)&&(sel.anchorNode)&&(!(emptySelection(sel)))) {
	    var p=getTarget(sel.anchorNode)||
		getTarget(sel.focusNode)||
		passage;
	    if (p) {
		if ((Codex.mode==="addgloss")&&(fdjtID("CODEXLIVEGLOSS"))) {
		    Codex.setExcerpt(fdjtID("CODEXLIVEGLOSS"),sel.toString());}
		else {
		    Codex.excerpt=sel.toString();
		    tapTarget(p);}
		if (sel.removeAllRanges) sel.removeAllRanges();
		else if (sel.empty) sel.empty();
		else if (sel.clear) sel.clear();
		else {}
		return;}
	    else CodexMode(false);}
	if ((Codex.hudup)&&(passage)&&(Codex.mode==='addgloss')&&
	    ((gloss_focus)||((fdjtTime()-gloss_blurred)<1000))) {
	    if (passage===Codex.target) CodexMode(false);
	    else tapTarget(passage);}
	else if ((passage)&&(passage===Codex.target)&&(Codex.hudup)) {
	    Codex.setTarget(false);
	    CodexMode(false);}
	else if (passage)
	    tapTarget(passage);
	else if ((Codex.mode)||(Codex.hudup))
	    CodexMode(false);
	else CodexMode(true);}

    var isEmpty=fdjtString.isEmpty;
    var last_tap=false;
    var last_text=false;

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
	if ((!(seltext))||(isEmpty(seltext))||
	    ((Codex.mode==="addgloss")&&(seltext===last_text))) {
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
	if ((seltext)&&(!(isEmpty(seltext))))  {
	    last_text=seltext;
	    Codex.setExcerpt(form,seltext);}
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

    /* Tap actions */

    function tapTarget(target){
	if (Codex.Trace.gestures)
	    fdjtLog("Tap on target %o mode=%o",target,Codex.mode);
	Codex.setTarget(target);
	addGlossButton(target);
	CodexMode(true);}

    function edgeTap(evt,x){
	if (!(evt)) evt=event||false;
	var pageom=getGeometry(Codex.page,document.body);
	if (typeof x !== 'number') x=((evt)&&getOffX(evt));
	if (typeof x !== 'number') x=last_x;
	if (typeof x === 'number') {
	    if (Codex.Trace.gestures)
		fdjtLog("edgeTap %o x=%o w=%o g=%j",evt,x,
			fdjtDOM.viewWidth(),pageom);
	    if (x<0) {Backward(evt); return true;}
	    else if (x>pageom.width) {
		Forward(evt); return true;}
	    else return false}
	else return false;}
    Codex.edgeTap=edgeTap;
    
    function edge_click(evt) {
	var target=fdjtUI.T(evt);
	if ((isClickable(target))||
	    (getParent(target,".codexglossbutton"))||
	    (getParent(target,".codexglossmark")))
	    return;
	if (edgeTap(evt)) fdjtUI.cancel(evt);}

    /* TOC handlers */

    function getAbout(elt){
	while (elt) {
	    if ((elt.name)&&(elt.name.search("SBR")===0))
		return elt;
	    else elt=elt.parentNode;}
	return false;}

	function getTitleSpan(toc,ref){
	    var titles=fdjtDOM.getChildren(toc,".codextitle");
	    var i=0; var lim=titles.length;
	    while (i<lim) {
		var title=titles[i++];
		if (title.name===ref) return title;}
	    return false;}

    function toc_tapped(evt){
	var about=getAbout(fdjtUI.T(evt||event));
	if (about) {
	    var ref=about.name.slice(3);
	    Codex.JumpTo(fdjtID(ref));
	    CodexMode("tocscan");
	    return fdjtUI.cancel(evt);}}
    function toc_held(evt){
	var about=getAbout(fdjtUI.T(evt||event));
	if (about) {
	    var ref=about.name.slice(3);
	    var toc=getParent(about,".codextoc");
	    var title=getTitleSpan(toc,about.name);
	    addClass(title,"codexpreviewtitle");
	    addClass(about.parentNode,"codexheld");
	    addClass(getParent(about,".spanbar"),"codexvisible");
	    addClass(toc,"codexheld");
	    Codex.startPreview(fdjtID(ref),"codexheld");
	    return fdjtUI.cancel(evt);}}
    function toc_released(evt){
	var about=getAbout(fdjtUI.T(evt||event));
	if (about) {
	    var toc=getParent(about,".codextoc");
	    var title=getTitleSpan(toc,about.name);
	    dropClass(title,"codexpreviewtitle");
	    dropClass(about.parentNode,"codexheld");
	    dropClass(getParent(about,".spanbar"),"codexvisible");
	    dropClass(toc,"codexheld");
	    Codex.stopPreview("toc_released");}}
    function toc_slipped(evt){
	var about=getAbout(fdjtUI.T(evt||event));
	if (about) {
	    var toc=getParent(about,".codextoc");
	    var title=getTitleSpan(toc,about.name);
	    dropClass(title,"codexpreviewtitle");
	    dropClass(getParent(about,".spanbar"),"codexvisible");
	    dropClass(about.parentNode,"codexheld");
	    dropClass(toc,"codexheld");}}

    /* Slice handlers */

    function getCard(target){
	return ((hasClass(target,"codexcard"))?(target):
		(getParent(target,".codexcard")));}

    function slice_tapped(evt){
	var target=fdjtUI.T(evt);
	var card=getCard(target);
	if ((!(getParent(target,".tool")))&&
	    (getParent(card,".codexslice"))) {
	    Codex.Scan(fdjtID(card.about),card);
	    return fdjtUI.cancel(evt);}
 	else if ((card.name)||(card.getAttribute("name"))) {
	    var name=(card.name)||(card.getAttribute("name"));
	    var gloss=fdjtKB.ref(name,Codex.glosses);
	    if (!(gloss)) return;
	    Codex.setGlossTarget(gloss);	    
	    CodexMode("addgloss");}
 	else if (card.about) {
	    Codex.JumpTo(card.about);}}
    function slice_held(evt){
	var card=getCard(fdjtUI.T(evt||event));
	if (!(card)) return;
	if (Codex.scanning===card) return;
	var clone=card.cloneNode(true);
	clone.id="CODEXSCAN";
	fdjtDOM.replace("CODEXSCAN",clone);
	dropClass(Codex.previewtarget,"codexpreviewtarget");
	fdjtUI.Highlight.clear(Codex.previewtarget,"highlightexcerpt");
	fdjtUI.Highlight.clear(Codex.previewtarget,"highlightsearch");
	if (card.about) {
	    var target=Codex.previewtarget=fdjtID(card.about);
	    addClass(target,"codexpreviewtarget");}
	if (hasClass(card,"gloss")) {
	    var glossinfo=Codex.glosses.ref(card.name);
	    if (!(target))
		Codex.previewtarget=target=fdjtID(glossinfo.frag);
	    else Codex.previewtarget=target;
	    if (glossinfo.excerpt) {
		var range=fdjtDOM.findString(target,glossinfo.excerpt);
		if (range) fdjtUI.Highlight(range,"highlightexcerpt");
		else addClass(target,"highlightpassage");}
	    else addClass(target,"highlightpassage");}
	else if (getParent(card,".sbookresults")) {
	    var about=card.about;
	    Codex.previewtarget=target=fdjtID(about);
	    if (about) {
		var info=Codex.docinfo[target.id];
		var terms=Codex.query._query;
		var spellings=info.knodeterms;
		var i=0; var lim=terms.length;
		while (i<lim) {
		    var term=terms[i++];
		    highlightTerm(term,target,info,spellings);}}}
	else {}
	Codex.startPreview(target,"slice_held");
	return fdjtUI.cancel(evt);}
    function slice_released(evt){
	var card=getCard(fdjtUI.T(evt||event));
	if (card) {
	    Codex.stopPreview("slice_released");}}

    function highlightTerm(term,target,info,spellings){
	var words=[];
	if (typeof term === 'string')
	    words=((spellings)&&(spellings[term]))||[term];
	else {
	    var knodes=info.knodes;
	    var i=0; var lim=knodes.length;
	    while (i<lim) {
		var knode=knodes[i++];
		if ((knode===term)||
		    (fdjtKB.contains(knode._always,term))) {
		    var dterm=knode.dterm;
		    var spelling=((spellings)&&(spellings[dterm]))||dterm;
		    if (typeof spelling === 'string')
			words.push(spelling);
		    else words=words.concat(spelling);}}
	    if (words.length===0) words=false;}
	if (!(words)) return;
	if (typeof words === 'string') words=[words];
	var j=0; var jlim=words.length;
	while (j<jlim) {
	    var word=words[j++];
	    var pattern=new RegExp(word.replace(/\s+/g,"(\\s+)"),"gm");
	    var ranges=fdjtDOM.findMatches(target,pattern);
	    if (Codex.Trace.highlight)
		fdjtLog("Trying to highlight %s (using %o) in %o, ranges=%o",
			word,pattern,target,ranges);
	    if ((ranges)&&(ranges.length)) {
		var k=0; while (k<ranges.length) 
		    fdjtUI.Highlight(ranges[k++],"highlightsearch");}}}
    Codex.highlightTerm=highlightTerm;
	    

    /* HUD handlers */

    function hud_tapped(evt,target){
	if (!(target)) target=fdjtUI.T(evt);
	if (isClickable(target)) return;
	else if (getParent(target,".helphud")) {
	    var mode=fdjtDOM.findAttrib(target,"data-hudmode")||
		fdjtDOM.findAttrib(target,"hudmode");
	    if (mode) CodexMode(mode)
	    else CodexMode(false);
	    return fdjtUI.cancel(evt);}
	var card=((hasClass(target,"codexcard"))?(target):
		  (getParent(target,".codexcard")));
	if (card) {
	    if ((!(getParent(target,".tool")))&&
		(getParent(card,".codexslice"))) {
		Codex.Scan(fdjtID(card.about),card);
		return fdjtUI.cancel(evt);}
	    else if ((card.name)||(card.getAttribute("name"))) {
		var name=(card.name)||(card.getAttribute("name"));
		var gloss=fdjtKB.ref(name,Codex.glosses);
		if (!(gloss)) return;
		Codex.setGlossTarget(gloss);	    
		CodexMode("addgloss");}
	    else if (card.about) {
		Codex.JumpTo(card.about);}
	    fdjtUI.cancel(evt);
	    return;}
	var scan=target, about=false, frag=false, gloss=false;
	while (scan) {
	    if (about=scan.about) break;
	    else if (frag=scan.frag) break;
	    else scan=scan.parentNode;}
	if (frag) {Codex.ScanTo(frag); fdjtUI.cancel(evt);}
	else if ((about)&&(about[0]==='#')) {
	    Codex.ScanTo(about.slice(0)); fdjtUI.cancel(evt);}
	else if ((about)&&(gloss=Codex.glosses.ref(about))) {
	    Codex.setGlossTarget(gloss);	    
	    CodexMode("addgloss");
	    fdjtUI.cancel(evt);}
	else {}}
    
    /* Mouse handlers */

    /* Keyboard handlers */

    // We use keydown to handle navigation functions and keypress
    //  to handle mode changes
    function onkeydown(evt){
	evt=evt||event||null;
	var kc=evt.keyCode;
	// Codex.trace("sbook_onkeydown",evt);
	if (evt.keyCode===27) { /* Escape works anywhere */
	    if (Codex.mode) {
		Codex.last_mode=Codex.mode;
		CodexMode(false);
		Codex.setTarget(false);
		fdjtID("CODEXSEARCHINPUT").blur();}
	    else if (Codex.last_mode) CodexMode(Codex.last_mode);
	    else {}
	    return;}
	else if ((evt.altKey)||(evt.ctrlKey)||(evt.metaKey)) return true;
	else if (kc===34) Codex.Forward(evt);   /* page down */
	else if (kc===33) Codex.Backward(evt);  /* page up */
	else if (kc===37) Codex.scanBackward(evt); /* arrow left */
	else if (kc===39) Codex.scanForward(evt); /* arrow right */
	// Don't interrupt text input for space, etc
	else if (fdjtDOM.isTextInput(fdjtDOM.T(evt))) return true;
	else if (kc===32) Codex.Forward(evt); // Space
	// backspace or delete
	else if ((kc===8)||(kc===45)) Codex.Backward(evt);
	// Home goes to the current head.
	else if (kc===36) Codex.JumpTo(Codex.head);
	else return;
	fdjtUI.cancel(evt);}

    // At one point, we had the shift key temporarily raise/lower the HUD.
    //  We might do it again, so we keep this definition around
    function onkeyup(evt){
	evt=evt||event||null;
	var kc=evt.keyCode;
	// Codex.trace("sbook_onkeyup",evt);
	if (fdjtDOM.isTextInput(fdjtDOM.T(evt))) return true;
	else if ((evt.ctrlKey)||(evt.altKey)||(evt.metaKey)) return true;
	else {}}
    Codex.UI.handlers.onkeyup=onkeyup;

    /* Keypress handling */

    // We have a big table of command characters which lead to modes
    var modechars={
	63: "searching",102: "searching",
	65: "openheart", 97: "openheart",
	83: "searching",115: "searching",
	80: "gotopage",112: "gotopage",
	76: "gotoloc",108: "gotoloc",
	70: "searching",
	100: "device",68: "device",
	110: "toc",78: "toc",
	116: "flytoc",84: "flytoc",
	72: "help", 104: "humane",
	103: "allglosses",71: "allglosses",
	67: "console", 99: "console"};

    // Handle mode changes
    function onkeypress(evt){
	var modearg=false; 
	evt=evt||event||null;
	var ch=evt.charCode||evt.keyCode;
	// Codex.trace("sbook_onkeypress",evt);
	if (fdjtDOM.isTextInput(fdjtDOM.T(evt))) return true;
	else if ((evt.altKey)||(evt.ctrlKey)||(evt.metaKey)) return true;
	else if ((ch===72)||(ch===104)) { // 'H' or 'h'
	    fdjtDOM.toggleClass(document.body,'codexhelp');
	    return false;}
	else modearg=modechars[ch];
	if (modearg==="openheart")
	    modearg=Codex.last_heartmode||"about";
	if (modearg==="humane") {
	    fdjtLog.Humane();
	    return;}
	var mode=CodexMode();
	if (modearg) {
	    if (mode===modearg) {
		CodexMode(false); mode=false;}
	    else {
		CodexMode(modearg); mode=modearg;}}
	else {}
	if (mode==="searching")
	    Codex.setFocus(fdjtID("CODEXSEARCHINPUT"));
	else fdjtID("CODEXSEARCHINPUT").blur();
	fdjtDOM.cancel(evt);}
    Codex.UI.handlers.onkeypress=onkeypress;

    function goto_keypress(evt){
	evt=evt||event||null;
	var target=fdjtUI.T(evt);
	var ch=evt.charCode||evt.keyCode;
	var max=false; var min=false;
	var handled=false;
	if (target.name==='GOTOLOC') {
	    min=0; max=Math.floor(Codex.ends_at/128);}
	else if (target.name==='GOTOPAGE') {
	    min=1; max=Codex.pagecount;}
	else if (ch===13) fdjtUI.cancel(evt);
	if (ch===13) {
	    if (target.name==='GOTOPAGE') {
		var num=parseInt(target.value);
		if (typeof num === 'number') {
		    handled=true; Codex.GoToPage(num);}
		else {}}
	    else if (target.name==='GOTOLOC') {
		var locstring=target.value;
		var pct=parseFloat(locstring);
		if ((typeof pct === 'number')&&(pct>=0)&&(pct<=100)) {
		    var loc=Math.floor((pct/100)*Codex.ends_at);
		    Codex.JumpTo(loc); handled=true;}}
	    else {}
	    if (handled) {
		target.value="";
		CodexMode(false);}}}
    Codex.UI.goto_keypress=goto_keypress;

    /* ADDGLOSS interaction */

    function delete_ontap(evt){
	evt=evt||event;
	var target=fdjtUI.T(evt);
	fdjtUI.cancel(evt);
	var block=getParent(target,".codexglossform");
	if (!(block)) return;
	var glosselt=fdjtDOM.getInput(block,'UUID');
	if (!(glosselt)) return;
	var qref=glosselt.value;
	var gloss=Codex.glosses.ref(qref);
	if (!(gloss)) return;
	var frag=gloss.get("frag");
	fdjtAjax.jsonCall(
	    function(response){glossdeleted(response,qref,frag);},
	    "https://"+Codex.server+"/glosses/delete",
	    "gloss",qref);}
    Codex.UI.delete_ontap=delete_ontap;
    
    function respond_ontap(evt){
	evt=evt||event;
	var target=fdjtUI.T(evt);
	fdjtUI.cancel(evt);
	var block=getParent(target,".codexglossform");
	if (!(block)) return;
	var glosselt=fdjtDOM.getInput(block,'UUID');
	if (!(glosselt)) return;
	var qref=glosselt.value;
	var gloss=Codex.glosses.ref(qref);
	if (!(gloss)) return;
	Codex.setGlossTarget(gloss,Codex.getGlossForm(gloss,true));
	CodexMode("addgloss");}
    Codex.UI.respond_ontap=respond_ontap;

    function glossdeleted(response,glossid,frag){
	if (response===glossid) {
	    Codex.glosses.drop(glossid);
	    Codex.allglosses=fdjtKB.remove(Codex.allglosses,glossid);
	    if (Codex.offline)
		fdjtState.setLocal("glosses("+Codex.refuri+")",
				   Codex.allglosses,true);
	    var editform=fdjtID("CODEXEDITGLOSS_"+glossid);
	    if (editform) {
		var editor=editform.parentNode;
		if (editor===fdjtID('CODEXLIVEGLOSS')) {
		    Codex.glosstarget=false;
		    CodexMode(false);}
		fdjtDOM.remove(editor);}
	    var renderings=fdjtDOM.Array(document.getElementsByName(glossid));
	    if (renderings) {
		var i=0; var lim=renderings.length;
		while (i<lim) {
		    var rendering=renderings[i++];
		    if (rendering.id==='CODEXSCAN')
			fdjtDOM.replace(rendering,fdjtDOM("div.codexcard.deletedgloss"));
		    else fdjtDOM.remove(rendering);}}
	    var glossmark=fdjtID("SBOOK_GLOSSMARK_"+frag);
	    if (glossmark) {
		var newglosses=fdjtKB.remove(glossmark.glosses,glossid);
		if (newglosses.length===0) fdjtDOM.remove(glossmark);
		else glossmark.glosses=newglosses;}}
	else alert(response);}

    /* HUD button handling */

    var mode_hud_map={
	"toc": "CODEXTOC",
	"searching": "CODEXSEARCH",
	"allglosses": "CODEXSOURCES",
	"openheart": "CODEXFLYHEAD"};
    
    function hudbutton(evt){
	evt=evt||event;
	var target=fdjtUI.T(evt);
	var mode=target.getAttribute("hudmode");
	if ((Codex.Trace.gestures)&&
	    ((evt.type==='tap')||
	     (evt.type==='click')||
	     (evt.type==='touchend')||
	     (evt.type==='release')||
	     (Codex.Trace.gestures>1)))
	    fdjtLog("hudbutton() %o mode=%o cl=%o scan=%o sbh=%o mode=%o",
		    evt,mode,(isClickable(target)),
		    Codex.scanning,Codex.hudup,CodexMode());
	if (reticle.live) reticle.flash();
	fdjtUI.cancel(evt);
	if (!(mode)) return;
	var hudid=((mode)&&(mode_hud_map[mode]));
	var hud=fdjtID(hudid);
	if ((evt.type==='click')||(evt.type==='tap')||
	    (evt.type==='touchend')||(evt.type==='release')) {
	    if (hud) dropClass(hud,"hover");
	    if (fdjtDOM.hasClass(Codex.HUD,mode)) CodexMode(false);
	    else CodexMode(mode);}
	else if ((evt.type==='mouseover')&&(Codex.mode))
	    return;
	else {
	    if (!(hud)) {}
	    else if (evt.type==='mouseover')
		addClass(hud,"hover");
	    else if (evt.type==='mouseout')
		dropClass(hud,"hover");
	    else {}}}
    Codex.UI.hudbutton=hudbutton;

    Codex.UI.dropHUD=function(evt){
	var target=fdjtUI.T(evt);
	if (isClickable(target)) {
	    if (Codex.Trace.gestures)
		fdjtLog("Clickable: don't dropHUD %o",evt);
	    return;}
	dropClass(document.body,"codexhelp");
	if (Codex.Trace.gestures) fdjtLog("dropHUD %o",evt);
	fdjtUI.cancel(evt); CodexMode(false);};

    /* Gesture state */

    var touch_started=false; var touch_ref=false;
    var page_x=-1; var page_y=-1; var sample_t=-1;
    var touch_moves=0;
    var touch_timer=false;
    var touch_held=false;
    var touch_moved=false;
    var touch_scrolled=false;
    var n_touches=0;

    var doubletap=false, tripletap=false;

    function cleartouch(){
	touch_started=false; touch_ref=false;
	start_x=start_y=last_x=last_y=-1;
	page_x=page_y=sample_t=-1; touch_moves=0;
	touch_timer=false; touch_held=false;
	touch_moved=false; touch_scrolled=false;
	doubletap=false; tripletap=false;}

    function tracetouch(handler,evt){
	evt=evt||event;
	var touches=evt.touches;
	var touch=(((touches)&&(touches.length))?(touches[0]):(evt));
	var target=fdjtUI.T(evt); var ref=Codex.getRef(target);
	if (touch_started)
	    fdjtLog("%s(%o) n=%o %sts=%o %s@%o\n\t+%o %s%s%s%s%s%s%s s=%o,%o l=%o,%o p=%o,%o d=%o,%o ref=%o tt=%o tm=%o",
		    handler,evt,((touches)&&(touches.length)),
		    ((!(touch))?(""):
		     ("c="+touch.clientX+","+touch.clientY+";s="+touch.screenX+","+touch.screenY+" ")),
		    touch_started,evt.type,target,
		    fdjtTime()-touch_started,
		    ((Codex.mode)?(Codex.mode+" "):""),
		    ((Codex.scanning)?"scanning ":""),
		    ((touch_held)?("held "):("")),
		    ((touch_moved)?("moved "):("")),
		    ((touch_scrolled)?("scrolled "):("")),
		    ((isClickable(target))?("clickable "):("")),
		    ((touch)?"":"notouch "),
		    start_x,start_y,last_x,last_y,page_x,page_y,
		    (((touch)&&(touch.screenX))?(touch.screenX-page_x):0),
		    (((touch)&&(touch.screenY))?(touch.screenY-page_y):0),
		    touch_ref,touch_timer,touch_moves);
	else fdjtLog("%s(%o) n=%o %s%s c=%o,%o p=%o,%o ts=%o %s@%o ref=%o",
		     handler,evt,((touches)&&(touches.length)),
		     ((Codex.mode)?(Codex.mode+" "):""),
		     ((Codex.scanning)?"scanning ":""),
		     touch.clientX,touch.clientY,touch.screenX,touch.screenY,
		     touch_started,evt.type,target,ref);
	if (ref) fdjtLog("%s(%o) ref=%o from %o",handler,evt,ref,target);}

    /* Touch handling */

    Codex.UI.useExcerpt=function(flag){
	var text=fdjtID("CODEXEXTRACT").value;
	var excerpt_elt=fdjtID("CODEXEXCERPT");
	var form=fdjtID("CODEXLIVEGLOSS");
	if (flag) {
	    Codex.setExcerpt(form,text,excerpt_elt.passageid);
	    CodexMode("addgloss");}
	else CodexMode("false");};
    
    var mouseisdown=false;

    var touch_moves=0, touch_moved=false;;
    var touch_x, touch_y, n_touches=0;
    var start_x, start_y;

    function content_touchstart(evt){
	touch_moves=0; touch_moved=false;
	var touches=evt.touches;
	var touch=(((touches)&&(touches.length))?(touches[0]):(evt));
	touch_x=start_x=touch.screenX;
	touch_y=start_y=touch.screenY;
	if ((touches)&&(touches.length)) n_touches=touches.length;
	// var dx=touch.screenX-page_x; var dy=touch.screenY-page_y;
	// var adx=((dx<0)?(-dx):(dx)); var ady=((dy<0)?(-dy):(dy));
	if (Codex.Trace.gestures>2) tracetouch("touchmove",evt);
	touch_moved=true;
	return;}

    function content_touchmove(evt){
	fdjtUI.cancel(evt);
	touch_moves++; touch_moved=true;
	var touches=evt.touches;
	var touch=(((touches)&&(touches.length))?(touches[0]):(evt));
	touch_x=touch.screenX;
	touch_y=touch.screenY;
	if ((touches)&&(touches.length)&&
	    (touches.length>n_touches))
	    n_touches=touches.length;
	if (Codex.Trace.gestures>2) tracetouch("touchmove",evt);
	return;}
    
    function content_touchend(evt){
	var target=fdjtUI.T(evt);
	if (isClickable(target)) return;
	/*
	var sel=window.getSelection();
	fdjtLog("content_touchend t=%o s=%o",target,sel);
	if ((sel)&&(sel.anchorNode)&&(!(emptySelection(sel)))&&
	    (Codex.mode==="addgloss")&&(fdjtID("CODEXLIVEGLOSS"))) {
	    Codex.setExcerpt(fdjtID("CODEXLIVEGLOSS"),sel.toString());
	    return;}
	*/
	if (touch_moved) {
	    var dx=touch_x-start_x; var dy=touch_y-start_y;
	    var adx=((dx<0)?(-dx):(dx)); var ady=((dy<0)?(-dy):(dy));
	    var ad=((adx<ady)?(ady-adx):(adx-ady));
	    if (Codex.Trace.gestures)
		fdjtLog("touchend/gesture l=%o,%o s=%o,%o d=%o,%o |d|=%o,%o",
			last_x,last_y,start_x,start_y,dx,dy,adx,ady);
	    if (adx>(ady*3)) { /* horizontal */
		fdjtUI.cancel(evt);
		if (n_touches===1) {
		    if (dx<0) Codex.Forward(evt);
		    else Codex.Backward(evt);}
		else {
		    if (dx<0) Codex.scanForward(evt);
		    else Codex.scanBackward(evt);}}
	    else content_mouseup(evt);
	    return;}
	else content_mouseup(evt);}

    /* HUD touch */

    function hud_touchmove(evt){
	// When faking touch, moves only get counted if the mouse is down.
	if ((evt.type==="mousemove")&&(!(mouseisdown))) return;
	var target=fdjtUI.T(evt);
	if (isClickable(target)) return;
	fdjtUI.cancel(evt);
	touch_moves++;
	var touch=
	    (((evt.touches)&&(evt.touches.length))?(evt.touches[0]):(evt));
	var dx=touch.screenX-page_x; var dy=touch.screenY-page_y;
	var adx=((dx<0)?(-dx):(dx)); var ady=((dy<0)?(-dy):(dy));
	if (page_x<0) page_x=touch.screenX;
	if (page_y<0) page_y=touch.screenY;
	if (Codex.Trace.gestures>1) tracetouch("hud_touchmove",evt);
	if ((hold_timer)&&((adx+ady)>4)) {
	    clearTimeout(hold_timer); hold_timer=false;}
	last_x=touch.clientX; last_y=touch.clientY;
	touch_moved=true;
	page_x=touch.screenX; page_y=touch.screenY;
	touch_scrolled=true;}

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

    /* Default click/tap */
    function default_tap(evt){
	var target=fdjtUI.T(evt);
	if (((Codex.hudup)||(Codex.mode))&&
	    (!(getParent(target,Codex.HUD))))
	    CodexMode(false);}

    /* Glossmarks */
    
    function glossmark_tapped(evt){
	evt=evt||event||null;
	if (held) clear_hold("glossmark_tapped");
	var target=fdjtUI.T(evt);
	var glossmark=getParent(target,".codexglossmark");
	var passage=getTarget(glossmark.parentNode,true);
	if (Codex.Trace.gestures)
	    fdjtLog("glossmark_tapped (%o) on %o gmark=%o passage=%o mode=%o target=%o",
		    evt,target,glossmark,passage,Codex.mode,Codex.target);
	if (!(glossmark)) return false;
	fdjtUI.cancel(evt);
	if ((Codex.mode==='glosses')&&(Codex.target===passage)) {
	    CodexMode(true);
	    return;}
	else Codex.showGlosses(passage);}

    var glossmark_hovering=false;

    function glossmark_hoverstart(evt){
	if (glossmark_hovering) {
	    clearInterval(glossmark_hovering);
	    glossmark_hovering=false;}
	var target=fdjtUI.T(evt);
	var glossmark=((hasClass(target,"codexglossmark"))?(target):
		       (getParent(target,".codexglossmark")));
	if (!(glossmark)) return;
	var bigimage=fdjtDOM.getChild(glossmark,"img.big");
	if (!(bigimage)) return;
	glossmark_hovering=fdjtUI.ImageSwap(bigimage,750);}

    function glossmark_hoverdone(evt){
	if (glossmark_hovering) {
	    clearInterval(glossmark_hovering);
	    glossmark_hovering=false;}
	var target=fdjtUI.T(evt);
	var glossmark=((hasClass(target,"codexglossmark"))?(target):
		       (getParent(target,".codexglossmark")));
	if (!(glossmark)) return;
	var bigimage=fdjtDOM.getChild(glossmark,"img.big");
	if (bigimage) fdjtUI.ImageSwap.reset(bigimage);}

    /* Moving forward and backward */

    var last_motion=false;

    function Forward(evt){
	var now=fdjtTime();
	if (!(evt)) evt=event||false;
	if (evt) fdjtUI.cancel(evt);
	if ((last_motion)&&((now-last_motion)<100)) return;
	else last_motion=now;
	if (Codex.Trace.nav)
	    fdjtLog("Forward e=%o h=%o t=%o",evt,Codex.head,Codex.target);
	if ((Codex.mode==="glosses")||(Codex.mode==="addgloss"))
	    CodexMode(true);
	if (((evt)&&(evt.shiftKey))||(n_touches>1))
	    scanForward();
	else pageForward();}
    Codex.Forward=Forward;
    function right_margin(evt){
	if (Codex.Trace.gestures) tracetouch("right_margin",evt);
	if (Codex.hudup) CodexMode(false);
	else Forward(evt);}

    function Backward(evt){
	var now=fdjtTime();
	if (!(evt)) evt=event||false;
	if (evt) fdjtUI.cancel(evt);
	if ((last_motion)&&((now-last_motion)<100)) return;
	else last_motion=now;
	if ((Codex.mode==="glosses")||(Codex.mode==="addgloss"))
	    CodexMode(true);
	if (Codex.Trace.nav)
	    fdjtLog("Backward e=%o h=%o t=%o",evt,Codex.head,Codex.target);
	if (((evt)&&(evt.shiftKey))||(n_touches>1))
	    scanBackward();
	else pageBackward();}
    Codex.Backward=Backward;
    function left_margin(evt){
	if (Codex.Trace.gestures) tracetouch("left_margin",evt);
	if (Codex.hudup) CodexMode(false);
	else Backward(evt);}


    function pageForward(){
	if (Codex.Trace.gestures)
	    fdjtLog("pageForward c=%o n=%o",Codex.curpage,Codex.pagecount);
	if ((Codex.mode==="scanning")||(Codex.mode==="tocscan"))
	    CodexMode(false);
	if ((Codex.bypage)&&(Codex.pagecount)) {
	    var newpage=false;
	    if (Codex.mode==="glosses") CodexMode(true);
	    if (Codex.curpage===Codex.pagecount) {}
	    else Codex.GoToPage(newpage=Codex.curpage+1,"pageForward",true);}
	else if (Codex.bysect) {
	    var win=Codex.window; var content=Codex.content;
	    var section=Codex.section;
	    var wbottom=win.scrollTop+win.offsetHeight;
	    var cbottom=section.offsetHeight+section.offsetTop;
	    // -parsePX(section.style.marginBottom)
	    var cursection=Codex.cursect;
	    if (wbottom>=cbottom) {
		if (cursection>=Codex.sections.length) {
		    fdjtLog("At end of last section");
		    return;}
		// Codex.sections is zero-based, while cursection is
		// one-based, so we just call it directly.
		var next=Codex.sections[cursection];
		var breaks=Codex.layout.getPageBreaks(next);
		// At the bottom of this section
		next={sectnum: cursection+1, section: next,
		      breaks: breaks, pageoff: 0,
		      tops: Codex.layout.pagetops[cursection],
		      off: 0};
		if (Codex.pagecount)
		    next.pagenum=Codex.layout.pagenums[cursection][0];
		Codex.GoToSection(next,"pageForward",true);}
	    else {
		var breaks=Codex.layout.getPageBreaks(section); var next=false;
		if (breaks.length<2) {
		    // This is the case where the section has been CSS-scaled,
		    //  which doesn't get reflected in the offsetHeight.
		    var next=Codex.sections[cursection];
		    var breaks=Codex.layout.getPageBreaks(next);
		    next={sectnum: cursection+1, section: next,
			  breaks: breaks, pageoff: 0,
			  tops: Codex.layout.pagetops[cursection],
			  off: 0};
		    if (Codex.pagecount)
			next.pagenum=Codex.layout.pagenums[cursection][0];
		    Codex.GoToSection(next,"pageForward",true);}
		else {
		    var pagetop=win.scrollTop;
		    var i=0, lim=breaks.length;
		    while ((i<lim)&&(pagetop>=breaks[i])) i++;
		    next={sectnum: cursection, section: section,
			  off: breaks[i], breaks: breaks, pageoff: i,
			  tops: Codex.layout.pagetops[cursection-1]};
		    if (Codex.pagecount)
			next.pagenum=Codex.layout.pagenums[cursection-1][i];
		    Codex.GoToSection(next,"pageForward",true);}}}
	else {
	    var delta=fdjtDOM.viewHeight()-50;
	    if (delta<0) delta=fdjtDOM.viewHeight();
	    var newy=fdjtDOM.viewTop()+delta;
	    window.scrollTo(fdjtDOM.viewLeft(),newy);}}
    Codex.pageForward=pageForward;

    function pageBackward(){
	if (Codex.Trace.gestures)
	    fdjtLog("pageBackward c=%o n=%o",Codex.curpage,Codex.pagecount);
	if ((Codex.mode==="scanning")||(Codex.mode==="tocscan"))
	    CodexMode(false);
	if ((Codex.bypage)&&(Codex.pagecount)) {
	    var newpage=false;
	    if (Codex.mode==="glosses") CodexMode(true);
	    if (Codex.curpage===0) {}
	    else {
		Codex.GoToPage(newpage=Codex.curpage-1,"pageBackward",true);}}
	else if (Codex.bysect) {
	    var win=Codex.window;
	    var section=Codex.section;
	    var cursection=Codex.cursect;
	    if (win.scrollTop<=0) {
		if (cursection<=1) {
		    // beep?
		    fdjtLog("Already at beginning");
		    return;}
		// At top, go back a section
		var newsection=Codex.sections[cursection-2];
		var breaks=Codex.layout.getPageBreaks(newsection);
		var nbreaks=((breaks)?(breaks.length):(0));
		var next={sectnum: cursection-1,
			  section: newsection,
			  breaks: breaks, pageoff: nbreaks-1,
			  tops: Codex.layout.pagetops[cursection-2]||false,
			  off: ((breaks)?(breaks[nbreaks-1]):(0))};
		if (Codex.pagecount) 
		    next.pagenum=
		    Codex.layout.pagenums[cursection-2][nbreaks-1];
		Codex.GoToSection(next,"pageBackward",true);}
	    else {
		var breaks=Codex.layout.getPageBreaks(section);
		var pagetop=win.scrollTop;
		var i=breaks.length-1;
		while ((i>=0)&&(breaks[i]>=pagetop)) i--;
		var next={sectnum: cursection,
			  section: section,
			  breaks: breaks, pageoff: i,
			  tops: Codex.layout.pagetops[cursection-1],
			  off: breaks[i]};
		if (Codex.pagecount) 
		    next.pagenum=
		    Codex.layout.pagenums[cursection-1][i];
		Codex.GoToSection(next,"pageBackward",true);}}
	else {
	    var delta=fdjtDOM.viewHeight()-50;
	    if (delta<0) delta=fdjtDOM.viewHeight();
	    var newy=fdjtDOM.viewTop()-delta;
	    window.scrollTo(fdjtDOM.viewLeft(),newy);}}
    Codex.pageBackward=pageBackward;

    function scanForward(){
	if (Codex.mode==="scanning") {}
	else if (Codex.mode==="tocscan") {}
	else if (Codex.scanning) CodexMode("scanning");
	else CodexMode("tocscan");
	if (Codex.mode==="tocscan") {
	    var head=Codex.head;
	    var headid=head.id||head.codexdupid;
	    var headinfo=Codex.docinfo[headid];
	    if (Codex.Trace.nav) 
		fdjtLog("scanForward/toc() head=%o info=%o n=%o h=%o",
			head,headinfo,headinfo.next,headinfo.head);
	    if (headinfo.next) Codex.GoTo(headinfo.next.elt,"scanForward");
	    else if ((headinfo.head)&&(headinfo.head.next)) {
		Codex.GoTo(headinfo.head.next.elt,"scanForward");
		CodexMode("toc");}
	    else if ((headinfo.head)&&(headinfo.head.head)&&
		     (headinfo.head.head.next)) 
		Codex.GoTo(headinfo.head.head.next.elt,"scanForward");
	    else CodexMode(false);
	    return;}
	var start=Codex.scanning;
	var scan=Codex.nextSlice(start);
	var ref=((scan)&&(Codex.getRef(scan)));
	if (Codex.Trace.nav) 
	    fdjtLog("scanForward() from %o/%o to %o/%o under %o",
		    start,Codex.getRef(start),scan,ref,Codex.scanning);
	if ((ref)&&(scan)) Codex.Scan(ref,scan);
	return scan;}
    Codex.scanForward=scanForward;

    function scanBackward(){
	if (Codex.mode==="scanning") {}
	else if (Codex.mode==="tocscan") {}
	else if (Codex.scanning) CodexMode("scanning");
	else CodexMode("tocscan");
	if (Codex.mode==="tocscan") {
	    var head=Codex.head;
	    var headid=head.id||head.codexdupid;
	    var headinfo=Codex.docinfo[headid];
	    if (Codex.Trace.nav) 
		fdjtLog("scanBackward/toc() head=%o info=%o p=%o h=%o",
			head,headinfo,headinfo.prev,headinfo.head);
	    if (headinfo.prev) Codex.GoTo(headinfo.prev.elt,"scanBackward");
	    else if (headinfo.head) 
		Codex.GoTo(headinfo.head.elt,"scanBackward");
	    else CodexMode(false);
	    return;}
	var scan=Codex.prevSlice(Codex.scanning);
	var ref=((scan)&&(Codex.getRef(scan)));
	if (Codex.Trace.nav) 
	    fdjtLog("scanBackward() from %o/%o to %o/%o under %o",
		    start,Codex.getRef(start),scan,ref,Codex.scanning);
	if ((ref)&&(scan)) Codex.Scan(ref,scan);
	return scan;}
    Codex.scanBackward=scanBackward;

    function scanner_tapped(evt){
	evt=evt||event;
	var target=fdjtUI.T(evt);
	if (isClickable(target)) return;
	if ((getParent(target,".tool"))) {
	    var card=getCard(target);
	    if ((card)&&((card.name)||(card.getAttribute("name")))) {
		var name=(card.name)||(card.getAttribute("name"));
		var gloss=fdjtKB.ref(name,Codex.glosses);
		if (!(gloss)) return;
		Codex.setGlossTarget(gloss);	    
		CodexMode("addgloss");
		return;}
	    else return;}
	var scanning=Codex.scanning;
	if (!(scanning)) return;
	var hudparent=getParent(scanning,".hudpanel");
	if (getParent(scanning,fdjtID("CODEXALLGLOSSES"))) {
	    CodexMode("allglosses");
	    fdjtUI.cancel(evt);}
	else if (getParent(scanning,fdjtID("CODEXSEARCH"))) {
	    CodexMode("searchresults");
	    fdjtUI.cancel(evt);}
	else {}}

    /* Entering page numbers and locations */

    function enterPageNum(evt) {
	evt=evt||event;
	fdjtUI.cancel(evt);
	if (Codex.hudup) {CodexMode(false); return;}
	CodexMode.toggle("gotopage");}
    function enterLocation(evt) {
	evt=evt||event;
	fdjtUI.cancel(evt);
	if (Codex.hudup) {CodexMode(false); return;}
	CodexMode.toggle("gotoloc");}
    
    /* Other handlers */

    function flyleaf_tap(evt){
	if (isClickable(evt)) return;
	else CodexMode(false);}

    function getOffX(evt){
	evt=evt||event;
	if ((evt.touches)&&(evt.touches.length)) {
	    var touch=evt.touches[0];
	    var pinfo=fdjtID("CODEXPAGEINFO");
	    var target=touch.target;
	    while ((target)&&(target.nodeType!==1)) target=target.parentNode;
	    var geom=getGeometry(target,pinfo);
	    var tx=geom.left;
	    return touch.clientX-(tx+pinfo.offsetLeft);}
	else if ((evt.clientX)) {
	    var pinfo=fdjtID("CODEXPAGEINFO");
	    return evt.clientX-(pinfo.offsetLeft);}
	else return false;}

    function head_click(evt){
	if (Codex.Trace.gestures) fdjtLog("head_click %o",evt);
	if (isClickable(evt)) return;
	else if (Codex.mode==='help') {
	    fdjtUI.cancel(evt);
	    CodexMode(true);}
	else if (Codex.mode) return;
	else {
	    fdjtUI.cancel(evt);
	    CodexMode(true);}}
    function foot_click(evt){
	if (Codex.Trace.gestures) fdjtLog("foot_click %o",evt);
	if (isClickable(evt)) return;
	else if (Codex.mode) {
	    fdjtUI.cancel(evt);
	    CodexMode(false);
	    return;}}

    function pageinfo_tap(evt){
	var pageinfo=fdjtID("CODEXPAGEINFO");
	if ((Codex.hudup)||(Codex.mode)) {
	    fdjtUI.cancel(evt);
	    CodexMode(false);
	    return;}
	var offx=getOffX(evt);
	var offwidth=pageinfo.offsetWidth;
	var gopage=Math.floor((offx/offwidth)*Codex.pagecount)+1;
	//if ((Codex.Trace.gestures)||(hasClass(pageinfo,"codextrace")))
	    fdjtLog("pageinfo_tap %o off=%o/%o=%o gopage=%o/%o",
		    evt,offx,offwidth,offx/offwidth,
		    gopage,Codex.pagecount);
	if (!(offx)) return;
	fdjtUI.cancel(evt);
	Codex.GoToPage(gopage,"pageinfo_tap",true);
	if ((Codex.mode==="gotoloc")||(Codex.mode==="gotopage"))
	    CodexMode(false);}

    function pageinfo_hold(evt){
	var pageinfo=fdjtID("CODEXPAGEINFO");
	if ((Codex.hudup)||(Codex.mode)) {
	    fdjtUI.cancel(evt);
	    CodexMode(false);
	    return;}
	var offx=getOffX(evt);
	var offwidth=pageinfo.offsetWidth;
	var gopage=Math.floor((offx/offwidth)*Codex.pagecount)+1;
	if (gopage===1)
	    fdjtLog("gopage=%d, offx=%o",gopage,offx);
	if ((Codex.Trace.gestures)||(hasClass(pageinfo,"codextrace")))
	    fdjtLog("pageinfo_hold %o off=%o/%o=%o gopage=%o/%o",
		    evt,offx,offwidth,offx/offwidth,
		    gopage,Codex.pagecount);
	if (!(offx)) return;
	fdjtUI.cancel(evt);
	Codex.startPagePreview(gopage,"pageinfo_hold");}
    
    function pageinfo_release(evt){
	Codex.stopPagePreview("pageinfo_release");}

    function pageinfo_hover(evt){
	var pageinfo=fdjtID("CODEXPAGEINFO");
	var target=fdjtUI.T(evt);
	var offx=getOffX(evt);
	var offwidth=pageinfo.offsetWidth;
	var showpage=Math.floor((offx/offwidth)*Codex.pagecount)+1;
	if ((Codex.Trace.gestures)||(hasClass(pageinfo,"codextrace")))
	    fdjtLog("pageinfo_hover %o off=%o/%o=%o showpage=%o/%o",
		    evt,offx,offwidth,offx/offwidth,
		    showpage,Codex.pagecount);
	pageinfo.title=fdjtString("%d",showpage);
	if (fdjtUI.TapHold.ispressed()) {
	    var page=Codex.getPage(showpage);
	    if (hasClass(page,"curpage")) return;
	    Codex.startPreview(showpage,"pageinfo_hover");}}
    
    /* Gloss form handlers */

    /**** Clicking on outlets *****/
    function glossform_outlets_tapped(evt){
	evt=evt||event;
	var target=fdjtUI.T(evt);
	if (getParent(target,".checkspan"))
	    return fdjtUI.CheckSpan.onclick(evt);
	else if (getParent(target,".sharing"))
	    toggleClass(getParent(target,".sharing"),"expanded");
	else {}}
    Codex.UI.outlets_tapped=glossform_outlets_tapped;

    function outlet_tapped(evt){
	var target=fdjtUI.T(evt);
	var outletspan=fdjtDOM.getParent(target,'.outlet');
	if (!(outletspan)) return;
	var live=fdjtID("CODEXLIVEGLOSS");
	var form=((live)&&(fdjtDOM.getChild(live,"form")));
	var outlet=outletspan.value;
	Codex.addOutletToForm(form,outlet);
	fdjtUI.cancel(evt);}

    var glossmodes=Codex.glossmodes;

    function glossmode_button(evt){
	evt=evt||event;
	var target=fdjtUI.T(evt);
	var alt=target.alt, altclass, input;
	var form=fdjtDOM.getParent(target,'form');
	if (!(alt)) return;
	if (alt==="tag") {
	    altclass="addtag";
	    input=fdjtDOM.getInput(form,'TAG');}
	else if (alt==="link") {
	    altclass="addlink";
	    input=fdjtDOM.getInput(form,'LINK');}
	else if (alt==="excerpt") {
	    altclass="excerpt";
	    input=fdjtDOM.getInput(form,'EXCERPT');}
	else if (alt==="note") {
	    altclass="editnote";
	    input=fdjtDOM.getInput(form,'NOTE');}
	else if (alt==="sharing") {
	    altclass="sharing";
	    input=fdjtDOM.getInput(form,'OUTLET');}
	else return;
	// fdjtLog("glossmode_button gm=%s input=%o",altclass,input);
	if (!(hasClass(form,altclass))) {
	    if (alt==="tag") {
		addClass("CODEXHEART","tagging");
		Codex.UI.updateScroller("CODEXGLOSSCLOUD");}
	    else dropClass("CODEXHEART","tagging");
	    if (alt==="sharing") {
		addClass("CODEXHEART","showoutlets");
		Codex.UI.updateScroller("CODEXGLOSSOUTLETS");}
	    else dropClass("CODEXHEART","showoutlets");
	    swapClass(form,glossmodes,altclass);
	    Codex.setHUD(true);
	    Codex.setFocus(input);}
	else {
	    dropClass("CODEXHEART","tagging");
	    dropClass("CODEXHEART","showoutlets");
	    dropClass(form,glossmodes);}}

    /* Changing gloss networks */

    function changeGlossNetwork(evt){
	evt=evt||event;
	var target=fdjtUI.T(evt);
	var alternate=((fdjtDOM.hasParent(target,".codexglossform"))?
		       ("CODEXNETWORKBUTTONS"):(("CODEXLIVEGLOSS")));
	var doppels=fdjtDOM.getInputsFor(alternate,'NETWORKS',target.value);
	fdjtUI.CheckSpan.set(doppels,target.checked);}
    Codex.UI.changeGlossNetwork=changeGlossNetwork;

    /* Rules */

    var nobubble=fdjtUI.nobubble;
    var cancel=fdjtUI.cancel;

    function hideSplashToggle(evt) {
	evt=evt||event;
	var target=fdjtUI.T(evt);
	var newval=(!(Codex.hidesplash));
	var input=getParent(target,"input");
	if (input)
	    setTimeout(function(){
		Codex.setConfig('hidesplash',input.checked);
		Codex.saveConfig();},
		       100);
	else {
	    Codex.setConfig('hidesplash',newval);
	    Codex.saveConfig();}
	if ((newval)&&(Codex._setup)&&
	    ((fdjtTime()-(Codex._setup.getTime()))<30000))
	    CodexMode(false);}
    Codex.UI.handlers.mouse=
	{window: {
	    keyup: onkeyup,
	    keydown: onkeydown,
	    keypress: onkeypress,
	    mouseup: default_tap},
	 content: {mouseup: content_mouseup},
	 toc: {tap: toc_tapped,hold: toc_held,
	       release: toc_released,slip: toc_slipped,
	       mouseover: fdjtUI.CoHi.onmouseover,
	       mouseout: fdjtUI.CoHi.onmouseout},
	 glossmark: {mouseup: glossmark_tapped,
		     mouseover: glossmark_hoverstart,
		     mouseout: glossmark_hoverdone},
	 glossbutton: {mouseup: glossbutton_ontap,mousedown: cancel},
	 summary: {tap: slice_tapped, hold: slice_held,
		   release: slice_released},
	 // ".codexmargin": {click: edge_click},
	 "#CODEXHELP": {click: Codex.UI.dropHUD},
	 "#CODEXHUDHELP": {click: Codex.UI.dropHUD},
	 ".helphud": {click: Codex.UI.dropHUD},
	 ".codexheart": {tap: flyleaf_tap},
	 "#CODEXPAGEINFO": {tap: pageinfo_tap,
			    hold: pageinfo_hold,
			    release: pageinfo_release,
			    mousemove: pageinfo_hover},
	 "#CODEXPAGENOTEXT": {tap: enterPageNum},
	 "#CODEXLOCOFF": {tap: enterLocation},
	 // Return to scan
	 "#CODEXSCANNER": {click: scanner_tapped},
	 // Raise and lower HUD
	 "#CODEXPAGEHEAD": {tap: head_click},
	 "#CODEXHEAD": {tap: head_click},
	 "#CODEXPAGEFOOT": {tap: foot_click},
	 // Forward and backwards
	 "#CODEXPAGELEFT": {click: left_margin},
	 "#CODEXPAGERIGHT": {click: right_margin},
	 "#HIDESPLASHCHECKSPAN" : {click: hideSplashToggle},
	 "#HIDEHELPBUTTON" : {click: function(evt){CodexMode(false);}},
	 ".hudmodebutton": {click:hudbutton,mouseup:cancel,mousedown:cancel},
	 // GLOSSFORM rules
	 "span.codexglossdelete": { click: delete_ontap },
	 "span.codexglossrespond": { click: respond_ontap },
	 "span.codexsharegloss": {tap: fdjtUI.CheckSpan.onclick},
	 ".submitbutton": {click: submitEvent },
	 "div.glossetc": {click: fdjtUI.CheckSpan.onclick},
	 "div.glossetc div.sharing": {click: glossform_outlets_tapped},
	 "div.glossetc span.modebuttons": {click: glossmode_button},
	 "#CODEXGLOSSOUTLETS": {tap: outlet_tapped}};

    function justselect(evt){
	if (!(window.getSelection())) fdjtUI.cancel(evt);}

    Codex.UI.handlers.webtouch=
	{window: {
	    keyup: onkeyup,
	    keydown: onkeydown,
	    keypress: onkeypress,
	    touchmove: justselect},
	 content: {touchstart: content_touchstart,
		   touchmove: content_touchmove,
		   touchend: content_touchend},
	 toc: {tap: toc_tapped,hold: toc_held,
	       release: toc_released,slip: toc_slipped},
	 glossmark: {touchstart: glossmark_tapped,
		     touchend: cancel},
	 // glossbutton: {mouseup: glossbutton_ontap,mousedown: cancel},
	 summary: {tap: slice_tapped, hold: slice_held,release: slice_released},
	 // ".codexmargin": {click: edge_click},
	 "#CODEXHELP": {click: Codex.UI.dropHUD},
	 "#CODEXHUDHELP": {click: Codex.UI.dropHUD},
	 ".helphud": {click: Codex.UI.dropHUD},
	 "#CODEXPAGEFOOT": {},
	 "#CODEXPAGEINFO": {tap: pageinfo_tap,
			    hold: pageinfo_hold,
			    release: pageinfo_release},
	 "#CODEXPAGENOTEXT": {tap: enterPageNum},
	 "#CODEXLOCOFF": {tap: enterLocation},
	 // Return to scan
	 "#CODEXSCANNER": {tap: scanner_tapped},
	 // Raise and lower HUD
	 "#CODEXPAGEHEAD": {tap: head_click},
	 "#CODEXHEAD": {tap: head_click},
	 "#CODEXFOOT": {tap: foot_click},
	 // Forward and backwards
	 "#CODEXPAGELEFT": {touchstart: left_margin},
	 "#CODEXPAGERIGHT": {touchstart: right_margin},
	 "#HIDESPLASHCHECKSPAN" : {tap: hideSplashToggle},
	 "#HIDEHELPBUTTON" : {tap: function(evt){CodexMode(false);}},
	 /* ".hudbutton": {mouseover:hudbutton,mouseout:hudbutton}, */
	 ".hudmodebutton": {click: hudbutton},
	 // GLOSSFORM rules
	 "span.codexglossdelete": { click: delete_ontap },
	 "span.codexglossrespond": { click: respond_ontap },
	 "span.codexsharegloss": {click: fdjtUI.CheckSpan.onclick},
	 ".submitbutton": {click: submitEvent },
	 "div.glossetc span.links": {click: fdjtUI.CheckSpan.onclick},
	 "div.glossetc span.tags": {click: fdjtUI.CheckSpan.onclick},
	 "div.glossetc div.sharing": {click: glossform_outlets_tapped},
	 "div.glossetc span.modebuttons": {click: glossmode_button}};
    
}