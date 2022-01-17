function msgprint(msg,title){if(!msg)return;if(typeof(msg)!='string')
msg=JSON.stringify(msg);if(msg.substr(0,8)=='__small:'){show_alert(msg.substr(8));return;}
if(!msg_dialog){msg_dialog=new wn.ui.Dialog({title:"Message",onhide:function(){msg_dialog.msg_area.empty();}});msg_dialog.msg_area=$('<div class="msgprint">').appendTo(msg_dialog.body);}
if(msg.search(/<br>|<p>|<li>/)==-1)
msg=replace_newlines(msg);msg_dialog.set_title(title||'Message')
msg_dialog.msg_area.append(msg);msg_dialog.show();}