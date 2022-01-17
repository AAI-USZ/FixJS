function(err){
	    console.log(err);
	    if (!err) {
		addEvent("addDef", "by id:"+req.cookies.id+";word:"+wordData.word);
	    } else {
		addEvent("addDefError", err);
	    }
	}