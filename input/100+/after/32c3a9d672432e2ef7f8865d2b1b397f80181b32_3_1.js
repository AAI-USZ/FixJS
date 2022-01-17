function deviceSetup(){
	    var useragent=navigator.userAgent;
	    var body=document.body;

	    var isiPhone = (/iphone/gi).test(navigator.appVersion);
	    var isTouchPad = (/Touchpad/gi).test(navigator.appVersion);
	    var isiPad = (/ipad/gi).test(navigator.appVersion);
	    var isAndroid = (/android/gi).test(navigator.appVersion);
	    var isWebKit = navigator.appVersion.search("WebKit")>=0;
	    var isWebTouch = isiPhone || isiPad || isAndroid || isTouchPad;

	    if (isWebTouch) {
		fdjtDOM.addClass(body,"cxTOUCH");
		viewportSetup();
		Codex.ui="webtouch"; Codex.touch=true;}
	    if ((useragent.search("Safari/")>0)&&
		(useragent.search("Mobile/")>0)) { 
		hide_mobile_safari_address_bar();
		Codex.nativescroll=false;
		Codex.scrolldivs=false;
		Codex.updatehash=false;
		default_config.layout='fastpage';
		default_config.keyboardhelp=false;
		// Have fdjtLog do it's own format conversion for the log
		fdjtLog.doformat=true;}
	    else if (useragent.search(/Android/gi)>0) {
		Codex.nativescroll=false;
		Codex.updatehash=false;
		Codex.scrolldivs=false;}
	    else if (sbook_faketouch) {
		fdjtDOM.addClass(body,"cxTOUCH");
		viewportSetup();
		Codex.ui="faketouch"}
	    else {
		fdjtDOM.addClass(body,"cxMOUSE");
		// fdjtDOM.addClass(document.body,"cxTOUCH");
		// fdjtDOM.addClass(document.body,"cxSHRINK");
		Codex.ui="mouse";}
	    var opt_string=
		fdjtString.stdspace(
		    ((isiPhone)?(" iPhone"):(""))+
			((isTouchPad)?(" TouchPad"):(""))+
			((isiPad)?(" iPad"):(""))+
			((isAndroid)?(" Android"):(""))+
			((isWebKit)?(" WebKit"):(""))+
			((isWebTouch)?(" touch"):(""))+
			((!(isWebTouch))?(" mouse"):(""))+
			((Codex.nativescroll)?(" nativescroll"):
			 (" iscroll"))+
			((Codex.updatehash)?(" updatehash"):
			 (" leavehash"))+
			((Codex.scrolldivs)?(" scrolldivs"):
			 (" noscrolldivs")));
	    fdjtLog("Device: %s %dx%d ui=%s, body=\"%s\"",
		    opt_string,fdjtDOM.viewWidth(),fdjtDOM.viewHeight(),
		    Codex.ui,body.className);}