function(classString) {
      var i, cssClass,
      cssClasses = classString.split(/\s+/);

      for(i = 0; i < cssClasses.length; i += 1) {
        cssClass = cssClasses[i];

        if(cssClass !== "wysiwyg" && availableModes[cssClass]) {
          this.dataType = cssClass;
        }
      }
    }