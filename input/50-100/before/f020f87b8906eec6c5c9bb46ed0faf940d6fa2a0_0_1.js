function(wallIdx){

		var subwallGrid = new Array(this.numCols);

		for (var x=0; x<this.numCols; x++){ //HEY - you changed this from .floor +1

			var column = new Array(this.numRows);

			for (var y=0; y<this.numRows; y++){

				column[y] = (this.getSubwallsInGrid(wallIdx, x, y));

			}

			subwallGrid[x] = (column);

		}

		return subwallGrid;

		

		

	}