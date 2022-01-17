function(name) {
      name = qx.bom.Style.getPropertyName(name);
      return jQuery.prototype.css.call(this, name);
    }