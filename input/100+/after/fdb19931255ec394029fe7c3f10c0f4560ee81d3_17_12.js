function(val){var me=this;me.set_input_value_executed=true;var from_selector=false;if(selector&&selector.display)from_selector=true;me.refresh_label_icon();if(me.not_in_form){$(this.txt).val(val);return;}
if(cur_frm){if(val==locals[me.doctype][me.docname][me.df.fieldname]){me.run_trigger();return;}}
me.set(val);if(_f.cur_grid_cell)
_f.cur_grid_cell.grid.cell_deselect();if(locals[me.doctype][me.docname][me.df.fieldname]&&!val){me.run_trigger();return;}
me.validate_link(val,from_selector);}