function(row,col){
			if ( row < this.matrix.length && row >= 0 ){
				return this.matrix[row][col];
			} else {
				return undefined;
			}
		}