function(args)
	{
		args = args || {};
		this.statusEl = args.statusBar || $(".c4status");
		this.boardEl = args.board || $("#c4board");
	}