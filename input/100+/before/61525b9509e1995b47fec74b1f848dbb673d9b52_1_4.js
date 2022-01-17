function createInterface(classInfo) {
    var ii = classInfo.instanceInfo;
    assert (ii.isInterface());
    if (traceExecution.value) {
      var str = "Creating interface " + ii.name;
      if (ii.interfaces.length) {
        str += " implements " + ii.interfaces.map(function (name) {
          return name.getName();
        }).join(", ");
      }
      print(str);
    }
    var interface = new Interface(ii.name);
    interface.classInfo = classInfo;
    return interface;
  }