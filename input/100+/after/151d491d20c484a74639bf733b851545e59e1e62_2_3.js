function () {

    var div_threshold=7;
    var debug_locbars=false;
    var odq="\u201c"; var cdq="\u201d";

    var cxicon=Codex.icon;
    var Ellipsis=fdjtUI.Ellipsis;

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
		    ((info.note)&&Ellipsis("span.note",info.note,140))," ",
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
	    body.title=
	    "gloss from "+(((makerinfo)&&(makerinfo.name))||"someone")+
	    " at "+fdjtTime.shortString(tstamp);
	else div.title=Codex.getTitle(target,true);
	div.about="#"+info.frag;
	// div.setAttribute('about',"#"+info.id);
	if (idprefix) div.id=idprefix+info.id;
	if (info._id) {
	    div.name=div.qref=info._id;
	    div.setAttribute("name",info._id);}
	return div;}
    Codex.renderNote=renderNote;
    
    var prime_thresh=7;
    function getprimetags(info){
	if (info.primetags) return info.primetags;
	var tags=info.tags;
	if (typeof tags==='string') tags=[tags];
	if (tags.length<=prime_thresh) return tags;
	var tagscores=Codex.index.tagscores;
	var prime=[].concat(info.tags);
	prime.sort(function(t1,t2){
	    var s1=tagscores[t1]; var s2=tagscores[t2];
	    if ((s1)&&(s2)) {
		if (s1<s2) return -1;
		else if (s1>s2) return 1;
		else return 0;}
	    else if (s1) return -1;
	    else if (s3) return 1;
	    else return 0;});
	info.primetags=prime.slice(0,prime_thresh);
	return info.primetags;}

    var show_tag_thresh=7;

    var expander_toggle=fdjtUI.Expansion.toggle;
    function tagexpand_click(evt){
	return expander_toggle(evt);}

    var combineTags=Knodule.combineTags;
    
    function showtags(info){
	var ctags=info.tags;
	var gtags=info.glosstags;
	var atags=info.autotags;
	var tags; var scores;
	if ((typeof ctags === 'string')||(ctags instanceof String))
	    ctags=[ctags];
	if (!((atags)||(gtags))) {
	    tags=ctags; scores=tags.scores;}
	else if (info.alltags) {
	    // This is where the combination of tags is cached
	    tags=info.alltags; scores=tags.scores;}
	else {
	    // Sort the automatic tags if needed
	    if ((atags)&&(!(atags.sorted))) {
		var weights=Codex.index.tagscores;
		atags.sort(function(t1,t2){
		    var v1=weights[t1], v2=weights[t2];
		    if ((v1)&&(v2)) {
			if (v1<v2) return -1;
			else if (v1>v2) return 1;
			else return 0;}
		    else if (v1) return 1;
		    else return -1;});
		atags.sorted=true;}
	    tags=info.alltags=combineTags([ctags,gtags,atags]);
	    scores=tags.scores;}
	var tagcount=0;
	var countspan=fdjtDOM("span.count");
	var tagicon=fdjtDOM.Image(cxicon("TagIcon",32,32),
				  "img.tagicon","tags");
	var span=fdjtDOM("span.tags.fdjtexpands",tagicon);
	var tagspan=span;
	var controller=false;
	var i=0; var lim=tags.length;
	while (i<tags.length) {
	    var tag=tags[i]; var score=((scores)&&(scores[tag]))||false;
	    if ((typeof tag === 'string')&&(tag.indexOf('@')>=0))
		tag=fdjtKB.ref(tag)||tag;
	    var togo=tags.length-i;
	    if ((!controller)&&((!(score))||(score<=1))&&
		(i>show_tag_thresh)&&(togo>4)) {
		controller=fdjtDOM("span.controller",
				   "all ",tags.length," tags",
				   fdjtDOM("span.whenexpanded","-"),
				   fdjtDOM("span.whencollapsed","+"));
		var subspan=fdjtDOM("span.whenexpanded");
		controller.onclick=tagexpand_click;
		fdjtDOM(span," ",controller," ",subspan);
		tagspan=subspan;}
	    fdjtDOM.append(tagspan,((i>0)?" \u00b7 ":" "),Knodule.HTML(tag));
	    i++;}
	return span;}
    function showaudience(tags){
	if (!(tags instanceof Array)) tags=[tags];
	var span=fdjtDOM(
	    ((tags.length>=div_threshold)?"div.shared":"span.shared"),
	    ((tags.length>=div_threshold)&&
	     (fdjtDOM("span.count",tags.length, " outlets"))));
	var i=0; var lim=tags.length;
	// This might do some kind of more/less controls and sorted
	// or cloudy display
	while (i<tags.length) {
	    var tag=tags[i]; var info=fdjtKB.ref(tag);
	    fdjtDOM.append(span," ",fdjtDOM("span.outlet","\u2192",info.name));
	    i++;}
	return span;}
    function showlinks(refs,spec){
	var span=fdjtDOM(spec);
	for (url in refs) {
	    if (url[0]==='_') continue;
	    var urlinfo=refs[url];
	    var title; var icon=cxicon("outlink",32,32);
	    if (typeof urlinfo === 'string') title=urlinfo;
	    else {
		title=urlinfo.title;
		icon=urlinfo.icon;}
	    var image=fdjtDOM.Image(icon);
	    var anchor=(fdjtDOM.Anchor(url,{title:url},title,image));
	    anchor.target='_blank';
	    fdjtDOM(span,anchor,"\n");}
	return span;}
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
    function showscore(score){
	var scorespan=fdjtDOM("span.score");
	var score=query[key]; var k=0;
	while (k<score) {fdjtDOM(scorespan,"*"); k++;}
	return scorespan;}
    function showglossinfo(info) {
	var user=info.maker;
	var feed=info.feed||false;
	var userinfo=(user)&&(Codex.sourcekb.load(user));
	var feedinfo=(feed)&&(Codex.sourcekb.load(feed));
	var agestring=timestring(info.modified||info.created);
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

    function getoverdoc(info){
	if (info.sources) {
	    var sources=info.sources;
	    if (typeof sources === 'string') sources=[sources];
	    var i=0; var lim=sources.length;
	    while (i<lim) {
		var source=fdjtKB.ref(sources[i++]);
		if ((source)&&(source.kind===':OVERDOC'))
		    return source;}
	    return false;}
	else return false;}

    function getfakepic(maker,spec){
	var userinfo=fdjtKB.ref(maker);
	var pic=fdjtDOM(spec||"div.sbooksourcepic",
			((userinfo.name)?
			 (fdjtString.getInitials(userinfo.name)):
			 "?"));
	return pic;}

    function getpicinfo(info){
	if (info.pic) return {src: info.pic,alt: info.pic};
	if (info.sources) {
	    var sources=info.sources;
	    if (typeof sources==='string') sources=[sources];
	    var i=0; var lim=sources.length;
	    while (i<lim) {
		var source=fdjtKB.ref(sources[i++]);
		if ((source)&&(source.kind===':OVERDOC')&&(source.pic))
		    return { src: source.pic, alt: source.name,
			     classname: "img.glosspic.sourcepic"};}}
	if (info.links) {
	    var links=info.links;
	    var i=0; var lim=links.length;
	    while (i<lim) {
		var link=links[i++];
		if (link.href.search(/\.(jpg|png|gif|jpeg)$/i)>0)
		    return { src: link.href, alt: "graphic",
			     classname: "img.glosspic"};}}
	if (info.shared) {
	    var outlets=info.shared;
	    if (typeof outlets==='string') outlets=[outlets];
	    var i=0; var lim=outlets.length;
	    while (i<lim) {
		var outlet=fdjtKB.ref(outlets[i++]);
		if ((outlet)&&(outlet.kind===':OVERLAY')&&(outlet.pic))
		    return { src: outlet.pic, alt: outlet.name,
			     classname: "img.glosspic.sourcepic"};}}
	if (info.maker) {
	    var userinfo=fdjtKB.ref(info.maker);
	    if (userinfo.pic)
		return { src: userinfo.pic, alt: userinfo.name,
			 classname: "img.glosspic.userpic"};
	    else if (userinfo.fbid)
		return {
		    src: "https://graph.facebook.com/"+
			userinfo.fbid+"/picture?type=square",
		    classname: "img.glosspic.userpic.fbpic"};
	    else return false;}
	else return false;}

    var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    function timestring(tick){
	var now=fdjtTime.tick();
	if ((now-tick)<(12*3600)) {
	    var date=new Date(1000*tick);
	    var hour=date.getHours();
	    var minute=date.getMinutes();
	    return ""+hour+":"+((minute<10)?"0":"")+minute;}
	else {
	    var date=new Date(1000*tick);
	    var year=date.getFullYear();
	    var month=date.getMonth();
	    var date=date.getDate();
	    var shortyear=year%100;
	    if (year<10)
		return ""+date+"/"+months[month]+"/0"+year;
	    else return ""+date+"/"+months[month]+"/"+year;}}

    function makelocbar(target_info,cxt_info){
	var locrule=fdjtDOM("HR");
	var locbar=fdjtDOM("DIV.locbar",locrule);
	var target_start=target_info.starts_at;
	var target_end=target_info.ends_at;
	var target_len=target_end-target_start;
	if (!(cxt_info)) cxt_info=Codex.docinfo[document.body.id];
	var cxt_start=cxt_info.starts_at;
	var cxt_end=cxt_info.ends_at;
	var cxt_len=cxt_end-cxt_start;
	if (debug_locbars)
	    locbar.setAttribute(
		"debug","ts="+target_start+"; te="+target_end+"; cl="+cxt_len);
	locrule.style.width=((target_len/cxt_len)*100)+"%";
	locrule.style.left=(((target_start-cxt_start)/cxt_len)*100)+"%";
	var id=target_info.id||target_info.frag;
	if (id) {
	    locbar.about="#"+id;
	    locbar.title=sumText(fdjtID(id));}
	return locbar;}
    function showtocloc(target_info){
	var head=((target_info.toclevel)?(target_info):(target_info.head));
	var heads=head.heads;
	var anchor=fdjtDOM.Anchor(
	    "javascript:Codex.JumpTo('"+(head.frag||head.id)+"');","a.headref",
	    fdjtDOM("span.spacer","\u00A7"),
	    head.title);
	var title="jump to "+head.title;
	var i=heads.length-1; 
	while (i>0) {
	    var head=heads[i--]; title=title+"// "+head.title;}
	anchor.title=title;
	return [" ",anchor];}

    function makelocspan(target_info,cxtinfo){
	if (!(cxtinfo)) cxtinfo=Codex.docinfo[(Codex.body||document.body).id];
	var locrule=fdjtDOM("div.locrule");
	var cxt_start=cxtinfo.starts_at;
	var cxt_end=cxtinfo.ends_at;
	var cxt_len=cxt_end-cxt_start;
	var location_start=target_info.starts_at-cxt_start;
	var location_len=target_info.ends_at-target_info.starts_at;
	locrule.setAttribute("about","#"+(target_info.id||target_info.frag));
	locrule.title='click or hold to glimpse';
	locrule.style.width=((location_len/cxt_len)*100)+"%";
	locrule.style.left=((location_start/cxt_len)*100)+"%";
	return locrule;}
    function makelocrule(target_info,cxtinfo,spec){
	if (!(cxtinfo)) cxtinfo=Codex.docinfo[Codex.content.id];
	var locrule=fdjtDOM(spec||"hr.locrule");
	var cxt_start=cxtinfo.starts_at;
	var cxt_end=cxtinfo.ends_at;
	var cxt_len=cxt_end-cxt_start;
	var target_start=target_info.starts_at-cxt_start;
	var target_len=target_info.ends_at-target_info.starts_at;
	var locstring="~"+Math.ceil(target_len/5)+ " words long ~"+
	    Math.ceil((target_start/cxt_len)*100)+"% along";
	locrule.setAttribute("about","#"+(target_info.id||target_info.frag));
	locrule.locstring=locstring+".";
	locrule.title=locstring+": click or hold to glimpse";
	locrule.style.width=((target_len/cxt_len)*100)+"%";
	locrule.style.left=((target_start/cxt_len)*100)+"%";
	return locrule;}

    function editicon_ontap(evt){
	var target=fdjtUI.T(evt);
	var card=fdjtDOM.getParent(target,'.codexcard');
	var gloss=((card)&&(card.name)&&(fdjtKB.ref(card.name,Codex.glosses)));
	Codex.setGlossTarget(gloss);
	CodexMode("addgloss");}
    function replyicon_ontap(evt){
	var target=fdjtUI.T(evt);
	var card=fdjtDOM.getParent(target,'.codexcard');
	var gloss=((card)&&(card.name)&&(fdjtKB.ref(card.name,Codex.glosses)));
	Codex.setGlossTarget(gloss,Codex.getGlossForm(gloss,true));
	CodexMode("addgloss");}

    function relayoredit_gloss(evt){
	var scan=fdjtUI.T(evt);
	fdjtUI.cancel(evt);
	while (scan) {
	    if (scan.qref) break;
	    else scan=scan.parentNode;}
	if (!(scan)) return;
	var qref=scan.qref;
	var gloss=Codex.glosses.ref(qref);
	var frag=gloss.get("frag");
	Codex.setGlossTarget(gloss);
	CodexMode("addgloss");}

    function sourceIcon(info){
	if (info) return info.pic;}
    
    // Displayings sets of notes organized into threads

    function sortbyloctime(x,y){
	if (x.frag===y.frag) {
	    if ((x.tstamp)&&(y.tstamp)) {
		if (x.tstamp<y.tstamp) return -1;
		else if (x.tstamp>y.tstamp) return 1;
		else return 0;}
	    else if (x.tstamp) return 1;
	    else if (y.tstamp) return -1;
	    else return 0;}
	else if (x.ends_at<=y.starts_at) return 1;
	else if (x.starts_at>=y.ends_at) return -1;
	else if ((x.ends_at-x.starts_at)>(y.ends_at-y.starts_at))
	    return 1;
	else return -1;}

    function showSlice(results,div,scores,sort,cardclass){
	var notes=new Array(results.length);
	var i=0; var lim=results.length;
	while (i<lim) {
	    var r=results[i];
	    if (typeof r === 'string') {
		var ref=Codex.docinfo[r]||Codex.glosses.ref(r);
		if (!(ref)) fdjtLog("No resolution for %o",r);
		notes[i]=ref;}
	    else notes[i]=r;
	    i++;}
	if (!(sort)) {}
	else if (scores)
	    notes.sort(function(n1,n2){
		var s1=(scores[n1._id]);
		var s2=(scores[n2._id]);
		if ((s1)&&(s2)) {
		    if (s1>s2) return -1;
		    else if (s2>s1) return 1;}
		else if (s1) return -1;
		else if (s2) return 1;
		if (n1.starts_at<n2.starts_at) return -1;
		else if (n1.starts_at>n2.starts_at) return 1;
		else if (n1.ends_at<n2.ends_at) return -1;
		else if (n1.ends_at>n2.ends_at) return 1;
		else if ((n1.tstamp)&&(n2.tstamp)) {
		    if (n1.tstamp>n2.tstamp) return -1;
		    else if (n1.tstamp>n2.tstamp) return 1;
		    else return 0;}
		else if (n1.tstamp) return 1;
		else if (n2.tstamp) return -1;
		else return 0;});
	else notes.sort(function(n1,n2){
	    if (n1.starts_at<n2.starts_at) return 1;
	    else if (n1.starts_at>n2.starts_at) return -1;
	    else if (n1.ends_at<n2.ends_at) return 1;
	    else if (n1.ends_at>n2.ends_at) return -1;
	    else if ((n1.tstamp)&&(n2.tstamp)) {
		if (n1.tstamp>n2.tstamp) return -1;
		else if (n1.tstamp>n2.tstamp) return 1;
		else return 0;}
	    else if (n1.tstamp) return 1;
	    else if (n2.tstamp) return -1;
	    else return 0;});
	
	var headelt=false; var threadelt=false;
	var curhead=false; var curinfo=false;
	var i=0; var len=notes.length; while (i<len) {
	    var note=notes[i++];
	    var frag=note.id||note.frag;
	    if (!(frag)) continue;
	    var target=fdjtID(frag);
	    var docinfo=Codex.docinfo[target.id];
	    var headinfo=docinfo.head;
	    var head=document.getElementById(headinfo.frag);
	    // var tochead=makeTOCHead(head);
	    if (curinfo!==docinfo) {
		if (headinfo!==curhead) {
		    headelt=fdjtDOM("div.codexthread.tocthread"); // ,tochead
		    headelt.frag=headinfo.frag;
		    fdjtDOM.append(div,headelt);
		    curhead=headinfo;}
		threadelt=fdjtDOM("div.codexthread.idthread");
		// ,makeIDHead(target,headinfo,true)
		threadelt.about="#"+frag;
		threadelt.title=Codex.getTitle(target,true);
		fdjtDOM.append(headelt,threadelt);
		curinfo=docinfo;}
	    fdjtDOM.append(threadelt,renderNote(note));}
	return div;}
    Codex.UI.showSlice=showSlice;

    function sumText(target){
	var title=Codex.getTitle(target,true);
	if (title.length<40) return title;
	/* title.slice(0,40)+"\u22ef "; */
	else return title;}
    
    function makeTOCHead(target,head){
	if (!(head)) head=Codex.getHead(target);
	var basespan=fdjtDOM("span");
	basespan.title='this location in the structure of the book';
	var title=Codex.getTitle(target,true);
	var info=Codex.docinfo[target.id];
	var head_info=Codex.docinfo[head.id];
	if (target!==head) {
	    var paratext=
		fdjtDOM.Anchor("javascript:Codex.JumpTo('"+target.id+"');",
			       "a.paratext",
			       fdjtDOM("span.spacer","\u00B6"),
			       sumText(target));
	    paratext.title='(click to jump to this passage) '+title;
	    fdjtDOM(basespan,paratext," ");}
	if (head) {
	    var text=sumText(head);
	    var headtext=
		fdjtDOM.Anchor("javascript:Codex.JumpTo('"+head.id+"');",
			       "a.headtext",
			       fdjtDOM("span.spacer","\u00A7"),
			       text);
	    var curspan=fdjtDOM("span.head",headtext);
	    headtext.title='jump to the section: '+text;
	    fdjtDOM.append(basespan," ",curspan);
	    var heads=Codex.Info(head).heads;
	    if (heads) {
		var j=heads.length-1; while (j>=0) {
		    var hinfo=heads[j--]; var elt=fdjtID(hinfo.frag);
		    if ((!(elt))||(!(hinfo.title))||
			(elt===Codex.root)||(elt===document.body))
			continue;
		    var anchor=
			fdjtDOM.Anchor(
			    "javascript:Codex.JumpTo('"+hinfo.frag+"');",
			    "a.headtext",
			    fdjtDOM("span.spacer","\u00A7"),
			    hinfo.title);
		    var newspan=fdjtDOM("span.head"," ",anchor);
		    anchor.title=
			((hinfo.title)?('jump to the section: '+hinfo.title):
			 "(jump to this section)");
		    if (target===head) fdjtDOM(curspan,newspan);
		    else fdjtDOM(curspan," \u22ef ",newspan);
		    curspan=newspan;}}}
	var tochead=fdjtDOM("div.tochead",
			    makelocrule(info,false),
			    basespan);
	return tochead;}

    function makeIDHead(target,headinfo,locrule){
	var info=Codex.docinfo[target.id];
	var headinfo=info.head;
	var tochead=fdjtDOM("div.idhead",
			    makelocrule(info,headinfo),
			    fdjtDOM("span.spacer","\u00b6"),
			    fdjtDOM("span",sumText(target)));
	var title=Codex.getTitle(target,true);
	return tochead;}

    function findTOCref(div,ref,loc) {
	var children=div.childNodes;
	if (!(children)) return false;
	var i=0; var lim=children.length;
	while (i<lim) {
	    var child=children[i++];
	    if (!(child.nodeType===1)) continue;
	    else if (child.tocref===ref) return child;
	    else if (child.starts>loc) return child;
	    else continue;}
	return false;}

    function addToSlice(note,div,query){
	var frag=(note.id||note.frag);
	var eltinfo=Codex.docinfo[frag];
	var about=document.getElementById(frag);
	var headinfo=((eltinfo.toclevel)?(eltinfo):(eltinfo.head));
	var headid=headinfo.frag;
	var head=document.getElementById(headid);
	var starts=eltinfo.starts_at;
	var head_starts=headinfo.starts_at;
	var insertion=false; var insdiff=0;
	var headthread=findTOCref(div,headid,head_starts);
	if ((!(headthread))||(headthread.tocref!==headid)) {
	    var insertbefore=headthread;
	    headthread=fdjtDOM("div.codexthread.tocthread");
	    // ,makeTOCHead(head,head)
	    headthread.tocref=headid; headthread.starts=head_starts;
	    if (insertbefore) fdjtDOM.insertBefore(insertbefore,headthread);
	    else fdjtDOM.append(div,headthread);}
	var idthread=((frag===headid)?(headthread):
		      (findTOCref(headthread,frag,starts)));
	if ((!(idthread))||(idthread.tocref!==frag)) {
	    var insertbefore=idthread;
	    idthread=fdjtDOM("div.codexthread.idthread");
	    idthread.tocref=frag; idthread.starts=starts; idthread.about="#"+frag;
	    idthread.title=Codex.getTitle(about,true);
	    idthread.setAttribute("locref",frag);
	    idthread.setAttribute("locinfo",starts);
	    if (insertbefore) fdjtDOM.insertBefore(insertbefore,idthread);
	    else fdjtDOM.append(headthread,idthread);}
	var tstamp=note.tstamp; var qid=note._id;
	var children=headthread.childNodes;
	var ishead=(frag===headid);
	var i=0; var lim=children.length;
	while (i<lim) {
	    var child=children[i++];
	    if (child.nodeType!==1) continue;
	    if ((ishead)&&(fdjtDOM.hasClass(child,"codexthread"))) {
		fdjtDOM.insertBefore(child,renderNote(note));
		return;}
	    // If unrelated, continue
	    if (!((fdjtDOM.hasClass(child,"codexcard"))||
		  (fdjtDOM.hasClass(child,"codexthread"))))
		continue;
	    // If the same thing, replace
	    if (child.qref===qid) {
		fdjtDOM.replace(child,renderNote(note));
		return;}
	    // if you're earlier, insert yourself and return
	    if (tstamp<=child.tstamp) {
		fdjtDOM.insertBefore(child,renderNote(note));
		return;}
	    else continue;}
	fdjtDOM.append(idthread,renderNote(note));}
    Codex.UI.addToSlice=addToSlice;

    Codex.nextSlice=function(start){
	var slice=fdjtDOM.getParent(start,".codexslice");
	var scan=fdjtDOM.forwardElt(start); var ref=false;
	while (scan) {
	    if (((scan.about)||
		 ((scan.getAttribute)&&(scan.getAttribute("about"))))&&
		((fdjtDOM.hasClass(scan,"codexcard"))||
		 (fdjtDOM.hasClass(scan,"passage"))))
		break;
	    else scan=fdjtDOM.forwardElt(scan);}
	if (fdjtDOM.hasParent(scan,slice)) return scan;
	else return false;};
    Codex.prevSlice=function(start){
	var slice=fdjtDOM.getParent(start,".codexslice");
	var scan=fdjtDOM.backwardElt(start); var ref=false;
	while (scan) {
	    if (((scan.about)||
		 ((scan.getAttribute)&&(scan.getAttribute("about"))))&&
		((fdjtDOM.hasClass(scan,"codexcard"))||
		 (fdjtDOM.hasClass(scan,"passage"))))
		break;
	    else scan=fdjtDOM.backwardElt(scan);}
	if (fdjtDOM.hasParent(scan,slice)) return scan;
	else return false;};

    /* Selecting a subset of glosses to display */

    var hasClass=fdjtDOM.hasClass;

    function selectSourcesRecur(thread,sources){
	var empty=true; var children=thread.childNodes;
	var i=0; var lim=children.length;
	while (i<children.length) {
	    var child=children[i++];
	    if (child.nodeType!==1) continue;
	    if (hasClass(child,"codexcard")) {
		var gloss=(child.qref)&&Codex.glosses.map[child.qref];
		if (!(gloss)) fdjtDOM.dropClass(child,"sourced");
		else if ((fdjtKB.contains(sources,gloss.maker))||
			 (fdjtKB.overlaps(sources,gloss.sources))||
			 (fdjtKB.overlaps(sources,gloss.shared))) {
		    fdjtDOM.addClass(child,"sourced");
		    empty=false;}
		else fdjtDOM.dropClass(child,"sourced");}
	    else if (hasClass(child,"codexthread")) {
		if (!(selectSourcesRecur(child,sources)))
		    empty=false;}
	    else {}}
	if (!(empty)) fdjtDOM.addClass(thread,"sourced");
	else fdjtDOM.dropClass(thread,"sourced");
	return empty;}

    function selectSources(results_div,sources){
	if (!(sources)) {
	    fdjtDOM.dropClass(results_div,"sourced");
	    fdjtDOM.dropClass(fdjt$(".sourced",results_div),"sourced");
	    return;}
	selectSourcesRecur(results_div,sources);
	if (Codex.target) scrollGlosses(Codex.target,results_div);}
    Codex.UI.selectSources=selectSources;

    /* Scrolling slices */

    function scrollGlosses(elt,glosses,top){
	if (!(elt.id)) elt=getFirstID(elt);
	var info=Codex.docinfo[elt.id];
	var targetloc=((info)&&(info.starts_at))||(elt.starts_at);
	if (targetloc) {
	    var scrollto=getFirstElt(glosses,targetloc);
	    if ((scrollto)&&((top)||(!(fdjtDOM.isVisible(scrollto))))) {
		if ((Codex.scrollers)&&(glosses.id)&&
		    (Codex.scrollers[glosses.id])) {
		    var scroller=Codex.scrollers[glosses.id];
		    scroller.scrollToElement(scrollto);}
		else scrollto.scrollIntoView(true);}}}
    Codex.UI.scrollGlosses=scrollGlosses;
    
    function getFirstID(node){
	if (node.id) return node;
	else if (node.childNodes) {
	    var children=node.childNodes;
	    var i=0; var lim=children.length;
	    while (i<lim) {
		var child=children[i++];
		if (child.nodeType===1) {
		    var found=getFirstID(child);
		    if (found) return found;}}
	    return false;}
	else return false;}

    function getFirstElt(glosses,location){
	var children=glosses.childNodes; var last=false;
	var i=0; var lim=children.length;
	while (i<lim) {
	    var child=children[i++];
	    if (child.nodeType!==1) continue;
	    else if (!(child.starts)) continue;
	    else if (child.starts===location)
		return child;
	    else if (child.starts>location) {
		if (last)
		    return getFirstElt(last,location)||last;
		else return last;}
	    else last=child;}
	if (last) getFirstElt(last,location);
	return false;}
    
    function getScrollOffset(elt,inside){
	if (elt.parentNode===inside) {
	    var children=inside.childNodes;
	    var i=0; var lim=children.length; var off=0;
	    while (i<lim) {
		var child=children[i++];
		if (child===elt) return off;
		if (child.offsetHeight) off=off+child.offsetHeight;}
	    return off;}
	else return getScrollOffset(elt,elt.parentNode)+
	    getScrollOffset(elt.parentNode,inside);}

    /* Results handlers */

    function setupSummaryDiv(div){
	fdjtUI.TapHold(div,Codex.touch);
	Codex.UI.addHandlers(div,'summary');}
    Codex.UI.setupSummaryDiv=setupSummaryDiv;
    
}