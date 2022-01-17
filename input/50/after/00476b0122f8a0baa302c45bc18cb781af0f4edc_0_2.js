function initializeClasses() {
    initializeClass(object);
    simpleArrayEach(ClassNames, function(name) {
      initializeClass(globalContext[name]);
    });
  }