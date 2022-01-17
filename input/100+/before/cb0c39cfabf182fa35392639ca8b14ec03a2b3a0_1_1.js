function createNavHUD(eltspec,root_info){
	    var toc_div=CodexTOC(root_info,0,false,"CODEXTOC4",
				 ((root_info.sub.length>1)));
	    var div=fdjtDOM(eltspec||"div#CODEXTOC.hudpanel",toc_div);
	    Codex.UI.addHandlers(div,"toc");
	    return div;}