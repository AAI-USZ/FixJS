function(index) {
		var 
			saveAnim = anim,
			board = this.boards[index];
		anim = 0;
		for (var i in this.pieces)
			this.pieces[i].disappear();
		for (var i in board) 
			board[i].appear(file(i), row(i));
		anim = saveAnim;
	}