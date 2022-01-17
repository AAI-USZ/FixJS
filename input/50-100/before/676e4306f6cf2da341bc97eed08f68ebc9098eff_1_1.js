function(opt_label, opt_help, opt_format,

    opt_renderer, opt_domHelper) {

  goog.base(this, null, opt_renderer, opt_domHelper);

  this.helper_ = new clover.ui.ComponentContentHelper(this, true);

  this.setLabelContent(opt_label || '');

  this.setBlockHelpContent(opt_help);

}