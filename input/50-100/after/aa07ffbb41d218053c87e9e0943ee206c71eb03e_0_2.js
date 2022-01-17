function(height, width){
		this.merged_visible_tiles = this.create_matrix(height, width);
		for ( var i = 0; i < width; i++){
			for ( var j = 0; j < height; j++){
				this.merged_visible_tiles[j][i] = this.BLOCKED;
			}
		}
	}