function enhancementWriteJob(d, type) {
	console.log("enhancement write");
	var out = "<tr class='parent "+type+"' id='a"+d.id+"'>";
	out = out + "<td>"+type+"</td><td>"+d.targetPID+"</td><td>";
	for (filteredService in d.filteredServices){
		out += d.filteredServices[filteredService] + "<br/>";
	}
	out = out + "</td><td>";
	var messageCount = 0;
	for (messageID in d.messageIDs){
		out += "<span id=\"" + type + "_" + messageID + "\">Message " + (++messageCount) + "</span><br/>";
	}
	out = out + "</td></tr>";
	return out;
}