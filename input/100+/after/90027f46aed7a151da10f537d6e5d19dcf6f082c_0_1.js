function makeWords(textNode) {
		// Split the text in the node by space characters
		var split, length, spaces, node,
			text = textNode.nodeValue,
			lastIndex = 0;

		// Skip empty nodes
		if (!text) {
			return;
		}

		//correct for IE break characters
		//leave a strange unicode character as a marker
		text = text.replace(rbreakleft, marker + '$1')
				.replace(rbreakright, '$1' + marker)
				.replace(rbreakboth, marker + '$1' + marker);

		// split the string by break characters
		split = text.split(rsplit);
		
		// remove our markers
		text = text.replace(rmarker, '');

		// Add the original string (it gets split)
		var fragment = document.createDocumentFragment();
		
		// set the "last index" based on leading whitespace
		lastIndex = rprespace.exec(text)[1].length;

		// loop by the splits
		$.each(split, function() {
			length = this.length;

			// IE9 will return empty splits (consecutive spaces)
			if (!length) {
				return true;
			}

			//include the trailing space characters
			rspace.lastIndex = lastIndex + length;
			spaces = rspace.exec(text);			
			
			// slice out our text
			// create a new node with it
			node = wrapWord(text.substr(lastIndex, length + spaces[1].length));
			if (node !== null) {
				fragment.appendChild(node);
			}
			lastIndex = lastIndex + length + spaces[1].length;
		});
		textNode.parentNode.replaceChild(fragment.cloneNode(true), textNode);
	}