function linkMoveClick(e) {
		var
			$this = $(this),
			game = $this.data('game'), 
			index = $this.data('index'), 
			noAnim = $this.data('noAnim');
		$this.addClass('pgn-current-move').siblings().removeClass('pgn-current-move');
		game.showMoveTo(index, noAnim);
	}