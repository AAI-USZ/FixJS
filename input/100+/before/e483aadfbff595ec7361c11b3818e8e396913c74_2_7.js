function(property, value){
      if (value === undefined && typeof property == 'string') {
        return(
          this.length == 0
            ? undefined
            : this[0].style[camelize(property)] || getComputedStyle(this[0], '').getPropertyValue(property)
        );
      }
      var css = '';
      for (key in property) css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';';
      if (typeof property == 'string') css = dasherize(property) + ":" + maybeAddPx(property, value);
      return this.each(function() { this.style.cssText += ';' + css });
    }