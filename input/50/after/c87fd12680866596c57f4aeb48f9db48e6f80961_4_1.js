function hasParentInList(ed, e, list) {

		return ed.dom.getParent(e, function(p) {

			return tinymce.inArray(list, p) !== -1;

		});

	}