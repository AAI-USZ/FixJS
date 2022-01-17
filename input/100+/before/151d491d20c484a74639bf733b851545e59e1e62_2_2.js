function showexcerpts(excerpts){
	if (typeof excerpts==='string')
	    return fdjtDOM("span.excerpt",odq,excerpts,cdq);
	else {
	    var espan=fdjtDOM("div.excerpts");
	    var i=0; var lim=excerpts.length;
	    while (i<lim)
		fdjtDOM(espan,
			((i>0)&&" "),
			fdjtDOM("span.excerpt",odq,excerpts[i++],cdq));
	    return espan;}}