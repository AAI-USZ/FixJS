function(parent,title){this.buttons={};this.$w=$('<div></div>').appendTo(parent);this.$titlebar=$('<div class="appframe-titlebar">\
   <span class="appframe-title"></span>\
   <span class="close">&times;</span>\
  </div>').appendTo(this.$w);this.$w.find('.close').click(function(){window.history.back();})
if(title)this.title(title);},title:function(txt){this.clear_breadcrumbs();this.add_breadcrumb(txt);}