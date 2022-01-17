function() {
		return (this.type == TokenType.LINE_TERM && (this.text || '') == '')
			|| (this.type == TokenType.ID && this.text != null && this.text == "__END__");
	}