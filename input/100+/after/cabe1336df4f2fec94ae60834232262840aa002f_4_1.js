function() {
			var index;

			// Try to read the nodeType property and return if we do not have permission
			// ie.: frame document to an external URL
			var nodeType;
			try {
				nodeType = this.nodeType;
				index = that.getIndexInParent(this);
			}
			catch (e) {
				return;
			}

			// decide further actions by node type
			switch(nodeType) {
			// found a non-text node
			case 1:
				if (prevNode && prevNode.nodeName == this.nodeName) {
					// found a successive node of same type

					// now we check whether the selection starts or ends in the mother node after the current node
					if (rangeObject.startContainer === startObject && startOffset > index) {
						// there will be one less object, so reduce the startOffset by one
						rangeObject.startOffset -= 1;
						// set the flag for range modification
						modifiedRange = true;
					}
					if (rangeObject.endContainer === startObject && endOffset > index) {
						// there will be one less object, so reduce the endOffset by one
						rangeObject.endOffset -= 1;
						// set the flag for range modification
						modifiedRange = true;
					}

					// merge the contents of this node into the previous one
					jQuery(prevNode).append(jQuery(this).contents());

					// after merging, we eventually need to cleanup the prevNode again
					modifiedRange |= that.doCleanup(cleanup, rangeObject, prevNode);

					// remove this node
					jQuery(this).remove();
					
				} else {
					
					// do the recursion step here
					modifiedRange |= that.doCleanup(cleanup, rangeObject, this);

					// eventually remove empty elements
					var removed = false;
					if (cleanup.removeempty) {
						if (GENTICS.Utils.Dom.isBlockLevelElement(this) && this.childNodes.length === 0) {
//							jQuery(this).remove();
							removed = true;
						}
						if (jQuery.inArray(this.nodeName.toLowerCase(), that.mergeableTags) >= 0
								&& jQuery(this).text().length === 0 && this.childNodes.length === 0) {
//							jQuery(this).remove();
							removed = true;
						}
					}

					// when the current node was not removed, we eventually store it as previous (mergeable) tag
					if (!removed) {
						if (jQuery.inArray(this.nodeName.toLowerCase(), that.mergeableTags) >= 0) {
							prevNode = this;
						} else {
							prevNode = false;
						}
					} else {
						// now we check whether the selection starts or ends in the mother node of this
						if (rangeObject.startContainer === this.parentNode && startOffset > index) {
							// there will be one less object, so reduce the startOffset by one
							rangeObject.startOffset = rangeObject.startOffset - 1;
							// set the flag for range modification
							modifiedRange = true;
						}
						if (rangeObject.endContainer === this.parentNode && endOffset > index) {
							// there will be one less object, so reduce the endOffset by one
							rangeObject.endOffset = rangeObject.endOffset - 1;
							// set the flag for range modification
							modifiedRange = true;
						}
										
						// remove this text node
						jQuery(this).remove();

					}
				}

				break;
			// found a text node
			case 3:
				// found a text node
				if (prevNode && prevNode.nodeType === 3 && cleanup.merge) {
					// the current text node will be merged into the last one, so
					// check whether the selection starts or ends in the current
					// text node
					if (rangeObject.startContainer === this) {
						// selection starts in the current text node

						// update the start container to the last node
						rangeObject.startContainer = prevNode;

						// update the start offset
						rangeObject.startOffset += prevNode.nodeValue.length;

						// set the flag for range modification
						modifiedRange = true;
						
					} else if (rangeObject.startContainer === prevNode.parentNode
							&& rangeObject.startOffset === that.getIndexInParent(prevNode) + 1) {
						// selection starts right between the previous and current text nodes (which will be merged)

						// update the start container to the previous node
						rangeObject.startContainer = prevNode;

						// set the start offset
						rangeObject.startOffset = prevNode.nodeValue.length;

						// set the flag for range modification
						modifiedRange = true;
					}

					if (rangeObject.endContainer === this) {
						// selection ends in the current text node

						// update the end container to be the last node
						rangeObject.endContainer = prevNode;

						// update the end offset
						rangeObject.endOffset += prevNode.nodeValue.length;

						// set the flag for range modification
						modifiedRange = true;

					} else if (rangeObject.endContainer === prevNode.parentNode
							&& rangeObject.endOffset === that.getIndexInParent(prevNode) + 1) {
						// selection ends right between the previous and current text nodes (which will be merged)

						// update the end container to the previous node
						rangeObject.endContainer = prevNode;

						// set the end offset
						rangeObject.endOffset = prevNode.nodeValue.length;

						// set the flag for range modification
						modifiedRange = true;
					}

					// now append the contents of the current text node into the previous
					prevNode.data += this.data;

				// remove empty text nodes	
				} else if ( this.nodeValue === '' && cleanup.removeempty ) {
					// do nothing here.
					
				// remember it as the last text node if not empty
				} else if ( !(this.nodeValue === '' && cleanup.removeempty) ) {
					prevNode = this;
					// we are finish here don't delete this node
					break;
				}

				// now we check whether the selection starts or ends in the mother node of this
				if (rangeObject.startContainer === this.parentNode && rangeObject.startOffset > index) {
					// there will be one less object, so reduce the startOffset by one
					rangeObject.startOffset = rangeObject.startOffset - 1;
					// set the flag for range modification
					modifiedRange = true;
				}
				if (rangeObject.endContainer === this.parentNode && rangeObject.endOffset > index) {
					// there will be one less object, so reduce the endOffset by one
					rangeObject.endOffset = rangeObject.endOffset - 1;
					// set the flag for range modification
					modifiedRange = true;
				}

				// remove this text node
				jQuery(this).remove();

				break;
			}
		}