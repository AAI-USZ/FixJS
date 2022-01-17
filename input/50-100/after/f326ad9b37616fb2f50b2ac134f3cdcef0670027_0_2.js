function enhancementWriteJob(d, type) {
	var out = "<tr class='parent "+type+" detailsLink' id='a"+d.id+"'>";
	out += "<td>"+type+"</td><td>"+d.targetPID+"</td><td><ul>";
	for (filteredService in d.filteredServices){
		out += "<li>" + d.filteredServices[filteredService] + "</li>";
	}
	out += "</ul></td></tr>";
	return out;
}