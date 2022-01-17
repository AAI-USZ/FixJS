function(){

			var bombCounter = 10;
			this.scoreBombs = 10;
			this.timeLeft = 300;


			this.startTimer();

			$('#board .square').removeClass('cleared bombed flagged trigger bomb-1 bomb-2 bomb-3 bomb-4 bomb-5 bomb-6').text('');
			$('#board button').removeAttr('disabled');
			$('#score-restart-button').removeClass('success');

			$('#score-bomb-count').text(this.zeroPad(this.scoreBombs, 3));
			
			$('#board .square').each(function(index){

				index++;
				var x = Math.ceil(index/9);
				var y = (index % 9) ? (index%9) : 9;

				$(this).attr('data-x', x);
				$(this).attr('data-y', y);
				$(this).attr('id', 'cell-' + x + '-' + y);

			});

			
			//Init grid.
			//zero-index & 10-index are dummy cells
			for (var row = 0; row <= this.gridSize + 1; row++) {
				grid[row] = [];
				for (var col = 0; col <= this.gridSize + 1; col++) {
					grid[row][col] = {hasBomb: false, bombCount: 0, status: CELL_STATUS.NEW };

				}
			}


			//Insert bombs randomly
			var b = bombCounter;

			while(b > 0){
				
				var x = Math.ceil(Math.random() * this.gridSize);
				var y = Math.ceil(Math.random() * this.gridSize);


				if ( !(grid[x][y]).hasBomb ) {
					(grid[x][y]).hasBomb = true;
					b--;
				}
			}

			//Init adjacent bomb counter
			for (var i = 1; i <= this.gridSize; i++) {
				for (var j = 1; j <= this.gridSize; j++) {

					if ( (grid[i][j]).hasBomb ) {

						grid[i-1][j-1].bombCount++;
						grid[i-1][j  ].bombCount++;
						grid[i-1][j+1].bombCount++;
						grid[i  ][j-1].bombCount++;
						grid[i  ][j+1].bombCount++;
						grid[i+1][j-1].bombCount++;
						grid[i+1][j  ].bombCount++;
						grid[i+1][j+1].bombCount++;

					}
				}
			}

			

		}