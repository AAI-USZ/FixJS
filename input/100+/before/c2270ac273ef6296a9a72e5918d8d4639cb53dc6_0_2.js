function enhancementWriteJob(d, type) {
	console.log("enhancement write");
	var out = "<tr class='parent "+type+"' id='a"+d.id+"'>";
	out = out + "<td>"+type+"</td><td>"+d.targetPID+"</td><td>";
	for (filteredService in d.filteredServices){
		out += d.filteredServices[filteredService] + "<br/>";
	}
	out = out + "</td></tr>" 
	out = out + "<tr class='child "+type+"' id='child-a"+d.id+"' style='display: none'><td colspan='5'>";
	/*if(d.startTime != null) out += "<p>Started: "+dateFormat(new Date(d.startTime))+"</p>";
	if(d.failedTime != null) out += "<p>Failed: "+dateFormat(new Date(d.failedTime))+"</p>";
	if(d.finishedTime != null) out += "<p>Finished: "+dateFormat(new Date(d.finishedTime))+"</p>";
	if(d.startTime != null) {
		if(d.finishedTime != null) {
			out += "<p>Elapsed: "+(d.finishedTime-d.startTime)/1000+" seconds</p>";	
		} else if(d.failedTime != null) {
			out += "<p>Elapsed: "+(d.failedTime-d.startTime)/1000+" seconds</p>";
		} else {
			out += "<p>Elapsed: "+(Date.now()-d.startTime)/1000+" seconds</p>";
		}
	}	
	if(d.depositId != null) out += "<p>Deposit ID: "+d.depositId+"</p>";
	if(d.error != null) out += "<h3>Error Log</h3><p>"+d.error+"</p>";*/
	out = out + "</td></tr>";
	return out;
}