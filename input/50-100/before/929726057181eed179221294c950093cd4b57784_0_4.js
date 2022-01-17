function() {
		currentGame = this;
		for (var td in this.tds)
			this.tds[td].find('div').toggle(false);
		this.boardDiv.toggle(true);
		this.pgnDiv.toggle(true);
		this.descriptionsDiv.toggle(true);
		this.drawBoard();
	}