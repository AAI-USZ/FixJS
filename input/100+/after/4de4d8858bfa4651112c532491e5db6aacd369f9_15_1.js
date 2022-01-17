function () {
		this.restoreSelection()
		var params = {};
		var fieldTypes = ['combo', 'textfield', 'numberfield', 'checkbox', 'colorpalettefield'];
		this.dialog.findBy(function (item) {
			if (fieldTypes.indexOf(item.getXType()) !== -1) {
				params[item.getItemId()] = item.getValue();
				return true;
			}
			return false;
		});
		var errorFlag = false;
		if (this.properties.required) {
			if (this.properties.required.indexOf('captionOrSummary') != -1) {
				if (!/\S/.test(params.f_caption) && !/\S/.test(params.f_summary)) {
					TYPO3.Dialog.ErrorDialog({
						title: this.getButton(this.dialog.arguments.buttonId).tooltip.title,
						msg: this.localize('captionOrSummary' + '-required')
					});
					var field = this.dialog.find('itemId', 'f_caption')[0];
					var tab = field.findParentByType('container');
					tab.ownerCt.activate(tab);
					field.focus();
					return false;
				}
			} else {
				var required = {
					f_caption: 'caption',
					f_summary: 'summary'
				};
				Ext.iterate(required, function (item) {
					if (!params[item] && this.properties.required.indexOf(required[item]) != -1) {
						TYPO3.Dialog.ErrorDialog({
							title: this.getButton(this.dialog.arguments.buttonId).tooltip.title,
							msg: this.localize(required[item] + '-required')
						});
						var field = this.dialog.find('itemId', item)[0];
						var tab = field.findParentByType('container');
						tab.ownerCt.activate(tab);
						field.focus();
						errorFlag = true;
						return false;
					}
				}, this);
				if (errorFlag) {
					return false;
				}
			}
		}
		var doc = this.editor.document;
		if (this.dialog.arguments.buttonId === 'InsertTable') {
			var required = {
				f_rows: 'You must enter a number of rows',
				f_cols: 'You must enter a number of columns'
			};
			Ext.iterate(required, function (item) {
				if (!params[item]) {
					TYPO3.Dialog.ErrorDialog({
						title: this.getButton(this.dialog.arguments.buttonId).tooltip.title,
						msg: this.localize(required[item])
					});
					var field = this.dialog.find('itemId', item)[0];
					var tab = field.findParentByType('container');
					tab.ownerCt.activate(tab);
					field.focus();
					errorFlag = true;
					return false;
				}
			}, this);
			if (errorFlag) {
				return false;
			}
			var table = doc.createElement('table');
			var tbody = doc.createElement('tbody');
			table.appendChild(tbody);
			for (var i = params.f_rows; --i >= 0;) {
				var tr = doc.createElement('tr');
				tbody.appendChild(tr);
				for (var j = params.f_cols; --j >= 0;) {
					var td = doc.createElement('td');
					if (!HTMLArea.isIEBeforeIE9) {
						td.innerHTML = '<br />';
					}
					tr.appendChild(td);
				}
			}
		} else {
			var table = this.dialog.arguments.element;
		}
		this.setHeaders(table, params);
		this.processStyle(table, params);
		table.removeAttribute('border');
		Ext.iterate(params, function (item) {
			var val = params[item];
			switch (item) {
			    case "f_caption":
				if (/\S/.test(val)) {
					// contains non white-space characters
					var caption = table.getElementsByTagName("caption");
					if (caption) {
						caption = caption[0];
					}
					if (!caption) {
						var caption = doc.createElement("caption");
						table.insertBefore(caption, table.firstChild);
					}
					caption.innerHTML = val;
				} else {
					// delete the caption if found
					if (table.caption) table.deleteCaption();
				}
				break;
			    case "f_summary":
				table.summary = val;
				break;
			    case "f_width":
				table.style.width = ("" + val) + params.f_unit;
				break;
			    case "f_align":
				table.align = val;
				break;
			    case "f_spacing":
				table.cellSpacing = val;
				break;
			    case "f_padding":
				table.cellPadding = val;
				break;
			    case "f_frames":
			    	    if (val !== 'not set' && table.style.borderStyle !== 'none') {
			    	    	    table.frame = val;
			    	    } else {
			    	    	    table.removeAttribute('rules');
			    	    }
				break;
			    case "f_rules":
			    	    if (val !== 'not set') {
			    	    	    table.rules = val;
			    	    } else {
			    	    	    table.removeAttribute('rules');
			    	    }
				break;
			    case "f_st_float":
				switch (val) {
				    case "not set":
					HTMLArea.DOM.removeClass(table, this.floatRight);
					HTMLArea.DOM.removeClass(table, this.floatLeft);
					break;
				    case "right":
					HTMLArea.DOM.removeClass(table, this.floatLeft);
					HTMLArea.DOM.addClass(table, this.floatRight);
					break;
				    case "left":
					HTMLArea.DOM.removeClass(table, this.floatRight);
					HTMLArea.DOM.addClass(table, this.floatLeft);
					break;
				}
				break;
			    case "f_st_textAlign":
				if (this.getPluginInstance('BlockElements')) {
					this.getPluginInstance('BlockElements').toggleAlignmentClass(table, this.convertAlignment[val]);
					table.style.textAlign = "";
				}
				break;
			    case "f_class":
			    case "f_class_tbody":
			    case "f_class_thead":
			    case "f_class_tfoot":
				var tpart = table;
				if (item.length > 7) {
					tpart = table.getElementsByTagName(item.substring(8,13))[0];
				}
				if (tpart) {
					this.getPluginInstance('BlockStyle').applyClassChange(tpart, val);
				}
				break;
			    case "f_lang":
				this.getPluginInstance('Language').setLanguageAttributes(table, val);
				break;
			    case "f_dir":
				table.dir = (val != "not set") ? val : "";
				break;
			}
		}, this);
		if (this.dialog.arguments.buttonId === "InsertTable") {
			if (!HTMLArea.isIEBeforeIE9) {
				this.editor.getSelection().insertNode(table);
			} else {
				table.id = "htmlarea_table_insert";
				this.editor.getSelection().insertNode(table);
				table = this.editor.document.getElementById(table.id);
				table.removeAttribute("id");
			}
			this.editor.getSelection().selectNodeContents(table.rows[0].cells[0], true);
			if (this.buttonsConfiguration.toggleborders && this.buttonsConfiguration.toggleborders.setOnTableCreation) {
				this.toggleBorders(true);
			}
		}
		this.close();
	}