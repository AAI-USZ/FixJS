function (e) {
	"use strict";

	var start, end, nl, value,
		tabs = 0;

	if (e.keyCode === 9) {
		e.preventDefault();
		start = this.selectionStart;
		nl = end = this.selectionEnd;
		if (e.shiftKey) {
			// If shift key pressed, remove tabs from beginning of lines
			while (true) {
				value = this.value;
				nl = value.lastIndexOf('\n', nl - 1) + 1;
				if (value.slice(nl, nl + 1) === '\t') {
					tabs += 1;
					this.value = value.slice(0, nl) + value.slice(nl + 1);
				}
				if (nl <= start) {
					this.selectionStart = start;
					this.selectionEnd = end - tabs;
					break;
				}
			}
		} else if (start === end) {
			// If no selection, insert tab
			value = this.value;
			this.value = value.slice(0, start) + '\t' + value.slice(start);
			this.selectionStart = this.selectionEnd = end + 1;
		} else {
			// If selection, insert tab at beginning of every line
			while (true) {
				value = this.value;
				tabs += 1;
				nl = value.lastIndexOf('\n', nl - 1) + 1;
				this.value = value.slice(0, nl) + '\t' + value.slice(nl);
				if (nl <= start) {
					this.selectionStart = start + 1;
					this.selectionEnd = end + tabs;
					break;
				}
			}
		}
	}
}