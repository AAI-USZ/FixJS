function(val) {
	var me = this;
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

	// validate the value just entered
	var fetch = '';
	if(cur_frm.fetch_dict[me.df.fieldname])
		fetch = cur_frm.fetch_dict[me.df.fieldname].columns.join(', ');
		
	$c('webnotes.widgets.form.utils.validate_link', {
			'value':val, 
			'options':me.df.options, 
			'fetch': fetch
		}, 
		function(r,rt) { 
			if(r.message=='Ok') {
				// set fetch values
				if($(me.txt).val()!=val) {
					if((me.grid && !from_selector) || (!me.grid)) {
						$(me.txt).val(val);
					}
				}
				
				if(r.fetch_values) 
					me.set_fetch_values(r.fetch_values);

				me.run_trigger();
			} else {
				var astr = '';
				if(in_list(profile.can_create, me.df.options)) astr = repl('<br><br><span class="link_type" onclick="newdoc(\'%(dt)s\')">Click here</span> to create a new %(dtl)s', {dt:me.df.options, dtl:get_doctype_label(me.df.options)})
				msgprint(repl('error:<b>%(val)s</b> is not a valid %(dt)s.<br><br>You must first create a new %(dt)s <b>%(val)s</b> and then select its value. To find an existing %(dt)s, click on the magnifying glass next to the field.%(add)s', {val:me.txt.value, dt:get_doctype_label(me.df.options), add:astr})); 
				me.txt.value = ''; 
				me.set('');
			}
		}
	);
}