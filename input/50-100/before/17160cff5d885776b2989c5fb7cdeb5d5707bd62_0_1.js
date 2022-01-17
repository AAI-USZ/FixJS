function changeSelectedEarthquake(value){
	// If the earthquake has been deemed not selectable, just exit the function.
	if(!isSelectable[value] || value==selectedEarthquake) return;
	selectedEarthquake=value
	
	table=document.getElementById("earthquakeTable");
	earthquakes=table.getElementsByTagName("tr");
	earthquakes[value].className="highlight";
	earthquakes[selectedEarthquake].className="";
}