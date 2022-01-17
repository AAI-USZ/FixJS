function() {
				var 
					wrapper = $(this).closest('div.pgn-source-wrapper'),
					currentGame = wrapper.data('currentGame');
				currentGame.advance();
			}