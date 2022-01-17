function BestInPlaceEditor(e) {
  this.element = e;
  this.initOptions();
  this.bindForm();
  this.initNil();
  if (this.always_display_edit == false) { return this.clickHandler(); }
  jQuery(this.activator).bind('click', {editor: this}, this.clickHandler);
}