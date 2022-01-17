function() {
			var virusCount = 0;
			for ( var y = 0; y < this._maxY; y++ ) {
				for ( var x = 0; x < this._maxX; x++ ) {
					if ( Grid.isVirus(this.gameArray[x][y].value) ) {
						virusCount++;
					}
				}
			}
			return virusCount;
		}