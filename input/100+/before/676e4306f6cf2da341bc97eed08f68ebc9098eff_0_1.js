function(component, opt_allowOverride) {

  goog.base(this);

  debugger;



  if (component.getContent) {

    this.getContent_ = goog.bind(component.getContent, component);

  }

  if (component.getContentElement) {

    this.getContentElement_ = goog.bind(component.getContentElement, component);

  }

  if (component.setContent) {

    this.setContent_ = goog.bind(component.setContent, component);

  }

  if (component.setContentInternal) {

    this.setContentInternal_ = goog.bind(

        component.setContentInternal, component);

  }



  this.component_ = component;

  this.contentMap_ = {};

  if (opt_allowOverride) this.overrideMethods();

}