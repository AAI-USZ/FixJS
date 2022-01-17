function (hex) {
		var cm = this.editor._codeMirror;
		var end = { line: this.pos.line, ch: this.pos.ch + this.color.length };
		cm.replaceRange(hex, this.pos, end);
		this.color = hex;
	}