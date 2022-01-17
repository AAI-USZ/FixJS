function createFlipper() {
		var flipper =
			$('<img>', {src: flipImageUrl})
				.css({width: '40px', float:'right', clear: 'right'})
				.click(function() { 
					flip ^= 1;
					var rotation = flip ? 'rotate(180deg)' : 'rotate(0deg)';
					$(this).css({
						'-webkit-transform': rotation,
						'-moz-transform': rotation,
						'-ms-transform': rotation,
						'-o-transform': rotation,
						'transform': rotation})
					currentGame.gotoBoard(currentGame.index);
					$(this).closest('table').find('td.pgn-row').each(function() {
						$(this).text(9 - $(this).text())
					})
				});
		return flipper;
	}