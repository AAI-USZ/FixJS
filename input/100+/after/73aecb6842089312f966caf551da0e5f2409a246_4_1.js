function(ch) {
		if (ch == UNI_LINE_SEPARATOR || ch == UNI_PARAGRAPH_SEPARATOR) {
			this.line++;
			this.col = 1;
			this.lastCr = false;
		} else if (ch == CARRIAGE_RETURN) {
			this.line++;
			this.col = 1;
			this.lastCr = true;
		} else if (ch == LINE_FEED) {
			if (!this.lastCr) {
				this.line++;
			}

			this.col = 1;
			this.lastCr = false;
		} else {
			this.col++;
			this.lastCr = false;
		}
	}