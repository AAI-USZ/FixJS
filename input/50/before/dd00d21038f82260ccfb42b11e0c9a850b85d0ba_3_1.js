function(name, value) {
      //TODO check for special types in qx.bom.element.style.set
      jQuery.prototype.css.call(this, name, value);
      return this;
    }