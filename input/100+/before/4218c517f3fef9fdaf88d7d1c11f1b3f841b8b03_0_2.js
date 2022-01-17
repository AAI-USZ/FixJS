function (e) {
	"use strict";

	var start, end, nl,
		tabs = 0;

	if (e.keyCode === 9) {
		e.preventDefault();
		start = this.selectionStart;
		nl = end = this.selectionEnd;
		if (e.shiftKey) {
			// If shift key pressed, remove tabs from beginning of lines
			while (true) {
				nl = this.value.lastIndexOf('\n', nl - 1);
				if (this.value.slice(nl + 1, nl + 2) === '\t') {
					tabs += 1;
					this.value = this.value.slice(0, nl + 1) + this.value.slice(nl + 2);
				}
				if (nl < start) {
					this.selectionStart = start;
					this.selectionEnd = end - tabs;
					break;
				}
			}
		} else if (start === end) {
			// If no selection, insert tab
			this.value = this.value.slice(0, start) + '\t' + this.value.slice(start);
			this.selectionStart = this.selectionEnd = end + 1;
		} else {
			// If selection, insert tab at beginning of every line
			while (true) {
				tabs += 1;
				nl = this.value.lastIndexOf('\n', nl - 1);
				this.value = this.value.slice(0, nl + 1) + '\t' + this.value.slice(nl + 1);
				if (nl < start) {
					this.selectionStart = start + 1;
					this.selectionEnd = end + tabs;
					break;
				}
			}
		}
	}
}