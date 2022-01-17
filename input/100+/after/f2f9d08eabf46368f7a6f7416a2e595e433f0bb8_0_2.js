function() {
		var 
			saveAnim = anim,
			board = this.boards[this.index];
		anim = 0;
		for (var i in this.pieces)
			this.pieces[i].disappear();
		for (var i in board) 
			board[i].appear(file(i), row(i));
		this.descriptionsDiv.children().remove();
		var s = '';
		for (var d in this.descriptions)
			s += (d + ': ' + this.descriptions[d] + '<br/>');
		this.descriptionsDiv.html(s);
		anim = saveAnim;
	}