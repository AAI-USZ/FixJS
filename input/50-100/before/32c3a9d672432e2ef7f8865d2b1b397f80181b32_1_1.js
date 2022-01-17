function setupTOC(root_info){
	    var navhud=createNavHUD("div#CODEXTOC.hudpanel",root_info);
	    var toc_button=fdjtID("CODEXTOCBUTTON");
	    toc_button.style.visibility='';
	    Codex.TOC=navhud;
	    fdjtDOM.replace("CODEXTOC",navhud);
	    var flytoc=createStaticTOC("div#CODEXFLYTOC",root_info);
	    Codex.Flytoc=flytoc;
	    fdjtDOM(fdjtID("FLYTOC"),flytoc);}