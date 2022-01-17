function (editor, id, target, className) {
			// Could be a button or its hotkey
		var buttonId = this.translateHotKey(id);
		buttonId = buttonId ? buttonId : id;
		var range = editor.getSelection().createRange();
		var statusBarSelection = this.editor.statusBar ? this.editor.statusBar.getSelection() : null;
		var parentElement = statusBarSelection ? statusBarSelection : this.editor.getSelection().getParentElement();
		if (target) {
			parentElement = target;
		}
		while (parentElement && (!HTMLArea.DOM.isBlockElement(parentElement) || /^li$/i.test(parentElement.nodeName))) {
			parentElement = parentElement.parentNode;
		}
		var blockAncestors = HTMLArea.DOM.getBlockAncestors(parentElement);
		var tableCell = null;
		if (id === "TAB" || id === "SHIFT-TAB") {
			for (var i = blockAncestors.length; --i >= 0;) {
				if (/^(td|th)$/i.test(blockAncestors[i].nodeName)) {
					tableCell = blockAncestors[i];
					break;
				}
			}
		}
		var fullNodeTextSelected = (!Ext.isIE && parentElement.textContent === range.toString()) || (Ext.isIE && parentElement.innerText === range.text);
		switch (buttonId) {
			case "Indent" :
				if (/^(ol|ul)$/i.test(parentElement.nodeName) && !(fullNodeTextSelected && !/^(li)$/i.test(parentElement.parentNode.nodeName))) {
					if (Ext.isOpera) {
						try {
							this.editor.getSelection().execCommand(buttonId, false, null);
						} catch(e) {
							this.appendToLog('onButtonPress', e + '\n\nby execCommand(' + buttonId + ');', 'error');
						}
						this.indentedList = parentElement;
						this.makeNestedList(parentElement);
						this.editor.getSelection().selectNodeContents(this.indentedList.lastChild, false);
					} else {
						this.indentSelectedListElements(parentElement, range);
					}
				} else if (tableCell) {
	
					var tablePart = tableCell.parentNode.parentNode;
						// Get next cell in same table part
					var nextCell = tableCell.nextSibling ? tableCell.nextSibling : (tableCell.parentNode.nextSibling ? tableCell.parentNode.nextSibling.cells[0] : null);
						// Next cell is in other table part
					if (!nextCell) {
						switch (tablePart.nodeName.toLowerCase()) {
						    case "thead":
							nextCell = tablePart.parentNode.tBodies[0].rows[0].cells[0];
							break;
						    case "tbody":
							nextCell = tablePart.nextSibling ? tablePart.nextSibling.rows[0].cells[0] : null;
							break;
						    case "tfoot":
							this.editor.getSelection().selectNodeContents(tablePart.parentNode.lastChild.lastChild.lastChild, true);
						}
					}
					if (!nextCell) {
						if (this.getPluginInstance('TableOperations')) {
							this.getPluginInstance('TableOperations').onButtonPress(this.editor, 'TO-row-insert-under');
						} else {
							nextCell = tablePart.parentNode.rows[0].cells[0];
						}
					}
					if (nextCell) {
						if (Ext.isOpera && !nextCell.hasChildNodes()) {
							nextCell.appendChild(this.editor.document.createElement('br'));
						}
						this.editor.getSelection().selectNodeContents(nextCell, true);
					}
				} else  if (this.useBlockquote) {
					try {
						this.editor.getSelection().execCommand(buttonId, false, null);
					} catch(e) {
						this.appendToLog('onButtonPress', e + '\n\nby execCommand(' + buttonId + ');', 'error');
					}
				} else if (this.isAllowedBlockElement("div")) {
					if (/^div$/i.test(parentElement.nodeName) && !HTMLArea.DOM.hasClass(parentElement, this.useClass[buttonId])) {
						HTMLArea.DOM.addClass(parentElement, this.useClass[buttonId]);
					} else if (!/^div$/i.test(parentElement.nodeName) && /^div$/i.test(parentElement.parentNode.nodeName) && !HTMLArea.DOM.hasClass(parentElement.parentNode, this.useClass[buttonId])) {
						HTMLArea.DOM.addClass(parentElement.parentNode, this.useClass[buttonId]);
					} else {
						var bookmark = this.editor.getBookMark().get(range);
						var newBlock = this.wrapSelectionInBlockElement('div', this.useClass[buttonId], null, true);
						this.editor.getSelection().selectRange(this.editor.getBookMark().moveTo(bookmark));
					}
				} else {
					this.addClassOnBlockElements(buttonId);
				}
				break;
			case "Outdent" :
				if (/^(ol|ul)$/i.test(parentElement.nodeName) && !HTMLArea.DOM.hasClass(parentElement, this.useClass.Indent)) {
					if (/^(li)$/i.test(parentElement.parentNode.nodeName)) {
						if (Ext.isOpera) {
							try {
								this.editor.getSelection().execCommand(buttonId, false, null);
							} catch(e) {
								this.appendToLog('onButtonPress', e + '\n\nby execCommand(' + buttonId + ');', 'error');
							}
						} else {
							this.outdentSelectedListElements(parentElement, range);
						}
					}
				} else if (tableCell) {
					var previousCell = tableCell.previousSibling ? tableCell.previousSibling : (tableCell.parentNode.previousSibling ? tableCell.parentNode.previousSibling.lastChild : null);
					if (!previousCell) {
						var table = tableCell.parentNode.parentNode.parentNode;
						var tablePart = tableCell.parentNode.parentNode.nodeName.toLowerCase();
						switch (tablePart) {
							case "tbody":
								if (table.tHead) {
									previousCell = table.tHead.rows[table.tHead.rows.length-1].cells[table.tHead.rows[table.tHead.rows.length-1].cells.length-1];
									break;
								}
							case "thead":
								if (table.tFoot) {
									previousCell = table.tFoot.rows[table.tFoot.rows.length-1].cells[table.tFoot.rows[table.tFoot.rows.length-1].cells.length-1];
									break;
								}
							case "tfoot":
								previousCell = table.tBodies[table.tBodies.length-1].rows[table.tBodies[table.tBodies.length-1].rows.length-1].cells[table.tBodies[table.tBodies.length-1].rows[table.tBodies[table.tBodies.length-1].rows.length-1].cells.length-1];
						}
					}
					if (previousCell) {
						if (Ext.isOpera && !previousCell.hasChildNodes()) {
							previousCell.appendChild(this.editor.document.createElement('br'));
						}
						this.editor.getSelection().selectNodeContents(previousCell, true);
					}
				} else  if (this.useBlockquote) {
					try {
						this.editor.getSelection().execCommand(buttonId, false, null);
					} catch(e) {
						this.appendToLog('onButtonPress', e + '\n\nby execCommand(' + buttonId + ');', 'error');
					}
				} else if (this.isAllowedBlockElement("div")) {
					for (var i = blockAncestors.length; --i >= 0;) {
						if (HTMLArea.DOM.hasClass(blockAncestors[i], this.useClass.Indent)) {
							var bookmark = this.editor.getBookMark().get(range);
							var newBlock = this.wrapSelectionInBlockElement('div', false, blockAncestors[i]);
								// If not directly under the div, we need to backtrack
							if (newBlock.parentNode !== blockAncestors[i]) {
								var parent = newBlock.parentNode;
								this.editor.getDomNode().removeMarkup(newBlock);
								while (parent.parentNode !== blockAncestors[i]) {
									parent = parent.parentNode;
								}
								blockAncestors[i].insertBefore(newBlock, parent);
								newBlock.appendChild(parent);
							}
							newBlock.className = blockAncestors[i].className;
							HTMLArea.DOM.removeClass(newBlock, this.useClass.Indent);
							if (!newBlock.previousSibling) {
								while (newBlock.hasChildNodes()) {
									if (newBlock.firstChild.nodeType === HTMLArea.DOM.ELEMENT_NODE) {
										newBlock.firstChild.className = newBlock.className;
									}
									blockAncestors[i].parentNode.insertBefore(newBlock.firstChild, blockAncestors[i]);
								}
							} else if (!newBlock.nextSibling) {
								if (blockAncestors[i].nextSibling) {
									while (newBlock.hasChildNodes()) {
										if (newBlock.firstChild.nodeType === HTMLArea.DOM.ELEMENT_NODE) {
											newBlock.lastChild.className = newBlock.className;
										}
										blockAncestors[i].parentNode.insertBefore(newBlock.lastChild, blockAncestors[i].nextSibling);
									}
								} else {
									while (newBlock.hasChildNodes()) {
										if (newBlock.firstChild.nodeType === HTMLArea.DOM.ELEMENT_NODE) {
											newBlock.firstChild.className = newBlock.className;
										}
										blockAncestors[i].parentNode.appendChild(newBlock.firstChild);
									}
								}
							} else {
								var clone = blockAncestors[i].cloneNode(false);
								if (blockAncestors[i].nextSibling) {
									blockAncestors[i].parentNode.insertBefore(clone, blockAncestors[i].nextSibling);
								} else {
									blockAncestors[i].parentNode.appendChild(clone);
								}
								while (newBlock.nextSibling) {
									clone.appendChild(newBlock.nextSibling);
								}
								while (newBlock.hasChildNodes()) {
									if (newBlock.firstChild.nodeType === HTMLArea.DOM.ELEMENT_NODE) {
										newBlock.firstChild.className = newBlock.className;
									}
									blockAncestors[i].parentNode.insertBefore(newBlock.firstChild, clone);
								}
							}
							blockAncestors[i].removeChild(newBlock);
							if (!blockAncestors[i].hasChildNodes()) {
								blockAncestors[i].parentNode.removeChild(blockAncestors[i]);
							}
							this.editor.getSelection().selectRange(this.editor.getBookMark().moveTo(bookmark));
							break;
						}
					}
				} else {
					this.addClassOnBlockElements(buttonId);
				}
				break;
			case "InsertParagraphBefore" :
			case "InsertParagraphAfter"  :
				this.insertParagraph(buttonId === "InsertParagraphAfter");
				break;
			case "Blockquote" :
				var commandState = false;
				for (var i = blockAncestors.length; --i >= 0;) {
					if (/^blockquote$/i.test(blockAncestors[i].nodeName)) {
						commandState = true;
						this.editor.getDomNode().removeMarkup(blockAncestors[i]);
						break;
					}
				}
				if (!commandState) {
					var bookmark = this.editor.getBookMark().get(range);
					var newBlock = this.wrapSelectionInBlockElement('blockquote', className, null, true);
					this.editor.getSelection().selectRange(this.editor.getBookMark().moveTo(bookmark));
				}
				break;
			case 'address':
			case 'article':
			case 'aside':
			case 'div':
			case 'footer':
			case 'header':
			case 'nav':
			case 'section':
				var bookmark = this.editor.getBookMark().get(range);
				var newBlock = this.wrapSelectionInBlockElement(buttonId, className, null, true);
				this.editor.getSelection().selectRange(this.editor.getBookMark().moveTo(bookmark));
				break;
			case "JustifyLeft"   :
			case "JustifyCenter" :
			case "JustifyRight"  :
			case "JustifyFull"   :
				if (this.useAlignAttribute) {
					try {
						this.editor.getSelection().execCommand(buttonId, false, null);
					} catch(e) {
						this.appendToLog('onButtonPress', e + '\n\nby execCommand(' + buttonId + ');', 'error');
					}
				} else {
					this.addClassOnBlockElements(buttonId);
				}
				break;
			case "InsertOrderedList":
			case "InsertUnorderedList":
				this.insertList(buttonId, parentElement);
				break;
			case "InsertHorizontalRule":
				this.insertHorizontalRule();
				break;
			case "none" :
				if (this.isAllowedBlockElement(parentElement.nodeName)) {
					this.editor.getDomNode().removeMarkup(parentElement);
				}
				break;
			default	:
				break;
		}
		return false;
	}