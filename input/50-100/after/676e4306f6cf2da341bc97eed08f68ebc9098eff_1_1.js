function(opt_label, opt_help, opt_format,

    opt_renderer, opt_domHelper) {

  goog.base(this, null, opt_renderer ||

      goog.ui.registry.getDefaultRenderer(this.constructor), opt_domHelper);

  this.helper_ = new clover.ui.ComponentContentHelper(this, true);

  this.setContentInternal(opt_label || '', this.labelKey);

  this.setContentInternal(opt_help, this.blockHelpKey);



}