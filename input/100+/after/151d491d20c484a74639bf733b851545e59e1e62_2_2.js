function showexcerpts(excerpts){
	if (typeof excerpts==='string')
	    return Ellipsis("span.excerpt",excerpts,140);
	else if (excerpts.length===1)
	    return Ellipsis("span.excerpt",excerpts[0],140);
	else {
	    var ediv=fdjtDOM("div.excerpts");
	    var i=0; var lim=excerpts.length;
	    while (i<lim)
		fdjtDOM(ediv,
			((i>0)&&" "),
			fdjtDOM("span.excerpt",odq,excerpts[i++],cdq));
	    return ediv;}}