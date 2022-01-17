function Game() {
	this.grid = new Array(9);
	for (i=0; i<9; i++) {
		this.grid[i] = new Array(9);
		for (j=0; j<9; j++)
		  this.grid[i][j] = null;
  }
}