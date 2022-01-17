function(value, range) {
		// "Delete the contents of the active range, with strip wrappers
		// false."
		deleteContents(range, {stripWrappers: false});

		// "If the active range's start node is neither editable nor an editing
		// host, abort these steps."
		if (!isEditable(range.startContainer)
		&& !isEditingHost(range.startContainer)) {
			return;
		}

		// "If value's length is greater than one:"
		if (value.length > 1) {
			// "For each element el in value, take the action for the
			// insertText command, with value equal to el."
			for (var i = 0; i < value.length; i++) {
				commands.inserttext.action( value[i], range );
			}

			// "Abort these steps."
			return;
		}

		// "If value is the empty string, abort these steps."
		if (value == "") {
			return;
		}

		// "If value is a newline (U+00A0), take the action for the
		// insertParagraph command and abort these steps."
		if (value == "\n") {
			commands.insertparagraph.action( '', range );
			return;
		}

		// "Let node and offset be the active range's start node and offset."
		var node = range.startContainer;
		var offset = range.startOffset;

		// "If node has a child whose index is offset − 1, and that child is a
		// Text node, set node to that child, then set offset to node's
		// length."
		if (0 <= offset - 1
		&& offset - 1 < node.childNodes.length
		&& node.childNodes[offset - 1].nodeType == Node.TEXT_NODE) {
			node = node.childNodes[offset - 1];
			offset = getNodeLength(node);
		}

		// "If node has a child whose index is offset, and that child is a Text
		// node, set node to that child, then set offset to zero."
		if (0 <= offset
		&& offset < node.childNodes.length
		&& node.childNodes[offset].nodeType == Node.TEXT_NODE) {
			node = node.childNodes[offset];
			offset = 0;
		}

		// "If value is a space (U+0020), and either node is an Element whose
		// resolved value for "white-space" is neither "pre" nor "pre-wrap" or
		// node is not an Element but its parent is an Element whose resolved
		// value for "white-space" is neither "pre" nor "pre-wrap", set value
		// to a non-breaking space (U+00A0)."
		var refElement = node.nodeType == Node.ELEMENT_NODE ? node : node.parentNode;
		if (value == " "
		&& refElement.nodeType == Node.ELEMENT_NODE
		&& ["pre", "pre-wrap"].indexOf(getComputedStyle(refElement).whiteSpace) == -1) {
			value = "\xa0";
		}

		// "Record current overrides, and let overrides be the result."
		var overrides = recordCurrentOverrides( range );

		// "If node is a Text node:"
		if (node.nodeType == Node.TEXT_NODE) {
			// "Call insertData(offset, value) on node."
			node.insertData(offset, value);

			// "Call collapse(node, offset) on the context object's Selection."
			Aloha.getSelection().collapse(node, offset);
			range.setStart(node, offset);

			// "Call extend(node, offset + 1) on the context object's
			// Selection."
			Aloha.getSelection().extend(node, offset + 1);
			range.setEnd(node, offset + 1);

		// "Otherwise:"
		} else {
			// "If node has only one child, which is a collapsed line break,
			// remove its child from it."
			//
			// FIXME: IE incorrectly returns false here instead of true
			// sometimes?
			if (node.childNodes.length == 1
			&& isCollapsedLineBreak(node.firstChild)) {
				node.removeChild(node.firstChild);
			}

			// "Let text be the result of calling createTextNode(value) on the
			// context object."
			var text = document.createTextNode(value);

			// "Call insertNode(text) on the active range."
			range.insertNode(text);

			// "Call collapse(text, 0) on the context object's Selection."
			Aloha.getSelection().collapse(text, 0);
			range.setStart(text, 0);

			// "Call extend(text, 1) on the context object's Selection."
			Aloha.getSelection().extend(text, 1);
			range.setEnd(text, 1);
		}

		// "Restore states and values from overrides."
		restoreStatesAndValues(overrides);

		// "Canonicalize whitespace at the active range's start."
		canonicalizeWhitespace(range.startContainer, range.startOffset);

		// "Canonicalize whitespace at the active range's end."
		canonicalizeWhitespace(range.endContainer, range.endOffset);

		// "Call collapseToEnd() on the context object's Selection."
		Aloha.getSelection().collapseToEnd();
		range.collapse(false);
	}