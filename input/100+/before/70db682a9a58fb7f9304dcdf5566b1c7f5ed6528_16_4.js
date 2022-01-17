function(txt){this.$titlebar.find('.appframe-title').html(txt);},add_button:function(label,click,icon){if(!this.$w.find('.appframe-toolbar').length)
this.$w.append('<div class="appframe-toolbar"></div>');args={label:label,icon:''};if(icon){args.icon='<i class="icon '+icon+'"></i>';}
this.buttons[label]=$(repl('<button class="btn btn-small">\
   %(icon)s %(label)s</button>',args)).click(click).appendTo(this.$w.find('.appframe-toolbar'));return this.buttons[label];},clear_buttons:function(){this.$w.find('.appframe-toolbar').empty();}});wn.ui.make_app_page=function(opts){