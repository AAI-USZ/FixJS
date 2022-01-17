function () {

    var addClass=fdjtDOM.addClass;
    var hasClass=fdjtDOM.hasClass;
    var dropClass=fdjtDOM.dropClass;
    var swapClass=fdjtDOM.swapClass;
    var toggleClass=fdjtDOM.toggleClass;
    var getParent=fdjtDOM.getParent;
    var hasParent=fdjtDOM.hasParent;
    var getChildren=fdjtDOM.getChildren;
    var getChild=fdjtDOM.getChild;
    var getInput=fdjtDOM.getInput;
    var getInputs=fdjtDOM.getInputs;
    var getInputsFor=fdjtDOM.getInputsFor;
    var Ellipsis=fdjtUI.Ellipsis;

    var submitEvent=fdjtUI.submitEvent;

    var glossmodes=Codex.glossmodes;

    var cxicon=Codex.icon;

    function getGlossMode(arg){
	if (!(arg)) arg=fdjtID("CODEXLIVEGLOSS");
	if (typeof arg === 'string') arg=fdjtID(arg);
	if ((!(arg))||(!(arg.nodeType))) return false;
	if (arg.tagName!=="FORM") arg=getChild(arg,"FORM");
	var classname=arg.className;
	var match=glossmodes.exec(classname);
	if ((!(match))||(match.length==0)||(!(match[0])))
	    return false;
	else return match[0];}
    Codex.getGlossMode=getGlossMode;

    function setGlossMode(mode,arg,toggle){
	if (!(arg)) arg=fdjtID("CODEXLIVEGLOSS");
	if (typeof arg === 'string') arg=fdjtID(arg);
	if ((!(arg))||(!(arg.nodeType))) return;
	var form=((arg.tagName==="FORM")?(arg):
		  ((fdjtDOM.getParent(arg,"form"))||
		   (fdjtDOM.getChild(arg,"form"))));
	var modeclass=false; var input=false;
	if (!(form)) return;
	if (!(mode)) {
	    fdjtDOM.dropClass(form,glossmodes);
	    Codex.keyboardHelp("ADDGLOSSKEYBOARDHELP");
	    return;}
	if ((mode==="tag")||(mode==="addtag")) {
	    modeclass="addtag";
	    input=fdjtDOM.getInput(form,'TAG');}
	else if ((mode==="link")||(mode==="addlink")) {
	    modeclass="addlink";
	    input=fdjtDOM.getInput(form,'LINK');}
	else if ((mode==="note")||(mode==="editnote")) {
	    modeclass="editnote";
	    input=fdjtDOM.getInput(form,'NOTE');}
	else if ((mode==="sharing")||(mode==="share")) {
	    modeclass="sharing";
	    input=fdjtDOM.getInput(form,'OUTLET');}
	else {
	    fdjtDOM.dropClass(form,glossmodes);
	    Codex.keyboardHelp("ADDGLOSSKEYBOARDHELP");
	    return;}
	if (Codex.Trace.mode)
	    fdjtLog("setGlossMode gm=%s input=%o",modeclass,input);
	if ((!(modeclass))||((toggle)&&(hasClass(form,modeclass)))) {
	    dropClass("CODEXHEART","tagging");
	    dropClass("CODEXHEART","showoutlets");
	    dropClass(form,glossmodes);}
	else {
	    if (modeclass==="addtag") {
		addClass("CODEXHEART","tagging");
		Codex.UI.updateScroller("CODEXGLOSSCLOUD");}
	    else dropClass("CODEXHEART","tagging");
	    if (modeclass==="sharing") {
		addClass("CODEXHEART","showoutlets");
		Codex.UI.updateScroller("CODEXGLOSSOUTLETS");}
	    else dropClass("CODEXHEART","showoutlets");
	    swapClass(form,glossmodes,modeclass);
	    Codex.setHUD(true);
	    if (input) Codex.setFocus(input);}}
    Codex.setGlossMode=setGlossMode;

    function _getbracketed(input,erase){
	var string=input.value;
	if ((!(string))||(string.length==0)) return false;
	var pos=input.selectionStart||0;
	var start=pos, end=pos, lim=string.length;
	while (start>=0) {
	    if (string[start]==='[') {
		if ((start>0)&&(string[start-1]==='\\')) {
		    start--; continue;}
		break;}
	    else start--;}
	if (start<0) return false;
	while (end<lim) {
	    if (string[end]===']') break;
	    else if (string[end]==='\\') end=end+2;
	    else end++;}
	if (start===end) return false;
	if (erase) {
	    input.value=string.slice(0,start)+string.slice(end+1);}
	return string.slice(start+1,end);}

    function getbracketed(input,erase){
	var bracketed=_getbracketed(input,erase);
	if (bracketed) {
	    addClass("CODEXHEART","tagging");
	    Codex.UI.updateScroller("CODEXGLOSSCLOUD");}
	else dropClass("CODEXHEART","tagging");
	return bracketed;}

    // set the gloss target for a particular passage
    function getGlossForm(arg,response) {
	if (typeof arg === 'string')
	    arg=fdjtID(arg)||Codex.glosses.ref(arg)||false;
	if (!(arg)) return false;
	var gloss=((arg.maker)&&(arg));
	if (!(gloss)) response=false;
	else if ((arg.maker)&&(arg.maker!==Codex.user._id))
	    response=true;
	else {}
	var passage=((gloss)?(fdjtID(gloss.frag)):(arg));
	var passageid=((passage.id)||(passage.codexdupid));
	var formid=((gloss)?
		    ((response)?
		     ("CODEXRESPONDGLOSS_"+gloss._id):
		     ("CODEXEDITGLOSS_"+gloss._id)):
		    ("CODEXADDGLOSS_"+passageid));
	var form=fdjtID(formid);
	var div=((form)&&(form.parentNode));
	var proto=fdjtID("CODEXADDGLOSSPROTOTYPE");
	if (!(div)) {
	    div=proto.cloneNode(true); div.id=null;
	    fdjtDOM(fdjtID("CODEXGLOSSFORMS"),div);
	    Codex.setupGestures(div);
	    form=getChildren(div,"form")[0];
	    form.id=formid;
	    setupGlossForm(form,passage,gloss,response||false);}
	else form=getChildren(div,"form")[0];
	if (gloss) {
	    if (response) addClass(div,"glossreply");
	    else addClass(div,"glossedit");}
	return div;}
    Codex.getGlossForm=getGlossForm;
    
    function setupGlossForm(form,passage,gloss,response){
	var passageid=((passage.id)||(passage.codexdupid));
	if (form.getAttribute("sbooksetup")) return;
	form.onsubmit=submitGloss;
	getInput(form,"REFURI").value=Codex.refuri;
	getInput(form,"USER").value=Codex.user._id;
	getInput(form,"DOCTITLE").value=document.title;
	getInput(form,"DOCURI").value=document.location.href;
	getInput(form,"FRAG").value=passageid;
	if (gloss) {
	    var date_elt=getChild(form,".respdate");
	    fdjtDOM(date_elt,fdjtTime.shortString(gloss.created));}
	var noteinput=getInput(form,"NOTE");
	var notespan=getChild(form,".notespan");
	var taginput=getInput(form,"TAG");
	var linkinput=getInput(form,"LINK");
	var outletinput=getInput(form,"OUTLET");
	fdjtDOM.addListener(form,"keyup",glossform_keyup);
	if (noteinput) {
	    noteinput.onkeypress=noteinput_keypress;
	    noteinput.onkeydown=noteinput_keydown;
	    if ((gloss)&&(!(response))) {
		noteinput.value=gloss.note||"";
		if (notespan) notespan.innerHTML=noteinput.value;}
	    else noteinput.value="";}
	if (taginput) taginput.onkeydown=addtag_keypress;
	if (linkinput) linkinput.onkeypress=addlink_keypress;
	if (outletinput) outletinput.onkeypress=addoutlet_keypress;
	if (Codex.syncstamp)
	    getInput(form,"SYNC").value=(Codex.syncstamp+1);
	var info=Codex.docinfo[passageid];
	var loc=getInput(form,"LOCATION");
	var loclen=getInput(form,"LOCLEN");
	var tagline=getInput(form,"TAGLINE");
	var respondsto=getInput(form,"RE");
	var thread=getInput(form,"THREAD");
	var uuidelt=getInput(form,"UUID");
	var response_elt=getChild(form,"div.response");
	if ((response_elt)&&(response)&&(gloss)) {
	    var maker_elt=getChild(response_elt,".respmaker");
	    var date_elt=getChild(response_elt,".respdate");
	    var note_elt=getChild(response_elt,".respnote");
	    var makerinfo=fdjtKB.ref(gloss.maker);
	    fdjtDOM(maker_elt,makerinfo.name);
	    fdjtDOM(date_elt,fdjtTime.shortString(gloss.created));
	    if (gloss.note) {
		if (gloss.note.length>42) 
		    fdjtDOM(note_elt,gloss.note.slice(0,42)+"…");
		else fdjtDOM(note_elt,gloss.note);
		note_elt.title=gloss.note;}
	    else fdjtDOM.remove(note_elt);}
	else {
	    fdjtDOM.remove(response_elt); response_elt=false;}
	if (loc) {loc.value=info.starts_at;}
	if (loclen) {loclen.value=info.ends_at-info.starts_at;}
	if ((response)&&(gloss)&&(gloss.thread)) {
	    thread.thread=gloss.thread;
	    respondsto.value=gloss.respondsto||gloss.thread;}
	else {
	    fdjtDOM.remove(respondsto);
	    fdjtDOM.remove(thread);}
	var tagline=getTagline(passage);
	if (tagline) tagline.value=tagline;
	if ((gloss)&&(gloss.tags)) {
	    var tagselt=getChild(form,".tags");
	    var resptags=getChild(response_elt,".resptags");
	    var tags=gloss.tags;
	    if (typeof tags === 'string') tags=[tags];
	    var i=0; var lim=tags.length;
	    while (i<lim) {
		// if (resptags) gloss;
		addTag(form,tags[i],false);
		i++;}}
	if ((gloss)&&(!(response))&&(gloss.links)) {
	    var links=getChild(form,".links");
	    var resplinks=getChild(response_elt,".resplinks");
	    var links=gloss.links;
	    for (url in links) {
		if (url[0]==='_') continue;
		var urlinfo=links[url];
		var title;
		if (typeof urlinfo === 'string') title=urlinfo;
		else title=urlinfo.title;
		// if (resplinks) addLink();
		addLink(form,url,title);}}
	if ((gloss)&&(gloss.share)) {
	    var tags=gloss.share;
	    if (typeof tags === 'string') tags=[tags];
	    var i=0; var lim=tags.length;
	    while (i<lim) addTag(form,tags[i++],"SHARE");}
	if ((!(response))&&(gloss)&&(gloss._id)) {
	    uuidelt.value=gloss._id;}
	else uuidelt.value=fdjtState.getUUID(Codex.nodeid);
	if (gloss) {
	    clearOutlets(form);
	    var shared=((gloss)&&(gloss.shared))||[];
	    if (typeof shared === 'string') shared=[shared];
	    var i=0, lim=shared.length;
	    while (i<lim) addOutlet(form,shared[i++],true);}
	form.setAttribute("sbooksetup","yes");
	updateForm(form);}
    Codex.setupGlossForm=setupGlossForm;

    function updateForm(form){
	var glossetc=getChild(form,".glossetc");
	fdjtUI.Overflow(glossetc);}

    function getTagline(target){
	var attrib=
	    target.getAttributeNS("tagline","https://sbooks.net/")||
	    target.getAttribute("data-tagline")||
	    target.getAttribute("tagline");
	if (attrib) return attrib;
	var text=fdjtDOM.textify(target);
	if (!(text)) return false;
	text=fdjtString.stdspace(text);
	if (text.length>40) return text.slice(0,40)+"...";
	else return text;}
    
    /***** Adding outlets ******/
    function addOutlet(form,outlet,checked) {
	if (typeof checked === 'undefined') checked=true;
	var outletspan=getChild(form,".outlets");
	var inputs=getInputs(outletspan,"SHARE");
	var i=0; var lim=inputs.length; var formvar="SHARE";
	var outlet_id=((typeof outlet === 'string')?(outlet):(outlet._id));
	if (typeof outlet === 'string') {
	    if ((outlet[0]==='@')||
		((outlet[0]===':')&&(outlet[0]==='@')))
		outlet=Codex.sourcekb.ref(outlet);
	    else {
		outlet={name: outlet};
		spanspec="span.checkspan.email";
		formvar="EMAIL";}}
	else info=outlet;
	while (i<lim) {
	    if (inputs[i].value===outlet_id) {
		var checkspan=getParent(inputs[i],".checkspan");
		fdjtUI.CheckSpan.set(checkspan,checked);
		return;}
	    else i++;}
	var spanspec="span.checkspan.outlet";
	var checkspan=fdjtUI.CheckSpan(
	    spanspec,formvar,outlet_id,checked,
	    outlet.nick||outlet.name);
	if (outlet.description) checkspan.title=outlet.description;
	fdjtDOM(outletspan," ",checkspan);}
    function clearOutlets(form){
	var outletspan=getChild(form,".outlets");
	fdjtDOM.replace(outletspan,fdjtDOM("span.outlets"));}
    Codex.addOutletToForm=addOutlet;
    
    /***** Adding links ******/
    function addLink(form,url,title) {
	var tagselt=getChild(form,'.links');
	var linkval=((title)?(url+" "+title):(url));
	var anchor=fdjtDOM.Anchor(url,"a.glosslink",((title)||url));
	var checkbox=fdjtDOM.Checkbox("LINKS",linkval,true);
	var aspan=fdjtDOM("span.anchor",checkbox,anchor);
	aspan.title=url; anchor.target='_blank';
	fdjtDOM(tagselt,aspan," ");
	updateForm(form);
	return aspan;}

    /***** Adding excerpts ******/
    function setExcerpt(form,excerpt) {
	var checkspan=getChild(form,'.excerpt');
	if (!(checkspan)) {
	    var placeholder=getChild(form,'.excerptspan');
	    checkspan=fdjtDOM("span.checkspan.excerpt",
			      fdjtDOM.Checkbox('EXCERPT','',false),
			      fdjtDOM("span.text"));
	    checkspan.onclick=fdjtUI.CheckSpan.onclick;
	    fdjtDOM.replace(placeholder,checkspan);}
	var input=getInput(checkspan,'EXCERPT');
	var text=getChild(checkspan,'.text');
	if (excerpt) {
	    input.value=excerpt;
	    fdjtDOM.replace(text,Ellipsis("span.text",excerpt,140));
	    fdjtUI.CheckSpan.set(checkspan,true);}
	else fdjtUI.CheckSpan.set(checkspan,false);
	updateForm(form);}
    Codex.setExcerpt=setExcerpt;

    /***** Adding tags ******/
    function addTag(form,tag,varname,checked) {
	// fdjtLog("Adding %o to tags for %o",tag,form);
	if (!(tag)) tag=form;
	if (form.tagName!=='FORM')
	    form=getParent(form,'form')||form;
	var tagselt=getChild(form,'.tags');
	var info; var title=false; var textspec='span.term';
	if (!(varname)) varname='TAGS';
	if ((tag.nodeType)&&(fdjtDOM.hasClass(tag,'completion'))) {
	    if (fdjtDOM.hasClass(tag,'outlet')) {
		varname='SHARED'; textspec='span.outlet';}
	    else if (fdjtDOM.hasClass(tag,'source')) {
		varname='SHARE'; textspec='span.source';}
	    else {}
	    if (tag.title) title=tag.title;
	    tag=gloss_cloud.getValue(tag);
	    if (hasClass(form,"editnote")) {
		var input=getInput(form,"NOTE");
		// This erases whatever was being typed
		if (input) getbracketed(input,false);}
	    else if (hasClass(form,"addtag")) {
		var input=getInput(form,"TAG");
		// This erases whatever was being typed
		if (input) input.value="";
		setTimeout(function(){input.focus();},1500);}}
	var info=
	    ((typeof tag === 'string')&&
	     ((tag.indexOf('|')>0)?
	      (Codex.knodule.handleSubjectEntry(tag)):
	      (fdjtKB.ref(tag)||Codex.knodule.probe(tag))));
	var text=((info)?
		  ((info.toHTML)&&(info.toHTML())||info.name||info.dterm):
		  (tag));
	if (info) {
	    if (info.knodule===Codex.knodule) tag=info.dterm;
	    else tag=info._id||info.dterm||tag;}
	if ((info)&&(info.pool===Codex.sourcekb)) varname='SHARED';
	var checkspans=getChildren(tagselt,".checkspan");
	var i=0; var lim=checkspans.length;
	while (i<lim) {
	    var cspan=checkspans[i++];
	    if (((cspan.getAttribute("varname"))===varname)&&
		((cspan.getAttribute("tagval"))===tag))
		return cspan;}
	var span=fdjtUI.CheckSpan
	("span.checkspan",varname,tag,
	 ((typeof checked === 'undefined')||(checked)));
	if (title) span.title=title;
	span.setAttribute("varname",varname);
	span.setAttribute("tagval",tag);
	fdjtDOM.addClass(span,((varname.toLowerCase())+"var"));
	if (typeof text === 'string')
	    fdjtDOM.append(span,fdjtDOM(textspec,text));
	else fdjtDOM.append(span,text);
	fdjtDOM.append(tagselt,span," ");
	updateForm(form);
	return span;}

    Codex.setGlossNetwork=function(form,network,checked){
	if (typeof form === 'string') form=fdjtID(form);
	if (!(form)) return;
	var input=getInput(form,'NETWORKS',network);
	if (!(input)) return;
	var cs=getParent(input,".checkspan");
	if (!(cs)) return;
	fdjtUI.CheckSpan.set(cs,checked);};

    /***** Setting the gloss target ******/

    // The target can be either a passage or another gloss
    function setGlossTarget(target,form){
	if (Codex.glosstarget) {
	    dropClass(Codex.glosstarget,"codexglosstarget");}
	if (!(target)) {
	    var cur=fdjtID("CODEXLIVEGLOSS");
	    if (cur) cur.id=null;
	    Codex.glosstarget=false;
	    return;}
	if (!gloss_cloud) Codex.glossCloud();
	var gloss=false;
	if (!(form)) form=getGlossForm(target);
	if ((typeof target === 'string')&&(fdjtID(target))) 
	    target=fdjtID(target);
	else if ((typeof target === 'string')&&
		 (Codex.glosses.ref(target))) {
	    gloss=Codex.glosses.ref(target);
	    target=fdjtID(gloss.frag);}
	else if (target.pool===Codex.glosses) {
	    gloss=target; target=fdjtID(gloss.frag);}
	else {}
	Codex.glosstarget=target;
	addClass(target,"codexglosstarget");
	Codex.setTarget(target);
	setCloudCuesFromTarget(gloss_cloud,target);
	setGlossForm(form);
	return form;}
    Codex.setGlossTarget=setGlossTarget;

    function setGlossForm(form){
	var cur=fdjtID("CODEXLIVEGLOSS");
	if (cur) cur.id=null;
	form.id="CODEXLIVEGLOSS";
	var form_elt=getChild(form,"FORM");
	var mode=form_elt.className;
	var input=false; var noteinput=getInput(form,"NOTE");
	var syncelt=getInput(form,"SYNC");
	syncelt.value=(Codex.syncstamp+1);
	{ // Update the big network buttons in the OUTLETS cloud
	    var inputs=getInputs(form,'NETWORKS');
	    var altnetworks=fdjtID("CODEXNETWORKBUTTONS");
	    var i=0; var lim=inputs.length;
	    while (i<lim) {
		var input=inputs[i++];
		var doppels=getInputsFor(altnetworks,'NETWORKS',input.value);
		fdjtUI.CheckSpan.set(doppels,input.checked);}}
	/* Get the input appropriate to the mode. */
	if (mode==='editnote') {
	    input=noteinput;
	    if (input)
		gloss_cloud.complete(getbracketed(input,false)||"");
	    else gloss_cloud.complete("");}
	else if (mode==='addtag') input=getInput(form,"TAG");
	else if (mode==='addlink') input=getInput(form,"LINK");
	else if (mode==='excerpt') input=getInput(form,"EXCERPT");
	else if (mode==='addoutlet') input=getInput(form,"OUTLET");
	else {
	    input=noteinput;
	    Codex.keyboardHelp("ADDGLOSSKEYBOARDHELP");}
	    
	/* Do completions based on those input's values */
	var outlet_input=getInput(form,"OUTLET");
	if ((outlet_input)&&(outlet_cloud))
	    outlet_cloud.complete((outlet_input.value)||"");
	if (mode!=='editnote') {
	    var tag_input=getInput(form,"TAG");
	    gloss_cloud.complete((tag_input.value)||"");}
	if (input) input.focus();
	else {}}
    Codex.setGlossForm=setGlossForm;
    
    function setCloudCues(cloud,tags){
	// Clear any current tagcues from the last gloss
	var cursoft=getChildren(cloud.dom,".cue.softcue");
	var i=0; var lim=cursoft.length;
	while (i<lim) {
	    var cur=cursoft[i++];
	    fdjtDOM.dropClass(cur,"cue");
	    fdjtDOM.dropClass(cur,"softcue");}
	// Get the tags on this element as cues
	var newcues=cloud.getByValue(tags);
	var i=0; var lim=newcues.length;
	while (i<lim) {
	    var completion=newcues[i++];
	    if (!(fdjtDOM.hasClass(completion,"cue"))) {
		fdjtDOM.addClass(completion,"cue");
		fdjtDOM.addClass(completion,"softcue");}}}
    function setCloudCuesFromTarget(cloud,target){
	var tags=[];
	var targetid=((target.id)||(target.codexdupid));
	var info=Codex.docinfo[targetid];
	var glosses=Codex.glosses.find('frag',targetid);
	var knodule=Codex.knodule;
	if ((info)&&(info.tags)) tags=tags.concat(info.tags);
	if ((info)&&(info.autotags)&&(info.autotags.length)) {
	    var autotags=info.autotags; var j=0; var jlim=autotags.length;
	    while (j<jlim) {
		var kn=knodule.probe(autotags[j]);
		if (kn) tags.push(kn.tagString());
		j++;}}
	var i=0; var lim=glosses.length;
	while (i<lim) {
	    var g=glosses[i++]; var gtags=g.tags;
	    if (gtags) tags=tags.concat(gtags);}
	setCloudCues(cloud,tags);}
    Codex.setCloudCues=setCloudCues;
    Codex.setCloudCuesFromTarget=setCloudCuesFromTarget;
    
    /* Text handling for the gloss text input */

    var addgloss_timer=false;
    
    function bracket_click (evt){
	evt=evt||event;
	var target=fdjtUI.T(evt);
	var alt=target.alt;
	var form=getParent(target,'form');
	var input=getInput(form,'NOTE');
	var string=input.value;
	var bracketed=getbracketed(input);
	fdjtUI.cancel(evt);
	if (bracketed==="") getbracketed(input,true);
	else if (bracketed)
	    handleBracketed(form,getbracketed(input,true));
	else {
	    var pos=input.selectionStart;
	    var tagtext="[]";
	    if (alt==='link') tagtext="[@http]";
	    input.value=string.slice(0,pos)+tagtext+string.slice(pos);
	    input.selectionStart=input.selectionEnd=pos+(tagtext.length-1);
	    input.focus();}}
    Codex.UI.bracket_click=bracket_click;

    function handleBracketed(form,content,complete){
	dropClass("CODEXHEART","tagging");
	if (content[0]==='@') {
	    var brk=content.indexOf(' ');
	    if (brk<0) addLink(form,content.slice(1));
	    else {
		addLink(form,content.slice(1,brk),
			content.slice(brk+1));}}
	else if (content.indexOf('|')>=0) addTag(form,content);
	else {
	    var completions=gloss_cloud.complete(content);
	    if (!(completions)) {
		addTag(form,content);
		return;}
	    var i=0; var lim=completions.length;
	    var std=fdjtString.stdspace(content);
	    while (i<lim) {
		var completion=completions[i++];
		if (content===gloss_cloud.getKey(completion)) {
		    addTag(form,completion);
		    return;}}
	    if ((complete)&&(completions.length))
		addTag(form,completions[0]);	  
	    else addTag(form,std);
	    gloss_cloud.complete("");}}

    function addlink_keypress(evt){
	var target=fdjtUI.T(evt);
	var content=target.value;
	var form=getParent(target,"FORM");
	var ch=evt.keyCode;
	if (ch===13) {
	    if (fdjtString.isEmpty(content)) {
		submitEvent(target);
		return;}
	    var brk=content.indexOf(' ');
	    if (brk<0) addLink(form,content);
	    else {
		addLink(form,content.slice(0,brk),
			content.slice(brk+1));}
	    fdjtUI.cancel(evt);
	    target.value="";}}
    function addtag_keypress(evt){
	var target=fdjtUI.T(evt);
	var content=target.value;
	var form=getParent(target,"FORM");
	var ch=evt.keyCode||evt.charCode;
	if ((fdjtString.isEmpty(content))&&(ch===13)) {
	    submitEvent(target);
	    return;}
	if (content.length===0) {
	    gloss_cloud.complete("");
	    return;}
	else if (ch===13) {
	    var completions=gloss_cloud.complete(content);
	    if ((content.indexOf('|')>=0)||
		(content.indexOf('@')>=0)||
		(completions.length===0)||
		(evt.shiftKey))
		addTag(form,content);
	    else {
		if (completions.length)
		    addTag(form,completions[0]);
		else addTag(form,content);}
	    fdjtUI.cancel(evt);
	    target.value="";
	    gloss_cloud.complete("");}
	else if (ch===9) { /* tab */
	    var completions=gloss_cloud.complete(content);
	    fdjtUI.cancel(evt);
	    if (gloss_cloud.prefix!==content) {
		target.value=gloss_cloud.prefix;
		fdjtDOM.cancel(evt);
		setTimeout(function(){
		    Codex.UI.updateScroller("CODEXGLOSSCLOUD");},
			   100);
		return;}
	    else if (evt.shiftKey) gloss_cloud.selectPrevious();
	    else gloss_cloud.selectNext();}
	else setTimeout(function(evt){
	    gloss_cloud.complete(target.value);},
			100);}
    function addoutlet_keypress(evt){
	evt=evt||event;
	var target=fdjtUI.T(evt);
	var content=target.value;
	var form=getParent(target,"FORM");
	var ch=evt.keyCode||evt.charCode;
	if (!(outlet_cloud)) return;
	else if ((fdjtString.isEmpty(content))&&(ch===13)) {
	    return;}
	if ((content.length===0)&&(outlet_cloud)) {
	    outlet_cloud.complete("");
	    return;}
	else if (ch===13) {
	    var completions=outlet_cloud.complete(content);
	    if (completions.length)
		addOutlet(form,completions[0].getAttribute("value"));
	    else addOutlet(form,content);
	    fdjtUI.cancel(evt);
	    target.value="";
	    outlet_cloud.complete("");}
	else setTimeout(function(evt){
	    gloss_cloud.complete(target.value);},
			100);}

    /* This handles embedded brackets */
    function noteinput_keypress(evt){
	var target=fdjtUI.T(evt);
	var string=target.value;
	var form=getParent(target,"FORM");
	var ch=evt.charCode;
	if (addgloss_timer) clearTimeout(addgloss_timer);
	if (ch===91) { /* [ */
	    var pos=target.selectionStart, lim=string.length;
	    if ((pos>0)&&(string[pos-1]==='\\')) return; 
	    fdjtUI.cancel(evt);
	    target.value=string.slice(0,pos)+"[]"+string.slice(pos);
	    target.selectionStart=target.selectionEnd=pos+1;}
	else if (ch===93) { /* ] */
	    var pos=target.selectionStart;
	    if ((pos>0)&&(string[pos-1]==='\\')) return; 
	    var content=getbracketed(target,true);
	    if (!(content)) return;
	    fdjtUI.cancel(evt);
	    handleBracketed(form,content);}
	else {
	    var content=getbracketed(target);
	    if ((typeof content==='string')&& (content[0]!=='@'))
		addgloss_timer=setTimeout(function(){
		    var span=getbracketed(target,false);
		    // fdjtLog("Completing on %s",span);
		    if (span[0]!=='@') gloss_cloud.complete(span);},
					  200);}}

    function noteinput_keydown(evt){
	evt=evt||event;
	var kc=evt.keyCode;
	var target=fdjtUI.T(evt);
	var form=getParent(target,'form');
	var mode=getGlossMode(form);
	if (kc===13) { // newline/enter
	    if (!(mode)) {submitEvent(form);}
	    else {
		var bracketed=getbracketed(target);
		if (bracketed) {
		    fdjtUI.cancel(evt);
		    handleBracketed(form,getbracketed(target,true),true);}
		else if (evt.ctrlKey) {
		    fdjtUI.cancel(evt);
		    submitEvent(target);}
		else if (!(evt.shiftKey)) {
		    fdjtUI.cancel(evt);
		    var notespan=getChild(form,".notespan");
		    if (notespan)
			fdjtDOM.replace(
			    notespan,
			    Ellipsis("span.notespan",target.value,140));
		    dropClass(form,"editnote");}
		else fdjtUI.cancelBubble(evt);}}
	else if (mode) {}
	else if ((kc===35)||(kc===91)) // # or [
	    setGlossMode("addtag",form);
	else if (kc===32) // Space
	    setGlossMode("editnode",form);
	else if ((kc===47)||(kc===58)) // /or :
	    setGlossMode("addlink",form);
	else if ((kc===64)) // @
	    setGlossMode("sharing",form);
	else {}}

    function glossform_keyup(evt){
	evt=evt||event;
	var kc=evt.keyCode;
	var target=fdjtUI.T(evt);
	if ((hasParent(target,"INPUT"))||(hasParent(target,"TEXTAREA"))) {
	    fdjtUI.cancel(evt);
	    return;}
	var form=getParent(target,'form');
	if ((kc===13)&&((!(form.className))||(form.className===""))) {
	    var bracketed=getbracketed(target);
	    if (bracketed) {
		fdjtUI.cancel(evt);
		handleBracketed(form,getbracketed(target,true),true);}
	    else if (evt.ctrlKey) {
		fdjtUI.cancel(evt);
		submitEvent(target);}
	    else if (!(evt.shiftKey)) {
		fdjtUI.cancel(evt);
		var notespan=getChild(form,".notespan");
		if (notespan) notespan.innerHTML=target.value;
		dropClass(form,"editnote");}
	    else {}}}
    
    function get_addgloss_callback(form){
	return function(req){
	    return addgloss_callback(req,form);}}

    function addgloss_callback(req,form){
	if (Codex.Trace.network)
	    fdjtLog("Got AJAX gloss response %o from %o",req,sbook_mark_uri);
	fdjtDOM.dropClass(form.parentNode,"submitting");
	Codex.glosses.Import(JSON.parse(req.responseText));
	fdjtDOM.remove(form.parentNode);
	// clearGlossForm(form);
	Codex.preview_target=false;
	/* Turn off the target lock */
	setGlossTarget(false);
	Codex.setTarget(false);
	CodexMode(false);}

    function clearGlossForm(form){
	// Clear the UUID, and other fields
	var uuid=getInput(form,"UUID");
	if (uuid) uuid.value="";
	var note=getInput(form,"NOTE");
	if (note) note.value="";
	var taginput=getInput(form,"TAG");
	if (taginput) taginput.value="";
	var href=getInput(form,"HREF");
	if (href) href.value="";
	var tagselt=getChildren(form,".tags");
	if ((tagselt)&&(tagselt.length)) {
	    var tags=getChildren(tagselt[0],".checkspan");
	    fdjtDOM.remove(fdjtDOM.Array(tags));}}

    /***** The Gloss Cloud *****/

    var gloss_cloud=false;
    
    /* The completions element */
    function glossCloud(){
	if (gloss_cloud) return gloss_cloud;
	var completions=fdjtID("CODEXGLOSSCLOUD");
	completions.onclick=glosscloud_ontap;
	Codex.gloss_cloud=gloss_cloud=
	    new fdjtUI.Completions(
		completions,fdjtID("SBOOKTAGINPUT"),
		fdjtUI.FDJT_COMPLETE_OPTIONS|
		    fdjtUI.FDJT_COMPLETE_CLOUD|
		    fdjtUI.FDJT_COMPLETE_ANYWORD);
	return gloss_cloud;}
    Codex.glossCloud=glossCloud;
    
    function glosscloud_ontap(evt){
	var target=fdjtUI.T(evt);
	var completion=getParent(target,'.completion');
	if (completion) {
	    var live=fdjtID("CODEXLIVEGLOSS");
	    var form=((live)&&(getChild(live,"form")));
	    addTag(form,completion);}
	fdjtUI.cancel(evt);}

    /***** The Outlet Cloud *****/

    var outlet_cloud=false;
    
    /* The completions element for outlets */
    function outletCloud(){
	if (outlet_cloud) return outlet_cloud;
	var completions=fdjtID("CODEXGLOSSOUTLETS");
	completions.onclick=outletcloud_ontap;
	Codex.outlet_cloud=outlet_cloud=
	    new fdjtUI.Completions(
		completions,false,
		fdjtUI.FDJT_COMPLETE_OPTIONS|
		    fdjtUI.FDJT_COMPLETE_CLOUD|
		    fdjtUI.FDJT_COMPLETE_ANYWORD);
	return outlet_cloud;}
    Codex.outletCloud=outletCloud;
    
    function outletcloud_ontap(evt){
	var target=fdjtUI.T(evt);
	var completion=getParent(target,'.completion');
	if (completion) {
	    var live=fdjtID("CODEXLIVEGLOSS");
	    var form=((live)&&(getChild(live,"form")));
	    if (hasClass(completion,"source")) {
		var value=completion.getAttribute("value");
		addOutlet(form,fdjtKB.ref(value));}
	    else {}}
	fdjtUI.cancel(evt);}

    /***** Saving (submitting/queueing) glosses *****/

    // Submits a gloss, queueing it if offline.
    function submitGloss(evt){
	evt=evt||event||null;
	var target=fdjtUI.T(evt);
	fdjtDOM.addClass(target.parentNode,"submitting");
	var form=(fdjtUI.T(evt));
	var proto=fdjtID();
	setGlossDefaults(form,getChild("CODEXADDGLOSSPROTOTYPE","FORM"));
	var uuidelt=getInput(form,"UUID");
	if (!((uuidelt)&&(uuidelt.value)&&(uuidelt.value.length>5))) {
	    fdjtLog.warn('missing UUID');
	    if (uuidelt) uuidelt.value=fdjtState.getUUID(Codex.nodeid);}
	if (!(Codex.offline))
	    return fdjtAjax.onsubmit(evt,get_addgloss_callback(target));
	if (!(navigator.onLine)) return saveGloss(form,evt);
	// Eventually, we'll unpack the AJAX handler to let it handle
	//  connection failures by calling saveGloss.
	else return fdjtAjax.onsubmit(evt,get_addgloss_callback(target));}
    Codex.submitGloss=submitGloss;

    function setGlossDefaults(form,proto){
	var shared=getChild(form,".outlets");
	var inputs=getChildren(shared,"INPUT");
	var mode=form.className;
	swapClass(proto,glossmodes,mode);
	var i=0, lim=inputs.length;
	while (i<lim) {
	    var input=inputs[i++];
	    if (input.checked) addOutlet(proto,input.value,true);}}

    // Queues a gloss when offline
    function saveGloss(form,evt){
	var json=fdjtAjax.formJSON(form,["tags","xrefs"],true);
	var params=fdjtAjax.formParams(form);
	var queued=fdjtState.getLocal("queued("+Codex.refuri+")",true);
	if (!(queued)) queued=[];
	queued.push(json.uuid);
	var glossdata=
	    {refuri: json.refuri,frag: json.frag,
	     maker: json.user,_id: json.uuid,uuid: json.uuid,
	     qid: json.uuid,gloss: json.uuid,
	     created: fdjtTime()};
	glossdata.tstamp=fdjtTime.tick();
	if ((json.note)&&(!(fdjtString.isEmpty(json.note))))
	    glossdata.note=json.note;
	if ((json.excerpt)&&(!(fdjtString.isEmpty(json.excerpt))))
	    glossdata.excerpt=json.excerpt;
	if ((json.details)&&(!(fdjtString.isEmpty(json.details))))
	    glossdata.details=json.details;
	if ((json.tags)&&(json.tags.length>0)) glossdata.tags=json.tags;
	if ((json.xrefs)&&(json.xrefs.length>0)) glossdata.xrefs=json.xrefs;
	Codex.glosses.Import(glossdata);
	fdjtState.setLocal("params("+json.uuid+")",params);
	fdjtState.setLocal("queued("+Codex.refuri+")",queued,true);
	// Clear the UUID
	clearGlossForm(form);
	Codex.preview_target=false;
	if (evt) fdjtUI.cancel(evt);
	fdjtDOM.dropClass(form.parentNode,"submitting");
	/* Turn off the target lock */
	setGlossTarget(false); Codex.setTarget(false); CodexMode(false);}

    // Saves queued glosses
    function writeGlosses(){
	if (!(Codex.offline)) return;
	var queued=fdjtState.getLocal("queued("+Codex.refuri+")",true);
	if ((!(queued))||(queued.length===0)) {
	    fdjtState.dropLocal("queued("+Codex.refuri+")");
	    return;}
	var ajax_uri=getChild(fdjtID("CODEXADDGLOSSPROTOTYPE"),"form").
	    getAttribute("ajaxaction");
	var i=0; var lim=queued.length; var pending=[];
	while (i<lim) {
	    var uuid=queued[i++];
	    var params=fdjtState.getLocal("params("+uuid+")");
	    if (params) pending.push(uuid);
	    var req=new XMLHttpRequest();
	    req.open('POST',ajax_uri);
	    req.withCredentials='yes';
	    req.onreadystatechange=function () {
		if ((req.readyState === 4) &&
		    (req.status>=200) && (req.status<300)) {
		    fdjtState.dropLocal("params("+uuid+")");
		    oncallback(req);}};
	    try {
		req.setRequestHeader
		("Content-type", "application/x-www-form-urlencoded");
		req.send(params);}
	    catch (ex) {failed.push(uuid);}}
	if ((pending)&&(pending.length))
	    fdjtState.setLocal("queued("+Codex.refuri+")",pending,true);
	else fdjtState.dropLocal("queued("+Codex.refuri+")");
	if ((pending)&&(pending.length>0)) return pending;
	else return false;}
    Codex.writeGlosses=writeGlosses;
    
    /* Gloss display */

    var objectkey=fdjtKB.objectkey;

    function glossBlock(id,spec,xfeatures,glosses,detail){
	var docinfo=Codex.docinfo[id];
	var all=[].concat(xfeatures||[]);
	var freq={}; var notes={}; var links={};
	var excerpt=false;
	if (!(glosses)) glosses=Codex.glosses.find('frag',id);
	// Initialize given features
	var i=0; var lim=all.length;
	while (i<lim) freq[all[i++]]=1;
	// Scan glosses
	var i=0; var lim=glosses.length;
	while (i<lim) {
	    var gloss=glosses[i++]; var glossid;
	    if (typeof gloss === 'string') {
		glossid=gloss; gloss=Codex.glosses.ref(glossid);}
	    else glossid=gloss._id;
	    var user=gloss.maker;
	    var sources=gloss.audience;
	    var tags=gloss.tags;
	    if (gloss.excerpt) {if (!(excerpt)) excerpt=gloss.excerpt;}
	    if ((sources)&&(!(sources instanceof Array))) sources=[sources];
	    if ((tags)&&(!(tags instanceof Array))) tags=[tags];
	    if (freq[user]) freq[user]++;
	    else {freq[user]=1; all.push(user);}
	    if (gloss.note) {
		if (notes[user]) fdjtKB.add(notes,user,glossid,true);
		else notes[user]=[glossid];}
	    if (gloss.link) {
		if (links[user]) fdjtKB.add(links,user,glossid,true);
		else links[user]=[glossid];}
	    if (sources) {
		var j=0; var jlim=sources.length;
		while (j<jlim) {
		    var source=sources[j++];
		    if (freq[source]) freq[source]++;
		    else {freq[source]=1; all.push(source);}
		    if (gloss.note) {
			if (notes[source])
			    fdjtKB.add(notes,source,glossid,true);
			else notes[source]=[glossid];}
		    if (gloss.link) {
			if (links[source])
			    fdjtKB.add(links,source,glossid,true);
			else links[source]=[glossid];}}}
	    if (tags) {
		var j=0; var jlim=tags.length;
		while (j<jlim) {
		    var tag=tags[j++];
		    if (typeof tag === 'object') tag=objectkey(tag);
		    if (freq[tag]) freq[tag]++;
		    else {freq[tag]=1; all.push(tag);}}}}
	var tags=docinfo.tags;
	if ((tags)&&(!(tags instanceof Array))) tags=[tags];
	if (tags) {
	    var i=0; var lim=tags.length;
	    while (i<lim) {
		var tag=tags[i++];
		if (typeof tag === 'object') tag=objectkey(tag);
		if (freq[tag]) freq[tag]++;
		else {freq[tag]=1; all.push(tag);}}}
	var info=fdjtDOM(spec||"div.sbookgloss");
	var i=0; var lim=all.length;
	while (i<lim) {
	    var tag=all[i]; var span=false;
	    var taginfo=fdjtKB.ref(tag);
	    if ((taginfo)&&(taginfo.kind)) {
		var srcspan=fdjtDOM("span.source",taginfo.name||tag);
		srcspan.setAttribute("tag",(((taginfo)&&(taginfo._id))||tag));
		span=fdjtDOM("span",srcspan);
		if (links[tag]) {
		    var sg=links[tag];
		    var j=0; var jlim=sg.length;
		    while (j<jlim) {
			var icon=fdjtDOM.Image(cxicon("DiagLink",32,32));
			var gloss=Codex.glosses.ref(sg[j++]);
			var anchor=fdjtDOM.Anchor(gloss.link,"a",icon);
			anchor.title=gloss.note;
			fdjtDOM(span," ",anchor);}}
		if (notes[tag]) {
		    var sg=notes[tag];
		    var j=0; var jlim=sg.length;
		    var icon=fdjtDOM.Image(cxicon("remark",32,32));
		    while (j<jlim) {
			var gloss=Codex.glosses.ref(sg[j++]);
			icon.title=gloss.note; fdjtDOM(span," ",icon);}}}
	    else {
		span=fdjtDOM("span.dterm",taginfo||tag);
		span.setAttribute("tag",(((taginfo)&&(taginfo._id))||tag));}
	    fdjtDOM(info,((i>0)&&(" \u00b7 ")),span);
	    i++;}
	if (excerpt) {
	    var range=fdjtDOM.findString(fdjtID(frag),excerpt);
	    if (range) fdjtUI.Highlight(range,"highlightexcerpt");}
	else addClass(fdjtID(frag),"highlightpassage");
	info.onclick=sbookgloss_ontap;
	return info;}
    Codex.glossBlock=glossBlock;

    function sbookgloss_ontap(evt){
	var target=fdjtUI.T(evt);
	var parent=false;
	while (target) {
	    if (!(target.getAttribute)) target=target.parentNode;
	    else if (target.getAttribute("gloss")) 
		return Codex.showGloss(target.getAttribute("gloss"));
	    else if (target.getAttribute("tag"))
		return Codex.startSearch(target.getAttribute("tag"));
	    else if (target.getAttribute("source"))
		return Codex.startSearch(target.getAttribute("source"));
	    else target=target.parentNode;}
	fdjtUI.cancel(evt);}

    Codex.setInfoTarget=function(passage){
	var passageid=((passage.id)||(passage.codexdupid));
	var infodiv=Codex.glossBlock(passageid,"div.sbookgloss")
	fdjtDOM.replace("SBOOKTARGETINFO",infodiv);
	fdjtDOM.adjustToFit(fdjtID("SBOOKFOOTINFO"));}

}