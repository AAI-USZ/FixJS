function(){
    var trace_taps=true;
    var debug_taps=true;
    var window_setup=false;
    
    var touched=false;
    var pressed=false;
    var th_target=false;
    var th_timer=false;
    var mouse_down=false;
    var holdkey_down=false;
    var start_x=false;
    var start_y=false;
    var touch_x=false;
    var touch_y=false;
    
    var getGeometry=fdjtDOM.getGeometry;
    var addClass=fdjtDOM.addClass;
    var hasClass=fdjtDOM.hasClass;
    var hasParent=fdjtDOM.hasParent;
    var reticle=fdjtUI.Reticle;
    var cancel=fdjtUI.cancel;
    // We disable the default behavior, which is usually selection
    // (where we do tap and hold)
    var nodefault=fdjtUI.nodefault;
    var dontcancel=function(evt){};

    var keynums={
	shift: 16, alt: 18, control: 17, meta: 224,
	os: 91, altgr: 225, fn: -1,
	numlock: 144, capslock: 20, scrolllock: 145};
    var keynames={};
    for (var akeyname in keynums)
	if (keynums.hasOwnProperty(akeyname)) {
	    var akeynum=keynums[akeyname];
	    if ((typeof akeynum === 'number')&&(akeynum>0))
		keynames[akeynum]=akeyname;}
    
    function getTarget(evt){
	if ((evt.changedTouches)&&((evt.changedTouches.length)))
	    return evt.changedTouches[evt.changedTouches.length-1].target;
	else return fdjtUI.T(evt);}

    function getClientX(evt){
	if (typeof evt.offsetX === "number") return evt.clientX;
	else if ((evt.touches)&&(evt.touches.length)) {
	    var touch=evt.touches[0];
	    return touch.clientX;}
	else if (typeof evt.clientX === "number") return evt.clientX;
	else return false;}
    function getClientY(evt){
	if (typeof evt.offsetY === "number") return evt.clientY;
	else if ((evt.touches)&&(evt.touches.length)) {
	    var touch=evt.touches[0];
	    return touch.clientY;}
	else if (typeof evt.clientY === "number") return evt.clientY;
	else return false;}
    
    function fakeEvent(target,etype,orig){
	var evt = document.createEvent("UIEvent");
	if (trace_taps)
	    fdjtLog("Synthesizing %s on %o @%d,%d",etype,target,
		    touch_x,touch_y);
	var event_arg=
	    (((orig)&&(orig.touches)&&(orig.touches.length))||
	     ((orig)&&(orig.button))||
	     1);
	evt.initUIEvent(etype, true, true,window,event_arg);
	evt.clientX=touch_x; evt.clientY=touch_y;
	// If the target no longer has a parent, it's been removed
	//  from the DOM, so we use the originating event target (if
	//  there is one)
	if ((orig)&&(!(target.parentNode))) target=fdjtUI.T(orig);
	if (orig) nodefault(orig);
	target.dispatchEvent(evt);}

    function tap_handler(evt){
	var target=fdjtUI.T(evt);
	var msgelt=fdjtID("TAPHOLDMESSAGE");
	if (msgelt) msgelt.innerHTML=fdjtString("Tapped %o",target);
	fdjtLog("Tapped %o",target);}
    function hold_handler(evt){
	var target=fdjtUI.T(evt);
	var msgelt=fdjtID("TAPHOLDMESSAGE");
	if (msgelt) msgelt.innerHTML=fdjtString("Held %o",target);
	fdjtLog("Held %o",target);}
    function release_handler(evt){
	var target=fdjtUI.T(evt);
	var msgelt=fdjtID("TAPHOLDMESSAGE");
	if (msgelt) msgelt.innerHTML=fdjtString("Released %o",target);
	fdjtLog("Released %o",target);}

    function tapped(target,evt){return fakeEvent(target,"tap",evt);}
    function held(target,evt){return fakeEvent(target,"hold",evt);}
    function released(target,evt){return fakeEvent(target,"release",evt);}
    function slipped(target,evt){return fakeEvent(target,"slip",evt);}

    function startpress(evt){
	if (touched) return;
	if (pressed) return;
	if (th_timer) return;
	if (!(th_target)) return;
	touched=th_target; pressed=false;
	if (trace_taps) fdjtLog("startpress %o",evt);
	if (reticle.live) reticle.highlight(true);
	nodefault(evt);
	th_timer=setTimeout((function(evt){
	    if (trace_taps) fdjtLog("startpress/timeout %o",evt);
	    pressed=th_target;
	    held(th_target,evt);
	    th_timer=false;
	    touched=false;}),TapHold.interval||300);}
    function endpress(evt){
	if ((!(pressed))&&(!(touched))&&(!(th_timer))) return;
	if (th_timer) {
	    if (trace_taps)
		fdjtLog("endpress %o t=%o p=%o",evt,th_target,pressed);
	    clearTimeout(th_timer); th_timer=false;
	    if (reticle.live) 
		setTimeout(function(){reticle.highlight(false);},1500);
	    if (th_target===touched) tapped(th_target,evt);}
	else if (pressed) {released(pressed,evt);}
	if (reticle.live) reticle.highlight(false);
	nodefault(evt);
	start_x=false; start_y=false;
	touched=false; pressed=false;}
    function abortpress(evt){
	if (th_timer) {
	    clearTimeout(th_timer); th_timer=false;}
	else if (pressed) {released(pressed,evt);}
	if (reticle.live) reticle.highlight(false);
	touched=false; pressed=false;}

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

    function mousemove(evt){
	evt=evt||event;
	var target=fdjtUI.T(evt);
	// if (target!==th_target) fdjtLog("New target %o",target);
	th_target=target;
	touch_x=evt.clientX||getClientX(evt);
	touch_y=evt.clientY||getClientY(evt);
	if ((start_x)&&(start_y)&&(th_timer)&&
	    (((Math.abs(touch_x-start_x))+(Math.abs(touch_y-start_y)))>12)) {
	    clearTimeout(th_timer);
	    th_timer=pressed=th_target=false;}
	if (evt.touches) th_target=document.elementFromPoint(touch_x,touch_y);
	if ((evt.touches)&&(evt.touches.length)&&
	    (evt.touches.length>1))
	    return;
	else {
	    if (reticle.live) reticle.onmousemove(evt);
	    nodefault(evt);}
	if ((pressed)&&
	    (th_target!==pressed)) {
	    if (trace_taps)
		fdjtLog("move %o %o %d,%d",
			th_target,th_target.name,touch_x,touch_y);
	    slipped(pressed);
	    pressed=th_target;
	    held(pressed);}}
    
    function keydown(evt){
	evt=evt||event;
	if (!(TapHold.holdkey)) return;
	var holdkey=TapHold.holdkey, holdkeynum, holdkeyname;
	if (!(holdkey)) return;
	else if (holdkey===true) holdkey="Shift";
	if (typeof holdkey === 'number') {
	    holdkeyname=keynames[holdkey];
	    holdkeynum=holdkey;}
	else if (typeof holdkey === 'string') {
	    holdkeynum=keynums[holdkey.toLowerCase()];
	    holdkeyname=holdkey.toLowerCase();}
	else {
	    fdjtLog.warn("Invalid holdkey specification %s",holdkey);
	    return;}
	if ((evt.key===holdkeyname)||
	    (evt.keyCode===holdkeynum)||
	    ((evt.getModifierState)&&
	     (evt.getModifierState(holdkeyname)))) {
	    holdkey_down=true;
	    var target=fdjtUI.T(evt);
	    if ((target)&&(target.tagName)&&
		((target.tagName==='INPUT')||
		 (target.tagName==='TEXTAREA')||
		 (hasParent(target,"input,textarea"))))
		return;
	    else if (!(touched)) startpress(evt);}}
    function mousedown(evt){
	evt=evt||event;
	if ((evt.shiftKey)||(evt.ctrlKey)||
	    (evt.altKey)||(evt.metaKey)||
	    (evt.button))
	    return;
	mouse_down=true;
	th_target=fdjtUI.T(evt);
	start_x=touch_x=evt.clientX||getClientX(evt);
	start_x=touch_y=evt.clientY||getClientY(evt);
	if (trace_taps)
	    fdjtLog("down %o t=%o x=%o y=%o",evt,th_target,start_x,start_y);
	if (evt.ctrlKey) return;
	if ((evt.touches)&&(evt.touches.length)&&
	    (evt.touches.length>1))
	    return;
	if (fdjtUI.isClickable(evt)) return;
	if (!(touched)) startpress(th_target,evt);
	nodefault(evt);}
    
    function keyup(evt){
	evt=evt||event;
	if (!(TapHold.holdkey)) return;
	var holdkey=TapHold.holdkey, holdkeynum, holdkeyname;
	if (!(holdkey)) return;
	else if (holdkey===true) holdkey="Shift";
	if (typeof holdkey === 'number') {
	    holdkeyname=keynames[holdkey];
	    holdkeynum=holdkey;}
	else if (typeof holdkey === 'string') {
	    holdkeynum=keynums[holdkey.toLowerCase()];
	    holdkeyname=holdkey.toLowerCase();}
	else {
	    fdjtLog.warn("Invalid holdkey specification %s",holdkey);
	    return;}
	if ((evt.key===holdkeyname)||
	    (evt.keyCode===holdkeynum)||
	    ((evt.getModifierState)&&
	     (evt.getModifierState(holdkeyname)))) {
	    holdkey_down=false;
	    if ((!(holdkey_down))&&(!(mouse_down))) endpress();}}
    TapHold.keyup=keyup;
    function mouseup(evt){
	evt=evt||event;
	if (!(mouse_down)) return;
	mouse_down=false;
	touch_x=evt.clientX||getClientX(evt)||touch_x;
	touch_y=evt.clientY||getClientY(evt)||touch_y;
	if (trace_taps)
	    fdjtLog("up %o etl=%o tht=%o sx=%o sy=%o x=%o y=%o",evt,
		    ((evt.touches)&&(evt.touches.length)&&
		     evt.touches.length),
		    th_target,start_x,start_y,touch_x,touch_y);
	if ((evt.touches)&&(evt.touches.length)&&
	    (evt.touches.length>1))
	    return;
	if (fdjtUI.isClickable(evt)) return;
	if ((!(holdkey_down))&&(!(mouse_down)))
	    endpress(evt);
	else if (trace_taps)
	    fdjtLog("md=%o, kd=%o",mouse_down,holdkey_down);
	else {}
	nodefault(evt);}

    function TapHold(elt,fortouch){
	elt=elt||window;
	addClass(elt,"fdjtaphold");
	fdjtDOM.addListener(elt,((fortouch)?("touchmove"):("mousemove")),
			    mousemove);
	fdjtDOM.addListener(elt,((fortouch)?("touchstart"):("mousedown")),
			    mousedown);
	fdjtDOM.addListener(elt,((fortouch)?("touchend"):("mouseup")),
			    mouseup);
	if (!(window_setup)) {
	    fdjtDOM.addListener(document,
				((fortouch)?("touchmove"):("mousemove")),
				outer_mousemove);
	    fdjtDOM.addListener(document,"keydown",keydown);
	    fdjtDOM.addListener(document,"keyup",keyup);
	    window_setup=window;}

	if (debug_taps) {
	    fdjtDOM.addListener(elt,"tap",tap_handler);
	    fdjtDOM.addListener(elt,"hold",hold_handler);
	    fdjtDOM.addListener(elt,"release",release_handler);}}
    TapHold.mouseup=mouseup;
    TapHold.mousedown=mousedown;
    TapHold.keydown=keydown;
    TapHold.holdkey=16;

    TapHold.ispressed=function(){
	return (pressed);}

    return TapHold;}