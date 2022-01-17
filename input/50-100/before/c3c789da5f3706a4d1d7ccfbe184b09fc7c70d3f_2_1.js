function (editor, e, o) {
    	var header = this.headerCt.getHeaderAtIndex(editor.colIdx);
    	var edit = this.editing.getEditor(editor.record, header);
    	
    	if (editor.field == "prefixedValue") {
    		var unit = PartKeepr.getApplication().getUnitStore().getById(editor.record.get("unit_id"));
    		if (unit) {
    			edit.field.setStore(unit.prefixes());
    		}
    	}
    }