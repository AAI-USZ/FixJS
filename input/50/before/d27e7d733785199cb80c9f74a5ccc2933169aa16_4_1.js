function(options){
    opts = $.extend({}, $.fn.isValid.defaults, options);
    hasLabelPlaceholder = opts.errorText.indexOf("{label}") > -1;
  }