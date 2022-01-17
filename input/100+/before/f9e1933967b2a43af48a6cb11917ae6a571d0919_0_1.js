function showHideActivityButtons(investigation_id, oLink){
	var bVisible = false;
	$$('.activitybuttoncontainer_'+investigation_id).each(function(oButtonContainer){
		oButtonContainer.toggle();
		bVisible = bVisible || oButtonContainer.getStyle('display')=='none';
	});
	
	var strLinkText = ""; 
	var strExpandCollapseText = "";
	if(bVisible){
		strLinkText = "Show Run Activity buttons";
		strExpandCollapseText = "+";
	}
	else{
		strLinkText = "Hide Run Activity buttons";
		strExpandCollapseText = "-";
	}
	
	$('oExpandCollapseText_'+investigation_id).update(strExpandCollapseText);
	oLink.update(strLinkText);
}