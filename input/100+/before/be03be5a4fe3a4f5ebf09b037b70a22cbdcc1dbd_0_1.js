function(args)
	{
		args = args || {};
		this.statusEl = args.statusBar || $(".c4status");
		this.gameStatusEl = args.gameStatus || $("#gameStatus");
		this.boardEl = args.board || $("#c4board");
		
		$("#game-home-btn").click(function(){
			if (C4.gameId)
				C4.quit_game();
		});
	}