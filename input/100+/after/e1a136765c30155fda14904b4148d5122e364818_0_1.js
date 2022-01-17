function() {
    // Try parent supplied info
    var self = this;
    self.element.parents().each(function(){
      $parent = jQuery(this);
      self.url           = self.url           || $parent.attr("data-url");
      self.collection    = self.collection    || $parent.attr("data-collection");
      self.formType      = self.formType      || $parent.attr("data-type");
      self.objectName    = self.objectName    || $parent.attr("data-object");
      self.attributeName = self.attributeName || $parent.attr("data-attribute");
      self.activator     = self.activator     || $parent.attr("data-activator");
      self.okButton      = self.okButton      || $parent.attr("data-ok-button");
      self.cancelButton  = self.cancelButton  || $parent.attr("data-cancel-button");
      self.nil           = self.nil           || $parent.attr("data-nil");
      self.always_display_edit = self.always_display_edit || $parent.attr("data-always-display-edit");
      self.inner_class   = self.inner_class   || $parent.attr("data-inner-class");
      self.html_attrs    = self.html_attrs    || $parent.attr("data-html-attrs");
      self.original_content    = self.original_content    || $parent.attr("data-original-content");
    });

    // Try Rails-id based if parents did not explicitly supply something
    self.element.parents().each(function(){
      var res = this.id.match(/^(\w+)_(\d+)$/i);
      if (res) {
        self.objectName = self.objectName || res[1];
      }
    });

    // Load own attributes (overrides all others)
    self.url           = self.element.attr("data-url")           || self.url      || document.location.pathname;
    self.collection    = self.element.attr("data-collection")    || self.collection;
    self.formType      = self.element.attr("data-type")          || self.formtype || "input";
    self.objectName    = self.element.attr("data-object")        || self.objectName;
    self.attributeName = self.element.attr("data-attribute")     || self.attributeName;
    self.activator     = self.element.attr("data-activator")     || self.element;
    self.okButton      = self.element.attr("data-ok-button")     || self.okButton;
    self.cancelButton  = self.element.attr("data-cancel-button") || self.cancelButton;
    self.nil           = self.element.attr("data-nil")           || self.nil      || "-";
    self.always_display_edit = self.element.attr("data-always-display-edit") || self.always_display_edit || false;
    self.inner_class   = self.element.attr("data-inner-class")   || self.inner_class   || null;
    self.html_attrs    = self.element.attr("data-html-attrs")    || self.html_attrs;
    self.original_content  = self.element.attr("data-original-content") || self.original_content;

    if(self.always_display_edit == "true") { 
      self.always_display_edit = true;
    }

    if (!self.element.attr("data-sanitize")) {
      self.sanitize = true;
    }
    else {
      self.sanitize = (self.element.attr("data-sanitize") == "true");
    }

    if ((self.formType == "select" || self.formType == "checkbox") && self.collection !== null)
    {
      self.values = jQuery.parseJSON(self.collection);
    }
  }