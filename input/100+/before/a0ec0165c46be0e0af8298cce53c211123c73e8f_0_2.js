function showglossinfo(info) {
	var user=info.maker;
	var feed=info.feed||false;
	var userinfo=Codex.sourcekb.map[user];
	var feedinfo=Codex.sourcekb.map[feed];
	var agestring=timestring(info._modified||info._created);
	var tool=fdjtDOM(
	    "span.tool",fdjtDOM("span.age",agestring),
	    fdjtDOM.Image(((user===Codex.user._id)?
			   (cxicon("remark_edit")):
			   (cxicon("remark_respond"))),
			  "img.button"));
	tool.title=(((user===Codex.user)||(user===Codex.user._id))?
		    ("edit this gloss"):
		    ("relay/reply to this gloss"));
	var picinfo=getpicinfo(info);
	var overdoc=getoverdoc(info);
	
	return [((picinfo)?
		 (fdjtDOM.Image(picinfo.src,picinfo.classname,picinfo.alt)):
		 (getfakepic(info.maker,"div.sourcepic"))),
		((overdoc)&&(overdoc.name)&&
		 (fdjtDOM("span.overdoc",(overdoc.name)))),
		((overdoc)&&(overdoc.name)&&(" \u00b7 ")),
		(((!(overdoc))&&(userinfo)&&
		  ((userinfo.name)||(userinfo.userid)))&&
		 (fdjtDOM("span.user",((userinfo.name)||(userinfo.userid))))),
		((!(overdoc))&&(userinfo)&&
		 ((userinfo.name)||(userinfo.userid))&&
		 (" \u2014 ")),
		tool];}