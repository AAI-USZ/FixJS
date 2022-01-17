function Paginate(why,init){
	    
	    if (((Codex.layout)&&(!(Codex.layout.done)))) return;
	    if (!(why)) why="because";
	    if (Codex.layout) {
		Codex.layout.revert();
		Codex.layout=false;}
	    addClass(document.body,"pagelayout");
	    var height=getGeometry(fdjtID("CODEXPAGE")).height;
	    var width=getGeometry(fdjtID("CODEXPAGE")).width;
	    var bodysize=Codex.bodysize||"normal";
	    var bodyfamily=Codex.bodyfamily||"serif";
	    if (Codex.layout) {
		var current=Codex.layout;
		if ((!(init.forced))&&
		    (width===current.page_width)&&
		    (height===current.page_height)&&
		    (bodysize===current.bodysize)&&
		    (bodyfamily===current.bodyfamily)) {
		    fdjtLog("Skipping redundant pagination %j",current);
		    return;}
		// Repaginating, start with reversion
		Codex.layout.revert();
		Codex.layout=false;}

	    // Create a new layout
	    var layout=new CodexLayout(getLayoutArgs());
	    layout.bodysize=bodysize; layout.bodyfamily=bodyfamily;
	    Codex.layout=layout;
	    
	    // Prepare to do the layout
	    dropClass(document.body,"cxSCROLL");
	    dropClass(document.body,"cxBYSECT");
	    addClass(document.body,"cxBYPAGE");
	    fdjtID("CODEXPAGE").style.visibility='hidden';
	    fdjtID("CODEXCONTENT").style.visibility='hidden';
	    
	    // Now walk the content
	    var content=Codex.content;
	    var nodes=TOA(content.childNodes);
	    fdjtLog("Laying out %d root nodes into %dx%d pages (%s)",
		    nodes.length,layout.width,layout.height,
		    (why||""));

	    /* Lay out the coverpage */
	    var coverpage=Codex.getCoverPage();
	    if (coverpage) layout.addContent(coverpage);
	    
	    var i=0; var lim=nodes.length;
	    function rootloop(){
		if (i>=lim) {
		    layout.Finish();
		    layout_progress(layout);
		    fdjtID("CODEXPAGE").style.visibility='';
		    fdjtID("CODEXCONTENT").style.visibility='';
		    dropClass(document.body,"pagelayout");
		    Codex.layout=layout;
		    Codex.pagecount=layout.pages.length;
		    if (Codex.pagewait) {
			var fn=Codex.pagewait;
			Codex.pagewait=false;
			fn();}
		    Codex.GoTo(
			Codex.location||Codex.target||
			    Codex.coverpage||Codex.titlepage||
			    fdjtID("CODEXPAGE1"),
			"endLayout",false,false);
		    Codex.layout.running=false;}
		else {
		    var root=nodes[i++];
		    var timeslice=layout.timeslice||CodexLayout.timeslice||200;
		    var timeskip=layout.timeskip||CodexLayout.timeskip||50;
		    if (((root.nodeType===3)&&(!(isEmpty(root.nodeValue))))||
			((root.nodeType===1)&&
			 (root.tagName!=='LINK')&&(root.tagName!=='META')&&
			 (root.tagName!=='SCRIPT'))) 
			layout.addContent(root,timeslice,timeskip,
					  layout.tracelevel,
					  layout_progress,rootloop);
		    else rootloop();}}

	    	/* Reporting progress, debugging */
	
	    function layout_progress(info){
		var tracelevel=info.tracelevel;
		var started=info.started;
		var pagenum=info.pagenum;
		var now=fdjtTime();
		if (!(pagenum)) return;
		if (info.done) {
		    LayoutMessage(fdjtString(
			"Finished laying out %d pages in %s",
			pagenum,secs2short((info.done-info.started)/1000)));
		    if (tracelevel)
			fdjtLog("Finished laying out %d pages in %s",
				pagenum,secs2short((info.done-info.started)/1000));}
		else {
		    if ((info.lastid)&&(Codex.docinfo)&&
			((Codex.docinfo[info.lastid]))) {
			var docinfo=Codex.docinfo;
			var maxloc=docinfo._maxloc;
			var lastloc=docinfo[info.lastid].starts_at;
			var pct=(100*lastloc)/maxloc;
			fdjtUI.ProgressBar.setProgress("CODEXLAYOUTMESSAGE",pct);
			LayoutMessage(fdjtString(
			    "Laid out %d pages (%d%%) in %s",
			    pagenum,Math.floor(pct),
			    secs2short((now-started)/1000)));
			if (tracelevel)
			    fdjtLog("Laid out %d pages (%d%%) in %s",
				    pagenum,Math.floor(pct),
				    secs2short((now-started)/1000));}
		    else {
			LayoutMessage(fdjtString(
			    "Laid out %d pages in %s",
			    info.pagenum,secs2short((now-started)/1000)));
			if (tracelevel)
			    fdjtLog("Laid out %d pages in %s",
				    info.pagenum,secs2short((now-started)/1000));}}}
	
	    function LayoutMessage(msg){
		fdjtUI.ProgressBar.setMessage("CODEXLAYOUTMESSAGE",msg);}
	    
	    rootloop();}