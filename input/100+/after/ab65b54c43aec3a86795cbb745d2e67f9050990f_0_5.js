function(docname){if(docname){if(this.docname!=docname&&(!this.meta.in_dialog||this.in_form)&&!this.meta.istable)scroll(0,0);this.docname=docname;}
if(!this.meta.istable){cur_frm=this;this.parent.cur_frm=this;}
if(this.docname){if(!this.check_doc_perm())return;if(!this.setup_done)this.setup();this.runclientscript('set_perm',this.doctype,this.docname);this.doc=get_local(this.doctype,this.docname);cur_frm.cscript.is_onload=false;if(!this.opendocs[this.docname]){cur_frm.cscript.is_onload=true;this.setnewdoc(this.docname);}
if(this.doc.__islocal)
this.is_editable[this.docname]=1;this.editable=this.is_editable[this.docname];if(!this.doc.__archived&&(this.editable||(!this.editable&&this.meta.istable))){if(this.print_wrapper){$dh(this.print_wrapper);$ds(this.page_layout.wrapper);}
if(!this.meta.istable){this.refresh_header();this.sidebar&&this.sidebar.refresh();}
this.runclientscript('refresh');$(document).trigger('form_refresh');this.refresh_fields();this.refresh_dependency();this.refresh_footer();if(this.layout)this.layout.show();if(cur_frm.cscript.is_onload){this.runclientscript('onload_post_render',this.doctype,this.docname);}
if(this.doc.docstatus==0){$(this.wrapper).find('.form-layout-row :input:first').focus();}}else{this.refresh_header();if(this.print_wrapper){this.refresh_print_layout();}
this.runclientscript('edit_status_changed');}
$(cur_frm.wrapper).trigger('render_complete');}}