function(err, info) {
		if(info == null)
			info = err;
		//prevent the same error from appearing twice
		if(err.lastFilename == info.filename && err.lastFilename != null)
			return err;
		info.column = info.column || info.col;
		//Generate error message
		var msg = err.message + "\n    at " +
			(info.filename == null ? "<anonymous>" : info.filename) + 
			(info.line == null ? "" : ":" + info.line +
				(info.column == null ? "" : ":" + info.column) );
		if(info.source != null)
		{
			var LINES_ABOVE_AND_BELOW = 3;
			var lines = info.source.split("\n"),
				start = Math.max(info.line - LINES_ABOVE_AND_BELOW, 0),
				end = Math.min(info.line + LINES_ABOVE_AND_BELOW, lines.length),
				digits = new String(end).length;
			lines = lines.slice(start, end);
			msg += "\n\n";
			for(var i = 0; i < lines.length; i++)
				msg += pad(i + start + 1, digits) +
					(i + start + 1 == info.line ? ">\t" : "|\t") +
					lines[i] + "\n";
		}
		err.message = msg;
		err.lastFilename = info.filename;
		//Only set these properties once
		if(err.filename == null && err.line == null)
		{
			err.filename = info.filename;
			err.line = info.line;
			err.column = info.column;
		}
		return err;
	}