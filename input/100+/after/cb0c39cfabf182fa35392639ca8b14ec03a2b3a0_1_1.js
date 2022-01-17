function createNavHUD(eltspec,root_info){
	    var scan=root_info;
	    while (scan) {
		if ((!(scan.sub))||(scan.sub.length===0)) break;
		else if (scan.sub.length>1) {
		    root_info=scan; break;}
		else scan=scan.sub[0];}
	    var toc_div=CodexTOC(root_info,0,false,"CODEXTOC4",true);
	    var div=fdjtDOM(eltspec||"div#CODEXTOC.hudpanel",toc_div);
	    Codex.UI.addHandlers(div,"toc");
	    return div;}