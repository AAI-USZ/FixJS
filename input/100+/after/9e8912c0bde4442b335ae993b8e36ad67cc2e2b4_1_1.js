function Grid (game) {
	var table = document.getElementById('grid');
	
	
	/* Initialize attributes */
	this.cells = new Array(9);
	for (i=0; i<9; i++) {
		var tr = document.createElement('tr');
		table.appendChild(tr);
		
		this.cells[i] = new Array(9);
		for (j=0; j<9; j++) {
			var td = document.createElement('td');
			
			if (game.grid[i][j] == null)
				td.className = 'cell';
			else {
				td.className = 'number';
				td.innerHTML = game.grid[i][j];
			}
			td.id = String(i + '-' + j);
			tr.appendChild(td);
			
			this.cells[i][j] = td;
		}			
	}
	this.commands = document.getElementById('commands');
	this.commands.className = 'hidden';
	this.newGame = document.getElementById('newGame');
	this.reset = document.getElementById('reset');
	this.inserts = document.getElementsByClassName('insert');
	this.erase = document.getElementById('erase');
	
	this.modifiedCell = null;
	
	this.game = game;
	/* Add events */
	this.addEvents();
}