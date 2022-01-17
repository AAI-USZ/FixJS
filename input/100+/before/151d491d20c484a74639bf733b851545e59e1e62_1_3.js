function scanner_tapped(evt){
	evt=evt||event;
	var target=fdjtUI.T(evt);
	if (isClickable(target)) return;
	if ((getParent(target,".tool"))) {
	    var card=getCard(target);
	    if ((card)&&((card.name)||(card.getAttribute("name")))) {
		var name=(card.name)||(card.getAttribute("name"));
		var gloss=fdjtKB.ref(name,Codex.glosses);
		if (!(gloss)) return;
		Codex.setGlossTarget(gloss);	    
		CodexMode("addgloss");
		return;}
	    else return;}
	if (!(getParent(target,".tochead"))) {
	    fdjtDOM.toggleClass("CODEXSCANNER","expanded");
	    return;}
	var scanning=Codex.scanning;
	if (!(scanning)) return;
	var hudparent=getParent(scanning,".hudpanel");
	if (getParent(scanning,fdjtID("CODEXALLGLOSSES"))) {
	    CodexMode("allglosses");
	    fdjtUI.cancel(evt);}
	else if (getParent(scanning,fdjtID("CODEXSEARCH"))) {
	    CodexMode("searchresults");
	    fdjtUI.cancel(evt);}
	else {}}