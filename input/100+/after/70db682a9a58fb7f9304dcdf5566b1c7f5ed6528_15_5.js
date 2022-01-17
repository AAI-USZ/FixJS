function(label,click,icon){this.make_toolbar();args={label:label,icon:''};if(icon){args.icon='<i class="icon '+icon+'"></i>';}
this.buttons[label]=$(repl('<button class="btn btn-small">\
   %(icon)s %(label)s</button>',args)).click(click).appendTo(this.$w.find('.appframe-toolbar'));return this.buttons[label];}