function(){
	$(".shipwindow .close").bind("click", shipWindowManager.close);
	$(".ewentry.CCEW .button1").bind("click", ew.buttonDeassignEW);
	$(".ewentry.CCEW .button2").bind("click", ew.buttonAssignEW);
    $(".ewentry.BDEW .button1").bind("click", ew.buttonDeassignEW);
	$(".ewentry.BDEW .button2").bind("click", ew.buttonAssignEW);
	$(".shipwindow .system .plus").bind("click", shipWindowManager.clickPlus);
	$(".shipwindow .system .minus").bind("click", shipWindowManager.clickMinus);
	$(".shipwindow .system").bind("click", shipWindowManager.clickSystem);
	$(".assignthrustcontainer .cancel").bind("click", shipWindowManager.cancelAssignThrustEvent);
	$(".assignthrustcontainer .ok").bind("click", shipWindowManager.doneAssignThrust);
	
	
	$(".shipwindow .system .off").bind("click", shipManager.power.onOfflineClicked);
	$(".shipwindow .system .on").bind("click", shipManager.power.onOnlineClicked);
	$(".shipwindow .system .overload").bind("click", shipManager.power.onOverloadClicked);
	$(".shipwindow .system .stopoverload").bind("click", shipManager.power.onStopOverloadClicked);
	$(".shipwindow .system .holdfire").bind("click", window.weaponManager.onHoldfireClicked);
	$(".shipwindow .system .mode").bind("click", window.weaponManager.onModeClicked);
}