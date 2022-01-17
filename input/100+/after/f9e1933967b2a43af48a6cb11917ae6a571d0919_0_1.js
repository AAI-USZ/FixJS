function showHideActivityButtons(investigation_id, oLink){
	var bVisible = false;
	$$('.activitybuttoncontainer_'+investigation_id).each(function(oButtonContainer){
		oButtonContainer.toggle();
		bVisible = bVisible || oButtonContainer.getStyle('display')=='none';
	});
	
	var strLinkText = ""; 
	var strExpandCollapseText = "";
	if(bVisible){
		strLinkText = "Show Activities";
		strExpandCollapseText = "+";
	}
	else{
		strLinkText = "Hide Activities";
		strExpandCollapseText = "-";
	}
	
	$('oExpandCollapseText_'+investigation_id).update(strExpandCollapseText);
	oLink.update(strLinkText);
}