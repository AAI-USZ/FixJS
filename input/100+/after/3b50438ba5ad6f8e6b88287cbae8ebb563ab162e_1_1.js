function() {
	var leftWS = document.getElementById('LeftWorkspace');
	if (!leftWS) return;
	var rightWS = document.getElementById('RightWorkspace'); 
	var windowHeight = gj(window).height();
	var root = gj(leftWS).parents(".UIHomePageDT:first")[0];
	var titleBar = gj(root).find("div.TitleBar:first")[0];
	var uiWorkingWorkspace = gj(root).find("div.UIWorkingWorkspace:first")[0];
	var actionBar = gj(uiWorkingWorkspace).find("div.ActionBar:first")[0];
	var actionBaroffsetHeight = 0;
	if(actionBar)
	  actionBaroffsetHeight = actionBar.offsetHeight;
	var breadcumbsPortlet = gj(uiWorkingWorkspace).find("div.BreadcumbsPortlet:first")[0];
	leftWS.style.height = windowHeight - (titleBar.offsetHeight + actionBaroffsetHeight + breadcumbsPortlet.offsetHeight + 55) + "px";
	if(rightWS)
	  rightWS.style.height = windowHeight - (titleBar.offsetHeight + actionBaroffsetHeight + breadcumbsPortlet.offsetHeight + 55) + "px";
}