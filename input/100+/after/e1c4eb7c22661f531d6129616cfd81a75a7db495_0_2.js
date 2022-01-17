function (){
	//check if the "acti" preference is set and if the application isn't
	//already initialized
	if(va.pref.acti==VoluniAppPref.ACTI_ACTIVE && !va.init) {
		//set the initialization flag
        va.init = true;
		
        //append the wrapper to the body of the webpage
        $("html").append(va.wrp);
        //set the url of the iframe that contains Volunia to the current webpage
		va.setFrmUrl(window.location.href);
		
		//bind a listener to the DOMReady event
		$(document).ready(va.ready);
		
		//bind a listener to the beforeUnload event
		$(window).bind("beforeunload.voluniapp",function(e){
			va.beforeUnload(e);
		});
		
		//bind a listener to the mousemove event (needed to understand if the mouse
		//has to interact with Volunia or with the webpage)
		$(document).bind("mousemove.voluniapp",function(e){
			va.mouseMove(e.pageX-window.scrollX,e.pageY-window.scrollY);
		});
		
		//bind a listener to the mouseclick event (needed for the autohide feature)
		$(document).bind("click.voluniapp",function(e){
			va.mouseClick(e.pageX-window.scrollX,e.pageY-window.scrollY);
		});
		
		//bind a listener to the keydown event (needed to catch the show/hide shortcut)
		$(document).bind("keydown.voluniapp",function(e){
			va.shortCut(e.keyCode, e.altKey);
		});
		
		//bind a listener to the DOMSubtreeModified event
		$(document).bind("DOMSubtreeModified.voluniapp",va.subModify);
		
		//to set z-index CSS property to the maximum value
		va.bringToFront();
	}
	//if the "acti" preference is set to deactivated and the application was
	//already initialized
	else if(va.pref.acti==VoluniAppPref.ACTI_DEACTI && va.init){
		//detach the wrapper from the webpage
		$(va.wrp).detach();
		
		//unbind all the listeners
		$(document).unbind("mousemove.voluniapp");
		$(document).unbind("click.voluniapp");
		$(document).unbind("keydown.voluniapp");
		$(document).unbind("DOMSubtreeModified.voluniapp");
		
		//unset the initialization flag
		va.init = false;
	}
}