function(width, height) {

		        var matrix = new Array(height);
		        var row;
		        var col;
		        for( row = 0; row < height; row++) {
		                matrix[row] = new Array(width);
		        }

			return matrix;
	}