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