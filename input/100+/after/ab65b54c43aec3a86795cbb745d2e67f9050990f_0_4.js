function(dt,old,name){if(this.meta.in_dialog&&!this.in_form)
return;if(this.docname==old)
this.docname=name;else
return;this.is_editable[name]=this.is_editable[old];delete this.is_editable[old];if(this&&this.opendocs[old]){local_dt[dt][name]=local_dt[dt][old];local_dt[dt][old]=null;}
delete this.opendocs[old];this.opendocs[name]=true;wn.re_route[window.location.hash]='#Form/'+encodeURIComponent(this.doctype)+'/'+encodeURIComponent(name);wn.set_route('Form',this.doctype,name);}