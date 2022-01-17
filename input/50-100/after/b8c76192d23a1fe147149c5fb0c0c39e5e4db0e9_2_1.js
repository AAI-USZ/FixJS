function assertInstanceof(obj, type) {
    if (!(obj instanceof type)) {
      var actualTypeName = null;
      var actualConstructor = Object.getPrototypeOf(obj).constructor;
      if (typeof actualConstructor == "function") {
        actualTypeName = actualConstructor.name || String(actualConstructor);
      }
      fail("Object <" + PrettyPrint(obj) + "> is not an instance of <" +
               (type.name || type) + ">" +
               (actualTypeName ? " but of < " + actualTypeName + ">" : ""));
    }
  }