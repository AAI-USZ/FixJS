function _hideQtip(){
		var note = that.find('.note');
		if(note.css("display") == "block"){
			note.qtip("hide");
		}
	}