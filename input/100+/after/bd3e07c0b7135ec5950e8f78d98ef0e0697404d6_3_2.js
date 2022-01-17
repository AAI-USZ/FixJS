function() {

		var ed = this.editor, elm, name = document.forms[0].anchorName.value, attribName;



		if (!name || !/^[a-z][a-z0-9\-\_:\.]*$/i.test(name)) {

			tinyMCEPopup.alert('advanced_dlg.anchor_invalid');

			return;

		}



		tinyMCEPopup.restoreSelection();



		if (this.action != 'update')

			ed.selection.collapse(1);



		var aRule = ed.schema.getElementRule('a');

		if (!aRule || aRule.attributes.name) {

			attribName = 'name';

		} else {

			attribName = 'id';

		}



		elm = ed.dom.getParent(ed.selection.getNode(), 'A');

		if (elm) {

			elm.setAttribute(attribName, name);

			elm[attribName] = name;

		} else {

			// create with zero-sized nbsp so that in Webkit where anchor is on last line by itself caret cannot be placed after it

			var attrs =  {'class' : 'mceItemAnchor'};

			attrs[attribName] = name;

			ed.execCommand('mceInsertContent', 0, ed.dom.createHTML('a', attrs, '\uFEFF'));

		}



		tinyMCEPopup.close();

	}