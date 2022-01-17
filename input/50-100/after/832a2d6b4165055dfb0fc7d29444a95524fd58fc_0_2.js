function(){
				if($._wordSearch.gameState.dragging==false) return;
				$._wordSearch.gameState.dragging=false;
				$._wordSearch.computeSelectedSquares();
				$._wordSearch.checkSelectedWord();
				$('.selectedSquare').removeClass('selectedSquare');

				}