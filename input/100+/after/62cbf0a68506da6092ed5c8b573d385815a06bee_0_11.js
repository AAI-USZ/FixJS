function (range) {
		var bookMark;
		if (HTMLArea.isIEBeforeIE9) {
				// Bookmarking will not work on control ranges
			try {
				bookMark = range.getBookmark();
			} catch (e) {
				bookMark = null;
			}
		} else {
				// Create the bookmark info (random IDs).
			var bookMark = {
				startId : (new Date()).valueOf() + Math.floor(Math.random()*1000) + 'S',
				endId   : (new Date()).valueOf() + Math.floor(Math.random()*1000) + 'E'
			};
			var startSpan;
			var endSpan;
			var rangeClone = range.cloneRange();
				// For collapsed ranges, add just the start marker
			if (!range.collapsed ) {
				endSpan = this.document.createElement('span');
				endSpan.style.display = 'none';
				endSpan.id = bookMark.endId;
				endSpan.setAttribute('data-htmlarea-bookmark', true);
				endSpan.innerHTML = '&nbsp;';
				rangeClone.collapse(false);
				rangeClone.insertNode(endSpan);
			}
			startSpan = this.document.createElement('span');
			startSpan.style.display = 'none';
			startSpan.id = bookMark.startId;
			startSpan.setAttribute('data-htmlarea-bookmark', true);
			startSpan.innerHTML = '&nbsp;';
			var rangeClone = range.cloneRange();
			rangeClone.collapse(true);
			rangeClone.insertNode(startSpan);
			bookMark.startNode = startSpan;
			bookMark.endNode = endSpan;
				// Update the range position.
			if (endSpan) {
				range.setEndBefore(endSpan);
				range.setStartAfter(startSpan);
			} else {
				range.setEndAfter(startSpan);
				range.collapse(false);
			}
			return bookMark;
		}
	}