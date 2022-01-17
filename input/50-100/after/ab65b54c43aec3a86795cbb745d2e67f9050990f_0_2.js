function(){if(!this.meta.in_dialog||this.in_form){set_title(this.meta.issingle?this.doctype:this.docname);}
if(this.frm_head)this.frm_head.refresh();if(wn.ui.toolbar.recent)
wn.ui.toolbar.recent.add(this.doctype,this.docname,1);}