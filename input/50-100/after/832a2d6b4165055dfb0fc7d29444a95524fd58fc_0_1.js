function(){
				if($._wordSearch.gameState.dragging==false) return;
				$._wordSearch.gameState.dragging=false;
				$._wordSearch.gameState.endSq=$(this).data();
				$._wordSearch.computeSelectedSquares();
				$._wordSearch.checkSelectedWord();
				$('.selectedSquare').removeClass('selectedSquare');

				}