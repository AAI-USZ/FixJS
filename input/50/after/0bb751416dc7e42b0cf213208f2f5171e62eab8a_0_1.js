function(err){
	    console.log(err);
	    if (!err) {
		addEvent("addDef", "by id:"+req.cookies.id+";wid:"+wordData.wid);
	    } else {
		addEvent("addDefError", err);
	    }
	}