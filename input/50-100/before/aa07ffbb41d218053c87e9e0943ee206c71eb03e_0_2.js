function(width, height){
		this.merged_visible_tiles = this.create_matrix(width, height);
		for ( var i = 0; i < width; i++){
			for ( var j = 0; j < height; j++){
				this.merged_visible_tiles[i][j] = this.BLOCKED;
			}
		}
	}