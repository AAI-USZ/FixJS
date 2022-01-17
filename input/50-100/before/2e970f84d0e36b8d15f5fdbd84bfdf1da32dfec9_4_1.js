function() {
		var ieRange, endRange, startRange, range, sel;

		// create a range
		range = rangy.createRange();

		// set start and endContainer
		range.setStart(this.startContainer,this.startOffset);
		range.setEnd(this.endContainer, this.endOffset);

		// update the selection
		sel = rangy.getSelection();
		sel.setSingleRange(range);
	}