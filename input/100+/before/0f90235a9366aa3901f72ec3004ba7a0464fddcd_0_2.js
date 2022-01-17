function fillinAboutInfo(){
	    var about=fdjtID("APPABOUT");
	    var bookabout=fdjtID("SBOOKABOUTPAGE")||fdjtID("SBOOKABOUT");
	    var authorabout=fdjtID("SBOOKAUTHORPAGE")||fdjtID("SBOOKABOUTAUTHOR");
	    var metadata=fdjtDOM.Anchor(
		"https://www.sbooks.net/publish/metadata?REFURI="+
		    encodeURIComponent(Codex.refuri),
		"metadata",
		"edit metadata");
	    metadata.target="_blank";
	    metadata.title=
		"View (and possibly edit) the metadata for this book";
	    var reviews=fdjtDOM.Anchor(null,
//		"https://www.sbooks.net/publish/reviews?REFURI="+
//		    encodeURIComponent(Codex.refuri),
		"reviews",
		"see/add reviews");
	    reviews.target="_blank";
	    reviews.title="Sorry, not yet implemented";
	    fdjtDOM(about,fdjtDOM("div.links",metadata,reviews));

	    if (bookabout) fdjtDOM(about,bookabout);
	    else {
		var title=
		    fdjtID("SBOOKTITLE")||
		    fdjtDOM.getMeta("codex.title")||
		    fdjtDOM.getMeta("TITLE")||
		    fdjtDOM.getMeta("DC.title")||
		    document.title;
		var byline=
		    fdjtID("SBOOKBYLINE")||fdjtID("SBOOKAUTHOR")||
		    fdjtDOM.getMeta("codex.byline")||fdjtDOM.getMeta("BYLINE")||
		    fdjtDOM.getMeta("codex.author")||fdjtDOM.getMeta("AUTHOR");
		var copyright=
		    fdjtID("SBOOKCOPYRIGHT")||
		    fdjtDOM.getMeta("codex.copyright")||fdjtDOM.getMeta("COPYRIGHT")||
		    fdjtDOM.getMeta("RIGHTS");
		var publisher=
		    fdjtID("SBOOKPUBLISHER")||
		    fdjtDOM.getMeta("codex.publisher")||
		    fdjtDOM.getMeta("PUBLISHER");
		var description=
		    fdjtID("SBOOKDESCRIPTION")||
		    fdjtDOM.getMeta("codex.description")||
		    fdjtDOM.getMeta("DESCRIPTION");
		var digitized=
		    fdjtID("SBOOKDIGITIZED")||
		    fdjtDOM.getMeta("codex.digitized")||
		    fdjtDOM.getMeta("DIGITIZED");
		var sbookified=fdjtID("SBOOKIFIED")||fdjtDOM.getMeta("SBOOKIFIED");
		_sbookFillTemplate(about,".title",title);
		_sbookFillTemplate(about,".byline",byline);
		_sbookFillTemplate(about,".publisher",publisher);
		_sbookFillTemplate(about,".copyright",copyright);
		_sbookFillTemplate(about,".description",description);
		_sbookFillTemplate(about,".digitized",digitized);
		_sbookFillTemplate(about,".sbookified",sbookified);
		_sbookFillTemplate(about,".about",fdjtID("SBOOKABOUT"));
		var cover=fdjtDOM.getLink("cover");
		if (cover) {
		    var cover_elt=fdjtDOM.$(".cover",about)[0];
		    if (cover_elt) fdjtDOM(cover_elt,fdjtDOM.Image(cover));}}
	    if (authorabout) fdjtDOM(about,authorabout);}