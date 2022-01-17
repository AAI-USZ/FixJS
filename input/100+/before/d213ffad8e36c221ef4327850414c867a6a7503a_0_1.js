function(l, ss) {
			var level = l <= 20 ? l : 20;
			var numOfViruses = level*4 + 4,
				virusIndex,
				i,
				x,
				y;
			for ( i = 0; i < numOfViruses; i++ ) {
				virusIndex = Math.floor(Math.random()*Grid.virusArray.length);
				x = Math.floor(Math.random()*this._maxX);
				y = Math.floor(Math.random()*(this._maxY - 3) + 3);
//				console.log(virusIndex,x,y);
//				console.log(Grid.virusArray[virusIndex]);

				var varName = 'virus' + i;
				var emptyGridSpace = false;
				while ( !emptyGridSpace ) {
					if ( this.gameArray[x][y].value != ' ' ) {
						if ( x == 7 ) {
							x = 0;
							y == 15 ? y = 3 : y++;
							console.log('right wall');
						}

						else {
							console.log('x++');
							x++;
						}
					}

					else {
						emptyGridSpace = true;
					}
				}

				this.viruses.varName = new BitmapAnimation(ss);
				this.viruses.varName.x = this.getX(x);
				this.viruses.varName.y = this.getY(y);
				this.viruses.varName.gotoAndStop(Grid.virusArray[virusIndex]);
				this.gameArray[x][y].value = Grid.virusArray[virusIndex] + '_' + virusIndex;
				this.gameArray[x][y].asset = this.viruses.varName;
				this.addChild(this.viruses.varName);
			}
		}