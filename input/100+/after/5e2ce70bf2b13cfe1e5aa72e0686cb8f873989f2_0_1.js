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
		
		// On initial load, get private game id
		// TODO: look into replacing with hash, then remove it without
		// interfering with jQuery mobile's use of hashes.
		var m = window.location.href.match(/\?g=(\d+)/);
		if (m) {
			this.privGameId = this.padId(+m[1]);
		}
	}