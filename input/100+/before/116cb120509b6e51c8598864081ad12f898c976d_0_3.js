function() {
			var 
				wrapperDiv = $(this),
				pgnSource = $('div.pgn-sourcegame', wrapperDiv),
				boardDiv;
										 
			if (pgnSource.length > 1) 
				selector = $('<select>').change(selectGame);
			
			var tds = buildBoardDiv(wrapperDiv, selector);
			var ind = 0;
			pgnSource.each(function() {
				var
					pgnDiv = $(this),
					game = new Game(tds);
					game.populateBoard(); // later use FEN, maybe
					game.analyzePgn(pgnDiv.text());
					game.gotoBoard(0);
					wrapperDiv.data({currentGame: game});
				if (selector) {
					allGames.push(game);
					selector.append($('<option>', {value: allGames.length - 1, text:game.description()}));
				}
				else
					game.show();
			});
		}