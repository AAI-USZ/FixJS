function(window) {
	var Grid = function(initX,initY) {
		this.initialize(initX,initY);
	}
	
	var p = Grid.prototype = new Container();
	//static properties
		Grid.virusArray = ['red_virus','yellow_virus','blue_virus'];
		Grid.blockArray = ['red','yellow','blue'];
	
	//public properties
		p.gameArray = [];
		p.coorDict = {};
		p.viruses = {};
		p.numOfPills = null;

	//private properties
		p._initX = null;
		p._initY = null;
		p._maxX = null;
		p._maxY = null;
		
	//constructor
		p.initialize = function(initX,initY) {
			this.x = 0;
			this.y = 0;
			this.numOfPills = 0;
			this._initX = initX;
			this._initY = initY;
			this._maxX = 8;
			this._maxY = 16;

			for ( var i = 0 ; i < this._maxX; i++ ) {
				this.gameArray[i] = [];
				for ( var j = 0; j < this._maxY; j++ ) {
					//initialize the gameArray
					this.gameArray[i][j] = {'value':' ', 'asset': null};
				}
			}
		}
	//static methods
		Grid.stripColor = function(str) {
			var re = /[a-z]+_?/;
			var results = re.exec(str);
			return results ? results[0] : ' ';
		}

		Grid.stripPillNumber = function(str) {
			var re = /[0-9]+(?=_)/;
			var results = re.exec(str);
			return results ? results[0] : ' ';
		}

		Grid.stripBlockIndex = function(str) {
			return str[-1];
		}

		Grid.stripVirusIndex = function(str) {
			return str[-1];
		}

		Grid.isVirus = function(str) {
			var re = /_[a-z]+/;
			var result = re.exec(str);
			return (!result || result[0] != '_virus') ? false : true;
		}


	//public methods
		p.getInitX = function() {
			return this._initX;
		}

		p.getInitY = function() {
			return this._initY;
		}

		p.getMaxX = function() {
			return this._maxX;
		}

		p.getMaxY = function() {
			return this._maxY;
		}

		p.getX = function(ix) {
			return this._initX + ix*gGridSpace;
		}

		p.getY = function(iy) {
			return this._initY + iy*gGridSpace;
		}

		p.getGridValue = function(x,y) {
			var ix = (x - this._initX)/gGridSpace;
			var	iy = (y - this._initY)/gGridSpace;
			if (ix < 0 || ix > 7 || iy < 0 || iy > 15) {
				return false;
			}
			//console.log(ix + ', ' + iy)
			return this.gameArray[ix][iy].value ? this.gameArray[ix][iy].value : false;
		}

		p.setGridValue = function(x,y,value) {
			var ix = (x - this._initX)/gGridSpace;
			var	iy = (y - this._initY)/gGridSpace;
			if (!this.gameArray[ix][iy].value) {
				return false;
			}
			this.gameArray[ix][iy].value = value;
		}

		p.getGridAsset = function(x,y) {
			var ix = (x - this._initX)/gGridSpace;
			var	iy = (y - this._initY)/gGridSpace;
			if (ix < 0 || ix > 7 || iy < 0 || iy > 15) {
				return false;
			}
			return this.gameArray[ix][iy].asset ? this.gameArray[ix][iy].asset : false;
		}

		p.setGridAsset = function(x,y,asset) {
			var ix = (x - this._initX)/gGridSpace;
			var	iy = (y - this._initY)/gGridSpace;
			if (!this.gameArray[ix][iy].value) {
				return false;
			}
			this.gameArray[ix][iy].asset = asset;
		}


		p.initViruses = function(l, ss) {
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

		p.checkBlocksColumns = function() {
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

		p.checkBlocksRows = function() {
			var currentColor = null;
			var compareColor = null;
			var matchingBlocks = [];
			var blocksToDestroy = [];
			var colors = [];

			for ( var y = 0; y < this._maxY; y++ ) {
				matchingBlocks = [];
				for ( var x = 0; x < this._maxX; x++ ) {
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

		p.checkBlocks = function() {
			var returnArrCol = this.checkBlocksColumns();
			var blocksToDestroyCol = returnArrCol[0];
			var colorsCol = returnArrCol[1];

			var returnArrRow = this.checkBlocksRows();
			var blocksToDestroyRow = returnArrRow[0];
			var colorsRow = returnArrRow[1];

			var blocksToDestroy = blocksToDestroyCol;
			for (var i = 0; i < blocksToDestroyRow.length; i++) {
				var flag = false;
				for (var j = 0; j < blocksToDestroy.length; j++) {
					if ( blocksToDestroyRow[i] == blocksToDestroy[j] ) {
						flag = true
					}	
				}
				if ( !flag ) {
					blocksToDestroy.push(blocksToDestroyRow[i]);
				}
			}
			return blocksToDestroy;
		}

		p.destroyBlocks = function(blocks) {
			for ( var i = 0; i < blocks.length; i++ ) {
				//set grid space to ' '
				this.gameArray[blocks[i].x][blocks[i].y].value = ' ';
				
				//set block to not visible
				//console.log(this.gameArray[blocks[i].x][blocks[i].y]);
				this.gameArray[blocks[i].x][blocks[i].y].asset.visible = false;
			}
		}

		p.dropBlocks = function() {
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
								if ( Grid.stripPillNumber(this.gameArray[x][y-2].value) == pillIndex ) {
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

		p.dropBlock = function(x,y) {
			//drop block down
			this.gameArray[x][y+1].value = this.gameArray[x][y].value;
			console.log(this.gameArray[x][y].asset);
			this.gameArray[x][y].asset.y += gGridSpace;
			this.gameArray[x][y+1].asset = this.gameArray[x][y].asset;
			//clear block
			this.gameArray[x][y].asset = null;
			this.gameArray[x][y].value = ' ';
			this.print();
		}

		//for testing
		p.print = function() {
			for ( var y = 0; y < this._maxY; y++ ) {
				var str = ( this.gameArray[0][y].value == ' ' ? 'empty' : this.gameArray[0][y].value ) + ' ';
				for ( var x = 1; x < this._maxX; x++ ) {
					str = str.concat( ( this.gameArray[x][y].value == ' ' ? 'empty' : this.gameArray[x][y].value ) + ' ' );
				}
				console.log(str);
			}
			console.log(' ');
		}
	window.Grid = Grid;
	console.log('Grid.js initialized');
}