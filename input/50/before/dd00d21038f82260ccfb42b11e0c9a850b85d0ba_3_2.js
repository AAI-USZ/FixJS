function(name) {
      //TODO check for special types in qx.bom.element.style.set
      return jQuery.prototype.css.call(this, name);
    }