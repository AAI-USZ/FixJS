function enhancementFailedWriteJob(d, type) {
	var out = "<tr class='parent "+type+"' id='a"+d.id+"'>";
	out = out + "<td>"+type+"</td><td>"+d.id+"</td><td>";
	for (failedService in d.failedServices){
		className = d.failedServices[failedService];
		lastIndex = className.lastIndexOf(".");
		if (lastIndex != -1)
			className = className.substring(lastIndex+1);
		out += className + "<br/>";
	}
	out = out + "</td><td><ul>";
	var messageCount = 0;
	for (messageID in d.messageIDs){
		out += "<li><span id=\"" + type + "_" + d.messageIDs[messageID] + "\" class='failedMessage detailsLink'>Message " + (++messageCount) + "</span></li>";
	}
	out = out + "</ul></td></tr>";
	return out;
}