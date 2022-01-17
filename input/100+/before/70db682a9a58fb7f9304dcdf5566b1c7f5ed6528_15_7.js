fthis.opts=opts;if(!this.opts.width)this.opts.width=480;if(!$('#dialog-container').length){$('<div id="dialog-container">').appendTo('body');}
this.wrapper=$('<div class="dialog_wrapper">').appendTo('#dialog-container').get(0);if(this.opts.width)
this.wrapper.style.width=this.opts.width+'px';this.make_head();this.body=$a(this.wrapper,'div','dialog_body');if(this.opts.fields)
this.make_fields(this.body,this.opts.fields);}
