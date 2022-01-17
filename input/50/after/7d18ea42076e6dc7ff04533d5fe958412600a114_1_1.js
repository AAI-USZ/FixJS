function blockError(buf, blockBuf, copyFilename) {
		if(copyFilename)
		{
			buf.filename = blockBuf.filename;
			buf.source = blockBuf.source;
		}
		buf.line = blockBuf.line;
		buf.col = blockBuf.col;
	}