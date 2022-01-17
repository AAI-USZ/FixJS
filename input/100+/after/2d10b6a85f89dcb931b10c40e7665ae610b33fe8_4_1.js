function(cell) {
	// if newrow
	if(cell.row.is_newrow)return;

	// show static
	var hc = this.head_row.cells[cell.cellIndex];
	
	if(hc.fieldname && locals[hc.doctype][cell.row.docname]) {
		var v = locals[hc.doctype][cell.row.docname][hc.fieldname];
	} else {
		var v = (cell.row.rowIndex + 1); // Index
	}
	
	if(v==null){ v=''; }
	var me = this;
	
	// variations
	if(cell.cellIndex) {
		var ft = hc.fieldtype;
		if(ft=='Link' && cur_frm.doc.docstatus < 1) ft='Data';
		$s(cell.div, v, ft, hc.options);
	} else {
		// Index column
		cell.div.style.padding = '2px';
		cell.div.style.textAlign = 'left';
		cell.innerHTML = '';

		var t = make_table(cell,1,3,'60px',['20px','20px','20px'],{verticalAlign: 'middle', padding:'2px'});
		$y($td(t,0,0),{paddingLeft:'4px'});
		$td(t,0,0).innerHTML = cell.row.rowIndex + 1;

		if(cur_frm.editable && this.can_edit) {

			var ed = $a($td(t,0,1),'i','icon-edit',{cursor:'pointer'}); ed.cell = cell; ed.title = 'Edit Row';
			ed.onclick = function() { 
				_f.cur_grid = me;
				_f.cur_grid_ridx = this.cell.row.rowIndex;
				_f.edit_record(me.doctype, this.cell.row.docname, 1);				
			}
			
		} else {
			cell.div.innerHTML = (cell.row.rowIndex + 1);
			cell.div.style.cursor = 'default';
			cell.div.onclick = function() { }
		}
	}
}