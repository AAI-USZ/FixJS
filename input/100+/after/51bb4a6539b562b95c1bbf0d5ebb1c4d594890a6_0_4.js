function ingestWriteJob(d, type) {
	var out = "<tr class='parent "+type+"' id='a"+d.id+"'>";
	out = out + "<td>"+type+"</td><td>"+d.submitter+"</td><td>"+dateFormat(d.submissionTime)+"</td><td>"+d.worked+"/"+d.size+"</td><td>"+d.containerPlacements[0].submittedLabel+"</td><td>"+d.message+"</td>";
	out = out + "</tr>";
	out = out + "<tr class='child "+type+"' id='child-a"+d.id+"'";
	if ($.inArray(d.id, selectedIDs) == -1){
		out += " style='display: none'";
	}
	out += "><td colspan='6'>";
	if(d.startTime != null) out += "<p>Started: "+dateFormat(new Date(d.startTime))+"</p>";
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
	if(d.error != null) out += "<h3>Error Log</h3><pre class='stacktrace'>"+d.error+"</pre>";
	out = out + "</td></tr>";
	return out;
}