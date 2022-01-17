function saveDocument(main_win,doc){
	"use strict";
	var datastr,x,thisgloss,
		gwords = doc.glossedWords,
		fname = main_win.saveAs.value;
	if(!/^[-A-Za-z0-9~ ]+$/.test(fname)){
		return alert("Invalid Document Name; please use only alphanumeric characters and spaces.");
	}
	/*//escape all of the text, just in case
	map(doc.pages,['title','content'],HTMLToEntity);//escape);
	for(x=gwords.length-1;x>=0;x--){
		thisgloss = gwords[x];
		if(thisgloss.textAnnotation){	map(thisgloss.textAnnotation,['title','content'],HTMLToEntity);}//escape);}
		if(thisgloss.imageAnnotation){	map(thisgloss.imageAnnotation,['title','url','content'],HTMLToEntity);}//escape);}
		if(thisgloss.audioAnnotation){	map(thisgloss.audioAnnotation,['title','url','content'],HTMLToEntity);}//escape);}
		if(thisgloss.videoAnnotation){	map(thisgloss.videoAnnotation,['title','url','content'],HTMLToEntity);}//escape);}
	}*/

	datastr = JSON.stringify(
		{
			contentLanguage:doc.contentLanguage,
			translationLanguage:doc.translationLanguage,
			glossedWords:doc.glossedWords,
			pages:doc.pages
		},null,'\t');
	$.ajax({
		type: 'POST',
		url: 'saveJSON.php', //php script to save the data
		data: {mode:'check',fname:fname}, //filename
		success: function(data, textStatus){
			if(data!=='1' || confirm("Replace existing document?")){$.ajax({
				type: 'POST',
				url: 'saveJSON.php', //php script to save the data
				data: {mode:'save',fname:main_win.saveAs.value,content:datastr}, //filename and stringified Content
				success: function(data, textStatus){ //redirect to authorhome
					window.location.assign('./authorhome.php');
				}
			}		}
	});
}
