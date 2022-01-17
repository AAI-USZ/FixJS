function() {
		self.makeTable();
		self.resetUserBoard();
		self.genClues();
		self.drawClues();
		
		// check each column and row (to select rows with clue = 0)
		for (y = 0; y < self.getHeight(); y++)
			self.checkClue(0, y);
		for (x = 0; x < self.getWidth(); x++)
			self.checkClue(x, 0);
		
		self.setEvents();
	}