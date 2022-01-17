function (after) {
		var endBlocks = this.editor.getSelection().getEndBlocks();
		var ancestors = after ? HTMLArea.DOM.getBlockAncestors(endBlocks.end) : HTMLArea.DOM.getBlockAncestors(endBlocks.start);
		var endElement = ancestors[ancestors.length-1];
		for (var i = ancestors.length; --i >= 0;) {
			if (/^(table|div|ul|ol|dl|blockquote|address|pre)$/i.test(ancestors[i].nodeName) && !/^(li)$/i.test(ancestors[i].parentNode.nodeName)) {
				endElement = ancestors[i];
				break;
			}
		}
		if (endElement) {
			var parent = endElement.parentNode;
			var paragraph = this.editor.document.createElement("p");
			if (Ext.isIE) {
				paragraph.innerHTML = "&nbsp";
			} else {
				paragraph.appendChild(this.editor.document.createElement("br"));
			}
			if (after && !endElement.nextSibling) {
				parent.appendChild(paragraph);
			} else {
				parent.insertBefore(paragraph, after ? endElement.nextSibling : endElement);
			}
			this.editor.getSelection().selectNodeContents(paragraph, true);
		}
	}