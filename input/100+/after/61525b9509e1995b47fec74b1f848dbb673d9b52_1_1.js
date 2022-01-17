function applyType(factory, types) {
  var factoryClassName = factory.classInfo.instanceInfo.name.name;
  if (factoryClassName === "Vector") {
    assert (types.length === 1);
    var typeClassName = types[0].classInfo.instanceInfo.name.name;
    switch (typeClassName) {
      case "int":
      case "uint":
      case "double":
        break;
      default:
        typeClassName = "object";
        break;
    }
    return toplevel.getClass("packageInternal __AS3__$vec.Vector$" + typeClassName);
  } else {
    return notImplemented(factoryClassName);
  }
}