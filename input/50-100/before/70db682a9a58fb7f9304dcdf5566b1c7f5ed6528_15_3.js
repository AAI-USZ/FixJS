function(parent,frm){this.appframe=new wn.ui.AppFrame(parent)
this.appframe.$titlebar.append('</span>\
    <span class="breadcrumb-area"></span>');this.$w=this.appframe.$w;},refresh:function(){wn.views.breadcrumbs($(this.$w.find('.breadcrumb-area')),cur_frm.meta.module,cur_frm.meta.name,cur_frm.docname);this.refresh_labels();this.refresh_toolbar();}