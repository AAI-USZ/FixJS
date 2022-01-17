function (editor, e, o) {
    	var header = this.headerCt.getHeaderAtIndex(e.colIdx);
    	var edit = this.editing.getEditor(editor.record, header);
    	
    	if (e.field == "prefixedValue") {
    		var unit = PartKeepr.getApplication().getUnitStore().getById(e.record.get("unit_id"));
    		if (unit) {
    			edit.field.setStore(unit.prefixes());
    		}
    	}
    }