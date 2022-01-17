function(classNames) {
    var currentClassName = this.domElement.className;
    if (currentClassName) {
      var classNamesList = classNames.split(Prime.Utils.spaceRegex);
      for (var i = 0; i < classNamesList.length; i++) {
        var aClass = classNamesList[i];
        var index = currentClassName.indexOf(aClass);
        if (index === 0 && currentClassName.length === aClass.length) {
          currentClassName = '';
          break;
        } else if (index === 0) {
          currentClassName = currentClassName.substring(aClass.length + 1);
        } else if (index + aClass.length === currentClassName.length) {
          currentClassName = currentClassName.substring(0, index - 1);
        } else {
          currentClassName = currentClassName.substring(0, index - 1) + ' ' + currentClassName.substring(index + aClass.length + 1);
        }
      }
    }

    this.domElement.className = currentClassName;
    return this;
  }