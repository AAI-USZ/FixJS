function(opts){this.opts=opts;this.display=false;this.make=function(opts){if(opts)
this.opts=opts;if(!this.opts.width)this.opts.width=480;if(!$('#dialog-container').length){$('<div id="dialog-container">').appendTo('body');}
this.wrapper=$('<div class="dialog_wrapper">').appendTo('#dialog-container').get(0);if(this.opts.width)
this.wrapper.style.width=this.opts.width+'px';this.make_head();this.body=$a(this.wrapper,'div','dialog_body');if(this.opts.fields)
this.make_fields(this.body,this.opts.fields);}
this.make_head=function(){var me=this;this.appframe=new wn.ui.AppFrame(this.wrapper);this.appframe.$titlebar.find('.close').unbind('click').click(function(){if(me.oncancel)me.oncancel();me.hide();});this.set_title(this.opts.title);}
this.set_title=function(t){this.appframe.$titlebar.find('.appframe-title').html(t||'');}
this.set_postion=function(){this.wrapper.style.left=(($(window).width()-cint(this.wrapper.style.width))/2)+'px';this.wrapper.style.top=($(window).scrollTop()+60)+'px';top_index++;$y(this.wrapper,{zIndex:top_index});}
this.show=function(){if(this.display)return;this.set_postion()
$ds(this.wrapper);freeze();this.display=true;cur_dialog=this;if(this.onshow)this.onshow();}
this.hide=function(){if(this.onhide)this.onhide();unfreeze();$dh(this.wrapper);this.display=false;cur_dialog=null;}
this.no_cancel=function(){this.appframe.$titlebar.find('.close').toggle(false);}
if(opts)this.make();}