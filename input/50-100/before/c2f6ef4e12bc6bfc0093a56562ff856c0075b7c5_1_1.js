function() {
		return (this.type == Token.LINE_TERM && (this.text == null || this.text == ''))
			|| (this.type == Token.ID && this.text != null && this.text == "__END__");
	}