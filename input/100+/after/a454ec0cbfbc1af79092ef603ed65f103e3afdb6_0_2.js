function (type) {
  var classObject = type, typeObject = type;

  if (typeof (type) === "undefined")
    throw new Error("Type is null");
  else if (typeof (type.__PublicInterface__) !== "undefined")
    classObject = type.__PublicInterface__;
  else if (typeof (type.__Type__) === "object")
    typeObject = type.__Type__;
  else
    return;

  if (typeObject.__TypeInitialized__ || false)
    return;

  // Not entirely correct, but prevents recursive type initialization
  typeObject.__TypeInitialized__ = true;

  if (typeObject.__IsClosed__) {
    var forceLazyMethodGroups = false;

    // We need to ensure that method groups for BCL classes are always lazy
    //  because otherwise, initializing the method groups may rely on the classes themselves
    if (typeObject.__FullName__.indexOf("System.") === 0)
      forceLazyMethodGroups = true;

    if (typeObject.IsInterface !== true) {
      JSIL.$BuildMethodGroups(typeObject, classObject, forceLazyMethodGroups);
    }

    JSIL.InstantiateProperties(classObject, typeObject);

    if (typeObject.IsInterface !== true) {
      JSIL.FixupInterfaces(classObject, typeObject);
      JSIL.RebindRawMethods(classObject, typeObject);
    }

    JSIL.BuildTypeList(typeObject, classObject);

    if (typeof (classObject.prototype) === "object") {
      JSIL.SetLazyValueProperty(
        classObject.prototype, "MemberwiseClone", function () {
          return JSIL.$MakeMemberwiseCloner(typeObject, classObject);
        }
      );
    }
  }

  // Run any queued initializers for the type
  var ti = typeObject.__Initializers__ || [];
  while (ti.length > 0) {
    var initializer = ti.unshift();
    if (typeof (initializer) === "function")
      initializer(type);
  };

  // If the type is closed, invoke its static constructor(s)
  if (typeObject.__IsClosed__) {
    for (var i = 0; i < $jsilcore.cctorKeys.length; i++) {
      var key = $jsilcore.cctorKeys[i];
      var cctor = classObject[key];

      if (typeof (cctor) === "function") {
        try {
          cctor.call(classObject);
        } catch (e) {
          JSIL.Host.error(e, "Unhandled exception in static constructor for type " + JSIL.GetTypeName(type) + ": ");
        }
      }
    }
  }

  // Any closed forms of the type, if it's an open type, should be initialized too.
  if (typeof (typeObject.__OfCache__) !== "undefined") {
    var oc = typeObject.__OfCache__;
    for (var k in oc) {
      if (!oc.hasOwnProperty(k))
        continue;

      JSIL.InitializeType(oc[k]);
    }
  }

  if (
    (typeof (type.__BaseType__) !== "undefined") &&
    (type.__BaseType__ !== null)
  ) {
    JSIL.InitializeType(type.__BaseType__);
  }

  if ($jsilcore.SealInitializedTypes) {
    Object.seal(type);

    if (typeof(type.__PublicInterface__) === "object")
      Object.seal(type.__PublicInterface__);
  }
}