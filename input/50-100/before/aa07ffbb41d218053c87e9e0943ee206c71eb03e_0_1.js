function(width, height){
		this.viewed_tiles = this.create_matrix(width, height);
		for ( var i = 0; i < width; i++){
			for ( var j = 0; j < height; j++){
				this.viewed_tiles[i][j] = this.UNSEEN;
			}
		}
	}