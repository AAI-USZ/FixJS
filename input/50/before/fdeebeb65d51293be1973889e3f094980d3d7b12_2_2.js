function blockError(buf, blockBuf) {
		buf.filename = blockBuf.filename;
		buf.line = blockBuf.line;
		buf.col = blockBuf.col;
	}