function() {
	var arrTabs = $$('#oTabcontainer .tab');
	arrTabs.each(function(oTab){
		oTab.observe('click',function(){
			showInstructionalMaterial(oTab);
		});
	});
	if (arrTabs.length > 0)
	{
		var strTabID = arrTabs[0].id;
		setSelectedTab(strTabID);
	}
}