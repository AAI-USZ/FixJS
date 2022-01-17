function VoluniApp() {
	//hold a reference to the new VoluniApp object
	va = this;
    
	//initialization flag
    va.init = false;
	//the url of the page loaded into the voluniapp iframe
	va.url = "";
	//the rid of the page loaded into the voluniapp iframe
	va.rid = "";
	
	//extension preferences (the constructor send a request to get the 
	//localStorage of the application)
	va.pref = new VoluniAppPref(va);
	
	//Size of the top/right sense area (for the auto hide/show feature)
	va.topSenseHei = 5;
	va.rightSenseWid = 20;
	
	//voluniapp wrapper
	va.wrp = document.createElement("div");
	$(va.wrp).attr("id","vaWrp");
	//voluniapp iframe
	va.frm = document.createElement("iframe");
	$(va.frm).attr("id","vaFrm");
	
	//append every htmlElement to the wrapper that will be injected into the webpage
	$(va.wrp).append(va.frm);
	
	//bind a listener to the chrome onRequest event
	chrome.extension.onRequest.addListener(va.request);
}