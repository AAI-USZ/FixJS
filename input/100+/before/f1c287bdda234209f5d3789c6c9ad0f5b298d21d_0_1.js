function(parent,filedet,frm){filedet=filedet.split(',')
this.filename=filedet[0];this.fileid=filedet[1];this.frm=frm;var me=this;this.wrapper=$a(parent,'div','sidebar-comment-message');this.remove_fileid=function(){var doc=locals[me.frm.doctype][me.frm.docname];var fl=doc.file_list.split('\n');new_fl=[];for(var i=0;i<fl.length;i++){if(fl[i].split(',')[1]!=me.fileid)new_fl.push(fl[i]);}
doc.file_list=new_fl.join('\n');}
var display_name=this.fileid;if(this.fileid.substr(0,8)=='FileData')
display_name=this.filename;this.ln=$a(this.wrapper,'a','link_type small',{},display_name);this.ln.href='files/'+this.fileid;this.ln.target='_blank';this.del=$a(this.wrapper,'span','close','','&#215;');this.del.onclick=function(){var yn=confirm("Are you sure you want to delete the attachment?")
if(yn){var callback=function(r,rt){locals[me.frm.doctype][me.frm.docname].modified=r.message;$dh(me.wrapper);me.remove_fileid();frm.refresh();}
$c('webnotes.widgets.form.utils.remove_attach',args={'fid':me.fileid,dt:me.frm.doctype,dn:me.frm.docname},callback);}}}