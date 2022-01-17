function(doctype){this.doctype=doctype;this.label=get_doctype_label(doctype);this.label=(this.label.toLowerCase().substr(-4)=='list')?this.label:(this.label+' List');this.make_page();this.setup();},make_page:function(){var me=this;var page_name=wn.get_route_str();var page=wn.container.add_page(page_name);wn.container.change_to(page_name);this.$page=$(page);this.$page.html('<div class="layout-wrapper layout-wrapper-background">\
   <div class="appframe-area"></div>\
   <div class="layout-main-section">\
    <div class="wnlist-area"><div class="help">Loading...</div></div>\
   </div>\
   <div class="layout-side-section">\
    <div class="show-docstatus hide" style="margin-bottom: 19px">\
     <h4>Show</h4>\
     <div><input data-docstatus="0" type="checkbox" checked="checked" /> Drafts</div>\
     <div><input data-docstatus="1" type="checkbox" checked="checked" /> Submitted</div>\
     <div><input data-docstatus="2" type="checkbox" /> Cancelled</div>\
    </div>\
   </div>\
   <div style="clear: both"></div>\
  </div>');this.appframe=new wn.ui.AppFrame(this.$page.find('.appframe-area'));wn.views.breadcrumbs(this.appframe,locals.DocType[this.doctype].module,this.doctype);},setup:function(){var me=this;me.can_delete=wn.model.can_delete(me.doctype);me.meta=locals.DocType[me.doctype];me.$page.find('.wnlist-area').empty(),me.setup_docstatus_filter();me.setup_listview();me.init_list();me.init_stats();me.make_report_button();me.add_delete_option();me.make_help();},make_report_button:function(){var me=this;if(wn.boot.profile.can_get_report.indexOf(this.doctype)!=-1){this.appframe.add_button('Build Report',function(){wn.set_route('Report2',me.doctype);},'icon-th')}}