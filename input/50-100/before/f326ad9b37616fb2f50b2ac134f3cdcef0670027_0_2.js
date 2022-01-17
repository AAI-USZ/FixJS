function enhancementWriteJob(d, type) {
	var out = "<tr class='parent "+type+"' id='a"+d.id+"'>";
	out = out + "<td>"+type+"</td><td>"+d.targetPID+"</td><td><ul>";
	for (filteredService in d.filteredServices){
		out += "<li>" + d.filteredServices[filteredService] + "</li>";
	}
	out = out + "</ul></td><td>";
	out += "<span id=\"" + type + "_" + d.id + "\" class='" + type + "Message detailsLink'>Message</span><br/>";
	out = out + "</td></tr>";
	return out;
}