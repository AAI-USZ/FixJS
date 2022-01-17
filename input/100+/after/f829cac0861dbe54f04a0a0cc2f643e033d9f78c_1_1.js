function saveDocument(main_win,doc){
	"use strict";
	var fname = $.trim(main_win.saveAs.value);
	if(!/^[-A-Za-z0-9~ ]+$/.test(fname)){
		return alert("Invalid Document Name; please use only alphanumeric characters and spaces.");
	}
	$.ajax({
		type: 'POST',
		url: 'saveJSON.php',
		data: {mode:'check',fname:fname}, //filename
		success: function(data, textStatus){
			if(data==='1' && !confirm("Replace existing document?")){ return; }
			var datastr = JSON.stringify({
				contentLanguage:doc.contentLanguage,
				translationLanguage:doc.translationLanguage,
				glossedWords:doc.glossedWords,
				pages:doc.pages
			},null,'\t');
			
			$.ajax({
				type: 'POST',
				url: 'saveJSON.php',
				//filename and stringified Content
				data: {mode:'save',fname:fname,content:datastr},
				//redirect to authorhome
				success: function(){ window.location.assign('./authorhome.php'); }
			});
		}
	});
}