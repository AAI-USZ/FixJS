function() {
			checkAgain = false;
			for ( var y = this._maxY - 1; y > 0; y-- ) {
				for (var x = 0; x < this._maxX; x++ ) {
					var thisBlock = this.gameArray[x][y];
					var aboveBlock = this.gameArray[x][y-1];
					//for each blank space, see if there is a block above it that should fall down
					if (thisBlock.value == ' ' && aboveBlock.value != ' '  && !Grid.isVirus( aboveBlock.value )) {
						var leftBlock = x <= 0 ? false : this.gameArray[x-1][y-1];
						var rightBlock = x + 1 >= this._maxX ? false : this.gameArray[x+1][y-1];
						var pillIndex = Grid.stripPillNumber ( aboveBlock.value );
						//check left and right of block for other side of pill
						if ( !leftBlock || Grid.stripPillNumber( leftBlock.value ) != pillIndex ) {
							if ( !rightBlock || Grid.stripPillNumber( rightBlock.value) != pillIndex ) {
								//if neither the left or right side drop block down
								checkAgain = true;
								this.dropBlock(x, y-1);
								//check if other side of pill is above
								if ( y - 2 >= 0 && Grid.stripPillNumber(this.gameArray[x][y-2].value) == pillIndex ) {
									checkAgain = true;
									this.dropBlock(x, y-2);
								}
							}
							else {
								//check under right side to see if the whole pill can drop
								if ( this.gameArray[x+1][y].value == ' ' ) {
									checkAgain = true;
									this.dropBlock(x, y-1);
									this.dropBlock(x+1, y-1);
								}
							}
						}
						else {
							//check under left side to see if the whole pill can drop
							if ( this.gameArray[x-1][y].value == ' ' ) {
								checkAgain = true;
								this.dropBlock(x, y-1);
								this.dropBlock(x-1, y-1);
							}
						}

					}

				}
			}
			return checkAgain;
		}