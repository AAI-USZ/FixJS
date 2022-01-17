function(){
				$._wordSearch.gameState.dragging=false;
				$._wordSearch.computeSelectedSquares();
				$._wordSearch.checkSelectedWord();
				$('.selectedSquare').removeClass('selectedSquare');

				}