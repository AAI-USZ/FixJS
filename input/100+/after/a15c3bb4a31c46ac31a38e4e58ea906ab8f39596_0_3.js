function(val) {
	var me = this;
	
	// SetTimeout hack! if in put is set via autocomplete, do not validate twice
	me.set_input_value_executed = true;

	var from_selector = false;
	if(selector && selector.display) from_selector = true;
		
	// refresh mandatory style
	me.refresh_label_icon();
	
	// not in form, do nothing
	if(me.not_in_form) {
		$(this.txt).val(val);
		return;
	}
	
	// same value, do nothing
	if(cur_frm) {
		if(val == locals[me.doctype][me.docname][me.df.fieldname]) { 
			//me.set(val); // one more time, grid bug?
			me.run_trigger(); // wanted - called as refresh?
			return; 
		}
	}
	
	// set in locals
	me.set(val);
	
	// deselect cell if in grid
	if(_f.cur_grid_cell)
		_f.cur_grid_cell.grid.cell_deselect();
	
	// run trigger if value is cleared
	if(locals[me.doctype][me.docname][me.df.fieldname] && !val) {
		me.run_trigger();
		return;
	}

	me.validate_link(val, from_selector);
}