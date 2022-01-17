function() {
			var currentColor = null;
			var compareColor = null;
			var matchingBlocks = [];
			var blocksToDestroy = [];
			var colors = [];

			for ( var x = 0; x < this._maxX; x++ ) {
				matchingBlocks = [];
				for ( var y = 0; y < this._maxY; y++ ) {
						compareColor = Grid.stripColor( this.gameArray[x][y].value );

					if ( currentColor == ' ' || currentColor != compareColor ) {
						//check if there are blocks to destroy after each nonconsecutive colored block
						if ( matchingBlocks.length >= 4 ) {
							for ( var i = 0; i < matchingBlocks.length; i++ ) {
								blocksToDestroy.push( matchingBlocks[i] );
							}
							colors.push( Grid.stripColor( matchingBlocks[0].name ) );
							matchingBlocks = [];
						}
						currentColor = compareColor;
						matchingBlocks = [{ 'x': x, 'y': y, 'name': this.gameArray[x][y].value }];
					}
					else {
						matchingBlocks.push({ 'x': x, 'y': y, 'name': this.gameArray[x][y].value });
					}
				}
				//--- last check for consecutive colored blocks at the end of the column
				if ( matchingBlocks.length >= 4 ) {
					for ( var i = 0; i < matchingBlocks.length; i++ ) {
						blocksToDestroy.push( matchingBlocks[i] );
					}
					colors.push( Grid.stripColor( matchingBlocks[0].name ) );
					matchingBlocks = [];
				}
				//---
			}
			var returnArr = [blocksToDestroy, colors];
			return returnArr;
		}