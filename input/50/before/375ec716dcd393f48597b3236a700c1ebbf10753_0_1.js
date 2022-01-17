function changeEntryWeek(){
	var selIndex = dojo.byId('entry_week_change').selectedIndex;
	var selValue = dojo.byId('entry_week_change').options[selIndex].value;
	window.location = "/scoreentry?week="+selValue;
}