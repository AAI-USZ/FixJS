function getTarget(scan,closest){
	scan=scan.target||scan.srcElement||scan;
	var target=false;
	while (scan) {
	    if (scan.codexui) return false;
	    else if (scan===Codex.root) return target;
	    else if ((scan.id)||(scan.codexdupid)) {
		if (hasParent(scan,CodexHUD)) return false;
		else if (hasParent(scan,".codexmargin")) return false;
		else if ((hasClass(scan,"sbooknofocus"))||
			 ((Codex.nofocus)&&(Codex.nofocus.match(scan))))
		    scan=scan.parentNode;
		else if ((hasClass(scan,"sbookfocus"))||
			 ((Codex.focus)&&(Codex.focus.match(scan))))
		    return scan;
		else if (!(fdjtDOM.hasText(scan)))
		    scan=scan.parentNode;
		else if (closest) return scan;
		else if (target) scan=scan.parentNode;
		else {target=scan; scan=scan.parentNode;}}
	    else scan=scan.parentNode;}
	return target;}