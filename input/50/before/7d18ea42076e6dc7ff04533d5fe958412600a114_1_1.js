function blockError(buf, blockBuf) {
		buf.filename = blockBuf.filename;
		buf.source = blockBuf.source;
		buf.line = blockBuf.line;
		buf.col = blockBuf.col;
	}