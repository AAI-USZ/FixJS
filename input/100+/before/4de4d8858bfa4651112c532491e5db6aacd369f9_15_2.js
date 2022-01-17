function (editor, id, target) {
			// Could be a button or its hotkey
		var buttonId = this.translateHotKey(id);
		buttonId = buttonId ? buttonId : id;

		var mozbr = !Ext.isIE ? "<br />" : "";
		var tableParts = ["tfoot", "thead", "tbody"];
		var tablePartsIndex = { tfoot : 0, thead : 1, tbody : 2 };

		// helper function that clears the content in a table row
		function clearRow(tr) {
			var tds = tr.getElementsByTagName("td");
			for (var i = tds.length; --i >= 0;) {
				var td = tds[i];
				td.rowSpan = 1;
				td.innerHTML = mozbr;
			}
			var tds = tr.getElementsByTagName("th");
			for (var i = tds.length; --i >= 0;) {
				var td = tds[i];
				td.rowSpan = 1;
				td.innerHTML = mozbr;
			}
		};

		function splitRow(td) {
			var n = parseInt("" + td.rowSpan);
			var colSpan = td.colSpan;
			var nodeName = td.nodeName.toLowerCase();
			td.rowSpan = 1;
			var tr = td.parentNode;
			var sectionRowIndex = tr.sectionRowIndex;
			var rows = tr.parentNode.rows;
			var index = td.cellIndex;
			while (--n > 0) {
				tr = rows[++sectionRowIndex];
					// Last row
				if (!tr) tr = td.parentNode.parentNode.appendChild(editor.document.createElement("tr"));
				var otd = editor.document.createElement(nodeName);
				otd.colSpan = colSpan;
				otd.innerHTML = mozbr;
				tr.insertBefore(otd, tr.cells[index]);
			}
		};

		function splitCol(td) {
			var nc = parseInt("" + td.colSpan);
			var nodeName = td.nodeName.toLowerCase();
			td.colSpan = 1;
			var tr = td.parentNode;
			var ref = td.nextSibling;
			while (--nc > 0) {
				var otd = editor.document.createElement(nodeName);
				otd.rowSpan = td.rowSpan;
				otd.innerHTML = mozbr;
				tr.insertBefore(otd, ref);
			}
		};

		function splitCell(td) {
			var nc = parseInt("" + td.colSpan);
			splitCol(td);
			var cells = td.parentNode.cells;
			var index = td.cellIndex;
			while (nc-- > 0) {
				splitRow(cells[index++]);
			}
		};

		function selectNextNode(el) {
			var node = el.nextSibling;
			while (node && node.nodeType != 1) {
				node = node.nextSibling;
			}
			if (!node) {
				node = el.previousSibling;
				while (node && node.nodeType != 1) {
					node = node.previousSibling;
				}
			}
			if (!node) node = el.parentNode;
			editor.getSelection().selectNodeContents(node);
		};

		function getSelectedCells(sel) {
			var cell, range, i = 0, cells = [];
			try {
				while (range = sel.getRangeAt(i++)) {
					cell = range.startContainer.childNodes[range.startOffset];
					while (!/^(td|th|body)$/.test(cell.nodeName.toLowerCase())) cell = cell.parentNode;
					if (/^(td|th)$/.test(cell.nodeName.toLowerCase())) cells.push(cell);
				}
			} catch(e) {
			/* finished walking through selection */
			}
			return cells;
		};

		function deleteEmptyTable(table) {
			var lastPart = true;
			for (var j = tableParts.length; --j >= 0;) {
				var tablePart = table.getElementsByTagName(tableParts[j])[0];
				if (tablePart) lastPart = false;
			}
			if (lastPart) {
				selectNextNode(table);
				table.parentNode.removeChild(table);
			}
		};

		function computeCellIndexes(table) {
			var matrix = [];
			var lookup = {};
			for (var m = tableParts.length; --m >= 0;) {
				var tablePart = table.getElementsByTagName(tableParts[m])[0];
				if (tablePart) {
					var rows = tablePart.rows;
					for (var i = 0, n = rows.length; i < n; i++) {
						var cells = rows[i].cells;
						for (var j=0; j< cells.length; j++) {
							var cell = cells[j];
							var rowIndex = cell.parentNode.rowIndex;
							var cellId = tableParts[m]+"-"+rowIndex+"-"+cell.cellIndex;
							var rowSpan = cell.rowSpan || 1;
							var colSpan = cell.colSpan || 1;
							var firstAvailCol;
							if(typeof(matrix[rowIndex])=="undefined") { matrix[rowIndex] = []; }
							// Find first available column in the first row
							for (var k=0; k<matrix[rowIndex].length+1; k++) {
								if (typeof(matrix[rowIndex][k])=="undefined") {
									firstAvailCol = k;
									break;
								}
							}
							lookup[cellId] = firstAvailCol;
							for (var k=rowIndex; k<rowIndex+rowSpan; k++) {
								if (typeof(matrix[k])=="undefined") { matrix[k] = []; }
								var matrixrow = matrix[k];
								for (var l=firstAvailCol; l<firstAvailCol+colSpan; l++) {
									matrixrow[l] = "x";
								}
							}
						}
					}
				}
			}
			return lookup;
		};

		function getActualCellIndex(cell, lookup) {
			return lookup[cell.parentNode.parentNode.nodeName.toLowerCase()+"-"+cell.parentNode.rowIndex+"-"+cell.cellIndex];
		};

		switch (buttonId) {
			// ROWS
		    case "TO-row-insert-above":
		    case "TO-row-insert-under":
			var tr = this.editor.getSelection().getFirstAncestorOfType("tr");
			if (!tr) break;
			var otr = tr.cloneNode(true);
			clearRow(otr);
			otr = tr.parentNode.insertBefore(otr, (/under/.test(buttonId) ? tr.nextSibling : tr));
			this.editor.getSelection().selectNodeContents(otr.firstChild, true);
			this.reStyleTable(tr.parentNode.parentNode);
			break;
		    case "TO-row-delete":
			var tr = this.editor.getSelection().getFirstAncestorOfType("tr");
			if (!tr) break;
			var part = tr.parentNode;
			var table = part.parentNode;
			if(part.rows.length == 1) {  // this the last row, delete the whole table part
				selectNextNode(part);
				table.removeChild(part);
				deleteEmptyTable(table);
			} else {
					// set the caret first to a position that doesn't disappear.
				selectNextNode(tr);
				part.removeChild(tr);
			}
			this.reStyleTable(table);
			break;
		    case "TO-row-split":
			var cell = this.editor.getSelection().getFirstAncestorOfType(['td', 'th']);
			if (!cell) break;
			var sel = editor.getSelection().get().selection;
			if (Ext.isGecko && !sel.isCollapsed) {
				var cells = getSelectedCells(sel);
				for (i = 0; i < cells.length; ++i) {
					splitRow(cells[i]);
				}
			} else {
				splitRow(cell);
			}
			break;

			// COLUMNS
		    case "TO-col-insert-before":
		    case "TO-col-insert-after":
			var cell = this.editor.getSelection().getFirstAncestorOfType(['td', 'th']);
			if (!cell) break;
			var index = cell.cellIndex;
			var table = cell.parentNode.parentNode.parentNode;
			for (var j = tableParts.length; --j >= 0;) {
				var tablePart = table.getElementsByTagName(tableParts[j])[0];
				if (tablePart) {
					var rows = tablePart.rows;
					for (var i = rows.length; --i >= 0;) {
						var tr = rows[i];
						var ref = tr.cells[index + (/after/.test(buttonId) ? 1 : 0)];
						if (!ref) {
							var otd = editor.document.createElement(tr.lastChild.nodeName.toLowerCase());
							otd.innerHTML = mozbr;
							tr.appendChild(otd);
						} else {
							var otd = editor.document.createElement(ref.nodeName.toLowerCase());
							otd.innerHTML = mozbr;
							tr.insertBefore(otd, ref);
						}
					}
				}
			}
			this.reStyleTable(table);
			break;
		    case "TO-col-split":
		    	var cell = this.editor.getSelection().getFirstAncestorOfType(['td', 'th']);
			if (!cell) break;
			var sel = this.editor.getSelection().get().selection;
			if (Ext.isGecko && !sel.isCollapsed) {
				var cells = getSelectedCells(sel);
				for (i = 0; i < cells.length; ++i) {
					splitCol(cells[i]);
				}
			} else {
				splitCol(cell);
			}
			this.reStyleTable(table);
			break;
		    case "TO-col-delete":
			var cell = this.editor.getSelection().getFirstAncestorOfType(['td', 'th']);
			if (!cell) break;
			var index = cell.cellIndex;
			var part = cell.parentNode.parentNode;
			var table = part.parentNode;
			var lastPart = true;
			for (var j = tableParts.length; --j >= 0;) {
				var tablePart = table.getElementsByTagName(tableParts[j])[0];
				if (tablePart) {
					var rows = tablePart.rows;
					var lastColumn = true;
					for (var i = rows.length; --i >= 0;) {
						if(rows[i].cells.length > 1) lastColumn = false;
					}
					if (lastColumn) {
							// this is the last column, delete the whole tablepart
							// set the caret first to a position that doesn't disappear
						selectNextNode(tablePart);
						table.removeChild(tablePart);
					} else {
							// set the caret first to a position that doesn't disappear
						if (part == tablePart) selectNextNode(cell);
						for (var i = rows.length; --i >= 0;) {
							if(rows[i].cells[index]) rows[i].removeChild(rows[i].cells[index]);
						}
						lastPart = false;
					}
				}
			}
			if (lastPart) {
					// the last table section was deleted: delete the whole table
					// set the caret first to a position that doesn't disappear
				selectNextNode(table);
				table.parentNode.removeChild(table);
			}
			this.reStyleTable(table);
			break;

			// CELLS
		    case "TO-cell-split":
			var cell = this.editor.getSelection().getFirstAncestorOfType(['td', 'th']);
			if (!cell) break;
			var sel = this.editor.getSelection().get().selection;
			if (Ext.isGecko && !sel.isCollapsed) {
				var cells = getSelectedCells(sel);
				for (i = 0; i < cells.length; ++i) {
					splitCell(cells[i]);
				}
			} else {
				splitCell(cell);
			}
			this.reStyleTable(table);
			break;
		    case "TO-cell-insert-before":
		    case "TO-cell-insert-after":
			var cell = this.editor.getSelection().getFirstAncestorOfType(['td', 'th']);
			if (!cell) break;
			var tr = cell.parentNode;
			var otd = editor.document.createElement(cell.nodeName.toLowerCase());
			otd.innerHTML = mozbr;
			tr.insertBefore(otd, (/after/.test(buttonId) ? cell.nextSibling : cell));
			this.reStyleTable(tr.parentNode.parentNode);
			break;
		    case "TO-cell-delete":
			var cell = this.editor.getSelection().getFirstAncestorOfType(['td', 'th']);
			if (!cell) break;
			var row = cell.parentNode;
			if(row.cells.length == 1) {  // this is the only cell in the row, delete the row
				var part = row.parentNode;
				var table = part.parentNode;
				if (part.rows.length == 1) {  // this the last row, delete the whole table part
					selectNextNode(part);
					table.removeChild(part);
					deleteEmptyTable(table);
				} else {
					selectNextNode(row);
					part.removeChild(row);
				}
			} else {
					// set the caret first to a position that doesn't disappear
				selectNextNode(cell);
				row.removeChild(cell);
			}
			this.reStyleTable(table);
			break;
		    case "TO-cell-merge":
			var sel = this.editor.getSelection().get().selection;
			var range, i = 0;
			var rows = new Array();
			for (var k = tableParts.length; --k >= 0;) rows[k] = [];
			var row = null;
			var cells = null;
			if (Ext.isGecko) {
				try {
					while (range = sel.getRangeAt(i++)) {
						var td = range.startContainer.childNodes[range.startOffset];
						if (td.parentNode != row) {
							(cells) && rows[tablePartsIndex[row.parentNode.nodeName.toLowerCase()]].push(cells);
							row = td.parentNode;
							cells = [];
						}
						cells.push(td);
					}
				} catch(e) {
					/* finished walking through selection */
				}
				try { rows[tablePartsIndex[row.parentNode.nodeName.toLowerCase()]].push(cells); } catch(e) { }
			} else {
				// Internet Explorer, WebKit and Opera
				var cell = this.editor.getSelection().getFirstAncestorOfType(['td', 'th']);
				if (!cell) {
					TYPO3.Dialog.InformationDialog({
						title: this.getButton('TO-cell-merge').tooltip.title,
						msg: this.localize('Please click into some cell')
					});
					break;
				}
				var tr = cell.parentNode;
				var no_cols = parseInt(prompt(this.localize("How many columns would you like to merge?"), 2));
				if (!no_cols) break;
				var no_rows = parseInt(prompt(this.localize("How many rows would you like to merge?"), 2));
				if (!no_rows) break;
				var lookup = computeCellIndexes(cell.parentNode.parentNode.parentNode);
				var first_index = getActualCellIndex(cell, lookup);
					// Collect cells on first row
				var td = cell, colspan = 0;
				cells = [];
				for (var i = no_cols; --i >= 0;) {
					if (!td) break;
					cells.push(td);
					var last_index = getActualCellIndex(td, lookup);
					td = td.nextSibling;
				}
				rows[tablePartsIndex[tr.parentNode.nodeName.toLowerCase()]].push(cells);
					// Collect cells on following rows
				var index, first_index_found, last_index_found;
				for (var j = 1; j < no_rows; ++j) {
					tr = tr.nextSibling;
					if (!tr) break;
					cells = [];
					first_index_found = false;
					for (var i = 0; i < tr.cells.length; ++i) {
						td = tr.cells[i];
						if (!td) break;
						index = getActualCellIndex(td, lookup);
						if (index > last_index) break;
						if (index == first_index) first_index_found = true;
						if (index >= first_index) cells.push(td);
					}
						// If not rectangle, we quit!
					if (!first_index_found) break;
					rows[tablePartsIndex[tr.parentNode.nodeName.toLowerCase()]].push(cells);
				}
			}
			for (var k = tableParts.length; --k >= 0;) {
				var cell, row;
				var cellHTML = "";
				var cellRowSpan = 0;
				var cellColSpan, maxCellColSpan = 0;
				if (rows[k] && rows[k][0]) {
					for (var i = 0; i < rows[k].length; ++i) {
						var cells = rows[k][i];
						var cellColSpan = 0;
						if (!cells) continue;
						cellRowSpan += cells[0].rowSpan ? cells[0].rowSpan : 1;
						for (var j = 0; j < cells.length; ++j) {
							cell = cells[j];
							row = cell.parentNode;
							cellHTML += cell.innerHTML;
							cellColSpan += cell.colSpan ? cell.colSpan : 1;
							if (i || j) {
								cell.parentNode.removeChild(cell);
								if(!row.cells.length) row.parentNode.removeChild(row);
							}
						}
						if (maxCellColSpan < cellColSpan) {
							maxCellColSpan = cellColSpan;
						}
					}
					var td = rows[k][0][0];
					td.innerHTML = cellHTML;
					td.rowSpan = cellRowSpan;
					td.colSpan = maxCellColSpan;
					editor.getSelection().selectNodeContents(td);
				}
			}
			this.reStyleTable(table);
			break;

			// CREATION AND PROPERTIES
		    case "InsertTable":
		    case "TO-table-prop":
		    	this.openPropertiesDialogue('table', buttonId);
			break;
		    case "TO-table-restyle":
			this.reStyleTable(this.editor.getSelection().getFirstAncestorOfType('table'));
			break;
		    case "TO-row-prop":
		    	this.openPropertiesDialogue('row', buttonId);
			break;
		    case "TO-col-prop":
		    	this.openPropertiesDialogue('column', buttonId);
			break;
		    case "TO-cell-prop":
		    	this.openPropertiesDialogue('cell', buttonId);
			break;
		    case "TO-toggle-borders":
			this.toggleBorders();
			break;
		    default:
			break;
		}
	}