function (hex) {
		var end = { line: this.pos.line, ch: this.pos.ch + this.color.length };
		this.editor.document.replaceRange(hex, this.pos, end);
		this.color = hex;
	}