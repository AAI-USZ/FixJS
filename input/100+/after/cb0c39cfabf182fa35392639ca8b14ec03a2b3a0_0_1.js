function setLocation(location,force){
	if ((!(force)) && (Codex.location===location)) return;
	if (Codex.Trace.toc)
	    fdjtLog("Setting location to %o",location);
	var info=Codex.Info(Codex.head);
	while (info) {
	    var tocelt=document.getElementById("CODEXTOC4"+info.frag);
	    var flytocelt=document.getElementById("CODEXFLYTOC4"+info.frag);
	    var start=info.starts_at; var end=info.ends_at;
	    var progress=((location-start)*100)/(end-start);
	    var bar=false, appbar=false;
	    if (tocelt) {
		bar=fdjtDOM.getFirstChild(tocelt,".progressbar");
		tocelt.title=Math.round(progress)+"%";}
	    if (flytocelt) {
		appbar=fdjtDOM.getFirstChild(flytocelt,".progressbar");
		flytocelt.title=Math.round(progress)+"%";}
	    if (Codex.Trace.toc)
		fdjtLog("For tocbar %o/%o loc=%o start=%o end=%o progress=%o",
			bar,appbar,location,start,end,progress);
	    if ((progress>=0) && (progress<=100)) {
		if (bar) bar.style.width=(progress)+"%";
		if (appbar) appbar.style.width=(progress)+"%";}
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