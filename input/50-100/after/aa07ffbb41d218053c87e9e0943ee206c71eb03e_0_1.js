function(height, width){
		this.viewed_tiles = this.create_matrix(height, width);
		for ( var i = 0; i < width; i++){
			for ( var j = 0; j < height; j++){
				this.viewed_tiles[j][i] = this.UNSEEN;
			}
		}
	}