function(label){if(this.page&&this.page.label==label){return;}
var me=this;if(label.tagName){var page=label;}else{var page=wn.pages[label];}
if(!page){console.log('Page not found '+label);return;}
if(this.page){$(this.page).toggle(false);$(this.page).trigger('hide');}
this.page=page;$(this.page).fadeIn();this.page._route=window.location.hash;document.title=this.page.label;$(this.page).trigger('show');scroll(0,0);return this.page;}});wn.views.add_module_btn=function(parent,module){