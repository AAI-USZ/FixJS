function updateTOC(head,tocroot){
	    var prefix=getTOCPrefix(tocroot.id);
	    var cur=(getChildren(tocroot,".codexcurhead"));
	    var live=(getChildren(tocroot,".codexlivehead"));
	    var cxt=(getChildren(tocroot,".codexcxthead"));
	    dropClass(tocroot,"codexcxthead");
	    dropClass(tocroot,"codexcurhead");
	    dropClass(cur,"codexcurhead");
	    dropClass(live,"codexlivehead");
	    dropClass(cxt,"codexcxthead");
	    if (!(head)) return;
	    var base_elt=document.getElementById(prefix+head.frag);
	    var toshow=[]; var base_info=head;
	    while (head) {
		var tocelt=document.getElementById(prefix+head.frag);
		if (tocelt) toshow.push(tocelt);
		head=head.head;}
	    var n=toshow.length-1;
	    if ((base_info.sub)&&(base_info.sub.length))
		addClass(base_elt,"codexcxthead");
	    else if (toshow[1]) addClass(toshow[1],"codexcxthead");
	    else {}
	    // Go backwards to accomodate some redisplayers
	    while (n>=0) {
		var show=toshow[n--];
		if ((show.tagName==='A')&&
		    (show.className.search(/\bbrick\b/)>=0))
		    addClass(show.parentNode,"codexlivehead");
		addClass(show,"codexlivehead");}
	    addClass(base_elt,"codexcurhead");}