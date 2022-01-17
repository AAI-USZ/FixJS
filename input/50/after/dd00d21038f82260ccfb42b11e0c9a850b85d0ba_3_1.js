function(name, value) {
      name = qx.bom.Style.getPropertyName(name);
      jQuery.prototype.css.call(this, name, value);
      return this;
    }