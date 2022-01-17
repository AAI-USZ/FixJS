function renderNote(info,query,idprefix,standalone){
	var key=info._id;
	var target_id=(info.frag)||(info.id);
	var target=((target_id)&&(fdjtID(target_id)));
	var target_info=Codex.docinfo[target_id];
	var head_info=target_info.head;
	var head=((head_info)&&(head_info.elt));
	var refiners=((query) && (query._refiners));
	var score=((query)&&(query[key]));
	var body=
	    fdjtDOM("div.codexcardbody",
		    // (makelocrule(target_info,target_info.head)),
		    ((info.maker)&&(showglossinfo(info)))," ",
		    ((standalone)&&(showtocloc(target_info))),
		    ((score)&&(showscore(score))),
		    ((info.note)&&(fdjtDOM("span.note",info.note)))," ",
		    ((info.shared)&&(info.shared.length)&&
		     (info.shared.length<div_threshold)&&
		     (showaudience(info.shared)))," ",
		    ((info.excerpt)&&(showexcerpts(info.excerpt)))," ",
		    ((info.links)&&(showlinks(info.links,"span.link")))," ",
		    ((info.attachments)&&
		     (showlinks(info.attachments,"span.attachments")))," ",
		    ((info.shared)&&(info.shared.length)&&
		     (info.shared.length>=div_threshold)&&
		     (showaudience(info.shared))),
		    (((info.tags)||(info.autotags))&&(showtags(info))));
	var div=
	    fdjtDOM(((info.maker) ? "div.codexcard.gloss" : "div.codexcard"),
		    ((head)&&(makeTOCHead(head))),
		    ((head_info)&&(makeIDHead(target,head_info,true))),
		    ((standalone)&&(makelocbar(target_info))),
		    body);
	var makerinfo=((info.maker)&&(Codex.sourcekb.load(info.maker)));
	var tstamp=info.tstamp||info.modified||info.created;
	if (tstamp)
	    body.title="gloss from "+makerinfo.name+" at "+fdjtTime.shortString(tstamp);
	else div.title=Codex.getTitle(target,true);
	div.about="#"+info.frag;
	// div.setAttribute('about',"#"+info.id);
	if (idprefix) div.id=idprefix+info.id;
	if (info._id) {
	    div.name=div.qref=info._id;
	    div.setAttribute("name",info._id);}
	return div;}