function() {
	var arrTabs = $$('#oTabcontainer .tab');
	arrTabs.each(function(oTab){
		oTab.observe('click',function(){
			showInstructionalMaterial(oTab);
		});
	});
	var strTabID = arrTabs[0].id;
	setSelectedTab(strTabID);
}