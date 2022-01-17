function() {

		var ed = this.editor, elm, name = document.forms[0].anchorName.value;



		if (!name || !/^[a-z][a-z0-9\-\_:\.]*$/i.test(name)) {

			tinyMCEPopup.alert('advanced_dlg.anchor_invalid');

			return;

		}



		tinyMCEPopup.restoreSelection();



		if (this.action != 'update')

			ed.selection.collapse(1);



		elm = ed.dom.getParent(ed.selection.getNode(), 'A');

		if (elm) {

			elm.setAttribute('name', name);

			elm.name = name;

		} else

			// create with zero-sized nbsp so that in Webkit where anchor is on last line by itself caret cannot be placed after it

			ed.execCommand('mceInsertContent', 0, ed.dom.createHTML('a', {name : name, 'class' : 'mceItemAnchor'}, '\uFEFF'));



		tinyMCEPopup.close();

	}