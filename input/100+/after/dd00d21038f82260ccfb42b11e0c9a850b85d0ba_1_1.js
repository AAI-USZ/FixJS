function(propertyName)
    {
      if (this.STYLENAMES[propertyName]) {
        return this.STYLENAMES[propertyName];
      }
      
      var style = document.documentElement.style;

      if (style[propertyName] !== undefined) {
        this.STYLENAMES[name] = propertyName;
        return propertyName;
      }

      for (var i=0, l=this.VENDOR_PREFIXES.length; i<l; i++) {
        var prefixedProp = this.VENDOR_PREFIXES[i] +
          qx.lang.String.firstUp(propertyName);
        if (style[prefixedProp] !== undefined) {
          this.STYLENAMES[name] = prefixedProp;
          return prefixedProp;
        }
      }

      return null;
    }