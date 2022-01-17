function Grid (game) {
	var table = document.getElementById('grid');
	this.commands = document.getElementById('commands');
	this.commands.className = 'hidden';
	
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
	    
			tr.appendChild(td);
			
			this.cells[i][j] = td;
		}			
	}
	this.newGame = document.getElementById('newGame');
	this.reset = document.getElementById('reset');
	this.modifiedCell = null;
	this.inserts = document.getElementsByClassName('insert');
	this.erase = document.getElementById('erase');
	
	/* Add events */
	this.addEvents();
}