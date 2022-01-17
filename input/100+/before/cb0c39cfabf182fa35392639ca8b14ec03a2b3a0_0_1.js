function setLocation(location,force){
	if ((!(force)) && (Codex.location===location)) return;
	if (Codex.Trace.toc)
	    fdjtLog("Setting location to %o",location);
	var info=Codex.Info(Codex.head);
	while (info) {
	    var tocelt=document.getElementById("CODEXTOC4"+info.frag);
	    var flytocelt=document.getElementById("CODEXFLYTOC4"+info.frag);
	    var start=tocelt.sbook_start; var end=tocelt.sbook_end;
	    var progress=((location-start)*100)/(end-start);
	    var bar=fdjtDOM.getFirstChild(tocelt,".progressbar");
	    var appbar=fdjtDOM.getFirstChild(flytocelt,".progressbar");
	    tocelt.title=flytocelt.title=Math.round(progress)+"%";
	    if (Codex.Trace.toc)
		fdjtLog("For tocbar %o loc=%o start=%o end=%o progress=%o",
			bar,location,start,end,progress);
	    if ((bar)&& (progress>=0) && (progress<=100)) {
		// bar.style.width=((progress)+10)+"%";
		// appbar.style.width=((progress)+10)+"%";
		bar.style.width=(progress)+"%";
		appbar.style.width=(progress)+"%";
	    }
	    info=info.head;}
	var spanbars=fdjtDOM.$(".spanbar");
	var i=0; while (i<spanbars.length) {
	    var spanbar=spanbars[i++];
	    var width=spanbar.ends-spanbar.starts;
	    var ratio=(location-spanbar.starts)/width;
	    if (Codex.Trace.toc)
		fdjtLog("ratio for spanbar %o[%d] is %o [%o,%o,%o]",
			spanbar,spanbar.childNodes[0].childNodes.length,
			ratio,spanbar.starts,location,spanbar.ends);
	    if ((ratio>=0) && (ratio<=1)) {
		var progressbox=fdjtDOM.$(".progressbox",spanbar);
		if (progressbox.length>0) {
		    progressbox[0].style.left=((Math.round(ratio*10000))/100)+"%";}}}
	Codex.location=location;}