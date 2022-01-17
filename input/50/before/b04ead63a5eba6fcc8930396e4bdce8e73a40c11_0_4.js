function(pieces, frame, time_to_start_affecting){
		Effect.call(this, time_to_start_affecting + 1, time_to_start_affecting);

		this.targets = pieces;
		this.frame = frame;
	}