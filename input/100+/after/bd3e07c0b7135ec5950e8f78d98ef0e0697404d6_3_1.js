function(ed) {

		var action, elm, f = document.forms[0];



		this.editor = ed;

		elm = ed.dom.getParent(ed.selection.getNode(), 'A');

		v = ed.dom.getAttrib(elm, 'name') || ed.dom.getAttrib(elm, 'id');



		if (v) {

			this.action = 'update';

			f.anchorName.value = v;

		}



		f.insert.value = ed.getLang(elm ? 'update' : 'insert');

	}