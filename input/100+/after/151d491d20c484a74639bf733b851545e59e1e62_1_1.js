function slice_tapped(evt){
	var target=fdjtUI.T(evt);
	if (getParent(target,".ellipsis")) {
	    fdjtUI.Ellipsis.toggle(target);
	    fdjtUI.cancel(evt);
	    return;}
	var card=getCard(target);
	if ((!(getParent(target,".tool")))&&
	    (getParent(card,".codexslice"))) {
	    Codex.Scan(fdjtID(card.about),card);
	    return fdjtUI.cancel(evt);}
 	else if ((card.name)||(card.getAttribute("name"))) {
	    var name=(card.name)||(card.getAttribute("name"));
	    var gloss=fdjtKB.ref(name,Codex.glosses);
	    if (!(gloss)) return;
	    Codex.setGlossTarget(gloss);	    
	    CodexMode("addgloss");}
 	else if (card.about) {
	    Codex.JumpTo(card.about);}}